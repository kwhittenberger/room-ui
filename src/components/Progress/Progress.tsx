import { cn } from '../../utils/cn';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps {
  /** Current value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Progress variant */
  variant?: ProgressVariant;
  /** Size of the progress bar */
  size?: ProgressSize;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label text */
  label?: string;
  /** Whether to show animation */
  animated?: boolean;
  /** Whether progress is indeterminate */
  indeterminate?: boolean;
  /** Custom class name */
  className?: string;
}

const variantColors: Record<ProgressVariant, string> = {
  default: 'bg-cyan-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
};

const sizeStyles: Record<ProgressSize, { bar: string; label: string }> = {
  sm: { bar: 'h-1', label: 'text-xs' },
  md: { bar: 'h-2', label: 'text-sm' },
  lg: { bar: 'h-3', label: 'text-sm' },
};

export function Progress({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  animated = false,
  indeterminate = false,
  className = '',
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full', className)}>
      {/* Label */}
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className={cn('text-slate-300', sizeStyles[size].label)}>
              {label}
            </span>
          )}
          {showLabel && (
            <span className={cn('text-slate-400', sizeStyles[size].label)}>
              {indeterminate ? '...' : `${Math.round(percentage)}%`}
            </span>
          )}
        </div>
      )}

      {/* Progress Bar Container */}
      <div
        className={cn(
          'w-full bg-slate-700 rounded-full overflow-hidden',
          sizeStyles[size].bar
        )}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {/* Progress Fill */}
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            variantColors[variant],
            animated && !indeterminate && 'animate-pulse',
            indeterminate && 'animate-indeterminate'
          )}
          style={{
            width: indeterminate ? '40%' : `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

export default Progress;
