import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ColorPickerProps {
  /** Current color value (hex format: #RRGGBB) */
  value?: string;
  /** Callback when color changes */
  onChange?: (color: string) => void;
  /** Preset color swatches */
  presets?: string[];
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Show alpha/transparency control */
  showAlpha?: boolean;
  /** Additional class name */
  className?: string;
}

const defaultPresets = [
  '#EF4444',
  '#F59E0B',
  '#10B981',
  '#3B82F6',
  '#8B5CF6',
  '#EC4899',
  '#6B7280',
  '#000000',
  '#FFFFFF',
  '#DC2626',
  '#F97316',
  '#84CC16',
  '#14B8A6',
  '#06B6D4',
  '#6366F1',
  '#A855F7',
  '#D946EF',
  '#F43F5E',
];

const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value = '#3B82F6',
      onChange,
      presets = defaultPresets,
      label,
      helperText,
      disabled = false,
      showAlpha: _showAlpha = false,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hexInput, setHexInput] = useState(value);
    const pickerRef = useRef<HTMLDivElement>(null);

    // Sync hex input when value changes
    useEffect(() => {
      setHexInput(value);
    }, [value]);

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const handleColorChange = (color: string) => {
      setHexInput(color);
      onChange?.(color);
    };

    const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      setHexInput(input);

      // Validate hex color
      if (/^#([0-9A-F]{3}){1,2}$/i.test(input)) {
        onChange?.(input);
      }
    };

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-slate-200 mb-1.5">{label}</label>
        )}

        {/* Color Picker Container */}
        <div ref={pickerRef} className="relative">
          {/* Trigger Button */}
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className={cn(
              'w-full flex items-center justify-between px-4 py-3 border rounded-lg',
              'transition-all duration-200 bg-slate-800',
              disabled
                ? 'opacity-40 cursor-not-allowed border-slate-700'
                : 'cursor-pointer hover:border-slate-500 border-slate-600',
              isOpen && 'border-cyan-500 ring-2 ring-cyan-500/20'
            )}
          >
            <div className="flex items-center gap-3">
              {/* Color Swatch */}
              <div
                className="h-6 w-6 rounded border border-slate-600 shadow-sm"
                style={{ backgroundColor: value }}
              />
              {/* Hex Value */}
              <span className="text-sm text-slate-200 font-mono">{value.toUpperCase()}</span>
            </div>
          </button>

          {/* Dropdown Picker */}
          {isOpen && (
            <div className="absolute z-50 w-full mt-2 p-4 bg-slate-800 rounded-lg shadow-lg border border-slate-700 animate-in fade-in-0 zoom-in-95">
              {/* Hex Input */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Hex Color
                </label>
                <input
                  type="text"
                  value={hexInput}
                  onChange={handleHexInputChange}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  placeholder="#000000"
                  maxLength={7}
                />
              </div>

              {/* Preset Swatches */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Preset Colors
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {presets.map((preset) => {
                    const isSelected = preset.toLowerCase() === value.toLowerCase();
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleColorChange(preset)}
                        className={cn(
                          'relative h-10 w-full rounded border-2 transition-all duration-200',
                          isSelected
                            ? 'border-cyan-500 scale-105'
                            : 'border-slate-600 hover:border-cyan-400'
                        )}
                        style={{ backgroundColor: preset }}
                        aria-label={preset}
                      >
                        {isSelected && (
                          <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white drop-shadow-md" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Native Color Picker */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Custom Color
                </label>
                <input
                  type="color"
                  value={value}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-full h-10 rounded border border-slate-600 cursor-pointer bg-slate-900"
                />
              </div>
            </div>
          )}
        </div>

        {/* Helper Text */}
        {helperText && <p className="mt-2 text-xs text-slate-400">{helperText}</p>}
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
