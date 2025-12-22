import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Settings, Search, MoreVertical, Share } from 'lucide-react';
import { MobileHeader } from './MobileHeader';
import { MobileHeaderSpacer } from './MobileHeaderSpacer';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Card, CardContent } from '../Card';

const meta: Meta<typeof MobileHeader> = {
  title: 'Mobile/MobileHeader',
  component: MobileHeader,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MobileHeader>;

const SampleContent = () => (
  <Stack gap="md" className="p-4">
    {Array.from({ length: 10 }).map((_, i) => (
      <Card key={i}>
        <CardContent>
          <Text>Sample content {i + 1}</Text>
        </CardContent>
      </Card>
    ))}
  </Stack>
);

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base">
      <MobileHeader title="My App" />
      <MobileHeaderSpacer />
      <SampleContent />
    </div>
  ),
};

export const WithSubtitle: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base">
      <MobileHeader title="Messages" subtitle="3 unread" />
      <MobileHeaderSpacer />
      <SampleContent />
    </div>
  ),
};

export const WithBackButton: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base">
      <MobileHeader
        title="Settings"
        showBack
        onBack={() => console.log('Back')}
      />
      <MobileHeaderSpacer />
      <SampleContent />
    </div>
  ),
};

export const WithRightActions: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base">
      <MobileHeader
        title="Notifications"
        rightActions={[
          <button key="search" className="p-2 text-room-text-muted hover:text-room-text-primary">
            <Search className="h-5 w-5" />
          </button>,
          <button key="settings" className="p-2 text-room-text-muted hover:text-room-text-primary">
            <Settings className="h-5 w-5" />
          </button>,
        ]}
      />
      <MobileHeaderSpacer />
      <SampleContent />
    </div>
  ),
};

export const WithBackAndActions: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base">
      <MobileHeader
        title="Document"
        subtitle="Last edited 2 hours ago"
        showBack
        onBack={() => console.log('Back')}
        rightActions={[
          <button key="share" className="p-2 text-room-text-muted hover:text-room-text-primary">
            <Share className="h-5 w-5" />
          </button>,
          <button key="more" className="p-2 text-room-text-muted hover:text-room-text-primary">
            <MoreVertical className="h-5 w-5" />
          </button>,
        ]}
      />
      <MobileHeaderSpacer />
      <SampleContent />
    </div>
  ),
};

export const Transparent: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base">
      <MobileHeader
        title="Profile"
        transparent
        showBack
        onBack={() => console.log('Back')}
        rightActions={[
          <button key="settings" className="p-2 text-room-text-muted hover:text-room-text-primary">
            <Settings className="h-5 w-5" />
          </button>,
        ]}
      />
      <div className="bg-gradient-to-b from-room-accent/30 to-room-bg-base min-h-[200px] flex items-center justify-center">
        <Text weight="semibold" size="2xl">Hero Section</Text>
      </div>
      <SampleContent />
    </div>
  ),
};

export const CustomLeftAction: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base">
      <MobileHeader
        title="Notifications"
        leftAction={
          <button className="p-2 text-room-text-muted hover:text-room-text-primary">
            <Bell className="h-5 w-5" />
          </button>
        }
        rightActions={[
          <button key="settings" className="p-2 text-room-text-muted hover:text-room-text-primary">
            <Settings className="h-5 w-5" />
          </button>,
        ]}
      />
      <MobileHeaderSpacer />
      <SampleContent />
    </div>
  ),
};
