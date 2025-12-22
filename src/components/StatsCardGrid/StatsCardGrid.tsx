import { cn } from '../../utils/cn';

export interface StatsCardGridProps {
  /** Stats cards to display */
  children: React.ReactNode;
  /** Number of columns */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Gap between cards */
  gap?: 'sm' | 'md' | 'lg';
  /** Custom class name */
  className?: string;
}

const columnClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
};

const gapClasses: Record<string, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
};

export function StatsCardGrid({
  children,
  columns = 4,
  gap = 'md',
  className = '',
}: StatsCardGridProps) {
  return (
    <div
      className={cn(
        'grid',
        columnClasses[columns],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

export default StatsCardGrid;
