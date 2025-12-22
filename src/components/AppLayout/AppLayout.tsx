import { forwardRef, useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AppLayoutProps {
  /** Main content */
  children: React.ReactNode;
  /** Sidebar content */
  sidebar?: React.ReactNode;
  /** Header content */
  header?: React.ReactNode;
  /** Mobile header content (shown instead of main header on mobile) */
  mobileHeader?: React.ReactNode;
  /** Bottom navigation for mobile */
  bottomNavigation?: React.ReactNode;
  /** Whether sidebar is collapsed */
  sidebarCollapsed?: boolean;
  /** Callback when sidebar collapsed state changes */
  onSidebarCollapsedChange?: (collapsed: boolean) => void;
  /** Sidebar width */
  sidebarWidth?: string | number;
  /** Additional class name */
  className?: string;
}

const AppLayout = forwardRef<HTMLDivElement, AppLayoutProps>(function AppLayout(
  {
    children,
    sidebar,
    header,
    mobileHeader,
    bottomNavigation,
    sidebarCollapsed = false,
    // onSidebarCollapsedChange is exposed for parent control
    onSidebarCollapsedChange: _onSidebarCollapsedChange,
    sidebarWidth = 280,
    className,
  },
  ref
) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const sidebarWidthStyle = typeof sidebarWidth === 'number'
    ? `${sidebarWidth}px`
    : sidebarWidth;

  return (
    <div
      ref={ref}
      className={cn(
        'flex min-h-screen bg-room-bg-base',
        className
      )}
    >
      {/* Desktop Sidebar */}
      {sidebar && (
        <aside
          className={cn(
            'hidden lg:flex flex-shrink-0 flex-col',
            'bg-room-bg-surface border-r border-room-border',
            'transition-[width] duration-200 ease-in-out overflow-hidden'
          )}
          style={{ width: sidebarCollapsed ? 64 : sidebarWidthStyle }}
        >
          {sidebar}
        </aside>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebar && mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={closeMobileMenu}
          />
          {/* Sidebar */}
          <aside
            className={cn(
              'fixed inset-y-0 left-0 z-50 flex flex-col lg:hidden',
              'bg-room-bg-surface border-r border-room-border',
              'w-[280px] max-w-[80vw]'
            )}
          >
            <div className="flex items-center justify-end p-4 border-b border-room-border">
              <button
                type="button"
                onClick={closeMobileMenu}
                className="p-2 rounded-room-sm text-room-text-muted hover:text-room-text-primary hover:bg-room-bg-hover"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              {sidebar}
            </div>
          </aside>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Desktop Header */}
        {header && (
          <header className="hidden lg:block flex-shrink-0 bg-room-bg-elevated border-b border-room-border">
            {header}
          </header>
        )}

        {/* Mobile Header */}
        <header className="flex lg:hidden items-center justify-between px-4 h-14 bg-room-bg-elevated border-b border-room-border">
          {sidebar && (
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="p-2 -ml-2 rounded-room-sm text-room-text-muted hover:text-room-text-primary hover:bg-room-bg-hover"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          {mobileHeader || (
            <div className="flex-1 flex items-center justify-center">
              {/* Default mobile header placeholder */}
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className={cn(
          'flex-1 overflow-auto',
          bottomNavigation && 'pb-16 lg:pb-0'
        )}>
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        {bottomNavigation && (
          <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-room-bg-elevated border-t border-room-border z-30">
            {bottomNavigation}
          </nav>
        )}
      </div>
    </div>
  );
});

export { AppLayout };
export default AppLayout;
