import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverPlacement } from './index';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Input } from '../Input';
import { MoreVertical, Settings, User, LogOut, Bell, ChevronDown } from 'lucide-react';

const meta: Meta<typeof Popover> = {
  title: 'Feedback/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Popovers display rich content in a floating container relative to a trigger element.

## Features
- Multiple placement options (12 positions)
- Click, hover, or focus trigger modes
- Optional arrow pointer
- Controlled or uncontrolled state
- Click outside and escape key to close
- Viewport collision detection

## Usage
\`\`\`tsx
import { Popover, Button, Stack, Text } from 'room-ui';

// Basic popover
<Popover
  trigger={<Button>Open Menu</Button>}
  placement="bottom-start"
>
  <Stack gap="sm">
    <Text>Popover content here</Text>
  </Stack>
</Popover>

// Controlled popover
const [open, setOpen] = useState(false);
<Popover
  open={open}
  onOpenChange={setOpen}
  trigger={<Button>Settings</Button>}
>
  {/* content */}
</Popover>

// Hover trigger
<Popover
  trigger={<Button>Hover me</Button>}
  triggerMode="hover"
  showDelay={200}
>
  {/* content */}
</Popover>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ],
    },
    triggerMode: {
      control: 'select',
      options: ['click', 'hover', 'focus'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

/**
 * Basic popover with click trigger
 */
export const Basic: Story = {
  render: () => (
    <Popover trigger={<Button>Click me</Button>}>
      <Stack gap="sm">
        <Text weight="medium">Popover Title</Text>
        <Text size="sm" className="text-room-text-secondary">
          This is the popover content. Click outside to close.
        </Text>
      </Stack>
    </Popover>
  ),
};

/**
 * Different placements
 */
export const Placements: Story = {
  render: () => {
    const [activePlacement, setActivePlacement] = useState<PopoverPlacement>('bottom');

    const placements: PopoverPlacement[] = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ];

    return (
      <Stack gap="lg" align="center">
        <Text size="sm" className="text-room-text-muted">
          Select a placement and click the button
        </Text>
        <div className="flex flex-wrap gap-2 max-w-md justify-center">
          {placements.map((p) => (
            <Button
              key={p}
              size="xs"
              variant={activePlacement === p ? 'primary' : 'outline'}
              onClick={() => setActivePlacement(p)}
            >
              {p}
            </Button>
          ))}
        </div>
        <div className="py-16">
          <Popover
            trigger={<Button>Open Popover</Button>}
            placement={activePlacement}
          >
            <Stack gap="sm">
              <Text weight="medium">Placement: {activePlacement}</Text>
              <Text size="sm" className="text-room-text-secondary">
                The popover adjusts if it would go off-screen.
              </Text>
            </Stack>
          </Popover>
        </div>
      </Stack>
    );
  },
};

/**
 * Trigger modes
 */
export const TriggerModes: Story = {
  render: () => (
    <Stack direction="horizontal" gap="md">
      <Popover trigger={<Button variant="outline">Click</Button>} triggerMode="click">
        <Text size="sm">Triggered by click</Text>
      </Popover>
      <Popover
        trigger={<Button variant="outline">Hover</Button>}
        triggerMode="hover"
        showDelay={200}
        hideDelay={200}
      >
        <Text size="sm">Triggered by hover</Text>
      </Popover>
      <Popover trigger={<Button variant="outline">Focus</Button>} triggerMode="focus">
        <Text size="sm">Triggered by focus (tab to element)</Text>
      </Popover>
    </Stack>
  ),
};

/**
 * Dropdown menu pattern
 */
export const DropdownMenu: Story = {
  render: () => (
    <Popover
      trigger={
        <IconButton icon={MoreVertical} variant="ghost" aria-label="More options" />
      }
      placement="bottom-end"
      showArrow={false}
    >
      <Stack gap="xs" className="-m-1">
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-room-text-primary hover:bg-room-bg-surface rounded-room-sm transition-colors w-full text-left">
          <User className="h-4 w-4" />
          Profile
        </button>
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-room-text-primary hover:bg-room-bg-surface rounded-room-sm transition-colors w-full text-left">
          <Settings className="h-4 w-4" />
          Settings
        </button>
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-room-text-primary hover:bg-room-bg-surface rounded-room-sm transition-colors w-full text-left">
          <Bell className="h-4 w-4" />
          Notifications
        </button>
        <div className="border-t border-room-border my-1" />
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-room-error hover:bg-room-error-muted/30 rounded-room-sm transition-colors w-full text-left">
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </Stack>
    </Popover>
  ),
};

/**
 * Controlled popover
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Stack gap="md" align="center">
        <Button variant="outline" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Open'} Popover Externally
        </Button>
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={<Button>Controlled Popover</Button>}
        >
          <Stack gap="sm">
            <Text weight="medium">Controlled State</Text>
            <Text size="sm" className="text-room-text-secondary">
              This popover is controlled by external state.
            </Text>
            <Button size="sm" onClick={() => setOpen(false)}>
              Close from inside
            </Button>
          </Stack>
        </Popover>
      </Stack>
    );
  },
};

/**
 * Without arrow
 */
export const WithoutArrow: Story = {
  render: () => (
    <Popover trigger={<Button>No Arrow</Button>} showArrow={false}>
      <Stack gap="sm">
        <Text weight="medium">Clean Look</Text>
        <Text size="sm" className="text-room-text-secondary">
          This popover has no arrow pointer.
        </Text>
      </Stack>
    </Popover>
  ),
};

/**
 * With form content
 */
export const WithForm: Story = {
  render: () => (
    <Popover
      trigger={
        <Button icon={ChevronDown} iconPosition="right">
          Quick Add
        </Button>
      }
      placement="bottom-start"
    >
      <Stack gap="md" className="w-64">
        <Text weight="medium">Add New Item</Text>
        <Input placeholder="Item name" />
        <Stack direction="horizontal" gap="sm" justify="end">
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">Add</Button>
        </Stack>
      </Stack>
    </Popover>
  ),
};

/**
 * User profile popover
 */
export const UserProfile: Story = {
  render: () => (
    <Popover
      trigger={
        <button className="flex items-center gap-2 p-2 rounded-room hover:bg-room-bg-surface transition-colors">
          <div className="w-8 h-8 rounded-full bg-room-accent flex items-center justify-center text-white text-sm font-medium">
            JD
          </div>
          <span className="text-sm text-room-text-primary">John Doe</span>
          <ChevronDown className="h-4 w-4 text-room-text-muted" />
        </button>
      }
      placement="bottom-end"
      showArrow={false}
    >
      <Stack gap="md" className="w-64">
        <div className="flex items-center gap-3 pb-3 border-b border-room-border">
          <div className="w-12 h-12 rounded-full bg-room-accent flex items-center justify-center text-white text-lg font-medium">
            JD
          </div>
          <div>
            <Text weight="medium">John Doe</Text>
            <Text size="sm" className="text-room-text-muted">
              john@example.com
            </Text>
          </div>
        </div>
        <Stack gap="xs" className="-mx-1">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-room-text-primary hover:bg-room-bg-surface rounded-room-sm transition-colors w-full text-left">
            <User className="h-4 w-4" />
            Your Profile
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-room-text-primary hover:bg-room-bg-surface rounded-room-sm transition-colors w-full text-left">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <div className="border-t border-room-border my-1" />
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-room-error hover:bg-room-error-muted/30 rounded-room-sm transition-colors w-full text-left">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </Stack>
      </Stack>
    </Popover>
  ),
};

/**
 * Disabled popover
 */
export const Disabled: Story = {
  render: () => (
    <Stack direction="horizontal" gap="md">
      <Popover trigger={<Button>Enabled</Button>}>
        <Text size="sm">This popover works normally.</Text>
      </Popover>
      <Popover trigger={<Button variant="outline">Disabled</Button>} disabled>
        <Text size="sm">This content won&apos;t show.</Text>
      </Popover>
    </Stack>
  ),
};
