import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface BottomNavItem {
  /** Unique item ID */
  id: string;
  /** Item label */
  label: string;
  /** Item icon */
  icon: React.ReactNode;
  /** Active state icon (optional) */
  activeIcon?: React.ReactNode;
  /** Link URL (optional) */
  href?: string;
  /** Badge count or text */
  badge?: number | string;
}

export interface BottomNavigationProps {
  /** Navigation items */
  items: BottomNavItem[];
  /** Active item ID */
  activeItem?: string;
  /** Item click handler */
  onItemClick?: (item: BottomNavItem) => void;
  /** Show labels */
  showLabels?: boolean;
  /** Additional class name */
  className?: string;
}

const BottomNavigation = forwardRef<HTMLDivElement, BottomNavigationProps>(
  function BottomNavigation(
    { items, activeItem, onItemClick, showLabels = true, className },
    ref
  ) {
    return (
      <nav
        ref={ref}
        className={cn(
          'flex items-center justify-around',
          'bg-room-bg-elevated border-t border-room-border',
          'h-16 safe-area-pb',
          className
        )}
      >
        {items.map((item) => {
          const isActive = activeItem === item.id;
          const Icon = isActive && item.activeIcon ? item.activeIcon : item.icon;

          const content = (
            <div className="relative flex flex-col items-center">
              {/* Badge */}
              {item.badge !== undefined && (
                <span className={cn(
                  'absolute -top-1 -right-1 min-w-[18px] h-[18px]',
                  'flex items-center justify-center px-1',
                  'text-xs font-medium rounded-full',
                  'bg-room-error text-white'
                )}>
                  {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
                </span>
              )}

              {/* Icon */}
              <span className={cn(
                'text-xl',
                isActive ? 'text-room-accent' : 'text-room-text-muted'
              )}>
                {Icon}
              </span>

              {/* Label */}
              {showLabels && (
                <span className={cn(
                  'mt-1 text-xs',
                  isActive ? 'text-room-accent font-medium' : 'text-room-text-muted'
                )}>
                  {item.label}
                </span>
              )}
            </div>
          );

          if (item.href) {
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  if (onItemClick) {
                    e.preventDefault();
                    onItemClick(item);
                  }
                }}
                className={cn(
                  'flex-1 flex items-center justify-center py-2',
                  'transition-colors',
                  'hover:bg-room-bg-hover active:bg-room-bg-hover'
                )}
              >
                {content}
              </a>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemClick?.(item)}
              className={cn(
                'flex-1 flex items-center justify-center py-2',
                'transition-colors',
                'hover:bg-room-bg-hover active:bg-room-bg-hover'
              )}
            >
              {content}
            </button>
          );
        })}
      </nav>
    );
  }
);

export { BottomNavigation };
export default BottomNavigation;
