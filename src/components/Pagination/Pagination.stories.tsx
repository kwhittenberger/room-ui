import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './index';
import { Stack } from '../Stack';
import { Text } from '../Text';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Pagination component for navigating through pages of content.

## Features
- Page number buttons with ellipsis for large page counts
- Previous/Next navigation buttons
- Optional First/Last page buttons
- Page jump input for quick navigation
- Multiple sizes
- Keyboard accessible

## Usage
\`\`\`tsx
import { Pagination } from 'room-ui';

const [page, setPage] = useState(1);

<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

/**
 * Basic pagination
 */
export const Basic: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={setPage}
      />
    );
  },
};

/**
 * Many pages with ellipsis
 */
export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Stack gap="lg" align="center">
        <div>
          <Text size="sm" className="mb-2 text-room-text-muted text-center">Page 1 of 100</Text>
          <Pagination
            currentPage={page}
            totalPages={100}
            onPageChange={setPage}
          />
        </div>
      </Stack>
    );
  },
};

/**
 * With first/last page buttons
 */
export const WithFirstLast: Story = {
  render: () => {
    const [page, setPage] = useState(50);
    return (
      <Pagination
        currentPage={page}
        totalPages={100}
        onPageChange={setPage}
        showFirstLast
      />
    );
  },
};

/**
 * With page jump
 */
export const WithPageJump: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        currentPage={page}
        totalPages={100}
        onPageChange={setPage}
        showPageJump
      />
    );
  },
};

/**
 * All features enabled
 */
export const AllFeatures: Story = {
  render: () => {
    const [page, setPage] = useState(50);
    return (
      <Pagination
        currentPage={page}
        totalPages={100}
        onPageChange={setPage}
        showFirstLast
        showPageJump
      />
    );
  },
};

/**
 * Without page numbers
 */
export const WithoutPageNumbers: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Stack gap="sm" align="center">
        <Pagination
          currentPage={page}
          totalPages={10}
          onPageChange={setPage}
          showPageNumbers={false}
        />
        <Text size="sm" className="text-room-text-muted">
          Page {page} of 10
        </Text>
      </Stack>
    );
  },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => {
    const [page1, setPage1] = useState(3);
    const [page2, setPage2] = useState(3);
    const [page3, setPage3] = useState(3);

    return (
      <Stack gap="lg">
        <div>
          <Text size="sm" className="mb-2 text-room-text-muted">Small</Text>
          <Pagination
            currentPage={page1}
            totalPages={10}
            onPageChange={setPage1}
            size="sm"
          />
        </div>
        <div>
          <Text size="sm" className="mb-2 text-room-text-muted">Medium (default)</Text>
          <Pagination
            currentPage={page2}
            totalPages={10}
            onPageChange={setPage2}
            size="md"
          />
        </div>
        <div>
          <Text size="sm" className="mb-2 text-room-text-muted">Large</Text>
          <Pagination
            currentPage={page3}
            totalPages={10}
            onPageChange={setPage3}
            size="lg"
          />
        </div>
      </Stack>
    );
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <Pagination
      currentPage={5}
      totalPages={10}
      onPageChange={() => {}}
      disabled
    />
  ),
};

/**
 * Few pages
 */
export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        currentPage={page}
        totalPages={3}
        onPageChange={setPage}
      />
    );
  },
};

/**
 * Single page
 */
export const SinglePage: Story = {
  render: () => (
    <Pagination
      currentPage={1}
      totalPages={1}
      onPageChange={() => {}}
    />
  ),
};

/**
 * Custom max page numbers
 */
export const CustomMaxPages: Story = {
  render: () => {
    const [page, setPage] = useState(25);
    return (
      <Stack gap="lg" align="center">
        <div>
          <Text size="sm" className="mb-2 text-room-text-muted text-center">maxPageNumbers: 3</Text>
          <Pagination
            currentPage={page}
            totalPages={50}
            onPageChange={setPage}
            maxPageNumbers={3}
          />
        </div>
        <div>
          <Text size="sm" className="mb-2 text-room-text-muted text-center">maxPageNumbers: 7</Text>
          <Pagination
            currentPage={page}
            totalPages={50}
            onPageChange={setPage}
            maxPageNumbers={7}
          />
        </div>
      </Stack>
    );
  },
};

/**
 * Table pagination example
 */
export const TableExample: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 247;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

    return (
      <div className="p-4 bg-room-bg-surface rounded-room min-w-[400px]">
        <div className="flex items-center justify-between">
          <Text size="sm" className="text-room-text-muted">
            Showing {startItem} to {endItem} of {totalItems} results
          </Text>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            size="sm"
          />
        </div>
      </div>
    );
  },
};
