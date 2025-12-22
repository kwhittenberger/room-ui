import { forwardRef, useState, useMemo, useCallback } from 'react';
import { ChevronUp, ChevronDown, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Checkbox } from '../Checkbox';
import { Skeleton } from '../Loading';
import { Dropdown } from '../Dropdown';

export type ExpansionMode = 'single' | 'multiple';

export interface DataTableColumn<T> {
  /** Unique column identifier */
  id: string;
  /** Column header text */
  header: string;
  /** Data accessor - either a key or a function */
  accessor: keyof T | ((row: T) => unknown);
  /** Custom cell renderer */
  cell?: (value: unknown, row: T) => React.ReactNode;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Fixed width */
  width?: string | number;
  /** Minimum width */
  minWidth?: string | number;
  /** Maximum width */
  maxWidth?: string | number;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Sticky position */
  sticky?: 'left' | 'right';
  /** Whether column is hidden */
  hidden?: boolean;
}

export interface DataTableAction<T> {
  /** Unique action identifier */
  id: string;
  /** Action label */
  label: string;
  /** Action icon */
  icon?: React.ReactNode;
  /** Click handler */
  onClick: (rows: T[]) => void;
  /** Whether action is disabled */
  disabled?: boolean | ((rows: T[]) => boolean);
  /** Action variant */
  variant?: 'default' | 'danger';
}

export interface ExpandedRowConfig<T> {
  /** Render function for expanded content */
  render: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  /** Table data */
  data: T[];
  /** Column definitions */
  columns: DataTableColumn<T>[];
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string;

  // Selection
  /** Enable row selection */
  selectable?: boolean;
  /** Currently selected rows */
  selectedRows?: T[];
  /** Selection change callback */
  onSelectedRowsChange?: (rows: T[]) => void;

  // Sorting
  /** Enable sorting */
  sortable?: boolean;
  /** Current sort column */
  sortColumn?: string;
  /** Current sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Sort change callback */
  onSort?: (column: string, direction: 'asc' | 'desc') => void;

  // Pagination
  /** Enable pagination */
  pagination?: boolean;
  /** Current page (1-indexed) */
  currentPage?: number;
  /** Page size */
  pageSize?: number;
  /** Total number of items */
  totalItems?: number;
  /** Page change callback */
  onPageChange?: (page: number) => void;
  /** Page size change callback */
  onPageSizeChange?: (size: number) => void;
  /** Available page sizes */
  pageSizeOptions?: number[];

  // Row expansion
  /** Enable row expansion */
  expandable?: boolean;
  /** Expanded row configuration */
  expandedRowConfig?: ExpandedRowConfig<T>;
  /** Currently expanded row IDs */
  expandedRows?: string[];
  /** Expansion change callback */
  onExpandedRowsChange?: (ids: string[]) => void;
  /** Expansion mode (single or multiple) */
  expansionMode?: ExpansionMode;

  // Actions
  /** Bulk actions (shown when rows selected) */
  actions?: DataTableAction<T>[];
  /** Per-row actions */
  rowActions?: DataTableAction<T>[];

  // Styling
  /** Striped rows */
  striped?: boolean;
  /** Hover effect on rows */
  hoverable?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Sticky header */
  stickyHeader?: boolean;

  // Other
  /** Function to get unique row ID */
  getRowId?: (row: T) => string;
  /** Row click handler */
  onRowClick?: (row: T) => void;
  /** Empty state message */
  emptyMessage?: string;
  /** Number of skeleton rows to show when loading */
  loadingRows?: number;
  /** Additional class name */
  className?: string;
}

function getColumnStyle<T>(column: DataTableColumn<T>): React.CSSProperties {
  return {
    width: column.width,
    minWidth: column.minWidth,
    maxWidth: column.maxWidth,
    textAlign: column.align || 'left',
  };
}

function getCellValue<T>(row: T, accessor: keyof T | ((row: T) => unknown)): unknown {
  if (typeof accessor === 'function') {
    return accessor(row);
  }
  return row[accessor];
}

const DataTable = forwardRef(function DataTable<T>(
  {
    data,
    columns,
    loading = false,
    error,
    selectable = false,
    selectedRows = [],
    onSelectedRowsChange,
    sortable = false,
    sortColumn,
    sortDirection = 'asc',
    onSort,
    pagination = false,
    currentPage = 1,
    pageSize = 10,
    totalItems,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 25, 50, 100],
    expandable = false,
    expandedRowConfig,
    expandedRows: controlledExpandedRows,
    onExpandedRowsChange,
    expansionMode = 'multiple',
    actions = [],
    rowActions = [],
    striped = false,
    hoverable = true,
    compact = false,
    stickyHeader = false,
    getRowId = (row: T) => String((row as Record<string, unknown>).id ?? JSON.stringify(row)),
    onRowClick,
    emptyMessage = 'No data available',
    loadingRows = 5,
    className,
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [internalExpandedRows, setInternalExpandedRows] = useState<string[]>([]);

  const expandedRowsControlled = controlledExpandedRows !== undefined;
  const expandedRows = expandedRowsControlled ? controlledExpandedRows : internalExpandedRows;

  const visibleColumns = useMemo(
    () => columns.filter((col) => !col.hidden),
    [columns]
  );

  const totalColumns = useMemo(() => {
    let count = visibleColumns.length;
    if (selectable) count += 1;
    if (expandable) count += 1;
    if (rowActions.length > 0) count += 1;
    return count;
  }, [visibleColumns.length, selectable, expandable, rowActions.length]);

  const handleSort = useCallback(
    (columnId: string) => {
      if (!sortable || !onSort) return;
      const column = columns.find((c) => c.id === columnId);
      if (!column?.sortable) return;

      const newDirection =
        sortColumn === columnId && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(columnId, newDirection);
    },
    [sortable, onSort, columns, sortColumn, sortDirection]
  );

  const handleSelectAll = useCallback(() => {
    if (!onSelectedRowsChange) return;
    const allSelected = selectedRows.length === data.length;
    onSelectedRowsChange(allSelected ? [] : [...data]);
  }, [data, selectedRows, onSelectedRowsChange]);

  const handleSelectRow = useCallback(
    (row: T) => {
      if (!onSelectedRowsChange) return;
      const rowId = getRowId(row);
      const isSelected = selectedRows.some((r) => getRowId(r) === rowId);
      if (isSelected) {
        onSelectedRowsChange(selectedRows.filter((r) => getRowId(r) !== rowId));
      } else {
        onSelectedRowsChange([...selectedRows, row]);
      }
    },
    [selectedRows, onSelectedRowsChange, getRowId]
  );

  const handleToggleExpand = useCallback(
    (rowId: string) => {
      let newExpandedRows: string[];

      if (expandedRows.includes(rowId)) {
        newExpandedRows = expandedRows.filter((id) => id !== rowId);
      } else {
        newExpandedRows =
          expansionMode === 'single' ? [rowId] : [...expandedRows, rowId];
      }

      if (expandedRowsControlled) {
        onExpandedRowsChange?.(newExpandedRows);
      } else {
        setInternalExpandedRows(newExpandedRows);
      }
    },
    [expandedRows, expansionMode, expandedRowsControlled, onExpandedRowsChange]
  );

  const isRowSelected = useCallback(
    (row: T) => selectedRows.some((r) => getRowId(r) === getRowId(row)),
    [selectedRows, getRowId]
  );

  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

  const computedTotalItems = totalItems ?? data.length;
  const totalPages = Math.ceil(computedTotalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, computedTotalItems);

  const cellPadding = compact ? 'px-3 py-2' : 'px-4 py-3';
  const textSize = compact ? 'text-xs' : 'text-sm';

  if (error) {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-room border border-room-error bg-room-error/10 p-6 text-center',
          className
        )}
      >
        <p className="text-room-error">{error}</p>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn('flex flex-col', className)}>
      {/* Bulk Actions Bar */}
      {selectable && selectedRows.length > 0 && actions.length > 0 && (
        <div className="flex items-center gap-3 p-3 bg-room-bg-surface border border-room-border rounded-room-sm mb-3">
          <span className="text-sm text-room-text-secondary">
            {selectedRows.length} selected
          </span>
          <div className="flex gap-2">
            {actions.map((action) => {
              const isDisabled =
                typeof action.disabled === 'function'
                  ? action.disabled(selectedRows)
                  : action.disabled;
              return (
                <button
                  key={action.id}
                  onClick={() => action.onClick(selectedRows)}
                  disabled={isDisabled}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-room-sm flex items-center gap-1.5 transition-colors',
                    action.variant === 'danger'
                      ? 'text-room-error hover:bg-room-error/10 disabled:opacity-50'
                      : 'text-room-text-primary hover:bg-room-bg-hover disabled:opacity-50'
                  )}
                >
                  {action.icon}
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-room border border-room-border">
        <table className="w-full border-collapse">
          <thead
            className={cn(
              'bg-room-bg-surface',
              stickyHeader && 'sticky top-0 z-10'
            )}
          >
            <tr>
              {/* Selection checkbox column */}
              {selectable && (
                <th className={cn(cellPadding, 'w-12 text-left')}>
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}

              {/* Expand column */}
              {expandable && (
                <th className={cn(cellPadding, 'w-10')} />
              )}

              {/* Data columns */}
              {visibleColumns.map((column) => {
                const isSortable = sortable && column.sortable;
                const isSorted = sortColumn === column.id;

                return (
                  <th
                    key={column.id}
                    className={cn(
                      cellPadding,
                      textSize,
                      'font-medium text-room-text-primary whitespace-nowrap',
                      isSortable && 'cursor-pointer select-none hover:bg-room-bg-hover',
                      column.sticky === 'left' && 'sticky left-0 bg-room-bg-surface',
                      column.sticky === 'right' && 'sticky right-0 bg-room-bg-surface'
                    )}
                    style={getColumnStyle(column)}
                    onClick={() => isSortable && handleSort(column.id)}
                  >
                    <div className="flex items-center gap-1">
                      <span>{column.header}</span>
                      {isSortable && (
                        <span className="flex flex-col">
                          <ChevronUp
                            className={cn(
                              'h-3 w-3 -mb-1',
                              isSorted && sortDirection === 'asc'
                                ? 'text-room-accent'
                                : 'text-room-text-muted'
                            )}
                          />
                          <ChevronDown
                            className={cn(
                              'h-3 w-3 -mt-1',
                              isSorted && sortDirection === 'desc'
                                ? 'text-room-accent'
                                : 'text-room-text-muted'
                            )}
                          />
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}

              {/* Row actions column */}
              {rowActions.length > 0 && (
                <th className={cn(cellPadding, 'w-12')} />
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              // Loading skeletons
              Array.from({ length: loadingRows }).map((_, index) => (
                <tr key={`skeleton-${index}`}>
                  {selectable && (
                    <td className={cellPadding}>
                      <Skeleton width={16} height={16} variant="rectangular" />
                    </td>
                  )}
                  {expandable && (
                    <td className={cellPadding}>
                      <Skeleton width={16} height={16} variant="rectangular" />
                    </td>
                  )}
                  {visibleColumns.map((column) => (
                    <td key={column.id} className={cellPadding}>
                      <Skeleton height={16} />
                    </td>
                  ))}
                  {rowActions.length > 0 && (
                    <td className={cellPadding}>
                      <Skeleton width={24} height={24} variant="circular" />
                    </td>
                  )}
                </tr>
              ))
            ) : data.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan={totalColumns} className="py-12 text-center">
                  <p className="text-room-text-muted">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              // Data rows
              data.map((row, rowIndex) => {
                const rowId = getRowId(row);
                const isSelected = isRowSelected(row);
                const isExpanded = expandedRows.includes(rowId);

                return (
                  <>
                    <tr
                      key={rowId}
                      onClick={() => onRowClick?.(row)}
                      className={cn(
                        'border-t border-room-border transition-colors',
                        striped && rowIndex % 2 === 1 && 'bg-room-bg-surface/50',
                        hoverable && 'hover:bg-room-bg-hover',
                        isSelected && 'bg-room-accent/10',
                        onRowClick && 'cursor-pointer'
                      )}
                    >
                      {/* Selection checkbox */}
                      {selectable && (
                        <td
                          className={cellPadding}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleSelectRow(row)}
                            aria-label={`Select row ${rowIndex + 1}`}
                          />
                        </td>
                      )}

                      {/* Expand toggle */}
                      {expandable && (
                        <td
                          className={cellPadding}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => handleToggleExpand(rowId)}
                            className={cn(
                              'p-1 rounded-room-sm transition-colors',
                              'hover:bg-room-bg-surface text-room-text-muted hover:text-room-text-primary'
                            )}
                            aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                          >
                            <ChevronRight
                              className={cn(
                                'h-4 w-4 transition-transform',
                                isExpanded && 'rotate-90'
                              )}
                            />
                          </button>
                        </td>
                      )}

                      {/* Data cells */}
                      {visibleColumns.map((column) => {
                        const value = getCellValue(row, column.accessor);
                        const cellContent = column.cell
                          ? column.cell(value, row)
                          : String(value ?? '');

                        return (
                          <td
                            key={column.id}
                            className={cn(
                              cellPadding,
                              textSize,
                              'text-room-text-primary',
                              column.sticky === 'left' && 'sticky left-0 bg-room-bg-base',
                              column.sticky === 'right' && 'sticky right-0 bg-room-bg-base'
                            )}
                            style={getColumnStyle(column)}
                          >
                            {cellContent}
                          </td>
                        );
                      })}

                      {/* Row actions */}
                      {rowActions.length > 0 && (
                        <td
                          className={cellPadding}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Dropdown
                            trigger={
                              <button
                                type="button"
                                className="p-1 rounded-room-sm hover:bg-room-bg-surface text-room-text-muted hover:text-room-text-primary"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            }
                            items={rowActions.map((action) => {
                              const isDisabled =
                                typeof action.disabled === 'function'
                                  ? action.disabled([row])
                                  : action.disabled;
                              return {
                                id: action.id,
                                label: action.label,
                                icon: action.icon,
                                onClick: () => action.onClick([row]),
                                disabled: isDisabled,
                                destructive: action.variant === 'danger',
                              };
                            })}
                            placement="bottom-end"
                          />
                        </td>
                      )}
                    </tr>

                    {/* Expanded content */}
                    {expandable && isExpanded && expandedRowConfig && (
                      <tr key={`${rowId}-expanded`}>
                        <td
                          colSpan={totalColumns}
                          className="border-t border-room-border bg-room-bg-surface/30 p-4"
                        >
                          {expandedRowConfig.render(row)}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && !loading && data.length > 0 && (
        <div className="flex items-center justify-between mt-4 px-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-room-text-muted">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              className={cn(
                'h-8 px-2 text-sm rounded-room-sm border border-room-border',
                'bg-room-bg-surface text-room-text-primary',
                'focus:outline-none focus:border-room-accent'
              )}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-room-text-muted">
              {startItem}-{endItem} of {computedTotalItems}
            </span>

            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage <= 1}
                className={cn(
                  'p-1.5 rounded-room-sm transition-colors',
                  currentPage <= 1
                    ? 'text-room-text-disabled cursor-not-allowed'
                    : 'text-room-text-primary hover:bg-room-bg-hover'
                )}
                aria-label="Previous page"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
              </button>

              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => onPageChange?.(pageNum)}
                    className={cn(
                      'min-w-8 h-8 px-2 text-sm rounded-room-sm transition-colors',
                      currentPage === pageNum
                        ? 'bg-room-accent text-white'
                        : 'text-room-text-primary hover:bg-room-bg-hover'
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={cn(
                  'p-1.5 rounded-room-sm transition-colors',
                  currentPage >= totalPages
                    ? 'text-room-text-disabled cursor-not-allowed'
                    : 'text-room-text-primary hover:bg-room-bg-hover'
                )}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}) as <T>(props: DataTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }) => React.ReactElement;

export { DataTable };
export default DataTable;
