import { forwardRef, useState, useCallback, useImperativeHandle, useRef, useMemo } from 'react';
import { cn } from '../../utils/cn';

export type CellValue = string | number | boolean | Date | null;

export interface CellStyle {
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  color?: string;
  /** Font weight */
  fontWeight?: 'normal' | 'bold';
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right';
}

export interface DataGridCell {
  /** Cell value */
  value: CellValue;
  /** Formula (if any) */
  formula?: string;
  /** Display format */
  format?: string;
  /** Cell styling */
  style?: CellStyle;
  /** Whether cell is read-only */
  readOnly?: boolean;
}

export interface DataGridColumn {
  /** Unique column identifier */
  id: string;
  /** Column header */
  header: string;
  /** Column width in pixels */
  width?: number;
  /** Data type */
  type?: 'text' | 'number' | 'date' | 'formula';
  /** Display format */
  format?: string;
}

export interface CellReference {
  /** Row index */
  row: number;
  /** Column index */
  col: number;
}

export interface DataGridProps {
  /** Column definitions */
  columns: DataGridColumn[];
  /** Grid data (2D array of cells) */
  data: DataGridCell[][];
  /** Change handler */
  onChange?: (data: DataGridCell[][]) => void;
  /** Whether grid is editable */
  editable?: boolean;
  /** Enable formula support */
  formulaSupport?: boolean;
  /** Number of frozen rows at top */
  frozenRows?: number;
  /** Number of frozen columns at left */
  frozenColumns?: number;
  /** Selection mode */
  selectionMode?: 'cell' | 'row' | 'column' | 'range';
  /** Selected cells */
  selectedCells?: CellReference[];
  /** Selection change handler */
  onSelectionChange?: (cells: CellReference[]) => void;
  /** Row height in pixels */
  rowHeight?: number;
  /** Default column width */
  columnWidth?: number;
  /** Show row numbers */
  showRowNumbers?: boolean;
  /** Show column headers */
  showColumnHeaders?: boolean;
  /** Additional class name */
  className?: string;
}

export interface DataGridHandle {
  /** Get cell value */
  getCellValue: (row: number, col: number) => CellValue;
  /** Set cell value */
  setCellValue: (row: number, col: number, value: CellValue) => void;
  /** Get current selection */
  getSelection: () => CellReference[];
  /** Set selection */
  setSelection: (cells: CellReference[]) => void;
  /** Focus a specific cell */
  focusCell: (row: number, col: number) => void;
}

function formatCellValue(value: CellValue, format?: string, type?: string): string {
  if (value === null || value === undefined) return '';

  if (type === 'number' && typeof value === 'number') {
    if (format === 'currency') {
      return `$${value.toFixed(2)}`;
    }
    if (format === 'percent') {
      return `${(value * 100).toFixed(1)}%`;
    }
    return value.toString();
  }

  if (type === 'date' && value instanceof Date) {
    return value.toLocaleDateString();
  }

  return String(value);
}

function getColumnLetter(index: number): string {
  let letter = '';
  let n = index;
  while (n >= 0) {
    letter = String.fromCharCode((n % 26) + 65) + letter;
    n = Math.floor(n / 26) - 1;
  }
  return letter;
}

const DataGrid = forwardRef<DataGridHandle, DataGridProps>(function DataGrid(
  {
    columns,
    data,
    onChange,
    editable = true,
    formulaSupport = false,
    frozenRows = 0,
    frozenColumns = 0,
    selectionMode = 'cell',
    selectedCells: controlledSelectedCells,
    onSelectionChange,
    rowHeight = 32,
    columnWidth = 120,
    showRowNumbers = true,
    showColumnHeaders = true,
    className,
  },
  ref
) {
  const [internalSelectedCells, setInternalSelectedCells] = useState<CellReference[]>([]);
  const [editingCell, setEditingCell] = useState<CellReference | null>(null);
  const [editValue, setEditValue] = useState('');
  const gridRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSelectionControlled = controlledSelectedCells !== undefined;
  const selectedCells = isSelectionControlled ? controlledSelectedCells : internalSelectedCells;

  const columnDefs = useMemo((): DataGridColumn[] => {
    if (columns.length > 0) return columns;
    // Generate columns from data if not provided
    if (data.length > 0 && data[0].length > 0) {
      return data[0].map((_, i): DataGridColumn => ({
        id: getColumnLetter(i),
        header: getColumnLetter(i),
        width: columnWidth,
      }));
    }
    return [];
  }, [columns, data, columnWidth]);

  const updateSelection = useCallback(
    (cells: CellReference[]) => {
      if (isSelectionControlled) {
        onSelectionChange?.(cells);
      } else {
        setInternalSelectedCells(cells);
      }
    },
    [isSelectionControlled, onSelectionChange]
  );

  const isCellSelected = useCallback(
    (row: number, col: number) => {
      return selectedCells.some((cell) => cell.row === row && cell.col === col);
    },
    [selectedCells]
  );

  const handleCellClick = useCallback(
    (row: number, col: number, e: React.MouseEvent) => {
      const cell: CellReference = { row, col };

      if (selectionMode === 'cell') {
        if (e.ctrlKey || e.metaKey) {
          // Toggle selection
          if (isCellSelected(row, col)) {
            updateSelection(selectedCells.filter((c) => c.row !== row || c.col !== col));
          } else {
            updateSelection([...selectedCells, cell]);
          }
        } else {
          updateSelection([cell]);
        }
      } else if (selectionMode === 'row') {
        const rowCells = columnDefs.map((_, i) => ({ row, col: i }));
        updateSelection(rowCells);
      } else if (selectionMode === 'column') {
        const colCells = data.map((_, i) => ({ row: i, col }));
        updateSelection(colCells);
      }
    },
    [selectionMode, selectedCells, isCellSelected, updateSelection, columnDefs, data]
  );

  const handleCellDoubleClick = useCallback(
    (row: number, col: number) => {
      if (!editable) return;
      const cellData = data[row]?.[col];
      if (cellData?.readOnly) return;

      setEditingCell({ row, col });
      const value = cellData?.formula || cellData?.value;
      setEditValue(value !== null && value !== undefined ? String(value) : '');

      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    },
    [editable, data]
  );

  const handleEditComplete = useCallback(() => {
    if (!editingCell || !onChange) {
      setEditingCell(null);
      return;
    }

    const { row, col } = editingCell;
    const newData = data.map((r, ri) =>
      r.map((c, ci) => {
        if (ri === row && ci === col) {
          let newValue: CellValue = editValue;

          // Parse value based on column type
          const colDef = columnDefs[col];
          if (colDef?.type === 'number') {
            const parsed = parseFloat(editValue);
            newValue = isNaN(parsed) ? null : parsed;
          }

          // Check if it's a formula
          if (formulaSupport && editValue.startsWith('=')) {
            return { ...c, formula: editValue, value: newValue };
          }

          return { ...c, value: newValue, formula: undefined };
        }
        return c;
      })
    );

    onChange(newData);
    setEditingCell(null);
  }, [editingCell, editValue, data, columnDefs, formulaSupport, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (editingCell) {
        if (e.key === 'Enter') {
          handleEditComplete();
        } else if (e.key === 'Escape') {
          setEditingCell(null);
        }
        return;
      }

      if (selectedCells.length === 0) return;

      const current = selectedCells[selectedCells.length - 1];
      let newRow = current.row;
      let newCol = current.col;

      switch (e.key) {
        case 'ArrowUp':
          newRow = Math.max(0, current.row - 1);
          break;
        case 'ArrowDown':
          newRow = Math.min(data.length - 1, current.row + 1);
          break;
        case 'ArrowLeft':
          newCol = Math.max(0, current.col - 1);
          break;
        case 'ArrowRight':
          newCol = Math.min(columnDefs.length - 1, current.col + 1);
          break;
        case 'Enter':
        case 'F2':
          handleCellDoubleClick(current.row, current.col);
          return;
        default:
          return;
      }

      e.preventDefault();
      updateSelection([{ row: newRow, col: newCol }]);
    },
    [editingCell, selectedCells, data.length, columnDefs.length, handleEditComplete, handleCellDoubleClick, updateSelection]
  );

  useImperativeHandle(ref, () => ({
    getCellValue: (row, col) => data[row]?.[col]?.value ?? null,
    setCellValue: (row, col, value) => {
      if (!onChange) return;
      const newData = data.map((r, ri) =>
        r.map((c, ci) => (ri === row && ci === col ? { ...c, value } : c))
      );
      onChange(newData);
    },
    getSelection: () => selectedCells,
    setSelection: updateSelection,
    focusCell: (row, col) => {
      updateSelection([{ row, col }]);
      gridRef.current?.focus();
    },
  }));

  const rowNumberWidth = showRowNumbers ? 50 : 0;

  return (
    <div
      ref={gridRef}
      className={cn(
        'overflow-auto border border-room-border rounded-room bg-room-bg-base',
        'focus:outline-none',
        className
      )}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="relative"
        style={{
          width: rowNumberWidth + columnDefs.reduce((sum, col) => sum + (col.width || columnWidth), 0),
          minWidth: '100%',
        }}
      >
        {/* Header row */}
        {showColumnHeaders && (
          <div
            className={cn(
              'flex sticky top-0 z-20 bg-room-bg-surface border-b border-room-border',
              frozenRows > 0 && 'z-30'
            )}
            style={{ height: rowHeight }}
          >
            {/* Corner cell */}
            {showRowNumbers && (
              <div
                className="flex-shrink-0 border-r border-room-border bg-room-bg-surface sticky left-0 z-10"
                style={{ width: rowNumberWidth }}
              />
            )}

            {/* Column headers */}
            {columnDefs.map((col, colIndex) => (
              <div
                key={col.id}
                className={cn(
                  'flex-shrink-0 flex items-center justify-center px-2',
                  'text-xs font-medium text-room-text-muted border-r border-room-border',
                  'select-none',
                  colIndex < frozenColumns && 'sticky bg-room-bg-surface z-10'
                )}
                style={{
                  width: col.width || columnWidth,
                  left: colIndex < frozenColumns
                    ? rowNumberWidth + columnDefs.slice(0, colIndex).reduce((sum, c) => sum + (c.width || columnWidth), 0)
                    : undefined,
                }}
              >
                {col.header}
              </div>
            ))}
          </div>
        )}

        {/* Data rows */}
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              'flex border-b border-room-border',
              rowIndex < frozenRows && 'sticky z-10 bg-room-bg-base'
            )}
            style={{
              height: rowHeight,
              top: rowIndex < frozenRows ? (showColumnHeaders ? rowHeight : 0) + rowIndex * rowHeight : undefined,
            }}
          >
            {/* Row number */}
            {showRowNumbers && (
              <div
                className={cn(
                  'flex-shrink-0 flex items-center justify-center',
                  'text-xs text-room-text-muted bg-room-bg-surface border-r border-room-border',
                  'sticky left-0 z-10'
                )}
                style={{ width: rowNumberWidth }}
              >
                {rowIndex + 1}
              </div>
            )}

            {/* Data cells */}
            {row.map((cell, colIndex) => {
              const colDef = columnDefs[colIndex];
              const isSelected = isCellSelected(rowIndex, colIndex);
              const isEditing = editingCell?.row === rowIndex && editingCell?.col === colIndex;
              const isFrozenCol = colIndex < frozenColumns;

              return (
                <div
                  key={colIndex}
                  className={cn(
                    'flex-shrink-0 flex items-center px-2 border-r border-room-border',
                    'text-sm cursor-default',
                    isSelected && 'bg-room-accent/20 ring-2 ring-room-accent ring-inset',
                    !isSelected && 'hover:bg-room-bg-hover',
                    isFrozenCol && 'sticky bg-room-bg-base z-10'
                  )}
                  style={{
                    width: colDef?.width || columnWidth,
                    left: isFrozenCol
                      ? rowNumberWidth + columnDefs.slice(0, colIndex).reduce((sum, c) => sum + (c.width || columnWidth), 0)
                      : undefined,
                    textAlign: cell.style?.textAlign || colDef?.type === 'number' ? 'right' : 'left',
                    fontWeight: cell.style?.fontWeight,
                    color: cell.style?.color,
                    backgroundColor: cell.style?.backgroundColor,
                  }}
                  onClick={(e) => handleCellClick(rowIndex, colIndex, e)}
                  onDoubleClick={() => handleCellDoubleClick(rowIndex, colIndex)}
                >
                  {isEditing ? (
                    <input
                      ref={inputRef}
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={handleEditComplete}
                      className={cn(
                        'w-full h-full bg-room-bg-base text-room-text-primary',
                        'border-none outline-none text-sm px-0'
                      )}
                    />
                  ) : (
                    <span className="truncate text-room-text-primary">
                      {formatCellValue(cell.value, cell.format || colDef?.format, colDef?.type)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});

export { DataGrid };
export default DataGrid;
