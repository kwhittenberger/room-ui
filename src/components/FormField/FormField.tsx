import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Field label */
  label: string;
  /** Field is required */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Help text */
  hint?: string;
  /** ID for the form control (used for htmlFor) */
  htmlFor?: string;
  children: React.ReactNode;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      required = false,
      error,
      hint,
      htmlFor,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-room-text-secondary mb-1.5"
        >
          {label}
          {required && <span className="text-room-error ml-1">*</span>}
        </label>
        {children}
        {(error || hint) && (
          <p
            className={cn(
              'mt-1.5 text-sm',
              error ? 'text-room-error' : 'text-room-text-muted'
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
