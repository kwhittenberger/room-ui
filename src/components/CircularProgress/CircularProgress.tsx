import { forwardRef, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type CircularProgressVariant = 'default' | 'success' | 'warning' | 'error';
export type CircularProgressSize = 'sm' | 'md' | 'lg' | 'xl';

export interface CircularProgressProps {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Size preset or custom pixel value */
  size?: CircularProgressSize | number;
  /** Stroke width */
  strokeWidth?: number;
  /** Color variant */
  variant?: CircularProgressVariant;
  /** Show percentage label in center */
  showLabel?: boolean;
  /** Custom center content (overrides showLabel) */
  centerContent?: ReactNode;
  /** Custom label formatter */
  labelFormatter?: (value: number, max: number) => string;
  /** Whether to animate the progress */
  animated?: boolean;
  /** Track color (background circle) */
  trackColor?: string;
  /** Additional class name */
  className?: string;
}

const sizeConfig: Record<CircularProgressSize, { size: number; strokeWidth: number; fontSize: string }> = {
  sm: { size: 32, strokeWidth: 3, fontSize: 'text-xs' },
  md: { size: 48, strokeWidth: 4, fontSize: 'text-sm' },
  lg: { size: 64, strokeWidth: 4, fontSize: 'text-lg' },
  xl: { size: 80, strokeWidth: 5, fontSize: 'text-xl' },
};

const variantColors: Record<CircularProgressVariant, string> = {
  default: 'text-cyan-400',
  success: 'text-emerald-400',
  warning: 'text-amber-400',
  error: 'text-red-400',
};

/**
 * CircularProgress - A circular progress indicator with customizable size and appearance.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CircularProgress value={75} />
 *
 * // With label
 * <CircularProgress value={75} showLabel />
 *
 * // With custom center content
 * <CircularProgress value={75} centerContent={<Heart size={16} />} />
 *
 * // Different variants
 * <CircularProgress value={75} variant="success" />
 * <CircularProgress value={30} variant="error" />
 * ```
 */
export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  function CircularProgress(
    {
      value,
      max = 100,
      size = 'md',
      strokeWidth: customStrokeWidth,
      variant = 'default',
      showLabel = false,
      centerContent,
      labelFormatter,
      animated = true,
      trackColor,
      className,
    },
    ref
  ) {
    // Get size configuration
    const sizePreset = typeof size === 'string' ? sizeConfig[size as CircularProgressSize] : null;
    const pixelSize: number = sizePreset ? sizePreset.size : (size as number);
    const strokeWidthValue = customStrokeWidth ?? (sizePreset?.strokeWidth ?? 4);
    const fontSize = sizePreset?.fontSize ?? 'text-sm';

    // Calculate progress
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const radius = (pixelSize - strokeWidthValue) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Format label
    const label = labelFormatter
      ? labelFormatter(value, max)
      : `${Math.round(percentage)}%`;

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: pixelSize, height: pixelSize }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <svg
          className="transform -rotate-90"
          width={pixelSize}
          height={pixelSize}
        >
          {/* Background track */}
          <circle
            cx={pixelSize / 2}
            cy={pixelSize / 2}
            r={radius}
            fill="none"
            stroke={trackColor || 'rgb(51, 65, 85)'}
            strokeWidth={strokeWidthValue}
          />
          {/* Progress arc */}
          <circle
            cx={pixelSize / 2}
            cy={pixelSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidthValue}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              variantColors[variant],
              animated && 'transition-all duration-500 ease-out'
            )}
          />
        </svg>

        {/* Center content */}
        {(centerContent || showLabel) && (
          <div className="absolute inset-0 flex items-center justify-center">
            {centerContent || (
              <span className={cn('font-bold text-white', fontSize)}>
                {label}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default CircularProgress;
