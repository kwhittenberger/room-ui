import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ActionBarAction {
  /** Unique action ID */
  id: string;
  /** Action label */
  label: string;
  /** Action icon */
  icon?: React.ReactNode;
  /** Click handler */
  onClick: () => void;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Disabled state */
  disabled?: boolean;
}

export interface ActionBarProps {
  /** ActionBar content */
  children: React.ReactNode;
  /** Sticky positioning */
  sticky?: boolean;
  /** Show border */
  bordered?: boolean;
  /** Additional class name */
  className?: string;
}

const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(function ActionBar(
  { children, sticky = false, bordered = true, className },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between gap-4 px-6 py-3',
        'bg-room-bg-elevated',
        bordered && 'border-b border-room-border',
        sticky && 'sticky top-0 z-10',
        className
      )}
    >
      {children}
    </div>
  );
});

export { ActionBar };
export default ActionBar;
