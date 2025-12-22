import { useState, createContext, useContext, forwardRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

// Context for sidebar state
interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within a Sidebar');
  }
  return context;
}

// ============================================================================
// Sidebar Item
// ============================================================================

export interface SidebarItemProps {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Whether the item is active/selected */
  active?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Link href (renders as anchor if provided) */
  href?: string;
  /** Badge content (e.g., notification count) */
  badge?: React.ReactNode;
  /** Nested items for collapsible sections */
  children?: SidebarItemProps[];
}

// Internal component for recursive rendering (no forwardRef)
function SidebarItemInternal({
  id,
  label,
  icon,
  active = false,
  disabled = false,
  onClick,
  href,
  badge,
  children,
  depth = 0,
}: SidebarItemProps & { depth?: number }) {
  const { collapsed } = useSidebarContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = children && children.length > 0;

  const handleClick = () => {
    if (disabled) return;
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onClick?.();
    }
  };

  const itemClasses = cn(
    'w-full flex items-center gap-3 px-3 py-2 rounded-room-sm text-sm transition-colors',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent',
    depth > 0 && 'pl-10',
    disabled
      ? 'text-room-text-disabled cursor-not-allowed'
      : active
      ? 'bg-room-accent/10 text-room-accent font-medium'
      : 'text-room-text-secondary hover:bg-room-bg-hover hover:text-room-text-primary',
    collapsed && depth === 0 && 'justify-center px-2'
  );

  const content = (
    <>
      {icon && (
        <span className={cn('flex-shrink-0', collapsed && depth === 0 ? '' : '')}>
          {icon}
        </span>
      )}
      {(!collapsed || depth > 0) && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge && (
            <span className="flex-shrink-0 px-1.5 py-0.5 text-xs bg-room-accent text-white rounded-full">
              {badge}
            </span>
          )}
          {hasChildren && (
            <ChevronDown
              className={cn(
                'h-4 w-4 flex-shrink-0 transition-transform',
                isExpanded && 'rotate-180'
              )}
            />
          )}
        </>
      )}
    </>
  );

  const Element = href && !hasChildren ? 'a' : 'button';
  const elementProps = href && !hasChildren ? { href } : { type: 'button' as const };

  return (
    <div data-sidebar-item={id}>
      <Element
        {...elementProps}
        className={itemClasses}
        onClick={handleClick}
        disabled={disabled}
        aria-expanded={hasChildren ? isExpanded : undefined}
        title={collapsed && depth === 0 ? label : undefined}
      >
        {content}
      </Element>
      {hasChildren && isExpanded && !collapsed && (
        <div className="mt-1 space-y-1">
          {children.map((child) => (
            <SidebarItemInternal key={child.id} {...child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// Exported component with forwardRef
const SidebarItem = forwardRef<HTMLDivElement, SidebarItemProps & { depth?: number }>(
  function SidebarItem(props, ref) {
    return (
      <div ref={ref}>
        <SidebarItemInternal {...props} />
      </div>
    );
  }
);

// ============================================================================
// Sidebar Group
// ============================================================================

export interface SidebarGroupProps {
  /** Group title */
  title?: string;
  /** Items in this group */
  items: SidebarItemProps[];
  /** Whether the group is collapsible */
  collapsible?: boolean;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  /** Additional class name */
  className?: string;
}

const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(function SidebarGroup(
  { title, items, collapsible = false, defaultCollapsed = false, className },
  ref
) {
  const { collapsed: sidebarCollapsed } = useSidebarContext();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const showContent = !collapsible || !isCollapsed;

  return (
    <div ref={ref} className={cn('py-2', className)}>
      {title && !sidebarCollapsed && (
        <div
          className={cn(
            'flex items-center justify-between px-3 mb-2',
            collapsible && 'cursor-pointer hover:text-room-text-primary'
          )}
          onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-room-text-muted">
            {title}
          </span>
          {collapsible && (
            <ChevronDown
              className={cn(
                'h-3 w-3 text-room-text-muted transition-transform',
                isCollapsed && '-rotate-90'
              )}
            />
          )}
        </div>
      )}
      {showContent && (
        <div className="space-y-1">
          {items.map((item) => (
            <SidebarItemInternal key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
});

// ============================================================================
// Sidebar Header
// ============================================================================

export interface SidebarHeaderProps {
  /** Header content (e.g., logo, brand) */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(function SidebarHeader(
  { children, className },
  ref
) {
  const { collapsed } = useSidebarContext();

  return (
    <div
      ref={ref}
      className={cn(
        'px-4 py-4 border-b border-room-border',
        collapsed && 'px-2 flex justify-center',
        className
      )}
    >
      {children}
    </div>
  );
});

// ============================================================================
// Sidebar Footer
// ============================================================================

export interface SidebarFooterProps {
  /** Footer content */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(function SidebarFooter(
  { children, className },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('mt-auto px-3 py-4 border-t border-room-border', className)}
    >
      {children}
    </div>
  );
});

// ============================================================================
// Sidebar Toggle
// ============================================================================

export interface SidebarToggleProps {
  /** Additional class name */
  className?: string;
}

const SidebarToggle = forwardRef<HTMLButtonElement, SidebarToggleProps>(function SidebarToggle(
  { className },
  ref
) {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setCollapsed(!collapsed)}
      className={cn(
        'p-2 rounded-room-sm text-room-text-muted hover:text-room-text-primary hover:bg-room-bg-hover transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent',
        className
      )}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      {collapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </button>
  );
});

// ============================================================================
// Sidebar Divider
// ============================================================================

const SidebarDivider = forwardRef<HTMLDivElement, { className?: string }>(
  function SidebarDivider({ className }, ref) {
    return (
      <div
        ref={ref}
        className={cn('my-2 h-px bg-room-border mx-3', className)}
        role="separator"
      />
    );
  }
);

// ============================================================================
// Main Sidebar
// ============================================================================

export interface SidebarProps {
  /** Sidebar content */
  children: React.ReactNode;
  /** Whether sidebar is collapsed */
  collapsed?: boolean;
  /** Default collapsed state (uncontrolled) */
  defaultCollapsed?: boolean;
  /** Controlled collapse state change handler */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Width when expanded */
  width?: number | string;
  /** Width when collapsed */
  collapsedWidth?: number | string;
  /** Position (left or right) */
  position?: 'left' | 'right';
  /** Additional class name */
  className?: string;
}

const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  {
    children,
    collapsed: controlledCollapsed,
    defaultCollapsed = false,
    onCollapsedChange,
    width = 240,
    collapsedWidth = 64,
    position = 'left',
    className,
  },
  ref
) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);

  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const setCollapsed = (value: boolean) => {
    if (isControlled) {
      onCollapsedChange?.(value);
    } else {
      setInternalCollapsed(value);
    }
  };

  const currentWidth = collapsed ? collapsedWidth : width;

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <aside
        ref={ref}
        className={cn(
          'flex flex-col h-full bg-room-bg-elevated border-room-border transition-all duration-200',
          position === 'left' ? 'border-r' : 'border-l',
          className
        )}
        style={{ width: currentWidth }}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  );
});

// ============================================================================
// Exports
// ============================================================================

export {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarToggle,
  SidebarDivider,
  useSidebarContext,
};

export default Sidebar;
