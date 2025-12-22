import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ActionBarCenterProps {
  /** Content */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

const ActionBarCenter = forwardRef<HTMLDivElement, ActionBarCenterProps>(
  function ActionBarCenter({ children, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center gap-2 flex-1', className)}
      >
        {children}
      </div>
    );
  }
);

export { ActionBarCenter };
export default ActionBarCenter;
