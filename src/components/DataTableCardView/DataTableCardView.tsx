import { forwardRef } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Skeleton } from '../Loading';
import { Dropdown } from '../Dropdown';
import type { DataTableAction } from '../DataTable';

export interface CardViewField<T> {
  /** Field label */
  label: string;
  /** Value renderer */
  value: (row: T) => React.ReactNode;
}

export interface CardViewConfig<T> {
  /** Title renderer */
  title: (row: T) => React.ReactNode;
  /** Subtitle renderer */
  subtitle?: (row: T) => React.ReactNode;
  /** Image URL getter */
  image?: (row: T) => string;
  /** Badge renderer */
  badge?: (row: T) => React.ReactNode;
  /** Additional fields to display */
  fields?: CardViewField<T>[];
}

export interface DataTableCardViewProps<T> {
  /** Data to display */
  data: T[];
  /** Card configuration */
  config: CardViewConfig<T>;
  /** Loading state */
  loading?: boolean;
  /** Number of skeleton cards to show when loading */
  loadingCards?: number;
  /** Card click handler */
  onCardClick?: (row: T) => void;
  /** Card actions */
  actions?: DataTableAction<T>[];
  /** Function to get unique row ID */
  getRowId?: (row: T) => string;
  /** Grid columns (1-4) */
  columns?: 1 | 2 | 3 | 4;
  /** Empty state message */
  emptyMessage?: string;
  /** Additional class name */
  className?: string;
}

const columnConfig = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const DataTableCardView = forwardRef(function DataTableCardView<T>(
  {
    data,
    config,
    loading = false,
    loadingCards = 6,
    onCardClick,
    actions = [],
    getRowId = (row: T) => String((row as Record<string, unknown>).id ?? JSON.stringify(row)),
    columns = 3,
    emptyMessage = 'No items found',
    className,
  }: DataTableCardViewProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  if (loading) {
    return (
      <div
        ref={ref}
        className={cn('grid gap-4', columnConfig[columns], className)}
      >
        {Array.from({ length: loadingCards }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="rounded-room border border-room-border bg-room-bg-elevated p-4"
          >
            {config.image && (
              <Skeleton height={160} className="mb-4 rounded-room-sm" />
            )}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <Skeleton height={20} width="70%" className="mb-2" />
                {config.subtitle && <Skeleton height={16} width="50%" />}
              </div>
              {config.badge && <Skeleton width={60} height={24} />}
            </div>
            {config.fields && config.fields.length > 0 && (
              <div className="mt-4 space-y-2">
                {config.fields.slice(0, 3).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton width={80} height={14} />
                    <Skeleton width={100} height={14} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        ref={ref}
        className={cn(
          'py-12 text-center rounded-room border border-room-border bg-room-bg-elevated',
          className
        )}
      >
        <p className="text-room-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn('grid gap-4', columnConfig[columns], className)}
    >
      {data.map((row) => {
        const rowId = getRowId(row);

        return (
          <div
            key={rowId}
            onClick={() => onCardClick?.(row)}
            className={cn(
              'rounded-room border border-room-border bg-room-bg-elevated overflow-hidden transition-colors',
              onCardClick && 'cursor-pointer hover:border-room-accent/50'
            )}
          >
            {/* Image */}
            {config.image && (
              <div className="relative h-40 bg-room-bg-surface">
                <img
                  src={config.image(row)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-room-text-primary truncate">
                    {config.title(row)}
                  </div>
                  {config.subtitle && (
                    <div className="text-xs text-room-text-muted mt-0.5 truncate">
                      {config.subtitle(row)}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {config.badge && config.badge(row)}

                  {actions.length > 0 && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <Dropdown
                        trigger={
                          <button
                            type="button"
                            className="p-1 rounded-room-sm hover:bg-room-bg-hover text-room-text-muted hover:text-room-text-primary"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        }
                        items={actions.map((action) => {
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
                    </div>
                  )}
                </div>
              </div>

              {/* Fields */}
              {config.fields && config.fields.length > 0 && (
                <div className="mt-4 space-y-2">
                  {config.fields.map((field, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-room-text-muted">{field.label}</span>
                      <span className="text-room-text-secondary">
                        {field.value(row)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}) as <T>(props: DataTableCardViewProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }) => React.ReactElement;

export { DataTableCardView };
export default DataTableCardView;
