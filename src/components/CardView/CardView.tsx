import { cn } from '../../utils/cn';
import { Card } from '../Card';

export interface CardViewItem<T = unknown> {
  /** The underlying data */
  data: T;
  /** Card title */
  title: string;
  /** Card subtitle */
  subtitle?: string;
  /** Card description */
  description?: string;
  /** Image URL */
  image?: string;
  /** Badge to display */
  badge?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Additional metadata */
  metadata?: Array<{ label: string; value: string | React.ReactNode }>;
}

export interface CardViewProps<T = unknown> {
  /** Items to display as cards */
  items: CardViewItem<T>[];
  /** Callback when a card is clicked */
  onItemClick?: (item: T) => void;
  /** Number of columns */
  columns?: 1 | 2 | 3 | 4;
  /** Card variant */
  variant?: 'default' | 'compact';
  /** Whether cards are hoverable */
  hoverable?: boolean;
  /** Empty state content */
  emptyState?: React.ReactNode;
  /** Custom render function for card content */
  renderCard?: (item: CardViewItem<T>, index: number) => React.ReactNode;
  /** Custom class name */
  className?: string;
}

const columnClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

export function CardView<T = unknown>({
  items,
  onItemClick,
  columns = 3,
  variant = 'default',
  hoverable = true,
  emptyState,
  renderCard,
  className = '',
}: CardViewProps<T>) {
  if (items.length === 0 && emptyState) {
    return <div className={className}>{emptyState}</div>;
  }

  return (
    <div className={cn('grid gap-4', columnClasses[columns], className)}>
      {items.map((item, index) => {
        if (renderCard) {
          return <div key={index}>{renderCard(item, index)}</div>;
        }

        return (
          <Card
            key={index}
            variant="default"
            hoverable={hoverable && !!onItemClick}
            onClick={onItemClick ? () => onItemClick(item.data) : undefined}
            className={cn(
              'overflow-hidden',
              onItemClick && 'cursor-pointer'
            )}
          >
            {/* Image */}
            {item.image && (
              <div className="relative h-40 -mx-4 -mt-4 mb-4 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.badge && (
                  <div className="absolute top-2 right-2">{item.badge}</div>
                )}
              </div>
            )}

            {/* Badge (if no image) */}
            {!item.image && item.badge && (
              <div className="mb-2">{item.badge}</div>
            )}

            {/* Title */}
            <h3 className={cn(
              'font-semibold text-slate-100',
              variant === 'compact' ? 'text-sm' : 'text-base'
            )}>
              {item.title}
            </h3>

            {/* Subtitle */}
            {item.subtitle && (
              <p className={cn(
                'text-slate-400 mt-0.5',
                variant === 'compact' ? 'text-xs' : 'text-sm'
              )}>
                {item.subtitle}
              </p>
            )}

            {/* Description */}
            {item.description && variant !== 'compact' && (
              <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                {item.description}
              </p>
            )}

            {/* Metadata */}
            {item.metadata && item.metadata.length > 0 && variant !== 'compact' && (
              <div className="mt-3 pt-3 border-t border-slate-700 space-y-1">
                {item.metadata.map((meta, metaIndex) => (
                  <div key={metaIndex} className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{meta.label}</span>
                    <span className="text-slate-300">{meta.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            {item.footer && (
              <div className="mt-4 pt-3 border-t border-slate-700">
                {item.footer}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

export default CardView;
