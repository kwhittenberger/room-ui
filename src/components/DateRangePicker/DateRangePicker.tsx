import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Calendar as CalendarIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePreset {
  label: string;
  range: DateRange;
}

export interface DateRangePickerProps {
  /** Selected date range */
  value?: DateRange | null;
  /** Default range (uncontrolled) */
  defaultValue?: DateRange | null;
  /** Callback when range changes */
  onChange?: (range: DateRange | null) => void;
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
  /** Preset date ranges */
  presets?: DateRangePreset[];
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

export interface DateRangePickerHandle {
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

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function parseDate(value: Date | string | null | undefined): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(date: Date | null): string {
  if (!date) return '';
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isDateInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const s = new Date(start);
  s.setHours(0, 0, 0, 0);
  const e = new Date(end);
  e.setHours(0, 0, 0, 0);
  return d >= s && d <= e;
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate) {
    const min = new Date(minDate);
    min.setHours(0, 0, 0, 0);
    if (date < min) return true;
  }
  if (maxDate) {
    const max = new Date(maxDate);
    max.setHours(23, 59, 59, 999);
    if (date > max) return true;
  }
  return false;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isDisabled: boolean;
}

const DateRangePicker = forwardRef<DateRangePickerHandle, DateRangePickerProps>(function DateRangePicker(
  {
    value: controlledValue,
    defaultValue,
    onChange,
    label,
    placeholder = 'Select date range',
    error,
    disabled = false,
    minDate,
    maxDate,
    presets,
    clearable = false,
    size = 'md',
    name,
    id,
    className,
  },
  ref
) {
  const [internalValue, setInternalValue] = useState<DateRange | null>(defaultValue ?? null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const selectedRange = isControlled ? controlledValue : internalValue;
  const config = sizeConfig[size];

  const parsedMinDate = parseDate(minDate) ?? undefined;
  const parsedMaxDate = parseDate(maxDate) ?? undefined;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Track the viewing month for two calendars
  const [leftViewDate, setLeftViewDate] = useState(() => {
    if (selectedRange?.start) return new Date(selectedRange.start);
    return new Date();
  });
  const rightViewDate = useMemo(() => {
    const d = new Date(leftViewDate);
    d.setMonth(d.getMonth() + 1);
    return d;
  }, [leftViewDate]);

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
    setSelectingEnd(false);
    setHoverDate(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectingEnd(false);
    setHoverDate(null);
  };

  const handleDateSelect = (date: Date) => {
    if (!selectingEnd || !selectedRange?.start) {
      // Selecting start date
      const newRange = { start: date, end: null };
      if (!isControlled) {
        setInternalValue(newRange);
      }
      onChange?.(newRange);
      setSelectingEnd(true);
    } else {
      // Selecting end date
      let start = selectedRange.start;
      let end = date;

      // Swap if end is before start
      if (end < start) {
        [start, end] = [end, start];
      }

      const newRange = { start, end };
      if (!isControlled) {
        setInternalValue(newRange);
      }
      onChange?.(newRange);
      handleClose();
    }
  };

  const handlePresetSelect = (preset: DateRangePreset) => {
    if (!isControlled) {
      setInternalValue(preset.range);
    }
    onChange?.(preset.range);
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
    setLeftViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setLeftViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Generate calendar days for a month
  const generateCalendarDays = (year: number, month: number): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    // Previous month's trailing days
    const daysInPrevMonth = getDaysInMonth(year, month - 1);
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push(createCalendarDay(date, false));
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(createCalendarDay(date, true));
    }

    // Next month's leading days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push(createCalendarDay(date, false));
    }

    return days;
  };

  const createCalendarDay = (date: Date, isCurrentMonth: boolean): CalendarDay => {
    const start = selectedRange?.start ?? null;
    const end = selectingEnd && hoverDate && start
      ? (hoverDate > start ? hoverDate : start)
      : selectedRange?.end ?? null;
    const rangeStart = start && end
      ? (start < end ? start : end)
      : start;
    const rangeEnd = start && end
      ? (start < end ? end : start)
      : end;

    return {
      date,
      isCurrentMonth,
      isToday: isSameDay(today, date),
      isStart: isSameDay(date, rangeStart),
      isEnd: isSameDay(date, rangeEnd),
      isInRange: isDateInRange(date, rangeStart, rangeEnd),
      isDisabled: isDateDisabled(date, parsedMinDate, parsedMaxDate),
    };
  };

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

  const displayValue = useMemo(() => {
    if (!selectedRange?.start) return '';
    if (!selectedRange.end) return formatDate(selectedRange.start);
    return `${formatDate(selectedRange.start)} - ${formatDate(selectedRange.end)}`;
  }, [selectedRange]);

  const renderCalendar = (viewDate: Date) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const days = generateCalendarDays(year, month);

    return (
      <div className="p-3">
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
          {days.map((day, index) => (
            <button
              key={index}
              type="button"
              onClick={() => !day.isDisabled && handleDateSelect(day.date)}
              onMouseEnter={() => selectingEnd && setHoverDate(day.date)}
              disabled={day.isDisabled}
              className={cn(
                'h-8 w-8 flex items-center justify-center text-sm transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent',
                !day.isCurrentMonth && 'text-room-text-muted',
                day.isCurrentMonth && !day.isStart && !day.isEnd && !day.isInRange && !day.isDisabled && 'text-room-text-primary hover:bg-room-bg-hover',
                day.isToday && !day.isStart && !day.isEnd && 'ring-1 ring-room-accent',
                day.isInRange && !day.isStart && !day.isEnd && 'bg-room-accent/20',
                (day.isStart || day.isEnd) && 'bg-room-accent text-white hover:bg-room-accent-hover',
                day.isStart && 'rounded-l-room-sm',
                day.isEnd && 'rounded-r-room-sm',
                day.isDisabled && 'text-room-text-disabled cursor-not-allowed opacity-50'
              )}
            >
              {day.date.getDate()}
            </button>
          ))}
        </div>
      </div>
    );
  };

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
          {clearable && selectedRange?.start && !disabled && (
            <span
              onClick={handleClear}
              className="p-0.5 rounded hover:bg-room-bg-hover text-room-text-muted hover:text-room-text-primary"
              role="button"
              tabIndex={-1}
              aria-label="Clear date range"
            >
              <X className={config.icon} />
            </span>
          )}
          <CalendarIcon className={cn(config.icon, 'text-room-text-muted')} />
        </div>
      </button>

      {/* Hidden inputs for form submission */}
      {name && (
        <>
          <input
            type="hidden"
            name={`${name}_start`}
            value={selectedRange?.start ? selectedRange.start.toISOString() : ''}
          />
          <input
            type="hidden"
            name={`${name}_end`}
            value={selectedRange?.end ? selectedRange.end.toISOString() : ''}
          />
        </>
      )}

      {error && (
        <p className="mt-1 text-sm text-room-error">{error}</p>
      )}

      {/* Calendar dropdown */}
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
            <div className="bg-room-bg-elevated border border-room-border rounded-room shadow-lg">
              <div className="flex">
                {/* Presets sidebar */}
                {presets && presets.length > 0 && (
                  <div className="p-3 border-r border-room-border min-w-[140px]">
                    <div className="text-xs font-medium text-room-text-muted mb-2 uppercase tracking-wider">
                      Quick Select
                    </div>
                    <div className="space-y-1">
                      {presets.map((preset, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handlePresetSelect(preset)}
                          className="w-full px-2 py-1.5 text-sm text-left rounded-room-sm text-room-text-primary hover:bg-room-bg-hover transition-colors"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Calendars */}
                <div>
                  {/* Navigation header */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-room-border">
                    <button
                      type="button"
                      onClick={goToPreviousMonth}
                      className="p-1 rounded-room-sm text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover transition-colors"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div className="flex gap-8">
                      <span className="text-sm font-medium text-room-text-primary">
                        {MONTHS[leftViewDate.getMonth()]} {leftViewDate.getFullYear()}
                      </span>
                      <span className="text-sm font-medium text-room-text-primary">
                        {MONTHS[rightViewDate.getMonth()]} {rightViewDate.getFullYear()}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={goToNextMonth}
                      className="p-1 rounded-room-sm text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover transition-colors"
                      aria-label="Next month"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Two calendars side by side */}
                  <div className="flex">
                    {renderCalendar(leftViewDate)}
                    <div className="w-px bg-room-border" />
                    {renderCalendar(rightViewDate)}
                  </div>
                </div>
              </div>

              {/* Footer with selection hint */}
              <div className="px-3 py-2 border-t border-room-border text-xs text-room-text-muted text-center">
                {selectingEnd
                  ? 'Click to select end date'
                  : 'Click to select start date'}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
});

export { DateRangePicker };
export default DateRangePicker;
