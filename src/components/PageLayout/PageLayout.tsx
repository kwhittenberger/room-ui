import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface PageLayoutProps {
  /** Page content */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(function PageLayout(
  { children, className },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col min-h-full bg-room-bg-base',
        className
      )}
    >
      {children}
    </div>
  );
});

export { PageLayout };
export default PageLayout;
