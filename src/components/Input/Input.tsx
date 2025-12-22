import React, { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Help text */
  hint?: string;
  /** Left icon */
  leftIcon?: LucideIcon;
  /** Right icon */
  rightIcon?: LucideIcon;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles: Record<string, { input: string; icon: 'sm' | 'md' }> = {
  sm: { input: 'h-8 px-2.5 text-sm', icon: 'sm' },
  md: { input: 'h-10 px-3 text-sm', icon: 'sm' },
  lg: { input: 'h-12 px-4 text-base', icon: 'md' },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      size = 'md',
      disabled,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const styles = sizeStyles[size];

    const inputClasses = cn(
      // Base styles
      'w-full rounded-room-sm border bg-room-bg-surface',
      'text-room-text-primary placeholder:text-room-text-muted',
      'transition-colors duration-150',
      'focus:outline-none focus:ring-1 focus:ring-room-accent focus:border-room-accent',
      // Size styles
      styles.input,
      // Icon padding
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',
      // Error styles
      error
        ? 'border-room-error focus:ring-room-error focus:border-room-error'
        : 'border-room-border',
      // Disabled styles
      disabled && 'opacity-50 cursor-not-allowed bg-room-bg-hover',
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-room-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-room-text-muted">
              <Icon icon={leftIcon} size={styles.icon} />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={inputClasses}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-room-text-muted">
              <Icon icon={rightIcon} size={styles.icon} />
            </div>
          )}
        </div>
        {(error || hint) && (
          <p className={cn('mt-1.5 text-sm', error ? 'text-room-error' : 'text-room-text-muted')}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
