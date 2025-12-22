import { forwardRef } from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface IconProps extends Omit<LucideProps, 'ref'> {
  /** The Lucide icon component to render */
  icon: LucideIcon;
  /** Icon size preset */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Icon color */
  color?: 'primary' | 'secondary' | 'muted' | 'disabled' | 'accent' | 'success' | 'warning' | 'error' | 'inherit' | 'currentColor';
  /** Spin animation */
  spin?: boolean;
  /** Pulse animation */
  pulse?: boolean;
}

const sizeMap: Record<string, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
};

const colorMap: Record<string, string> = {
  primary: 'text-room-text-primary',
  secondary: 'text-room-text-secondary',
  muted: 'text-room-text-muted',
  disabled: 'text-room-text-disabled',
  accent: 'text-room-accent',
  success: 'text-room-success',
  warning: 'text-room-warning',
  error: 'text-room-error',
  inherit: 'text-inherit',
  currentColor: '', // Uses current text color
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon: IconComponent,
      size = 'md',
      color = 'currentColor',
      spin = false,
      pulse = false,
      className,
      ...props
    },
    ref
  ) => {
    const pixelSize = sizeMap[size];

    const classes = cn(
      'shrink-0',
      colorMap[color],
      spin && 'animate-spin',
      pulse && 'animate-pulse',
      className
    );

    return (
      <IconComponent
        ref={ref}
        size={pixelSize}
        className={classes}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';
