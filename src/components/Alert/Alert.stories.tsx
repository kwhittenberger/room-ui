import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './index';
import { Stack } from '../Stack';
import { Button } from '../Button';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Alert banners for displaying important messages to users.

## Variants
- **success** - Green, for successful operations or positive messages
- **error** - Red, for errors and critical issues
- **warning** - Amber, for warnings and caution notices
- **info** - Blue, for informational messages

## Features
- Optional title
- Dismissible with close button
- Action buttons support
- Dark theme optimized colors

## Usage
\`\`\`tsx
import { Alert } from 'room-ui';

// Basic alert
<Alert variant="success">Your changes have been saved.</Alert>

// With title
<Alert variant="error" title="Error">
  Something went wrong. Please try again.
</Alert>

// Dismissible
<Alert variant="info" onClose={() => setVisible(false)}>
  New features are available!
</Alert>

// With actions
<Alert
  variant="warning"
  title="Unsaved Changes"
  actions={[
    { label: 'Save', onClick: handleSave },
    { label: 'Discard', onClick: handleDiscard, variant: 'secondary' },
  ]}
>
  You have unsaved changes that will be lost.
</Alert>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

/**
 * All alert variants
 */
export const AllVariants: Story = {
  render: () => (
    <Stack gap="md">
      <Alert variant="success">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="error">
        Something went wrong. Please try again later.
      </Alert>
      <Alert variant="warning">
        Please review your information before proceeding.
      </Alert>
      <Alert variant="info">
        A new version is available. Refresh to update.
      </Alert>
    </Stack>
  ),
};

/**
 * Alerts with titles
 */
export const WithTitles: Story = {
  render: () => (
    <Stack gap="md">
      <Alert variant="success" title="Success">
        Your profile has been updated successfully.
      </Alert>
      <Alert variant="error" title="Error">
        Failed to save your changes. Please check your connection and try again.
      </Alert>
      <Alert variant="warning" title="Warning">
        Your session will expire in 5 minutes.
      </Alert>
      <Alert variant="info" title="Information">
        Scheduled maintenance will occur this weekend.
      </Alert>
    </Stack>
  ),
};

/**
 * Dismissible alerts
 */
export const Dismissible: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      { id: 1, variant: 'success' as const, message: 'Dismissible success alert' },
      { id: 2, variant: 'error' as const, message: 'Dismissible error alert' },
      { id: 3, variant: 'warning' as const, message: 'Dismissible warning alert' },
      { id: 4, variant: 'info' as const, message: 'Dismissible info alert' },
    ]);

    const handleClose = (id: number) => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    const handleReset = () => {
      setAlerts([
        { id: 1, variant: 'success', message: 'Dismissible success alert' },
        { id: 2, variant: 'error', message: 'Dismissible error alert' },
        { id: 3, variant: 'warning', message: 'Dismissible warning alert' },
        { id: 4, variant: 'info', message: 'Dismissible info alert' },
      ]);
    };

    return (
      <Stack gap="md">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.variant}
            onClose={() => handleClose(alert.id)}
          >
            {alert.message}
          </Alert>
        ))}
        {alerts.length === 0 && (
          <Button onClick={handleReset}>Reset Alerts</Button>
        )}
      </Stack>
    );
  },
};

/**
 * Alerts with action buttons
 */
export const WithActions: Story = {
  render: () => (
    <Stack gap="md">
      <Alert
        variant="success"
        title="File Uploaded"
        actions={[
          { label: 'View File', onClick: () => alert('View clicked') },
        ]}
      >
        Your file has been uploaded successfully.
      </Alert>
      <Alert
        variant="error"
        title="Connection Lost"
        actions={[
          { label: 'Retry', onClick: () => alert('Retry clicked') },
          { label: 'Cancel', onClick: () => alert('Cancel clicked'), variant: 'secondary' },
        ]}
      >
        Unable to connect to the server. Please check your internet connection.
      </Alert>
      <Alert
        variant="warning"
        title="Unsaved Changes"
        actions={[
          { label: 'Save Now', onClick: () => alert('Save clicked') },
          { label: 'Discard', onClick: () => alert('Discard clicked'), variant: 'secondary' },
        ]}
      >
        You have unsaved changes that will be lost if you leave this page.
      </Alert>
      <Alert
        variant="info"
        title="New Features Available"
        actions={[
          { label: 'Learn More', onClick: () => alert('Learn More clicked') },
          { label: 'Dismiss', onClick: () => alert('Dismiss clicked'), variant: 'secondary' },
        ]}
      >
        We've added new features to improve your experience.
      </Alert>
    </Stack>
  ),
};

/**
 * Long content handling
 */
export const LongContent: Story = {
  render: () => (
    <Stack gap="md">
      <Alert variant="info" title="Terms of Service Update">
        We have updated our Terms of Service effective January 1, 2025. The key
        changes include updates to our privacy policy, data handling procedures,
        and user agreement clauses. Please review the complete document to
        understand how these changes may affect your use of our services.
        Continued use of our platform constitutes acceptance of these updated
        terms.
      </Alert>
      <Alert
        variant="warning"
        title="Security Notice"
        onClose={() => {}}
        actions={[
          { label: 'Review Settings', onClick: () => {} },
          { label: 'Remind Later', onClick: () => {}, variant: 'secondary' },
        ]}
      >
        Your account security could be improved. We recommend enabling
        two-factor authentication and reviewing your connected applications.
        Strong security practices help protect your data and prevent
        unauthorized access to your account.
      </Alert>
    </Stack>
  ),
};

/**
 * Inline alerts (without title, compact)
 */
export const InlineAlerts: Story = {
  render: () => (
    <Stack gap="sm">
      <Alert variant="success">Changes saved.</Alert>
      <Alert variant="error">Invalid email format.</Alert>
      <Alert variant="warning">Password is weak.</Alert>
      <Alert variant="info">Optional field.</Alert>
    </Stack>
  ),
};
