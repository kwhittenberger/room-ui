import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Combobox, ComboboxOption } from './index';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Globe, User, Building, MapPin } from 'lucide-react';

const meta: Meta<typeof Combobox> = {
  title: 'Form Controls/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Combobox with search, select, and create capabilities.

## Features
- Type-ahead search
- Option creation
- Async loading
- Icons and descriptions
- Keyboard navigation

## Usage
\`\`\`tsx
import { Combobox } from 'room-ui';

<Combobox
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
  value={country}
  onChange={setCountry}
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const countryOptions: ComboboxOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
];

/**
 * Basic combobox
 */
export const Basic: Story = {
  render: () => (
    <div className="w-80">
      <Combobox options={countryOptions} placeholder="Select country" />
    </div>
  ),
};

/**
 * With label
 */
export const WithLabel: Story = {
  render: () => (
    <div className="w-80">
      <Combobox
        label="Country"
        options={countryOptions}
        placeholder="Select country"
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
      <Combobox
        label="Country"
        options={countryOptions}
        defaultValue="us"
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
      <Combobox
        label="Country"
        options={countryOptions}
        defaultValue="us"
        clearable
      />
    </div>
  ),
};

/**
 * Creatable
 */
export const Creatable: Story = {
  render: () => {
    const [options, setOptions] = useState(countryOptions);
    const [value, setValue] = useState('');

    return (
      <div className="w-80">
        <Combobox
          label="Country"
          options={options}
          value={value}
          onChange={setValue}
          creatable
          onCreate={(newValue) => {
            const newOption = { value: newValue.toLowerCase(), label: newValue };
            setOptions([...options, newOption]);
            setValue(newOption.value);
          }}
          placeholder="Type to search or create..."
        />
      </div>
    );
  },
};

/**
 * With icons
 */
export const WithIcons: Story = {
  render: () => {
    const optionsWithIcons: ComboboxOption[] = [
      { value: 'user', label: 'Personal Account', icon: <User className="h-4 w-4 text-room-text-muted" /> },
      { value: 'business', label: 'Business Account', icon: <Building className="h-4 w-4 text-room-text-muted" /> },
      { value: 'global', label: 'Global Account', icon: <Globe className="h-4 w-4 text-room-text-muted" /> },
    ];

    return (
      <div className="w-80">
        <Combobox
          label="Account Type"
          options={optionsWithIcons}
          placeholder="Select account type"
        />
      </div>
    );
  },
};

/**
 * With descriptions
 */
export const WithDescriptions: Story = {
  render: () => {
    const optionsWithDescriptions: ComboboxOption[] = [
      {
        value: 'starter',
        label: 'Starter Plan',
        description: 'Perfect for individuals',
        icon: <User className="h-4 w-4 text-room-text-muted" />,
      },
      {
        value: 'pro',
        label: 'Pro Plan',
        description: 'For growing teams',
        icon: <Building className="h-4 w-4 text-room-text-muted" />,
      },
      {
        value: 'enterprise',
        label: 'Enterprise Plan',
        description: 'For large organizations',
        icon: <Globe className="h-4 w-4 text-room-text-muted" />,
      },
    ];

    return (
      <div className="w-80">
        <Combobox
          label="Pricing Plan"
          options={optionsWithDescriptions}
          placeholder="Select a plan"
        />
      </div>
    );
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  render: () => (
    <div className="w-80">
      <Combobox
        label="Country"
        options={[]}
        loading
        placeholder="Loading countries..."
      />
    </div>
  ),
};

/**
 * Sizes
 */
export const Sizes: Story = {
  render: () => (
    <Stack gap="lg" className="w-80">
      <Combobox
        label="Small"
        size="sm"
        options={countryOptions}
        placeholder="Select country"
      />
      <Combobox
        label="Medium"
        size="md"
        options={countryOptions}
        placeholder="Select country"
      />
      <Combobox
        label="Large"
        size="lg"
        options={countryOptions}
        placeholder="Select country"
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
      <Combobox
        label="Country"
        options={countryOptions}
        error="Please select a country"
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
      <Combobox
        label="Country"
        options={countryOptions}
        defaultValue="us"
        disabled
      />
    </div>
  ),
};

/**
 * Controlled with async search
 */
export const AsyncSearch: Story = {
  render: () => {
    const [options, setOptions] = useState<ComboboxOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');

    const handleInputChange = (query: string) => {
      if (!query) {
        setOptions([]);
        return;
      }

      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = countryOptions.filter((o) =>
          o.label.toLowerCase().includes(query.toLowerCase())
        );
        setOptions(filtered);
        setLoading(false);
      }, 500);
    };

    return (
      <Stack gap="md" className="w-80">
        <Combobox
          label="Country"
          options={options}
          value={value}
          onChange={setValue}
          onInputChange={handleInputChange}
          loading={loading}
          clearable
          placeholder="Type to search..."
        />
        <Text size="sm" className="text-room-text-muted">
          Selected: {value || 'None'}
        </Text>
      </Stack>
    );
  },
};

/**
 * Location picker example
 */
export const LocationPicker: Story = {
  render: () => {
    const [location, setLocation] = useState('');

    const locations: ComboboxOption[] = [
      { value: 'nyc', label: 'New York City', description: 'New York, USA', icon: <MapPin className="h-4 w-4 text-room-text-muted" /> },
      { value: 'sf', label: 'San Francisco', description: 'California, USA', icon: <MapPin className="h-4 w-4 text-room-text-muted" /> },
      { value: 'london', label: 'London', description: 'United Kingdom', icon: <MapPin className="h-4 w-4 text-room-text-muted" /> },
      { value: 'tokyo', label: 'Tokyo', description: 'Japan', icon: <MapPin className="h-4 w-4 text-room-text-muted" /> },
      { value: 'paris', label: 'Paris', description: 'France', icon: <MapPin className="h-4 w-4 text-room-text-muted" /> },
    ];

    return (
      <div className="w-80 p-4 bg-room-bg-surface border border-room-border rounded-room">
        <Text weight="medium" className="mb-3">Office Location</Text>
        <Combobox
          options={locations}
          value={location}
          onChange={setLocation}
          placeholder="Search for a city..."
          clearable
        />
      </div>
    );
  },
};
