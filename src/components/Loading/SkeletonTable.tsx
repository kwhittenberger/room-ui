import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Skeleton } from './Skeleton';

export interface SkeletonTableProps {
  /** Number of rows to show */
  rows?: number;
  /** Number of columns to show */
  columns?: number;
  /** Whether to show table header */
  showHeader?: boolean;
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
  /** Additional class name */
  className?: string;
}

const SkeletonTable = forwardRef<HTMLDivElement, SkeletonTableProps>(function SkeletonTable(
  {
    rows = 5,
    columns = 4,
    showHeader = true,
    animation = 'pulse',
    className,
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-room-bg-elevated rounded-room border border-room-border overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          {showHeader && (
            <thead>
              <tr className="border-b border-room-border bg-room-bg-surface">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <th key={colIndex} className="px-4 py-3 text-left">
                    <Skeleton
                      variant="text"
                      height={16}
                      width={`${60 + Math.random() * 40}%`}
                      animation={animation}
                    />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  rowIndex !== rows - 1 && 'border-b border-room-border'
                )}
              >
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-3">
                    <Skeleton
                      variant="text"
                      height={16}
                      width={`${50 + Math.random() * 50}%`}
                      animation={animation}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export { SkeletonTable };
export default SkeletonTable;
