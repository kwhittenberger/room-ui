import { forwardRef } from 'react';
import { X, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';

export interface FilterControlsProps {
  /** Filter content (form fields) */
  children: React.ReactNode;
  /** Clear filters handler */
  onClear?: () => void;
  /** Apply filters handler */
  onApply?: () => void;
  /** Show clear button */
  showClear?: boolean;
  /** Show apply button */
  showApply?: boolean;
  /** Clear button label */
  clearLabel?: string;
  /** Apply button label */
  applyLabel?: string;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Whether filters are currently active */
  hasActiveFilters?: boolean;
  /** Additional class name */
  className?: string;
}

const FilterControls = forwardRef<HTMLDivElement, FilterControlsProps>(
  function FilterControls(
    {
      children,
      onClear,
      onApply,
      showClear = true,
      showApply = false,
      clearLabel = 'Clear Filters',
      applyLabel = 'Apply',
      direction = 'horizontal',
      hasActiveFilters = false,
      className,
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'p-3 bg-room-bg-surface rounded-room border border-room-border',
          className
        )}
      >
        <div
          className={cn(
            'flex gap-3',
            direction === 'horizontal' && 'flex-wrap items-end',
            direction === 'vertical' && 'flex-col'
          )}
        >
          {children}
        </div>

        {(showClear || showApply) && (
          <div
            className={cn(
              'flex gap-2 mt-4 pt-3 border-t border-room-border',
              direction === 'horizontal' && 'justify-end'
            )}
          >
            {showClear && hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                icon={X}
              >
                {clearLabel}
              </Button>
            )}
            {showApply && (
              <Button
                size="sm"
                onClick={onApply}
                icon={Check}
              >
                {applyLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
);

export { FilterControls };
export default FilterControls;
