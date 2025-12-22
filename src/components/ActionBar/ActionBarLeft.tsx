import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ActionBarLeftProps {
  /** Content */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

const ActionBarLeft = forwardRef<HTMLDivElement, ActionBarLeftProps>(
  function ActionBarLeft({ children, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
      >
        {children}
      </div>
    );
  }
);

export { ActionBarLeft };
export default ActionBarLeft;
