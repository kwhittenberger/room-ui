import type { Meta, StoryObj } from '@storybook/react';
import { FileX, Search, Users, FolderOpen, ShoppingCart, Bell, Mail } from 'lucide-react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Data Display/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// Basic examples
export const Default: Story = {
  args: {
    title: 'No data found',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you\'re looking for.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No projects yet',
    description: 'Get started by creating your first project.',
    action: {
      label: 'Create Project',
      onClick: () => alert('Create project clicked'),
    },
  },
};

export const WithBothActions: Story = {
  args: {
    title: 'No documents',
    description: 'Start by uploading a document or creating a new one.',
    action: {
      label: 'Upload Document',
      onClick: () => alert('Upload clicked'),
    },
    secondaryAction: {
      label: 'Create New',
      onClick: () => alert('Create clicked'),
    },
  },
};

// Custom icons
export const CustomIcon: Story = {
  args: {
    icon: <Search className="h-12 w-12 text-room-text-muted" />,
    title: 'No search results',
    description: 'We couldn\'t find anything matching your search.',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="border border-room-border rounded-room">
        <EmptyState
          size="sm"
          title="Small size"
          description="Compact empty state"
        />
      </div>
      <div className="border border-room-border rounded-room">
        <EmptyState
          size="md"
          title="Medium size"
          description="Default empty state size"
        />
      </div>
      <div className="border border-room-border rounded-room">
        <EmptyState
          size="lg"
          title="Large size"
          description="Full page empty state"
        />
      </div>
    </div>
  ),
};

// Common use cases
export const NoFiles: Story = {
  args: {
    icon: <FolderOpen className="h-12 w-12 text-room-text-muted" />,
    title: 'No files uploaded',
    description: 'Upload your first file to get started.',
    action: {
      label: 'Upload File',
      onClick: () => {},
    },
  },
};

export const NoTeamMembers: Story = {
  args: {
    icon: <Users className="h-12 w-12 text-room-text-muted" />,
    title: 'No team members',
    description: 'Invite team members to collaborate on this project.',
    action: {
      label: 'Invite Members',
      onClick: () => {},
    },
    secondaryAction: {
      label: 'Import from CSV',
      onClick: () => {},
    },
  },
};

export const EmptyCart: Story = {
  args: {
    icon: <ShoppingCart className="h-12 w-12 text-room-text-muted" />,
    title: 'Your cart is empty',
    description: 'Add items to your cart to continue shopping.',
    action: {
      label: 'Continue Shopping',
      onClick: () => {},
    },
  },
};

export const NoNotifications: Story = {
  args: {
    icon: <Bell className="h-12 w-12 text-room-text-muted" />,
    title: 'All caught up!',
    description: 'You have no new notifications.',
  },
};

export const NoMessages: Story = {
  args: {
    icon: <Mail className="h-12 w-12 text-room-text-muted" />,
    title: 'No messages',
    description: 'Your inbox is empty. Start a conversation!',
    action: {
      label: 'Compose Message',
      onClick: () => {},
    },
  },
};

export const ErrorState: Story = {
  args: {
    icon: <FileX className="h-12 w-12 text-room-error" />,
    title: 'Failed to load data',
    description: 'An error occurred while loading the data. Please try again.',
    action: {
      label: 'Retry',
      onClick: () => {},
    },
    secondaryAction: {
      label: 'Go Back',
      onClick: () => {},
    },
  },
};

// In context example
export const InCard: Story = {
  render: () => (
    <div className="w-96 bg-room-bg-elevated rounded-room border border-room-border">
      <div className="p-4 border-b border-room-border">
        <h2 className="text-lg font-semibold text-room-text-primary">Recent Activity</h2>
      </div>
      <EmptyState
        size="sm"
        title="No recent activity"
        description="Your recent actions will appear here."
      />
    </div>
  ),
};

export const InTable: Story = {
  render: () => (
    <div className="w-[600px] bg-room-bg-elevated rounded-room border border-room-border overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-room-border bg-room-bg-surface">
            <th className="px-4 py-3 text-left text-sm font-medium text-room-text-secondary">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-room-text-secondary">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-room-text-secondary">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}>
              <EmptyState
                size="sm"
                icon={<Search className="h-8 w-8 text-room-text-muted" />}
                title="No results found"
                description="Try different search terms"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
