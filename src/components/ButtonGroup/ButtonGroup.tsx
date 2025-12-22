import React, { forwardRef, Children, cloneElement, isValidElement } from 'react';
import { cn } from '../../utils/cn';
import type { ButtonProps } from '../Button';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Attach buttons together */
  attached?: boolean;
  /** Button size (applies to all children) */
  size?: 'sm' | 'md' | 'lg';
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      attached = false,
      size,
      orientation = 'horizontal',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === 'vertical';

    const classes = cn(
      'inline-flex',
      isVertical ? 'flex-col' : 'flex-row',
      !attached && (isVertical ? 'gap-2' : 'gap-1'),
      className
    );

    // Clone children to apply consistent sizing and attached styles
    const childArray = Children.toArray(children);
    const enhancedChildren = childArray.map((child, index) => {
      if (!isValidElement(child)) return child;

      const isFirst = index === 0;
      const isLast = index === childArray.length - 1;

      const childProps: Partial<ButtonProps> = {
        ...(size && { size }),
      };

      if (attached) {
        // Apply connected border radius
        const attachedClasses = cn(
          // Remove all border radius by default
          'rounded-none',
          // Re-add for first/last
          isVertical
            ? cn(
                isFirst && 'rounded-t-room-sm',
                isLast && 'rounded-b-room-sm'
              )
            : cn(
                isFirst && 'rounded-l-room-sm',
                isLast && 'rounded-r-room-sm'
              ),
          // Add border overlap
          !isFirst && (isVertical ? '-mt-px' : '-ml-px'),
          // Ensure proper stacking on hover
          'relative hover:z-10 focus:z-20'
        );

        childProps.className = cn(
          (child.props as { className?: string }).className,
          attachedClasses
        );
      }

      return cloneElement(child as React.ReactElement<ButtonProps>, childProps);
    });

    return (
      <div ref={ref} role="group" className={classes} {...props}>
        {enhancedChildren}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
