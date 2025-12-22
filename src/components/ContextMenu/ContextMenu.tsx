import { useState, useRef, useEffect, ReactNode, cloneElement, isValidElement } from 'react';
import { Menu, type MenuItem } from '../Menu';
import { cn } from '../../utils/cn';

export interface ContextMenuProps {
  /** Element that triggers the context menu on right-click */
  trigger: ReactNode;
  /** Menu items to display */
  items: MenuItem[];
  /** Disable context menu */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ContextMenu - Right-click menu with customizable items
 *
 * @example
 * ```tsx
 * <ContextMenu
 *   trigger={<div className="p-4">Right-click me</div>}
 *   items={[
 *     { label: 'Edit', icon: Edit, onClick: handleEdit },
 *     { label: 'Delete', icon: Trash, onClick: handleDelete, variant: 'danger' },
 *   ]}
 * />
 * ```
 */
export function ContextMenu({
  trigger,
  items,
  disabled = false,
  className = '',
}: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (disabled) return;

    e.preventDefault();
    e.stopPropagation();

    // Calculate position
    let x = e.clientX;
    let y = e.clientY;

    // Ensure menu stays within viewport (rough estimate)
    const menuWidth = 200;
    const menuHeight = items.length * 40 + 16;

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 8;
    }

    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 8;
    }

    setPosition({ x, y });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = () => {
      setIsOpen(false);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onContextMenu={handleContextMenu}
        className={cn(className)}
      >
        {isValidElement(trigger)
          ? cloneElement(trigger as React.ReactElement)
          : trigger}
      </div>

      {/* Context Menu Portal */}
      {isOpen && (
        <Menu
          items={items}
          position={position}
          onClose={handleClose}
        />
      )}
    </>
  );
}

export default ContextMenu;
