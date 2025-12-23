import { forwardRef, useMemo, useState, ReactNode } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { CircularProgress, CircularProgressVariant } from '../CircularProgress';

export type ScoreStatus = 'good' | 'warning' | 'critical';

export interface ScoreBreakdownItem {
  /** Unique key for this item */
  key: string;
  /** Display label */
  label: string;
  /** Current score */
  score: number;
  /** Maximum possible score */
  maxScore: number;
  /** Status indicator */
  status: ScoreStatus;
}

export interface ScoreIndicatorProps {
  /** Overall score percentage (0-100) */
  percentage: number;
  /** Score status */
  status: ScoreStatus;
  /** Title label */
  title?: string;
  /** Optional subtitle or status label */
  subtitle?: string;
  /** Score breakdown items */
  breakdown?: ScoreBreakdownItem[];
  /** Insights/warnings to display */
  insights?: string[];
  /** Recommendations to display */
  recommendations?: string[];
  /** Display variant */
  variant?: 'compact' | 'full';
  /** Custom center icon for circular progress */
  icon?: ReactNode;
  /** Size of the indicator */
  size?: 'sm' | 'md' | 'lg';
  /** Callback when clicked (for compact variant) */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
}

const STATUS_ICONS = {
  good: CheckCircle,
  warning: AlertTriangle,
  critical: AlertCircle,
};

const STATUS_COLORS = {
  good: 'text-emerald-400',
  warning: 'text-amber-400',
  critical: 'text-red-400',
};

// Background colors can be used by consumers via getStatusBgColor
const STATUS_BG_COLORS: Record<ScoreStatus, string> = {
  good: 'bg-emerald-500/20',
  warning: 'bg-amber-500/20',
  critical: 'bg-red-500/20',
};

/** Get background color class for a score status */
export function getStatusBgColor(status: ScoreStatus): string {
  return STATUS_BG_COLORS[status];
}

function getVariantFromStatus(status: ScoreStatus): CircularProgressVariant {
  switch (status) {
    case 'good':
      return 'success';
    case 'warning':
      return 'warning';
    case 'critical':
      return 'error';
    default:
      return 'default';
  }
}

/**
 * ScoreIndicator - Displays a score with optional breakdown, insights, and recommendations.
 *
 * @example
 * ```tsx
 * // Compact variant (clickable badge)
 * <ScoreIndicator
 *   percentage={75}
 *   status="good"
 *   variant="compact"
 *   onClick={() => console.log('View details')}
 * />
 *
 * // Full variant with breakdown
 * <ScoreIndicator
 *   percentage={65}
 *   status="warning"
 *   title="Health Score"
 *   subtitle="Needs Attention"
 *   breakdown={[
 *     { key: 'activity', label: 'Activity', score: 15, maxScore: 25, status: 'warning' },
 *     { key: 'progress', label: 'Progress', score: 18, maxScore: 20, status: 'good' },
 *   ]}
 *   insights={['No activity in 5 days']}
 *   recommendations={['Schedule a follow-up call']}
 * />
 * ```
 */
export const ScoreIndicator = forwardRef<HTMLDivElement, ScoreIndicatorProps>(
  function ScoreIndicator(
    {
      percentage,
      status,
      title = 'Score',
      subtitle,
      breakdown,
      insights,
      recommendations,
      variant = 'full',
      icon,
      size = 'md',
      onClick,
      className,
    },
    ref
  ) {
    const [isExpanded, setIsExpanded] = useState(false);
    const progressVariant = useMemo(() => getVariantFromStatus(status), [status]);

    const circularSizeMap = {
      sm: 28,
      md: 60,
      lg: 80,
    };

    if (variant === 'compact') {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          onClick={onClick}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5',
            'bg-slate-800/50 hover:bg-slate-800',
            'border border-slate-700 rounded-lg',
            'transition-colors',
            className
          )}
          title={`${title}: ${percentage}%${subtitle ? ` - ${subtitle}` : ''}`}
        >
          <CircularProgress
            value={percentage}
            size={circularSizeMap[size]}
            strokeWidth={3}
            variant={progressVariant}
            centerContent={icon}
          />
          <span className={cn('text-sm font-medium', STATUS_COLORS[status])}>
            {percentage}%
          </span>
        </button>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'bg-slate-900/50 rounded-xl border border-slate-800 p-4',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              {title}
            </h2>
            {subtitle && (
              <span className={cn('text-xs font-medium', STATUS_COLORS[status])}>
                {subtitle}
              </span>
            )}
          </div>
          {(insights?.length || recommendations?.length) && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>

        {/* Score Display */}
        <div className="flex items-center gap-4 mb-4">
          <CircularProgress
            value={percentage}
            size={circularSizeMap.lg}
            variant={progressVariant}
            centerContent={icon}
          />
          <div className="flex-1">
            <div className="text-2xl font-bold text-white">{percentage}%</div>
            {breakdown && (
              <div className="text-xs text-slate-400">
                {breakdown.reduce((sum, item) => sum + item.score, 0)}/
                {breakdown.reduce((sum, item) => sum + item.maxScore, 0)} points
              </div>
            )}
          </div>
        </div>

        {/* Breakdown */}
        {breakdown && breakdown.length > 0 && (
          <div className="space-y-2 mb-4">
            {breakdown.map((item) => {
              const StatusIcon = STATUS_ICONS[item.status];
              return (
                <div key={item.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StatusIcon size={12} className={STATUS_COLORS[item.status]} />
                    <span className="text-xs text-slate-400">{item.label}</span>
                  </div>
                  <span className={cn('text-xs font-medium', STATUS_COLORS[item.status])}>
                    {item.score}/{item.maxScore}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Expanded Details */}
        {isExpanded && (
          <div className="pt-4 border-t border-slate-800 space-y-4">
            {/* Insights */}
            {insights && insights.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                  Insights
                </h3>
                <ul className="space-y-1">
                  {insights.map((insight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-300"
                    >
                      <span className="text-amber-400 mt-0.5">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {recommendations && recommendations.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                  Recommendations
                </h3>
                <ul className="space-y-1">
                  {recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-300"
                    >
                      <span className="text-cyan-400 mt-0.5">→</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        {onClick && (
          <button
            onClick={onClick}
            className="w-full mt-4 py-2 text-xs text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 rounded-lg transition-colors"
          >
            View Details
          </button>
        )}
      </div>
    );
  }
);

export default ScoreIndicator;
