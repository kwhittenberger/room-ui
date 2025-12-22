import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export type HoverCardPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface HoverCardProps {
  /** The trigger element */
  trigger: React.ReactNode;
  /** Content to show in the hover card */
  children: React.ReactNode;
  /** Placement of the hover card */
  placement?: HoverCardPlacement;
  /** Delay before showing (ms) */
  openDelay?: number;
  /** Delay before hiding (ms) */
  closeDelay?: number;
  /** Whether the card is open (controlled mode) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Custom class name for the card */
  className?: string;
}

const placementStyles: Record<HoverCardPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowStyles: Record<HoverCardPlacement, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-700 border-l-transparent border-r-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-700 border-l-transparent border-r-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-700 border-t-transparent border-b-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-700 border-t-transparent border-b-transparent border-l-transparent',
};

export function HoverCard({
  trigger,
  children,
  placement = 'bottom',
  openDelay = 200,
  closeDelay = 300,
  open: controlledOpen,
  onOpenChange,
  className = '',
}: HoverCardProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = (value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    openTimeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, openDelay);
  };

  const handleMouseLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  };

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <div className="cursor-pointer">{trigger}</div>

      {/* Hover Card */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 min-w-[200px] max-w-[320px]',
            'bg-slate-800 border border-slate-700 rounded-lg shadow-xl',
            'animate-in fade-in-0 zoom-in-95 duration-150',
            placementStyles[placement],
            className
          )}
          role="tooltip"
        >
          {/* Arrow */}
          <div
            className={cn(
              'absolute w-0 h-0 border-[6px]',
              arrowStyles[placement]
            )}
          />

          {/* Content */}
          <div className="p-3">{children}</div>
        </div>
      )}
    </div>
  );
}

export default HoverCard;
