import { forwardRef, useId, useState } from 'react';
import { cn } from '../../utils/cn';

export interface SwitchProps {
  /** Whether the switch is checked */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when the switch is toggled */
  onChange?: (checked: boolean) => void;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Position of the label relative to the switch */
  labelPosition?: 'left' | 'right';
  /** Size of the switch */
  size?: 'sm' | 'md' | 'lg';
  /** Name attribute for form submission */
  name?: string;
  /** ID for the switch */
  id?: string;
  /** Additional class name */
  className?: string;
}

const sizeConfig = {
  sm: {
    track: 'w-8 h-4',
    thumb: 'h-3 w-3',
    thumbOffset: 'left-0.5',
    thumbCheckedOffset: 'left-[18px]',
    label: 'text-sm',
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'h-5 w-5',
    thumbOffset: 'left-0.5',
    thumbCheckedOffset: 'left-[22px]',
    label: 'text-sm',
  },
  lg: {
    track: 'w-14 h-7',
    thumb: 'h-6 w-6',
    thumbOffset: 'left-0.5',
    thumbCheckedOffset: 'left-[30px]',
    label: 'text-base',
  },
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    disabled = false,
    label,
    labelPosition = 'right',
    size = 'md',
    name,
    id,
    className,
  },
  ref
) {
  const generatedId = useId();
  const switchId = id || generatedId;
  const config = sizeConfig[size];

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  const switchElement = (
    <label
      htmlFor={switchId}
      className={cn(
        'relative inline-flex items-center cursor-pointer select-none',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        id={switchId}
        name={name}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />
      {/* Track */}
      <div
        className={cn(
          'rounded-full transition-colors duration-200',
          config.track,
          isChecked
            ? 'bg-room-accent'
            : 'bg-room-bg-surface border border-room-border'
        )}
      >
        {/* Thumb */}
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all duration-200',
            config.thumb,
            isChecked ? config.thumbCheckedOffset : config.thumbOffset
          )}
        />
      </div>
    </label>
  );

  if (!label) {
    return <div className={className}>{switchElement}</div>;
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-3',
        disabled && 'opacity-50',
        className
      )}
    >
      {labelPosition === 'left' && (
        <label
          htmlFor={switchId}
          className={cn(
            config.label,
            'text-room-text-primary cursor-pointer',
            disabled && 'cursor-not-allowed'
          )}
        >
          {label}
        </label>
      )}
      {switchElement}
      {labelPosition === 'right' && (
        <label
          htmlFor={switchId}
          className={cn(
            config.label,
            'text-room-text-primary cursor-pointer',
            disabled && 'cursor-not-allowed'
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
});

export { Switch };
export default Switch;
