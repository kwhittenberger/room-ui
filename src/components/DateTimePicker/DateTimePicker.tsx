import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Calendar as CalendarIcon, Clock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface DateTimePickerProps {
  /** Selected date and time value */
  value?: Date | string | null;
  /** Default value (uncontrolled) */
  defaultValue?: Date | string | null;
  /** Callback when value changes */
  onChange?: (dateTime: Date | null) => void;
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Minimum selectable date/time */
  minDateTime?: Date | string;
  /** Maximum selectable date/time */
  maxDateTime?: Date | string;
  /** Date format for display */
  dateFormat?: string;
  /** Time format (12h or 24h) */
  timeFormat?: '12h' | '24h';
  /** Time step in minutes */
  timeStep?: number;
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

export interface DateTimePickerHandle {
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
    timeDropdown: 'max-h-48',
  },
  md: {
    input: 'h-10 text-sm px-3',
    icon: 'h-4 w-4',
    label: 'text-sm',
    timeDropdown: 'max-h-60',
  },
  lg: {
    input: 'h-12 text-base px-4',
    icon: 'h-5 w-5',
    label: 'text-base',
    timeDropdown: 'max-h-72',
  },
};

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function parseDateTime(value: Date | string | null | undefined): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(date: Date, format: string): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day);
}

function formatTime(date: Date, format: '12h' | '24h'): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (format === '12h') {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function formatDateTime(date: Date | null, dateFormat: string, timeFormat: '12h' | '24h'): string {
  if (!date) return '';
  return `${formatDate(date, dateFormat)} ${formatTime(date, timeFormat)}`;
}

function isSameDay(date1: Date | null, date2: Date): boolean {
  if (!date1) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date): boolean {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  if (minDate) {
    const min = new Date(minDate);
    min.setHours(0, 0, 0, 0);
    if (d < min) return true;
  }
  if (maxDate) {
    const max = new Date(maxDate);
    max.setHours(0, 0, 0, 0);
    if (d > max) return true;
  }
  return false;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

interface TimeOption {
  value: string;
  label: string;
  hours: number;
  minutes: number;
}

function generateTimeOptions(step: number, format: '12h' | '24h'): TimeOption[] {
  const options: TimeOption[] = [];

  for (let minutes = 0; minutes < 24 * 60; minutes += step) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const value = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;

    let label: string;
    if (format === '12h') {
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      label = `${displayHours}:${String(mins).padStart(2, '0')} ${period}`;
    } else {
      label = value;
    }

    options.push({ value, label, hours, minutes: mins });
  }

  return options;
}

const DateTimePicker = forwardRef<DateTimePickerHandle, DateTimePickerProps>(function DateTimePicker(
  {
    value: controlledValue,
    defaultValue,
    onChange,
    label,
    placeholder = 'Select date and time',
    error,
    disabled = false,
    minDateTime,
    maxDateTime,
    dateFormat = 'MM/DD/YYYY',
    timeFormat = '24h',
    timeStep = 30,
    clearable = false,
    size = 'md',
    name,
    id,
    className,
  },
  ref
) {
  const [internalValue, setInternalValue] = useState<Date | null>(() =>
    parseDateTime(defaultValue)
  );
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [activeTab, setActiveTab] = useState<'date' | 'time'>('date');

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeOptionsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const isControlled = controlledValue !== undefined;
  const selectedDateTime = isControlled ? parseDateTime(controlledValue) : internalValue;
  const config = sizeConfig[size];

  const parsedMinDateTime = parseDateTime(minDateTime) ?? undefined;
  const parsedMaxDateTime = parseDateTime(maxDateTime) ?? undefined;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(() => {
    if (selectedDateTime) return new Date(selectedDateTime);
    return new Date();
  });

  const timeOptions = useMemo(
    () => generateTimeOptions(timeStep, timeFormat),
    [timeStep, timeFormat]
  );

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
    setActiveTab('date');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const updateValue = (newDate: Date) => {
    if (!isControlled) {
      setInternalValue(newDate);
    }
    onChange?.(newDate);
  };

  const handleDateSelect = (date: Date) => {
    // Preserve time from current selection or use noon as default
    const newDateTime = new Date(date);
    if (selectedDateTime) {
      newDateTime.setHours(selectedDateTime.getHours(), selectedDateTime.getMinutes(), 0, 0);
    } else {
      newDateTime.setHours(12, 0, 0, 0);
    }
    updateValue(newDateTime);
    setActiveTab('time');
  };

  const handleTimeSelect = (option: TimeOption) => {
    // Use selected date or today
    const baseDate = selectedDateTime ? new Date(selectedDateTime) : new Date();
    baseDate.setHours(option.hours, option.minutes, 0, 0);
    updateValue(baseDate);
    handleClose();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) {
      setInternalValue(null);
    }
    onChange?.(null);
  };

  const goToPreviousMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const days: { date: Date; isCurrentMonth: boolean; isToday: boolean; isSelected: boolean; isDisabled: boolean }[] = [];
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    // Previous month's trailing days
    const daysInPrevMonth = getDaysInMonth(year, month - 1);
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(today, date),
        isSelected: isSameDay(selectedDateTime, date),
        isDisabled: isDateDisabled(date, parsedMinDateTime, parsedMaxDateTime),
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isSameDay(today, date),
        isSelected: isSameDay(selectedDateTime, date),
        isDisabled: isDateDisabled(date, parsedMinDateTime, parsedMaxDateTime),
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(today, date),
        isSelected: isSameDay(selectedDateTime, date),
        isDisabled: isDateDisabled(date, parsedMinDateTime, parsedMaxDateTime),
      });
    }

    return days;
  }, [viewDate, selectedDateTime, parsedMinDateTime, parsedMaxDateTime, today]);

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

  // Scroll to selected time when opening time tab
  useEffect(() => {
    if (isOpen && activeTab === 'time' && selectedDateTime) {
      const selectedHours = selectedDateTime.getHours();
      const selectedMinutes = selectedDateTime.getMinutes();
      const index = timeOptions.findIndex(
        (opt) => opt.hours === selectedHours && opt.minutes === selectedMinutes
      );
      if (index >= 0 && timeOptionsRef.current[index]) {
        timeOptionsRef.current[index]?.scrollIntoView({ block: 'center' });
      }
    }
  }, [isOpen, activeTab, selectedDateTime, timeOptions]);

  const displayValue = formatDateTime(selectedDateTime, dateFormat, timeFormat);

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
          {clearable && selectedDateTime && !disabled && (
            <span
              onClick={handleClear}
              className="p-0.5 rounded hover:bg-room-bg-hover text-room-text-muted hover:text-room-text-primary"
              role="button"
              tabIndex={-1}
              aria-label="Clear date and time"
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
          value={selectedDateTime ? selectedDateTime.toISOString() : ''}
        />
      )}

      {error && (
        <p className="mt-1 text-sm text-room-error">{error}</p>
      )}

      {/* DateTime picker dropdown */}
      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              zIndex: 50,
            }}
            className="animate-in fade-in-0 zoom-in-95"
          >
            <div className="bg-room-bg-elevated border border-room-border rounded-room shadow-lg overflow-hidden">
              {/* Tab switcher */}
              <div className="flex border-b border-room-border">
                <button
                  type="button"
                  onClick={() => setActiveTab('date')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm transition-colors',
                    activeTab === 'date'
                      ? 'bg-room-accent/10 text-room-accent border-b-2 border-room-accent'
                      : 'text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover'
                  )}
                >
                  <CalendarIcon className="h-4 w-4" />
                  Date
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('time')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm transition-colors',
                    activeTab === 'time'
                      ? 'bg-room-accent/10 text-room-accent border-b-2 border-room-accent'
                      : 'text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover'
                  )}
                >
                  <Clock className="h-4 w-4" />
                  Time
                </button>
              </div>

              {/* Date tab */}
              {activeTab === 'date' && (
                <div className="p-3">
                  {/* Month navigation */}
                  <div className="flex items-center justify-between mb-3">
                    <button
                      type="button"
                      onClick={goToPreviousMonth}
                      className="p-1 rounded-room-sm text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover transition-colors"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <span className="text-sm font-medium text-room-text-primary">
                      {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                    </span>

                    <button
                      type="button"
                      onClick={goToNextMonth}
                      className="p-1 rounded-room-sm text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover transition-colors"
                      aria-label="Next month"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Days of week header */}
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {DAYS_OF_WEEK.map((day) => (
                      <div
                        key={day}
                        className="h-8 flex items-center justify-center text-xs font-medium text-room-text-muted"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => !day.isDisabled && handleDateSelect(day.date)}
                        disabled={day.isDisabled}
                        className={cn(
                          'h-8 w-8 flex items-center justify-center text-sm rounded-room-sm transition-colors',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent',
                          !day.isCurrentMonth && 'text-room-text-muted',
                          day.isCurrentMonth && !day.isSelected && !day.isDisabled && 'text-room-text-primary hover:bg-room-bg-hover',
                          day.isToday && !day.isSelected && 'ring-1 ring-room-accent',
                          day.isSelected && 'bg-room-accent text-white hover:bg-room-accent-hover',
                          day.isDisabled && 'text-room-text-disabled cursor-not-allowed opacity-50'
                        )}
                      >
                        {day.date.getDate()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Time tab */}
              {activeTab === 'time' && (
                <div className={cn('overflow-auto', config.timeDropdown)}>
                  {timeOptions.map((option, index) => {
                    const isSelected =
                      selectedDateTime &&
                      selectedDateTime.getHours() === option.hours &&
                      selectedDateTime.getMinutes() === option.minutes;

                    return (
                      <button
                        key={option.value}
                        ref={(el) => {
                          timeOptionsRef.current[index] = el;
                        }}
                        type="button"
                        onClick={() => handleTimeSelect(option)}
                        className={cn(
                          'w-full px-4 py-2 text-left text-sm transition-colors',
                          'focus:outline-none',
                          isSelected
                            ? 'bg-room-accent/10 text-room-accent font-medium'
                            : 'text-room-text-primary hover:bg-room-bg-hover'
                        )}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Selected value display */}
              {selectedDateTime && (
                <div className="px-3 py-2 border-t border-room-border text-xs text-room-text-muted text-center">
                  {formatDateTime(selectedDateTime, dateFormat, timeFormat)}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
});

export { DateTimePicker };
export default DateTimePicker;
