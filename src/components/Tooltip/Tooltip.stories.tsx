import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './index';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Info, Settings, HelpCircle, Bell, User, Trash2 } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Tooltips provide brief, contextual information on hover.

## Features
- Four positioning options: top, bottom, left, right
- Configurable delay before showing
- Can be disabled
- Accessible with keyboard focus
- Smooth fade-in animation

## Usage
\`\`\`tsx
import { Tooltip, Button } from 'room-ui';

<Tooltip content="Save your changes">
  <Button>Save</Button>
</Tooltip>

// With position
<Tooltip content="Delete item" position="bottom">
  <IconButton icon={Trash2} />
</Tooltip>

// With custom delay
<Tooltip content="Help information" delay={500}>
  <HelpCircle />
</Tooltip>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * Basic tooltip on a button
 */
export const Basic: Story = {
  render: () => (
    <Tooltip content="Click to save your changes">
      <Button>Save</Button>
    </Tooltip>
  ),
};

/**
 * All position variants
 */
export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-16">
      <div />
      <div className="flex justify-center">
        <Tooltip content="I'm on top!" position="top">
          <Button variant="outline">Top</Button>
        </Tooltip>
      </div>
      <div />

      <div className="flex justify-end">
        <Tooltip content="I'm on the left!" position="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
      </div>
      <div />
      <div className="flex justify-start">
        <Tooltip content="I'm on the right!" position="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
      </div>

      <div />
      <div className="flex justify-center">
        <Tooltip content="I'm on bottom!" position="bottom">
          <Button variant="outline">Bottom</Button>
        </Tooltip>
      </div>
      <div />
    </div>
  ),
};

/**
 * On icon buttons
 */
export const OnIconButtons: Story = {
  render: () => (
    <Stack direction="horizontal" gap="sm">
      <Tooltip content="Settings">
        <IconButton icon={Settings} variant="ghost" />
      </Tooltip>
      <Tooltip content="Notifications">
        <IconButton icon={Bell} variant="ghost" />
      </Tooltip>
      <Tooltip content="User profile">
        <IconButton icon={User} variant="ghost" />
      </Tooltip>
      <Tooltip content="Help & support">
        <IconButton icon={HelpCircle} variant="ghost" />
      </Tooltip>
      <Tooltip content="Delete item" position="bottom">
        <IconButton icon={Trash2} variant="ghost" />
      </Tooltip>
    </Stack>
  ),
};

/**
 * With different delays
 */
export const Delays: Story = {
  render: () => (
    <Stack direction="horizontal" gap="md">
      <Tooltip content="Instant (0ms)" delay={0}>
        <Button variant="outline" size="sm">
          No Delay
        </Button>
      </Tooltip>
      <Tooltip content="Fast (100ms)" delay={100}>
        <Button variant="outline" size="sm">
          100ms
        </Button>
      </Tooltip>
      <Tooltip content="Default (200ms)" delay={200}>
        <Button variant="outline" size="sm">
          200ms
        </Button>
      </Tooltip>
      <Tooltip content="Slow (500ms)" delay={500}>
        <Button variant="outline" size="sm">
          500ms
        </Button>
      </Tooltip>
    </Stack>
  ),
};

/**
 * Rich content in tooltips
 */
export const RichContent: Story = {
  render: () => (
    <Stack direction="horizontal" gap="md">
      <Tooltip
        content={
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span>Tooltip with icon</span>
          </div>
        }
      >
        <Button variant="outline">With Icon</Button>
      </Tooltip>
      <Tooltip
        content={
          <div className="text-center">
            <div className="font-medium">Title</div>
            <div className="text-room-text-muted">Description text</div>
          </div>
        }
      >
        <Button variant="outline">Multi-line</Button>
      </Tooltip>
    </Stack>
  ),
};

/**
 * On inline elements
 */
export const OnInlineElements: Story = {
  render: () => (
    <Text>
      Hover over the{' '}
      <Tooltip content="This is a tooltip">
        <span className="text-room-accent cursor-help underline decoration-dotted">
          highlighted text
        </span>
      </Tooltip>{' '}
      to see the tooltip. You can also use it on{' '}
      <Tooltip content="This is an icon tooltip">
        <span className="inline-flex items-center cursor-help">
          <Info className="h-4 w-4 text-room-accent" />
        </span>
      </Tooltip>{' '}
      icons inline with text.
    </Text>
  ),
};

/**
 * Disabled tooltip
 */
export const Disabled: Story = {
  render: () => (
    <Stack direction="horizontal" gap="md">
      <Tooltip content="This tooltip is enabled">
        <Button variant="outline">Enabled</Button>
      </Tooltip>
      <Tooltip content="This tooltip won't show" disabled>
        <Button variant="outline">Disabled Tooltip</Button>
      </Tooltip>
    </Stack>
  ),
};

/**
 * Toolbar example
 */
export const ToolbarExample: Story = {
  render: () => (
    <div className="inline-flex items-center gap-1 p-2 bg-room-bg-surface rounded-room">
      <Tooltip content="Bold (Ctrl+B)">
        <button className="h-8 w-8 flex items-center justify-center text-room-text-secondary hover:bg-room-bg-hover rounded-room-sm transition-colors">
          <span className="font-bold">B</span>
        </button>
      </Tooltip>
      <Tooltip content="Italic (Ctrl+I)">
        <button className="h-8 w-8 flex items-center justify-center text-room-text-secondary hover:bg-room-bg-hover rounded-room-sm transition-colors">
          <span className="italic">I</span>
        </button>
      </Tooltip>
      <Tooltip content="Underline (Ctrl+U)">
        <button className="h-8 w-8 flex items-center justify-center text-room-text-secondary hover:bg-room-bg-hover rounded-room-sm transition-colors">
          <span className="underline">U</span>
        </button>
      </Tooltip>
      <div className="w-px h-6 bg-room-border mx-1" />
      <Tooltip content="Settings">
        <IconButton icon={Settings} variant="ghost" size="sm" />
      </Tooltip>
      <Tooltip content="Help">
        <IconButton icon={HelpCircle} variant="ghost" size="sm" />
      </Tooltip>
    </div>
  ),
};
