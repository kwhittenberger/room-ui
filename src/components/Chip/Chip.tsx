import { forwardRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ChipProps {
  /** Label text */
  label: string;
  /** Style variant */
  variant?: 'filled' | 'outlined';
  /** Color scheme */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Icon to display before label */
  icon?: React.ReactNode;
  /** Avatar to display before label */
  avatar?: React.ReactNode;
  /** Delete handler (shows delete icon when provided) */
  onDelete?: () => void;
  /** Click handler */
  onClick?: () => void;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Whether the chip is selected */
  selected?: boolean;
  /** Additional class name */
  className?: string;
}

const sizeConfig = {
  sm: {
    container: 'h-6 text-xs px-2 gap-1',
    icon: 'h-3 w-3',
    deleteIcon: 'h-3 w-3',
  },
  md: {
    container: 'h-7 text-sm px-2.5 gap-1.5',
    icon: 'h-3.5 w-3.5',
    deleteIcon: 'h-3.5 w-3.5',
  },
  lg: {
    container: 'h-8 text-sm px-3 gap-2',
    icon: 'h-4 w-4',
    deleteIcon: 'h-4 w-4',
  },
};

const colorConfig = {
  default: {
    filled: 'bg-room-bg-surface text-room-text-primary',
    outlined: 'border-room-border text-room-text-primary',
    selectedFilled: 'bg-room-bg-hover text-room-text-primary',
    selectedOutlined: 'border-room-text-muted bg-room-bg-hover text-room-text-primary',
  },
  primary: {
    filled: 'bg-room-accent/20 text-room-accent',
    outlined: 'border-room-accent/50 text-room-accent',
    selectedFilled: 'bg-room-accent text-white',
    selectedOutlined: 'border-room-accent bg-room-accent/20 text-room-accent',
  },
  success: {
    filled: 'bg-room-success/20 text-room-success',
    outlined: 'border-room-success/50 text-room-success',
    selectedFilled: 'bg-room-success text-white',
    selectedOutlined: 'border-room-success bg-room-success/20 text-room-success',
  },
  warning: {
    filled: 'bg-room-warning/20 text-room-warning',
    outlined: 'border-room-warning/50 text-room-warning',
    selectedFilled: 'bg-room-warning text-white',
    selectedOutlined: 'border-room-warning bg-room-warning/20 text-room-warning',
  },
  error: {
    filled: 'bg-room-error/20 text-room-error',
    outlined: 'border-room-error/50 text-room-error',
    selectedFilled: 'bg-room-error text-white',
    selectedOutlined: 'border-room-error bg-room-error/20 text-room-error',
  },
};

const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  {
    label,
    variant = 'filled',
    color = 'default',
    size = 'md',
    icon,
    avatar,
    onDelete,
    onClick,
    disabled = false,
    selected = false,
    className,
  },
  ref
) {
  const sizeClasses = sizeConfig[size];
  const colorClasses = colorConfig[color];

  const getColorClass = () => {
    if (selected) {
      return variant === 'filled' ? colorClasses.selectedFilled : colorClasses.selectedOutlined;
    }
    return variant === 'filled' ? colorClasses.filled : colorClasses.outlined;
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onDelete) {
      onDelete();
    }
  };

  const Container = onClick ? 'button' : 'div';

  return (
    <Container
      ref={ref as React.Ref<HTMLDivElement & HTMLButtonElement>}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-colors',
        sizeClasses.container,
        getColorClass(),
        variant === 'outlined' && 'border',
        disabled && 'opacity-50 cursor-not-allowed',
        onClick && !disabled && 'cursor-pointer hover:opacity-80',
        onClick && 'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent focus-visible:ring-offset-2 focus-visible:ring-offset-room-bg-base',
        className
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={onClick ? 'button' : undefined}
    >
      {avatar && (
        <span className="-ml-1 flex-shrink-0">
          {avatar}
        </span>
      )}

      {icon && !avatar && (
        <span className={cn('flex-shrink-0', sizeClasses.icon)}>
          {icon}
        </span>
      )}

      <span className="truncate">{label}</span>

      {onDelete && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={disabled}
          className={cn(
            'flex-shrink-0 rounded-full p-0.5 transition-colors',
            'hover:bg-current/20 focus:outline-none focus-visible:ring-1 focus-visible:ring-current',
            disabled && 'cursor-not-allowed'
          )}
          aria-label={`Remove ${label}`}
        >
          <X className={sizeClasses.deleteIcon} />
        </button>
      )}
    </Container>
  );
});

export { Chip };
export default Chip;
