import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spinner size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Spinner color */
  color?: 'primary' | 'secondary' | 'white' | 'accent';
}

const sizeStyles: Record<string, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
  xl: 'w-12 h-12 border-4',
};

const colorStyles: Record<string, { track: string; spinner: string }> = {
  primary: {
    track: 'border-room-bg-surface',
    spinner: 'border-t-room-text-primary',
  },
  secondary: {
    track: 'border-room-bg-surface',
    spinner: 'border-t-room-text-muted',
  },
  white: {
    track: 'border-white/20',
    spinner: 'border-t-white',
  },
  accent: {
    track: 'border-room-accent/20',
    spinner: 'border-t-room-accent',
  },
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', color = 'accent', className, ...props }, ref) => {
    const colorStyle = colorStyles[color];

    const classes = cn(
      'rounded-full animate-spin',
      sizeStyles[size],
      colorStyle.track,
      colorStyle.spinner,
      className
    );

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={classes}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
