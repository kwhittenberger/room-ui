import { forwardRef } from 'react';
import { Circle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface TimelineItem {
  /** Unique identifier */
  id: string;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Date/time string */
  date?: string;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Color variant */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** Custom content */
  content?: React.ReactNode;
}

export interface TimelineProps {
  /** Timeline items */
  items: TimelineItem[];
  /** Orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Position of content (vertical only) */
  position?: 'left' | 'right' | 'alternate';
  /** Additional class name */
  className?: string;
}

const colorConfig = {
  default: {
    dot: 'bg-room-bg-surface border-room-border',
    line: 'bg-room-border',
  },
  primary: {
    dot: 'bg-room-accent border-room-accent',
    line: 'bg-room-accent/30',
  },
  success: {
    dot: 'bg-room-success border-room-success',
    line: 'bg-room-success/30',
  },
  warning: {
    dot: 'bg-room-warning border-room-warning',
    line: 'bg-room-warning/30',
  },
  error: {
    dot: 'bg-room-error border-room-error',
    line: 'bg-room-error/30',
  },
};

const Timeline = forwardRef<HTMLDivElement, TimelineProps>(function Timeline(
  {
    items,
    orientation = 'vertical',
    position = 'right',
    className,
  },
  ref
) {
  if (orientation === 'horizontal') {
    return (
      <div
        ref={ref}
        className={cn('flex items-start overflow-x-auto', className)}
      >
        {items.map((item, index) => {
          const color = item.color || 'default';
          const colors = colorConfig[color];
          const isLast = index === items.length - 1;

          return (
            <div
              key={item.id}
              className={cn(
                'flex flex-col items-center flex-shrink-0',
                !isLast && 'min-w-[200px]'
              )}
            >
              {/* Timeline track */}
              <div className="flex items-center w-full">
                {/* Left line */}
                {index > 0 && (
                  <div className={cn('flex-1 h-0.5', colors.line)} />
                )}

                {/* Dot */}
                <div
                  className={cn(
                    'flex-shrink-0 flex items-center justify-center',
                    'w-8 h-8 rounded-full border-2',
                    colors.dot
                  )}
                >
                  {item.icon || (
                    <Circle className="h-3 w-3 text-current" fill="currentColor" />
                  )}
                </div>

                {/* Right line */}
                {!isLast && (
                  <div className={cn('flex-1 h-0.5', colors.line)} />
                )}
              </div>

              {/* Content */}
              <div className="mt-3 text-center px-4">
                {item.date && (
                  <time className="text-xs text-room-text-muted">
                    {item.date}
                  </time>
                )}
                <h4 className="text-sm font-medium text-room-text-primary mt-1">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-room-text-secondary mt-1 max-w-[180px]">
                    {item.description}
                  </p>
                )}
                {item.content && (
                  <div className="mt-2">{item.content}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Vertical orientation
  return (
    <div ref={ref} className={cn('relative', className)}>
      {items.map((item, index) => {
        const color = item.color || 'default';
        const colors = colorConfig[color];
        const isLast = index === items.length - 1;
        const isAlternateLeft = position === 'alternate' && index % 2 === 0;
        const showOnLeft = position === 'left' || isAlternateLeft;

        return (
          <div
            key={item.id}
            className={cn(
              'flex',
              position === 'alternate' && 'justify-center',
              position === 'left' && 'flex-row-reverse',
              !isLast && 'pb-8'
            )}
          >
            {/* Left content area (for alternate/left) */}
            {(position === 'alternate' || position === 'left') && (
              <div
                className={cn(
                  'flex-1',
                  position === 'alternate' && 'text-right pr-6',
                  position === 'left' && 'pl-6'
                )}
              >
                {showOnLeft && (
                  <>
                    {item.date && (
                      <time className="text-xs text-room-text-muted">
                        {item.date}
                      </time>
                    )}
                    <h4 className="text-sm font-medium text-room-text-primary mt-1">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-sm text-room-text-secondary mt-1">
                        {item.description}
                      </p>
                    )}
                    {item.content && (
                      <div className="mt-2">{item.content}</div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Timeline track */}
            <div className="relative flex flex-col items-center">
              {/* Dot */}
              <div
                className={cn(
                  'relative z-10 flex items-center justify-center',
                  'w-8 h-8 rounded-full border-2 bg-room-bg-base',
                  colors.dot
                )}
              >
                {item.icon || (
                  <Circle className="h-3 w-3 text-current" fill="currentColor" />
                )}
              </div>

              {/* Connecting line */}
              {!isLast && (
                <div
                  className={cn(
                    'absolute top-8 w-0.5 h-full',
                    colors.line
                  )}
                />
              )}
            </div>

            {/* Right content area */}
            <div
              className={cn(
                'flex-1',
                position === 'alternate' && 'pl-6',
                position === 'right' && 'pl-6',
                position === 'left' && 'text-right pr-6'
              )}
            >
              {!showOnLeft && (
                <>
                  {item.date && (
                    <time className="text-xs text-room-text-muted">
                      {item.date}
                    </time>
                  )}
                  <h4 className="text-sm font-medium text-room-text-primary mt-1">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-sm text-room-text-secondary mt-1">
                      {item.description}
                    </p>
                  )}
                  {item.content && (
                    <div className="mt-2">{item.content}</div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export { Timeline };
export default Timeline;
