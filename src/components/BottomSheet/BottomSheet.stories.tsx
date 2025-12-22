import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Share, Copy, Download, Trash2 } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Input } from '../Input';
import { FormField } from '../FormField';

const meta: Meta<typeof BottomSheet> = {
  title: 'Mobile/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  render: function DefaultStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen bg-room-bg-base p-4">
        <Button onClick={() => setIsOpen(true)}>Open Bottom Sheet</Button>
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Options">
          <Stack gap="sm" className="p-4">
            <button className="flex items-center gap-3 p-3 rounded-room hover:bg-room-bg-hover transition-colors w-full text-left">
              <Share className="h-5 w-5 text-room-text-muted" />
              <Text>Share</Text>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-room hover:bg-room-bg-hover transition-colors w-full text-left">
              <Copy className="h-5 w-5 text-room-text-muted" />
              <Text>Copy link</Text>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-room hover:bg-room-bg-hover transition-colors w-full text-left">
              <Download className="h-5 w-5 text-room-text-muted" />
              <Text>Download</Text>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-room hover:bg-room-bg-hover transition-colors w-full text-left text-room-error">
              <Trash2 className="h-5 w-5" />
              <Text color="error">Delete</Text>
            </button>
          </Stack>
        </BottomSheet>
      </div>
    );
  },
};

export const WithSnapPoints: Story = {
  render: function SnapPointsStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen bg-room-bg-base p-4">
        <Button onClick={() => setIsOpen(true)}>Open Expandable Sheet</Button>
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Expandable Content"
          snapPoints={[30, 60, 90]}
          defaultSnapPoint={1}
        >
          <Stack gap="md" className="p-4">
            <Text color="muted">
              Drag the handle to expand or collapse this sheet. It will snap to
              30%, 60%, or 90% of the screen height.
            </Text>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="p-4 bg-room-bg-elevated rounded-room">
                <Text>Item {i + 1}</Text>
              </div>
            ))}
          </Stack>
        </BottomSheet>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: function FormStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen bg-room-bg-base p-4">
        <Button onClick={() => setIsOpen(true)}>Open Form Sheet</Button>
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit Profile">
          <Stack gap="md" className="p-4">
            <FormField label="Name">
              <Input placeholder="Enter your name" />
            </FormField>
            <FormField label="Email">
              <Input type="email" placeholder="Enter your email" />
            </FormField>
            <FormField label="Bio">
              <Input placeholder="Tell us about yourself" />
            </FormField>
            <Stack direction="horizontal" gap="md" className="mt-4">
              <Button variant="ghost" onClick={() => setIsOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)} className="flex-1">
                Save
              </Button>
            </Stack>
          </Stack>
        </BottomSheet>
      </div>
    );
  },
};

export const FullHeight: Story = {
  render: function FullHeightStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen bg-room-bg-base p-4">
        <Button onClick={() => setIsOpen(true)}>Open Full Sheet</Button>
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Settings"
          snapPoints={[95]}
          defaultSnapPoint={0}
        >
          <Stack gap="lg" className="p-4">
            <Text weight="semibold" size="lg">General Settings</Text>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="p-4 border border-room-border rounded-room">
                <Text>Setting option {i + 1}</Text>
              </div>
            ))}
          </Stack>
        </BottomSheet>
      </div>
    );
  },
};

export const NotDismissible: Story = {
  render: function NotDismissibleStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen bg-room-bg-base p-4">
        <Button onClick={() => setIsOpen(true)}>Open Non-Dismissible Sheet</Button>
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Important"
          dismissible={false}
        >
          <Stack gap="md" className="p-4">
            <Text>This sheet can only be closed using the X button or the button below.</Text>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Stack>
        </BottomSheet>
      </div>
    );
  },
};
