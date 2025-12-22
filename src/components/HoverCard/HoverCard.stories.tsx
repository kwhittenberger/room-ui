import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard } from './HoverCard';
import { Avatar } from '../Avatar';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  args: {
    trigger: <span className="text-cyan-400 cursor-pointer underline">Hover me</span>,
    children: (
      <div>
        <p className="text-slate-100 font-medium">Card Content</p>
        <p className="text-slate-400 text-sm mt-1">
          This content appears when you hover over the trigger.
        </p>
      </div>
    ),
  },
};

export const UserProfile: Story = {
  args: {
    trigger: <Avatar name="John Doe" size="md" />,
    children: (
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Avatar name="John Doe" size="lg" />
          <div>
            <p className="text-slate-100 font-medium">John Doe</p>
            <p className="text-slate-400 text-sm">Software Engineer</p>
          </div>
        </div>
        <p className="text-slate-400 text-sm">
          Building great products at Acme Inc. Based in San Francisco.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
};

export const TopPlacement: Story = {
  args: {
    trigger: <span className="text-cyan-400 cursor-pointer">Hover (top)</span>,
    children: <p className="text-slate-300">This appears above the trigger.</p>,
    placement: 'top',
  },
};

export const LeftPlacement: Story = {
  args: {
    trigger: <span className="text-cyan-400 cursor-pointer">Hover (left)</span>,
    children: <p className="text-slate-300">This appears to the left.</p>,
    placement: 'left',
  },
};

export const RightPlacement: Story = {
  args: {
    trigger: <span className="text-cyan-400 cursor-pointer">Hover (right)</span>,
    children: <p className="text-slate-300">This appears to the right.</p>,
    placement: 'right',
  },
};

export const CustomDelay: Story = {
  args: {
    trigger: <span className="text-cyan-400 cursor-pointer">Slow hover (500ms)</span>,
    children: <p className="text-slate-300">This has a longer delay before appearing.</p>,
    openDelay: 500,
    closeDelay: 200,
  },
};
