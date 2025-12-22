import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { cn } from '../../utils/cn';

export type MaskType = 'phone' | 'credit-card' | 'date' | 'ssn' | 'zip' | 'custom';

export interface MaskedInputHandle {
  focus: () => void;
  blur: () => void;
}

export interface MaskedInputProps {
  value: string;
  onChange: (value: string) => void;
  maskType?: MaskType;
  customMask?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

export const MaskedInput = forwardRef<MaskedInputHandle, MaskedInputProps>(({
  value,
  onChange,
  maskType = 'phone',
  customMask,
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  className = '',
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }));

  const masks: Record<MaskType, string> = {
    'phone': '(999) 999-9999',
    'credit-card': '9999 9999 9999 9999',
    'date': '99/99/9999',
    'ssn': '999-99-9999',
    'zip': '99999',
    'custom': customMask || '',
  };

  const mask = customMask || masks[maskType];

  const applyMask = (rawValue: string): { masked: string; raw: string } => {
    if (!mask) return { masked: rawValue, raw: rawValue };

    const cleaned = rawValue.replace(/[^a-zA-Z0-9]/g, '');

    let masked = '';
    let rawIndex = 0;

    for (let i = 0; i < mask.length && rawIndex < cleaned.length; i++) {
      const maskChar = mask[i];
      const inputChar = cleaned[rawIndex];

      if (maskChar === '9') {
        if (/\d/.test(inputChar)) {
          masked += inputChar;
          rawIndex++;
        } else {
          break;
        }
      } else if (maskChar === 'A') {
        if (/[a-zA-Z]/.test(inputChar)) {
          masked += inputChar.toUpperCase();
          rawIndex++;
        } else {
          break;
        }
      } else if (maskChar === '*') {
        masked += inputChar;
        rawIndex++;
      } else {
        masked += maskChar;
      }
    }

    return { masked, raw: cleaned };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const { masked, raw } = applyMask(inputValue);

    setDisplayValue(masked);
    onChange(raw);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const { masked, raw } = applyMask(pastedText);

    setDisplayValue(masked);
    onChange(raw);
  };

  React.useEffect(() => {
    const { masked } = applyMask(value);
    setDisplayValue(masked);
  }, [value, mask]);

  const getPlaceholder = (): string => {
    if (placeholder) return placeholder;

    const placeholders: Record<MaskType, string> = {
      'phone': '(555) 123-4567',
      'credit-card': '1234 5678 9012 3456',
      'date': 'MM/DD/YYYY',
      'ssn': '123-45-6789',
      'zip': '12345',
      'custom': mask.replace(/9/g, '#').replace(/A/g, 'X'),
    };

    return placeholders[maskType] || '';
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-slate-100 mb-1.5">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onPaste={handlePaste}
        placeholder={getPlaceholder()}
        disabled={disabled}
        className={cn(
          'w-full px-3 py-2',
          'text-sm text-slate-100 placeholder-slate-500',
          'bg-slate-800 border rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500',
          'disabled:bg-slate-900 disabled:cursor-not-allowed',
          'transition-colors',
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-slate-700'
        )}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      )}

      {helperText && !error && (
        <p className="mt-1.5 text-xs text-slate-400">{helperText}</p>
      )}
    </div>
  );
});

MaskedInput.displayName = 'MaskedInput';
export default MaskedInput;
