import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Dropdown } from '../Dropdown';
import type { MenuItem } from '../Menu';

export interface UserProfileButtonProps {
  userName: string;
  userEmail?: string;
  userTitle?: string;
  initials: string;
  isOnline?: boolean;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  dropdownItems?: MenuItem[];
  className?: string;
}

export function UserProfileButton({
  userName,
  userEmail,
  userTitle,
  initials,
  isOnline = true,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  dropdownItems,
  className = '',
}: UserProfileButtonProps) {
  // Build dropdown items
  const defaultItems: MenuItem[] = [];

  if (onProfileClick) {
    defaultItems.push({
      id: 'profile',
      label: 'View Profile',
      icon: <User className="h-4 w-4" />,
      onClick: onProfileClick,
    });
  }

  if (onSettingsClick) {
    defaultItems.push({
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      onClick: onSettingsClick,
    });
  }

  if (onLogoutClick) {
    if (defaultItems.length > 0) {
      defaultItems.push({
        id: 'divider-1',
        label: '',
        divider: true,
      });
    }
    defaultItems.push({
      id: 'logout',
      label: 'Sign Out',
      icon: <LogOut className="h-4 w-4" />,
      onClick: onLogoutClick,
      danger: true,
    });
  }

  // Use custom items if provided, otherwise use default items
  const items = dropdownItems || defaultItems;

  // Trigger button
  const trigger = (
    <button
      type="button"
      className={cn(
        'w-full max-w-[calc(100%-0.25rem)] flex items-center gap-2 p-2.5 rounded-lg',
        'bg-slate-800 border border-slate-700',
        'hover:bg-slate-700 transition-colors duration-200 group',
        className
      )}
      aria-haspopup="true"
    >
      {/* Avatar with Status */}
      <div className="relative flex-shrink-0">
        <div className="h-9 w-9 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-xs font-bold">{initials}</span>
        </div>
        {/* Online Status Indicator */}
        <div
          className={cn(
            'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-800',
            isOnline ? 'bg-emerald-500' : 'bg-slate-500'
          )}
        />
      </div>

      {/* User Info */}
      <div className="flex-1 text-left min-w-0 overflow-hidden">
        <p className="text-xs font-semibold text-slate-100 truncate leading-tight">{userName}</p>
        <p className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">{userTitle || userEmail || ''}</p>
      </div>

      {/* Chevron */}
      <ChevronDown className="h-3.5 w-3.5 text-slate-500 group-hover:text-slate-300 transition-all duration-200 flex-shrink-0" />
    </button>
  );

  return (
    <Dropdown
      trigger={trigger}
      items={items}
      placement="top-start"
    />
  );
}

export default UserProfileButton;
