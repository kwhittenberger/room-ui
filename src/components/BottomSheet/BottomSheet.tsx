import { forwardRef, useEffect, useCallback, useState, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface BottomSheetProps {
  /** Whether sheet is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Sheet title */
  title?: string;
  /** Snap points as percentages of viewport height */
  snapPoints?: number[];
  /** Default snap point index */
  defaultSnapPoint?: number;
  /** Whether sheet can be dismissed by dragging down */
  dismissible?: boolean;
  /** Sheet content */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  function BottomSheet(
    {
      isOpen,
      onClose,
      title,
      snapPoints = [50, 90],
      defaultSnapPoint = 0,
      dismissible = true,
      children,
      className,
    },
    ref
  ) {
    const [currentSnapIndex, setCurrentSnapIndex] = useState(defaultSnapPoint);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const startY = useRef(0);
    const sheetRef = useRef<HTMLDivElement>(null);

    const currentHeight = snapPoints[currentSnapIndex] || 50;

    useEffect(() => {
      if (isOpen) {
        setCurrentSnapIndex(defaultSnapPoint);
        setDragOffset(0);
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen, defaultSnapPoint]);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      startY.current = e.touches[0].clientY;
      setIsDragging(true);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
      if (!isDragging) return;
      const deltaY = e.touches[0].clientY - startY.current;
      setDragOffset(Math.max(0, deltaY));
    }, [isDragging]);

    const handleTouchEnd = useCallback(() => {
      setIsDragging(false);
      if (dragOffset > 100 && dismissible) {
        onClose();
      } else if (dragOffset > 50) {
        // Snap to lower point
        if (currentSnapIndex > 0) {
          setCurrentSnapIndex(currentSnapIndex - 1);
        } else if (dismissible) {
          onClose();
        }
      }
      setDragOffset(0);
    }, [dragOffset, dismissible, currentSnapIndex, onClose]);

    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-50 bg-black/50 transition-opacity"
          onClick={dismissible ? onClose : undefined}
        />

        {/* Sheet */}
        <div
          ref={ref}
          className={cn(
            'fixed inset-x-0 bottom-0 z-50',
            'bg-room-bg-elevated rounded-t-room-lg',
            'transition-transform duration-200 ease-out',
            !isDragging && 'transition-all',
            className
          )}
          style={{
            height: `${currentHeight}vh`,
            transform: `translateY(${dragOffset}px)`,
          }}
        >
          {/* Handle */}
          <div
            ref={sheetRef}
            className="flex items-center justify-center py-3 cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-10 h-1 rounded-full bg-room-border" />
          </div>

          {/* Header */}
          {title && (
            <div className="flex items-center justify-between px-4 pb-3 border-b border-room-border">
              <h2 className="text-lg font-semibold text-room-text-primary">{title}</h2>
              {dismissible && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-room-sm text-room-text-muted hover:text-room-text-primary hover:bg-room-bg-hover"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </>
    );
  }
);

export { BottomSheet };
export default BottomSheet;
