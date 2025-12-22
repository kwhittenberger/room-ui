import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { Calendar } from './Calendar';

const meta: Meta<typeof DatePicker> = {
  title: 'Form Controls/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Basic examples
export const Default: Story = {
  args: {
    placeholder: 'Select a date',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Event Date',
    placeholder: 'Choose a date',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Selected Date',
    value: new Date(2024, 11, 25),
  },
};

export const Clearable: Story = {
  args: {
    label: 'Clearable Date',
    value: new Date(),
    clearable: true,
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <DatePicker size="sm" label="Small" placeholder="Small picker" />
      <DatePicker size="md" label="Medium" placeholder="Medium picker" />
      <DatePicker size="lg" label="Large" placeholder="Large picker" />
    </div>
  ),
};

// States
export const WithError: Story = {
  args: {
    label: 'Date of Birth',
    error: 'Please select a valid date',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Date',
    value: new Date(),
    disabled: true,
  },
};

// Date constraints
export const WithMinMaxDates: Story = {
  args: {
    label: 'Select Date',
    placeholder: 'Choose a date',
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2024, 11, 31),
  },
  render: (args) => (
    <div className="w-64">
      <DatePicker {...args} />
      <p className="mt-2 text-sm text-room-text-muted">
        Only dates in 2024 are selectable
      </p>
    </div>
  ),
};

export const FutureDatesOnly: Story = {
  args: {
    label: 'Appointment Date',
    placeholder: 'Select future date',
    minDate: new Date(),
  },
  render: (args) => (
    <div className="w-64">
      <DatePicker {...args} />
      <p className="mt-2 text-sm text-room-text-muted">
        Only future dates are selectable
      </p>
    </div>
  ),
};

// Controlled example
export const Controlled: Story = {
  render: function ControlledDatePicker() {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
      <div className="w-64 space-y-4">
        <DatePicker
          label="Controlled Date"
          value={date}
          onChange={setDate}
          clearable
        />
        <div className="p-3 bg-room-bg-surface rounded-room text-sm">
          <span className="text-room-text-muted">Selected: </span>
          <span className="text-room-text-primary">
            {date ? date.toLocaleDateString() : 'None'}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 text-sm bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover"
            onClick={() => setDate(new Date())}
          >
            Today
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-room-bg-surface text-room-text-primary border border-room-border rounded-room-sm hover:bg-room-bg-hover"
            onClick={() => setDate(null)}
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};

// Custom format
export const CustomFormat: Story = {
  args: {
    label: 'Date (DD/MM/YYYY)',
    value: new Date(),
    format: 'DD/MM/YYYY',
  },
};

// Calendar standalone
export const CalendarStandalone: Story = {
  render: function CalendarExample() {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
      <div className="space-y-4">
        <Calendar value={date} onSelect={setDate} />
        <div className="text-sm text-room-text-muted text-center">
          Selected: {date?.toLocaleDateString() || 'None'}
        </div>
      </div>
    );
  },
};

// Real-world example: Event scheduling
export const EventScheduling: Story = {
  render: function EventSchedulingExample() {
    const [eventDate, setEventDate] = useState<Date | null>(null);
    const [deadline, setDeadline] = useState<Date | null>(null);

    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    return (
      <div className="w-72 p-4 bg-room-bg-elevated rounded-room border border-room-border space-y-4">
        <h3 className="text-lg font-semibold text-room-text-primary">
          Schedule Event
        </h3>

        <DatePicker
          label="Event Date"
          placeholder="When is the event?"
          value={eventDate}
          onChange={setEventDate}
          minDate={today}
          maxDate={nextMonth}
          clearable
        />

        <DatePicker
          label="Registration Deadline"
          placeholder="Set deadline"
          value={deadline}
          onChange={setDeadline}
          minDate={today}
          maxDate={eventDate || undefined}
          disabled={!eventDate}
          error={eventDate && deadline && deadline > eventDate ? 'Deadline must be before event' : undefined}
          clearable
        />

        {eventDate && (
          <div className="pt-2 border-t border-room-border">
            <p className="text-sm text-room-text-muted">
              Event scheduled for{' '}
              <span className="text-room-accent">
                {eventDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </p>
          </div>
        )}
      </div>
    );
  },
};

// Form example
export const InForm: Story = {
  render: function FormExample() {
    const [formData, setFormData] = useState({
      startDate: null as Date | null,
      endDate: null as Date | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
    };

    return (
      <form onSubmit={handleSubmit} className="w-72 space-y-4">
        <DatePicker
          label="Start Date"
          name="startDate"
          placeholder="Select start date"
          value={formData.startDate}
          onChange={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
          clearable
        />

        <DatePicker
          label="End Date"
          name="endDate"
          placeholder="Select end date"
          value={formData.endDate}
          onChange={(date) => setFormData((prev) => ({ ...prev, endDate: date }))}
          minDate={formData.startDate || undefined}
          disabled={!formData.startDate}
          clearable
        />

        <button
          type="submit"
          className="w-full py-2 bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover disabled:opacity-50"
          disabled={!formData.startDate || !formData.endDate}
        >
          Submit
        </button>
      </form>
    );
  },
};
