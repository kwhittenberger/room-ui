import { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab, TabsRoot, TabsList, TabsTrigger, TabsContent } from './index';
import { User, Settings, Bell, Lock, FileText, Mail, Home } from 'lucide-react';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Button } from '../Button';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Tab navigation component for organizing content into separate views.

## Features
- **Variants**: underline, pill styling options
- **Orientation**: horizontal or vertical layout
- **Icons**: Support for icons alongside tab labels
- **Badges**: Show notification counts on tabs
- **Disabled tabs**: Prevent interaction with specific tabs
- **Lazy loading**: Only render active tab content
- **Closeable tabs**: Editor-like dynamic tab management
- **Keyboard navigation**: Full arrow key, Home/End, Enter/Space support

## Usage
\`\`\`tsx
import { Tabs } from 'room-ui';

const tabs = [
  { id: 'profile', label: 'Profile', content: <ProfileContent /> },
  { id: 'settings', label: 'Settings', content: <SettingsContent /> },
];

<Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'pill'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const basicTabs: Tab[] = [
  { id: 'profile', label: 'Profile', content: <div className="p-4"><Text weight="medium" size="lg">Profile Content</Text><Text className="mt-2 text-room-text-secondary">Your profile information goes here.</Text></div> },
  { id: 'settings', label: 'Settings', content: <div className="p-4"><Text weight="medium" size="lg">Settings Content</Text><Text className="mt-2 text-room-text-secondary">Application settings go here.</Text></div> },
  { id: 'notifications', label: 'Notifications', content: <div className="p-4"><Text weight="medium" size="lg">Notifications Content</Text><Text className="mt-2 text-room-text-secondary">Your notifications appear here.</Text></div> },
];

const tabsWithIcons: Tab[] = [
  { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" />, content: <div className="p-4"><Text weight="medium" size="lg">Profile</Text><Text className="mt-2 text-room-text-secondary">Manage your profile information.</Text></div> },
  { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" />, content: <div className="p-4"><Text weight="medium" size="lg">Settings</Text><Text className="mt-2 text-room-text-secondary">Configure your preferences.</Text></div> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" />, content: <div className="p-4"><Text weight="medium" size="lg">Notifications</Text><Text className="mt-2 text-room-text-secondary">View your notifications.</Text></div> },
  { id: 'security', label: 'Security', icon: <Lock className="h-4 w-4" />, content: <div className="p-4"><Text weight="medium" size="lg">Security</Text><Text className="mt-2 text-room-text-secondary">Manage security settings.</Text></div> },
];

/**
 * Default underline tabs
 */
export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('profile');
    return <Tabs tabs={basicTabs} activeTab={activeTab} onChange={setActiveTab} />;
  },
};

/**
 * Pill variant tabs
 */
export const Pill: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('profile');
    return <Tabs tabs={basicTabs} activeTab={activeTab} onChange={setActiveTab} variant="pill" />;
  },
};

/**
 * Tabs with icons
 */
export const WithIcons: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('profile');
    return <Tabs tabs={tabsWithIcons} activeTab={activeTab} onChange={setActiveTab} />;
  },
};

/**
 * Tabs with badge counts
 */
export const WithBadges: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('inbox');
    const tabs: Tab[] = [
      { id: 'inbox', label: 'Inbox', badge: 12, badgeVariant: 'info', content: <div className="p-4">Inbox messages (12 new)</div> },
      { id: 'alerts', label: 'Alerts', badge: 3, badgeVariant: 'error', content: <div className="p-4">Critical alerts (3)</div> },
      { id: 'warnings', label: 'Warnings', badge: 7, badgeVariant: 'warning', content: <div className="p-4">Warnings (7)</div> },
      { id: 'completed', label: 'Completed', badge: 24, badgeVariant: 'success', content: <div className="p-4">Completed tasks (24)</div> },
    ];
    return <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />;
  },
};

/**
 * With disabled tab
 */
export const WithDisabledTab: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('profile');
    const tabs: Tab[] = [
      { id: 'profile', label: 'Profile', content: <div className="p-4">Profile content</div> },
      { id: 'settings', label: 'Settings', content: <div className="p-4">Settings content</div> },
      { id: 'admin', label: 'Admin', disabled: true, content: <div className="p-4">Admin content (disabled)</div> },
    ];
    return <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />;
  },
};

/**
 * Vertical orientation
 */
export const Vertical: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('profile');
    return <Tabs tabs={tabsWithIcons} activeTab={activeTab} onChange={setActiveTab} orientation="vertical" />;
  },
};

/**
 * Vertical with pill variant
 */
export const VerticalPill: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('profile');
    return <Tabs tabs={tabsWithIcons} activeTab={activeTab} onChange={setActiveTab} orientation="vertical" variant="pill" />;
  },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const tabs: Tab[] = [
      { id: 'tab1', label: 'Tab 1', badge: 3, content: <div className="p-4">Tab 1 content</div> },
      { id: 'tab2', label: 'Tab 2', content: <div className="p-4">Tab 2 content</div> },
      { id: 'tab3', label: 'Tab 3', content: <div className="p-4">Tab 3 content</div> },
    ];

    return (
      <Stack gap="xl">
        <div>
          <Text size="sm" className="mb-2 text-room-text-muted">Small</Text>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} size="sm" />
        </div>
        <div>
          <Text size="sm" className="mb-2 text-room-text-muted">Medium (default)</Text>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} size="md" />
        </div>
        <div>
          <Text size="sm" className="mb-2 text-room-text-muted">Large</Text>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} size="lg" />
        </div>
      </Stack>
    );
  },
};

/**
 * Closeable tabs with add button
 */
export const CloseableTabs: Story = {
  render: () => {
    const [tabs, setTabs] = useState<Tab[]>([
      { id: 'home', label: 'Home', icon: <Home className="h-4 w-4" />, closeable: false, content: <div className="p-4">Home tab (not closeable)</div> },
      { id: 'doc1', label: 'Document 1', icon: <FileText className="h-4 w-4" />, content: <div className="p-4">Document 1 content</div> },
      { id: 'doc2', label: 'Document 2', icon: <FileText className="h-4 w-4" />, content: <div className="p-4">Document 2 content</div> },
      { id: 'mail', label: 'Mail', icon: <Mail className="h-4 w-4" />, badge: 5, content: <div className="p-4">Mail content</div> },
    ]);
    const [activeTab, setActiveTab] = useState('home');

    const handleClose = (tabId: string) => {
      const tabIndex = tabs.findIndex(t => t.id === tabId);
      const newTabs = tabs.filter(t => t.id !== tabId);
      setTabs(newTabs);

      if (activeTab === tabId && newTabs.length > 0) {
        const newActiveIndex = Math.min(tabIndex, newTabs.length - 1);
        setActiveTab(newTabs[newActiveIndex].id);
      }
    };

    return (
      <div>
        <Text size="sm" className="mb-4 text-room-text-muted">
          Hover over tabs to see close buttons. Home tab is not closeable.
        </Text>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          closeable
          onClose={handleClose}
        />
      </div>
    );
  },
};

/**
 * Dynamic tabs with add button
 */
export const DynamicTabs: Story = {
  render: () => {
    const [tabs, setTabs] = useState<Tab[]>([
      { id: 'tab-1', label: 'Tab 1', content: <div className="p-4">Content for Tab 1</div> },
      { id: 'tab-2', label: 'Tab 2', content: <div className="p-4">Content for Tab 2</div> },
    ]);
    const [activeTab, setActiveTab] = useState('tab-1');
    const nextIdRef = useRef(3);

    const handleAdd = () => {
      const newId = `tab-${nextIdRef.current++}`;
      const newTab: Tab = {
        id: newId,
        label: `Tab ${nextIdRef.current - 1}`,
        content: <div className="p-4">Content for Tab {nextIdRef.current - 1}</div>,
      };
      setTabs([...tabs, newTab]);
      setActiveTab(newId);
    };

    const handleClose = (tabId: string) => {
      const tabIndex = tabs.findIndex(t => t.id === tabId);
      const newTabs = tabs.filter(t => t.id !== tabId);
      setTabs(newTabs);

      if (activeTab === tabId && newTabs.length > 0) {
        const newActiveIndex = Math.min(tabIndex, newTabs.length - 1);
        setActiveTab(newTabs[newActiveIndex].id);
      }
    };

    return (
      <div>
        <Text size="sm" className="mb-4 text-room-text-muted">
          Click the + button to add new tabs. Tabs can be closed by clicking the X.
        </Text>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          closeable
          onClose={handleClose}
          showAddButton
          onAdd={handleAdd}
        />
      </div>
    );
  },
};

/**
 * Lazy loading tabs
 */
export const LazyLoading: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const tabs: Tab[] = [
      { id: 'tab1', label: 'Tab 1', content: <div className="p-4"><Text>Tab 1 was rendered immediately.</Text></div> },
      { id: 'tab2', label: 'Tab 2', content: <div className="p-4"><Text>Tab 2 was rendered when you visited it.</Text></div> },
      { id: 'tab3', label: 'Tab 3', content: <div className="p-4"><Text>Tab 3 was rendered when you visited it.</Text></div> },
    ];

    return (
      <div>
        <div className="mb-4 p-3 bg-room-bg-surface rounded-room">
          <Text size="sm" className="text-room-text-muted">
            With lazy loading, only the active tab is rendered. Visit other tabs to see them rendered.
          </Text>
        </div>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          lazy
        />
      </div>
    );
  },
};

/**
 * Editor-style tabs
 */
export const EditorStyleTabs: Story = {
  render: () => {
    const [tabs, setTabs] = useState<Tab[]>([
      { id: 'index', label: 'index.tsx', icon: <FileText className="h-4 w-4" />, content: <div className="p-4 font-mono bg-room-bg-base text-room-text-primary rounded-b-room">{'// index.tsx\nexport default function App() {\n  return <div>Hello World</div>;\n}'}</div> },
      { id: 'styles', label: 'styles.css', icon: <FileText className="h-4 w-4" />, badge: '•', badgeVariant: 'warning', content: <div className="p-4 font-mono bg-room-bg-base text-room-text-primary rounded-b-room">{'/* styles.css - unsaved */\n.container {\n  display: flex;\n}'}</div> },
      { id: 'config', label: 'config.json', icon: <FileText className="h-4 w-4" />, content: <div className="p-4 font-mono bg-room-bg-base text-room-text-primary rounded-b-room">{'{\n  "name": "my-app",\n  "version": "1.0.0"\n}'}</div> },
    ]);
    const [activeTab, setActiveTab] = useState('index');
    const nextIdRef = useRef(1);

    const handleAdd = () => {
      const newId = `new-${nextIdRef.current++}`;
      const newTab: Tab = {
        id: newId,
        label: `untitled-${nextIdRef.current - 1}.txt`,
        icon: <FileText className="h-4 w-4" />,
        content: <div className="p-4 font-mono bg-room-bg-base text-room-text-primary rounded-b-room">{'// New file'}</div>,
      };
      setTabs([...tabs, newTab]);
      setActiveTab(newId);
    };

    const handleClose = (tabId: string) => {
      const tabIndex = tabs.findIndex(t => t.id === tabId);
      const newTabs = tabs.filter(t => t.id !== tabId);
      setTabs(newTabs);

      if (activeTab === tabId && newTabs.length > 0) {
        const newActiveIndex = Math.min(tabIndex, newTabs.length - 1);
        setActiveTab(newTabs[newActiveIndex].id);
      }
    };

    return (
      <div className="border border-room-border rounded-room overflow-hidden">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="pill"
          size="sm"
          closeable
          onClose={handleClose}
          showAddButton
          onAdd={handleAdd}
        />
      </div>
    );
  },
};

// ============================================
// COMPOUND COMPONENT PATTERN STORIES
// ============================================

/**
 * Compound component pattern - Basic
 */
export const CompoundBasic: Story = {
  render: () => (
    <TabsRoot defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4">
          <Text weight="medium" size="lg">Account Settings</Text>
          <Text className="mt-2 text-room-text-secondary">Manage your account information and preferences.</Text>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4">
          <Text weight="medium" size="lg">Password Settings</Text>
          <Text className="mt-2 text-room-text-secondary">Change your password and security settings.</Text>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">
          <Text weight="medium" size="lg">Application Settings</Text>
          <Text className="mt-2 text-room-text-secondary">Configure application preferences.</Text>
        </div>
      </TabsContent>
    </TabsRoot>
  ),
};

/**
 * Compound component with icons and badges
 */
export const CompoundWithIconsAndBadges: Story = {
  render: () => (
    <TabsRoot defaultValue="inbox" variant="pill">
      <TabsList>
        <TabsTrigger value="inbox" icon={<Mail className="h-4 w-4" />} badge={12} badgeVariant="info">
          Inbox
        </TabsTrigger>
        <TabsTrigger value="alerts" icon={<Bell className="h-4 w-4" />} badge={3} badgeVariant="error">
          Alerts
        </TabsTrigger>
        <TabsTrigger value="settings" icon={<Settings className="h-4 w-4" />}>
          Settings
        </TabsTrigger>
        <TabsTrigger value="profile" icon={<User className="h-4 w-4" />} disabled>
          Profile
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inbox">
        <div className="p-4">You have 12 new messages.</div>
      </TabsContent>
      <TabsContent value="alerts">
        <div className="p-4">3 critical alerts require attention.</div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">Configure your settings.</div>
      </TabsContent>
      <TabsContent value="profile">
        <div className="p-4">Profile is disabled.</div>
      </TabsContent>
    </TabsRoot>
  ),
};

/**
 * Compound component - Vertical layout
 */
export const CompoundVertical: Story = {
  render: () => (
    <TabsRoot defaultValue="general" orientation="vertical">
      <TabsList>
        <TabsTrigger value="general" icon={<Settings className="h-4 w-4" />}>
          General
        </TabsTrigger>
        <TabsTrigger value="profile" icon={<User className="h-4 w-4" />}>
          Profile
        </TabsTrigger>
        <TabsTrigger value="notifications" icon={<Bell className="h-4 w-4" />}>
          Notifications
        </TabsTrigger>
        <TabsTrigger value="security" icon={<Lock className="h-4 w-4" />}>
          Security
        </TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <div className="p-4">
          <Text weight="medium" size="lg">General Settings</Text>
          <Text className="mt-2 text-room-text-secondary">Configure general application settings.</Text>
        </div>
      </TabsContent>
      <TabsContent value="profile">
        <div className="p-4">
          <Text weight="medium" size="lg">Profile Settings</Text>
          <Text className="mt-2 text-room-text-secondary">Update your profile information.</Text>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4">
          <Text weight="medium" size="lg">Notification Settings</Text>
          <Text className="mt-2 text-room-text-secondary">Manage notification preferences.</Text>
        </div>
      </TabsContent>
      <TabsContent value="security">
        <div className="p-4">
          <Text weight="medium" size="lg">Security Settings</Text>
          <Text className="mt-2 text-room-text-secondary">Configure security options.</Text>
        </div>
      </TabsContent>
    </TabsRoot>
  ),
};

/**
 * Controlled compound component
 */
export const CompoundControlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
      <div>
        <Stack direction="horizontal" gap="sm" className="mb-4">
          <Button
            variant={activeTab === 'tab1' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('tab1')}
          >
            Go to Tab 1
          </Button>
          <Button
            variant={activeTab === 'tab2' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('tab2')}
          >
            Go to Tab 2
          </Button>
          <Button
            variant={activeTab === 'tab3' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('tab3')}
          >
            Go to Tab 3
          </Button>
        </Stack>
        <TabsRoot value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4">Content for Tab 1</div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="p-4">Content for Tab 2</div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="p-4">Content for Tab 3</div>
          </TabsContent>
        </TabsRoot>
      </div>
    );
  },
};

/**
 * Separated layout pattern
 */
export const SeparatedLayout: Story = {
  render: () => (
    <TabsRoot defaultValue="overview">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Text weight="semibold" size="xl">Dashboard</Text>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </div>
        <div className="p-6 bg-room-bg-surface rounded-room min-h-[200px]">
          <TabsContent value="overview">
            <Text weight="medium" size="lg">Overview</Text>
            <Text className="mt-2 text-room-text-secondary">Dashboard overview with key metrics.</Text>
          </TabsContent>
          <TabsContent value="analytics">
            <Text weight="medium" size="lg">Analytics</Text>
            <Text className="mt-2 text-room-text-secondary">Detailed analytics and charts.</Text>
          </TabsContent>
          <TabsContent value="reports">
            <Text weight="medium" size="lg">Reports</Text>
            <Text className="mt-2 text-room-text-secondary">Generate and view reports.</Text>
          </TabsContent>
        </div>
      </div>
    </TabsRoot>
  ),
};
