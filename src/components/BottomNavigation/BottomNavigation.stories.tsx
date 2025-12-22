import type { Meta, StoryObj } from '@storybook/react';
import { Home, Search, PlusCircle, Bell, User, Settings, Mail, Heart } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import { BottomNavigationSpacer } from './BottomNavigationSpacer';
import { Stack } from '../Stack';
import { Text } from '../Text';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Mobile/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

const defaultItems = [
  { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" /> },
  { id: 'search', label: 'Search', icon: <Search className="h-5 w-5" /> },
  { id: 'add', label: 'Create', icon: <PlusCircle className="h-5 w-5" /> },
  { id: 'notifications', label: 'Alerts', icon: <Bell className="h-5 w-5" /> },
  { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
];

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base">
      <Stack gap="md" className="p-4">
        <Text>Content area</Text>
        <Text color="muted">Scroll down to see the fixed bottom navigation.</Text>
      </Stack>
      <BottomNavigationSpacer />
      <BottomNavigation items={defaultItems} activeItem="home" />
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => {
    const itemsWithBadges = [
      { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" /> },
      { id: 'search', label: 'Search', icon: <Search className="h-5 w-5" /> },
      { id: 'messages', label: 'Messages', icon: <Mail className="h-5 w-5" />, badge: 12 },
      { id: 'notifications', label: 'Alerts', icon: <Bell className="h-5 w-5" />, badge: '99+' },
      { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    ];

    return (
      <div className="min-h-screen bg-room-bg-base">
        <Stack gap="md" className="p-4">
          <Text>Content with notifications</Text>
        </Stack>
        <BottomNavigationSpacer />
        <BottomNavigation items={itemsWithBadges} activeItem="home" />
      </div>
    );
  },
};

export const WithActiveIcons: Story = {
  render: () => {
    const itemsWithActiveIcons = [
      {
        id: 'home',
        label: 'Home',
        icon: <Home className="h-5 w-5" />,
        activeIcon: <Home className="h-5 w-5 fill-current" />,
      },
      {
        id: 'favorites',
        label: 'Favorites',
        icon: <Heart className="h-5 w-5" />,
        activeIcon: <Heart className="h-5 w-5 fill-current" />,
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings className="h-5 w-5" />,
        activeIcon: <Settings className="h-5 w-5 fill-current" />,
      },
    ];

    return (
      <div className="min-h-screen bg-room-bg-base">
        <Stack gap="md" className="p-4">
          <Text>Navigation with active icon variants</Text>
        </Stack>
        <BottomNavigationSpacer />
        <BottomNavigation items={itemsWithActiveIcons} activeItem="home" />
      </div>
    );
  },
};

export const FourItems: Story = {
  render: () => {
    const fourItems = [
      { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" /> },
      { id: 'search', label: 'Search', icon: <Search className="h-5 w-5" /> },
      { id: 'notifications', label: 'Alerts', icon: <Bell className="h-5 w-5" /> },
      { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    ];

    return (
      <div className="min-h-screen bg-room-bg-base">
        <Stack gap="md" className="p-4">
          <Text>Four item navigation</Text>
        </Stack>
        <BottomNavigationSpacer />
        <BottomNavigation items={fourItems} activeItem="home" />
      </div>
    );
  },
};

export const ThreeItems: Story = {
  render: () => {
    const threeItems = [
      { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" /> },
      { id: 'search', label: 'Search', icon: <Search className="h-5 w-5" /> },
      { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    ];

    return (
      <div className="min-h-screen bg-room-bg-base">
        <Stack gap="md" className="p-4">
          <Text>Three item navigation</Text>
        </Stack>
        <BottomNavigationSpacer />
        <BottomNavigation items={threeItems} activeItem="home" />
      </div>
    );
  },
};
