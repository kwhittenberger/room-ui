import { useState, useRef, useEffect, forwardRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  submenu?: MenuItem[];
  shortcut?: string;
}

export interface MenuProps {
  items: MenuItem[];
  className?: string;
  onClose?: () => void;
  position?: { x: number; y: number };
  anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

// Internal props that include the ref
interface MenuInternalProps extends MenuProps {
  menuRef?: React.RefObject<HTMLDivElement>;
}

// Internal component for recursive rendering (no forwardRef)
function MenuInternal({
  items,
  className = '',
  onClose,
  position,
  anchor = 'bottom-left',
  menuRef,
}: MenuInternalProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const internalRef = useRef<HTMLDivElement>(null);
  const actualRef = menuRef || internalRef;
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Get non-divider items for keyboard navigation
  const navigableItems = items.filter((item) => !item.divider && !item.disabled);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (actualRef.current && !actualRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, actualRef]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!actualRef.current) return;

      switch (e.key) {
        case 'Escape':
          onClose?.();
          break;

        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = (prev + 1) % navigableItems.length;
            itemRefs.current[next]?.focus();
            return next;
          });
          break;

        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = (prev - 1 + navigableItems.length) % navigableItems.length;
            itemRefs.current[next]?.focus();
            return next;
          });
          break;

        case 'ArrowRight':
          e.preventDefault();
          const currentItem = navigableItems[focusedIndex];
          if (currentItem?.submenu) {
            setOpenSubmenu(currentItem.id);
          }
          break;

        case 'ArrowLeft':
          e.preventDefault();
          setOpenSubmenu(null);
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          const activeItem = navigableItems[focusedIndex];
          if (activeItem && !activeItem.disabled && activeItem.onClick) {
            activeItem.onClick();
            onClose?.();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, navigableItems, onClose, actualRef]);

  // Focus first item on mount
  useEffect(() => {
    if (itemRefs.current[0]) {
      itemRefs.current[0].focus();
    }
  }, []);

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;

    if (item.submenu) {
      setOpenSubmenu(openSubmenu === item.id ? null : item.id);
    } else {
      item.onClick?.();
      onClose?.();
    }
  };

  const handleMouseEnter = (item: MenuItem) => {
    if (item.submenu && !item.disabled) {
      setOpenSubmenu(item.id);
    }
  };

  const anchorClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  };

  const positionStyle = position
    ? { position: 'fixed' as const, top: position.y, left: position.x }
    : {};

  let navIndex = 0;

  return (
    <div
      ref={actualRef}
      className={cn(
        'bg-room-bg-elevated rounded-room shadow-lg border border-room-border py-1 min-w-[200px]',
        position ? 'fixed' : anchorClasses[anchor],
        className
      )}
      style={positionStyle}
      role="menu"
      aria-orientation="vertical"
    >
      {items.map((item, index) => {
        // Handle divider
        if (item.divider) {
          return (
            <div
              key={`divider-${index}`}
              className="h-px bg-room-border my-1"
              role="separator"
            />
          );
        }

        const currentNavIndex = navIndex;
        navIndex++;

        const isSubmenuOpen = openSubmenu === item.id;
        const hasSubmenu = item.submenu && item.submenu.length > 0;

        return (
          <div key={item.id} className="relative">
            <button
              ref={(el) => {
                itemRefs.current[currentNavIndex] = el;
              }}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => handleMouseEnter(item)}
              disabled={item.disabled}
              className={cn(
                'w-full px-3 py-2 text-left text-sm flex items-center justify-between gap-2 transition-colors',
                'focus:outline-none',
                item.disabled
                  ? 'text-room-text-disabled cursor-not-allowed'
                  : item.danger
                  ? 'text-room-error hover:bg-room-error/10'
                  : 'text-room-text-primary hover:bg-room-bg-hover',
                focusedIndex === currentNavIndex && !item.disabled && 'bg-room-bg-hover'
              )}
              role="menuitem"
              aria-haspopup={hasSubmenu}
              aria-expanded={hasSubmenu && isSubmenuOpen}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {item.icon && (
                  <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                    {item.icon}
                  </span>
                )}
                <span className="truncate">{item.label}</span>
              </div>

              {item.shortcut && (
                <span className="text-xs text-room-text-muted ml-4 flex-shrink-0">
                  {item.shortcut}
                </span>
              )}

              {hasSubmenu && (
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-room-text-muted" />
              )}
            </button>

            {/* Submenu */}
            {hasSubmenu && isSubmenuOpen && (
              <div className="absolute left-full top-0 ml-1 z-10">
                <MenuInternal
                  items={item.submenu!}
                  onClose={onClose}
                  anchor="top-left"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Exported component with forwardRef
const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu(props, ref) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Merge refs
  const actualRef = (ref as React.RefObject<HTMLDivElement>) || menuRef;

  return <MenuInternal {...props} menuRef={actualRef} />;
});

// Convenience function for creating divider items
export function MenuDivider(): MenuItem {
  return { divider: true, id: `divider-${Date.now()}`, label: '' };
}

export { Menu };
export default Menu;
