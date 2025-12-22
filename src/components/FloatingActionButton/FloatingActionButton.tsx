import { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export type FABSize = 'sm' | 'md' | 'lg';
export type FABPosition = 'bottom-right' | 'bottom-left' | 'bottom-center';
export type FABVariant = 'primary' | 'secondary';

export interface FloatingActionButtonProps {
  /** Icon to display */
  icon: LucideIcon;
  /** Click handler */
  onClick?: () => void;
  /** Size variant */
  size?: FABSize;
  /** Position on screen */
  position?: FABPosition;
  /** Color variant */
  variant?: FABVariant;
  /** Whether the button is visible (for scroll-based hiding) */
  visible?: boolean;
  /** Extended label (for extended FAB) */
  label?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Accessible label */
  'aria-label'?: string;
  /** Additional class name */
  className?: string;
}

const sizeStyles: Record<FABSize, string> = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-16 w-16',
};

const iconSizeStyles: Record<FABSize, string> = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-7 w-7',
};

const positionStyles: Record<FABPosition, string> = {
  'bottom-right': 'right-4 bottom-4',
  'bottom-left': 'left-4 bottom-4',
  'bottom-center': 'left-1/2 -translate-x-1/2 bottom-4',
};

const variantStyles: Record<FABVariant, string> = {
  primary: 'bg-room-accent hover:bg-room-accent-hover text-room-text-on-accent',
  secondary: 'bg-room-bg-elevated hover:bg-room-bg-hover text-room-text-primary border border-room-border',
};

/**
 * A floating action button that hovers above content.
 * Typically used for the primary action on a mobile screen.
 */
const FloatingActionButton = forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  function FloatingActionButton(
    {
      icon: Icon,
      onClick,
      size = 'md',
      position = 'bottom-right',
      variant = 'primary',
      visible = true,
      label,
      disabled = false,
      'aria-label': ariaLabel,
      className,
    },
    ref
  ) {
    const isExtended = Boolean(label);

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel || label}
        className={cn(
          'fixed z-50 safe-area-mb',
          'flex items-center justify-center gap-2',
          'rounded-full shadow-lg',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-room-accent focus:ring-offset-2 focus:ring-offset-room-bg-base',
          positionStyles[position],
          variantStyles[variant],
          isExtended ? 'px-4 h-14' : sizeStyles[size],
          visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-16 opacity-0 pointer-events-none',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <Icon className={iconSizeStyles[size]} />
        {isExtended && (
          <span className="font-medium text-sm whitespace-nowrap">{label}</span>
        )}
      </button>
    );
  }
);

export { FloatingActionButton };
export default FloatingActionButton;
