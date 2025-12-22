import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimezoneSelector, getLocalTimezone } from './TimezoneSelector';

const meta: Meta<typeof TimezoneSelector> = {
  title: 'Components/TimezoneSelector',
  component: TimezoneSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimezoneSelector>;

const TimezoneSelectorDemo = (props: Partial<React.ComponentProps<typeof TimezoneSelector>>) => {
  const [value, setValue] = useState<string>('');

  return (
    <div style={{ width: '320px' }}>
      <TimezoneSelector
        value={value}
        onChange={setValue}
        label="Select Timezone"
        {...props}
      />
      {value && (
        <p className="mt-2 text-sm text-slate-400">Selected: {value}</p>
      )}
    </div>
  );
};

export const Default: Story = {
  render: () => <TimezoneSelectorDemo />,
};

export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState('America/New_York');
    return (
      <div style={{ width: '320px' }}>
        <TimezoneSelector
          value={value}
          onChange={setValue}
          label="Your Timezone"
        />
      </div>
    );
  },
};

export const LocalTimezone: Story = {
  render: () => {
    const localTz = getLocalTimezone();
    const [value, setValue] = useState(localTz);
    return (
      <div style={{ width: '320px' }}>
        <TimezoneSelector
          value={value}
          onChange={setValue}
          label="Timezone"
          helperText={`Your local timezone: ${localTz}`}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <TimezoneSelector
        label="Timezone"
        error="Please select a valid timezone"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <TimezoneSelector
        value="America/New_York"
        label="Timezone"
        disabled
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => <TimezoneSelectorDemo helperText="Choose your preferred timezone for scheduling" />,
};
