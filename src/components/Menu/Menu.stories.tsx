import { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuDivider, MenuItem } from './index';
import { Stack } from '../Stack';
import { Button } from '../Button';
import { Text } from '../Text';
import {
  Copy,
  Scissors,
  Clipboard,
  Trash2,
  Edit,
  Share2,
  Download,
  Upload,
  FolderOpen,
  File,
  Settings,
  User,
  LogOut,
  HelpCircle,
  Mail,
  MessageSquare,
  Bell,
  Star,
  Archive,
  Eye,
  EyeOff,
  Lock,
  Unlock,
} from 'lucide-react';

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Menu component for displaying a list of actions or options.

## Features
- Keyboard navigation (arrow keys, Enter, Escape)
- Submenu support with hover reveal
- Keyboard shortcuts display
- Icons and danger state styling
- Dividers for grouping
- Disabled items

## Usage
\`\`\`tsx
import { Menu, MenuDivider } from 'room-ui';

const items = [
  { id: 'copy', label: 'Copy', shortcut: '⌘C', onClick: () => {} },
  { id: 'paste', label: 'Paste', shortcut: '⌘V', onClick: () => {} },
  MenuDivider(),
  { id: 'delete', label: 'Delete', danger: true, onClick: () => {} },
];

<Menu items={items} onClose={() => setOpen(false)} />
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

const basicItems: MenuItem[] = [
  { id: 'copy', label: 'Copy', icon: <Copy className="h-4 w-4" />, onClick: () => console.log('Copy') },
  { id: 'cut', label: 'Cut', icon: <Scissors className="h-4 w-4" />, onClick: () => console.log('Cut') },
  { id: 'paste', label: 'Paste', icon: <Clipboard className="h-4 w-4" />, onClick: () => console.log('Paste') },
];

/**
 * Basic menu with icons
 */
export const Basic: Story = {
  render: () => (
    <Menu items={basicItems} />
  ),
};

/**
 * Menu with keyboard shortcuts
 */
export const WithShortcuts: Story = {
  render: () => {
    const items: MenuItem[] = [
      { id: 'copy', label: 'Copy', icon: <Copy className="h-4 w-4" />, shortcut: '⌘C', onClick: () => {} },
      { id: 'cut', label: 'Cut', icon: <Scissors className="h-4 w-4" />, shortcut: '⌘X', onClick: () => {} },
      { id: 'paste', label: 'Paste', icon: <Clipboard className="h-4 w-4" />, shortcut: '⌘V', onClick: () => {} },
      MenuDivider(),
      { id: 'selectAll', label: 'Select All', shortcut: '⌘A', onClick: () => {} },
    ];

    return <Menu items={items} />;
  },
};

/**
 * Menu with dividers
 */
export const WithDividers: Story = {
  render: () => {
    const items: MenuItem[] = [
      { id: 'new', label: 'New File', icon: <File className="h-4 w-4" />, onClick: () => {} },
      { id: 'open', label: 'Open...', icon: <FolderOpen className="h-4 w-4" />, onClick: () => {} },
      MenuDivider(),
      { id: 'save', label: 'Save', shortcut: '⌘S', onClick: () => {} },
      { id: 'saveAs', label: 'Save As...', shortcut: '⇧⌘S', onClick: () => {} },
      MenuDivider(),
      { id: 'export', label: 'Export', icon: <Download className="h-4 w-4" />, onClick: () => {} },
      { id: 'import', label: 'Import', icon: <Upload className="h-4 w-4" />, onClick: () => {} },
    ];

    return <Menu items={items} />;
  },
};

/**
 * Menu with disabled and danger items
 */
export const WithStates: Story = {
  render: () => {
    const items: MenuItem[] = [
      { id: 'edit', label: 'Edit', icon: <Edit className="h-4 w-4" />, onClick: () => {} },
      { id: 'share', label: 'Share', icon: <Share2 className="h-4 w-4" />, onClick: () => {} },
      { id: 'locked', label: 'Locked Item', icon: <Lock className="h-4 w-4" />, disabled: true, onClick: () => {} },
      MenuDivider(),
      { id: 'archive', label: 'Archive', icon: <Archive className="h-4 w-4" />, onClick: () => {} },
      { id: 'delete', label: 'Delete', icon: <Trash2 className="h-4 w-4" />, danger: true, onClick: () => {} },
    ];

    return <Menu items={items} />;
  },
};

/**
 * Menu with submenus
 */
export const WithSubmenus: Story = {
  render: () => {
    const items: MenuItem[] = [
      { id: 'view', label: 'View', icon: <Eye className="h-4 w-4" />, onClick: () => {} },
      {
        id: 'share',
        label: 'Share',
        icon: <Share2 className="h-4 w-4" />,
        submenu: [
          { id: 'email', label: 'Email', icon: <Mail className="h-4 w-4" />, onClick: () => {} },
          { id: 'message', label: 'Message', icon: <MessageSquare className="h-4 w-4" />, onClick: () => {} },
          { id: 'copy-link', label: 'Copy Link', onClick: () => {} },
        ],
      },
      {
        id: 'more',
        label: 'More Actions',
        submenu: [
          { id: 'star', label: 'Add to Favorites', icon: <Star className="h-4 w-4" />, onClick: () => {} },
          { id: 'archive', label: 'Archive', icon: <Archive className="h-4 w-4" />, onClick: () => {} },
          { id: 'hide', label: 'Hide', icon: <EyeOff className="h-4 w-4" />, onClick: () => {} },
        ],
      },
      MenuDivider(),
      { id: 'delete', label: 'Delete', icon: <Trash2 className="h-4 w-4" />, danger: true, onClick: () => {} },
    ];

    return <Menu items={items} />;
  },
};

/**
 * Context menu triggered on right-click
 */
export const ContextMenu: Story = {
  render: () => {
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

    const items: MenuItem[] = [
      { id: 'copy', label: 'Copy', icon: <Copy className="h-4 w-4" />, shortcut: '⌘C', onClick: () => setMenuPosition(null) },
      { id: 'cut', label: 'Cut', icon: <Scissors className="h-4 w-4" />, shortcut: '⌘X', onClick: () => setMenuPosition(null) },
      { id: 'paste', label: 'Paste', icon: <Clipboard className="h-4 w-4" />, shortcut: '⌘V', onClick: () => setMenuPosition(null) },
      MenuDivider(),
      { id: 'delete', label: 'Delete', icon: <Trash2 className="h-4 w-4" />, danger: true, onClick: () => setMenuPosition(null) },
    ];

    return (
      <div
        className="w-full h-64 bg-room-bg-surface border border-room-border rounded-room flex items-center justify-center cursor-context-menu"
        onContextMenu={(e) => {
          e.preventDefault();
          setMenuPosition({ x: e.clientX, y: e.clientY });
        }}
      >
        <Text className="text-room-text-muted">Right-click anywhere in this area</Text>
        {menuPosition && (
          <Menu
            items={items}
            position={menuPosition}
            onClose={() => setMenuPosition(null)}
          />
        )}
      </div>
    );
  },
};

/**
 * User profile dropdown menu
 */
export const ProfileMenu: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const items: MenuItem[] = [
      { id: 'profile', label: 'My Profile', icon: <User className="h-4 w-4" />, onClick: () => setIsOpen(false) },
      { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" />, onClick: () => setIsOpen(false) },
      { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" />, onClick: () => setIsOpen(false) },
      MenuDivider(),
      { id: 'help', label: 'Help & Support', icon: <HelpCircle className="h-4 w-4" />, onClick: () => setIsOpen(false) },
      MenuDivider(),
      { id: 'logout', label: 'Sign Out', icon: <LogOut className="h-4 w-4" />, danger: true, onClick: () => setIsOpen(false) },
    ];

    return (
      <div className="relative inline-block">
        <Button
          ref={buttonRef}
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
        >
          <User className="h-4 w-4 mr-2" />
          John Doe
        </Button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 z-50">
            <Menu items={items} onClose={() => setIsOpen(false)} />
          </div>
        )}
      </div>
    );
  },
};

/**
 * Action menu with various option types
 */
export const ActionMenu: Story = {
  render: () => {
    const [visibility, setVisibility] = useState<'public' | 'private'>('public');

    const items: MenuItem[] = [
      { id: 'edit', label: 'Edit Document', icon: <Edit className="h-4 w-4" />, onClick: () => {} },
      { id: 'duplicate', label: 'Duplicate', icon: <Copy className="h-4 w-4" />, onClick: () => {} },
      MenuDivider(),
      {
        id: 'visibility',
        label: visibility === 'public' ? 'Make Private' : 'Make Public',
        icon: visibility === 'public' ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />,
        onClick: () => setVisibility(v => v === 'public' ? 'private' : 'public'),
      },
      {
        id: 'share',
        label: 'Share',
        icon: <Share2 className="h-4 w-4" />,
        disabled: visibility === 'private',
        submenu: [
          { id: 'email', label: 'Via Email', icon: <Mail className="h-4 w-4" />, onClick: () => {} },
          { id: 'link', label: 'Copy Link', onClick: () => {} },
        ],
      },
      MenuDivider(),
      { id: 'archive', label: 'Move to Archive', icon: <Archive className="h-4 w-4" />, onClick: () => {} },
      { id: 'delete', label: 'Delete Permanently', icon: <Trash2 className="h-4 w-4" />, danger: true, onClick: () => {} },
    ];

    return (
      <Stack gap="md">
        <Text size="sm" className="text-room-text-muted">
          Current visibility: <span className="text-room-text-primary font-medium">{visibility}</span>
        </Text>
        <Menu items={items} />
      </Stack>
    );
  },
};

/**
 * Anchored menu positions
 */
export const AnchorPositions: Story = {
  render: () => {
    const items: MenuItem[] = [
      { id: 'item1', label: 'Menu Item 1', onClick: () => {} },
      { id: 'item2', label: 'Menu Item 2', onClick: () => {} },
      { id: 'item3', label: 'Menu Item 3', onClick: () => {} },
    ];

    return (
      <div className="grid grid-cols-2 gap-8 p-8">
        <div className="relative h-48 border border-room-border rounded-room">
          <Text size="sm" className="absolute top-2 left-2 text-room-text-muted">top-left</Text>
          <Menu items={items} anchor="top-left" className="absolute" />
        </div>
        <div className="relative h-48 border border-room-border rounded-room">
          <Text size="sm" className="absolute top-2 right-2 text-room-text-muted">top-right</Text>
          <Menu items={items} anchor="top-right" className="absolute" />
        </div>
        <div className="relative h-48 border border-room-border rounded-room">
          <Text size="sm" className="absolute bottom-2 left-2 text-room-text-muted">bottom-left</Text>
          <Menu items={items} anchor="bottom-left" className="absolute" />
        </div>
        <div className="relative h-48 border border-room-border rounded-room">
          <Text size="sm" className="absolute bottom-2 right-2 text-room-text-muted">bottom-right</Text>
          <Menu items={items} anchor="bottom-right" className="absolute" />
        </div>
      </div>
    );
  },
};
