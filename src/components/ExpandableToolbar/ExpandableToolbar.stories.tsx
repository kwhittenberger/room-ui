import type { Meta, StoryObj } from '@storybook/react';
import { Filter, Search, Download, RefreshCw } from 'lucide-react';
import { ExpandableToolbar } from './ExpandableToolbar';
import { Button } from '../Button';
import { Input } from '../Input';

const meta: Meta<typeof ExpandableToolbar> = {
  title: 'Components/ExpandableToolbar',
  component: ExpandableToolbar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ExpandableToolbar>;

export const Default: Story = {
  args: {
    sections: [
      {
        id: 'search',
        content: (
          <div style={{ width: '200px' }}>
            <Input placeholder="Search..." leftIcon={Search} size="sm" />
          </div>
        ),
      },
      {
        id: 'filter',
        content: (
          <Button variant="ghost" size="sm" icon={Filter}>
            Filter
          </Button>
        ),
        collapsible: true,
        label: 'Filters',
      },
      {
        id: 'export',
        content: (
          <Button variant="ghost" size="sm" icon={Download}>
            Export
          </Button>
        ),
        collapsible: true,
        label: 'Export',
      },
      {
        id: 'refresh',
        content: (
          <Button variant="ghost" size="sm" icon={RefreshCw}>
            Refresh
          </Button>
        ),
        collapsible: true,
        label: 'Refresh',
      },
    ],
    defaultExpanded: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Collapsed: Story = {
  args: {
    sections: [
      {
        id: 'search',
        content: (
          <div style={{ width: '200px' }}>
            <Input placeholder="Search..." leftIcon={Search} size="sm" />
          </div>
        ),
      },
      {
        id: 'actions',
        content: (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" icon={Filter}>
              Filter
            </Button>
            <Button variant="ghost" size="sm" icon={Download}>
              Export
            </Button>
          </div>
        ),
        collapsible: true,
        label: '2 actions',
      },
    ],
    defaultExpanded: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ExpandButtonLeft: Story = {
  args: {
    sections: [
      {
        id: 'filters',
        content: (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              Date
            </Button>
            <Button variant="ghost" size="sm">
              Status
            </Button>
            <Button variant="ghost" size="sm">
              Category
            </Button>
          </div>
        ),
        collapsible: true,
        label: 'Filters',
      },
    ],
    expandButtonPosition: 'left',
    defaultExpanded: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const AllStatic: Story = {
  args: {
    sections: [
      {
        id: 'search',
        content: (
          <div style={{ width: '200px' }}>
            <Input placeholder="Search..." leftIcon={Search} size="sm" />
          </div>
        ),
      },
      {
        id: 'actions',
        content: (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" icon={Filter}>
              Filter
            </Button>
            <Button variant="primary" size="sm">
              Add New
            </Button>
          </div>
        ),
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};
