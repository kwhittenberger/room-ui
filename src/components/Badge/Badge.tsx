import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Rounded/pill style */
  pill?: boolean;
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
      className
    );

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// Status Badge with predefined statuses
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  status: 'pending' | 'in-progress' | 'complete' | 'overdue' | 'lost' | 'won' | 'draft' | 'active';
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
