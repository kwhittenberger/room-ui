import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Skeleton } from './Skeleton';

export interface SkeletonCardProps {
  /** Whether to show image placeholder */
  showImage?: boolean;
  /** Whether to show title placeholder */
  showTitle?: boolean;
  /** Whether to show description placeholder */
  showDescription?: boolean;
  /** Number of text lines to show */
  lines?: number;
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
  /** Additional class name */
  className?: string;
}

const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(function SkeletonCard(
  {
    showImage = true,
    showTitle = true,
    showDescription = true,
    lines = 3,
    animation = 'pulse',
    className,
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-room-bg-elevated rounded-room border border-room-border overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      {showImage && (
        <Skeleton
          variant="rectangular"
          height={160}
          width="100%"
          animation={animation}
          className="rounded-none"
        />
      )}

      <div className="p-4 space-y-3">
        {showTitle && (
          <Skeleton
            variant="text"
            height={24}
            width="60%"
            animation={animation}
          />
        )}

        {showDescription && (
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, index) => (
              <Skeleton
                key={index}
                variant="text"
                height={16}
                width={index === lines - 1 ? '80%' : '100%'}
                animation={animation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export { SkeletonCard };
export default SkeletonCard;
