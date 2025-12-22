import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface SliderProps {
  /** Current value */
  value?: number;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Minimum value (default: 0) */
  min?: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Step increment (default: 1) */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Show value label */
  showValue?: boolean;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Color variant */
  color?: 'primary' | 'success' | 'warning' | 'error';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom value formatter */
  formatValue?: (value: number) => string;
  /** Show min/max labels */
  showMinMax?: boolean;
  /** Additional class name */
  className?: string;
}

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value = 0,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      showValue = false,
      label,
      helperText,
      color = 'primary',
      size = 'md',
      formatValue,
      showMinMax = false,
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const currentValue = value !== undefined ? value : internalValue;

    // Calculate percentage
    const percentage = ((currentValue - min) / (max - min)) * 100;

    const colorClasses = {
      primary: 'bg-cyan-500',
      success: 'bg-emerald-500',
      warning: 'bg-amber-500',
      error: 'bg-red-500',
    };

    const thumbSizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const trackHeightClasses = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    const updateValue = (clientX: number) => {
      if (!sliderRef.current || disabled) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const rawValue = (x / rect.width) * (max - min) + min;

      // Snap to step
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      if (onChange) {
        onChange(clampedValue);
      } else {
        setInternalValue(clampedValue);
      }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      setIsDragging(true);
      updateValue(e.clientX);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      if (disabled) return;
      setIsDragging(true);
      updateValue(e.touches[0].clientX);
    };

    // Handle mouse/touch move
    useEffect(() => {
      if (!isDragging) return;

      const handleMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        updateValue(clientX);
      };

      const handleEnd = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchend', handleEnd);

      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchend', handleEnd);
      };
    }, [isDragging, disabled, min, max, step, onChange]);

    // Keyboard support
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      let newValue = currentValue;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          newValue = Math.min(max, currentValue + step);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          newValue = Math.max(min, currentValue - step);
          break;
        case 'Home':
          e.preventDefault();
          newValue = min;
          break;
        case 'End':
          e.preventDefault();
          newValue = max;
          break;
        default:
          return;
      }

      if (onChange) {
        onChange(newValue);
      } else {
        setInternalValue(newValue);
      }
    };

    const displayValue = formatValue ? formatValue(currentValue) : currentValue.toString();

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {/* Label */}
        {label && (
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-200">{label}</label>
            {showValue && (
              <span className="text-sm font-medium text-slate-300">{displayValue}</span>
            )}
          </div>
        )}

        {/* Slider Track */}
        <div
          ref={sliderRef}
          className={cn(
            'relative w-full rounded-full cursor-pointer bg-slate-700',
            trackHeightClasses[size],
            disabled && 'opacity-40 cursor-not-allowed'
          )}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
        >
          {/* Progress Fill */}
          <div
            className={cn(
              'absolute top-0 left-0 h-full rounded-full transition-all duration-100',
              colorClasses[color]
            )}
            style={{ width: `${percentage}%` }}
          />

          {/* Thumb */}
          <div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 rounded-full shadow-md border-2 border-slate-900 transition-transform duration-100',
              thumbSizeClasses[size],
              colorClasses[color],
              isDragging ? 'scale-110' : 'scale-100',
              !disabled && 'hover:scale-110'
            )}
            style={{
              left: `calc(${percentage}% - ${size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px'})`,
            }}
          />
        </div>

        {/* Min/Max Labels */}
        {showMinMax && (
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-slate-500">
              {formatValue ? formatValue(min) : min}
            </span>
            <span className="text-xs text-slate-500">
              {formatValue ? formatValue(max) : max}
            </span>
          </div>
        )}

        {/* Helper Text */}
        {helperText && <p className="mt-2 text-xs text-slate-400">{helperText}</p>}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
