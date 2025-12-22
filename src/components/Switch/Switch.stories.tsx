import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './index';
import { Stack } from '../Stack';
import { Text } from '../Text';

const meta: Meta<typeof Switch> = {
  title: 'Form Controls/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Switch component for toggling between two states.

## Features
- Controlled and uncontrolled modes
- Multiple sizes
- Label positioning
- Disabled state
- Keyboard accessible

## Usage
\`\`\`tsx
import { Switch } from 'room-ui';

<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Enable notifications"
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/**
 * Basic switch
 */
export const Basic: Story = {
  render: () => <Switch />,
};

/**
 * With label
 */
export const WithLabel: Story = {
  render: () => <Switch label="Enable feature" />,
};

/**
 * Label positions
 */
export const LabelPositions: Story = {
  render: () => (
    <Stack gap="lg">
      <Switch label="Label on right (default)" labelPosition="right" />
      <Switch label="Label on left" labelPosition="left" />
    </Stack>
  ),
};

/**
 * Sizes
 */
export const Sizes: Story = {
  render: () => (
    <Stack gap="lg">
      <Switch size="sm" label="Small" defaultChecked />
      <Switch size="md" label="Medium (default)" defaultChecked />
      <Switch size="lg" label="Large" defaultChecked />
    </Stack>
  ),
};

/**
 * States
 */
export const States: Story = {
  render: () => (
    <Stack gap="lg">
      <Switch label="Unchecked" />
      <Switch label="Checked" defaultChecked />
      <Switch label="Disabled unchecked" disabled />
      <Switch label="Disabled checked" disabled defaultChecked />
    </Stack>
  ),
};

/**
 * Controlled switch
 */
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Stack gap="md">
        <Switch
          checked={checked}
          onChange={setChecked}
          label="Controlled switch"
        />
        <Text size="sm" className="text-room-text-muted">
          Switch is: {checked ? 'ON' : 'OFF'}
        </Text>
        <button
          onClick={() => setChecked(!checked)}
          className="px-3 py-1.5 text-sm bg-room-bg-surface border border-room-border rounded-room-sm hover:bg-room-bg-hover"
        >
          Toggle programmatically
        </button>
      </Stack>
    );
  },
};

/**
 * Settings panel example
 */
export const SettingsPanel: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [autoSave, setAutoSave] = useState(false);
    const [analytics, setAnalytics] = useState(true);

    return (
      <div className="w-80 p-4 bg-room-bg-elevated border border-room-border rounded-room">
        <Text weight="semibold" className="mb-4">Settings</Text>
        <Stack gap="md">
          <div className="flex items-center justify-between">
            <div>
              <Text size="sm" weight="medium">Notifications</Text>
              <Text size="xs" className="text-room-text-muted">Receive push notifications</Text>
            </div>
            <Switch checked={notifications} onChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Text size="sm" weight="medium">Dark Mode</Text>
              <Text size="xs" className="text-room-text-muted">Use dark color scheme</Text>
            </div>
            <Switch checked={darkMode} onChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Text size="sm" weight="medium">Auto-save</Text>
              <Text size="xs" className="text-room-text-muted">Save changes automatically</Text>
            </div>
            <Switch checked={autoSave} onChange={setAutoSave} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Text size="sm" weight="medium">Analytics</Text>
              <Text size="xs" className="text-room-text-muted">Help improve the product</Text>
            </div>
            <Switch checked={analytics} onChange={setAnalytics} />
          </div>
        </Stack>
      </div>
    );
  },
};

/**
 * Form integration
 */
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      marketing: false,
      updates: true,
      newsletter: false,
    });

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Form submitted:', formData);
        }}
        className="w-80 p-4 bg-room-bg-surface border border-room-border rounded-room"
      >
        <Text weight="semibold" className="mb-4">Email Preferences</Text>
        <Stack gap="sm">
          <Switch
            name="marketing"
            checked={formData.marketing}
            onChange={(checked) => setFormData({ ...formData, marketing: checked })}
            label="Marketing emails"
          />
          <Switch
            name="updates"
            checked={formData.updates}
            onChange={(checked) => setFormData({ ...formData, updates: checked })}
            label="Product updates"
          />
          <Switch
            name="newsletter"
            checked={formData.newsletter}
            onChange={(checked) => setFormData({ ...formData, newsletter: checked })}
            label="Weekly newsletter"
          />
        </Stack>
        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover"
        >
          Save preferences
        </button>
      </form>
    );
  },
};
