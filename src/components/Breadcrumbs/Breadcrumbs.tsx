import { forwardRef } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface BreadcrumbItem {
  /** Display text for the breadcrumb */
  label: string;
  /** URL to navigate to. When provided, renders as a link */
  href?: string;
  /**
   * Optional callback fired when breadcrumb is clicked.
   * Called in addition to navigation when href is provided.
   */
  onClick?: () => void;
  /** Optional icon to display before the label */
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Whether to show the home icon link at the start. Default: true */
  showHome?: boolean;
  /** Home link href. Default: '/' */
  homeHref?: string;
  /** Home link label for accessibility. Default: 'Home' */
  homeLabel?: string;
  /** Custom separator between items */
  separator?: React.ReactNode;
  /** Maximum items to show before collapsing. 0 = no collapse */
  maxItems?: number;
  /** Custom link component (e.g., React Router Link or Next.js Link) */
  linkComponent?: React.ComponentType<{
    href: string;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
    'aria-label'?: string;
    'aria-current'?: 'page' | undefined;
  }>;
  /** Callback when home is clicked */
  onHomeClick?: () => void;
  /** Additional class name */
  className?: string;
}

// Default link component (regular anchor)
const DefaultLink: React.FC<{
  href: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  'aria-label'?: string;
}> = ({ href, className, onClick, children, ...rest }) => (
  <a href={href} className={className} onClick={onClick} {...rest}>
    {children}
  </a>
);

/**
 * Breadcrumbs navigation component.
 *
 * Supports custom link components for integration with React Router, Next.js, etc.
 *
 * @example
 * // Basic usage
 * <Breadcrumbs items={[
 *   { label: 'Home', href: '/' },
 *   { label: 'Products', href: '/products' },
 *   { label: 'Widget' }  // Current page (no href)
 * ]} />
 *
 * @example
 * // With React Router
 * import { Link } from 'react-router-dom';
 *
 * <Breadcrumbs
 *   items={[...]}
 *   linkComponent={({ href, ...props }) => <Link to={href} {...props} />}
 * />
 */
const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs(
  {
    items,
    showHome = true,
    homeHref = '/',
    homeLabel = 'Home',
    separator,
    maxItems = 0,
    linkComponent: LinkComponent = DefaultLink,
    onHomeClick,
    className,
  },
  ref
) {
  // Determine items to display (with possible collapse)
  let displayItems = items;
  let collapsed = false;

  if (maxItems > 0 && items.length > maxItems) {
    const firstCount = Math.floor((maxItems - 1) / 2);
    const lastCount = Math.ceil((maxItems - 1) / 2);
    displayItems = [
      ...items.slice(0, firstCount),
      { label: '...' },
      ...items.slice(items.length - lastCount),
    ];
    collapsed = true;
  }

  const separatorElement = separator || (
    <ChevronRight className="h-4 w-4 text-room-text-muted flex-shrink-0" />
  );

  const handleClick = (_e: React.MouseEvent, item: BreadcrumbItem) => {
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-2 text-sm', className)}
    >
      {showHome && (
        <>
          <LinkComponent
            href={homeHref}
            className="text-room-text-muted hover:text-room-text-primary transition-colors"
            onClick={() => onHomeClick?.()}
            aria-label={homeLabel}
          >
            <Home className="h-4 w-4" />
          </LinkComponent>
          {items.length > 0 && separatorElement}
        </>
      )}

      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1;
        const isCollapsedIndicator = collapsed && item.label === '...';

        const content = (
          <>
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
          </>
        );

        const renderBreadcrumb = () => {
          // Collapsed indicator
          if (isCollapsedIndicator) {
            return (
              <span className="text-room-text-muted px-1">...</span>
            );
          }

          // Active item (last item) - always render as non-clickable span
          if (isLast) {
            return (
              <span
                className="flex items-center gap-2 px-2 py-1 rounded-room-sm bg-room-accent/10 text-room-accent font-semibold"
                aria-current="page"
              >
                {content}
              </span>
            );
          }

          // Has href - render as link
          if (item.href) {
            return (
              <LinkComponent
                href={item.href}
                className="flex items-center gap-2 text-room-text-muted hover:text-room-text-primary hover:underline transition-colors"
                onClick={(e) => handleClick(e, item)}
              >
                {content}
              </LinkComponent>
            );
          }

          // Only onClick (no href) - render as button
          if (item.onClick) {
            return (
              <button
                type="button"
                onClick={item.onClick}
                className="flex items-center gap-2 text-room-text-muted hover:text-room-text-primary hover:underline transition-colors bg-transparent border-none cursor-pointer p-0"
              >
                {content}
              </button>
            );
          }

          // Neither href nor onClick - render as non-clickable span
          return (
            <span className="flex items-center gap-2 text-room-text-secondary font-medium">
              {content}
            </span>
          );
        };

        return (
          <span key={index} className="flex items-center gap-2">
            {renderBreadcrumb()}
            {!isLast && separatorElement}
          </span>
        );
      })}
    </nav>
  );
});

export { Breadcrumbs };
export default Breadcrumbs;
