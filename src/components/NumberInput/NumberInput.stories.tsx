import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './index';
import { Stack } from '../Stack';
import { Text } from '../Text';

const meta: Meta<typeof NumberInput> = {
  title: 'Form Controls/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Number input with increment/decrement buttons.

## Features
- Increment/decrement buttons
- Min/max constraints
- Step control
- Decimal precision
- Prefix/suffix support
- Keyboard navigation (Arrow Up/Down)

## Usage
\`\`\`tsx
import { NumberInput } from 'room-ui';

<NumberInput
  value={quantity}
  onChange={setQuantity}
  min={0}
  max={100}
  label="Quantity"
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

/**
 * Basic number input
 */
export const Basic: Story = {
  render: () => <NumberInput placeholder="Enter a number" />,
};

/**
 * With label
 */
export const WithLabel: Story = {
  render: () => <NumberInput label="Quantity" defaultValue={1} />,
};

/**
 * Min and max constraints
 */
export const MinMax: Story = {
  render: () => (
    <NumberInput label="Age (18-100)" defaultValue={25} min={18} max={100} />
  ),
};

/**
 * Custom step
 */
export const CustomStep: Story = {
  render: () => (
    <Stack gap="lg">
      <NumberInput label="Step 1" defaultValue={5} step={1} />
      <NumberInput label="Step 5" defaultValue={10} step={5} />
      <NumberInput label="Step 0.1" defaultValue={1.5} step={0.1} precision={1} />
    </Stack>
  ),
};

/**
 * With precision
 */
export const WithPrecision: Story = {
  render: () => (
    <NumberInput label="Price" defaultValue={9.99} precision={2} prefix="$" />
  ),
};

/**
 * With prefix and suffix
 */
export const PrefixSuffix: Story = {
  render: () => (
    <Stack gap="lg">
      <NumberInput label="Price" defaultValue={29} prefix="$" />
      <NumberInput label="Weight" defaultValue={75} suffix="kg" />
      <NumberInput label="Discount" defaultValue={15} suffix="%" />
    </Stack>
  ),
};

/**
 * Sizes
 */
export const Sizes: Story = {
  render: () => (
    <Stack gap="lg">
      <NumberInput label="Small" size="sm" defaultValue={10} />
      <NumberInput label="Medium" size="md" defaultValue={10} />
      <NumberInput label="Large" size="lg" defaultValue={10} />
    </Stack>
  ),
};

/**
 * Without buttons
 */
export const WithoutButtons: Story = {
  render: () => (
    <NumberInput
      label="Enter amount"
      defaultValue={100}
      showButtons={false}
      prefix="$"
    />
  ),
};

/**
 * Error state
 */
export const WithError: Story = {
  render: () => (
    <NumberInput
      label="Quantity"
      defaultValue={0}
      min={1}
      error="Quantity must be at least 1"
    />
  ),
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <NumberInput label="Quantity" defaultValue={5} disabled />
  ),
};

/**
 * Controlled input
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(42);

    return (
      <Stack gap="md">
        <NumberInput
          label="Controlled value"
          value={value}
          onChange={setValue}
        />
        <Text size="sm" className="text-room-text-muted">
          Current value: {value !== null ? value : 'null'}
        </Text>
        <Stack direction="horizontal" gap="sm">
          <button
            onClick={() => setValue(0)}
            className="px-3 py-1.5 text-sm bg-room-bg-surface border border-room-border rounded-room-sm hover:bg-room-bg-hover"
          >
            Reset to 0
          </button>
          <button
            onClick={() => setValue(null)}
            className="px-3 py-1.5 text-sm bg-room-bg-surface border border-room-border rounded-room-sm hover:bg-room-bg-hover"
          >
            Clear
          </button>
        </Stack>
      </Stack>
    );
  },
};

/**
 * Shopping cart example
 */
export const ShoppingCart: Story = {
  render: () => {
    const [quantity, setQuantity] = useState<number | null>(1);
    const price = 29.99;
    const total = quantity !== null ? quantity * price : 0;

    return (
      <div className="w-80 p-4 bg-room-bg-surface border border-room-border rounded-room">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-room-bg-elevated rounded-room-sm" />
          <div className="flex-1">
            <Text weight="medium">Product Name</Text>
            <Text size="sm" className="text-room-text-muted">
              ${price.toFixed(2)}
            </Text>
            <div className="mt-2">
              <NumberInput
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={99}
                size="sm"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-room-border flex justify-between">
          <Text weight="medium">Total:</Text>
          <Text weight="semibold">${total.toFixed(2)}</Text>
        </div>
      </div>
    );
  },
};
