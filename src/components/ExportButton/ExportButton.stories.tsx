import type { Meta, StoryObj } from '@storybook/react';
import { ExportButton, ExportFormat } from './ExportButton';

const meta: Meta<typeof ExportButton> = {
  title: 'Data Display/ExportButton',
  component: ExportButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ExportButton>;

const handleExport = async (format: ExportFormat) => {
  console.log('Exporting as:', format);
  // Simulate export delay
  await new Promise((r) => setTimeout(r, 1500));
  alert(`Exported as ${format.toUpperCase()}`);
};

// Default with multiple formats
export const Default: Story = {
  args: {
    onExport: handleExport,
    formats: ['csv', 'excel', 'pdf', 'json'],
  },
};

// Single format (no dropdown)
export const SingleFormat: Story = {
  args: {
    onExport: handleExport,
    formats: ['csv'],
    label: 'Export CSV',
  },
};

// CSV and Excel only
export const CsvAndExcel: Story = {
  args: {
    onExport: handleExport,
    formats: ['csv', 'excel'],
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    onExport: handleExport,
    formats: ['csv', 'excel'],
    disabled: true,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    onExport: handleExport,
    formats: ['csv'],
    loading: true,
  },
};

// Different sizes
export const SizeSmall: Story = {
  args: {
    onExport: handleExport,
    formats: ['csv', 'excel'],
    size: 'sm',
    label: 'Export',
  },
};

export const SizeMedium: Story = {
  args: {
    onExport: handleExport,
    formats: ['csv', 'excel'],
    size: 'md',
    label: 'Export',
  },
};

export const SizeLarge: Story = {
  args: {
    onExport: handleExport,
    formats: ['csv', 'excel'],
    size: 'lg',
    label: 'Export',
  },
};

// Different variants
export const VariantSecondary: Story = {
  args: {
    onExport: handleExport,
    formats: ['csv', 'excel'],
    variant: 'secondary',
  },
};

export const VariantOutline: Story = {
  args: {
    onExport: handleExport,
    formats: ['csv', 'excel'],
    variant: 'outline',
  },
};

export const VariantGhost: Story = {
  args: {
    onExport: handleExport,
    formats: ['csv', 'excel'],
    variant: 'ghost',
  },
};

// Custom label
export const CustomLabel: Story = {
  args: {
    onExport: handleExport,
    formats: ['csv', 'excel', 'pdf'],
    label: 'Download Report',
  },
};

// With instant export (no delay in handler)
export const InstantExport: Story = {
  args: {
    onExport: (format) => {
      console.log('Instantly exported as:', format);
    },
    formats: ['csv', 'excel'],
    label: 'Quick Export',
  },
};

// All variants comparison
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <ExportButton
        onExport={handleExport}
        formats={['csv', 'excel']}
        variant="secondary"
      />
      <ExportButton
        onExport={handleExport}
        formats={['csv', 'excel']}
        variant="outline"
      />
      <ExportButton
        onExport={handleExport}
        formats={['csv', 'excel']}
        variant="ghost"
      />
    </div>
  ),
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ExportButton
        onExport={handleExport}
        formats={['csv', 'excel']}
        size="sm"
      />
      <ExportButton
        onExport={handleExport}
        formats={['csv', 'excel']}
        size="md"
      />
      <ExportButton
        onExport={handleExport}
        formats={['csv', 'excel']}
        size="lg"
      />
    </div>
  ),
};
