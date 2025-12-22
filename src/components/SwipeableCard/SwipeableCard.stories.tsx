import type { Meta, StoryObj } from '@storybook/react';
import { Trash2, Archive, Star, Edit, Heart } from 'lucide-react';
import { SwipeableCard } from './SwipeableCard';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Avatar } from '../Avatar';
import type { SwipeAction } from '../SwipeActions';

const meta: Meta<typeof SwipeableCard> = {
  title: 'Mobile/SwipeableCard',
  component: SwipeableCard,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SwipeableCard>;

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

const favoriteAction: SwipeAction = {
  id: 'favorite',
  icon: Heart,
  label: 'Favorite',
  variant: 'danger',
  onClick: () => console.log('Favorite'),
};

const starAction: SwipeAction = {
  id: 'star',
  icon: Star,
  label: 'Star',
  variant: 'warning',
  onClick: () => console.log('Star'),
};

const editAction: SwipeAction = {
  id: 'edit',
  icon: Edit,
  label: 'Edit',
  variant: 'default',
  onClick: () => console.log('Edit'),
};

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="md">
        <Text color="muted">Swipe left to reveal actions.</Text>
        {['Project Alpha', 'Project Beta', 'Project Gamma'].map((project) => (
          <SwipeableCard
            key={project}
            rightActions={[editAction, deleteAction]}
          >
            <div className="p-4">
              <Text weight="medium">{project}</Text>
              <Text color="muted" size="sm">Last updated 2 hours ago</Text>
            </div>
          </SwipeableCard>
        ))}
      </Stack>
    </div>
  ),
};

export const LeftAndRightActions: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="md">
        <Text color="muted">
          Swipe left for actions, swipe right to favorite.
        </Text>
        {['Recipe 1', 'Recipe 2', 'Recipe 3'].map((recipe) => (
          <SwipeableCard
            key={recipe}
            leftActions={[favoriteAction]}
            rightActions={[archiveAction, deleteAction]}
          >
            <div className="p-4">
              <Text weight="medium">{recipe}</Text>
              <Text color="muted" size="sm">A delicious recipe description...</Text>
            </div>
          </SwipeableCard>
        ))}
      </Stack>
    </div>
  ),
};

export const ContactCards: Story = {
  render: () => {
    const contacts = [
      { name: 'Alice Johnson', role: 'Developer', email: 'alice@example.com' },
      { name: 'Bob Smith', role: 'Designer', email: 'bob@example.com' },
      { name: 'Carol Williams', role: 'Manager', email: 'carol@example.com' },
    ];

    return (
      <div className="min-h-screen bg-room-bg-base p-4">
        <Stack gap="md">
          <Text color="muted">Contact cards with swipe actions.</Text>
          {contacts.map((contact) => (
            <SwipeableCard
              key={contact.name}
              leftActions={[starAction]}
              rightActions={[editAction, deleteAction]}
            >
              <div className="flex items-center gap-4 p-4">
                <Avatar name={contact.name} size="lg" />
                <Stack gap="none">
                  <Text weight="medium">{contact.name}</Text>
                  <Text color="muted" size="sm">{contact.role}</Text>
                  <Text color="muted" size="sm">{contact.email}</Text>
                </Stack>
              </div>
            </SwipeableCard>
          ))}
        </Stack>
      </div>
    );
  },
};

export const RichContent: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="md">
        <SwipeableCard rightActions={[archiveAction, deleteAction]}>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <Text weight="semibold">Meeting Notes</Text>
              <Text color="muted" size="sm">2h ago</Text>
            </div>
            <Text color="muted" size="sm" className="mb-3">
              Discussed the roadmap for Q1 2025. Key points include feature
              prioritization, resource allocation, and timeline adjustments.
            </Text>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-room-accent/10 text-room-accent rounded text-xs">
                Meeting
              </span>
              <span className="px-2 py-1 bg-room-warning/10 text-room-warning rounded text-xs">
                Important
              </span>
            </div>
          </div>
        </SwipeableCard>
      </Stack>
    </div>
  ),
};
