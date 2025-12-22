import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './index';
import { MenuDivider, MenuItem } from '../Menu';
import { Stack } from '../Stack';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import {
  MoreVertical,
  MoreHorizontal,
  ChevronDown,
  Settings,
  User,
  LogOut,
  Edit,
  Trash2,
  Copy,
  Share2,
  Download,
  Archive,
  Star,
  Eye,
  Mail,
  Plus,
  Filter,
  SortAsc,
} from 'lucide-react';

const meta: Meta<typeof Dropdown> = {
  title: 'Navigation/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Dropdown component that shows a menu when triggered.

## Features
- Custom trigger elements
- Placement options
- Controlled and uncontrolled modes
- Portal rendering for proper z-index handling
- Keyboard accessible

## Usage
\`\`\`tsx
import { Dropdown, MenuDivider } from 'room-ui';

<Dropdown
  label="Actions"
  items={[
    { id: 'edit', label: 'Edit', onClick: () => {} },
    { id: 'delete', label: 'Delete', danger: true, onClick: () => {} },
  ]}
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const basicItems: MenuItem[] = [
  { id: 'edit', label: 'Edit', icon: <Edit className="h-4 w-4" />, onClick: () => console.log('Edit') },
  { id: 'duplicate', label: 'Duplicate', icon: <Copy className="h-4 w-4" />, onClick: () => console.log('Duplicate') },
  { id: 'share', label: 'Share', icon: <Share2 className="h-4 w-4" />, onClick: () => console.log('Share') },
  MenuDivider(),
  { id: 'delete', label: 'Delete', icon: <Trash2 className="h-4 w-4" />, danger: true, onClick: () => console.log('Delete') },
];

/**
 * Basic dropdown with default button trigger
 */
export const Basic: Story = {
  render: () => (
    <Dropdown label="Actions" items={basicItems} />
  ),
};

/**
 * Different button variants
 */
export const Variants: Story = {
  render: () => (
    <Stack direction="horizontal" gap="md">
      <Dropdown label="Primary" variant="primary" items={basicItems} />
      <Dropdown label="Secondary" variant="secondary" items={basicItems} />
      <Dropdown label="Ghost" variant="ghost" items={basicItems} />
      <Dropdown label="Outline" variant="outline" items={basicItems} />
    </Stack>
  ),
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="horizontal" gap="md" align="center">
      <Dropdown label="Small" size="sm" items={basicItems} />
      <Dropdown label="Medium" size="md" items={basicItems} />
      <Dropdown label="Large" size="lg" items={basicItems} />
    </Stack>
  ),
};

/**
 * With icon in trigger
 */
export const WithIcon: Story = {
  render: () => (
    <Stack direction="horizontal" gap="md">
      <Dropdown label="Settings" icon={<Settings className="h-4 w-4" />} items={basicItems} />
      <Dropdown label="Add New" icon={<Plus className="h-4 w-4" />} variant="primary" items={basicItems} />
    </Stack>
  ),
};

/**
 * Without chevron
 */
export const NoChevron: Story = {
  render: () => (
    <Dropdown label="Actions" showChevron={false} items={basicItems} />
  ),
};

/**
 * Custom trigger - IconButton
 */
export const IconButtonTrigger: Story = {
  render: () => (
    <Stack direction="horizontal" gap="md">
      <Dropdown
        trigger={<IconButton icon={MoreVertical} aria-label="More options" />}
        items={basicItems}
      />
      <Dropdown
        trigger={<IconButton icon={MoreHorizontal} aria-label="More options" />}
        items={basicItems}
      />
    </Stack>
  ),
};

/**
 * Custom trigger - Custom button
 */
export const CustomTrigger: Story = {
  render: () => (
    <Dropdown
      trigger={
        <button className="flex items-center gap-2 px-4 py-2 bg-room-accent text-white rounded-room hover:bg-room-accent-hover">
          <User className="h-4 w-4" />
          John Doe
          <ChevronDown className="h-4 w-4" />
        </button>
      }
      items={[
        { id: 'profile', label: 'My Profile', icon: <User className="h-4 w-4" />, onClick: () => {} },
        { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" />, onClick: () => {} },
        MenuDivider(),
        { id: 'logout', label: 'Sign Out', icon: <LogOut className="h-4 w-4" />, danger: true, onClick: () => {} },
      ]}
    />
  ),
};

/**
 * Placement options
 */
export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-16">
      <div className="flex justify-start">
        <Dropdown label="Bottom Start" placement="bottom-start" items={basicItems} />
      </div>
      <div className="flex justify-end">
        <Dropdown label="Bottom End" placement="bottom-end" items={basicItems} />
      </div>
      <div className="flex justify-start">
        <Dropdown label="Top Start" placement="top-start" items={basicItems} />
      </div>
      <div className="flex justify-end">
        <Dropdown label="Top End" placement="top-end" items={basicItems} />
      </div>
    </div>
  ),
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <Stack direction="horizontal" gap="md">
      <Dropdown label="Enabled" items={basicItems} />
      <Dropdown label="Disabled" items={basicItems} disabled />
    </Stack>
  ),
};

/**
 * Controlled dropdown
 */
export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Stack gap="md">
        <Stack direction="horizontal" gap="sm">
          <Button size="sm" variant="ghost" onClick={() => setIsOpen(true)}>
            Open Dropdown
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
            Close Dropdown
          </Button>
        </Stack>
        <Text size="sm" className="text-room-text-muted">
          Dropdown is: {isOpen ? 'Open' : 'Closed'}
        </Text>
        <Dropdown
          label="Controlled"
          items={basicItems}
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      </Stack>
    );
  },
};

/**
 * With callbacks
 */
export const WithCallbacks: Story = {
  render: () => {
    const [log, setLog] = useState<string[]>([]);

    const addLog = (message: string) => {
      setLog((prev) => [...prev.slice(-4), message]);
    };

    const items: MenuItem[] = [
      { id: 'action1', label: 'Action 1', onClick: () => addLog('Action 1 clicked') },
      { id: 'action2', label: 'Action 2', onClick: () => addLog('Action 2 clicked') },
      { id: 'action3', label: 'Action 3', onClick: () => addLog('Action 3 clicked') },
    ];

    return (
      <Stack gap="md">
        <Dropdown
          label="Click actions"
          items={items}
          onOpen={() => addLog('Dropdown opened')}
          onClose={() => addLog('Dropdown closed')}
        />
        <div className="p-3 bg-room-bg-surface border border-room-border rounded-room min-h-[120px]">
          <Text size="sm" weight="medium" className="mb-2">Event Log:</Text>
          {log.length === 0 ? (
            <Text size="sm" className="text-room-text-muted">No events yet</Text>
          ) : (
            log.map((entry, i) => (
              <Text key={i} size="sm" className="text-room-text-secondary">
                {entry}
              </Text>
            ))
          )}
        </div>
      </Stack>
    );
  },
};

/**
 * Action row pattern
 */
export const ActionRow: Story = {
  render: () => (
    <div className="flex items-center justify-between w-full max-w-md p-4 bg-room-bg-surface border border-room-border rounded-room">
      <Stack direction="horizontal" gap="sm" align="center">
        <div className="w-10 h-10 bg-room-accent/20 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-room-accent" />
        </div>
        <div>
          <Text weight="medium">John Doe</Text>
          <Text size="sm" className="text-room-text-muted">john@example.com</Text>
        </div>
      </Stack>
      <Dropdown
        trigger={<IconButton icon={MoreVertical} variant="ghost" aria-label="User actions" />}
        placement="bottom-end"
        items={[
          { id: 'view', label: 'View Profile', icon: <Eye className="h-4 w-4" />, onClick: () => {} },
          { id: 'email', label: 'Send Email', icon: <Mail className="h-4 w-4" />, onClick: () => {} },
          MenuDivider(),
          { id: 'edit', label: 'Edit', icon: <Edit className="h-4 w-4" />, onClick: () => {} },
          { id: 'delete', label: 'Remove', icon: <Trash2 className="h-4 w-4" />, danger: true, onClick: () => {} },
        ]}
      />
    </div>
  ),
};

/**
 * Filter dropdown pattern
 */
export const FilterDropdown: Story = {
  render: () => {
    const [filters, setFilters] = useState<string[]>([]);

    const toggleFilter = (filter: string) => {
      setFilters((prev) =>
        prev.includes(filter)
          ? prev.filter((f) => f !== filter)
          : [...prev, filter]
      );
    };

    const filterItems: MenuItem[] = [
      { id: 'active', label: filters.includes('active') ? '✓ Active' : 'Active', onClick: () => toggleFilter('active') },
      { id: 'pending', label: filters.includes('pending') ? '✓ Pending' : 'Pending', onClick: () => toggleFilter('pending') },
      { id: 'completed', label: filters.includes('completed') ? '✓ Completed' : 'Completed', onClick: () => toggleFilter('completed') },
      MenuDivider(),
      { id: 'clear', label: 'Clear Filters', onClick: () => setFilters([]) },
    ];

    return (
      <Stack gap="md">
        <Dropdown
          label={filters.length > 0 ? `Filters (${filters.length})` : 'Filters'}
          icon={<Filter className="h-4 w-4" />}
          variant={filters.length > 0 ? 'primary' : 'secondary'}
          items={filterItems}
        />
        <Text size="sm" className="text-room-text-muted">
          Active filters: {filters.length > 0 ? filters.join(', ') : 'None'}
        </Text>
      </Stack>
    );
  },
};

/**
 * Sort dropdown pattern
 */
export const SortDropdown: Story = {
  render: () => {
    const [sortBy, setSortBy] = useState('name');

    const sortOptions: MenuItem[] = [
      { id: 'name', label: sortBy === 'name' ? '✓ Name' : 'Name', onClick: () => setSortBy('name') },
      { id: 'date', label: sortBy === 'date' ? '✓ Date' : 'Date', onClick: () => setSortBy('date') },
      { id: 'size', label: sortBy === 'size' ? '✓ Size' : 'Size', onClick: () => setSortBy('size') },
      { id: 'type', label: sortBy === 'type' ? '✓ Type' : 'Type', onClick: () => setSortBy('type') },
    ];

    return (
      <Stack gap="md">
        <Dropdown
          label={`Sort: ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}`}
          icon={<SortAsc className="h-4 w-4" />}
          variant="ghost"
          items={sortOptions}
        />
      </Stack>
    );
  },
};

/**
 * Bulk actions pattern
 */
export const BulkActions: Story = {
  render: () => {
    const [selectedCount] = useState(5);

    const bulkItems: MenuItem[] = [
      { id: 'archive', label: 'Archive Selected', icon: <Archive className="h-4 w-4" />, onClick: () => {} },
      { id: 'star', label: 'Add to Favorites', icon: <Star className="h-4 w-4" />, onClick: () => {} },
      { id: 'download', label: 'Download', icon: <Download className="h-4 w-4" />, onClick: () => {} },
      { id: 'share', label: 'Share', icon: <Share2 className="h-4 w-4" />, onClick: () => {} },
      MenuDivider(),
      { id: 'delete', label: 'Delete Selected', icon: <Trash2 className="h-4 w-4" />, danger: true, onClick: () => {} },
    ];

    return (
      <div className="p-4 bg-room-bg-elevated border border-room-border rounded-room">
        <Stack direction="horizontal" gap="md" align="center">
          <Text size="sm" className="text-room-text-secondary">
            {selectedCount} items selected
          </Text>
          <Dropdown
            label="Actions"
            variant="primary"
            size="sm"
            items={bulkItems}
          />
        </Stack>
      </div>
    );
  },
};
