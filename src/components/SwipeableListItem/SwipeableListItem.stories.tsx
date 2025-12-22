import type { Meta, StoryObj } from '@storybook/react';
import { Trash2, Archive, Star, Share, Bell, BellOff } from 'lucide-react';
import { SwipeableListItem } from './SwipeableListItem';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Avatar } from '../Avatar';
import type { SwipeAction } from '../SwipeActions';

const meta: Meta<typeof SwipeableListItem> = {
  title: 'Mobile/SwipeableListItem',
  component: SwipeableListItem,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SwipeableListItem>;

const deleteAction: SwipeAction = {
  id: 'delete',
  icon: Trash2,
  label: 'Delete',
  variant: 'danger',
  onClick: () => console.log('Delete'),
};

const archiveAction: SwipeAction = {
  id: 'archive',
  icon: Archive,
  label: 'Archive',
  variant: 'default',
  onClick: () => console.log('Archive'),
};

const starAction: SwipeAction = {
  id: 'star',
  icon: Star,
  label: 'Star',
  variant: 'warning',
  onClick: () => console.log('Star'),
};

const shareAction: SwipeAction = {
  id: 'share',
  icon: Share,
  label: 'Share',
  variant: 'default',
  onClick: () => console.log('Share'),
};

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base">
      <Stack gap="none">
        {['Alice Johnson', 'Bob Smith', 'Carol Williams'].map((name) => (
          <SwipeableListItem
            key={name}
            rightActions={[archiveAction, deleteAction]}
          >
            <div className="flex items-center gap-3 p-4 border-b border-room-border">
              <Avatar name={name} size="md" />
              <Stack gap="none">
                <Text weight="medium">{name}</Text>
                <Text color="muted" size="sm">Last message preview...</Text>
              </Stack>
            </div>
          </SwipeableListItem>
        ))}
      </Stack>
    </div>
  ),
};

export const LeftAndRightActions: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Text color="muted" className="mb-4">
        Swipe left for delete/archive, swipe right for star/share.
      </Text>
      <Stack gap="none">
        {['Email 1', 'Email 2', 'Email 3'].map((subject) => (
          <SwipeableListItem
            key={subject}
            leftActions={[starAction, shareAction]}
            rightActions={[archiveAction, deleteAction]}
          >
            <div className="p-4 border-b border-room-border">
              <Text weight="medium">{subject}</Text>
              <Text color="muted" size="sm">This is the email preview text...</Text>
            </div>
          </SwipeableListItem>
        ))}
      </Stack>
    </div>
  ),
};

export const SingleAction: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Text color="muted" className="mb-4">
        Swipe left to delete.
      </Text>
      <Stack gap="none">
        {['Task 1', 'Task 2', 'Task 3'].map((task) => (
          <SwipeableListItem
            key={task}
            rightActions={[deleteAction]}
          >
            <div className="p-4 border-b border-room-border">
              <Text>{task}</Text>
            </div>
          </SwipeableListItem>
        ))}
      </Stack>
    </div>
  ),
};

export const NotificationsList: Story = {
  render: () => {
    const muteAction: SwipeAction = {
      id: 'mute',
      icon: BellOff,
      label: 'Mute',
      variant: 'default',
      onClick: () => console.log('Mute'),
    };

    const notifications = [
      { id: 1, title: 'New message', desc: 'You have a new message from Alice' },
      { id: 2, title: 'Update available', desc: 'Version 2.0 is now available' },
      { id: 3, title: 'Reminder', desc: 'Meeting in 30 minutes' },
    ];

    return (
      <div className="min-h-screen bg-room-bg-base">
        <Stack gap="none">
          {notifications.map((notif) => (
            <SwipeableListItem
              key={notif.id}
              leftActions={[muteAction]}
              rightActions={[deleteAction]}
            >
              <div className="flex items-start gap-3 p-4 border-b border-room-border">
                <div className="p-2 bg-room-accent/10 rounded-full">
                  <Bell className="h-5 w-5 text-room-accent" />
                </div>
                <Stack gap="none">
                  <Text weight="medium">{notif.title}</Text>
                  <Text color="muted" size="sm">{notif.desc}</Text>
                </Stack>
              </div>
            </SwipeableListItem>
          ))}
        </Stack>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Text color="muted" className="mb-4">
        This item cannot be swiped.
      </Text>
      <SwipeableListItem
        rightActions={[deleteAction]}
        disabled
      >
        <div className="p-4 border border-room-border rounded-room">
          <Text>This item is disabled and cannot be swiped.</Text>
        </div>
      </SwipeableListItem>
    </div>
  ),
};
