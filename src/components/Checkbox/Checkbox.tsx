import React, { forwardRef } from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Checkbox label */
  label?: string;
  /** Description text */
  description?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles: Record<string, { box: string; icon: number; text: string }> = {
  sm: { box: 'w-4 h-4', icon: 12, text: 'text-sm' },
  md: { box: 'w-5 h-5', icon: 14, text: 'text-sm' },
  lg: { box: 'w-6 h-6', icon: 16, text: 'text-base' },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      indeterminate = false,
      size = 'md',
      disabled,
      className,
      id,
      checked,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const styles = sizeStyles[size];

    const boxClasses = cn(
      // Base styles
      styles.box,
      'shrink-0 rounded border-2 transition-colors duration-150',
      'flex items-center justify-center',
      // Checked/indeterminate styles
      (checked || indeterminate)
        ? 'bg-room-accent border-room-accent text-white'
        : 'bg-room-bg-surface border-room-border hover:border-room-border-hover',
      // Disabled styles
      disabled && 'opacity-50 cursor-not-allowed'
    );

    return (
      <label
        className={cn(
          'inline-flex items-start gap-3 cursor-pointer',
          disabled && 'cursor-not-allowed',
          className
        )}
      >
        <span className={boxClasses}>
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            checked={checked}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          {indeterminate ? (
            <Minus size={styles.icon} strokeWidth={3} />
          ) : checked ? (
            <Check size={styles.icon} strokeWidth={3} />
          ) : null}
        </span>
        {(label || description) && (
          <span className="flex-1 min-w-0">
            {label && (
              <span className={cn(styles.text, 'font-medium text-room-text-primary block')}>
                {label}
              </span>
            )}
            {description && (
              <span className="text-sm text-room-text-muted block mt-0.5">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
