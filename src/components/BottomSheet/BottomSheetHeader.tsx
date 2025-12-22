import { forwardRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface BottomSheetHeaderProps {
  /** Header title */
  title?: string;
  /** Header subtitle */
  subtitle?: string;
  /** Close handler */
  onClose?: () => void;
  /** Show drag handle */
  showHandle?: boolean;
  /** Additional class name */
  className?: string;
}

const BottomSheetHeader = forwardRef<HTMLDivElement, BottomSheetHeaderProps>(
  function BottomSheetHeader(
    { title, subtitle, onClose, showHandle = true, className },
    ref
  ) {
    return (
      <div ref={ref} className={cn('border-b border-room-border', className)}>
        {/* Handle */}
        {showHandle && (
          <div className="flex items-center justify-center py-3">
            <div className="w-10 h-1 rounded-full bg-room-border" />
          </div>
        )}

        {/* Title and Close */}
        {(title || onClose) && (
          <div className="flex items-start justify-between px-4 pb-4">
            <div>
              {title && (
                <h2 className="text-lg font-semibold text-room-text-primary">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-0.5 text-sm text-room-text-muted">
                  {subtitle}
                </p>
              )}
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 -mr-2 rounded-room-sm text-room-text-muted hover:text-room-text-primary hover:bg-room-bg-hover"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

export { BottomSheetHeader };
export default BottomSheetHeader;
