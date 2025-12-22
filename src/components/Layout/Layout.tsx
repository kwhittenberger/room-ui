import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface LayoutProps {
  /** Main content */
  children: React.ReactNode;
  /** Sidebar content */
  sidebar?: React.ReactNode;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Sidebar position */
  sidebarPosition?: 'left' | 'right';
  /** Whether sidebar is collapsed */
  sidebarCollapsed?: boolean;
  /** Callback when sidebar collapsed state changes */
  onSidebarCollapsedChange?: (collapsed: boolean) => void;
  /** Sidebar width when expanded */
  sidebarWidth?: string | number;
  /** Sidebar width when collapsed */
  collapsedSidebarWidth?: string | number;
  /** Additional class name */
  className?: string;
}

const Layout = forwardRef<HTMLDivElement, LayoutProps>(function Layout(
  {
    children,
    sidebar,
    header,
    footer,
    sidebarPosition = 'left',
    sidebarCollapsed = false,
    // onSidebarCollapsedChange is exposed for parent control
    onSidebarCollapsedChange: _onSidebarCollapsedChange,
    sidebarWidth = 280,
    collapsedSidebarWidth = 64,
    className,
  },
  ref
) {
  const currentSidebarWidth = sidebarCollapsed ? collapsedSidebarWidth : sidebarWidth;
  const sidebarWidthStyle = typeof currentSidebarWidth === 'number'
    ? `${currentSidebarWidth}px`
    : currentSidebarWidth;

  return (
    <div
      ref={ref}
      className={cn(
        'flex min-h-screen bg-room-bg-base',
        className
      )}
    >
      {/* Sidebar - Left Position */}
      {sidebar && sidebarPosition === 'left' && (
        <aside
          className={cn(
            'flex-shrink-0 bg-room-bg-surface border-r border-room-border',
            'transition-[width] duration-200 ease-in-out overflow-hidden'
          )}
          style={{ width: sidebarWidthStyle }}
        >
          {sidebar}
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        {header && (
          <header className="flex-shrink-0 bg-room-bg-elevated border-b border-room-border">
            {header}
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>

        {/* Footer */}
        {footer && (
          <footer className="flex-shrink-0 bg-room-bg-elevated border-t border-room-border">
            {footer}
          </footer>
        )}
      </div>

      {/* Sidebar - Right Position */}
      {sidebar && sidebarPosition === 'right' && (
        <aside
          className={cn(
            'flex-shrink-0 bg-room-bg-surface border-l border-room-border',
            'transition-[width] duration-200 ease-in-out overflow-hidden'
          )}
          style={{ width: sidebarWidthStyle }}
        >
          {sidebar}
        </aside>
      )}
    </div>
  );
});

export { Layout };
export default Layout;
