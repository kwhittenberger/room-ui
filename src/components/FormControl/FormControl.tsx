import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';

export interface FormControlProps {
  /** Label text */
  label?: string;
  /** ID to associate with the form control */
  htmlFor?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Hint/help text */
  hint?: string;
  /** Child form control(s) */
  children: React.ReactNode;
  /** Whether the form control is disabled */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

const FormControl = forwardRef<HTMLDivElement, FormControlProps>(function FormControl(
  {
    label,
    htmlFor,
    required = false,
    error,
    hint,
    children,
    disabled = false,
    className,
  },
  ref
) {
  const generatedId = useId();
  const controlId = htmlFor || generatedId;
  const errorId = error ? `${controlId}-error` : undefined;
  const hintId = hint ? `${controlId}-hint` : undefined;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-1.5',
        disabled && 'opacity-50',
        className
      )}
    >
      {label && (
        <label
          htmlFor={controlId}
          className={cn(
            'text-sm font-medium text-room-text-primary',
            disabled && 'cursor-not-allowed'
          )}
        >
          {label}
          {required && (
            <span className="text-room-error ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      
      <div
        aria-describedby={cn(errorId, hintId) || undefined}
        aria-invalid={error ? 'true' : undefined}
      >
        {children}
      </div>

      {hint && !error && (
        <p
          id={hintId}
          className="text-sm text-room-text-muted"
        >
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="text-sm text-room-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

export { FormControl };
export default FormControl;
