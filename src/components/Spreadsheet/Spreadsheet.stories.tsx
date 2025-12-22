import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Spreadsheet, SpreadsheetCell, Matrix } from './Spreadsheet';

const meta: Meta<typeof Spreadsheet> = {
  title: 'Data Display/Spreadsheet',
  component: Spreadsheet,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Spreadsheet>;

// Empty spreadsheet
export const Default: Story = {
  render: () => {
    const [data, setData] = useState<Matrix<SpreadsheetCell>>(
      Array.from({ length: 10 }, () =>
        Array.from({ length: 8 }, () => ({ value: '' }))
      )
    );

    return (
      <Spreadsheet
        data={data}
        onChange={setData}
      />
    );
  },
};

// With formula bar
export const WithFormulaBar: Story = {
  render: () => {
    const [data, setData] = useState<Matrix<SpreadsheetCell>>(
      Array.from({ length: 10 }, () =>
        Array.from({ length: 8 }, () => ({ value: '' }))
      )
    );

    return (
      <Spreadsheet
        data={data}
        onChange={setData}
        formulaBar
      />
    );
  },
};

// With initial data
const sampleData: Matrix<SpreadsheetCell> = [
  [
    { value: 'Product' },
    { value: 'Q1' },
    { value: 'Q2' },
    { value: 'Q3' },
    { value: 'Q4' },
    { value: 'Total' },
  ],
  [
    { value: 'Widget A' },
    { value: 1500 },
    { value: 1800 },
    { value: 2100 },
    { value: 2400 },
    { value: 7800 },
  ],
  [
    { value: 'Widget B' },
    { value: 2200 },
    { value: 2000 },
    { value: 2300 },
    { value: 2600 },
    { value: 9100 },
  ],
  [
    { value: 'Widget C' },
    { value: 800 },
    { value: 950 },
    { value: 1100 },
    { value: 1250 },
    { value: 4100 },
  ],
  [
    { value: 'Total' },
    { value: 4500 },
    { value: 4750 },
    { value: 5500 },
    { value: 6250 },
    { value: 21000 },
  ],
];

export const WithData: Story = {
  render: () => {
    const [data, setData] = useState<Matrix<SpreadsheetCell>>(sampleData);

    return (
      <Spreadsheet
        data={data}
        onChange={setData}
        formulaBar
      />
    );
  },
};

// Read-only mode
export const ReadOnly: Story = {
  args: {
    data: sampleData,
    readOnly: true,
  },
};

// Custom dimensions
export const CustomDimensions: Story = {
  render: () => {
    const [data, setData] = useState<Matrix<SpreadsheetCell>>(
      Array.from({ length: 5 }, () =>
        Array.from({ length: 4 }, () => ({ value: '' }))
      )
    );

    return (
      <Spreadsheet
        data={data}
        onChange={setData}
        cellWidth={150}
        cellHeight={40}
      />
    );
  },
};

// Budget template
const budgetData: Matrix<SpreadsheetCell> = [
  [
    { value: 'Category', style: { fontWeight: 'bold', backgroundColor: '#1e293b' } },
    { value: 'Budgeted', style: { fontWeight: 'bold', backgroundColor: '#1e293b' } },
    { value: 'Actual', style: { fontWeight: 'bold', backgroundColor: '#1e293b' } },
    { value: 'Difference', style: { fontWeight: 'bold', backgroundColor: '#1e293b' } },
  ],
  [
    { value: 'Income' },
    { value: 5000 },
    { value: 5200 },
    { value: 200, style: { color: '#10b981' } },
  ],
  [
    { value: 'Housing' },
    { value: 1500 },
    { value: 1500 },
    { value: 0 },
  ],
  [
    { value: 'Utilities' },
    { value: 200 },
    { value: 180 },
    { value: 20, style: { color: '#10b981' } },
  ],
  [
    { value: 'Food' },
    { value: 600 },
    { value: 720 },
    { value: -120, style: { color: '#ef4444' } },
  ],
  [
    { value: 'Transportation' },
    { value: 300 },
    { value: 280 },
    { value: 20, style: { color: '#10b981' } },
  ],
  [
    { value: 'Entertainment' },
    { value: 200 },
    { value: 350 },
    { value: -150, style: { color: '#ef4444' } },
  ],
  [
    { value: 'Savings', style: { fontWeight: 'bold' } },
    { value: 2200, style: { fontWeight: 'bold' } },
    { value: 2170, style: { fontWeight: 'bold' } },
    { value: -30, style: { fontWeight: 'bold', color: '#ef4444' } },
  ],
];

export const BudgetTemplate: Story = {
  render: () => {
    const [data, setData] = useState<Matrix<SpreadsheetCell>>(budgetData);

    return (
      <Spreadsheet
        data={data}
        onChange={setData}
        formulaBar
        cellWidth={120}
      />
    );
  },
};

// Schedule grid
const scheduleData: Matrix<SpreadsheetCell> = [
  [
    { value: 'Time' },
    { value: 'Monday' },
    { value: 'Tuesday' },
    { value: 'Wednesday' },
    { value: 'Thursday' },
    { value: 'Friday' },
  ],
  [
    { value: '9:00 AM' },
    { value: 'Meeting' },
    { value: '' },
    { value: 'Meeting' },
    { value: '' },
    { value: 'Review' },
  ],
  [
    { value: '10:00 AM' },
    { value: 'Dev Work' },
    { value: 'Dev Work' },
    { value: 'Dev Work' },
    { value: 'Dev Work' },
    { value: 'Dev Work' },
  ],
  [
    { value: '11:00 AM' },
    { value: 'Dev Work' },
    { value: 'Dev Work' },
    { value: 'Dev Work' },
    { value: 'Dev Work' },
    { value: 'Dev Work' },
  ],
  [
    { value: '12:00 PM' },
    { value: 'Lunch' },
    { value: 'Lunch' },
    { value: 'Lunch' },
    { value: 'Lunch' },
    { value: 'Lunch' },
  ],
  [
    { value: '1:00 PM' },
    { value: 'Design' },
    { value: 'Testing' },
    { value: 'Design' },
    { value: 'Testing' },
    { value: 'Deploy' },
  ],
  [
    { value: '2:00 PM' },
    { value: 'Design' },
    { value: 'Testing' },
    { value: 'Design' },
    { value: 'Testing' },
    { value: '' },
  ],
  [
    { value: '3:00 PM' },
    { value: 'Code Review' },
    { value: '' },
    { value: 'Code Review' },
    { value: '' },
    { value: '' },
  ],
];

export const ScheduleGrid: Story = {
  render: () => {
    const [data, setData] = useState<Matrix<SpreadsheetCell>>(scheduleData);

    return (
      <Spreadsheet
        data={data}
        onChange={setData}
        cellWidth={110}
      />
    );
  },
};

// Large spreadsheet
export const LargeSpreadsheet: Story = {
  render: () => {
    const [data, setData] = useState<Matrix<SpreadsheetCell>>(
      Array.from({ length: 50 }, (_, row) =>
        Array.from({ length: 15 }, (_, col) => ({
          value: row === 0 || col === 0 ? `${row === 0 ? 'Col' : 'Row'} ${row === 0 ? col : row}` : '',
        }))
      )
    );

    return (
      <div className="h-[500px]">
        <Spreadsheet
          data={data}
          onChange={setData}
          formulaBar
        />
      </div>
    );
  },
};

// Mixed read-only cells
export const MixedReadOnly: Story = {
  render: () => {
    const [data, setData] = useState<Matrix<SpreadsheetCell>>([
      [
        { value: 'Name', readOnly: true },
        { value: 'Score', readOnly: true },
        { value: 'Grade', readOnly: true },
      ],
      [
        { value: 'Alice', readOnly: true },
        { value: 85 },
        { value: 'B', readOnly: true },
      ],
      [
        { value: 'Bob', readOnly: true },
        { value: 92 },
        { value: 'A', readOnly: true },
      ],
      [
        { value: 'Charlie', readOnly: true },
        { value: 78 },
        { value: 'C', readOnly: true },
      ],
    ]);

    return (
      <div>
        <Spreadsheet
          data={data}
          onChange={setData}
        />
        <p className="mt-2 text-xs text-room-text-muted">
          Only the Score column is editable
        </p>
      </div>
    );
  },
};
