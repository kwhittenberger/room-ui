import { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export type SwipeActionVariant = 'default' | 'danger' | 'success' | 'warning';

export interface SwipeAction {
  /** Unique identifier */
  id: string;
  /** Icon to display */
  icon: LucideIcon;
  /** Action label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Color variant */
  variant?: SwipeActionVariant;
}

export interface SwipeActionsProps {
  /** Actions to display */
  actions: SwipeAction[];
  /** Side to display actions on */
  side: 'left' | 'right';
  /** Additional class name */
  className?: string;
}

const variantStyles: Record<SwipeActionVariant, string> = {
  default: 'bg-room-bg-elevated hover:bg-room-bg-hover text-room-text-primary',
  danger: 'bg-room-error hover:bg-room-error/90 text-white',
  success: 'bg-room-success hover:bg-room-success/90 text-white',
  warning: 'bg-room-warning hover:bg-room-warning/90 text-room-text-primary',
};

/**
 * A container for swipe-revealed action buttons.
 * Used internally by SwipeableCard and SwipeableListItem.
 */
const SwipeActions = forwardRef<HTMLDivElement, SwipeActionsProps>(
  function SwipeActions({ actions, side, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute top-0 bottom-0 flex items-stretch',
          side === 'left' ? 'left-0 flex-row' : 'right-0 flex-row-reverse',
          className
        )}
      >
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={action.onClick}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-4 min-w-[72px]',
                'transition-colors',
                variantStyles[action.variant || 'default']
              )}
              aria-label={action.label}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

export { SwipeActions };
export default SwipeActions;
