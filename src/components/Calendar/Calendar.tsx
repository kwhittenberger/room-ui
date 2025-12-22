import { forwardRef, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CalendarProps {
  /** Selected date (single selection) */
  value?: Date | null;
  /** Default selected date (uncontrolled) */
  defaultValue?: Date | null;
  /** Callback when date is selected */
  onSelect?: (date: Date) => void;
  /** Range selection mode */
  mode?: 'single' | 'range';
  /** Selected date range (for range mode) */
  range?: { start: Date | null; end: Date | null };
  /** Callback when range changes */
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Whether to show week numbers */
  showWeekNumbers?: boolean;
  /** Whether to show adjacent month days */
  showOutsideDays?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** First day of week (0 = Sunday, 1 = Monday) */
  weekStartsOn?: 0 | 1;
  /** Additional class name */
  className?: string;
}

const DAYS_OF_WEEK_SUNDAY = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const DAYS_OF_WEEK_MONDAY = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const sizeConfig = {
  sm: {
    cell: 'h-7 w-7 text-xs',
    header: 'text-xs',
    weekNumber: 'w-6 text-xs',
    padding: 'p-2',
    iconSize: 'h-3.5 w-3.5',
    gap: 'gap-0.5',
  },
  md: {
    cell: 'h-8 w-8 text-sm',
    header: 'text-sm',
    weekNumber: 'w-7 text-xs',
    padding: 'p-3',
    iconSize: 'h-4 w-4',
    gap: 'gap-1',
  },
  lg: {
    cell: 'h-10 w-10 text-base',
    header: 'text-base',
    weekNumber: 'w-8 text-sm',
    padding: 'p-4',
    iconSize: 'h-5 w-5',
    gap: 'gap-1.5',
  },
};

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isDisabled: boolean;
  weekNumber?: number;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function isSameDay(date1: Date | null | undefined, date2: Date): boolean {
  if (!date1) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isDateInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const time = date.getTime();
  const startTime = Math.min(start.getTime(), end.getTime());
  const endTime = Math.max(start.getTime(), end.getTime());
  return time > startTime && time < endTime;
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

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    value: controlledValue,
    defaultValue,
    onSelect,
    mode = 'single',
    range,
    onRangeChange,
    minDate,
    maxDate,
    showWeekNumbers = false,
    showOutsideDays = true,
    size = 'md',
    weekStartsOn = 0,
    className,
  },
  ref
) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [internalValue, setInternalValue] = useState<Date | null>(() => defaultValue ?? null);
  const [internalRange, setInternalRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [viewDate, setViewDate] = useState(() => {
    if (controlledValue) return new Date(controlledValue);
    if (defaultValue) return new Date(defaultValue);
    if (range?.start) return new Date(range.start);
    return new Date();
  });

  const isControlled = controlledValue !== undefined;
  const selectedDate = isControlled ? controlledValue : internalValue;

  const isRangeControlled = range !== undefined;
  const selectedRange = isRangeControlled ? range : internalRange;

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const config = sizeConfig[size];

  const daysOfWeek = weekStartsOn === 1 ? DAYS_OF_WEEK_MONDAY : DAYS_OF_WEEK_SUNDAY;

  const calendarDays = useMemo(() => {
    const days: CalendarDay[] = [];
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    let firstDayOfMonth = getFirstDayOfMonth(viewYear, viewMonth);

    // Adjust for Monday start
    if (weekStartsOn === 1) {
      firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    }

    // Previous month's trailing days
    const daysInPrevMonth = getDaysInMonth(viewYear, viewMonth - 1);
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(viewYear, viewMonth - 1, daysInPrevMonth - i);
      const isSelected = mode === 'single' && isSameDay(selectedDate, date);
      const isRangeStart = mode === 'range' && isSameDay(selectedRange.start, date);
      const isRangeEnd = mode === 'range' && isSameDay(selectedRange.end, date);
      const isInRange = mode === 'range' && isDateInRange(date, selectedRange.start, selectedRange.end);

      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(today, date),
        isSelected,
        isRangeStart,
        isRangeEnd,
        isInRange,
        isDisabled: isDateDisabled(date, minDate, maxDate),
        weekNumber: days.length % 7 === 0 ? getWeekNumber(date) : undefined,
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day);
      const isSelected = mode === 'single' && isSameDay(selectedDate, date);
      const isRangeStart = mode === 'range' && isSameDay(selectedRange.start, date);
      const isRangeEnd = mode === 'range' && isSameDay(selectedRange.end, date);
      const isInRange = mode === 'range' && isDateInRange(date, selectedRange.start, selectedRange.end);

      days.push({
        date,
        isCurrentMonth: true,
        isToday: isSameDay(today, date),
        isSelected,
        isRangeStart,
        isRangeEnd,
        isInRange,
        isDisabled: isDateDisabled(date, minDate, maxDate),
        weekNumber: days.length % 7 === 0 ? getWeekNumber(date) : undefined,
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(viewYear, viewMonth + 1, day);
      const isSelected = mode === 'single' && isSameDay(selectedDate, date);
      const isRangeStart = mode === 'range' && isSameDay(selectedRange.start, date);
      const isRangeEnd = mode === 'range' && isSameDay(selectedRange.end, date);
      const isInRange = mode === 'range' && isDateInRange(date, selectedRange.start, selectedRange.end);

      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(today, date),
        isSelected,
        isRangeStart,
        isRangeEnd,
        isInRange,
        isDisabled: isDateDisabled(date, minDate, maxDate),
        weekNumber: days.length % 7 === 0 ? getWeekNumber(date) : undefined,
      });
    }

    return days;
  }, [viewYear, viewMonth, selectedDate, selectedRange, mode, minDate, maxDate, today, weekStartsOn]);

  const goToPreviousMonth = () => {
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const goToPreviousYear = () => {
    setViewDate(new Date(viewYear - 1, viewMonth, 1));
  };

  const goToNextYear = () => {
    setViewDate(new Date(viewYear + 1, viewMonth, 1));
  };

  const handleDayClick = (day: CalendarDay) => {
    if (day.isDisabled) return;

    if (mode === 'single') {
      if (!isControlled) {
        setInternalValue(day.date);
      }
      onSelect?.(day.date);
    } else if (mode === 'range') {
      let newRange: { start: Date | null; end: Date | null };

      if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
        // Start new range
        newRange = { start: day.date, end: null };
      } else {
        // Complete the range
        if (day.date < selectedRange.start) {
          newRange = { start: day.date, end: selectedRange.start };
        } else {
          newRange = { start: selectedRange.start, end: day.date };
        }
      }

      if (!isRangeControlled) {
        setInternalRange(newRange);
      }
      onRangeChange?.(newRange);
    }
  };

  const canGoBack = !minDate || new Date(viewYear, viewMonth, 0) >= new Date(minDate);
  const canGoForward = !maxDate || new Date(viewYear, viewMonth + 1, 1) <= new Date(maxDate);

  return (
    <div
      ref={ref}
      className={cn('bg-room-bg-elevated rounded-room', config.padding, className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={goToPreviousYear}
            className={cn(
              'p-1 rounded-room-sm transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent',
              'text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover'
            )}
            aria-label="Previous year"
          >
            <ChevronsLeft className={config.iconSize} />
          </button>
          <button
            type="button"
            onClick={goToPreviousMonth}
            disabled={!canGoBack}
            className={cn(
              'p-1 rounded-room-sm transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent',
              canGoBack
                ? 'text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover'
                : 'text-room-text-disabled cursor-not-allowed'
            )}
            aria-label="Previous month"
          >
            <ChevronLeft className={config.iconSize} />
          </button>
        </div>

        <span className={cn('font-medium text-room-text-primary', config.header)}>
          {MONTHS[viewMonth]} {viewYear}
        </span>

        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={goToNextMonth}
            disabled={!canGoForward}
            className={cn(
              'p-1 rounded-room-sm transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent',
              canGoForward
                ? 'text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover'
                : 'text-room-text-disabled cursor-not-allowed'
            )}
            aria-label="Next month"
          >
            <ChevronRight className={config.iconSize} />
          </button>
          <button
            type="button"
            onClick={goToNextYear}
            className={cn(
              'p-1 rounded-room-sm transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent',
              'text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover'
            )}
            aria-label="Next year"
          >
            <ChevronsRight className={config.iconSize} />
          </button>
        </div>
      </div>

      {/* Days of week header */}
      <div className={cn('grid mb-1', config.gap)} style={{ gridTemplateColumns: showWeekNumbers ? `auto repeat(7, 1fr)` : 'repeat(7, 1fr)' }}>
        {showWeekNumbers && (
          <div className={cn('flex items-center justify-center text-room-text-muted', config.weekNumber)}>
            Wk
          </div>
        )}
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={cn(
              'flex items-center justify-center font-medium text-room-text-muted',
              config.cell
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className={cn('grid', config.gap)} style={{ gridTemplateColumns: showWeekNumbers ? `auto repeat(7, 1fr)` : 'repeat(7, 1fr)' }}>
        {calendarDays.map((day, index) => {
          const showWeekNumber = showWeekNumbers && index % 7 === 0;
          const weekNumber = showWeekNumber ? day.weekNumber ?? getWeekNumber(day.date) : undefined;

          if (!showOutsideDays && !day.isCurrentMonth) {
            return (
              <div key={index}>
                {showWeekNumber && (
                  <div className={cn('flex items-center justify-center text-room-text-muted', config.weekNumber, config.cell)}>
                    {weekNumber}
                  </div>
                )}
                <div className={config.cell} />
              </div>
            );
          }

          return (
            <>
              {showWeekNumber && (
                <div
                  key={`week-${index}`}
                  className={cn('flex items-center justify-center text-room-text-muted', config.weekNumber, config.cell)}
                >
                  {weekNumber}
                </div>
              )}
              <button
                key={index}
                type="button"
                onClick={() => handleDayClick(day)}
                disabled={day.isDisabled}
                className={cn(
                  'flex items-center justify-center rounded-room-sm transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent focus-visible:ring-offset-1 focus-visible:ring-offset-room-bg-elevated',
                  config.cell,
                  !day.isCurrentMonth && !day.isSelected && !day.isRangeStart && !day.isRangeEnd && 'text-room-text-muted',
                  day.isCurrentMonth && !day.isSelected && !day.isRangeStart && !day.isRangeEnd && !day.isInRange && !day.isDisabled && 'text-room-text-primary hover:bg-room-bg-hover',
                  day.isToday && !day.isSelected && !day.isRangeStart && !day.isRangeEnd && 'ring-1 ring-room-accent',
                  (day.isSelected || day.isRangeStart || day.isRangeEnd) && 'bg-room-accent text-white hover:bg-room-accent-hover',
                  day.isInRange && !day.isRangeStart && !day.isRangeEnd && 'bg-room-accent/20 text-room-text-primary',
                  day.isDisabled && 'text-room-text-disabled cursor-not-allowed opacity-50'
                )}
              >
                {day.date.getDate()}
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
});

export { Calendar };
export default Calendar;
