import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarToggle,
  SidebarDivider,
  SidebarItemProps,
} from './index';
import { Stack } from '../Stack';
import { Text } from '../Text';
import {
  Home,
  Users,
  FolderOpen,
  Settings,
  HelpCircle,
  LogOut,
  FileText,
  BarChart3,
  Mail,
  Calendar,
  Star,
  Archive,
  Trash2,
  Plus,
  Search,
  Bell,
  CreditCard,
  Shield,
  Globe,
  Palette,
  Database,
  Code,
  Box,
  Layers,
  Zap,
} from 'lucide-react';

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Sidebar navigation component with collapsible groups and items.

## Features
- Collapsible sidebar with smooth transitions
- Grouped navigation items
- Nested item support
- Active state indication
- Badge support for notifications
- Controlled and uncontrolled modes

## Usage
\`\`\`tsx
import { Sidebar, SidebarHeader, SidebarGroup, SidebarFooter, SidebarToggle } from 'room-ui';

<Sidebar>
  <SidebarHeader>
    <Logo />
  </SidebarHeader>
  <SidebarGroup
    title="Main"
    items={[
      { id: 'home', label: 'Home', icon: <Home />, active: true },
      { id: 'users', label: 'Users', icon: <Users /> },
    ]}
  />
  <SidebarFooter>
    <SidebarToggle />
  </SidebarFooter>
</Sidebar>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// Helper to wrap sidebar in a container with min-height
const SidebarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-[600px] bg-room-bg-base">
    {children}
    <div className="flex-1 p-6">
      <Text className="text-room-text-muted">Main content area</Text>
    </div>
  </div>
);

const mainNavItems: SidebarItemProps[] = [
  { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" />, active: true, onClick: () => {} },
  { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" />, onClick: () => {} },
  { id: 'projects', label: 'Projects', icon: <FolderOpen className="h-5 w-5" />, badge: '12', onClick: () => {} },
  { id: 'users', label: 'Team', icon: <Users className="h-5 w-5" />, onClick: () => {} },
];

const communicationItems: SidebarItemProps[] = [
  { id: 'inbox', label: 'Inbox', icon: <Mail className="h-5 w-5" />, badge: '5', onClick: () => {} },
  { id: 'calendar', label: 'Calendar', icon: <Calendar className="h-5 w-5" />, onClick: () => {} },
];

/**
 * Basic sidebar with groups
 */
export const Basic: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar>
        <SidebarHeader>
          <Stack direction="horizontal" gap="sm" align="center">
            <div className="w-8 h-8 bg-room-accent rounded-room-sm flex items-center justify-center">
              <Box className="h-5 w-5 text-white" />
            </div>
            <Text weight="semibold">Room UI</Text>
          </Stack>
        </SidebarHeader>
        <div className="flex-1 overflow-y-auto px-2">
          <SidebarGroup title="Main" items={mainNavItems} />
          <SidebarGroup title="Communication" items={communicationItems} />
        </div>
        <SidebarFooter>
          <Stack direction="horizontal" justify="between" align="center">
            <SidebarToggle />
            <button className="p-2 rounded-room-sm text-room-text-muted hover:text-room-text-primary hover:bg-room-bg-hover">
              <Settings className="h-4 w-4" />
            </button>
          </Stack>
        </SidebarFooter>
      </Sidebar>
    </SidebarWrapper>
  ),
};

/**
 * Collapsed sidebar
 */
export const Collapsed: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar defaultCollapsed>
        <SidebarHeader>
          <div className="w-8 h-8 bg-room-accent rounded-room-sm flex items-center justify-center">
            <Box className="h-5 w-5 text-white" />
          </div>
        </SidebarHeader>
        <div className="flex-1 overflow-y-auto px-2">
          <SidebarGroup items={mainNavItems} />
          <SidebarDivider />
          <SidebarGroup items={communicationItems} />
        </div>
        <SidebarFooter>
          <SidebarToggle className="w-full flex justify-center" />
        </SidebarFooter>
      </Sidebar>
    </SidebarWrapper>
  ),
};

/**
 * Controlled collapse state
 */
export const Controlled: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <SidebarWrapper>
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
          <SidebarHeader>
            <Stack direction="horizontal" gap="sm" align="center">
              <div className="w-8 h-8 bg-room-accent rounded-room-sm flex items-center justify-center">
                <Box className="h-5 w-5 text-white" />
              </div>
              {!collapsed && <Text weight="semibold">Room UI</Text>}
            </Stack>
          </SidebarHeader>
          <div className="flex-1 overflow-y-auto px-2">
            <SidebarGroup title={collapsed ? undefined : 'Main'} items={mainNavItems} />
          </div>
          <SidebarFooter>
            <SidebarToggle />
          </SidebarFooter>
        </Sidebar>
      </SidebarWrapper>
    );
  },
};

/**
 * With nested items
 */
export const WithNestedItems: Story = {
  render: () => {
    const settingsItems: SidebarItemProps[] = [
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings className="h-5 w-5" />,
        children: [
          { id: 'profile', label: 'Profile', icon: <Users className="h-4 w-4" />, onClick: () => {} },
          { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" />, onClick: () => {} },
          { id: 'billing', label: 'Billing', icon: <CreditCard className="h-4 w-4" />, onClick: () => {} },
          { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" />, onClick: () => {} },
        ],
      },
      {
        id: 'integrations',
        label: 'Integrations',
        icon: <Layers className="h-5 w-5" />,
        children: [
          { id: 'api', label: 'API Keys', icon: <Code className="h-4 w-4" />, onClick: () => {} },
          { id: 'webhooks', label: 'Webhooks', icon: <Zap className="h-4 w-4" />, onClick: () => {} },
          { id: 'database', label: 'Database', icon: <Database className="h-4 w-4" />, onClick: () => {} },
        ],
      },
    ];

    return (
      <SidebarWrapper>
        <Sidebar>
          <SidebarHeader>
            <Text weight="semibold">Settings</Text>
          </SidebarHeader>
          <div className="flex-1 overflow-y-auto px-2">
            <SidebarGroup items={settingsItems} />
          </div>
        </Sidebar>
      </SidebarWrapper>
    );
  },
};

/**
 * Collapsible groups
 */
export const CollapsibleGroups: Story = {
  render: () => {
    const documentsItems: SidebarItemProps[] = [
      { id: 'all', label: 'All Documents', icon: <FileText className="h-5 w-5" />, onClick: () => {} },
      { id: 'starred', label: 'Starred', icon: <Star className="h-5 w-5" />, onClick: () => {} },
      { id: 'archived', label: 'Archived', icon: <Archive className="h-5 w-5" />, onClick: () => {} },
      { id: 'trash', label: 'Trash', icon: <Trash2 className="h-5 w-5" />, onClick: () => {} },
    ];

    return (
      <SidebarWrapper>
        <Sidebar>
          <SidebarHeader>
            <Stack direction="horizontal" justify="between" align="center">
              <Text weight="semibold">Documents</Text>
              <button className="p-1.5 rounded-room-sm text-room-text-muted hover:text-room-text-primary hover:bg-room-bg-hover">
                <Plus className="h-4 w-4" />
              </button>
            </Stack>
          </SidebarHeader>
          <div className="flex-1 overflow-y-auto px-2">
            <SidebarGroup
              title="Quick Access"
              items={mainNavItems.slice(0, 2)}
              collapsible
            />
            <SidebarGroup
              title="Documents"
              items={documentsItems}
              collapsible
            />
            <SidebarGroup
              title="Communication"
              items={communicationItems}
              collapsible
              defaultCollapsed
            />
          </div>
        </Sidebar>
      </SidebarWrapper>
    );
  },
};

/**
 * With search and actions
 */
export const WithSearchAndActions: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar>
        <SidebarHeader>
          <Stack gap="sm">
            <Stack direction="horizontal" gap="sm" align="center">
              <div className="w-8 h-8 bg-room-accent rounded-room-sm flex items-center justify-center">
                <Box className="h-5 w-5 text-white" />
              </div>
              <Text weight="semibold">Acme Inc</Text>
            </Stack>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-room-text-muted" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-8 pr-3 py-1.5 bg-room-bg-surface border border-room-border rounded-room-sm text-sm text-room-text-primary placeholder:text-room-text-muted focus:outline-none focus:border-room-accent"
              />
            </div>
          </Stack>
        </SidebarHeader>
        <div className="flex-1 overflow-y-auto px-2">
          <SidebarGroup items={mainNavItems} />
          <SidebarDivider />
          <SidebarGroup title="Favorites" items={communicationItems} />
        </div>
        <SidebarFooter>
          <Stack gap="sm">
            <SidebarDivider className="mx-0" />
            <Stack direction="horizontal" gap="sm" align="center" className="px-1">
              <div className="w-8 h-8 bg-room-bg-surface rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-room-text-muted" />
              </div>
              <div className="flex-1 min-w-0">
                <Text size="sm" weight="medium" className="truncate">John Doe</Text>
                <Text size="xs" className="text-room-text-muted truncate">john@acme.com</Text>
              </div>
              <button className="p-1.5 rounded-room-sm text-room-text-muted hover:text-room-text-primary hover:bg-room-bg-hover">
                <LogOut className="h-4 w-4" />
              </button>
            </Stack>
          </Stack>
        </SidebarFooter>
      </Sidebar>
    </SidebarWrapper>
  ),
};

/**
 * With disabled items
 */
export const WithDisabledItems: Story = {
  render: () => {
    const items: SidebarItemProps[] = [
      { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" />, onClick: () => {} },
      { id: 'premium', label: 'Premium Feature', icon: <Star className="h-5 w-5" />, disabled: true },
      { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" />, onClick: () => {} },
    ];

    return (
      <SidebarWrapper>
        <Sidebar>
          <SidebarHeader>
            <Text weight="semibold">App</Text>
          </SidebarHeader>
          <div className="flex-1 overflow-y-auto px-2">
            <SidebarGroup items={items} />
          </div>
        </Sidebar>
      </SidebarWrapper>
    );
  },
};

/**
 * Custom widths
 */
export const CustomWidths: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar width={280} collapsedWidth={80}>
        <SidebarHeader>
          <Stack direction="horizontal" gap="sm" align="center">
            <div className="w-10 h-10 bg-room-accent rounded-room flex items-center justify-center">
              <Box className="h-6 w-6 text-white" />
            </div>
            <Stack gap="none">
              <Text weight="semibold">Enterprise</Text>
              <Text size="xs" className="text-room-text-muted">Admin Dashboard</Text>
            </Stack>
          </Stack>
        </SidebarHeader>
        <div className="flex-1 overflow-y-auto px-2">
          <SidebarGroup title="Navigation" items={mainNavItems} />
        </div>
        <SidebarFooter>
          <SidebarToggle />
        </SidebarFooter>
      </Sidebar>
    </SidebarWrapper>
  ),
};

/**
 * Right-positioned sidebar
 */
export const RightPositioned: Story = {
  render: () => (
    <div className="flex h-[600px] bg-room-bg-base">
      <div className="flex-1 p-6">
        <Text className="text-room-text-muted">Main content area</Text>
      </div>
      <Sidebar position="right">
        <SidebarHeader>
          <Text weight="semibold">Properties</Text>
        </SidebarHeader>
        <div className="flex-1 overflow-y-auto px-2">
          <SidebarGroup
            title="Appearance"
            items={[
              { id: 'theme', label: 'Theme', icon: <Palette className="h-5 w-5" />, onClick: () => {} },
              { id: 'language', label: 'Language', icon: <Globe className="h-5 w-5" />, onClick: () => {} },
            ]}
          />
          <SidebarGroup
            title="Help"
            items={[
              { id: 'docs', label: 'Documentation', icon: <FileText className="h-5 w-5" />, onClick: () => {} },
              { id: 'support', label: 'Support', icon: <HelpCircle className="h-5 w-5" />, onClick: () => {} },
            ]}
          />
        </div>
      </Sidebar>
    </div>
  ),
};

/**
 * Full application layout
 */
export const FullApplicationLayout: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('home');
    const [collapsed, setCollapsed] = useState(false);

    const createItems = (items: Omit<SidebarItemProps, 'active' | 'onClick'>[]): SidebarItemProps[] =>
      items.map((item) => ({
        ...item,
        active: activeItem === item.id,
        onClick: () => setActiveItem(item.id),
      }));

    return (
      <div className="flex h-[700px] bg-room-bg-base">
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
          <SidebarHeader>
            <Stack direction="horizontal" gap="sm" align="center">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-room-sm flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              {!collapsed && <Text weight="bold">Workflow</Text>}
            </Stack>
          </SidebarHeader>
          <div className="flex-1 overflow-y-auto px-2">
            <SidebarGroup
              title={collapsed ? undefined : 'Main'}
              items={createItems([
                { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" /> },
                { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" /> },
                { id: 'projects', label: 'Projects', icon: <FolderOpen className="h-5 w-5" />, badge: '8' },
              ])}
            />
            <SidebarGroup
              title={collapsed ? undefined : 'Team'}
              items={createItems([
                { id: 'users', label: 'Members', icon: <Users className="h-5 w-5" /> },
                { id: 'inbox', label: 'Inbox', icon: <Mail className="h-5 w-5" />, badge: '3' },
                { id: 'calendar', label: 'Calendar', icon: <Calendar className="h-5 w-5" /> },
              ])}
            />
          </div>
          <SidebarFooter>
            <Stack gap="sm">
              {!collapsed && (
                <Stack direction="horizontal" gap="sm" align="center" className="px-1 py-2 bg-room-bg-surface rounded-room-sm">
                  <div className="w-8 h-8 bg-room-accent/20 rounded-full flex items-center justify-center">
                    <Text size="sm" weight="medium" className="text-room-accent">JD</Text>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Text size="sm" weight="medium" className="truncate">John Doe</Text>
                    <Text size="xs" className="text-room-text-muted">Pro Plan</Text>
                  </div>
                </Stack>
              )}
              <Stack direction="horizontal" justify={collapsed ? 'center' : 'between'} align="center">
                <SidebarToggle />
                {!collapsed && (
                  <Stack direction="horizontal" gap="xs">
                    <button className="p-2 rounded-room-sm text-room-text-muted hover:text-room-text-primary hover:bg-room-bg-hover">
                      <Bell className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-room-sm text-room-text-muted hover:text-room-text-primary hover:bg-room-bg-hover">
                      <Settings className="h-4 w-4" />
                    </button>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-6 overflow-auto">
          <Stack gap="md">
            <Text size="xl" weight="bold">
              {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
            </Text>
            <Text className="text-room-text-muted">
              You selected the "{activeItem}" navigation item.
            </Text>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 bg-room-bg-surface border border-room-border rounded-room"
                >
                  <Text weight="medium" className="mb-2">Card {i}</Text>
                  <Text size="sm" className="text-room-text-muted">
                    Content for card {i}
                  </Text>
                </div>
              ))}
            </div>
          </Stack>
        </div>
      </div>
    );
  },
};
