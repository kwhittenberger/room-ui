import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Download, Settings, Trash2 } from 'lucide-react';
import { PageHeader } from './PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

// Default
export const Default: Story = {
  args: {
    title: 'Page Title',
  },
};

// With subtitle
export const WithSubtitle: Story = {
  args: {
    title: 'User Management',
    subtitle: 'Manage users, roles, and permissions.',
  },
};

// With breadcrumbs
export const WithBreadcrumbs: Story = {
  args: {
    title: 'Edit User',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Users', href: '/users' },
      { label: 'John Doe' },
    ],
  },
};

// With back button
export const WithBackButton: Story = {
  args: {
    title: 'User Details',
    subtitle: 'View and edit user information.',
    onBack: () => alert('Back button clicked'),
  },
};

// With actions
export const WithActions: Story = {
  args: {
    title: 'Products',
    subtitle: 'Manage your product catalog.',
    actions: [
      {
        id: 'export',
        label: 'Export',
        icon: <Download className="h-4 w-4" />,
        onClick: () => alert('Export clicked'),
        variant: 'secondary',
      },
      {
        id: 'add',
        label: 'Add Product',
        icon: <Plus className="h-4 w-4" />,
        onClick: () => alert('Add clicked'),
        variant: 'primary',
      },
    ],
  },
};

// With danger action
export const WithDangerAction: Story = {
  args: {
    title: 'Delete User',
    subtitle: 'This action cannot be undone.',
    onBack: () => alert('Back'),
    actions: [
      {
        id: 'cancel',
        label: 'Cancel',
        onClick: () => alert('Cancel'),
        variant: 'secondary',
      },
      {
        id: 'delete',
        label: 'Delete User',
        icon: <Trash2 className="h-4 w-4" />,
        onClick: () => alert('Delete'),
        variant: 'danger',
      },
    ],
  },
};

// Full featured
export const FullFeatured: Story = {
  args: {
    title: 'Order #12345',
    subtitle: 'Created on December 20, 2024',
    breadcrumbs: [
      { label: 'Dashboard', href: '/' },
      { label: 'Orders', href: '/orders' },
      { label: '#12345' },
    ],
    onBack: () => alert('Back'),
    actions: [
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings className="h-4 w-4" />,
        onClick: () => alert('Settings'),
        variant: 'ghost',
      },
      {
        id: 'export',
        label: 'Export',
        icon: <Download className="h-4 w-4" />,
        onClick: () => alert('Export'),
        variant: 'secondary',
      },
    ],
  },
};
