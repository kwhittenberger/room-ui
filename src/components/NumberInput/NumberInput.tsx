import { forwardRef, useState, useRef, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface NumberInputProps {
  /** Current value */
  value?: number | null;
  /** Default value (uncontrolled) */
  defaultValue?: number | null;
  /** Callback when value changes */
  onChange?: (value: number | null) => void;
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Decimal precision */
  precision?: number;
  /** Prefix text (e.g., '$') */
  prefix?: string;
  /** Suffix text (e.g., 'kg') */
  suffix?: string;
  /** Whether to show increment/decrement buttons */
  showButtons?: boolean;
  /** Size of the input */
  size?: 'sm' | 'md' | 'lg';
  /** Name attribute for form submission */
  name?: string;
  /** ID for the input */
  id?: string;
  /** Additional class name */
  className?: string;
}

const sizeConfig = {
  sm: {
    input: 'h-8 text-sm px-2',
    button: 'h-8 w-8',
    label: 'text-sm',
  },
  md: {
    input: 'h-10 text-sm px-3',
    button: 'h-10 w-10',
    label: 'text-sm',
  },
  lg: {
    input: 'h-12 text-base px-4',
    button: 'h-12 w-12',
    label: 'text-base',
  },
};

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    value: controlledValue,
    defaultValue = null,
    onChange,
    label,
    placeholder,
    error,
    disabled = false,
    min,
    max,
    step = 1,
    precision,
    prefix,
    suffix,
    showButtons = true,
    size = 'md',
    name,
    id,
    className,
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const config = sizeConfig[size];

  const [internalValue, setInternalValue] = useState<number | null>(defaultValue);
  const [inputText, setInputText] = useState<string>(
    defaultValue !== null ? formatValue(defaultValue, precision) : ''
  );

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  function formatValue(val: number | null, prec?: number): string {
    if (val === null) return '';
    if (prec !== undefined) {
      return val.toFixed(prec);
    }
    return String(val);
  }

  function parseValue(text: string): number | null {
    if (text === '' || text === '-') return null;
    const parsed = parseFloat(text);
    if (isNaN(parsed)) return null;
    return parsed;
  }

  function clampValue(val: number | null): number | null {
    if (val === null) return null;
    let clamped = val;
    if (min !== undefined && clamped < min) clamped = min;
    if (max !== undefined && clamped > max) clamped = max;
    if (precision !== undefined) {
      clamped = parseFloat(clamped.toFixed(precision));
    }
    return clamped;
  }

  function updateValue(newValue: number | null) {
    const clamped = clampValue(newValue);
    if (!isControlled) {
      setInternalValue(clamped);
    }
    setInputText(formatValue(clamped, precision));
    onChange?.(clamped);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    const parsed = parseValue(text);
    if (parsed !== null || text === '') {
      if (!isControlled) {
        setInternalValue(parsed);
      }
      onChange?.(parsed);
    }
  };

  const handleBlur = () => {
    const parsed = parseValue(inputText);
    updateValue(parsed);
  };

  const handleIncrement = () => {
    if (disabled) return;
    const current = currentValue ?? 0;
    updateValue(current + step);
  };

  const handleDecrement = () => {
    if (disabled) return;
    const current = currentValue ?? 0;
    updateValue(current - step);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  };

  // Sync controlled value to input text
  useEffect(() => {
    if (isControlled) {
      setInputText(formatValue(controlledValue, precision));
    }
  }, [controlledValue, isControlled, precision]);

  const isDecrementDisabled = disabled || (min !== undefined && (currentValue ?? 0) <= min);
  const isIncrementDisabled = disabled || (max !== undefined && (currentValue ?? 0) >= max);

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(config.label, 'font-medium text-room-text-primary')}
        >
          {label}
        </label>
      )}
      <div className="flex items-stretch">
        {showButtons && (
          <button
            type="button"
            onClick={handleDecrement}
            disabled={isDecrementDisabled}
            className={cn(
              'flex items-center justify-center border border-r-0 border-room-border rounded-l-room-sm',
              'bg-room-bg-surface hover:bg-room-bg-hover transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-room-accent focus:z-10',
              config.button,
              isDecrementDisabled && 'opacity-50 cursor-not-allowed hover:bg-room-bg-surface'
            )}
            aria-label="Decrease value"
          >
            <Minus className="h-4 w-4 text-room-text-secondary" />
          </button>
        )}
        <div
          className={cn(
            'relative flex-1 flex items-center',
            'border border-room-border bg-room-bg-surface',
            !showButtons && 'rounded-room-sm',
            error && 'border-room-error',
            disabled && 'opacity-50 bg-room-bg-base'
          )}
        >
          {prefix && (
            <span className="pl-3 text-room-text-muted text-sm">{prefix}</span>
          )}
          <input
            ref={ref || inputRef}
            type="text"
            inputMode="decimal"
            id={id}
            name={name}
            value={inputText}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              'w-full bg-transparent text-room-text-primary text-center',
              'focus:outline-none',
              config.input,
              prefix && 'pl-1',
              suffix && 'pr-1'
            )}
          />
          {suffix && (
            <span className="pr-3 text-room-text-muted text-sm">{suffix}</span>
          )}
        </div>
        {showButtons && (
          <button
            type="button"
            onClick={handleIncrement}
            disabled={isIncrementDisabled}
            className={cn(
              'flex items-center justify-center border border-l-0 border-room-border rounded-r-room-sm',
              'bg-room-bg-surface hover:bg-room-bg-hover transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-room-accent focus:z-10',
              config.button,
              isIncrementDisabled && 'opacity-50 cursor-not-allowed hover:bg-room-bg-surface'
            )}
            aria-label="Increase value"
          >
            <Plus className="h-4 w-4 text-room-text-secondary" />
          </button>
        )}
      </div>
      {error && (
        <span className="text-sm text-room-error">{error}</span>
      )}
    </div>
  );
});

export { NumberInput };
export default NumberInput;
