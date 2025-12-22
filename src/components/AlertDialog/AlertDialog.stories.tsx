import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AlertDialog } from './AlertDialog';
import { Button } from '../Button';

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

const AlertDialogDemo = (props: Partial<React.ComponentProps<typeof AlertDialog>>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Alert</Button>
      <AlertDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        description="Are you sure you want to proceed with this action?"
        onConfirm={() => setIsOpen(false)}
        {...props}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <AlertDialogDemo />,
};

export const InfoVariant: Story = {
  render: () => (
    <AlertDialogDemo
      variant="info"
      title="Information"
      description="This is an informational message for your attention."
    />
  ),
};

export const WarningVariant: Story = {
  render: () => (
    <AlertDialogDemo
      variant="warning"
      title="Warning"
      description="This action may have unintended consequences. Please review before proceeding."
    />
  ),
};

export const ErrorVariant: Story = {
  render: () => (
    <AlertDialogDemo
      variant="error"
      title="Error"
      description="An error occurred. Please try again or contact support."
    />
  ),
};

export const SuccessVariant: Story = {
  render: () => (
    <AlertDialogDemo
      variant="success"
      title="Success"
      description="Your action was completed successfully!"
    />
  ),
};

export const DestructiveAction: Story = {
  render: () => (
    <AlertDialogDemo
      variant="error"
      title="Delete Item"
      description="This action cannot be undone. Are you sure you want to delete this item?"
      confirmText="Delete"
      destructive
    />
  ),
};

export const CustomButtons: Story = {
  render: () => (
    <AlertDialogDemo
      title="Custom Buttons"
      description="This dialog has custom button text."
      confirmText="Yes, Continue"
      cancelText="No, Go Back"
    />
  ),
};
