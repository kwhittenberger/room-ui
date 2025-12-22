import type { Meta, StoryObj } from '@storybook/react';
import { FormControl } from './index';
import { Input } from '../Input';
import { Select } from '../Select';
import { TextArea } from '../TextArea';
import { Checkbox } from '../Checkbox';
import { Stack } from '../Stack';
import { Text } from '../Text';

const meta: Meta<typeof FormControl> = {
  title: 'Form Controls/FormControl',
  component: FormControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
FormControl provides a wrapper for form inputs with labels, hints, and error states.

## Features
- Label with required indicator
- Error message display
- Hint text support
- Disabled state styling
- Accessible form structure

## Usage
\`\`\`tsx
import { FormControl, Input } from 'room-ui';

<FormControl
  label="Email"
  required
  error={errors.email}
>
  <Input type="email" placeholder="Enter email" />
</FormControl>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormControl>;

/**
 * Basic form control with input
 */
export const Basic: Story = {
  render: () => (
    <FormControl label="Username">
      <Input placeholder="Enter username" />
    </FormControl>
  ),
};

/**
 * Required field
 */
export const Required: Story = {
  render: () => (
    <FormControl label="Email" required>
      <Input type="email" placeholder="Enter email" />
    </FormControl>
  ),
};

/**
 * With hint text
 */
export const WithHint: Story = {
  render: () => (
    <FormControl
      label="Password"
      hint="Must be at least 8 characters with one uppercase letter"
    >
      <Input type="password" placeholder="Enter password" />
    </FormControl>
  ),
};

/**
 * With error
 */
export const WithError: Story = {
  render: () => (
    <FormControl
      label="Email"
      required
      error="Please enter a valid email address"
    >
      <Input type="email" placeholder="Enter email" defaultValue="invalid-email" />
    </FormControl>
  ),
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <FormControl label="Username" disabled>
      <Input placeholder="Enter username" disabled />
    </FormControl>
  ),
};

/**
 * With Select
 */
export const WithSelect: Story = {
  render: () => (
    <FormControl label="Country" required>
      <Select
        options={[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
          { value: 'au', label: 'Australia' },
        ]}
        placeholder="Select country"
      />
    </FormControl>
  ),
};

/**
 * With TextArea
 */
export const WithTextArea: Story = {
  render: () => (
    <FormControl
      label="Description"
      hint="Describe your project in detail"
    >
      <TextArea
        placeholder="Enter description"
        rows={4}
      />
    </FormControl>
  ),
};

/**
 * With Checkbox
 */
export const WithCheckbox: Story = {
  render: () => (
    <FormControl error="You must agree to the terms">
      <Checkbox label="I agree to the terms and conditions" />
    </FormControl>
  ),
};

/**
 * Complete form example
 */
export const CompleteForm: Story = {
  render: () => (
    <div className="w-96 p-6 bg-room-bg-surface border border-room-border rounded-room">
      <Text size="lg" weight="semibold" className="mb-6">Create Account</Text>
      <Stack gap="md">
        <FormControl label="Full Name" required>
          <Input placeholder="John Doe" />
        </FormControl>
        
        <FormControl
          label="Email"
          required
          hint="We'll never share your email"
        >
          <Input type="email" placeholder="john@example.com" />
        </FormControl>
        
        <FormControl
          label="Password"
          required
          hint="Min 8 characters"
        >
          <Input type="password" placeholder="••••••••" />
        </FormControl>
        
        <FormControl label="Role">
          <Select
            options={[
              { value: 'dev', label: 'Developer' },
              { value: 'designer', label: 'Designer' },
              { value: 'manager', label: 'Manager' },
            ]}
            placeholder="Select role"
          />
        </FormControl>
        
        <FormControl label="Bio">
          <TextArea placeholder="Tell us about yourself" rows={3} />
        </FormControl>
        
        <FormControl>
          <Checkbox label="Subscribe to newsletter" />
        </FormControl>
        
        <button className="w-full px-4 py-2 bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover">
          Create Account
        </button>
      </Stack>
    </div>
  ),
};

/**
 * Validation states
 */
export const ValidationStates: Story = {
  render: () => (
    <Stack gap="lg" className="w-80">
      <FormControl label="Valid field">
        <Input defaultValue="john@example.com" />
      </FormControl>
      
      <FormControl
        label="Field with hint"
        hint="This is helpful information"
      >
        <Input placeholder="Enter value" />
      </FormControl>
      
      <FormControl
        label="Field with error"
        error="This field is required"
      >
        <Input placeholder="Required field" />
      </FormControl>
      
      <FormControl label="Disabled field" disabled>
        <Input defaultValue="Cannot edit" disabled />
      </FormControl>
    </Stack>
  ),
};
