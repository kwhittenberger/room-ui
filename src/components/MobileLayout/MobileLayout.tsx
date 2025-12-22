import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface MobileLayoutProps {
  /** Main content */
  children: React.ReactNode;
  /** Header component */
  header?: React.ReactNode;
  /** Bottom navigation component */
  bottomNavigation?: React.ReactNode;
  /** Floating action button */
  fab?: React.ReactNode;
  /** Additional class name */
  className?: string;
}

const MobileLayout = forwardRef<HTMLDivElement, MobileLayoutProps>(
  function MobileLayout(
    { children, header, bottomNavigation, fab, className },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col min-h-screen bg-room-bg-base',
          className
        )}
      >
        {/* Header */}
        {header}

        {/* Main Content */}
        <main
          className={cn(
            'flex-1 overflow-auto',
            bottomNavigation && 'pb-16'
          )}
        >
          {children}
        </main>

        {/* Bottom Navigation */}
        {bottomNavigation && (
          <div className="fixed bottom-0 left-0 right-0 z-40">
            {bottomNavigation}
          </div>
        )}

        {/* Floating Action Button */}
        {fab && (
          <div className={cn(
            'fixed z-30',
            bottomNavigation ? 'bottom-20' : 'bottom-6',
            'right-4'
          )}>
            {fab}
          </div>
        )}
      </div>
    );
  }
);

export { MobileLayout };
export default MobileLayout;
