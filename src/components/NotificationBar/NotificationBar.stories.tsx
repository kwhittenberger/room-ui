import type { Meta, StoryObj } from '@storybook/react';
import { NotificationBar } from './NotificationBar';
import { Stack } from '../Stack';

const meta: Meta<typeof NotificationBar> = {
  title: 'Components/NotificationBar',
  component: NotificationBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NotificationBar>;

export const Default: Story = {
  args: {
    message: 'This is an informational notification.',
    variant: 'info',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack gap="none">
      <NotificationBar
        message="This is an informational message."
        variant="info"
      />
      <NotificationBar
        message="Operation completed successfully!"
        variant="success"
      />
      <NotificationBar
        message="Warning: Your session will expire soon."
        variant="warning"
      />
      <NotificationBar
        message="Error: Unable to save changes."
        variant="error"
      />
    </Stack>
  ),
};

export const WithAction: Story = {
  args: {
    message: 'A new version is available.',
    variant: 'info',
    action: {
      label: 'Update now',
      onClick: () => alert('Update clicked!'),
    },
  },
};

export const NonDismissible: Story = {
  args: {
    message: 'This notification cannot be dismissed.',
    variant: 'warning',
    dismissible: false,
  },
};

export const NoIcon: Story = {
  args: {
    message: 'Notification without an icon.',
    variant: 'info',
    showIcon: false,
  },
};

export const SuccessWithAction: Story = {
  args: {
    message: 'Your changes have been saved.',
    variant: 'success',
    action: {
      label: 'View changes',
      onClick: () => alert('View clicked!'),
    },
  },
};
