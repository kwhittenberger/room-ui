import type { Meta, StoryObj } from '@storybook/react';
import { ExpandedRowEditForm, FormField } from './ExpandedRowEditForm';

interface User extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  active: boolean;
  notifications: boolean;
  age: number;
  startDate: string;
}

const sampleUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  bio: 'Software engineer with 10 years of experience.',
  active: true,
  notifications: false,
  age: 32,
  startDate: '2024-01-15',
};

const basicFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Enter name' },
  { name: 'email', label: 'Email', type: 'text', required: true, placeholder: 'Enter email' },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    required: true,
    options: [
      { value: 'admin', label: 'Administrator' },
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Viewer' },
    ],
  },
  { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell us about yourself' },
];

const meta: Meta<typeof ExpandedRowEditForm<User>> = {
  title: 'Data Display/ExpandedRowEditForm',
  component: ExpandedRowEditForm,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ExpandedRowEditForm<User>>;

// Basic example
export const Default: Story = {
  args: {
    row: sampleUser,
    fields: basicFields,
    onSave: async (data) => {
      console.log('Saving:', data);
      await new Promise((r) => setTimeout(r, 1000));
      alert('Saved: ' + JSON.stringify(data, null, 2));
    },
    onCancel: () => alert('Cancelled'),
  },
};

// With all field types
const allFieldTypes: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'text', required: true },
  { name: 'bio', label: 'Bio', type: 'textarea' },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    options: [
      { value: 'admin', label: 'Administrator' },
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Viewer' },
    ],
  },
  { name: 'age', label: 'Age', type: 'number' },
  { name: 'startDate', label: 'Start Date', type: 'date' },
  { name: 'active', label: 'Active', type: 'checkbox' },
  { name: 'notifications', label: 'Enable Notifications', type: 'switch' },
];

export const AllFieldTypes: Story = {
  args: {
    row: sampleUser,
    fields: allFieldTypes,
    columns: 2,
    onSave: async () => {
      await new Promise((r) => setTimeout(r, 1000));
      alert('Saved!');
    },
    onCancel: () => {},
  },
};

// Loading state
export const Loading: Story = {
  args: {
    row: sampleUser,
    fields: basicFields,
    loading: true,
    onSave: async () => {},
    onCancel: () => {},
  },
};

// Single column layout
export const SingleColumn: Story = {
  args: {
    row: sampleUser,
    fields: basicFields,
    columns: 1,
    onSave: async () => alert('Saved!'),
    onCancel: () => {},
  },
};

// Three column layout
export const ThreeColumns: Story = {
  args: {
    row: sampleUser,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'select', options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
      ]},
      { name: 'age', label: 'Age', type: 'number' },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'active', label: 'Active', type: 'switch' },
    ],
    columns: 3,
    onSave: async () => alert('Saved!'),
    onCancel: () => {},
  },
};

// With custom validation
const fieldsWithValidation: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    required: true,
    validation: (value) => {
      const email = String(value);
      if (!email.includes('@')) {
        return 'Please enter a valid email address';
      }
      return undefined;
    },
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    validation: (value) => {
      const age = Number(value);
      if (age < 18) {
        return 'Must be at least 18 years old';
      }
      if (age > 120) {
        return 'Please enter a valid age';
      }
      return undefined;
    },
  },
];

export const WithValidation: Story = {
  args: {
    row: { ...sampleUser, age: 15 },
    fields: fieldsWithValidation,
    columns: 1,
    onSave: async () => alert('Saved!'),
    onCancel: () => {},
  },
};

// With help text
const fieldsWithHelpText: FormField[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    helpText: 'Enter your first and last name',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'text',
    required: true,
    helpText: 'We will never share your email',
  },
  {
    name: 'bio',
    label: 'Biography',
    type: 'textarea',
    helpText: 'Maximum 500 characters',
  },
];

export const WithHelpText: Story = {
  args: {
    row: sampleUser,
    fields: fieldsWithHelpText,
    columns: 1,
    onSave: async () => alert('Saved!'),
    onCancel: () => {},
  },
};

// Custom labels
export const CustomLabels: Story = {
  args: {
    row: sampleUser,
    fields: basicFields,
    saveLabel: 'Update User',
    cancelLabel: 'Discard Changes',
    onSave: async () => alert('Updated!'),
    onCancel: () => alert('Discarded'),
  },
};
