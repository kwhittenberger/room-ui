import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDialog, useConfirmDialog } from './index';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Trash2, LogOut } from 'lucide-react';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Feedback/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Confirmation dialog for destructive or important actions.

Replaces \`window.confirm()\` with a styled, accessible modal dialog.
Supports different variants (danger, warning, info) and customizable buttons.

## Variants
- **danger** - Red styling, for destructive actions like delete
- **warning** - Amber styling, for potentially risky actions
- **info** - Blue styling, for informational confirmations

## Features
- Accessible modal dialog
- Loading state support
- Customizable buttons
- \`useConfirmDialog\` hook for easy state management

## Usage
\`\`\`tsx
import { ConfirmDialog, useConfirmDialog, Button } from 'room-ui';

function DeleteButton() {
  const confirmDialog = useConfirmDialog();

  const handleDelete = () => {
    confirmDialog.show({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item?',
      variant: 'danger',
      confirmLabel: 'Delete',
      onConfirm: async () => {
        await deleteItem();
      },
    });
  };

  return (
    <>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
      <ConfirmDialog {...confirmDialog.props} />
    </>
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['danger', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

/**
 * Basic danger confirmation dialog
 */
export const Danger: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('Deleted!');
            setIsOpen(false);
          }}
          title="Delete Item?"
          message="Are you sure you want to delete this item? This action cannot be undone."
          variant="danger"
          confirmLabel="Delete"
        />
      </>
    );
  },
};

/**
 * Warning confirmation dialog
 */
export const Warning: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          Reset Settings
        </Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('Reset!');
            setIsOpen(false);
          }}
          title="Reset Settings?"
          message="This will reset all your settings to their default values. Your custom preferences will be lost."
          variant="warning"
          confirmLabel="Reset"
        />
      </>
    );
  },
};

/**
 * Info confirmation dialog
 */
export const Info: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Submit Form</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('Submitted!');
            setIsOpen(false);
          }}
          title="Submit Form?"
          message="You are about to submit this form. Please make sure all information is correct."
          variant="info"
          confirmLabel="Submit"
        />
      </>
    );
  },
};

/**
 * All variants side by side
 */
export const AllVariants: Story = {
  render: () => {
    const [openVariant, setOpenVariant] = useState<string | null>(null);

    const variants = [
      {
        variant: 'danger' as const,
        title: 'Delete Account?',
        message: 'This will permanently delete your account and all associated data.',
        confirmLabel: 'Delete',
        buttonLabel: 'Danger',
        buttonVariant: 'danger' as const,
      },
      {
        variant: 'warning' as const,
        title: 'Discard Changes?',
        message: 'You have unsaved changes that will be lost if you continue.',
        confirmLabel: 'Discard',
        buttonLabel: 'Warning',
        buttonVariant: 'secondary' as const,
      },
      {
        variant: 'info' as const,
        title: 'Publish Article?',
        message: 'Your article will be visible to all users once published.',
        confirmLabel: 'Publish',
        buttonLabel: 'Info',
        buttonVariant: 'primary' as const,
      },
    ];

    return (
      <>
        <Stack direction="horizontal" gap="sm">
          {variants.map((v) => (
            <Button
              key={v.variant}
              variant={v.buttonVariant}
              onClick={() => setOpenVariant(v.variant)}
            >
              {v.buttonLabel}
            </Button>
          ))}
        </Stack>
        {variants.map((v) => (
          <ConfirmDialog
            key={v.variant}
            isOpen={openVariant === v.variant}
            onClose={() => setOpenVariant(null)}
            onConfirm={() => setOpenVariant(null)}
            title={v.title}
            message={v.message}
            variant={v.variant}
            confirmLabel={v.confirmLabel}
          />
        ))}
      </>
    );
  },
};

/**
 * Using the useConfirmDialog hook
 */
export const WithHook: Story = {
  render: () => {
    const confirmDialog = useConfirmDialog();

    const handleDelete = () => {
      confirmDialog.show({
        title: 'Delete Item',
        message: 'Are you sure you want to delete this item? This action cannot be undone.',
        variant: 'danger',
        confirmLabel: 'Delete',
        onConfirm: async () => {
          // Simulate async operation
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log('Item deleted!');
        },
      });
    };

    const handleLogout = () => {
      confirmDialog.show({
        title: 'Log Out',
        message: 'Are you sure you want to log out of your account?',
        variant: 'info',
        confirmLabel: 'Log Out',
        onConfirm: async () => {
          console.log('Logged out!');
        },
      });
    };

    return (
      <>
        <Stack direction="horizontal" gap="sm">
          <Button variant="danger" onClick={handleDelete}>
            Delete Item
          </Button>
          <Button variant="secondary" onClick={handleLogout}>
            Log Out
          </Button>
        </Stack>
        <ConfirmDialog {...confirmDialog.props} />
      </>
    );
  },
};

/**
 * With loading state
 */
export const WithLoading: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
      setIsLoading(true);
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      setIsOpen(false);
      console.log('Operation complete!');
    };

    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete with Loading
        </Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          title="Delete Item?"
          message="This operation may take a few seconds..."
          variant="danger"
          confirmLabel="Delete"
          isLoading={isLoading}
        />
      </>
    );
  },
};

/**
 * With custom icon
 */
export const CustomIcon: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          Log Out
        </Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('Logged out!');
            setIsOpen(false);
          }}
          title="Log Out?"
          message="Are you sure you want to log out of your account?"
          variant="info"
          confirmLabel="Log Out"
          icon={<LogOut className="h-6 w-6 text-room-info" />}
        />
      </>
    );
  },
};

/**
 * Real-world example: Delete user
 */
export const RealWorldExample: Story = {
  render: () => {
    const confirmDialog = useConfirmDialog();

    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ];

    const handleDeleteUser = (user: typeof users[0]) => {
      confirmDialog.show({
        title: `Delete ${user.name}?`,
        message: `Are you sure you want to delete ${user.name} (${user.email})? This action cannot be undone.`,
        variant: 'danger',
        confirmLabel: 'Delete User',
        onConfirm: async () => {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log(`Deleted user: ${user.name}`);
        },
      });
    };

    return (
      <>
        <Stack gap="sm">
          <Text weight="medium">User List</Text>
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 bg-room-bg-surface rounded-room"
            >
              <div>
                <Text weight="medium">{user.name}</Text>
                <Text size="sm" className="text-room-text-muted">
                  {user.email}
                </Text>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteUser(user)}
                icon={Trash2}
              >
                Delete
              </Button>
            </div>
          ))}
        </Stack>
        <ConfirmDialog {...confirmDialog.props} />
      </>
    );
  },
};
