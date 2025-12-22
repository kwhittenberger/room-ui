import { useState, useMemo, forwardRef } from 'react';
import { Globe, Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Input } from '../Input';

export interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
}

export interface TimezoneSelectorProps {
  /** Selected timezone value */
  value?: string;
  /** Callback when timezone changes */
  onChange?: (timezone: string) => void;
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Custom class name */
  className?: string;
}

// Common timezones with their offsets
const TIMEZONES: TimezoneOption[] = [
  { value: 'UTC', label: 'UTC', offset: '+00:00' },
  { value: 'America/New_York', label: 'Eastern Time (US & Canada)', offset: '-05:00' },
  { value: 'America/Chicago', label: 'Central Time (US & Canada)', offset: '-06:00' },
  { value: 'America/Denver', label: 'Mountain Time (US & Canada)', offset: '-07:00' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)', offset: '-08:00' },
  { value: 'America/Anchorage', label: 'Alaska', offset: '-09:00' },
  { value: 'Pacific/Honolulu', label: 'Hawaii', offset: '-10:00' },
  { value: 'America/Phoenix', label: 'Arizona', offset: '-07:00' },
  { value: 'America/Toronto', label: 'Eastern Time (Canada)', offset: '-05:00' },
  { value: 'America/Vancouver', label: 'Pacific Time (Canada)', offset: '-08:00' },
  { value: 'Europe/London', label: 'London', offset: '+00:00' },
  { value: 'Europe/Paris', label: 'Paris', offset: '+01:00' },
  { value: 'Europe/Berlin', label: 'Berlin', offset: '+01:00' },
  { value: 'Europe/Moscow', label: 'Moscow', offset: '+03:00' },
  { value: 'Asia/Dubai', label: 'Dubai', offset: '+04:00' },
  { value: 'Asia/Kolkata', label: 'Mumbai, Kolkata', offset: '+05:30' },
  { value: 'Asia/Bangkok', label: 'Bangkok', offset: '+07:00' },
  { value: 'Asia/Singapore', label: 'Singapore', offset: '+08:00' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong', offset: '+08:00' },
  { value: 'Asia/Tokyo', label: 'Tokyo', offset: '+09:00' },
  { value: 'Asia/Seoul', label: 'Seoul', offset: '+09:00' },
  { value: 'Australia/Sydney', label: 'Sydney', offset: '+11:00' },
  { value: 'Australia/Melbourne', label: 'Melbourne', offset: '+11:00' },
  { value: 'Pacific/Auckland', label: 'Auckland', offset: '+13:00' },
];

/** Get the local timezone */
export function getLocalTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/** Check if a timezone string is valid */
export function isValidTimezone(tz: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export const TimezoneSelector = forwardRef<HTMLInputElement, TimezoneSelectorProps>(
  (
    {
      value,
      onChange,
      label,
      error,
      helperText,
      disabled = false,
      placeholder = 'Select timezone...',
      className = '',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTimezones = useMemo(() => {
      if (!searchQuery) return TIMEZONES;
      const query = searchQuery.toLowerCase();
      return TIMEZONES.filter(
        (tz) =>
          tz.label.toLowerCase().includes(query) ||
          tz.value.toLowerCase().includes(query) ||
          tz.offset.includes(query)
      );
    }, [searchQuery]);

    const selectedTimezone = TIMEZONES.find((tz) => tz.value === value);

    const handleSelect = (timezone: TimezoneOption) => {
      onChange?.(timezone.value);
      setIsOpen(false);
      setSearchQuery('');
    };

    return (
      <div className={cn('relative', className)}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            {label}
          </label>
        )}

        {/* Trigger */}
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'w-full flex items-center gap-2 px-3 py-2 text-left',
            'bg-slate-800 border rounded-lg transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent',
            error
              ? 'border-red-500'
              : isOpen
              ? 'border-cyan-500'
              : 'border-slate-700 hover:border-slate-600',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <Globe className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <span className={cn('flex-1 truncate', selectedTimezone ? 'text-slate-100' : 'text-slate-500')}>
            {selectedTimezone
              ? `${selectedTimezone.label} (${selectedTimezone.offset})`
              : placeholder}
          </span>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b border-slate-700">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search timezones..."
                leftIcon={Search}
                size="sm"
                autoFocus
              />
            </div>

            {/* Options */}
            <div className="max-h-64 overflow-y-auto">
              {filteredTimezones.length === 0 ? (
                <div className="px-3 py-4 text-sm text-slate-500 text-center">
                  No timezones found
                </div>
              ) : (
                filteredTimezones.map((tz) => (
                  <button
                    key={tz.value}
                    type="button"
                    onClick={() => handleSelect(tz)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 text-sm',
                      'hover:bg-slate-700 transition-colors',
                      value === tz.value && 'bg-slate-700'
                    )}
                  >
                    <span className="text-slate-100">{tz.label}</span>
                    <span className="text-slate-500 text-xs">{tz.offset}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* Error/Helper text */}
        {(error || helperText) && (
          <p className={cn('mt-1 text-sm', error ? 'text-red-400' : 'text-slate-500')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TimezoneSelector.displayName = 'TimezoneSelector';

export default TimezoneSelector;
