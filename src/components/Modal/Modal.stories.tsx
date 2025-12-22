import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalFooter } from './index';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { FormField } from '../FormField';

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Modal dialogs for displaying content that requires user attention or interaction.

## Features
- Multiple sizes: sm, md, lg, xl, full
- Animation variants: scale, slide-up, slide-down, fade, none
- Scrollable content support
- Keyboard navigation (Escape to close)
- Click outside to close
- Focus trap for accessibility

## Usage
\`\`\`tsx
import { Modal, ModalFooter, Button } from 'room-ui';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit User"
      >
        <form>
          {/* form content */}
        </form>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button>Save</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    animation: {
      control: 'select',
      options: ['scale', 'slide-up', 'slide-down', 'fade', 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * Basic modal with default settings
 */
export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Title"
        >
          <Text>
            This is a basic modal with default settings. Click outside or press
            Escape to close.
          </Text>
        </Modal>
      </>
    );
  },
};

/**
 * Modal with form and footer actions
 */
export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Edit User</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Edit User"
        >
          <Stack gap="md">
            <FormField label="Name" required>
              <Input placeholder="Enter name" defaultValue="John Doe" />
            </FormField>
            <FormField label="Email" required>
              <Input
                type="email"
                placeholder="Enter email"
                defaultValue="john@example.com"
              />
            </FormField>
            <FormField label="Bio">
              <TextArea placeholder="Tell us about yourself..." rows={3} />
            </FormField>
          </Stack>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

/**
 * Different modal sizes
 */
export const Sizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<string | null>(null);

    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;

    return (
      <>
        <Stack direction="horizontal" gap="sm" wrap>
          {sizes.map((size) => (
            <Button
              key={size}
              variant="outline"
              onClick={() => setOpenSize(size)}
            >
              {size.toUpperCase()}
            </Button>
          ))}
        </Stack>
        {sizes.map((size) => (
          <Modal
            key={size}
            isOpen={openSize === size}
            onClose={() => setOpenSize(null)}
            title={`${size.toUpperCase()} Modal`}
            size={size}
          >
            <Text>
              This is a {size} modal. The content area adjusts based on the
              selected size.
            </Text>
            <ModalFooter>
              <Button onClick={() => setOpenSize(null)}>Close</Button>
            </ModalFooter>
          </Modal>
        ))}
      </>
    );
  },
};

/**
 * Different animation variants
 */
export const Animations: Story = {
  render: () => {
    const [openAnim, setOpenAnim] = useState<string | null>(null);

    const animations = ['scale', 'slide-up', 'slide-down', 'fade', 'none'] as const;

    return (
      <>
        <Stack direction="horizontal" gap="sm" wrap>
          {animations.map((anim) => (
            <Button
              key={anim}
              variant="outline"
              onClick={() => setOpenAnim(anim)}
            >
              {anim}
            </Button>
          ))}
        </Stack>
        {animations.map((anim) => (
          <Modal
            key={anim}
            isOpen={openAnim === anim}
            onClose={() => setOpenAnim(null)}
            title={`${anim} Animation`}
            animation={anim}
          >
            <Text>
              This modal uses the &quot;{anim}&quot; animation variant.
            </Text>
            <ModalFooter>
              <Button onClick={() => setOpenAnim(null)}>Close</Button>
            </ModalFooter>
          </Modal>
        ))}
      </>
    );
  },
};

/**
 * Scrollable modal for long content
 */
export const Scrollable: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Scrollable Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Terms and Conditions"
          scrollable
        >
          <Stack gap="md">
            {Array.from({ length: 20 }).map((_, i) => (
              <Text key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            ))}
          </Stack>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setIsOpen(false)}>Accept</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

/**
 * Modal with custom max height
 */
export const CustomMaxHeight: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Document Preview"
          maxHeight="300px"
          size="lg"
        >
          <Stack gap="md">
            {Array.from({ length: 10 }).map((_, i) => (
              <Text key={i}>
                Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </Text>
            ))}
          </Stack>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

/**
 * Modal without close button
 */
export const NoCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Important Notice"
          showCloseButton={false}
        >
          <Text>
            This modal doesn't have a close button. You must use the action
            buttons or press Escape to close it.
          </Text>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>I Understand</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

/**
 * Confirmation modal pattern
 */
export const ConfirmationPattern: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Delete Item?"
          size="sm"
        >
          <Text>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </Text>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setIsOpen(false)}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

/**
 * Nested modals
 */
export const NestedModals: Story = {
  render: () => {
    const [isFirstOpen, setIsFirstOpen] = useState(false);
    const [isSecondOpen, setIsSecondOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsFirstOpen(true)}>Open First Modal</Button>
        <Modal
          isOpen={isFirstOpen}
          onClose={() => setIsFirstOpen(false)}
          title="First Modal"
        >
          <Stack gap="md">
            <Text>This is the first modal. You can open another modal from here.</Text>
            <Button onClick={() => setIsSecondOpen(true)}>
              Open Second Modal
            </Button>
          </Stack>
          <ModalFooter>
            <Button onClick={() => setIsFirstOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={isSecondOpen}
          onClose={() => setIsSecondOpen(false)}
          title="Second Modal"
          size="sm"
        >
          <Text>This is a nested modal!</Text>
          <ModalFooter>
            <Button onClick={() => setIsSecondOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
