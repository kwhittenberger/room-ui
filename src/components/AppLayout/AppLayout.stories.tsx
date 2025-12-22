import type { Meta, StoryObj } from '@storybook/react';
import { Home, Search, User, Settings, Bell } from 'lucide-react';
import { AppLayout } from './AppLayout';
import { Button } from '../Button';

const meta: Meta<typeof AppLayout> = {
  title: 'Layout/AppLayout',
  component: AppLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppLayout>;

const SampleSidebar = () => (
  <div className="p-4 space-y-2">
    <div className="text-lg font-semibold text-room-text-primary mb-4">App Name</div>
    {[
      { icon: Home, label: 'Home', active: true },
      { icon: Search, label: 'Search' },
      { icon: Bell, label: 'Notifications' },
      { icon: User, label: 'Profile' },
      { icon: Settings, label: 'Settings' },
    ].map((item) => (
      <button
        key={item.label}
        className={`flex items-center gap-3 w-full px-3 py-2 rounded-room-sm ${
          item.active
            ? 'bg-room-accent text-white'
            : 'text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover'
        }`}
      >
        <item.icon className="h-5 w-5" />
        <span>{item.label}</span>
      </button>
    ))}
  </div>
);

const SampleHeader = () => (
  <div className="flex items-center justify-between px-6 py-3">
    <h1 className="text-lg font-semibold text-room-text-primary">Dashboard</h1>
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="sm">
        <Bell className="h-4 w-4" />
      </Button>
      <Button size="sm">New Item</Button>
    </div>
  </div>
);

const SampleMobileHeader = () => (
  <div className="flex-1 flex items-center justify-center">
    <span className="font-semibold text-room-text-primary">App Name</span>
  </div>
);

const SampleBottomNav = () => (
  <div className="flex items-center justify-around py-2">
    {[
      { icon: Home, label: 'Home', active: true },
      { icon: Search, label: 'Search' },
      { icon: Bell, label: 'Alerts' },
      { icon: User, label: 'Profile' },
    ].map((item) => (
      <button
        key={item.label}
        className={`flex flex-col items-center p-2 ${
          item.active ? 'text-room-accent' : 'text-room-text-muted'
        }`}
      >
        <item.icon className="h-5 w-5" />
        <span className="text-xs mt-1">{item.label}</span>
      </button>
    ))}
  </div>
);

const SampleContent = () => (
  <div className="p-6">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-room-bg-elevated rounded-room border border-room-border p-4"
        >
          <h3 className="font-medium text-room-text-primary mb-2">Card {i + 1}</h3>
          <p className="text-sm text-room-text-secondary">
            Sample card content for the dashboard layout.
          </p>
        </div>
      ))}
    </div>
  </div>
);

// Default app layout
export const Default: Story = {
  args: {
    sidebar: <SampleSidebar />,
    header: <SampleHeader />,
    children: <SampleContent />,
  },
};

// With mobile header
export const WithMobileHeader: Story = {
  args: {
    sidebar: <SampleSidebar />,
    header: <SampleHeader />,
    mobileHeader: <SampleMobileHeader />,
    children: <SampleContent />,
  },
};

// With bottom navigation
export const WithBottomNavigation: Story = {
  args: {
    sidebar: <SampleSidebar />,
    header: <SampleHeader />,
    mobileHeader: <SampleMobileHeader />,
    bottomNavigation: <SampleBottomNav />,
    children: <SampleContent />,
  },
};

// Without sidebar
export const WithoutSidebar: Story = {
  args: {
    header: <SampleHeader />,
    bottomNavigation: <SampleBottomNav />,
    children: <SampleContent />,
  },
};
