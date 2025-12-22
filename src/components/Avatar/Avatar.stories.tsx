import type { Meta, StoryObj } from '@storybook/react';
import { User, Crown } from 'lucide-react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Basic examples
export const Default: Story = {
  args: {},
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
  },
};

export const WithName: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithInitials: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar name="John Doe" />
      <Avatar name="Alice" />
      <Avatar name="Bob Smith" />
      <Avatar name="Charlie Brown Jr" />
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" name="XS" />
      <Avatar size="sm" name="SM" />
      <Avatar size="md" name="MD" />
      <Avatar size="lg" name="LG" />
      <Avatar size="xl" name="XL" />
    </div>
  ),
};

export const SizesWithImages: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" src="https://i.pravatar.cc/150?img=1" />
      <Avatar size="sm" src="https://i.pravatar.cc/150?img=2" />
      <Avatar size="md" src="https://i.pravatar.cc/150?img=3" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?img=4" />
      <Avatar size="xl" src="https://i.pravatar.cc/150?img=5" />
    </div>
  ),
};

// Shapes
export const Shapes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar shape="circle" name="Circle" size="lg" />
      <Avatar shape="square" name="Square" size="lg" />
    </div>
  ),
};

// Status indicators
export const WithStatus: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar name="Online User" status="online" />
      <Avatar name="Offline User" status="offline" />
      <Avatar name="Busy User" status="busy" />
      <Avatar name="Away User" status="away" />
    </div>
  ),
};

export const StatusWithImages: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar src="https://i.pravatar.cc/150?img=10" status="online" size="lg" />
      <Avatar src="https://i.pravatar.cc/150?img=11" status="offline" size="lg" />
      <Avatar src="https://i.pravatar.cc/150?img=12" status="busy" size="lg" />
      <Avatar src="https://i.pravatar.cc/150?img=13" status="away" size="lg" />
    </div>
  ),
};

// Custom fallback
export const CustomFallback: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar fallback={<User className="w-5 h-5 text-room-text-muted" />} />
      <Avatar fallback={<Crown className="w-5 h-5 text-room-warning" />} />
      <Avatar fallback={<span className="text-lg">🦊</span>} />
    </div>
  ),
};

// Fallback on error
export const ImageError: Story = {
  args: {
    src: 'https://invalid-url.example/image.jpg',
    name: 'Fallback Name',
  },
};

// Clickable
export const Clickable: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar
        name="Click Me"
        onClick={() => alert('Avatar clicked!')}
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=20"
        onClick={() => alert('Avatar clicked!')}
      />
    </div>
  ),
};

// Color variation based on name
export const ColorVariations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 max-w-md">
      {[
        'Alice', 'Bob', 'Charlie', 'Diana', 'Edward',
        'Fiona', 'George', 'Hannah', 'Ivan', 'Julia',
        'Kevin', 'Laura', 'Michael', 'Nancy', 'Oliver',
      ].map((name) => (
        <Avatar key={name} name={name} />
      ))}
    </div>
  ),
};

// User list example
export const UserList: Story = {
  render: () => (
    <div className="space-y-3 w-72">
      {[
        { name: 'Sarah Connor', status: 'online' as const, role: 'Admin' },
        { name: 'John Smith', status: 'busy' as const, role: 'Developer' },
        { name: 'Emily Davis', status: 'away' as const, role: 'Designer' },
        { name: 'Michael Brown', status: 'offline' as const, role: 'Manager' },
      ].map((user) => (
        <div
          key={user.name}
          className="flex items-center gap-3 p-2 rounded-room hover:bg-room-bg-hover cursor-pointer"
        >
          <Avatar name={user.name} status={user.status} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-room-text-primary truncate">
              {user.name}
            </p>
            <p className="text-xs text-room-text-muted">{user.role}</p>
          </div>
        </div>
      ))}
    </div>
  ),
};

// Avatar group / stack
export const AvatarStack: Story = {
  render: () => (
    <div className="flex -space-x-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <Avatar
          key={i}
          src={`https://i.pravatar.cc/150?img=${i + 30}`}
          className="ring-2 ring-room-bg-base"
        />
      ))}
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-room-bg-surface ring-2 ring-room-bg-base text-sm font-medium text-room-text-secondary">
        +5
      </div>
    </div>
  ),
};
