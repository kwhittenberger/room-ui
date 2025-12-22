import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { Stack } from '../Stack';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithLabel: Story = {
  args: {
    value: 75,
    label: 'Upload Progress',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Variants: Story = {
  render: () => (
    <Stack gap="md" style={{ width: '300px' }}>
      <Progress value={60} variant="default" label="Default" showLabel />
      <Progress value={100} variant="success" label="Success" showLabel />
      <Progress value={45} variant="warning" label="Warning" showLabel />
      <Progress value={30} variant="error" label="Error" showLabel />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="md" style={{ width: '300px' }}>
      <Progress value={60} size="sm" label="Small" showLabel />
      <Progress value={60} size="md" label="Medium" showLabel />
      <Progress value={60} size="lg" label="Large" showLabel />
    </Stack>
  ),
};

export const Indeterminate: Story = {
  args: {
    value: 0,
    indeterminate: true,
    label: 'Loading...',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Animated: Story = {
  args: {
    value: 80,
    animated: true,
    label: 'Processing',
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
