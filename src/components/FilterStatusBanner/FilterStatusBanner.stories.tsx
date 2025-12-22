import type { Meta, StoryObj } from '@storybook/react';
import { FilterStatusBanner } from './FilterStatusBanner';

const meta: Meta<typeof FilterStatusBanner> = {
  title: 'Components/FilterStatusBanner',
  component: FilterStatusBanner,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterStatusBanner>;

export const Default: Story = {
  args: {
    activeFilters: 3,
    onClear: () => alert('Clear filters clicked'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const SingleFilter: Story = {
  args: {
    activeFilters: 1,
    onClear: () => alert('Clear filters clicked'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithCustomSummary: Story = {
  args: {
    activeFilters: 5,
    filterSummary: 'Status: Active, Date: Last 7 days, Category: Sales',
    onClear: () => alert('Clear filters clicked'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomClearText: Story = {
  args: {
    activeFilters: 2,
    clearText: 'Reset filters',
    onClear: () => alert('Reset filters clicked'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const NoIcon: Story = {
  args: {
    activeFilters: 4,
    showIcon: false,
    onClear: () => alert('Clear filters clicked'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ZeroFilters: Story = {
  args: {
    activeFilters: 0,
    onClear: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <p className="text-slate-400 text-sm mb-2">
          (Component returns null when activeFilters is 0)
        </p>
        <Story />
      </div>
    ),
  ],
};
