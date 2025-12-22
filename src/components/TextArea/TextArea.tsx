import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** TextArea label */
  label?: string;
  /** Error message */
  error?: string;
  /** Help text */
  hint?: string;
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const resizeStyles: Record<string, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      hint,
      resize = 'vertical',
      disabled,
      className,
      id,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const textAreaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const textAreaClasses = cn(
      // Base styles
      'w-full rounded-room-sm border bg-room-bg-surface px-3 py-2',
      'text-sm text-room-text-primary placeholder:text-room-text-muted',
      'transition-colors duration-150',
      'focus:outline-none focus:ring-1 focus:ring-room-accent focus:border-room-accent',
      // Resize styles
      resizeStyles[resize],
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
            htmlFor={textAreaId}
            className="block text-sm font-medium text-room-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textAreaId}
          disabled={disabled}
          rows={rows}
          className={textAreaClasses}
          {...props}
        />
        {(error || hint) && (
          <p className={cn('mt-1.5 text-sm', error ? 'text-room-error' : 'text-room-text-muted')}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
