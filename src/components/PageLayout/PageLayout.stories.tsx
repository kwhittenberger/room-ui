import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './PageLayout';
import { PageHeader } from '../PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

const meta: Meta<typeof PageLayout> = {
  title: 'Layout/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

// Default
export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Page Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-room-text-secondary">
              PageLayout provides a simple container for page content.
            </p>
          </CardContent>
        </Card>
      </div>
    ),
  },
};

// With PageHeader
export const WithPageHeader: Story = {
  render: () => (
    <PageLayout>
      <PageHeader
        title="User Settings"
        subtitle="Manage your account preferences"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Settings' },
        ]}
      />
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-room-text-secondary">
              Main page content goes here.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  ),
};
