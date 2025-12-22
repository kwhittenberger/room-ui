import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect, MultiSelectOption } from './index';
import { Stack } from '../Stack';
import { Text } from '../Text';

const meta: Meta<typeof MultiSelect> = {
  title: 'Form Controls/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Multi-select dropdown for choosing multiple options.

## Features
- Multiple selection with tags
- Searchable options
- Grouped options
- Max items limit
- Clearable

## Usage
\`\`\`tsx
import { MultiSelect } from 'room-ui';

<MultiSelect
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]}
  value={selected}
  onChange={setSelected}
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const techOptions: MultiSelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
];

/**
 * Basic multi-select
 */
export const Basic: Story = {
  render: () => (
    <div className="w-80">
      <MultiSelect options={techOptions} placeholder="Select technologies" />
    </div>
  ),
};

/**
 * With label
 */
export const WithLabel: Story = {
  render: () => (
    <div className="w-80">
      <MultiSelect
        label="Technologies"
        options={techOptions}
        placeholder="Select technologies"
      />
    </div>
  ),
};

/**
 * With default value
 */
export const WithDefaultValue: Story = {
  render: () => (
    <div className="w-80">
      <MultiSelect
        label="Technologies"
        options={techOptions}
        defaultValue={['react', 'nextjs']}
      />
    </div>
  ),
};

/**
 * Searchable
 */
export const Searchable: Story = {
  render: () => (
    <div className="w-80">
      <MultiSelect
        label="Technologies"
        options={techOptions}
        searchable
        placeholder="Search and select..."
      />
    </div>
  ),
};

/**
 * With max items
 */
export const MaxItems: Story = {
  render: () => (
    <div className="w-80">
      <MultiSelect
        label="Select up to 3"
        options={techOptions}
        maxItems={3}
        placeholder="Select up to 3 technologies"
      />
    </div>
  ),
};

/**
 * Clearable
 */
export const Clearable: Story = {
  render: () => (
    <div className="w-80">
      <MultiSelect
        label="Technologies"
        options={techOptions}
        defaultValue={['react', 'vue']}
        clearable
      />
    </div>
  ),
};

/**
 * With groups
 */
export const WithGroups: Story = {
  render: () => {
    const groupedOptions: MultiSelectOption[] = [
      { value: 'react', label: 'React', group: 'Frontend' },
      { value: 'vue', label: 'Vue', group: 'Frontend' },
      { value: 'angular', label: 'Angular', group: 'Frontend' },
      { value: 'node', label: 'Node.js', group: 'Backend' },
      { value: 'python', label: 'Python', group: 'Backend' },
      { value: 'go', label: 'Go', group: 'Backend' },
      { value: 'postgres', label: 'PostgreSQL', group: 'Database' },
      { value: 'mongodb', label: 'MongoDB', group: 'Database' },
    ];

    return (
      <div className="w-80">
        <MultiSelect
          label="Tech Stack"
          options={groupedOptions}
          searchable
          placeholder="Build your stack"
        />
      </div>
    );
  },
};

/**
 * With disabled options
 */
export const WithDisabledOptions: Story = {
  render: () => {
    const optionsWithDisabled: MultiSelectOption[] = [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular (deprecated)', disabled: true },
      { value: 'svelte', label: 'Svelte' },
    ];

    return (
      <div className="w-80">
        <MultiSelect
          label="Technologies"
          options={optionsWithDisabled}
        />
      </div>
    );
  },
};

/**
 * Sizes
 */
export const Sizes: Story = {
  render: () => (
    <Stack gap="lg" className="w-80">
      <MultiSelect
        label="Small"
        size="sm"
        options={techOptions}
        defaultValue={['react']}
      />
      <MultiSelect
        label="Medium"
        size="md"
        options={techOptions}
        defaultValue={['react']}
      />
      <MultiSelect
        label="Large"
        size="lg"
        options={techOptions}
        defaultValue={['react']}
      />
    </Stack>
  ),
};

/**
 * Error state
 */
export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <MultiSelect
        label="Technologies"
        options={techOptions}
        error="Please select at least one technology"
      />
    </div>
  ),
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <MultiSelect
        label="Technologies"
        options={techOptions}
        defaultValue={['react', 'vue']}
        disabled
      />
    </div>
  ),
};

/**
 * Controlled
 */
export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['react']);

    return (
      <Stack gap="md" className="w-80">
        <MultiSelect
          label="Technologies"
          options={techOptions}
          value={selected}
          onChange={setSelected}
          searchable
          clearable
        />
        <Text size="sm" className="text-room-text-muted">
          Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
        </Text>
        <Stack direction="horizontal" gap="sm">
          <button
            onClick={() => setSelected(['react', 'nextjs'])}
            className="px-3 py-1.5 text-sm bg-room-bg-surface border border-room-border rounded-room-sm hover:bg-room-bg-hover"
          >
            Set React + Next
          </button>
          <button
            onClick={() => setSelected([])}
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
 * Tag selection example
 */
export const TagSelection: Story = {
  render: () => {
    const tagOptions: MultiSelectOption[] = [
      { value: 'bug', label: '🐛 Bug' },
      { value: 'feature', label: '✨ Feature' },
      { value: 'docs', label: '📚 Documentation' },
      { value: 'help', label: '❓ Help Wanted' },
      { value: 'wontfix', label: '🚫 Won\'t Fix' },
      { value: 'duplicate', label: '📋 Duplicate' },
    ];

    return (
      <div className="w-80 p-4 bg-room-bg-surface border border-room-border rounded-room">
        <Text weight="medium" className="mb-3">Issue Labels</Text>
        <MultiSelect
          options={tagOptions}
          searchable
          placeholder="Add labels..."
        />
      </div>
    );
  },
};
