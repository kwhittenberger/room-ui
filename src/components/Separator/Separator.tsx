import { cn } from '../../utils/cn';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

export function Separator({
  orientation = 'horizontal',
  className = '',
  spacing = 'md',
}: SeparatorProps) {
  const spacingClasses = {
    horizontal: {
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-6',
    },
    vertical: {
      sm: 'mx-2',
      md: 'mx-4',
      lg: 'mx-6',
    },
  };

  const orientationClasses = {
    horizontal: 'w-full h-px border-t',
    vertical: 'h-full w-px border-l',
  };

  return (
    <div
      className={cn(
        'border-slate-700',
        orientationClasses[orientation],
        spacingClasses[orientation][spacing],
        className
      )}
      role="separator"
      aria-orientation={orientation}
    />
  );
}

export default Separator;
