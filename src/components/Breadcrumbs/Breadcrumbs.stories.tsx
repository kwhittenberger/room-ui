import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs, BreadcrumbItem } from './index';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Folder, FileText, Settings, User } from 'lucide-react';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Breadcrumbs navigation component for showing the current location in a hierarchy.

## Features
- Home icon link
- Custom separators
- Icon support for items
- Collapsible with maxItems
- Custom link component support (React Router, Next.js, etc.)

## Usage
\`\`\`tsx
import { Breadcrumbs } from 'room-ui';

<Breadcrumbs items={[
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Laptop' }
]} />
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

/**
 * Basic breadcrumbs with home icon
 */
export const Basic: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Laptop' },
      ]}
    />
  ),
};

/**
 * Without home icon
 */
export const WithoutHome: Story = {
  render: () => (
    <Breadcrumbs
      showHome={false}
      items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Settings', href: '/dashboard/settings' },
        { label: 'Profile' },
      ]}
    />
  ),
};

/**
 * With icons on items
 */
export const WithIcons: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Documents', href: '/docs', icon: <Folder className="h-4 w-4" /> },
        { label: 'Projects', href: '/docs/projects', icon: <Folder className="h-4 w-4" /> },
        { label: 'report.pdf', icon: <FileText className="h-4 w-4" /> },
      ]}
    />
  ),
};

/**
 * With custom separator
 */
export const CustomSeparator: Story = {
  render: () => (
    <Stack gap="md">
      <div>
        <Text size="sm" className="mb-2 text-room-text-muted">Slash separator</Text>
        <Breadcrumbs
          separator={<span className="text-room-text-muted">/</span>}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Item' },
          ]}
        />
      </div>
      <div>
        <Text size="sm" className="mb-2 text-room-text-muted">Arrow separator</Text>
        <Breadcrumbs
          separator={<span className="text-room-text-muted">→</span>}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Item' },
          ]}
        />
      </div>
      <div>
        <Text size="sm" className="mb-2 text-room-text-muted">Dot separator</Text>
        <Breadcrumbs
          separator={<span className="text-room-text-muted">•</span>}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Item' },
          ]}
        />
      </div>
    </Stack>
  ),
};

/**
 * Collapsed breadcrumbs for long paths
 */
export const Collapsed: Story = {
  render: () => {
    const longPath: BreadcrumbItem[] = [
      { label: 'Documents', href: '/documents' },
      { label: 'Work', href: '/documents/work' },
      { label: 'Projects', href: '/documents/work/projects' },
      { label: '2024', href: '/documents/work/projects/2024' },
      { label: 'Q4', href: '/documents/work/projects/2024/q4' },
      { label: 'Reports', href: '/documents/work/projects/2024/q4/reports' },
      { label: 'Final Report.pdf' },
    ];

    return (
      <Stack gap="md">
        <div>
          <Text size="sm" className="mb-2 text-room-text-muted">Full path (7 items)</Text>
          <Breadcrumbs items={longPath} />
        </div>
        <div>
          <Text size="sm" className="mb-2 text-room-text-muted">Collapsed to 4 items</Text>
          <Breadcrumbs items={longPath} maxItems={4} />
        </div>
        <div>
          <Text size="sm" className="mb-2 text-room-text-muted">Collapsed to 3 items</Text>
          <Breadcrumbs items={longPath} maxItems={3} />
        </div>
      </Stack>
    );
  },
};

/**
 * With onClick handlers
 */
export const WithOnClick: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        {
          label: 'Dashboard',
          onClick: () => console.log('Dashboard clicked'),
        },
        {
          label: 'Settings',
          href: '/settings',
          onClick: () => console.log('Settings clicked'),
        },
        { label: 'Security' },
      ]}
    />
  ),
};

/**
 * Settings page example
 */
export const SettingsExample: Story = {
  render: () => (
    <div className="p-4 bg-room-bg-surface rounded-room">
      <Breadcrumbs
        items={[
          { label: 'Settings', href: '/settings', icon: <Settings className="h-4 w-4" /> },
          { label: 'Account', href: '/settings/account', icon: <User className="h-4 w-4" /> },
          { label: 'Security' },
        ]}
      />
      <div className="mt-4">
        <Text weight="semibold" size="xl">Security Settings</Text>
        <Text className="mt-2 text-room-text-secondary">
          Manage your account security preferences.
        </Text>
      </div>
    </div>
  ),
};

/**
 * File browser example
 */
export const FileBrowserExample: Story = {
  render: () => (
    <div className="p-4 bg-room-bg-surface rounded-room">
      <Breadcrumbs
        homeHref="/files"
        homeLabel="My Files"
        items={[
          { label: 'Documents', href: '/files/documents', icon: <Folder className="h-4 w-4" /> },
          { label: 'Work', href: '/files/documents/work', icon: <Folder className="h-4 w-4" /> },
          { label: 'Presentations', href: '/files/documents/work/presentations', icon: <Folder className="h-4 w-4" /> },
          { label: 'Q4 Review.pptx', icon: <FileText className="h-4 w-4" /> },
        ]}
      />
    </div>
  ),
};

/**
 * Non-interactive current page (no links)
 */
export const StaticPath: Story = {
  render: () => (
    <Breadcrumbs
      showHome={false}
      items={[
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' },
        { label: 'Complete' },
      ]}
    />
  ),
};
