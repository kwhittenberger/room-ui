import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Settings, Users, Shield, Database } from 'lucide-react';
import { AdminModal } from './AdminModal';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { Input } from '../Input';
import { Switch } from '../Switch';

const meta: Meta<typeof AdminModal> = {
  title: 'Components/AdminModal',
  component: AdminModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AdminModal>;

const AdminModalDemo = (props: Partial<React.ComponentProps<typeof AdminModal>>) => {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    {
      id: 'general',
      label: 'General',
      icon: <Settings className="h-4 w-4" />,
      content: (
        <Stack gap="md">
          <Input label="Application Name" defaultValue="My App" />
          <Input label="Support Email" defaultValue="support@example.com" />
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Enable Notifications</span>
            <Switch />
          </div>
        </Stack>
      ),
    },
    {
      id: 'users',
      label: 'Users',
      icon: <Users className="h-4 w-4" />,
      content: (
        <div className="text-slate-400">
          <p>User management settings would go here.</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>• Configure user roles</li>
            <li>• Set permission levels</li>
            <li>• Manage invitations</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'security',
      label: 'Security',
      icon: <Shield className="h-4 w-4" />,
      content: (
        <div className="text-slate-400">
          <p>Security settings would go here.</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>• Two-factor authentication</li>
            <li>• Session management</li>
            <li>• API keys</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'database',
      label: 'Database',
      icon: <Database className="h-4 w-4" />,
      content: (
        <div className="text-slate-400">
          <p>Database configuration would go here.</p>
        </div>
      ),
      disabled: true,
    },
  ];

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Admin Modal</Button>
      <AdminModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Admin Settings"
        subtitle="Configure your application settings"
        tabs={tabs}
        {...props}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <AdminModalDemo />,
};

export const WithFooter: Story = {
  render: () => (
    <AdminModalDemo
      footer={
        <Stack direction="horizontal" gap="sm" justify="end">
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </Stack>
      }
    />
  ),
};

export const LargeSize: Story = {
  render: () => <AdminModalDemo size="xl" />,
};

export const MediumSize: Story = {
  render: () => <AdminModalDemo size="md" />,
};
