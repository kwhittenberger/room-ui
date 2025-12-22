import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Progress value (0-100) */
  value: number;
  /** Optional label */
  label?: string;
  /** Show value percentage */
  showValue?: boolean;
  /** Progress bar variant */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /** Progress bar size */
  size?: 'sm' | 'md' | 'lg';
  /** Animate the progress */
  animated?: boolean;
}

const variantStyles: Record<string, string> = {
  default: 'bg-room-accent',
  success: 'bg-room-success',
  warning: 'bg-room-warning',
  error: 'bg-room-error',
};

const sizeStyles: Record<string, { track: string; text: string }> = {
  sm: { track: 'h-1', text: 'text-xs' },
  md: { track: 'h-2', text: 'text-sm' },
  lg: { track: 'h-3', text: 'text-sm' },
};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      label,
      showValue = false,
      variant = 'default',
      size = 'md',
      animated = false,
      className,
      ...props
    },
    ref
  ) => {
    // Clamp value between 0 and 100
    const clampedValue = Math.min(100, Math.max(0, value));
    const styles = sizeStyles[size];

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-1.5">
            {label && (
              <span className={cn(styles.text, 'text-room-text-secondary font-medium')}>
                {label}
              </span>
            )}
            {showValue && (
              <span className={cn(styles.text, 'text-room-text-muted')}>
                {Math.round(clampedValue)}%
              </span>
            )}
          </div>
        )}
        <div
          className={cn(
            'w-full bg-room-bg-surface rounded-full overflow-hidden',
            styles.track
          )}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 ease-out',
              variantStyles[variant],
              animated && 'animate-pulse'
            )}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
