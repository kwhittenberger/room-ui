import { forwardRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { Breadcrumbs, type BreadcrumbItem } from '../Breadcrumbs';

export interface PageHeaderAction {
  /** Unique action ID */
  id: string;
  /** Action label */
  label: string;
  /** Action icon */
  icon?: React.ReactNode;
  /** Click handler */
  onClick: () => void;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Disabled state */
  disabled?: boolean;
}

export interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Page subtitle */
  subtitle?: string;
  /** Breadcrumb items */
  breadcrumbs?: BreadcrumbItem[];
  /** Action buttons */
  actions?: PageHeaderAction[];
  /** Back link URL */
  backHref?: string;
  /** Back button click handler */
  onBack?: () => void;
  /** Additional class name */
  className?: string;
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  {
    title,
    subtitle,
    breadcrumbs,
    actions,
    backHref,
    onBack,
    className,
  },
  ref
) {
  const showBackButton = backHref || onBack;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backHref) {
      window.location.href = backHref;
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'bg-room-bg-elevated border-b border-room-border',
        className
      )}
    >
      <div className="px-6 py-4">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        {/* Title Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Back Button */}
            {showBackButton && (
              <button
                type="button"
                onClick={handleBack}
                className={cn(
                  'flex-shrink-0 p-2 -ml-2 rounded-room-sm',
                  'text-room-text-muted hover:text-room-text-primary hover:bg-room-bg-hover',
                  'transition-colors'
                )}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            {/* Title & Subtitle */}
            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-room-text-primary truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-0.5 text-sm text-room-text-muted truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          {actions && actions.length > 0 && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actions.map((action) => (
                <Button
                  key={action.id}
                  variant={action.variant === 'danger' ? 'ghost' : action.variant || 'secondary'}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className={action.variant === 'danger' ? 'text-room-error hover:text-room-error' : undefined}
                >
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export { PageHeader };
export default PageHeader;
