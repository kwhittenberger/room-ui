import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  useId,
} from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, X, Check, Search } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface MultiSelectHandle {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

export interface MultiSelectProps {
  /** Available options */
  options: MultiSelectOption[];
  /** Selected values */
  value?: string[];
  /** Default selected values */
  defaultValue?: string[];
  /** Callback when selection changes */
  onChange?: (value: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether to show a search input */
  searchable?: boolean;
  /** Whether to show a clear button */
  clearable?: boolean;
  /** Maximum number of items that can be selected */
  maxItems?: number;
  /** Size of the select */
  size?: 'sm' | 'md' | 'lg';
  /** Name attribute for form submission */
  name?: string;
  /** ID for the select */
  id?: string;
  /** Additional class name */
  className?: string;
}

const sizeConfig = {
  sm: {
    trigger: 'min-h-[32px] text-sm',
    tag: 'text-xs px-1.5 py-0.5',
    option: 'py-1.5 px-2 text-sm',
    label: 'text-sm',
  },
  md: {
    trigger: 'min-h-[40px] text-sm',
    tag: 'text-xs px-2 py-0.5',
    option: 'py-2 px-3 text-sm',
    label: 'text-sm',
  },
  lg: {
    trigger: 'min-h-[48px] text-base',
    tag: 'text-sm px-2.5 py-1',
    option: 'py-2.5 px-4 text-base',
    label: 'text-base',
  },
};

const MultiSelect = forwardRef<MultiSelectHandle, MultiSelectProps>(
  function MultiSelect(
    {
      options,
      value: controlledValue,
      defaultValue = [],
      onChange,
      placeholder = 'Select...',
      label,
      error,
      disabled = false,
      searchable = false,
      clearable = false,
      maxItems,
      size = 'md',
      name,
      id,
      className,
    },
    ref
  ) {
    const generatedId = useId();
    const selectId = id || generatedId;
    const config = sizeConfig[size];

    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

    const isControlled = controlledValue !== undefined;
    const selectedValues = isControlled ? controlledValue : internalValue;

    useImperativeHandle(ref, () => ({
      focus: () => triggerRef.current?.focus(),
      blur: () => triggerRef.current?.blur(),
      clear: () => handleClear(),
    }));

    const updateDropdownPosition = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    };

    useEffect(() => {
      if (isOpen) {
        updateDropdownPosition();
        if (searchable && searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    }, [isOpen, searchable]);

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
          setSearchQuery('');
        }
      };

      const handleScroll = () => updateDropdownPosition();

      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleScroll);
      };
    }, [isOpen]);

    const handleToggle = () => {
      if (disabled) return;
      setIsOpen(!isOpen);
    };

    const handleSelect = (optionValue: string) => {
      const option = options.find((o) => o.value === optionValue);
      if (!option || option.disabled) return;

      let newValue: string[];
      if (selectedValues.includes(optionValue)) {
        newValue = selectedValues.filter((v) => v !== optionValue);
      } else {
        if (maxItems && selectedValues.length >= maxItems) return;
        newValue = [...selectedValues, optionValue];
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleRemove = (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const newValue = selectedValues.filter((v) => v !== optionValue);
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue([]);
      }
      onChange?.([]);
    };

    const filteredOptions = searchQuery
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

    // Group options by group property
    const groupedOptions = filteredOptions.reduce((acc, option) => {
      const group = option.group || '';
      if (!acc[group]) acc[group] = [];
      acc[group].push(option);
      return acc;
    }, {} as Record<string, MultiSelectOption[]>);

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(config.label, 'font-medium text-room-text-primary')}
          >
            {label}
          </label>
        )}

        {/* Hidden inputs for form submission */}
        {name &&
          selectedValues.map((v) => (
            <input key={v} type="hidden" name={name} value={v} />
          ))}

        {/* Trigger */}
        <div
          ref={triggerRef}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${selectId}-listbox`}
          tabIndex={disabled ? -1 : 0}
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle();
            } else if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-room-sm border cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-room-accent',
            config.trigger,
            error
              ? 'border-room-error'
              : 'border-room-border',
            disabled
              ? 'opacity-50 cursor-not-allowed bg-room-bg-base'
              : 'bg-room-bg-surface hover:border-room-text-muted'
          )}
        >
          <div className="flex-1 flex flex-wrap gap-1.5">
            {selectedValues.length === 0 ? (
              <span className="text-room-text-muted">{placeholder}</span>
            ) : (
              selectedValues.map((v) => {
                const option = options.find((o) => o.value === v);
                if (!option) return null;
                return (
                  <span
                    key={v}
                    className={cn(
                      'inline-flex items-center gap-1 bg-room-accent/20 text-room-accent rounded',
                      config.tag
                    )}
                  >
                    {option.label}
                    <button
                      type="button"
                      onClick={(e) => handleRemove(v, e)}
                      className="hover:bg-room-accent/20 rounded"
                      aria-label={`Remove ${option.label}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                );
              })
            )}
          </div>

          {clearable && selectedValues.length > 0 && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="p-0.5 rounded hover:bg-room-bg-hover"
              aria-label="Clear all"
            >
              <X className="h-4 w-4 text-room-text-muted" />
            </button>
          )}

          <ChevronDown
            className={cn(
              'h-4 w-4 text-room-text-muted transition-transform flex-shrink-0',
              isOpen && 'rotate-180'
            )}
          />
        </div>

        {error && <span className="text-sm text-room-error">{error}</span>}

        {/* Dropdown */}
        {isOpen &&
          createPortal(
            <div
              ref={dropdownRef}
              id={`${selectId}-listbox`}
              role="listbox"
              aria-multiselectable="true"
              className="fixed z-50 bg-room-bg-elevated border border-room-border rounded-room shadow-lg overflow-hidden"
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
              }}
            >
              {searchable && (
                <div className="p-2 border-b border-room-border">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-room-text-muted" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-8 pr-3 py-1.5 bg-room-bg-surface border border-room-border rounded-room-sm text-sm text-room-text-primary placeholder:text-room-text-muted focus:outline-none focus:border-room-accent"
                    />
                  </div>
                </div>
              )}

              <div className="max-h-60 overflow-y-auto py-1">
                {Object.entries(groupedOptions).map(([group, groupOptions]) => (
                  <div key={group}>
                    {group && (
                      <div className="px-3 py-1.5 text-xs font-semibold text-room-text-muted uppercase tracking-wider">
                        {group}
                      </div>
                    )}
                    {groupOptions.map((option) => {
                      const isSelected = selectedValues.includes(option.value);
                      const isDisabled = option.disabled || (maxItems && !isSelected && selectedValues.length >= maxItems);

                      return (
                        <div
                          key={option.value}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelect(option.value)}
                          className={cn(
                            'flex items-center gap-2 cursor-pointer transition-colors',
                            config.option,
                            isDisabled
                              ? 'opacity-50 cursor-not-allowed'
                              : isSelected
                              ? 'bg-room-accent/10 text-room-text-primary'
                              : 'text-room-text-secondary hover:bg-room-bg-hover hover:text-room-text-primary'
                          )}
                        >
                          <div
                            className={cn(
                              'flex-shrink-0 w-4 h-4 border rounded flex items-center justify-center',
                              isSelected
                                ? 'bg-room-accent border-room-accent'
                                : 'border-room-border'
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span className="flex-1">{option.label}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
                {filteredOptions.length === 0 && (
                  <div className="px-3 py-4 text-center text-room-text-muted text-sm">
                    No options found
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}
      </div>
    );
  }
);

export { MultiSelect };
export default MultiSelect;
