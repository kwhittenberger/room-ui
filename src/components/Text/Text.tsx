import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'div';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** HTML element to render */
  as?: TextElement;
  /** Text size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Text color */
  color?: 'primary' | 'secondary' | 'muted' | 'disabled' | 'accent' | 'success' | 'warning' | 'error' | 'inherit';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Truncate with ellipsis */
  truncate?: boolean;
  /** Line clamp (max lines) */
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Transform to uppercase */
  uppercase?: boolean;
  /** Transform to capitalize */
  capitalize?: boolean;
  /** Use monospace font */
  mono?: boolean;
  /** Leading (line height) */
  leading?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  children?: React.ReactNode;
}

const sizeMap: Record<string, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

const weightMap: Record<string, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
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
};

const alignMap: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const leadingMap: Record<string, string> = {
  none: 'leading-none',
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
};

const lineClampMap: Record<number, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
};

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = 'p',
      size = 'md',
      weight,
      color = 'secondary',
      align,
      truncate = false,
      lineClamp,
      uppercase = false,
      capitalize = false,
      mono = false,
      leading,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Set default weight based on element type
    const defaultWeight = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(Component)
      ? 'semibold'
      : 'normal';

    const classes = cn(
      sizeMap[size],
      weightMap[weight || defaultWeight],
      colorMap[color],
      align && alignMap[align],
      truncate && 'truncate',
      lineClamp && lineClampMap[lineClamp],
      uppercase && 'uppercase',
      capitalize && 'capitalize',
      mono && 'font-mono',
      leading && leadingMap[leading],
      className
    );

    return React.createElement(
      Component,
      { ref, className: classes, ...props },
      children
    );
  }
);

Text.displayName = 'Text';

// Convenience components for headings
export const Heading = forwardRef<HTMLHeadingElement, Omit<TextProps, 'as'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }>(
  ({ level = 2, size, ...props }, ref) => {
    const defaultSizes: Record<number, TextProps['size']> = {
      1: '4xl',
      2: '3xl',
      3: '2xl',
      4: 'xl',
      5: 'lg',
      6: 'md',
    };

    return (
      <Text
        ref={ref}
        as={`h${level}` as TextElement}
        size={size || defaultSizes[level]}
        color="primary"
        {...props}
      />
    );
  }
);

Heading.displayName = 'Heading';
