import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CompactStatTrend {
  /** Direction of the trend */
  direction: 'up' | 'down' | 'neutral';
  /** Value to display (e.g., "+$1,247" or "+12%") */
  value: string;
  /** Color override (defaults based on direction) */
  color?: 'success' | 'error' | 'warning' | 'neutral';
}

export interface CompactStatProps {
  /** The main value to display */
  value: string;
  /** Label describing the stat */
  label: string;
  /** Optional trend indicator */
  trend?: CompactStatTrend;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Additional class name */
  className?: string;
}

/**
 * CompactStat - Single stat display optimized for mobile
 *
 * Designed for dashboard stats in 2-column mobile layouts:
 * - Compact presentation with value, label, and optional trend
 * - Responsive sizing
 * - Trend indicators with color coding
 */
export function CompactStat({
  value,
  label,
  trend,
  size = 'md',
  align = 'left',
  className = '',
}: CompactStatProps) {
  // Size classes
  const sizeClasses = {
    sm: {
      value: 'text-lg font-semibold',
      label: 'text-xs',
      trend: 'text-xs',
      icon: 'h-3 w-3',
    },
    md: {
      value: 'text-xl font-semibold',
      label: 'text-sm',
      trend: 'text-xs',
      icon: 'h-3.5 w-3.5',
    },
    lg: {
      value: 'text-2xl font-bold',
      label: 'text-sm',
      trend: 'text-sm',
      icon: 'h-4 w-4',
    },
  };

  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Trend color classes
  const getTrendColor = (trend: CompactStatTrend) => {
    if (trend.color) {
      const colorMap = {
        success: 'text-emerald-400',
        error: 'text-red-400',
        warning: 'text-amber-400',
        neutral: 'text-slate-400',
      };
      return colorMap[trend.color];
    }
    
    // Default colors based on direction
    const directionColors = {
      up: 'text-emerald-400',
      down: 'text-red-400',
      neutral: 'text-slate-400',
    };
    return directionColors[trend.direction];
  };

  // Trend icons
  const TrendIcon = trend ? {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
  }[trend.direction] : null;

  const sizes = sizeClasses[size];

  return (
    <div className={cn(alignClasses[align], className)}>
      {/* Main value */}
      <div className={cn(sizes.value, 'text-slate-100 tracking-tight')}>
        {value}
      </div>

      {/* Label */}
      <div className={cn(sizes.label, 'text-slate-400 mt-0.5')}>
        {label}
      </div>

      {/* Trend indicator */}
      {trend && (
        <div className={cn(
          'flex items-center gap-1 mt-1',
          align === 'center' && 'justify-center',
          align === 'right' && 'justify-end',
          sizes.trend,
          getTrendColor(trend)
        )}>
          {TrendIcon && <TrendIcon className={sizes.icon} />}
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  );
}

export default CompactStat;
