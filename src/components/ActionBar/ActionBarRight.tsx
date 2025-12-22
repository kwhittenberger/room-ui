import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ActionBarRightProps {
  /** Content */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

const ActionBarRight = forwardRef<HTMLDivElement, ActionBarRightProps>(
  function ActionBarRight({ children, className }, ref) {
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

export { ActionBarRight };
export default ActionBarRight;
