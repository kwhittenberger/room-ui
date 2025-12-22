import { forwardRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Input } from '../Input';
import { Select } from '../Select';
import { DatePicker } from '../DatePicker';
import { DateRangePicker } from '../DateRangePicker';
import { NumberInput } from '../NumberInput';
import { MultiSelect } from '../MultiSelect';
import { Button } from '../Button';

export interface FilterOption {
  /** Option value */
  value: string;
  /** Option label */
  label: string;
}

export interface FilterConfig {
  /** Unique filter identifier */
  id: string;
  /** Filter label */
  label: string;
  /** Filter type */
  type: 'text' | 'select' | 'multiselect' | 'date' | 'daterange' | 'number';
  /** Options for select/multiselect */
  options?: FilterOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Default value */
  defaultValue?: unknown;
}

export interface FilterBarProps {
  /** Filter configurations */
  filters: FilterConfig[];
  /** Current filter values */
  values: Record<string, unknown>;
  /** Change handler */
  onChange: (values: Record<string, unknown>) => void;
  /** Clear all filters */
  onClear?: () => void;
  /** Apply filters (for deferred application) */
  onApply?: () => void;
  /** Show clear button */
  showClearButton?: boolean;
  /** Show apply button */
  showApplyButton?: boolean;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Additional class name */
  className?: string;
}

const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(function FilterBar(
  {
    filters,
    values,
    onChange,
    onClear,
    onApply,
    showClearButton = true,
    showApplyButton = false,
    direction = 'horizontal',
    className,
  },
  ref
) {
  const handleChange = useCallback(
    (id: string, value: unknown) => {
      onChange({ ...values, [id]: value });
    },
    [values, onChange]
  );

  const handleClear = useCallback(() => {
    const cleared: Record<string, unknown> = {};
    filters.forEach((filter) => {
      cleared[filter.id] = filter.defaultValue ?? (filter.type === 'multiselect' ? [] : '');
    });
    onChange(cleared);
    onClear?.();
  }, [filters, onChange, onClear]);

  const hasActiveFilters = filters.some((filter) => {
    const value = values[filter.id];
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== '' && value !== null;
  });

  const renderFilter = (filter: FilterConfig) => {
    const value = values[filter.id];

    switch (filter.type) {
      case 'text':
        return (
          <Input
            value={String(value ?? '')}
            onChange={(e) => handleChange(filter.id, e.target.value)}
            placeholder={filter.placeholder}
            size="sm"
          />
        );

      case 'select':
        return (
          <Select
            value={String(value ?? '')}
            onChange={(e) => handleChange(filter.id, e.target.value)}
            options={filter.options ?? []}
            placeholder={filter.placeholder}
            size="sm"
          />
        );

      case 'multiselect':
        return (
          <MultiSelect
            value={(value as string[]) ?? []}
            onChange={(selected) => handleChange(filter.id, selected)}
            options={
              filter.options?.map((opt) => ({
                value: opt.value,
                label: opt.label,
              })) ?? []
            }
            placeholder={filter.placeholder}
            size="sm"
          />
        );

      case 'date':
        return (
          <DatePicker
            value={value as Date | string | null}
            onChange={(date) => handleChange(filter.id, date)}
            placeholder={filter.placeholder}
            size="sm"
          />
        );

      case 'daterange':
        return (
          <DateRangePicker
            value={value as { start: Date | null; end: Date | null } | null}
            onChange={(range) => handleChange(filter.id, range)}
            placeholder={filter.placeholder}
            size="sm"
          />
        );

      case 'number':
        return (
          <NumberInput
            value={value as number | undefined}
            onChange={(num) => handleChange(filter.id, num)}
            placeholder={filter.placeholder}
            size="sm"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex gap-3 p-3 bg-room-bg-surface rounded-room border border-room-border',
        direction === 'vertical' && 'flex-col',
        direction === 'horizontal' && 'flex-wrap items-end',
        className
      )}
    >
      {filters.map((filter) => (
        <div
          key={filter.id}
          className={cn(
            'flex flex-col gap-1',
            direction === 'horizontal' && 'min-w-[150px] flex-shrink-0'
          )}
        >
          <label className="text-xs font-medium text-room-text-muted">
            {filter.label}
          </label>
          {renderFilter(filter)}
        </div>
      ))}

      {/* Actions */}
      <div className={cn(
        'flex gap-2',
        direction === 'horizontal' && 'ml-auto',
        direction === 'vertical' && 'mt-2'
      )}>
        {showClearButton && hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            icon={X}
          >
            Clear
          </Button>
        )}
        {showApplyButton && (
          <Button
            size="sm"
            onClick={onApply}
          >
            Apply
          </Button>
        )}
      </div>
    </div>
  );
});

export { FilterBar };
export default FilterBar;
