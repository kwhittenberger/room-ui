import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ChipGroupProps {
  /** Chip elements */
  children: React.ReactNode;
  /** Spacing between chips */
  spacing?: 'xs' | 'sm' | 'md';
  /** Whether chips should wrap to next line */
  wrap?: boolean;
  /** Additional class name */
  className?: string;
}

const spacingConfig = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
};

const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(function ChipGroup(
  {
    children,
    spacing = 'sm',
    wrap = true,
    className,
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center',
        spacingConfig[spacing],
        wrap ? 'flex-wrap' : 'overflow-x-auto',
        className
      )}
      role="group"
    >
      {children}
    </div>
  );
});

export { ChipGroup };
export default ChipGroup;
