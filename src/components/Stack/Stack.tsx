import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stack direction */
  direction?: 'vertical' | 'horizontal';
  /** Spacing between items (alias: gap) */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Spacing between items (alias for spacing, for notebook-ui compatibility) */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Align items */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Justify content */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  /** Wrap items */
  wrap?: boolean;
  /** Show divider between items */
  divider?: boolean;
  children: React.ReactNode;
}

const spacingMap: Record<string, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
};

const alignMap: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyMap: Record<string, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      spacing,
      gap,
      align = 'stretch',
      justify = 'start',
      wrap = false,
      divider = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isVertical = direction === 'vertical';
    // Use gap as alias for spacing (gap takes precedence for notebook-ui compatibility)
    const effectiveSpacing = gap ?? spacing ?? 'md';

    const classes = cn(
      'flex',
      isVertical ? 'flex-col' : 'flex-row',
      spacingMap[effectiveSpacing],
      alignMap[align],
      justifyMap[justify],
      wrap && 'flex-wrap',
      className
    );

    if (divider) {
      const childArray = React.Children.toArray(children);
      const withDividers = childArray.reduce<React.ReactNode[]>((acc, child, index) => {
        if (index > 0) {
          acc.push(
            <div
              key={`divider-${index}`}
              className={cn(
                'bg-room-border',
                isVertical ? 'h-px w-full' : 'w-px self-stretch'
              )}
            />
          );
        }
        acc.push(child);
        return acc;
      }, []);

      return (
        <div ref={ref} className={classes} {...props}>
          {withDividers}
        </div>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';
