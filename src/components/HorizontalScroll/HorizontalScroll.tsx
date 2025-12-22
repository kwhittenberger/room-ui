import { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface HorizontalScrollProps {
  /** Content to display */
  children: React.ReactNode;
  /** Show navigation arrows on desktop */
  showArrows?: boolean;
  /** Show scroll indicators (dots) */
  showIndicators?: boolean;
  /** Gap between items */
  gap?: 'none' | 'sm' | 'md' | 'lg';
  /** Snap behavior */
  snap?: 'none' | 'start' | 'center';
  /** Scroll padding for snap */
  scrollPadding?: number;
  /** Callback when scroll position changes */
  onScroll?: (scrollLeft: number, scrollWidth: number, clientWidth: number) => void;
  /** Additional class name */
  className?: string;
}

const gapStyles: Record<string, string> = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

const snapStyles: Record<string, string> = {
  none: '',
  start: 'snap-x snap-mandatory [&>*]:snap-start',
  center: 'snap-x snap-mandatory [&>*]:snap-center',
};

/**
 * A touch-optimized horizontal scrolling container.
 * Supports snap scrolling and navigation arrows.
 */
const HorizontalScroll = forwardRef<HTMLDivElement, HorizontalScrollProps>(
  function HorizontalScroll(
    {
      children,
      showArrows = true,
      showIndicators = false,
      gap = 'md',
      snap = 'start',
      scrollPadding = 16,
      onScroll,
      className,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const updateScrollState = useCallback(() => {
      const container = containerRef.current;
      if (!container) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

      // Calculate current index for indicators
      if (showIndicators && container.children.length > 0) {
        const items = Array.from(container.children);
        setTotalItems(items.length);

        const visibleIndex = items.findIndex((child) => {
          const rect = child.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          return rect.left >= containerRect.left && rect.left < containerRect.right;
        });

        if (visibleIndex !== -1) {
          setCurrentIndex(visibleIndex);
        }
      }

      onScroll?.(scrollLeft, scrollWidth, clientWidth);
    }, [showIndicators, onScroll]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      updateScrollState();

      container.addEventListener('scroll', updateScrollState, { passive: true });
      window.addEventListener('resize', updateScrollState);

      return () => {
        container.removeEventListener('scroll', updateScrollState);
        window.removeEventListener('resize', updateScrollState);
      };
    }, [updateScrollState]);

    const scroll = useCallback((direction: 'left' | 'right') => {
      const container = containerRef.current;
      if (!container) return;

      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }, []);

    const scrollToIndex = useCallback((index: number) => {
      const container = containerRef.current;
      if (!container || !container.children[index]) return;

      const child = container.children[index] as HTMLElement;
      container.scrollTo({
        left: child.offsetLeft - scrollPadding,
        behavior: 'smooth',
      });
    }, [scrollPadding]);

    return (
      <div className={cn('relative group', className)}>
        {/* Scroll Container */}
        <div
          ref={(node) => {
            (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={cn(
            'flex overflow-x-auto scrollbar-hide',
            '-mx-4 px-4', // Extend to edges but add padding for content
            gapStyles[gap],
            snapStyles[snap]
          )}
          style={{
            scrollPaddingLeft: scrollPadding,
            scrollPaddingRight: scrollPadding,
          }}
        >
          {children}
        </div>

        {/* Left Arrow */}
        {showArrows && canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 z-10',
              'hidden md:flex items-center justify-center',
              'h-10 w-10 rounded-full',
              'bg-room-bg-elevated/90 backdrop-blur-sm',
              'border border-room-border shadow-lg',
              'text-room-text-primary hover:text-room-text-primary',
              'hover:bg-room-bg-hover',
              'opacity-0 group-hover:opacity-100 transition-opacity'
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Right Arrow */}
        {showArrows && canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            className={cn(
              'absolute right-0 top-1/2 -translate-y-1/2 z-10',
              'hidden md:flex items-center justify-center',
              'h-10 w-10 rounded-full',
              'bg-room-bg-elevated/90 backdrop-blur-sm',
              'border border-room-border shadow-lg',
              'text-room-text-primary hover:text-room-text-primary',
              'hover:bg-room-bg-hover',
              'opacity-0 group-hover:opacity-100 transition-opacity'
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {/* Scroll Indicators */}
        {showIndicators && totalItems > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {Array.from({ length: totalItems }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToIndex(index)}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  index === currentIndex
                    ? 'w-4 bg-room-accent'
                    : 'w-1.5 bg-room-text-muted/30 hover:bg-room-text-muted/50'
                )}
                aria-label={`Go to item ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

export { HorizontalScroll };
export default HorizontalScroll;
