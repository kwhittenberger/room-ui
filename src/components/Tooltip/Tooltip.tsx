import React, { useState, useRef, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface TooltipProps {
  /** The element that triggers the tooltip */
  children: React.ReactNode;
  /** The tooltip content */
  content: React.ReactNode;
  /** Position of the tooltip relative to the trigger */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay in milliseconds before showing the tooltip */
  delay?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Additional className for the tooltip */
  className?: string;
}

const positionStyles = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowPositionStyles = {
  top: 'top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-room-bg-hover',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-room-bg-hover',
  left: 'left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-room-bg-hover',
  right: 'right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-room-bg-hover',
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      position = 'top',
      delay = 200,
      disabled = false,
      className,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const handleMouseEnter = () => {
      if (disabled) return;
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    const handleFocus = () => {
      if (disabled) return;
      setIsVisible(true);
    };

    const handleBlur = () => {
      setIsVisible(false);
    };

    return (
      <div
        ref={ref}
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
        {isVisible && content && (
          <div
            className={cn(
              'absolute z-50 whitespace-nowrap pointer-events-none',
              positionStyles[position]
            )}
            role="tooltip"
          >
            <div
              className={cn(
                'bg-room-bg-hover text-room-text-primary text-xs',
                'px-3 py-1.5 rounded-room-sm shadow-room',
                'animate-fade-in',
                className
              )}
            >
              {content}
              <div className={cn('absolute', arrowPositionStyles[position])} />
            </div>
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
