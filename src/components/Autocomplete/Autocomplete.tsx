import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useId } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AutocompleteHandle {
  focus: () => void;
  blur: () => void;
}

export interface AutocompleteOption {
  value: string;
  label: string;
  description?: string;
  metadata?: Record<string, unknown>;
  /** If true, renders as a non-selectable section header */
  isHeader?: boolean;
}

export interface AutocompleteProps {
  value: string;
  onChange: (value: string, option?: AutocompleteOption) => void;
  options?: AutocompleteOption[];
  onSearch?: (query: string) => Promise<AutocompleteOption[]>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  minChars?: number;
  debounceMs?: number;
  maxResults?: number;
  clearable?: boolean;
  className?: string;
  /** Show static options dropdown on focus when input is empty. Default: true */
  showOptionsOnFocus?: boolean;
}

export const Autocomplete = forwardRef<AutocompleteHandle, AutocompleteProps>(({
  value,
  onChange,
  options = [],
  onSearch,
  label,
  placeholder = 'Search...',
  required = false,
  disabled = false,
  error,
  helperText,
  minChars = 1,
  debounceMs = 300,
  maxResults = 10,
  clearable = true,
  className = '',
  showOptionsOnFocus = true,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const labelId = useId();
  const listboxId = useId();
  const errorId = useId();

  const findNextSelectableIndex = (currentIndex: number, optionsList: AutocompleteOption[]): number => {
    for (let i = currentIndex + 1; i < optionsList.length; i++) {
      if (!optionsList[i].isHeader) return i;
    }
    return currentIndex;
  };

  const findPrevSelectableIndex = (currentIndex: number, optionsList: AutocompleteOption[]): number => {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (!optionsList[i].isHeader) return i;
    }
    return -1;
  };

  const findFirstSelectableIndex = (optionsList: AutocompleteOption[]): number => {
    for (let i = 0; i < optionsList.length; i++) {
      if (!optionsList[i].isHeader) return i;
    }
    return -1;
  };

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }));

  const filterOptions = (query: string): AutocompleteOption[] => {
    if (!query || query.length < minChars) return [];

    const lowerQuery = query.toLowerCase();
    return options
      .filter(
        (option) =>
          option.label.toLowerCase().includes(lowerQuery) ||
          option.description?.toLowerCase().includes(lowerQuery)
      )
      .slice(0, maxResults);
  };

  const handleSearch = async (query: string) => {
    if (query.length < minChars) {
      setFilteredOptions([]);
      setIsOpen(false);
      return;
    }

    if (onSearch) {
      setLoading(true);
      try {
        const results = await onSearch(query);
        setFilteredOptions(results.slice(0, maxResults));
        setIsOpen(results.length > 0);
        setHighlightedIndex(findFirstSelectableIndex(results.slice(0, maxResults)));
      } catch (err) {
        console.error('Autocomplete search error:', err);
        setFilteredOptions([]);
        setIsOpen(false);
        setHighlightedIndex(-1);
      } finally {
        setLoading(false);
      }
    } else {
      const filtered = filterOptions(query);
      setFilteredOptions(filtered);
      setIsOpen(filtered.length > 0);
      setHighlightedIndex(findFirstSelectableIndex(filtered));
    }
  };

  const showStaticOptions = () => {
    if (options.length > 0) {
      setFilteredOptions(options.slice(0, maxResults));
      setIsOpen(true);
      setHighlightedIndex(findFirstSelectableIndex(options.slice(0, maxResults)));
    }
  };

  const debouncedSearch = (query: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      handleSearch(query);
    }, debounceMs);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    debouncedSearch(newValue);
    setHighlightedIndex(-1);
  };

  const handleSelect = (option: AutocompleteOption) => {
    onChange(option.value, option);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onChange('');
    setFilteredOptions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (filteredOptions.length > 0) {
          setIsOpen(true);
          setHighlightedIndex(findFirstSelectableIndex(filteredOptions));
        } else if (value.length < minChars && options.length > 0) {
          showStaticOptions();
        } else if (value.length >= minChars) {
          handleSearch(value);
        }
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => findNextSelectableIndex(prev, filteredOptions));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => findPrevSelectableIndex(prev, filteredOptions));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          const option = filteredOptions[highlightedIndex];
          if (!option.isHeader) {
            handleSelect(option);
          }
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className={cn('relative', className)}>
      {label && (
        <label id={labelId} className="block text-sm font-medium text-slate-100 mb-1.5">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {loading ? (
            <Loader2 className="h-4 w-4 text-slate-500 animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-slate-500" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (showOptionsOnFocus && value.length < minChars && options.length > 0) {
              showStaticOptions();
            } else if (value.length >= minChars) {
              handleSearch(value);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full pl-9 pr-9 py-2',
            'text-sm text-slate-100 placeholder-slate-500',
            'bg-slate-800 border rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500',
            'disabled:bg-slate-900 disabled:cursor-not-allowed',
            'transition-colors',
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-slate-700'
          )}
          role="combobox"
          aria-labelledby={label ? labelId : undefined}
          aria-label={!label ? 'Search' : undefined}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={highlightedIndex >= 0 ? `autocomplete-option-${highlightedIndex}` : undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-busy={loading}
        />

        {clearable && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            aria-label="Clear"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div
          ref={dropdownRef}
          id={listboxId}
          className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          role="listbox"
          aria-label="Search results"
        >
          {filteredOptions.map((option, index) => (
            option.isHeader ? (
              <div
                key={`header-${option.value}`}
                className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wide bg-slate-900 border-t border-slate-700 first:border-t-0 first:rounded-t-lg cursor-default"
                role="presentation"
              >
                {option.label}
              </div>
            ) : (
              <button
                key={option.value}
                id={`autocomplete-option-${index}`}
                type="button"
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={highlightedIndex === index}
                className={cn(
                  'w-full text-left px-3 py-2 transition-colors',
                  highlightedIndex === index
                    ? 'bg-cyan-900/50'
                    : 'hover:bg-slate-700'
                )}
              >
                <div className="text-sm font-medium text-slate-100">{option.label}</div>
                {option.description && (
                  <div className="text-xs text-slate-400 mt-0.5">{option.description}</div>
                )}
              </button>
            )
          ))}
        </div>
      )}

      {isOpen && !loading && filteredOptions.length === 0 && value.length >= minChars && (
        <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-3" role="status" aria-live="polite">
          <p className="text-sm text-slate-400 text-center">No results found</p>
        </div>
      )}

      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-400" role="alert" aria-live="assertive">{error}</p>
      )}

      {helperText && !error && (
        <p className="mt-1.5 text-xs text-slate-400">{helperText}</p>
      )}
    </div>
  );
});

Autocomplete.displayName = 'Autocomplete';
export default Autocomplete;
