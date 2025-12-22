import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Select label */
  label?: string;
  /** Error message */
  error?: string;
  /** Help text */
  hint?: string;
  /** Select options */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Select size */
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles: Record<string, string> = {
  sm: 'h-8 pl-2.5 pr-8 text-sm',
  md: 'h-10 pl-3 pr-10 text-sm',
  lg: 'h-12 pl-4 pr-12 text-base',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      options,
      placeholder,
      size = 'md',
      disabled,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const selectClasses = cn(
      // Base styles
      'w-full rounded-room-sm border bg-room-bg-surface appearance-none cursor-pointer',
      'text-room-text-primary',
      'transition-colors duration-150',
      'focus:outline-none focus:ring-1 focus:ring-room-accent focus:border-room-accent',
      // Size styles
      sizeStyles[size],
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
            htmlFor={selectId}
            className="block text-sm font-medium text-room-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={selectClasses}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none',
              'text-room-text-muted',
              size === 'sm' && 'w-4 h-4',
              size === 'md' && 'w-4 h-4',
              size === 'lg' && 'w-5 h-5'
            )}
          />
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

Select.displayName = 'Select';
