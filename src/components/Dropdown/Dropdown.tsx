import { useState, useRef, useEffect, forwardRef, cloneElement, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Menu, MenuItem } from '../Menu';
import { Button } from '../Button';

export interface DropdownProps {
  /** Menu items to display */
  items: MenuItem[];
  /** Custom trigger element. If not provided, a default button is rendered */
  trigger?: React.ReactElement;
  /** Label for the default trigger button */
  label?: string;
  /** Icon for the default trigger button */
  icon?: React.ReactNode;
  /** Whether to show chevron on default trigger */
  showChevron?: boolean;
  /** Button variant for default trigger */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  /** Button size for default trigger */
  size?: 'sm' | 'md' | 'lg';
  /** Dropdown placement relative to trigger */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Callback when dropdown opens */
  onOpen?: () => void;
  /** Callback when dropdown closes */
  onClose?: () => void;
  /** Whether dropdown is controlled open state */
  open?: boolean;
  /** Controlled open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Additional class name for the trigger wrapper */
  className?: string;
  /** Additional class name for the menu */
  menuClassName?: string;
  /** Whether to use portal for menu rendering */
  usePortal?: boolean;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  {
    items,
    trigger,
    label,
    icon,
    showChevron = true,
    variant = 'secondary',
    size = 'md',
    placement = 'bottom-start',
    disabled = false,
    onOpen,
    onClose,
    open: controlledOpen,
    onOpenChange,
    className,
    menuClassName,
    usePortal = true,
  },
  ref
) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = (value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }

    if (value) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    let x: number;
    let y: number;

    switch (placement) {
      case 'bottom-start':
        x = rect.left;
        y = rect.bottom + 4;
        break;
      case 'bottom-end':
        x = rect.right;
        y = rect.bottom + 4;
        break;
      case 'top-start':
        x = rect.left;
        y = rect.top - 4;
        break;
      case 'top-end':
        x = rect.right;
        y = rect.top - 4;
        break;
      default:
        x = rect.left;
        y = rect.bottom + 4;
    }

    setMenuPosition({ x, y });
  };

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen) {
      updatePosition();
    }
    setOpen(!isOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        triggerRef.current?.querySelector('button')?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => updatePosition();
    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [isOpen, placement]);

  // Wrap menu item onClick to close dropdown
  const wrappedItems = items.map((item) => {
    if (item.divider) return item;
    return {
      ...item,
      onClick: item.onClick
        ? () => {
            item.onClick?.();
            handleClose();
          }
        : undefined,
    };
  });

  // Render trigger
  const renderTrigger = () => {
    if (trigger && isValidElement(trigger)) {
      const triggerProps = trigger.props as { onClick?: (e: React.MouseEvent) => void; disabled?: boolean };
      return cloneElement(trigger, {
        onClick: (e: React.MouseEvent) => {
          handleToggle();
          if (triggerProps.onClick) {
            triggerProps.onClick(e);
          }
        },
        'aria-haspopup': 'menu',
        'aria-expanded': isOpen,
        disabled: disabled || triggerProps.disabled,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        {showChevron && (
          <ChevronDown
            className={cn(
              'ml-2 h-4 w-4 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        )}
      </Button>
    );
  };

  // Render menu
  const renderMenu = () => {
    if (!isOpen) return null;

    const menuStyles: React.CSSProperties = usePortal
      ? {
          position: 'fixed',
          top: placement.startsWith('top') ? 'auto' : menuPosition.y,
          bottom: placement.startsWith('top') ? window.innerHeight - menuPosition.y : 'auto',
          left: placement.endsWith('end') ? 'auto' : menuPosition.x,
          right: placement.endsWith('end') ? window.innerWidth - menuPosition.x : 'auto',
          zIndex: 50,
        }
      : {};

    const menu = (
      <div ref={menuRef} style={menuStyles}>
        <Menu
          items={wrappedItems}
          onClose={handleClose}
          className={cn(
            'animate-in fade-in-0 zoom-in-95',
            placement.startsWith('top') && 'origin-bottom',
            placement.startsWith('bottom') && 'origin-top',
            menuClassName
          )}
        />
      </div>
    );

    if (usePortal && typeof document !== 'undefined') {
      return createPortal(menu, document.body);
    }

    return menu;
  };

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <div ref={triggerRef}>{renderTrigger()}</div>
      {!usePortal && renderMenu()}
      {usePortal && renderMenu()}
    </div>
  );
});

export { Dropdown };
export default Dropdown;
