import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'none';
  /** Responsive columns */
  colsSm?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  colsXl?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Number of rows */
  rows?: 1 | 2 | 3 | 4 | 5 | 6 | 'none';
  /** Gap between items */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Column gap */
  gapX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Row gap */
  gapY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Align items */
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  /** Justify items */
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  children: React.ReactNode;
}

const alignItemsMap: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyItemsMap: Record<string, string> = {
  start: 'justify-items-start',
  center: 'justify-items-center',
  end: 'justify-items-end',
  stretch: 'justify-items-stretch',
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      cols,
      colsSm,
      colsMd,
      colsLg,
      colsXl,
      rows,
      gap,
      gapX,
      gapY,
      alignItems,
      justifyItems,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      'grid',
      cols && (cols === 'none' ? 'grid-cols-none' : `grid-cols-${cols}`),
      colsSm && `sm:grid-cols-${colsSm}`,
      colsMd && `md:grid-cols-${colsMd}`,
      colsLg && `lg:grid-cols-${colsLg}`,
      colsXl && `xl:grid-cols-${colsXl}`,
      rows && (rows === 'none' ? 'grid-rows-none' : `grid-rows-${rows}`),
      gap !== undefined && `gap-${gap}`,
      gapX !== undefined && `gap-x-${gapX}`,
      gapY !== undefined && `gap-y-${gapY}`,
      alignItems && alignItemsMap[alignItems],
      justifyItems && justifyItemsMap[justifyItems],
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

// Grid Item component for spanning
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column span */
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'full';
  /** Row span */
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Column start */
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 'auto';
  /** Row start */
  rowStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 'auto';
  children?: React.ReactNode;
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ colSpan, rowSpan, colStart, rowStart, className, children, ...props }, ref) => {
    const classes = cn(
      colSpan && (colSpan === 'full' ? 'col-span-full' : `col-span-${colSpan}`),
      rowSpan && `row-span-${rowSpan}`,
      colStart && (colStart === 'auto' ? 'col-start-auto' : `col-start-${colStart}`),
      rowStart && (rowStart === 'auto' ? 'row-start-auto' : `row-start-${rowStart}`),
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

GridItem.displayName = 'GridItem';
