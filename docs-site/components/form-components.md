# Form Components

Input controls for collecting user data.

## Button

Primary action trigger with multiple variants.

```tsx
import { Button } from 'room-ui';
import { Plus, Save } from 'lucide-react';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="outline">Outline</Button>

// With icons
<Button icon={Plus}>Add Item</Button>
<Button icon={Save} iconPosition="right">Save</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<Button loading>Processing...</Button>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/components-button)

## Input

Text input with prefix/suffix icon support.

```tsx
import { Input } from 'room-ui';
import { Mail, Search } from 'lucide-react';

<Input label="Email" placeholder="Enter email" />
<Input label="Search" leftIcon={Search} />
<Input label="Email" rightIcon={Mail} />
<Input label="Error" error="This field is required" />
<Input label="Clearable" clearable />
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-input)

## Select

Searchable dropdown selector.

```tsx
import { Select } from 'room-ui';

<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]}
  searchable
  clearable
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-select)

## MultiSelect

Multiple selection dropdown.

```tsx
import { MultiSelect } from 'room-ui';

<MultiSelect
  label="Tags"
  options={[
    { value: 'react', label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'tailwind', label: 'Tailwind' },
  ]}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-multiselect)

## DatePicker

Calendar date selection.

```tsx
import { DatePicker } from 'room-ui';

<DatePicker
  label="Start Date"
  value={date}
  onChange={setDate}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-datepicker)

## TimePicker

Time selection input.

```tsx
import { TimePicker } from 'room-ui';

<TimePicker
  label="Meeting Time"
  value={time}
  onChange={setTime}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-timepicker)

## Checkbox

Boolean toggle with label support.

```tsx
import { Checkbox } from 'room-ui';

<Checkbox label="Accept terms" />
<Checkbox label="Subscribe" checked />
<Checkbox label="Disabled" disabled />
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-checkbox)

## Switch

Toggle switch with loading state.

```tsx
import { Switch } from 'room-ui';

<Switch label="Enable notifications" />
<Switch label="Loading" loading />
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-switch)

## Textarea

Multi-line text input.

```tsx
import { Textarea } from 'room-ui';

<Textarea
  label="Description"
  placeholder="Enter description..."
  rows={4}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-textarea)

## FileUpload

Drag-and-drop file upload.

```tsx
import { FileUpload } from 'room-ui';

<FileUpload
  accept="image/*"
  maxSize={5 * 1024 * 1024}
  onUpload={handleUpload}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-fileupload)
