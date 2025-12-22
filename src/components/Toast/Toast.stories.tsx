import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastContainer, ToastProps, ToastType, ToastPosition } from './index';
import { addSuccessMessage, addErrorMessage, addWarningMessage, addInfoMessage } from './statusManager';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { Text } from '../Text';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Toast notifications for displaying brief, non-blocking messages to users.

## Two Toast Systems

room-ui provides two toast systems:

### 1. Toast Component (Popup Style)
Traditional popup toasts that appear in corners of the screen. Good for standalone apps.

\`\`\`tsx
<ToastContainer toasts={toasts} onClose={handleClose} position="top-right" />
\`\`\`

### 2. StatusManager Functions (Recommended)
Global toast functions that can be called from anywhere in your app.

\`\`\`tsx
import { addSuccessMessage, addErrorMessage } from 'room-ui';

// Anywhere in your app:
addSuccessMessage('Changes saved successfully');
addErrorMessage('Failed to save changes');
\`\`\`

## Types
- **success** - Green, for successful operations
- **error** - Red, for errors and failures  
- **warning** - Amber, for warnings
- **info** - Blue, for informational messages

## Features
- Auto-dismiss after configurable duration
- Manual dismiss with X button
- Optional action button (e.g., Undo)
- Slide-in/out animations
- Multiple toast stacking
- Position customization
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Helper to generate unique IDs
let toastId = 0;
const generateId = () => `toast-${++toastId}`;

/**
 * Individual Toast component - typically used via ToastContainer
 */
export const SingleToast: Story = {
  render: () => (
    <Toast
      id="demo-toast"
      type="success"
      title="Changes saved"
      message="Your changes have been saved successfully."
      duration={0} // Don't auto-close for demo
      onClose={() => console.log('Toast closed')}
    />
  ),
};

/**
 * All toast types side by side
 */
export const AllTypes: Story = {
  render: () => (
    <Stack gap="md">
      <Toast
        id="success-toast"
        type="success"
        title="Success"
        message="Operation completed successfully."
        duration={0}
        onClose={() => {}}
      />
      <Toast
        id="error-toast"
        type="error"
        title="Error"
        message="Something went wrong. Please try again."
        duration={0}
        onClose={() => {}}
      />
      <Toast
        id="warning-toast"
        type="warning"
        title="Warning"
        message="This action may have unintended consequences."
        duration={0}
        onClose={() => {}}
      />
      <Toast
        id="info-toast"
        type="info"
        title="Information"
        message="Here's some helpful information for you."
        duration={0}
        onClose={() => {}}
      />
    </Stack>
  ),
};

/**
 * Toast with action button (e.g., Undo)
 */
export const WithAction: Story = {
  render: () => (
    <Stack gap="md">
      <Toast
        id="undo-toast"
        type="success"
        title="Item deleted"
        message="The item has been moved to trash."
        duration={0}
        onClose={() => {}}
        action={{
          label: 'Undo',
          onClick: () => alert('Undo clicked!'),
        }}
      />
      <Toast
        id="retry-toast"
        type="error"
        title="Upload failed"
        message="Could not upload file. Check your connection."
        duration={0}
        onClose={() => {}}
        action={{
          label: 'Retry',
          onClick: () => alert('Retry clicked!'),
        }}
      />
    </Stack>
  ),
};

/**
 * Interactive demo with ToastContainer
 */
export const InteractiveDemo: Story = {
  render: () => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    const [position, setPosition] = useState<ToastPosition>('top-right');

    const addToast = (type: ToastType, title: string, message: string, action?: ToastProps['action']) => {
      const newToast: ToastProps = {
        id: generateId(),
        type,
        title,
        message,
        duration: 5000,
        onClose: () => {},
        action,
      };
      setToasts(prev => [...prev, newToast]);
    };

    const handleClose = (id: string) => {
      setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
      <>
        <Stack gap="lg">
          <div>
            <Text weight="medium" className="mb-2">Position:</Text>
            <Stack direction="horizontal" gap="sm" wrap>
              {(['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'] as ToastPosition[]).map((pos) => (
                <Button
                  key={pos}
                  variant={position === pos ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setPosition(pos)}
                >
                  {pos}
                </Button>
              ))}
            </Stack>
          </div>

          <div>
            <Text weight="medium" className="mb-2">Add Toast:</Text>
            <Stack direction="horizontal" gap="sm" wrap>
              <Button
                variant="outline"
                onClick={() => addToast('success', 'Success!', 'Operation completed successfully.')}
              >
                Success
              </Button>
              <Button
                variant="outline"
                onClick={() => addToast('error', 'Error!', 'Something went wrong.')}
              >
                Error
              </Button>
              <Button
                variant="outline"
                onClick={() => addToast('warning', 'Warning!', 'Please proceed with caution.')}
              >
                Warning
              </Button>
              <Button
                variant="outline"
                onClick={() => addToast('info', 'Info', 'Here is some information.')}
              >
                Info
              </Button>
              <Button
                variant="outline"
                onClick={() => addToast('success', 'Item deleted', 'The item has been removed.', {
                  label: 'Undo',
                  onClick: () => alert('Undo action!'),
                })}
              >
                With Undo
              </Button>
            </Stack>
          </div>

          <div>
            <Text size="sm" className="text-room-text-muted">
              Active toasts: {toasts.length}
            </Text>
          </div>
        </Stack>

        <ToastContainer
          toasts={toasts}
          onClose={handleClose}
          position={position}
        />
      </>
    );
  },
};

/**
 * Using global status functions (recommended approach)
 */
export const GlobalStatusFunctions: Story = {
  render: () => (
    <Stack gap="lg">
      <div className="p-4 bg-room-bg-surface rounded-room">
        <Text weight="medium" className="mb-2">Recommended: Use StatusManager Functions</Text>
        <Text size="sm" className="text-room-text-secondary mb-4">
          These functions work globally and can be called from anywhere in your app.
        </Text>
        <pre className="text-xs bg-room-bg-elevated p-3 rounded-room overflow-x-auto text-room-text-primary">
{`import { addSuccessMessage, addErrorMessage } from 'room-ui';

// Call from anywhere:
addSuccessMessage('Changes saved');
addErrorMessage('Failed to save');`}
        </pre>
      </div>

      <Stack direction="horizontal" gap="sm" wrap>
        <Button
          variant="outline"
          onClick={() => addSuccessMessage('Changes saved successfully!')}
        >
          Success Message
        </Button>
        <Button
          variant="outline"
          onClick={() => addErrorMessage('Failed to save changes')}
        >
          Error Message
        </Button>
        <Button
          variant="outline"
          onClick={() => addWarningMessage('This action cannot be undone')}
        >
          Warning Message
        </Button>
        <Button
          variant="outline"
          onClick={() => addInfoMessage('New version available')}
        >
          Info Message
        </Button>
      </Stack>

      <Text size="sm" className="text-room-text-muted">
        Note: Messages are stored in the statusManager. 
        Use statusManager.subscribe() to listen for changes.
      </Text>
    </Stack>
  ),
};

/**
 * Long content handling
 */
export const LongContent: Story = {
  render: () => (
    <Stack gap="md">
      <Toast
        id="long-title"
        type="warning"
        title="This is a very long title that might wrap to multiple lines in the toast"
        message="Short message."
        duration={0}
        onClose={() => {}}
      />
      <Toast
        id="long-message"
        type="info"
        title="Long Message"
        message="This is a much longer message that contains a lot of information. It demonstrates how the toast component handles longer content that might need to wrap across multiple lines while still maintaining readability and proper formatting."
        duration={0}
        onClose={() => {}}
      />
    </Stack>
  ),
};

/**
 * Stacked toasts (multiple at once)
 */
export const StackedToasts: Story = {
  render: () => {
    const [toasts, setToasts] = useState<ToastProps[]>([
      { id: '1', type: 'success', title: 'First toast', message: 'This appeared first.', duration: 0, onClose: () => {} },
      { id: '2', type: 'info', title: 'Second toast', message: 'This appeared second.', duration: 0, onClose: () => {} },
      { id: '3', type: 'warning', title: 'Third toast', message: 'This appeared third.', duration: 0, onClose: () => {} },
    ]);

    const handleClose = (id: string) => {
      setToasts(prev => prev.filter(t => t.id !== id));
    };

    const addMore = () => {
      setToasts(prev => [...prev, {
        id: generateId(),
        type: ['success', 'error', 'warning', 'info'][Math.floor(Math.random() * 4)] as ToastType,
        title: 'New toast',
        message: 'Another toast has been added.',
        duration: 5000,
        onClose: () => {},
      }]);
    };

    return (
      <>
        <Stack gap="md">
          <Button onClick={addMore}>Add Another Toast</Button>
          <Text size="sm" className="text-room-text-muted">
            {toasts.length} toast(s) visible
          </Text>
        </Stack>
        <ToastContainer toasts={toasts} onClose={handleClose} position="top-right" />
      </>
    );
  },
};

/**
 * Real-world example: Form submission
 */
export const FormSubmissionExample: Story = {
  render: () => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = (id: string) => {
      setToasts(prev => prev.filter(t => t.id !== id));
    };

    const simulateSubmit = async (success: boolean) => {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      
      if (success) {
        setToasts(prev => [...prev, {
          id: generateId(),
          type: 'success',
          title: 'Form submitted',
          message: 'Your data has been saved successfully.',
          duration: 5000,
          onClose: () => {},
        }]);
      } else {
        setToasts(prev => [...prev, {
          id: generateId(),
          type: 'error',
          title: 'Submission failed',
          message: 'Could not save your data. Please try again.',
          duration: 5000,
          onClose: () => {},
          action: {
            label: 'Retry',
            onClick: () => simulateSubmit(true),
          },
        }]);
      }
    };

    return (
      <>
        <Stack gap="md" className="max-w-sm">
          <Text weight="medium">Simulated Form Submission</Text>
          <Stack direction="horizontal" gap="sm">
            <Button
              onClick={() => simulateSubmit(true)}
              loading={isSubmitting}
            >
              Submit (Success)
            </Button>
            <Button
              variant="outline"
              onClick={() => simulateSubmit(false)}
              loading={isSubmitting}
            >
              Submit (Fail)
            </Button>
          </Stack>
        </Stack>
        <ToastContainer toasts={toasts} onClose={handleClose} position="top-right" />
      </>
    );
  },
};
