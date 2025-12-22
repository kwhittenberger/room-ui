import React, { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The Lucide icon to display */
  icon: LucideIcon;
  /** Main label text */
  label: string;
  /** Optional description text */
  description?: string;
  /** Button variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const variantStyles: Record<string, { container: string; icon: string }> = {
  default: {
    container: cn(
      'bg-room-bg-surface',
      'hover:bg-room-bg-hover',
      'active:bg-room-border',
      'border-room-border'
    ),
    icon: 'text-room-text-muted',
  },
  primary: {
    container: cn(
      'bg-room-accent-muted',
      'hover:bg-cyan-800',
      'active:bg-cyan-700',
      'border-cyan-700'
    ),
    icon: 'text-room-accent',
  },
  success: {
    container: cn(
      'bg-room-success-muted',
      'hover:bg-emerald-800',
      'active:bg-emerald-700',
      'border-emerald-700'
    ),
    icon: 'text-room-success',
  },
  warning: {
    container: cn(
      'bg-room-warning-muted',
      'hover:bg-amber-800',
      'active:bg-amber-700',
      'border-amber-700'
    ),
    icon: 'text-room-warning',
  },
  danger: {
    container: cn(
      'bg-room-error-muted',
      'hover:bg-red-800',
      'active:bg-red-700',
      'border-red-700'
    ),
    icon: 'text-room-error',
  },
};

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      icon,
      label,
      description,
      variant = 'default',
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant];

    const classes = cn(
      // Base styles
      'flex items-center gap-3 p-4 w-full',
      'rounded-room-lg border',
      'transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-room-accent focus-visible:ring-offset-2 focus-visible:ring-offset-room-bg-base',
      'text-left',
      // Variant styles
      styles.container,
      // State styles
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      className
    );

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={classes}
        {...props}
      >
        <div className={cn('shrink-0 p-2 rounded-room bg-black/20', styles.icon)}>
          <Icon icon={icon} size="lg" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-room-text-primary">{label}</div>
          {description && (
            <div className="text-sm text-room-text-muted truncate">{description}</div>
          )}
        </div>
      </button>
    );
  }
);

ActionButton.displayName = 'ActionButton';
