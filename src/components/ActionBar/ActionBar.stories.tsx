import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Download, Filter, Search, Trash2, Grid, List } from 'lucide-react';
import { ActionBar, ActionBarLeft, ActionBarCenter, ActionBarRight } from './';
import { Button } from '../Button';
import { Input } from '../Input';

const meta: Meta<typeof ActionBar> = {
  title: 'Layout/ActionBar',
  component: ActionBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ActionBar>;

// Default
export const Default: Story = {
  render: () => (
    <ActionBar>
      <ActionBarLeft>
        <span className="text-sm text-room-text-muted">12 items selected</span>
      </ActionBarLeft>
      <ActionBarRight>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
        <Button size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </ActionBarRight>
    </ActionBar>
  ),
};

// With search and filters
export const WithSearchAndFilters: Story = {
  render: () => (
    <ActionBar>
      <ActionBarLeft>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-room-text-muted" />
          <Input placeholder="Search..." className="pl-9 w-64" size="sm" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </ActionBarLeft>
      <ActionBarRight>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </ActionBarRight>
    </ActionBar>
  ),
};

// With center content
export const WithCenterContent: Story = {
  render: () => (
    <ActionBar>
      <ActionBarLeft>
        <span className="text-sm font-medium text-room-text-primary">Products</span>
      </ActionBarLeft>
      <ActionBarCenter>
        <div className="flex items-center gap-1 bg-room-bg-surface rounded-room-sm p-1">
          <button className="px-3 py-1 rounded-room-sm bg-room-accent text-white text-sm">
            All
          </button>
          <button className="px-3 py-1 rounded-room-sm text-room-text-muted hover:text-room-text-primary text-sm">
            Active
          </button>
          <button className="px-3 py-1 rounded-room-sm text-room-text-muted hover:text-room-text-primary text-sm">
            Inactive
          </button>
        </div>
      </ActionBarCenter>
      <ActionBarRight>
        <Button variant="ghost" size="sm">
          <Grid className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <List className="h-4 w-4" />
        </Button>
      </ActionBarRight>
    </ActionBar>
  ),
};

// Sticky
export const Sticky: Story = {
  render: () => (
    <div className="h-96 overflow-auto bg-room-bg-base">
      <ActionBar sticky>
        <ActionBarLeft>
          <span className="text-sm font-medium text-room-text-primary">Sticky Action Bar</span>
        </ActionBarLeft>
        <ActionBarRight>
          <Button size="sm">Action</Button>
        </ActionBarRight>
      </ActionBar>
      <div className="p-6 space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="p-4 bg-room-bg-elevated rounded-room border border-room-border">
            Content row {i + 1}
          </div>
        ))}
      </div>
    </div>
  ),
};

// Without border
export const WithoutBorder: Story = {
  render: () => (
    <ActionBar bordered={false}>
      <ActionBarLeft>
        <span className="text-sm text-room-text-muted">No border variant</span>
      </ActionBarLeft>
      <ActionBarRight>
        <Button size="sm">Save</Button>
      </ActionBarRight>
    </ActionBar>
  ),
};

// Selection actions
export const SelectionActions: Story = {
  render: () => (
    <ActionBar>
      <ActionBarLeft>
        <input type="checkbox" className="rounded" />
        <span className="text-sm text-room-text-muted ml-2">3 of 24 selected</span>
      </ActionBarLeft>
      <ActionBarRight>
        <Button variant="ghost" size="sm">
          Deselect All
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Selected
        </Button>
        <Button variant="ghost" size="sm" className="text-room-error">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </ActionBarRight>
    </ActionBar>
  ),
};
