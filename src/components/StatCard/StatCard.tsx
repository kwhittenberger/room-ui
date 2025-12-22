import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Card } from '../Card';

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number | React.ReactNode;
  subtitle?: string;
  valueColor?: string;
  iconColor?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
  className?: string;
}

export function StatCard({
  icon,
  label,
  value,
  subtitle,
  valueColor = 'text-slate-100',
  iconColor = 'bg-slate-700',
  change,
  onClick,
  className = '',
}: StatCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      variant="default"
      padding="md"
      onClick={onClick}
      hoverable={!!onClick}
      className={className}
      {...(onClick && {
        role: 'button',
        tabIndex: 0,
        onKeyDown: handleKeyDown,
      })}
    >
      {/* Icon */}
      <div className={cn('h-10 w-10 rounded-full flex items-center justify-center mb-4', iconColor)}>
        {icon}
      </div>

      {/* Value */}
      <div className={cn('text-3xl font-semibold tracking-tight', valueColor)}>
        {value}
      </div>

      {/* Label */}
      <div className="text-sm text-slate-400 mt-2">
        {label}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div className="text-xs text-slate-500 mt-1">
          {subtitle}
        </div>
      )}

      {/* Change Indicator */}
      {change && (
        <div
          className={cn(
            'flex items-center gap-1 mt-3 text-sm font-medium',
            change.isPositive ? 'text-emerald-400' : 'text-red-400'
          )}
        >
          {change.isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>
            {change.isPositive ? '+' : ''}{change.value}%
          </span>
        </div>
      )}
    </Card>
  );
}

export default StatCard;
