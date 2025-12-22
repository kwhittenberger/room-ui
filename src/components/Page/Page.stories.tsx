import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Download, Settings } from 'lucide-react';
import { Page } from './Page';
import { Button } from '../Button';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

const meta: Meta<typeof Page> = {
  title: 'Layout/Page',
  component: Page,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Page>;

const SampleContent = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <Card key={i}>
        <CardHeader>
          <CardTitle>Card {i + 1}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-room-text-secondary">
            Sample card content for the page component.
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Default page
export const Default: Story = {
  args: {
    title: 'Page Title',
    subtitle: 'A brief description of what this page does.',
    children: <SampleContent />,
  },
};

// With breadcrumbs
export const WithBreadcrumbs: Story = {
  args: {
    title: 'User Settings',
    subtitle: 'Manage your account settings and preferences.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'User' },
    ],
    children: <SampleContent />,
  },
};

// With actions
export const WithActions: Story = {
  args: {
    title: 'Products',
    subtitle: 'Manage your product catalog.',
    actions: (
      <>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </>
    ),
    children: <SampleContent />,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    title: 'Loading Data',
    subtitle: 'Please wait while we fetch your data.',
    loading: true,
    children: <SampleContent />,
  },
};

// Error state
export const WithError: Story = {
  args: {
    title: 'Products',
    subtitle: 'Manage your product catalog.',
    error: 'Failed to load products. Please try again later.',
    children: <SampleContent />,
  },
};

// Different max widths
export const MaxWidthSmall: Story = {
  args: {
    title: 'Narrow Content',
    maxWidth: 'sm',
    children: (
      <Card>
        <CardContent className="p-6">
          <p className="text-room-text-secondary">
            This content is constrained to a small max width.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const MaxWidthLarge: Story = {
  args: {
    title: 'Wide Content',
    maxWidth: 'lg',
    children: <SampleContent />,
  },
};

// Different padding sizes
export const PaddingSmall: Story = {
  args: {
    title: 'Compact Page',
    padding: 'sm',
    children: <SampleContent />,
  },
};

export const PaddingNone: Story = {
  args: {
    title: 'No Padding',
    padding: 'none',
    children: (
      <div className="bg-room-bg-elevated border-y border-room-border p-6">
        <p className="text-room-text-secondary">
          Content without page padding.
        </p>
      </div>
    ),
  },
};

// Full featured
export const FullFeatured: Story = {
  args: {
    title: 'Dashboard',
    subtitle: 'Overview of your application metrics.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dashboard' },
    ],
    actions: (
      <>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Report
        </Button>
      </>
    ),
    maxWidth: 'xl',
    children: <SampleContent />,
  },
};
