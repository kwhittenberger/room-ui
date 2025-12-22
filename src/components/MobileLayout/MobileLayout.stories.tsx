import type { Meta, StoryObj } from '@storybook/react';
import { Home, Search, Settings, Plus, Bell, User, Mail } from 'lucide-react';
import { MobileLayout } from './MobileLayout';
import { MobileHeader } from '../MobileHeader';
import { BottomNavigation } from '../BottomNavigation';
import { FloatingActionButton } from '../FloatingActionButton';
import { Card, CardContent } from '../Card';
import { Stack } from '../Stack';
import { Text } from '../Text';

const meta: Meta<typeof MobileLayout> = {
  title: 'Mobile/MobileLayout',
  component: MobileLayout,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MobileLayout>;

const navItems = [
  { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" /> },
  { id: 'search', label: 'Search', icon: <Search className="h-5 w-5" /> },
  { id: 'messages', label: 'Messages', icon: <Mail className="h-5 w-5" />, badge: 3 },
  { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
];

const SampleContent = () => (
  <Stack gap="md" className="p-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <Card key={i}>
        <CardContent>
          <Text>Sample card content {i + 1}</Text>
        </CardContent>
      </Card>
    ))}
  </Stack>
);

export const Default: Story = {
  render: () => (
    <MobileLayout
      header={
        <MobileHeader
          title="My App"
          rightActions={[
            <button key="bell" className="p-2 text-room-text-muted hover:text-room-text-primary">
              <Bell className="h-5 w-5" />
            </button>,
          ]}
        />
      }
      bottomNavigation={
        <BottomNavigation items={navItems} activeItem="home" />
      }
    >
      <SampleContent />
    </MobileLayout>
  ),
};

export const WithFAB: Story = {
  render: () => (
    <MobileLayout
      header={
        <MobileHeader
          title="Messages"
          showBack
          onBack={() => console.log('Back')}
        />
      }
      bottomNavigation={
        <BottomNavigation items={navItems} activeItem="messages" />
      }
      fab={
        <FloatingActionButton
          icon={Plus}
          aria-label="New message"
          onClick={() => console.log('New message')}
        />
      }
    >
      <SampleContent />
    </MobileLayout>
  ),
};

export const WithoutBottomNav: Story = {
  render: () => (
    <MobileLayout
      header={
        <MobileHeader
          title="Settings"
          subtitle="Manage your preferences"
          showBack
          onBack={() => console.log('Back')}
          rightActions={[
            <button key="settings" className="p-2 text-room-text-muted hover:text-room-text-primary">
              <Settings className="h-5 w-5" />
            </button>,
          ]}
        />
      }
    >
      <SampleContent />
    </MobileLayout>
  ),
};

export const TransparentHeader: Story = {
  render: () => (
    <MobileLayout
      header={
        <MobileHeader
          title="Overlay Mode"
          transparent
          showBack
          onBack={() => console.log('Back')}
        />
      }
      bottomNavigation={
        <BottomNavigation items={navItems} activeItem="home" />
      }
    >
      <div className="bg-gradient-to-b from-room-accent/20 to-room-bg-base min-h-[200px] p-4">
        <Text weight="semibold" size="xl" className="mt-16">Hero Section</Text>
      </div>
      <SampleContent />
    </MobileLayout>
  ),
};
