import { forwardRef } from 'react';
import { Rocket, Clock } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ComingSoonProps {
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Expected release date */
  expectedDate?: string;
  /** Additional class name */
  className?: string;
}

const ComingSoon = forwardRef<HTMLDivElement, ComingSoonProps>(function ComingSoon(
  {
    title = 'Coming Soon',
    description = 'This feature is under development and will be available soon.',
    icon,
    expectedDate,
    className,
  },
  ref
) {
  const defaultIcon = (
    <div className="relative">
      <div className="absolute inset-0 bg-room-accent/20 blur-xl rounded-full" />
      <div className="relative p-4 bg-room-accent/10 rounded-full">
        <Rocket className="h-12 w-12 text-room-accent" />
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center text-center py-16 px-8',
        className
      )}
    >
      <div className="mb-6">
        {icon || defaultIcon}
      </div>

      <h2 className="text-2xl font-semibold text-room-text-primary mb-2">
        {title}
      </h2>

      <p className="text-room-text-secondary max-w-md mb-6">
        {description}
      </p>

      {expectedDate && (
        <div className="flex items-center gap-2 px-4 py-2 bg-room-bg-surface rounded-full border border-room-border">
          <Clock className="h-4 w-4 text-room-text-muted" />
          <span className="text-sm text-room-text-secondary">
            Expected: <span className="text-room-text-primary font-medium">{expectedDate}</span>
          </span>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-room-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-room-accent/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
});

export { ComingSoon };
export default ComingSoon;
