import type { Meta, StoryObj } from '@storybook/react';
import { Heart, Star, Zap } from 'lucide-react';
import { CircularProgress } from './CircularProgress';

const meta: Meta<typeof CircularProgress> = {
  title: 'Feedback/CircularProgress',
  component: CircularProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 75,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress value={75} size="sm" showLabel />
      <CircularProgress value={75} size="md" showLabel />
      <CircularProgress value={75} size="lg" showLabel />
      <CircularProgress value={75} size="xl" showLabel />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress value={75} size="lg" variant="default" showLabel />
      <CircularProgress value={75} size="lg" variant="success" showLabel />
      <CircularProgress value={50} size="lg" variant="warning" showLabel />
      <CircularProgress value={25} size="lg" variant="error" showLabel />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress
        value={85}
        size="lg"
        variant="success"
        centerContent={<Heart size={20} className="text-emerald-400" />}
      />
      <CircularProgress
        value={60}
        size="lg"
        variant="warning"
        centerContent={<Star size={20} className="text-amber-400" />}
      />
      <CircularProgress
        value={95}
        size="lg"
        variant="default"
        centerContent={<Zap size={20} className="text-cyan-400" />}
      />
    </div>
  ),
};

export const CustomSize: Story = {
  args: {
    value: 65,
    size: 100,
    strokeWidth: 8,
    showLabel: true,
    variant: 'success',
  },
};

export const CustomFormatter: Story = {
  args: {
    value: 750,
    max: 1000,
    size: 'xl',
    showLabel: true,
    labelFormatter: (value: number, max: number) => `${value}/${max}`,
  },
};
