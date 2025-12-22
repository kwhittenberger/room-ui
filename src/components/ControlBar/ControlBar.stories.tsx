import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Download, Plus } from 'lucide-react';
import {
  ControlBar,
  createPageControlsSection,
  createFiltersSection,
  createActionsSection,
  createQueryDetailsSection,
} from './';
import { Button } from '../Button';
import { Input } from '../Input';
import { Select } from '../Select';

const meta: Meta<typeof ControlBar> = {
  title: 'Layout/ControlBar',
  component: ControlBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ControlBar>;

// Basic with query details and pagination
export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    return (
      <ControlBar
        sections={[
          createQueryDetailsSection({
            totalItems: 156,
            selectedCount: 3,
            queryTime: 42,
          }),
          createPageControlsSection({
            currentPage,
            totalPages: 16,
            onPageChange: setCurrentPage,
            pageSize,
            onPageSizeChange: setPageSize,
            pageSizeOptions: [10, 25, 50, 100],
          }),
        ]}
      />
    );
  },
};

// With filters
export const WithFilters: Story = {
  render: () => (
    <ControlBar
      sections={[
        createFiltersSection({
          children: (
            <>
              <Input placeholder="Search..." size="sm" className="w-48" />
              <Select
                options={[
                  { value: '', label: 'All Status' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ]}
                size="sm"
              />
            </>
          ),
        }),
        createActionsSection({
          children: (
            <>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </>
          ),
        }),
      ]}
    />
  ),
};

// Full featured
export const FullFeatured: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    return (
      <ControlBar
        sections={[
          createQueryDetailsSection({
            totalItems: 1234,
            queryTime: 156,
          }),
          createFiltersSection({
            children: (
              <>
                <Select
                  options={[
                    { value: '', label: 'All Categories' },
                    { value: 'electronics', label: 'Electronics' },
                    { value: 'clothing', label: 'Clothing' },
                    { value: 'books', label: 'Books' },
                  ]}
                  size="sm"
                />
                <Select
                  options={[
                    { value: '', label: 'All Status' },
                    { value: 'in-stock', label: 'In Stock' },
                    { value: 'low-stock', label: 'Low Stock' },
                    { value: 'out-of-stock', label: 'Out of Stock' },
                  ]}
                  size="sm"
                />
              </>
            ),
          }),
          createPageControlsSection({
            currentPage,
            totalPages: Math.ceil(1234 / pageSize),
            onPageChange: setCurrentPage,
            pageSize,
            onPageSizeChange: (size) => {
              setPageSize(size);
              setCurrentPage(1);
            },
            pageSizeOptions: [10, 25, 50, 100],
          }),
        ]}
      />
    );
  },
};

// Custom sections
export const CustomSections: Story = {
  args: {
    sections: [
      {
        id: 'info',
        align: 'left',
        content: (
          <span className="text-sm text-room-text-muted">
            Last updated: 5 minutes ago
          </span>
        ),
      },
      {
        id: 'status',
        align: 'center',
        content: (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-room-success" />
            <span className="text-sm text-room-text-primary">All systems operational</span>
          </div>
        ),
      },
      {
        id: 'actions',
        align: 'right',
        content: (
          <Button size="sm">Refresh</Button>
        ),
      },
    ],
  },
};

// Simple pagination only
export const PaginationOnly: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <ControlBar
        sections={[
          createPageControlsSection({
            currentPage,
            totalPages: 10,
            onPageChange: setCurrentPage,
          }),
        ]}
      />
    );
  },
};
