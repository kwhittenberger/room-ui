import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface BottomSheetContentProps {
  /** Content */
  children: React.ReactNode;
  /** Enable scrolling */
  scrollable?: boolean;
  /** Additional class name */
  className?: string;
}

const BottomSheetContent = forwardRef<HTMLDivElement, BottomSheetContentProps>(
  function BottomSheetContent(
    { children, scrollable = true, className },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex-1 px-4 py-4',
          scrollable && 'overflow-auto',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

export { BottomSheetContent };
export default BottomSheetContent;
