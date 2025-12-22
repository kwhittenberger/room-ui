import { Filter, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';

export interface FilterStatusBannerProps {
  /** Number of active filters */
  activeFilters: number;
  /** Callback to clear all filters */
  onClear: () => void;
  /** Custom summary of applied filters */
  filterSummary?: string;
  /** Whether to show the filter icon */
  showIcon?: boolean;
  /** Custom clear button text */
  clearText?: string;
  /** Custom class name */
  className?: string;
}

export function FilterStatusBanner({
  activeFilters,
  onClear,
  filterSummary,
  showIcon = true,
  clearText = 'Clear all',
  className = '',
}: FilterStatusBannerProps) {
  if (activeFilters === 0) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 px-4 py-2',
        'bg-cyan-900/30 border border-cyan-700/50 rounded-lg',
        className
      )}
    >
      <div className="flex items-center gap-2">
        {showIcon && <Filter className="h-4 w-4 text-cyan-400" />}
        <span className="text-sm text-cyan-100">
          {filterSummary || (
            <>
              <span className="font-medium">{activeFilters}</span>
              {' '}
              {activeFilters === 1 ? 'filter' : 'filters'} applied
            </>
          )}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        icon={X}
        className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-800/50"
      >
        {clearText}
      </Button>
    </div>
  );
}

export default FilterStatusBanner;
