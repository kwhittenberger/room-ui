import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterBar, FilterConfig } from './FilterBar';

const meta: Meta<typeof FilterBar> = {
  title: 'Data Display/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

const basicFilters: FilterConfig[] = [
  { id: 'search', label: 'Search', type: 'text', placeholder: 'Search...' },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'All statuses',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' },
    ],
  },
  {
    id: 'category',
    label: 'Category',
    type: 'select',
    placeholder: 'All categories',
    options: [
      { value: 'electronics', label: 'Electronics' },
      { value: 'clothing', label: 'Clothing' },
      { value: 'home', label: 'Home & Garden' },
    ],
  },
];

// Basic example
export const Default: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, unknown>>({});

    return (
      <div>
        <FilterBar
          filters={basicFilters}
          values={values}
          onChange={setValues}
        />
        <pre className="mt-4 p-3 bg-room-bg-surface rounded-room text-xs text-room-text-muted">
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>
    );
  },
};

// With all filter types
const allFilterTypes: FilterConfig[] = [
  { id: 'search', label: 'Search', type: 'text', placeholder: 'Search...' },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  {
    id: 'tags',
    label: 'Tags',
    type: 'multiselect',
    options: [
      { value: 'featured', label: 'Featured' },
      { value: 'sale', label: 'On Sale' },
      { value: 'new', label: 'New Arrival' },
    ],
  },
  { id: 'price', label: 'Max Price', type: 'number', placeholder: '0' },
  { id: 'date', label: 'Created', type: 'date' },
  { id: 'range', label: 'Date Range', type: 'daterange' },
];

export const AllFilterTypes: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, unknown>>({});

    return (
      <FilterBar
        filters={allFilterTypes}
        values={values}
        onChange={setValues}
        direction="vertical"
      />
    );
  },
};

// With apply button
export const WithApplyButton: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, unknown>>({});
    const [appliedValues, setAppliedValues] = useState<Record<string, unknown>>({});

    return (
      <div>
        <FilterBar
          filters={basicFilters}
          values={values}
          onChange={setValues}
          showApplyButton
          onApply={() => setAppliedValues(values)}
        />
        <div className="mt-4 p-3 bg-room-bg-surface rounded-room">
          <p className="text-sm font-medium text-room-text-primary mb-2">Applied Filters:</p>
          <pre className="text-xs text-room-text-muted">
            {JSON.stringify(appliedValues, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

// Vertical layout
export const VerticalLayout: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, unknown>>({});

    return (
      <div className="max-w-xs">
        <FilterBar
          filters={basicFilters}
          values={values}
          onChange={setValues}
          direction="vertical"
        />
      </div>
    );
  },
};

// Pre-filled values
export const WithPrefilledValues: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, unknown>>({
      search: 'laptop',
      status: 'active',
      category: 'electronics',
    });

    return (
      <FilterBar
        filters={basicFilters}
        values={values}
        onChange={setValues}
      />
    );
  },
};

// Product filters example
const productFilters: FilterConfig[] = [
  { id: 'search', label: 'Search', type: 'text', placeholder: 'Product name...' },
  {
    id: 'category',
    label: 'Category',
    type: 'select',
    placeholder: 'All',
    options: [
      { value: 'electronics', label: 'Electronics' },
      { value: 'clothing', label: 'Clothing' },
      { value: 'home', label: 'Home' },
      { value: 'sports', label: 'Sports' },
    ],
  },
  {
    id: 'status',
    label: 'Stock Status',
    type: 'multiselect',
    options: [
      { value: 'in-stock', label: 'In Stock' },
      { value: 'low-stock', label: 'Low Stock' },
      { value: 'out-of-stock', label: 'Out of Stock' },
    ],
  },
  { id: 'minPrice', label: 'Min Price', type: 'number', placeholder: '$0' },
  { id: 'maxPrice', label: 'Max Price', type: 'number', placeholder: '$999' },
];

export const ProductFilters: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, unknown>>({});

    return (
      <FilterBar
        filters={productFilters}
        values={values}
        onChange={setValues}
        showApplyButton
        onApply={() => console.log('Apply filters:', values)}
        onClear={() => console.log('Filters cleared')}
      />
    );
  },
};

// User filters example
const userFilters: FilterConfig[] = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'Search by name...' },
  {
    id: 'role',
    label: 'Role',
    type: 'select',
    placeholder: 'All roles',
    options: [
      { value: 'admin', label: 'Administrator' },
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Viewer' },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'All',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  { id: 'createdAt', label: 'Created', type: 'daterange' },
];

export const UserFilters: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, unknown>>({});

    return (
      <FilterBar
        filters={userFilters}
        values={values}
        onChange={setValues}
      />
    );
  },
};
