import { forwardRef, useRef, useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface PullToRefreshProps {
  /** Content to display */
  children: React.ReactNode;
  /** Callback when refresh is triggered */
  onRefresh: () => Promise<void>;
  /** Pull distance to trigger refresh (in pixels) */
  threshold?: number;
  /** Maximum pull distance (in pixels) */
  maxPull?: number;
  /** Custom loading indicator */
  loadingIndicator?: React.ReactNode;
  /** Whether pull to refresh is disabled */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

type PullState = 'idle' | 'pulling' | 'ready' | 'refreshing';

/**
 * A container that allows pulling down to refresh content.
 * Common mobile pattern for refreshing data.
 */
const PullToRefresh = forwardRef<HTMLDivElement, PullToRefreshProps>(
  function PullToRefresh(
    {
      children,
      onRefresh,
      threshold = 80,
      maxPull = 150,
      loadingIndicator,
      disabled = false,
      className,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pullDistance, setPullDistance] = useState(0);
    const [state, setState] = useState<PullState>('idle');

    const startY = useRef(0);
    const isPulling = useRef(false);

    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (disabled || state === 'refreshing') return;

        // Only allow pull when scrolled to top
        if (containerRef.current && containerRef.current.scrollTop <= 0) {
          startY.current = e.touches[0].clientY;
          isPulling.current = true;
        }
      },
      [disabled, state]
    );

    const handleTouchMove = useCallback(
      (e: React.TouchEvent) => {
        if (!isPulling.current || disabled || state === 'refreshing') return;

        const currentY = e.touches[0].clientY;
        let distance = currentY - startY.current;

        // Only pull when going down
        if (distance < 0) {
          distance = 0;
          isPulling.current = false;
        }

        // Apply resistance as we pull further
        if (distance > 0) {
          const resistance = 0.5;
          distance = Math.min(distance * resistance, maxPull);
        }

        setPullDistance(distance);
        setState(distance >= threshold ? 'ready' : 'pulling');
      },
      [disabled, state, threshold, maxPull]
    );

    const handleTouchEnd = useCallback(async () => {
      if (!isPulling.current || disabled) return;
      isPulling.current = false;

      if (pullDistance >= threshold) {
        setState('refreshing');
        setPullDistance(threshold * 0.5); // Keep some distance while refreshing

        try {
          await onRefresh();
        } finally {
          setState('idle');
          setPullDistance(0);
        }
      } else {
        setState('idle');
        setPullDistance(0);
      }
    }, [disabled, pullDistance, threshold, onRefresh]);

    const getIndicatorRotation = () => {
      if (state === 'refreshing') return 0;
      return Math.min((pullDistance / threshold) * 180, 180);
    };

    const getIndicatorOpacity = () => {
      if (state === 'refreshing') return 1;
      return Math.min(pullDistance / (threshold * 0.5), 1);
    };

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn('relative overflow-auto touch-pan-y', className)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pull Indicator */}
        <div
          className={cn(
            'absolute left-0 right-0 flex items-center justify-center',
            'transition-transform duration-200',
            state === 'refreshing' && 'transition-none'
          )}
          style={{
            height: `${Math.max(pullDistance, 0)}px`,
            top: 0,
          }}
        >
          {loadingIndicator || (
            <div
              className={cn(
                'text-room-text-muted',
                state === 'refreshing' && 'animate-spin'
              )}
              style={{
                opacity: getIndicatorOpacity(),
                transform: `rotate(${getIndicatorRotation()}deg)`,
              }}
            >
              <RefreshCw className="h-6 w-6" />
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="transition-transform duration-200"
          style={{
            transform: `translateY(${pullDistance}px)`,
            transition: state === 'pulling' ? 'none' : undefined,
          }}
        >
          {children}
        </div>

        {/* Status text */}
        {pullDistance > 20 && state !== 'refreshing' && (
          <div
            className="absolute left-0 right-0 text-center text-xs text-room-text-muted"
            style={{ top: pullDistance + 8 }}
          >
            {state === 'ready' ? 'Release to refresh' : 'Pull to refresh'}
          </div>
        )}
      </div>
    );
  }
);

export { PullToRefresh };
export default PullToRefresh;
