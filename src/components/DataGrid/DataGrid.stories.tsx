import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataGrid, DataGridColumn, DataGridCell } from './DataGrid';

const meta: Meta<typeof DataGrid> = {
  title: 'Data Display/DataGrid',
  component: DataGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

// Sample data
const sampleColumns: DataGridColumn[] = [
  { id: 'A', header: 'Product', width: 150 },
  { id: 'B', header: 'Category', width: 120 },
  { id: 'C', header: 'Price', width: 100, type: 'number', format: 'currency' },
  { id: 'D', header: 'Quantity', width: 80, type: 'number' },
  { id: 'E', header: 'Total', width: 120, type: 'number', format: 'currency' },
];

const sampleData: DataGridCell[][] = [
  [
    { value: 'Laptop' },
    { value: 'Electronics' },
    { value: 999.99 },
    { value: 5 },
    { value: 4999.95 },
  ],
  [
    { value: 'Mouse' },
    { value: 'Electronics' },
    { value: 29.99 },
    { value: 20 },
    { value: 599.80 },
  ],
  [
    { value: 'Keyboard' },
    { value: 'Electronics' },
    { value: 79.99 },
    { value: 15 },
    { value: 1199.85 },
  ],
  [
    { value: 'Monitor' },
    { value: 'Electronics' },
    { value: 299.99 },
    { value: 8 },
    { value: 2399.92 },
  ],
  [
    { value: 'Headphones' },
    { value: 'Electronics' },
    { value: 149.99 },
    { value: 12 },
    { value: 1799.88 },
  ],
];

// Basic example
export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

// Editable grid
export const Editable: Story = {
  render: () => {
    const [data, setData] = useState(sampleData);

    return (
      <div>
        <DataGrid
          columns={sampleColumns}
          data={data}
          onChange={setData}
          editable
        />
        <p className="mt-2 text-xs text-room-text-muted">
          Double-click a cell to edit. Press Enter to save or Escape to cancel.
        </p>
      </div>
    );
  },
};

// Read-only grid
export const ReadOnly: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    editable: false,
  },
};

// Without row numbers
export const WithoutRowNumbers: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    showRowNumbers: false,
  },
};

// Without column headers
export const WithoutColumnHeaders: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    showColumnHeaders: false,
  },
};

// Custom row height
export const CustomRowHeight: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    rowHeight: 48,
  },
};

// With frozen columns
export const FrozenColumns: Story = {
  args: {
    columns: [
      { id: 'A', header: 'ID', width: 60 },
      { id: 'B', header: 'Name', width: 150 },
      ...Array.from({ length: 8 }, (_, i) => ({
        id: String.fromCharCode(67 + i),
        header: `Column ${i + 3}`,
        width: 120,
      })),
    ],
    data: Array.from({ length: 10 }, (_, row) => [
      { value: row + 1 },
      { value: `Item ${row + 1}` },
      ...Array.from({ length: 8 }, (_, col) => ({
        value: `R${row + 1}C${col + 3}`,
      })),
    ]),
    frozenColumns: 2,
  },
};

// With frozen rows
export const FrozenRows: Story = {
  args: {
    columns: sampleColumns,
    data: [
      ...sampleData,
      ...sampleData,
      ...sampleData,
    ],
    frozenRows: 1,
  },
};

// Row selection mode
export const RowSelection: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    selectionMode: 'row',
  },
};

// Styled cells
export const StyledCells: Story = {
  args: {
    columns: [
      { id: 'A', header: 'Name', width: 120 },
      { id: 'B', header: 'Status', width: 100 },
      { id: 'C', header: 'Score', width: 80, type: 'number' },
    ],
    data: [
      [
        { value: 'John', style: { fontWeight: 'bold' } },
        { value: 'Active', style: { color: '#10b981' } },
        { value: 95, style: { backgroundColor: '#10b98120' } },
      ],
      [
        { value: 'Jane', style: { fontWeight: 'bold' } },
        { value: 'Pending', style: { color: '#f59e0b' } },
        { value: 78, style: { backgroundColor: '#f59e0b20' } },
      ],
      [
        { value: 'Bob', style: { fontWeight: 'bold' } },
        { value: 'Inactive', style: { color: '#ef4444' } },
        { value: 45, style: { backgroundColor: '#ef444420' } },
      ],
    ],
  },
};

// Large grid
export const LargeGrid: Story = {
  args: {
    columns: Array.from({ length: 20 }, (_, i) => ({
      id: String.fromCharCode(65 + (i % 26)) + (i >= 26 ? Math.floor(i / 26) : ''),
      header: String.fromCharCode(65 + (i % 26)) + (i >= 26 ? Math.floor(i / 26) : ''),
      width: 80,
    })),
    data: Array.from({ length: 100 }, (_, row) =>
      Array.from({ length: 20 }, (_, col) => ({
        value: `${row + 1},${col + 1}`,
      }))
    ),
    frozenColumns: 1,
    frozenRows: 1,
  },
};

// Mixed read-only cells
export const MixedReadOnly: Story = {
  args: {
    columns: [
      { id: 'A', header: 'ID', width: 60 },
      { id: 'B', header: 'Name', width: 150 },
      { id: 'C', header: 'Editable', width: 150 },
    ],
    data: [
      [
        { value: 1, readOnly: true },
        { value: 'Item 1', readOnly: true },
        { value: 'Edit me' },
      ],
      [
        { value: 2, readOnly: true },
        { value: 'Item 2', readOnly: true },
        { value: 'Edit me too' },
      ],
      [
        { value: 3, readOnly: true },
        { value: 'Item 3', readOnly: true },
        { value: 'And me!' },
      ],
    ],
  },
};

// Spreadsheet-like (auto columns)
export const SpreadsheetLike: Story = {
  render: () => {
    const [data, setData] = useState<DataGridCell[][]>(
      Array.from({ length: 10 }, () =>
        Array.from({ length: 8 }, () => ({ value: '' }))
      )
    );

    return (
      <DataGrid
        columns={[]}
        data={data}
        onChange={setData}
        editable
        columnWidth={100}
      />
    );
  },
};
