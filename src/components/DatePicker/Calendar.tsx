import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CalendarProps {
  /** Selected date */
  value?: Date | null;
  /** Callback when date is selected */
  onSelect?: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Additional class name */
  className?: string;
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(date1: Date | null | undefined, date2: Date): boolean {
  if (!date1) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
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

export function Calendar({
  value,
  onSelect,
  minDate,
  maxDate,
  className,
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(() => {
    if (value) return new Date(value);
    return new Date();
  });

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const calendarDays = useMemo(() => {
    const days: CalendarDay[] = [];
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDayOfMonth = getFirstDayOfMonth(viewYear, viewMonth);

    // Previous month's trailing days
    const daysInPrevMonth = getDaysInMonth(viewYear, viewMonth - 1);
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(viewYear, viewMonth - 1, daysInPrevMonth - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(today, date),
        isSelected: isSameDay(value, date),
        isDisabled: isDateDisabled(date, minDate, maxDate),
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isSameDay(today, date),
        isSelected: isSameDay(value, date),
        isDisabled: isDateDisabled(date, minDate, maxDate),
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(viewYear, viewMonth + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(today, date),
        isSelected: isSameDay(value, date),
        isDisabled: isDateDisabled(date, minDate, maxDate),
      });
    }

    return days;
  }, [viewYear, viewMonth, value, minDate, maxDate, today]);

  const goToPreviousMonth = () => {
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const handleDayClick = (day: CalendarDay) => {
    if (day.isDisabled) return;
    onSelect?.(day.date);
  };

  const canGoBack = !minDate || new Date(viewYear, viewMonth, 0) >= new Date(minDate);
  const canGoForward = !maxDate || new Date(viewYear, viewMonth + 1, 1) <= new Date(maxDate);

  return (
    <div className={cn('p-3 bg-room-bg-elevated rounded-room', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
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
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="text-sm font-medium text-room-text-primary">
          {MONTHS[viewMonth]} {viewYear}
        </span>

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
            onClick={() => handleDayClick(day)}
            disabled={day.isDisabled}
            className={cn(
              'h-8 w-8 flex items-center justify-center text-sm rounded-room-sm transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent focus-visible:ring-offset-1 focus-visible:ring-offset-room-bg-elevated',
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
  );
}

export default Calendar;
