import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'outline';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Rounded/pill style */
  pill?: boolean;
  /** Show pulsing animation for attention */
  pulse?: boolean;
  /** Show a dot indicator before the text */
  dot?: boolean;
  /** Icon to display before text */
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  default: 'bg-room-bg-surface text-room-text-secondary border-room-border',
  neutral: 'bg-room-bg-surface text-room-text-secondary border-room-border', // Alias for default
  primary: 'bg-room-accent-muted text-cyan-300 border-cyan-700',
  success: 'bg-room-success-muted text-emerald-300 border-emerald-700',
  warning: 'bg-room-warning-muted text-amber-300 border-amber-700',
  error: 'bg-room-error-muted text-red-300 border-red-700',
  info: 'bg-room-info-muted text-blue-300 border-blue-700',
  outline: 'bg-transparent text-room-text-secondary border-room-border',
};

const dotColors: Record<string, string> = {
  default: 'bg-slate-400',
  neutral: 'bg-slate-400',
  primary: 'bg-cyan-400',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  error: 'bg-red-400',
  info: 'bg-blue-400',
  outline: 'bg-slate-400',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      pill = false,
      pulse = false,
      dot = false,
      icon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      'inline-flex items-center font-medium border',
      pill ? 'rounded-full' : 'rounded',
      variantStyles[variant],
      sizeStyles[size],
      pulse && 'animate-pulse',
      className
    );

    return (
      <span ref={ref} className={classes} {...props}>
        {dot && (
          <span
            className={cn(
              'rounded-full mr-1.5',
              size === 'sm' ? 'h-1.5 w-1.5' : size === 'lg' ? 'h-2.5 w-2.5' : 'h-2 w-2',
              dotColors[variant]
            )}
          />
        )}
        {icon && <span className="mr-1 -ml-0.5">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// Status Badge with predefined statuses
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  status: 'pending' | 'in-progress' | 'complete' | 'overdue' | 'lost' | 'won' | 'draft' | 'active' | 'archived' | 'cancelled' | 'on-hold' | 'review';
}

const statusConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
  pending: { variant: 'default', label: 'Pending' },
  'in-progress': { variant: 'primary', label: 'In Progress' },
  complete: { variant: 'success', label: 'Complete' },
  overdue: { variant: 'error', label: 'Overdue' },
  lost: { variant: 'error', label: 'Lost' },
  won: { variant: 'success', label: 'Won' },
  draft: { variant: 'default', label: 'Draft' },
  active: { variant: 'primary', label: 'Active' },
  archived: { variant: 'neutral', label: 'Archived' },
  cancelled: { variant: 'error', label: 'Cancelled' },
  'on-hold': { variant: 'warning', label: 'On Hold' },
  review: { variant: 'info', label: 'In Review' },
};

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    const config = statusConfig[status];
    return (
      <Badge ref={ref} variant={config.variant} {...props}>
        {config.label}
      </Badge>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';
