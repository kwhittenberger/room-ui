import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimePicker } from './TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Form Controls/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

// Basic examples
export const Default: Story = {
  args: {
    placeholder: 'Select time',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Meeting Time',
    placeholder: 'Choose a time',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Selected Time',
    value: '14:30',
  },
};

export const Clearable: Story = {
  args: {
    label: 'Clearable Time',
    value: '09:00',
    clearable: true,
  },
};

// Formats
export const Format24Hour: Story = {
  args: {
    label: '24-hour format',
    format: '24h',
    value: '14:30',
  },
};

export const Format12Hour: Story = {
  args: {
    label: '12-hour format',
    format: '12h',
    value: '14:30',
  },
};

// Step intervals
export const Step15Minutes: Story = {
  args: {
    label: '15-minute intervals',
    step: 15,
  },
};

export const Step60Minutes: Story = {
  args: {
    label: 'Hourly intervals',
    step: 60,
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-48">
      <TimePicker size="sm" label="Small" placeholder="Small picker" />
      <TimePicker size="md" label="Medium" placeholder="Medium picker" />
      <TimePicker size="lg" label="Large" placeholder="Large picker" />
    </div>
  ),
};

// States
export const WithError: Story = {
  args: {
    label: 'Appointment Time',
    error: 'Please select a valid time',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Time',
    value: '10:00',
    disabled: true,
  },
};

// Time constraints
export const BusinessHours: Story = {
  args: {
    label: 'Office Hours',
    placeholder: 'Select time',
    minTime: '09:00',
    maxTime: '17:00',
    step: 30,
  },
  render: (args) => (
    <div className="w-48">
      <TimePicker {...args} />
      <p className="mt-2 text-sm text-room-text-muted">
        Only 9 AM - 5 PM available
      </p>
    </div>
  ),
};

// Controlled example
export const Controlled: Story = {
  render: function ControlledTimePicker() {
    const [time, setTime] = useState<string | null>('12:00');

    return (
      <div className="w-48 space-y-4">
        <TimePicker
          label="Controlled Time"
          value={time}
          onChange={setTime}
          format="12h"
          clearable
        />
        <div className="p-3 bg-room-bg-surface rounded-room text-sm">
          <span className="text-room-text-muted">Selected: </span>
          <span className="text-room-text-primary">
            {time || 'None'}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 text-sm bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover"
            onClick={() => setTime('12:00')}
          >
            Noon
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-room-bg-surface text-room-text-primary border border-room-border rounded-room-sm hover:bg-room-bg-hover"
            onClick={() => setTime(null)}
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};

// Real-world example: Appointment scheduling
export const AppointmentScheduling: Story = {
  render: function AppointmentExample() {
    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string | null>(null);

    // Calculate minimum end time (1 hour after start)
    const getMinEndTime = () => {
      if (!startTime) return undefined;
      const [hours, minutes] = startTime.split(':').map(Number);
      const endHours = hours + 1;
      if (endHours >= 24) return undefined;
      return `${String(endHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    return (
      <div className="w-64 p-4 bg-room-bg-elevated rounded-room border border-room-border space-y-4">
        <h3 className="text-lg font-semibold text-room-text-primary">
          Book Appointment
        </h3>

        <TimePicker
          label="Start Time"
          placeholder="Select start time"
          value={startTime}
          onChange={(time) => {
            setStartTime(time);
            setEndTime(null); // Reset end time when start changes
          }}
          minTime="09:00"
          maxTime="16:00"
          step={30}
          format="12h"
          clearable
        />

        <TimePicker
          label="End Time"
          placeholder="Select end time"
          value={endTime}
          onChange={setEndTime}
          minTime={getMinEndTime()}
          maxTime="17:00"
          step={30}
          format="12h"
          disabled={!startTime}
          clearable
        />

        {startTime && endTime && (
          <div className="pt-2 border-t border-room-border">
            <p className="text-sm text-room-text-muted">
              Duration:{' '}
              <span className="text-room-accent">
                {(() => {
                  const [sh, sm] = startTime.split(':').map(Number);
                  const [eh, em] = endTime.split(':').map(Number);
                  const mins = (eh * 60 + em) - (sh * 60 + sm);
                  const hours = Math.floor(mins / 60);
                  const remainingMins = mins % 60;
                  return hours > 0
                    ? `${hours}h ${remainingMins > 0 ? `${remainingMins}m` : ''}`
                    : `${remainingMins}m`;
                })()}
              </span>
            </p>
          </div>
        )}

        <button
          className="w-full py-2 bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!startTime || !endTime}
        >
          Confirm Booking
        </button>
      </div>
    );
  },
};

// Different step intervals comparison
export const StepComparison: Story = {
  render: () => (
    <div className="flex gap-6">
      <div className="w-40">
        <TimePicker
          label="15 min"
          step={15}
          placeholder="15 min step"
        />
      </div>
      <div className="w-40">
        <TimePicker
          label="30 min"
          step={30}
          placeholder="30 min step"
        />
      </div>
      <div className="w-40">
        <TimePicker
          label="60 min"
          step={60}
          placeholder="60 min step"
        />
      </div>
    </div>
  ),
};
