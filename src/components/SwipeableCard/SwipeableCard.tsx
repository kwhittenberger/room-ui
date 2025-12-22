import { forwardRef, useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { SwipeActions, type SwipeAction } from '../SwipeActions';

export interface SwipeableCardProps {
  /** Content to display */
  children: React.ReactNode;
  /** Actions revealed on left swipe */
  leftActions?: SwipeAction[];
  /** Actions revealed on right swipe */
  rightActions?: SwipeAction[];
  /** Swipe threshold to reveal actions (in pixels) */
  threshold?: number;
  /** Callback when swipe starts */
  onSwipeStart?: () => void;
  /** Callback when swipe ends */
  onSwipeEnd?: () => void;
  /** Whether swiping is disabled */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * A card that can be swiped to reveal action buttons.
 * Similar to SwipeableListItem but with card styling.
 */
const SwipeableCard = forwardRef<HTMLDivElement, SwipeableCardProps>(
  function SwipeableCard(
    {
      children,
      leftActions = [],
      rightActions = [],
      threshold = 50,
      onSwipeStart,
      onSwipeEnd,
      disabled = false,
      className,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [translateX, setTranslateX] = useState(0);
    const [isSwipping, setIsSwipping] = useState(false);

    const startX = useRef(0);
    const currentX = useRef(0);

    const leftActionsWidth = leftActions.length * 72;
    const rightActionsWidth = rightActions.length * 72;

    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (disabled) return;
        startX.current = e.touches[0].clientX;
        currentX.current = startX.current;
        setIsSwipping(true);
        onSwipeStart?.();
      },
      [disabled, onSwipeStart]
    );

    const handleTouchMove = useCallback(
      (e: React.TouchEvent) => {
        if (!isSwipping || disabled) return;

        currentX.current = e.touches[0].clientX;
        let diff = currentX.current - startX.current;

        // Add the current translateX to allow continuing from an open state
        diff += translateX;

        // Limit swipe distance
        const maxLeft = rightActions.length > 0 ? rightActionsWidth : 0;
        const maxRight = leftActions.length > 0 ? leftActionsWidth : 0;

        // Constrain with resistance at edges
        if (diff < -maxLeft) {
          diff = -maxLeft - (Math.abs(diff) - maxLeft) * 0.2;
        } else if (diff > maxRight) {
          diff = maxRight + (diff - maxRight) * 0.2;
        }

        if (contentRef.current) {
          contentRef.current.style.transform = `translateX(${diff}px)`;
          contentRef.current.style.transition = 'none';
        }
      },
      [isSwipping, disabled, translateX, leftActions.length, rightActions.length, leftActionsWidth, rightActionsWidth]
    );

    const handleTouchEnd = useCallback(() => {
      if (!isSwipping) return;
      setIsSwipping(false);

      const diff = currentX.current - startX.current + translateX;
      let finalTranslate = 0;

      // Snap to open or closed position
      if (diff < -threshold && rightActions.length > 0) {
        finalTranslate = -rightActionsWidth;
      } else if (diff > threshold && leftActions.length > 0) {
        finalTranslate = leftActionsWidth;
      }

      setTranslateX(finalTranslate);
      if (contentRef.current) {
        contentRef.current.style.transform = `translateX(${finalTranslate}px)`;
        contentRef.current.style.transition = 'transform 0.2s ease-out';
      }

      onSwipeEnd?.();
    }, [isSwipping, translateX, threshold, leftActions.length, rightActions.length, leftActionsWidth, rightActionsWidth, onSwipeEnd]);

    // Reset on outside click
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (translateX !== 0 && containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setTranslateX(0);
          if (contentRef.current) {
            contentRef.current.style.transform = 'translateX(0)';
            contentRef.current.style.transition = 'transform 0.2s ease-out';
          }
        }
      };

      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }, [translateX]);

    const handleClose = useCallback(() => {
      setTranslateX(0);
      if (contentRef.current) {
        contentRef.current.style.transform = 'translateX(0)';
        contentRef.current.style.transition = 'transform 0.2s ease-out';
      }
    }, []);

    // Wrap action onClick to close after action
    const wrapActions = (actions: SwipeAction[]): SwipeAction[] =>
      actions.map((action) => ({
        ...action,
        onClick: () => {
          action.onClick();
          handleClose();
        },
      }));

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
        className={cn(
          'relative overflow-hidden rounded-room',
          className
        )}
      >
        {/* Left Actions */}
        {leftActions.length > 0 && (
          <SwipeActions
            actions={wrapActions(leftActions)}
            side="left"
            className="rounded-l-room"
          />
        )}

        {/* Right Actions */}
        {rightActions.length > 0 && (
          <SwipeActions
            actions={wrapActions(rightActions)}
            side="right"
            className="rounded-r-room"
          />
        )}

        {/* Content */}
        <div
          ref={contentRef}
          className={cn(
            'relative bg-room-bg-surface border border-room-border rounded-room',
            'touch-pan-y',
            disabled && 'pointer-events-none'
          )}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {children}
        </div>
      </div>
    );
  }
);

export { SwipeableCard };
export default SwipeableCard;
