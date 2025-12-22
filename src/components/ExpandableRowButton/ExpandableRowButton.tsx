import { ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ExpandableRowButtonProps {
  /** Whether the row is expanded */
  expanded: boolean;
  /** Callback when clicked */
  onClick: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Custom class name */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

const sizeClasses: Record<string, { button: string; icon: string }> = {
  sm: { button: 'h-6 w-6', icon: 'h-3 w-3' },
  md: { button: 'h-8 w-8', icon: 'h-4 w-4' },
  lg: { button: 'h-10 w-10', icon: 'h-5 w-5' },
};

export function ExpandableRowButton({
  expanded,
  onClick,
  disabled = false,
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
}: ExpandableRowButtonProps) {
  const Icon = expanded ? ChevronDown : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-expanded={expanded}
      aria-label={ariaLabel || (expanded ? 'Collapse row' : 'Expand row')}
      className={cn(
        'inline-flex items-center justify-center rounded-md',
        'text-slate-400 hover:text-slate-200 hover:bg-slate-700',
        'transition-all duration-150',
        'focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900',
        disabled && 'opacity-50 cursor-not-allowed',
        sizeClasses[size].button,
        className
      )}
    >
      <Icon
        className={cn(
          sizeClasses[size].icon,
          'transition-transform duration-150',
          expanded && 'transform'
        )}
      />
    </button>
  );
}

export default ExpandableRowButton;
