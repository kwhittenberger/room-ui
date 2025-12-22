import type { Meta, StoryObj } from '@storybook/react';
import { StatusBar, addSuccessMessage, addErrorMessage, addWarningMessage, addInfoMessage, statusManager } from './';
import { Button } from '../Button';

const meta: Meta<typeof StatusBar> = {
  title: 'Layout/StatusBar',
  component: StatusBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Clear messages before each story
      statusManager.clearAll();
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof StatusBar>;

// Interactive demo
export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-room-text-primary">Status Bar Demo</h2>
        <p className="text-sm text-room-text-muted">
          Click the buttons below to show different status messages.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => addSuccessMessage('Operation completed successfully!')}
          >
            Show Success
          </Button>
          <Button
            variant="outline"
            onClick={() => addErrorMessage('An error occurred. Please try again.')}
          >
            Show Error
          </Button>
          <Button
            variant="outline"
            onClick={() => addWarningMessage('Please review your changes before saving.')}
          >
            Show Warning
          </Button>
          <Button
            variant="outline"
            onClick={() => addInfoMessage('New updates are available.')}
          >
            Show Info
          </Button>
          <Button
            variant="ghost"
            onClick={() => statusManager.clearAll()}
          >
            Clear All
          </Button>
        </div>
      </div>
      <StatusBar />
    </div>
  ),
};

// Top position
export const TopPosition: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-room-text-primary">Top Position</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => addSuccessMessage('Message at top!')}
          >
            Add Message
          </Button>
        </div>
      </div>
      <StatusBar position="top" />
    </div>
  ),
};

// Max messages limit
export const MaxMessages: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-room-text-primary">Max 3 Messages</h2>
        <p className="text-sm text-room-text-muted">
          Only the 3 most recent messages will be shown.
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              for (let i = 1; i <= 5; i++) {
                setTimeout(() => {
                  addInfoMessage(`Message ${i} of 5`);
                }, i * 300);
              }
            }}
          >
            Add 5 Messages
          </Button>
        </div>
      </div>
      <StatusBar maxMessages={3} />
    </div>
  ),
};

// Auto dismiss
export const AutoDismiss: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-room-text-primary">Auto Dismiss</h2>
        <p className="text-sm text-room-text-muted">
          Success and info messages auto-dismiss after a few seconds.
          Error messages persist until manually dismissed.
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => addSuccessMessage('This will disappear in 5 seconds', 5000)}
          >
            Success (5s)
          </Button>
          <Button
            variant="outline"
            onClick={() => addErrorMessage('This stays until dismissed')}
          >
            Error (No auto-dismiss)
          </Button>
        </div>
      </div>
      <StatusBar />
    </div>
  ),
};

// All message types
export const AllTypes: Story = {
  render: () => {
    // Add sample messages on mount
    setTimeout(() => {
      addSuccessMessage('File uploaded successfully');
      addErrorMessage('Failed to save changes');
      addWarningMessage('Your session will expire soon');
      addInfoMessage('3 new notifications');
    }, 100);

    return (
      <div className="min-h-screen bg-room-bg-base p-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-room-text-primary">All Message Types</h2>
          <p className="text-sm text-room-text-muted">
            Showing all four message types at once.
          </p>
        </div>
        <StatusBar />
      </div>
    );
  },
};
