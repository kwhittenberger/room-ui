import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Spinner } from '../Spinner';
import { Alert } from '../Alert';
import { Breadcrumbs, type BreadcrumbItem } from '../Breadcrumbs';

export interface PageProps {
  /** Page content */
  children: React.ReactNode;
  /** Page title */
  title?: string;
  /** Page subtitle */
  subtitle?: string;
  /** Breadcrumb items */
  breadcrumbs?: BreadcrumbItem[];
  /** Action buttons */
  actions?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string;
  /** Max width of content */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Additional class name */
  className?: string;
}

const maxWidthConfig = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

const paddingConfig = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  {
    children,
    title,
    subtitle,
    breadcrumbs,
    actions,
    loading = false,
    error,
    maxWidth = 'full',
    padding = 'md',
    className,
  },
  ref
) {
  const hasHeader = title || breadcrumbs || actions;

  return (
    <div
      ref={ref}
      className={cn(
        'min-h-full bg-room-bg-base',
        paddingConfig[padding],
        className
      )}
    >
      <div className={cn('mx-auto', maxWidthConfig[maxWidth])}>
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        {/* Page Header */}
        {hasHeader && (
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                {title && (
                  <h1 className="text-2xl font-semibold text-room-text-primary">
                    {title}
                  </h1>
                )}
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
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
});

export { Page };
export default Page;
