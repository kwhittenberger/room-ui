import React, { forwardRef, createContext, useContext } from 'react';
import { cn } from '../../utils/cn';

// Radio Group Context
interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// Radio Group Props
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Group label */
  label?: string;
  /** Radio options */
  options: Array<{ value: string; label: string; description?: string }>;
  /** Selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Group name (for form submission) */
  name?: string;
  /** Layout direction */
  direction?: 'vertical' | 'horizontal';
  /** Disabled state */
  disabled?: boolean;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      name = 'radio-group',
      direction = 'vertical',
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <RadioGroupContext.Provider value={{ name, value, onChange, disabled }}>
        <div ref={ref} role="radiogroup" aria-label={label} className={className} {...props}>
          {label && (
            <div className="text-sm font-medium text-room-text-secondary mb-3">
              {label}
            </div>
          )}
          <div
            className={cn(
              'flex',
              direction === 'vertical' ? 'flex-col gap-3' : 'flex-row flex-wrap gap-4'
            )}
          >
            {options.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                label={option.label}
                description={option.description}
              />
            ))}
          </div>
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

// Radio Props
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Radio label */
  label?: string;
  /** Description text */
  description?: string;
  /** Radio size */
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles: Record<string, { radio: string; dot: string; text: string }> = {
  sm: { radio: 'w-4 h-4', dot: 'w-2 h-2', text: 'text-sm' },
  md: { radio: 'w-5 h-5', dot: 'w-2.5 h-2.5', text: 'text-sm' },
  lg: { radio: 'w-6 h-6', dot: 'w-3 h-3', text: 'text-base' },
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      description,
      size = 'md',
      disabled: propDisabled,
      className,
      value,
      checked: propChecked,
      onChange: propOnChange,
      name: propName,
      ...props
    },
    ref
  ) => {
    const context = useContext(RadioGroupContext);

    const name = propName || context?.name;
    const checked = propChecked ?? (context?.value === value);
    const disabled = propDisabled ?? context?.disabled;
    const onChange = propOnChange || ((e: React.ChangeEvent<HTMLInputElement>) => {
      if (context?.onChange && e.target.value) {
        context.onChange(e.target.value);
      }
    });

    const styles = sizeStyles[size];

    const radioClasses = cn(
      // Base styles
      styles.radio,
      'shrink-0 rounded-full border-2 transition-colors duration-150',
      'flex items-center justify-center',
      // Checked styles
      checked
        ? 'bg-room-accent border-room-accent'
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
        <span className={radioClasses}>
          <input
            ref={ref}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="sr-only"
            {...props}
          />
          {checked && (
            <span className={cn(styles.dot, 'bg-white rounded-full')} />
          )}
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

Radio.displayName = 'Radio';
