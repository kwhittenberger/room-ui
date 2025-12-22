import { forwardRef } from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';

export interface EmptyStateProps {
  /** Icon to display */
  icon?: React.ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Primary action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Secondary action button */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class name */
  className?: string;
}

const sizeConfig = {
  sm: {
    container: 'py-6 px-4',
    iconWrapper: 'mb-2',
    iconSize: 'h-8 w-8',
    title: 'text-base',
    description: 'text-sm',
    gap: 'gap-1',
    buttonSize: 'sm' as const,
  },
  md: {
    container: 'py-10 px-6',
    iconWrapper: 'mb-4',
    iconSize: 'h-12 w-12',
    title: 'text-lg',
    description: 'text-sm',
    gap: 'gap-2',
    buttonSize: 'md' as const,
  },
  lg: {
    container: 'py-16 px-8',
    iconWrapper: 'mb-6',
    iconSize: 'h-16 w-16',
    title: 'text-xl',
    description: 'text-base',
    gap: 'gap-3',
    buttonSize: 'lg' as const,
  },
};

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  {
    icon,
    title,
    description,
    action,
    secondaryAction,
    size = 'md',
    className,
  },
  ref
) {
  const config = sizeConfig[size];

  const defaultIcon = <Inbox className={cn(config.iconSize, 'text-room-text-muted')} />;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center text-center',
        config.container,
        className
      )}
    >
      <div className={config.iconWrapper}>
        {icon || defaultIcon}
      </div>

      <div className={cn('flex flex-col items-center', config.gap)}>
        <h3 className={cn(config.title, 'font-medium text-room-text-primary')}>
          {title}
        </h3>

        {description && (
          <p className={cn(config.description, 'text-room-text-secondary max-w-sm')}>
            {description}
          </p>
        )}
      </div>

      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-6">
          {action && (
            <Button
              variant="primary"
              size={config.buttonSize}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="secondary"
              size={config.buttonSize}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
});

export { EmptyState };
export default EmptyState;
