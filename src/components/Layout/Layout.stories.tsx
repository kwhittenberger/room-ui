import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Home, Settings, Users, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { Layout } from './Layout';
import { Button } from '../Button';

const meta: Meta<typeof Layout> = {
  title: 'Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Layout>;

const SampleSidebar = () => (
  <div className="p-4 space-y-2">
    <div className="text-lg font-semibold text-room-text-primary mb-4">Logo</div>
    {[
      { icon: Home, label: 'Dashboard' },
      { icon: Users, label: 'Users' },
      { icon: FileText, label: 'Documents' },
      { icon: Settings, label: 'Settings' },
    ].map((item) => (
      <button
        key={item.label}
        className="flex items-center gap-3 w-full px-3 py-2 rounded-room-sm text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover"
      >
        <item.icon className="h-5 w-5" />
        <span>{item.label}</span>
      </button>
    ))}
  </div>
);

const SampleHeader = () => (
  <div className="flex items-center justify-between px-6 py-3">
    <h1 className="text-lg font-semibold text-room-text-primary">Page Title</h1>
    <Button size="sm">Action</Button>
  </div>
);

const SampleContent = () => (
  <div className="p-6">
    <div className="bg-room-bg-elevated rounded-room border border-room-border p-6">
      <h2 className="text-xl font-semibold text-room-text-primary mb-4">Main Content</h2>
      <p className="text-room-text-secondary">
        This is the main content area. It will take up the remaining space
        after the sidebar and header are rendered.
      </p>
    </div>
  </div>
);

const SampleFooter = () => (
  <div className="px-6 py-3 text-center text-sm text-room-text-muted">
    © 2024 Room UI. All rights reserved.
  </div>
);

// Basic layout
export const Default: Story = {
  args: {
    sidebar: <SampleSidebar />,
    header: <SampleHeader />,
    children: <SampleContent />,
  },
};

// Without sidebar
export const WithoutSidebar: Story = {
  args: {
    header: <SampleHeader />,
    children: <SampleContent />,
  },
};

// With footer
export const WithFooter: Story = {
  args: {
    sidebar: <SampleSidebar />,
    header: <SampleHeader />,
    footer: <SampleFooter />,
    children: <SampleContent />,
  },
};

// Right sidebar
export const RightSidebar: Story = {
  args: {
    sidebar: <SampleSidebar />,
    sidebarPosition: 'right',
    header: <SampleHeader />,
    children: <SampleContent />,
  },
};

// Collapsible sidebar
export const CollapsibleSidebar: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <Layout
        sidebar={
          <div className="p-4 space-y-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center justify-center w-full p-2 rounded-room-sm text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover"
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
            {!collapsed && (
              <>
                <div className="text-lg font-semibold text-room-text-primary mb-4">Logo</div>
                {[
                  { icon: Home, label: 'Dashboard' },
                  { icon: Users, label: 'Users' },
                  { icon: Settings, label: 'Settings' },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-room-sm text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </>
            )}
            {collapsed && (
              <div className="space-y-2">
                {[Home, Users, Settings].map((Icon, i) => (
                  <button
                    key={i}
                    className="flex items-center justify-center w-full p-2 rounded-room-sm text-room-text-secondary hover:text-room-text-primary hover:bg-room-bg-hover"
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            )}
          </div>
        }
        sidebarCollapsed={collapsed}
        onSidebarCollapsedChange={setCollapsed}
        header={<SampleHeader />}
      >
        <SampleContent />
      </Layout>
    );
  },
};

// Custom sidebar width
export const CustomSidebarWidth: Story = {
  args: {
    sidebar: <SampleSidebar />,
    sidebarWidth: 320,
    header: <SampleHeader />,
    children: <SampleContent />,
  },
};

// Content only
export const ContentOnly: Story = {
  args: {
    children: <SampleContent />,
  },
};
