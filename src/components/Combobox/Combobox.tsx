import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  useId,
} from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, X, Check, Loader2, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
}

export interface ComboboxHandle {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

export interface ComboboxProps {
  /** Available options */
  options: ComboboxOption[];
  /** Selected value */
  value?: string;
  /** Default selected value */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Callback when input text changes */
  onInputChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Whether options are loading */
  loading?: boolean;
  /** Whether to show a clear button */
  clearable?: boolean;
  /** Whether users can create new options */
  creatable?: boolean;
  /** Callback when a new option is created */
  onCreate?: (value: string) => void;
  /** Size of the combobox */
  size?: 'sm' | 'md' | 'lg';
  /** Name attribute for form submission */
  name?: string;
  /** ID for the combobox */
  id?: string;
  /** Additional class name */
  className?: string;
}

const sizeConfig = {
  sm: {
    input: 'h-8 text-sm px-2',
    option: 'py-1.5 px-2 text-sm',
    label: 'text-sm',
  },
  md: {
    input: 'h-10 text-sm px-3',
    option: 'py-2 px-3 text-sm',
    label: 'text-sm',
  },
  lg: {
    input: 'h-12 text-base px-4',
    option: 'py-2.5 px-4 text-base',
    label: 'text-base',
  },
};

const Combobox = forwardRef<ComboboxHandle, ComboboxProps>(function Combobox(
  {
    options,
    value: controlledValue,
    defaultValue = '',
    onChange,
    onInputChange,
    placeholder = 'Search...',
    label,
    error,
    disabled = false,
    loading = false,
    clearable = false,
    creatable = false,
    onCreate,
    size = 'md',
    name,
    id,
    className,
  },
  ref
) {
  const generatedId = useId();
  const comboboxId = id || generatedId;
  const config = sizeConfig[size];

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [inputText, setInputText] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;

  const selectedOption = options.find((o) => o.value === selectedValue);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => handleClear(),
  }));

  const updateDropdownPosition = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setInputText(selectedOption?.label || '');
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
  }, [isOpen, selectedOption]);

  const filteredOptions = inputText
    ? options.filter((option) =>
        option.label.toLowerCase().includes(inputText.toLowerCase())
      )
    : options;

  const showCreateOption =
    creatable &&
    inputText &&
    !options.some((o) => o.label.toLowerCase() === inputText.toLowerCase());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    onInputChange?.(text);
    if (!isOpen) {
      setIsOpen(true);
    }
    setHighlightedIndex(0);
  };

  const handleSelect = (optionValue: string) => {
    const option = options.find((o) => o.value === optionValue);
    if (!option || option.disabled) return;

    if (!isControlled) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
    setInputText(option.label);
    setIsOpen(false);
  };

  const handleCreate = () => {
    if (!inputText || !creatable) return;
    onCreate?.(inputText);
    setIsOpen(false);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    onChange?.('');
    setInputText('');
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalOptions = filteredOptions.length + (showCreateOption ? 1 : 0);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % totalOptions);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + totalOptions) % totalOptions);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[highlightedIndex].value);
        } else if (showCreateOption && highlightedIndex === filteredOptions.length) {
          handleCreate();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setInputText(selectedOption?.label || '');
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={comboboxId}
          className={cn(config.label, 'font-medium text-room-text-primary')}
        >
          {label}
        </label>
      )}

      {name && <input type="hidden" name={name} value={selectedValue} />}

      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id={comboboxId}
          value={inputText}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${comboboxId}-listbox`}
          className={cn(
            'w-full rounded-room-sm border text-room-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-room-accent',
            'placeholder:text-room-text-muted',
            config.input,
            error
              ? 'border-room-error'
              : 'border-room-border',
            disabled
              ? 'opacity-50 cursor-not-allowed bg-room-bg-base'
              : 'bg-room-bg-surface'
          )}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {loading && (
            <Loader2 className="h-4 w-4 text-room-text-muted animate-spin" />
          )}
          {clearable && selectedValue && !disabled && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 rounded hover:bg-room-bg-hover"
              aria-label="Clear"
            >
              <X className="h-4 w-4 text-room-text-muted" />
            </button>
          )}
          <ChevronDown
            className={cn(
              'h-4 w-4 text-room-text-muted transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </div>

      {error && <span className="text-sm text-room-error">{error}</span>}

      {/* Dropdown */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            id={`${comboboxId}-listbox`}
            role="listbox"
            className="fixed z-50 bg-room-bg-elevated border border-room-border rounded-room shadow-lg overflow-hidden"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
            }}
          >
            <div className="max-h-60 overflow-y-auto py-1">
              {loading ? (
                <div className="flex items-center justify-center gap-2 py-4 text-room-text-muted text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                <>
                  {filteredOptions.map((option, index) => {
                    const isSelected = selectedValue === option.value;
                    const isHighlighted = highlightedIndex === index;

                    return (
                      <div
                        key={option.value}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(option.value)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        className={cn(
                          'flex items-center gap-2 cursor-pointer transition-colors',
                          config.option,
                          option.disabled
                            ? 'opacity-50 cursor-not-allowed'
                            : isHighlighted
                            ? 'bg-room-bg-hover'
                            : isSelected
                            ? 'bg-room-accent/10'
                            : 'hover:bg-room-bg-hover'
                        )}
                      >
                        {option.icon && (
                          <span className="flex-shrink-0">{option.icon}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-room-text-primary truncate">
                            {option.label}
                          </div>
                          {option.description && (
                            <div className="text-xs text-room-text-muted truncate">
                              {option.description}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <Check className="h-4 w-4 text-room-accent flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}

                  {showCreateOption && (
                    <div
                      role="option"
                      onClick={handleCreate}
                      onMouseEnter={() =>
                        setHighlightedIndex(filteredOptions.length)
                      }
                      className={cn(
                        'flex items-center gap-2 cursor-pointer transition-colors',
                        config.option,
                        highlightedIndex === filteredOptions.length
                          ? 'bg-room-bg-hover'
                          : 'hover:bg-room-bg-hover'
                      )}
                    >
                      <Plus className="h-4 w-4 text-room-accent" />
                      <span className="text-room-accent">
                        Create "{inputText}"
                      </span>
                    </div>
                  )}

                  {filteredOptions.length === 0 && !showCreateOption && (
                    <div className="px-3 py-4 text-center text-room-text-muted text-sm">
                      No options found
                    </div>
                  )}
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
});

export { Combobox };
export default Combobox;
