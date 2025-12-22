import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateTimePicker } from './DateTimePicker';

const meta: Meta<typeof DateTimePicker> = {
  title: 'Form Controls/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

// Basic examples
export const Default: Story = {
  args: {
    placeholder: 'Select date and time',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Appointment',
    placeholder: 'Choose date and time',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Selected DateTime',
    value: new Date(2024, 11, 25, 14, 30),
  },
};

export const Clearable: Story = {
  args: {
    label: 'Clearable DateTime',
    value: new Date(),
    clearable: true,
  },
};

// Time formats
export const Format24Hour: Story = {
  args: {
    label: '24-hour format',
    value: new Date(2024, 0, 15, 14, 30),
    timeFormat: '24h',
  },
};

export const Format12Hour: Story = {
  args: {
    label: '12-hour format',
    value: new Date(2024, 0, 15, 14, 30),
    timeFormat: '12h',
  },
};

// Time steps
export const Step15Minutes: Story = {
  args: {
    label: '15-minute intervals',
    timeStep: 15,
  },
};

export const Step60Minutes: Story = {
  args: {
    label: 'Hourly intervals',
    timeStep: 60,
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <DateTimePicker size="sm" label="Small" placeholder="Small picker" />
      <DateTimePicker size="md" label="Medium" placeholder="Medium picker" />
      <DateTimePicker size="lg" label="Large" placeholder="Large picker" />
    </div>
  ),
};

// States
export const WithError: Story = {
  args: {
    label: 'Event Time',
    error: 'Please select a valid date and time',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    value: new Date(),
    disabled: true,
  },
};

// Date/time constraints
export const FutureDatesOnly: Story = {
  args: {
    label: 'Future Appointment',
    placeholder: 'Select future date/time',
    minDateTime: new Date(),
  },
  render: (args) => (
    <div className="w-72">
      <DateTimePicker {...args} />
      <p className="mt-2 text-sm text-room-text-muted">
        Only future dates are selectable
      </p>
    </div>
  ),
};

// Controlled example
export const Controlled: Story = {
  render: function ControlledDateTimePicker() {
    const [dateTime, setDateTime] = useState<Date | null>(new Date());

    const formatDisplay = (dt: Date | null) => {
      if (!dt) return 'None';
      return dt.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    };

    return (
      <div className="w-72 space-y-4">
        <DateTimePicker
          label="Controlled DateTime"
          value={dateTime}
          onChange={setDateTime}
          timeFormat="12h"
          clearable
        />
        <div className="p-3 bg-room-bg-surface rounded-room text-sm">
          <span className="text-room-text-muted">Selected: </span>
          <span className="text-room-text-primary">{formatDisplay(dateTime)}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 text-sm bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover"
            onClick={() => setDateTime(new Date())}
          >
            Now
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-room-bg-surface text-room-text-primary border border-room-border rounded-room-sm hover:bg-room-bg-hover"
            onClick={() => setDateTime(null)}
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};

// Real-world example: Meeting scheduler
export const MeetingScheduler: Story = {
  render: function MeetingExample() {
    const [meetingTime, setMeetingTime] = useState<Date | null>(null);
    const [duration, setDuration] = useState(60);

    const getEndTime = () => {
      if (!meetingTime) return null;
      return new Date(meetingTime.getTime() + duration * 60 * 1000);
    };

    const formatTime = (date: Date | null) => {
      if (!date) return '';
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
    };

    return (
      <div className="w-80 p-4 bg-room-bg-elevated rounded-room border border-room-border space-y-4">
        <h3 className="text-lg font-semibold text-room-text-primary">
          Schedule Meeting
        </h3>

        <DateTimePicker
          label="Start Time"
          placeholder="Select meeting time"
          value={meetingTime}
          onChange={setMeetingTime}
          minDateTime={new Date()}
          timeFormat="12h"
          timeStep={15}
          clearable
        />

        <div>
          <label className="block text-sm font-medium text-room-text-primary mb-1.5">
            Duration
          </label>
          <div className="flex gap-2">
            {[15, 30, 60, 90, 120].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setDuration(mins)}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-room-sm transition-colors',
                  duration === mins
                    ? 'bg-room-accent text-white'
                    : 'bg-room-bg-surface text-room-text-secondary border border-room-border hover:bg-room-bg-hover'
                )}
              >
                {mins < 60 ? `${mins}m` : `${mins / 60}h`}
              </button>
            ))}
          </div>
        </div>

        {meetingTime && (
          <div className="p-3 bg-room-bg-surface rounded-room space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-room-text-muted">Date:</span>
              <span className="text-room-text-primary">
                {meetingTime.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-room-text-muted">Time:</span>
              <span className="text-room-text-primary">
                {formatTime(meetingTime)} - {formatTime(getEndTime())}
              </span>
            </div>
          </div>
        )}

        <button
          className="w-full py-2 bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!meetingTime}
        >
          Schedule Meeting
        </button>
      </div>
    );
  },
};

// Reminder example
export const ReminderSetting: Story = {
  render: function ReminderExample() {
    const [reminder, setReminder] = useState<Date | null>(null);

    // Quick set buttons
    const setQuickReminder = (hours: number) => {
      const date = new Date();
      date.setHours(date.getHours() + hours);
      // Round to nearest 15 minutes
      date.setMinutes(Math.round(date.getMinutes() / 15) * 15, 0, 0);
      setReminder(date);
    };

    const setTomorrowMorning = () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      date.setHours(9, 0, 0, 0);
      setReminder(date);
    };

    return (
      <div className="w-80 p-4 bg-room-bg-elevated rounded-room border border-room-border space-y-4">
        <h3 className="text-lg font-semibold text-room-text-primary">
          Set Reminder
        </h3>

        <DateTimePicker
          label="Remind me at"
          placeholder="Choose when"
          value={reminder}
          onChange={setReminder}
          minDateTime={new Date()}
          timeFormat="12h"
          timeStep={15}
          clearable
        />

        <div className="space-y-2">
          <p className="text-xs text-room-text-muted uppercase tracking-wider">
            Quick Options
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setQuickReminder(1)}
              className="px-3 py-1.5 text-sm bg-room-bg-surface text-room-text-secondary border border-room-border rounded-room-sm hover:bg-room-bg-hover"
            >
              In 1 hour
            </button>
            <button
              onClick={() => setQuickReminder(3)}
              className="px-3 py-1.5 text-sm bg-room-bg-surface text-room-text-secondary border border-room-border rounded-room-sm hover:bg-room-bg-hover"
            >
              In 3 hours
            </button>
            <button
              onClick={setTomorrowMorning}
              className="px-3 py-1.5 text-sm bg-room-bg-surface text-room-text-secondary border border-room-border rounded-room-sm hover:bg-room-bg-hover"
            >
              Tomorrow 9 AM
            </button>
          </div>
        </div>

        {reminder && (
          <div className="p-3 bg-room-accent/10 rounded-room text-center">
            <p className="text-sm text-room-accent">
              Reminder set for{' '}
              {reminder.toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </p>
          </div>
        )}
      </div>
    );
  },
};

// Helper function for className merging in stories
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
