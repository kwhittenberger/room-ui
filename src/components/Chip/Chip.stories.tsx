import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Star, Tag, User, Check, Clock, AlertCircle } from 'lucide-react';
import { Chip } from './Chip';
import { ChipGroup } from './ChipGroup';
import { Avatar } from '../Avatar';

const meta: Meta<typeof Chip> = {
  title: 'Data Display/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Chip>;

// Basic examples
export const Default: Story = {
  args: {
    label: 'Chip',
  },
};

export const Variants: Story = {
  render: () => (
    <ChipGroup>
      <Chip label="Filled" variant="filled" />
      <Chip label="Outlined" variant="outlined" />
    </ChipGroup>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <ChipGroup>
        <Chip label="Default" color="default" />
        <Chip label="Primary" color="primary" />
        <Chip label="Success" color="success" />
        <Chip label="Warning" color="warning" />
        <Chip label="Error" color="error" />
      </ChipGroup>
      <ChipGroup>
        <Chip label="Default" color="default" variant="outlined" />
        <Chip label="Primary" color="primary" variant="outlined" />
        <Chip label="Success" color="success" variant="outlined" />
        <Chip label="Warning" color="warning" variant="outlined" />
        <Chip label="Error" color="error" variant="outlined" />
      </ChipGroup>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Chip label="Small" size="sm" />
      <Chip label="Medium" size="md" />
      <Chip label="Large" size="lg" />
    </div>
  ),
};

// With icon
export const WithIcon: Story = {
  render: () => (
    <ChipGroup>
      <Chip label="Star" icon={<Star className="h-3 w-3" />} />
      <Chip label="Tagged" icon={<Tag className="h-3 w-3" />} color="primary" />
      <Chip label="User" icon={<User className="h-3 w-3" />} variant="outlined" />
    </ChipGroup>
  ),
};

// With avatar
export const WithAvatar: Story = {
  render: () => (
    <ChipGroup>
      <Chip
        label="John Doe"
        avatar={<Avatar name="John Doe" size="xs" />}
      />
      <Chip
        label="Jane Smith"
        avatar={<Avatar name="Jane Smith" size="xs" />}
        variant="outlined"
      />
    </ChipGroup>
  ),
};

// Deletable
export const Deletable: Story = {
  render: function DeletableChips() {
    const [chips, setChips] = useState(['React', 'TypeScript', 'Tailwind', 'Vite']);

    const handleDelete = (chip: string) => {
      setChips(chips.filter((c) => c !== chip));
    };

    return (
      <div className="space-y-4">
        <ChipGroup>
          {chips.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              onDelete={() => handleDelete(chip)}
            />
          ))}
        </ChipGroup>
        {chips.length === 0 && (
          <p className="text-sm text-room-text-muted">All chips deleted. Refresh to reset.</p>
        )}
      </div>
    );
  },
};

// Clickable
export const Clickable: Story = {
  render: () => (
    <ChipGroup>
      <Chip
        label="Click me"
        onClick={() => alert('Chip clicked!')}
      />
      <Chip
        label="Click with delete"
        onClick={() => alert('Chip clicked!')}
        onDelete={() => alert('Delete clicked!')}
      />
    </ChipGroup>
  ),
};

// Selected state
export const Selected: Story = {
  render: function SelectableChips() {
    const [selected, setSelected] = useState<string[]>(['React']);
    const options = ['React', 'Vue', 'Angular', 'Svelte'];

    const toggleSelection = (option: string) => {
      setSelected((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    };

    return (
      <div className="space-y-4">
        <ChipGroup>
          {options.map((option) => (
            <Chip
              key={option}
              label={option}
              selected={selected.includes(option)}
              onClick={() => toggleSelection(option)}
              color="primary"
            />
          ))}
        </ChipGroup>
        <p className="text-sm text-room-text-muted">
          Selected: {selected.join(', ') || 'None'}
        </p>
      </div>
    );
  },
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <ChipGroup>
      <Chip label="Disabled" disabled />
      <Chip label="Disabled with delete" disabled onDelete={() => {}} />
      <Chip label="Disabled clickable" disabled onClick={() => {}} />
    </ChipGroup>
  ),
};

// ChipGroup spacing
export const GroupSpacing: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-room-text-muted mb-2">Extra small spacing</p>
        <ChipGroup spacing="xs">
          <Chip label="One" />
          <Chip label="Two" />
          <Chip label="Three" />
        </ChipGroup>
      </div>
      <div>
        <p className="text-sm text-room-text-muted mb-2">Small spacing (default)</p>
        <ChipGroup spacing="sm">
          <Chip label="One" />
          <Chip label="Two" />
          <Chip label="Three" />
        </ChipGroup>
      </div>
      <div>
        <p className="text-sm text-room-text-muted mb-2">Medium spacing</p>
        <ChipGroup spacing="md">
          <Chip label="One" />
          <Chip label="Two" />
          <Chip label="Three" />
        </ChipGroup>
      </div>
    </div>
  ),
};

// Status chips
export const StatusChips: Story = {
  render: () => (
    <ChipGroup>
      <Chip
        label="Completed"
        icon={<Check className="h-3 w-3" />}
        color="success"
      />
      <Chip
        label="Pending"
        icon={<Clock className="h-3 w-3" />}
        color="warning"
      />
      <Chip
        label="Failed"
        icon={<AlertCircle className="h-3 w-3" />}
        color="error"
      />
    </ChipGroup>
  ),
};

// Tag input example
export const TagInput: Story = {
  render: function TagInputExample() {
    const [tags, setTags] = useState(['design', 'frontend', 'react']);
    const [inputValue, setInputValue] = useState('');

    const addTag = () => {
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
      }
    };

    const removeTag = (tag: string) => {
      setTags(tags.filter((t) => t !== tag));
    };

    return (
      <div className="w-80 space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
            placeholder="Add a tag..."
            className="flex-1 px-3 py-2 text-sm bg-room-bg-surface border border-room-border rounded-room-sm text-room-text-primary placeholder:text-room-text-muted focus:outline-none focus:ring-2 focus:ring-room-accent"
          />
          <button
            onClick={addTag}
            className="px-3 py-2 text-sm bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover"
          >
            Add
          </button>
        </div>
        <ChipGroup>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => removeTag(tag)}
              color="primary"
              variant="outlined"
            />
          ))}
        </ChipGroup>
      </div>
    );
  },
};

// Filter chips
export const FilterChips: Story = {
  render: function FilterChipsExample() {
    const [filters, setFilters] = useState<string[]>([]);
    const allFilters = [
      { id: 'electronics', label: 'Electronics' },
      { id: 'clothing', label: 'Clothing' },
      { id: 'books', label: 'Books' },
      { id: 'home', label: 'Home & Garden' },
      { id: 'sports', label: 'Sports' },
    ];

    const toggleFilter = (id: string) => {
      setFilters((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      );
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-room-text-secondary">Filter by category:</p>
        <ChipGroup>
          {allFilters.map((filter) => (
            <Chip
              key={filter.id}
              label={filter.label}
              selected={filters.includes(filter.id)}
              onClick={() => toggleFilter(filter.id)}
              variant="outlined"
            />
          ))}
        </ChipGroup>
        <p className="text-sm text-room-text-muted">
          Active filters: {filters.length || 'None'}
        </p>
      </div>
    );
  },
};
