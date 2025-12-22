import React, { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The Lucide icon to display */
  icon: LucideIcon;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label (for screen readers) */
  label?: string;
  /** Loading state */
  loading?: boolean;
  /** Rounded style */
  rounded?: boolean;
}

const variantStyles: Record<string, string> = {
  primary: cn(
    'bg-room-accent text-white',
    'hover:bg-room-accent-hover',
    'active:bg-room-accent-active'
  ),
  secondary: cn(
    'bg-room-bg-surface text-room-text-primary',
    'hover:bg-room-bg-hover',
    'active:bg-room-border'
  ),
  ghost: cn(
    'bg-transparent text-room-text-secondary',
    'hover:bg-room-bg-surface hover:text-room-text-primary',
    'active:bg-room-bg-hover'
  ),
  danger: cn(
    'bg-room-error text-white',
    'hover:bg-red-600',
    'active:bg-red-700'
  ),
};

const sizeStyles: Record<string, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

const iconSizeMap: Record<string, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'ghost',
      size = 'md',
      label,
      loading = false,
      rounded = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const classes = cn(
      // Base styles
      'inline-flex items-center justify-center',
      'transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-room-accent focus-visible:ring-offset-2 focus-visible:ring-offset-room-bg-base',
      // Variant styles
      variantStyles[variant],
      // Size styles
      sizeStyles[size],
      // Shape
      rounded ? 'rounded-full' : 'rounded-room-sm',
      // State styles
      isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      className
    );

    const iconSize = iconSizeMap[size];

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={classes}
        aria-label={label}
        title={label}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin"
            width={iconSize === 'sm' ? 14 : iconSize === 'md' ? 18 : 22}
            height={iconSize === 'sm' ? 14 : iconSize === 'md' ? 18 : 22}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <Icon icon={icon} size={iconSize} />
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
