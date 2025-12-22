import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface BottomSheetActionsProps {
  /** Action buttons */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

const BottomSheetActions = forwardRef<HTMLDivElement, BottomSheetActionsProps>(
  function BottomSheetActions({ children, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 px-4 py-4',
          'border-t border-room-border bg-room-bg-elevated',
          'sticky bottom-0',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

export { BottomSheetActions };
export default BottomSheetActions;
