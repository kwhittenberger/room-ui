import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface DashboardHeaderProps {
  /** Dashboard title */
  title: string;
  /** Dashboard subtitle */
  subtitle?: string;
  /** Action buttons */
  actions?: React.ReactNode;
  /** Additional content */
  children?: React.ReactNode;
  /** Additional class name */
  className?: string;
}

const DashboardHeader = forwardRef<HTMLDivElement, DashboardHeaderProps>(
  function DashboardHeader(
    { title, subtitle, actions, children, className },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'px-6 py-4 bg-room-bg-elevated border-b border-room-border',
          className
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-room-text-primary">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-room-text-muted">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    );
  }
);

export { DashboardHeader };
export default DashboardHeader;
