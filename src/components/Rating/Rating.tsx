import { forwardRef, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface RatingProps {
  /** Current rating value */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Callback when rating changes */
  onChange?: (value: number) => void;
  /** Maximum number of stars */
  max?: number;
  /** Size of the stars */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the rating is disabled */
  disabled?: boolean;
  /** Whether the rating is read-only */
  readOnly?: boolean;
  /** Allow half-star ratings */
  allowHalf?: boolean;
  /** Custom filled icon */
  icon?: React.ReactNode;
  /** Custom empty icon */
  emptyIcon?: React.ReactNode;
  /** Label text */
  label?: string;
  /** Additional class name */
  className?: string;
}

const sizeConfig = {
  sm: {
    icon: 'h-4 w-4',
    gap: 'gap-0.5',
    label: 'text-sm',
  },
  md: {
    icon: 'h-5 w-5',
    gap: 'gap-1',
    label: 'text-sm',
  },
  lg: {
    icon: 'h-6 w-6',
    gap: 'gap-1.5',
    label: 'text-base',
  },
};

const Rating = forwardRef<HTMLDivElement, RatingProps>(function Rating(
  {
    value: controlledValue,
    defaultValue = 0,
    onChange,
    max = 5,
    size = 'md',
    disabled = false,
    readOnly = false,
    allowHalf = false,
    icon,
    emptyIcon,
    label,
    className,
  },
  ref
) {
  const config = sizeConfig[size];
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  const isInteractive = !disabled && !readOnly;

  const handleClick = (starValue: number) => {
    if (!isInteractive) return;
    if (!isControlled) {
      setInternalValue(starValue);
    }
    onChange?.(starValue);
  };

  const handleMouseMove = (e: React.MouseEvent, starIndex: number) => {
    if (!isInteractive) return;
    
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const isFirstHalf = x < rect.width / 2;
      setHoverValue(starIndex + (isFirstHalf ? 0.5 : 1));
    } else {
      setHoverValue(starIndex + 1);
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const fillPercentage = Math.min(Math.max((displayValue - index) * 100, 0), 100);
    
    const FilledIcon = icon || <Star className={cn(config.icon, 'fill-current')} />;
    const EmptyIcon = emptyIcon || <Star className={config.icon} />;

    return (
      <button
        key={index}
        type="button"
        onClick={() => handleClick(allowHalf && hoverValue ? hoverValue : starValue)}
        onMouseMove={(e) => handleMouseMove(e, index)}
        disabled={!isInteractive}
        className={cn(
          'relative focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent rounded',
          isInteractive && 'cursor-pointer hover:scale-110 transition-transform',
          !isInteractive && 'cursor-default'
        )}
        aria-label={`Rate ${starValue} out of ${max}`}
      >
        {/* Empty star (background) */}
        <span className="text-room-text-disabled">
          {EmptyIcon}
        </span>
        
        {/* Filled star (overlay with clip) */}
        <span
          className="absolute inset-0 overflow-hidden text-amber-400"
          style={{ width: `${fillPercentage}%` }}
        >
          {FilledIcon}
        </span>
      </button>
    );
  };

  return (
    <div ref={ref} className={cn('inline-flex flex-col gap-1.5', className)}>
      {label && (
        <span className={cn(config.label, 'font-medium text-room-text-primary')}>
          {label}
        </span>
      )}
      <div
        className={cn(
          'inline-flex items-center',
          config.gap,
          disabled && 'opacity-50'
        )}
        onMouseLeave={handleMouseLeave}
        role="radiogroup"
        aria-label={label || 'Rating'}
      >
        {Array.from({ length: max }, (_, i) => renderStar(i))}
      </div>
    </div>
  );
});

export { Rating };
export default Rating;
