import React, { forwardRef, useState, useCallback } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Controlled value */
  value?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Search submit handler */
  onSearch?: (value: string) => void;
  /** Clear handler */
  onClear?: () => void;
  /** Loading state */
  loading?: boolean;
  /** Show clear button when there's a value */
  clearable?: boolean;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles: Record<string, string> = {
  sm: 'h-8 pl-8 pr-8 text-sm',
  md: 'h-10 pl-10 pr-10 text-sm',
  lg: 'h-12 pl-12 pr-12 text-base',
};

const iconSizeStyles: Record<string, string> = {
  sm: 'w-4 h-4',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value: controlledValue,
      onChange,
      onSearch,
      onClear,
      loading = false,
      clearable = true,
      size = 'md',
      disabled,
      placeholder = 'Search...',
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState('');
    const value = controlledValue ?? internalValue;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!controlledValue) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      },
      [controlledValue, onChange]
    );

    const handleClear = useCallback(() => {
      if (!controlledValue) {
        setInternalValue('');
      }
      onClear?.();
    }, [controlledValue, onClear]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch) {
          onSearch(value);
        }
        if (e.key === 'Escape' && value) {
          handleClear();
        }
      },
      [value, onSearch, handleClear]
    );

    const inputClasses = cn(
      // Base styles
      'w-full rounded-room-sm border bg-room-bg-surface',
      'text-room-text-primary placeholder:text-room-text-muted',
      'transition-colors duration-150',
      'focus:outline-none focus:ring-1 focus:ring-room-accent focus:border-room-accent',
      'border-room-border',
      // Size styles
      sizeStyles[size],
      // Disabled styles
      disabled && 'opacity-50 cursor-not-allowed bg-room-bg-hover',
      className
    );

    const iconClasses = iconSizeStyles[size];
    const showClear = clearable && value && !loading;

    return (
      <div className="relative w-full">
        {/* Search icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-room-text-muted pointer-events-none">
          <Search className={iconClasses} />
        </div>

        <input
          ref={ref}
          type="search"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className={inputClasses}
          {...props}
        />

        {/* Loading spinner or clear button */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {loading ? (
            <Loader2 className={cn(iconClasses, 'text-room-text-muted animate-spin')} />
          ) : showClear ? (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                'text-room-text-muted hover:text-room-text-primary',
                'transition-colors duration-150',
                'focus:outline-none'
              )}
              aria-label="Clear search"
            >
              <X className={iconClasses} />
            </button>
          ) : null}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
