import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface DashboardContentProps {
  /** Dashboard content */
  children: React.ReactNode;
  /** Number of columns */
  columns?: 1 | 2 | 3 | 4;
  /** Gap size */
  gap?: 'sm' | 'md' | 'lg';
  /** Additional class name */
  className?: string;
}

const columnConfig = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const gapConfig = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

const DashboardContent = forwardRef<HTMLDivElement, DashboardContentProps>(
  function DashboardContent(
    { children, columns = 1, gap = 'md', className },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex-1 p-6',
          className
        )}
      >
        <div className={cn('grid', columnConfig[columns], gapConfig[gap])}>
          {children}
        </div>
      </div>
    );
  }
);

export { DashboardContent };
export default DashboardContent;
