import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Calendar } from './Calendar';

export interface DatePickerProps {
  /** Selected date value */
  value?: Date | string | null;
  /** Default date (uncontrolled) */
  defaultValue?: Date | string | null;
  /** Callback when date changes */
  onChange?: (date: Date | null) => void;
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Minimum selectable date */
  minDate?: Date | string;
  /** Maximum selectable date */
  maxDate?: Date | string;
  /** Date format for display (default: 'MM/DD/YYYY') */
  format?: string;
  /** Whether to show clear button */
  clearable?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Name attribute for form submission */
  name?: string;
  /** ID attribute */
  id?: string;
  /** Additional class name */
  className?: string;
}

export interface DatePickerHandle {
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
}

const sizeConfig = {
  sm: {
    input: 'h-8 text-sm px-2',
    icon: 'h-3.5 w-3.5',
    label: 'text-sm',
  },
  md: {
    input: 'h-10 text-sm px-3',
    icon: 'h-4 w-4',
    label: 'text-sm',
  },
  lg: {
    input: 'h-12 text-base px-4',
    icon: 'h-5 w-5',
    label: 'text-base',
  },
};

function parseDate(value: Date | string | null | undefined): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(date: Date | null, format: string): string {
  if (!date) return '';

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  // Simple format handling
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('M', String(date.getMonth() + 1))
    .replace('D', String(date.getDate()));
}

const DatePicker = forwardRef<DatePickerHandle, DatePickerProps>(function DatePicker(
  {
    value: controlledValue,
    defaultValue,
    onChange,
    label,
    placeholder = 'Select date',
    error,
    disabled = false,
    minDate,
    maxDate,
    format = 'MM/DD/YYYY',
    clearable = false,
    size = 'md',
    name,
    id,
    className,
  },
  ref
) {
  const [internalValue, setInternalValue] = useState<Date | null>(() =>
    parseDate(defaultValue)
  );
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const selectedDate = isControlled ? parseDate(controlledValue) : internalValue;
  const config = sizeConfig[size];

  const parsedMinDate = parseDate(minDate) ?? undefined;
  const parsedMaxDate = parseDate(maxDate) ?? undefined;

  useImperativeHandle(ref, () => ({
    focus: () => triggerRef.current?.focus(),
    blur: () => triggerRef.current?.blur(),
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 4,
      left: rect.left,
    });
  };

  const handleOpen = () => {
    if (disabled) return;
    updatePosition();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelect = (date: Date) => {
    if (!isControlled) {
      setInternalValue(date);
    }
    onChange?.(date);
    handleClose();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) {
      setInternalValue(null);
    }
    onChange?.(null);
  };

  // Click outside handler
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        calendarRef.current &&
        !calendarRef.current.contains(target)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => updatePosition();
    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [isOpen]);

  const displayValue = formatDate(selectedDate, format);

  return (
    <div className={cn('relative', className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            config.label,
            'block mb-1.5 font-medium text-room-text-primary',
            disabled && 'text-room-text-disabled'
          )}
        >
          {label}
        </label>
      )}

      <button
        ref={triggerRef}
        type="button"
        id={id}
        onClick={handleOpen}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between rounded-room-sm border transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent focus-visible:border-room-accent',
          config.input,
          disabled
            ? 'bg-room-bg-surface border-room-border text-room-text-disabled cursor-not-allowed'
            : error
            ? 'bg-room-bg-surface border-room-error text-room-text-primary'
            : 'bg-room-bg-surface border-room-border text-room-text-primary hover:border-room-text-muted'
        )}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={cn(!displayValue && 'text-room-text-muted')}>
          {displayValue || placeholder}
        </span>

        <div className="flex items-center gap-1">
          {clearable && selectedDate && !disabled && (
            <span
              onClick={handleClear}
              className="p-0.5 rounded hover:bg-room-bg-hover text-room-text-muted hover:text-room-text-primary"
              role="button"
              tabIndex={-1}
              aria-label="Clear date"
            >
              <X className={config.icon} />
            </span>
          )}
          <CalendarIcon className={cn(config.icon, 'text-room-text-muted')} />
        </div>
      </button>

      {/* Hidden input for form submission */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={selectedDate ? selectedDate.toISOString() : ''}
        />
      )}

      {error && (
        <p className="mt-1 text-sm text-room-error">{error}</p>
      )}

      {/* Calendar dropdown */}
      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={calendarRef}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              zIndex: 50,
            }}
            className="animate-in fade-in-0 zoom-in-95"
          >
            <div className="shadow-lg border border-room-border rounded-room">
              <Calendar
                value={selectedDate}
                onSelect={handleSelect}
                minDate={parsedMinDate}
                maxDate={parsedMaxDate}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
});

export { DatePicker };
export default DatePicker;
