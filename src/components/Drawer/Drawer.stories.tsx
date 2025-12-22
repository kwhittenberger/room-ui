import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../Button';
import { Stack } from '../Stack';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const DrawerDemo = (props: Partial<React.ComponentProps<typeof Drawer>>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Drawer Title"
        {...props}
      >
        <div className="space-y-4">
          <p className="text-slate-300">This is the drawer content.</p>
          <p className="text-slate-400 text-sm">
            You can put any content here, including forms, lists, or other components.
          </p>
        </div>
      </Drawer>
    </>
  );
};

export const Default: Story = {
  render: () => <DrawerDemo />,
};

export const LeftPlacement: Story = {
  render: () => <DrawerDemo placement="left" title="Left Drawer" />,
};

export const TopPlacement: Story = {
  render: () => <DrawerDemo placement="top" title="Top Drawer" size="md" />,
};

export const BottomPlacement: Story = {
  render: () => <DrawerDemo placement="bottom" title="Bottom Drawer" size="md" />,
};

export const SmallSize: Story = {
  render: () => <DrawerDemo size="sm" title="Small Drawer" />,
};

export const LargeSize: Story = {
  render: () => <DrawerDemo size="lg" title="Large Drawer" />,
};

export const WithFooter: Story = {
  render: () => (
    <DrawerDemo
      title="Drawer with Footer"
      footer={
        <Stack direction="horizontal" gap="sm" justify="end">
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </Stack>
      }
    />
  ),
};

export const NoCloseButton: Story = {
  render: () => <DrawerDemo showCloseButton={false} title="No Close Button" />,
};
