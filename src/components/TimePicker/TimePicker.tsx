import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Clock, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface TimePickerProps {
  /** Selected time value (HH:mm or HH:mm:ss format) */
  value?: string | null;
  /** Default time value (uncontrolled) */
  defaultValue?: string | null;
  /** Callback when time changes */
  onChange?: (time: string | null) => void;
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Minimum selectable time */
  minTime?: string;
  /** Maximum selectable time */
  maxTime?: string;
  /** Step in minutes for time options */
  step?: number;
  /** Time format (12h or 24h) */
  format?: '12h' | '24h';
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

export interface TimePickerHandle {
  focus: () => void;
  blur: () => void;
}

const sizeConfig = {
  sm: {
    input: 'h-8 text-sm px-2',
    icon: 'h-3.5 w-3.5',
    label: 'text-sm',
    dropdown: 'max-h-48',
  },
  md: {
    input: 'h-10 text-sm px-3',
    icon: 'h-4 w-4',
    label: 'text-sm',
    dropdown: 'max-h-60',
  },
  lg: {
    input: 'h-12 text-base px-4',
    icon: 'h-5 w-5',
    label: 'text-base',
    dropdown: 'max-h-72',
  },
};

interface TimeOption {
  value: string;
  label: string;
  disabled: boolean;
}

function parseTime(value: string | null | undefined): { hours: number; minutes: number } | null {
  if (!value) return null;
  const match = value.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) return null;
  return {
    hours: parseInt(match[1], 10),
    minutes: parseInt(match[2], 10),
  };
}

function formatTime24(hours: number, minutes: number): string {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function formatTime12(hours: number, minutes: number): string {
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
}

function timeToMinutes(time: string | undefined): number | null {
  if (!time) return null;
  const parsed = parseTime(time);
  if (!parsed) return null;
  return parsed.hours * 60 + parsed.minutes;
}

function generateTimeOptions(
  step: number,
  format: '12h' | '24h',
  minTime?: string,
  maxTime?: string
): TimeOption[] {
  const options: TimeOption[] = [];
  const minMinutes = timeToMinutes(minTime);
  const maxMinutes = timeToMinutes(maxTime);

  for (let minutes = 0; minutes < 24 * 60; minutes += step) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const value = formatTime24(hours, mins);
    const label = format === '12h' ? formatTime12(hours, mins) : value;

    let disabled = false;
    if (minMinutes !== null && minutes < minMinutes) disabled = true;
    if (maxMinutes !== null && minutes > maxMinutes) disabled = true;

    options.push({ value, label, disabled });
  }

  return options;
}

const TimePicker = forwardRef<TimePickerHandle, TimePickerProps>(function TimePicker(
  {
    value: controlledValue,
    defaultValue,
    onChange,
    label,
    placeholder = 'Select time',
    error,
    disabled = false,
    minTime,
    maxTime,
    step = 30,
    format = '24h',
    clearable = false,
    size = 'md',
    name,
    id,
    className,
  },
  ref
) {
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue ?? null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const isControlled = controlledValue !== undefined;
  const selectedTime = isControlled ? controlledValue : internalValue;
  const config = sizeConfig[size];

  const timeOptions = useMemo(
    () => generateTimeOptions(step, format, minTime, maxTime),
    [step, format, minTime, maxTime]
  );

  const enabledOptions = timeOptions.filter((opt) => !opt.disabled);

  useImperativeHandle(ref, () => ({
    focus: () => triggerRef.current?.focus(),
    blur: () => triggerRef.current?.blur(),
  }));

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  };

  const handleOpen = () => {
    if (disabled) return;
    updatePosition();
    setIsOpen(true);

    // Set focused index to selected value or first enabled option
    const selectedIndex = enabledOptions.findIndex((opt) => opt.value === selectedTime);
    setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  };

  const handleClose = () => {
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleSelect = (time: string) => {
    if (!isControlled) {
      setInternalValue(time);
    }
    onChange?.(time);
    handleClose();
    triggerRef.current?.focus();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) {
      setInternalValue(null);
    }
    onChange?.(null);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handleClose();
          triggerRef.current?.focus();
          break;

        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = (prev + 1) % enabledOptions.length;
            optionsRef.current[next]?.scrollIntoView({ block: 'nearest' });
            return next;
          });
          break;

        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = (prev - 1 + enabledOptions.length) % enabledOptions.length;
            optionsRef.current[next]?.scrollIntoView({ block: 'nearest' });
            return next;
          });
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < enabledOptions.length) {
            handleSelect(enabledOptions[focusedIndex].value);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, enabledOptions]);

  // Click outside handler
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Scroll selected into view when opening
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionsRef.current[focusedIndex]) {
      optionsRef.current[focusedIndex]?.scrollIntoView({ block: 'center' });
    }
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

  const displayValue = useMemo(() => {
    if (!selectedTime) return '';
    const parsed = parseTime(selectedTime);
    if (!parsed) return selectedTime;
    return format === '12h'
      ? formatTime12(parsed.hours, parsed.minutes)
      : formatTime24(parsed.hours, parsed.minutes);
  }, [selectedTime, format]);

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
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={cn(!displayValue && 'text-room-text-muted')}>
          {displayValue || placeholder}
        </span>

        <div className="flex items-center gap-1">
          {clearable && selectedTime && !disabled && (
            <span
              onClick={handleClear}
              className="p-0.5 rounded hover:bg-room-bg-hover text-room-text-muted hover:text-room-text-primary"
              role="button"
              tabIndex={-1}
              aria-label="Clear time"
            >
              <X className={config.icon} />
            </span>
          )}
          <Clock className={cn(config.icon, 'text-room-text-muted')} />
        </div>
      </button>

      {/* Hidden input for form submission */}
      {name && (
        <input type="hidden" name={name} value={selectedTime || ''} />
      )}

      {error && (
        <p className="mt-1 text-sm text-room-error">{error}</p>
      )}

      {/* Time dropdown */}
      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              width: position.width,
              zIndex: 50,
            }}
            className="animate-in fade-in-0 zoom-in-95"
          >
            <div
              className={cn(
                'bg-room-bg-elevated border border-room-border rounded-room shadow-lg overflow-auto',
                config.dropdown
              )}
              role="listbox"
            >
              {enabledOptions.map((option, index) => {
                const isSelected = option.value === selectedTime;
                const isFocused = index === focusedIndex;

                return (
                  <button
                    key={option.value}
                    ref={(el) => {
                      optionsRef.current[index] = el;
                    }}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      'w-full px-3 py-2 text-left text-sm transition-colors',
                      'focus:outline-none',
                      isSelected && 'bg-room-accent/10 text-room-accent font-medium',
                      !isSelected && isFocused && 'bg-room-bg-hover',
                      !isSelected && !isFocused && 'text-room-text-primary hover:bg-room-bg-hover'
                    )}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
});

export { TimePicker };
export default TimePicker;
