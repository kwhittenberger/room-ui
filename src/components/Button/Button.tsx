import React, { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Icon to display */
  icon?: LucideIcon;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Loading state */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary: cn(
    'bg-room-accent text-white',
    'hover:bg-room-accent-hover',
    'active:bg-room-accent-active',
    'focus-visible:ring-room-accent'
  ),
  secondary: cn(
    'bg-room-bg-surface text-room-text-primary',
    'hover:bg-room-bg-hover',
    'active:bg-room-border',
    'focus-visible:ring-room-accent'
  ),
  ghost: cn(
    'bg-transparent text-room-text-secondary',
    'hover:bg-room-bg-surface hover:text-room-text-primary',
    'active:bg-room-bg-hover',
    'focus-visible:ring-room-accent'
  ),
  danger: cn(
    'bg-room-error text-white',
    'hover:bg-red-600',
    'active:bg-red-700',
    'focus-visible:ring-room-error'
  ),
  success: cn(
    'bg-room-success text-white',
    'hover:bg-emerald-600',
    'active:bg-emerald-700',
    'focus-visible:ring-room-success'
  ),
  outline: cn(
    'bg-transparent text-room-text-secondary border border-room-border',
    'hover:bg-room-bg-surface hover:text-room-text-primary hover:border-room-border-hover',
    'active:bg-room-bg-hover',
    'focus-visible:ring-room-accent'
  ),
};

const sizeStyles: Record<string, string> = {
  xs: 'h-7 px-2 text-xs gap-1',
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
};

const iconSizeMap: Record<string, 'xs' | 'sm' | 'md' | 'lg'> = {
  xs: 'xs',
  sm: 'sm',
  md: 'sm',
  lg: 'md',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      loading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const classes = cn(
      // Base styles
      'inline-flex items-center justify-center',
      'font-medium rounded-room-sm',
      'transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-room-bg-base',
      // Variant styles
      variantStyles[variant],
      // Size styles
      sizeStyles[size],
      // State styles
      isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      fullWidth && 'w-full',
      className
    );

    const iconSize = iconSizeMap[size];

    // Loading spinner icon
    const LoadingIcon = () => (
      <svg
        className="animate-spin"
        width={iconSize === 'xs' ? 12 : iconSize === 'sm' ? 14 : iconSize === 'md' ? 16 : 20}
        height={iconSize === 'xs' ? 12 : iconSize === 'sm' ? 14 : iconSize === 'md' ? 16 : 20}
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
    );

    const renderIcon = () => {
      if (loading) {
        return <LoadingIcon />;
      }
      if (icon) {
        return <Icon icon={icon} size={iconSize} />;
      }
      return null;
    };

    const leftIcon = (iconPosition === 'left' || loading) && renderIcon();
    const rightIcon = iconPosition === 'right' && !loading && icon && (
      <Icon icon={icon} size={iconSize} />
    );

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={classes}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
