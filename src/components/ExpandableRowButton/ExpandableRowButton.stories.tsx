import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ExpandableRowButton } from './ExpandableRowButton';
import { Stack } from '../Stack';

const meta: Meta<typeof ExpandableRowButton> = {
  title: 'Components/ExpandableRowButton',
  component: ExpandableRowButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ExpandableRowButton>;

const ExpandableRowButtonDemo = (props: Partial<React.ComponentProps<typeof ExpandableRowButton>>) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <ExpandableRowButton
        expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        {...props}
      />
      <span className="text-slate-300">
        {expanded ? 'Expanded' : 'Collapsed'}
      </span>
    </div>
  );
};

export const Default: Story = {
  render: () => <ExpandableRowButtonDemo />,
};

export const Expanded: Story = {
  args: {
    expanded: true,
    onClick: () => {},
  },
};

export const Collapsed: Story = {
  args: {
    expanded: false,
    onClick: () => {},
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="lg" align="start">
      <div className="flex items-center gap-4">
        <ExpandableRowButton expanded={false} onClick={() => {}} size="sm" />
        <span className="text-slate-400 text-sm">Small</span>
      </div>
      <div className="flex items-center gap-4">
        <ExpandableRowButton expanded={false} onClick={() => {}} size="md" />
        <span className="text-slate-400 text-sm">Medium</span>
      </div>
      <div className="flex items-center gap-4">
        <ExpandableRowButton expanded={false} onClick={() => {}} size="lg" />
        <span className="text-slate-400 text-sm">Large</span>
      </div>
    </Stack>
  ),
};

export const Disabled: Story = {
  args: {
    expanded: false,
    onClick: () => {},
    disabled: true,
  },
};

export const InTableRow: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div className="w-96 bg-slate-800 rounded-lg overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
          <ExpandableRowButton
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
            size="sm"
          />
          <span className="text-slate-100">Row Item</span>
          <span className="text-slate-400 text-sm ml-auto">Details available</span>
        </div>
        {expanded && (
          <div className="px-4 py-3 bg-slate-900 text-slate-400 text-sm">
            Expanded content goes here. This could contain additional details,
            nested data, or any other content.
          </div>
        )}
      </div>
    );
  },
};
