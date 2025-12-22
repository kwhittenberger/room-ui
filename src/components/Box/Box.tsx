import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type BoxElement = 'div' | 'span' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /** The HTML element to render */
  as?: BoxElement;
  /** Display type */
  display?: 'flex' | 'inline-flex' | 'block' | 'inline-block' | 'grid' | 'inline-grid' | 'none';
  /** Flex direction */
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** Align items */
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Justify content */
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Flex wrap */
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  /** Gap between items */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Padding */
  p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Horizontal padding */
  px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Vertical padding */
  py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Margin */
  m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 'auto';
  /** Horizontal margin */
  mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 'auto';
  /** Vertical margin */
  my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 'auto';
  /** Width */
  w?: 'full' | 'auto' | 'screen' | 'fit';
  /** Height */
  h?: 'full' | 'auto' | 'screen' | 'fit';
  /** Position */
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky';
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Background variant */
  bg?: 'base' | 'elevated' | 'surface' | 'transparent';
  children?: React.ReactNode;
}

const displayMap: Record<string, string> = {
  flex: 'flex',
  'inline-flex': 'inline-flex',
  block: 'block',
  'inline-block': 'inline-block',
  grid: 'grid',
  'inline-grid': 'inline-grid',
  none: 'hidden',
};

const flexDirectionMap: Record<string, string> = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
};

const alignItemsMap: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyContentMap: Record<string, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const flexWrapMap: Record<string, string> = {
  wrap: 'flex-wrap',
  nowrap: 'flex-nowrap',
  'wrap-reverse': 'flex-wrap-reverse',
};

const roundedMap: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

const bgMap: Record<string, string> = {
  base: 'bg-room-bg-base',
  elevated: 'bg-room-bg-elevated',
  surface: 'bg-room-bg-surface',
  transparent: 'bg-transparent',
};

export const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      as = 'div',
      display,
      flexDirection,
      alignItems,
      justifyContent,
      flexWrap,
      gap,
      p,
      px,
      py,
      m,
      mx,
      my,
      w,
      h,
      position,
      rounded,
      bg,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      display && displayMap[display],
      flexDirection && flexDirectionMap[flexDirection],
      alignItems && alignItemsMap[alignItems],
      justifyContent && justifyContentMap[justifyContent],
      flexWrap && flexWrapMap[flexWrap],
      gap !== undefined && `gap-${gap}`,
      p !== undefined && `p-${p}`,
      px !== undefined && `px-${px}`,
      py !== undefined && `py-${py}`,
      m !== undefined && (m === 'auto' ? 'm-auto' : `m-${m}`),
      mx !== undefined && (mx === 'auto' ? 'mx-auto' : `mx-${mx}`),
      my !== undefined && (my === 'auto' ? 'my-auto' : `my-${my}`),
      w && `w-${w}`,
      h && `h-${h}`,
      position,
      rounded && roundedMap[rounded],
      bg && bgMap[bg],
      className
    );

    const Component = as;

    return (
      <Component ref={ref as React.Ref<HTMLDivElement>} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
