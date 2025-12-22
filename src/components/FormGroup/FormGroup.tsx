import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface FormGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  /** Group title */
  title?: string;
  /** Group description */
  description?: string;
  children: React.ReactNode;
}

export const FormGroup = forwardRef<HTMLFieldSetElement, FormGroupProps>(
  ({ title, description, children, className, ...props }, ref) => {
    return (
      <fieldset
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <legend className="text-lg font-semibold text-room-text-primary">
                {title}
              </legend>
            )}
            {description && (
              <p className="text-sm text-room-text-muted mt-1">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="space-y-4">
          {children}
        </div>
      </fieldset>
    );
  }
);

FormGroup.displayName = 'FormGroup';
