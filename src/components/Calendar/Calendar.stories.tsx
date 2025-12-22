import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Data Display/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Basic examples
export const Default: Story = {
  args: {},
};

export const WithSelectedDate: Story = {
  args: {
    value: new Date(),
  },
};

// Sizes
export const SizeSmall: Story = {
  args: {
    size: 'sm',
    value: new Date(),
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
    value: new Date(),
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'lg',
    value: new Date(),
  },
};

// Single selection
export const SingleSelection: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
      <div>
        <p className="text-sm text-room-text-muted mb-4 text-center">
          Selected: {selectedDate?.toLocaleDateString() || 'None'}
        </p>
        <Calendar
          value={selectedDate}
          onSelect={setSelectedDate}
        />
      </div>
    );
  },
};

// Range selection
export const RangeSelection: Story = {
  render: () => {
    const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
      start: null,
      end: null,
    });

    return (
      <div>
        <p className="text-sm text-room-text-muted mb-4 text-center">
          Range: {range.start?.toLocaleDateString() || '?'} - {range.end?.toLocaleDateString() || '?'}
        </p>
        <Calendar
          mode="range"
          range={range}
          onRangeChange={setRange}
        />
      </div>
    );
  },
};

// With date constraints
export const WithMinMaxDates: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 7);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 14);

    return (
      <div>
        <p className="text-sm text-room-text-muted mb-4 text-center">
          Only dates within 1 week ago to 2 weeks ahead are selectable
        </p>
        <Calendar
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    );
  },
};

// With week numbers
export const WithWeekNumbers: Story = {
  args: {
    showWeekNumbers: true,
  },
};

// Monday start
export const MondayStart: Story = {
  args: {
    weekStartsOn: 1,
  },
};

// Hide outside days
export const HideOutsideDays: Story = {
  args: {
    showOutsideDays: false,
  },
};

// Uncontrolled with default value
export const Uncontrolled: Story = {
  render: () => {
    const defaultDate = new Date();
    defaultDate.setDate(15);

    return (
      <Calendar
        defaultValue={defaultDate}
        onSelect={(date) => console.log('Selected:', date)}
      />
    );
  },
};

// Booking calendar example
export const BookingCalendar: Story = {
  render: () => {
    const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
      start: null,
      end: null,
    });

    const today = new Date();
    const threeMonthsLater = new Date(today);
    threeMonthsLater.setMonth(today.getMonth() + 3);

    const nights = range.start && range.end
      ? Math.ceil((range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    return (
      <div className="p-6 bg-room-bg-elevated rounded-room border border-room-border">
        <h3 className="text-lg font-semibold text-room-text-primary mb-2">
          Select your dates
        </h3>
        <p className="text-sm text-room-text-secondary mb-4">
          Choose check-in and check-out dates
        </p>
        <Calendar
          mode="range"
          range={range}
          onRangeChange={setRange}
          minDate={today}
          maxDate={threeMonthsLater}
          size="md"
        />
        {nights > 0 && (
          <div className="mt-4 p-3 bg-room-bg-surface rounded-room-sm border border-room-border">
            <p className="text-sm text-room-text-primary">
              <span className="font-medium">{nights} night{nights > 1 ? 's' : ''}</span>
              <span className="text-room-text-muted"> selected</span>
            </p>
          </div>
        )}
      </div>
    );
  },
};

// Event calendar preview
export const EventCalendarPreview: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    // Mock events
    const events: Record<string, string[]> = {
      [new Date().toDateString()]: ['Team standup', 'Product review'],
      [new Date(Date.now() + 86400000).toDateString()]: ['Client meeting'],
      [new Date(Date.now() + 86400000 * 3).toDateString()]: ['Sprint planning', 'Design review', 'Lunch break'],
    };

    const selectedEvents = selectedDate ? events[selectedDate.toDateString()] : [];

    return (
      <div className="flex gap-6">
        <Calendar
          value={selectedDate}
          onSelect={setSelectedDate}
        />
        <div className="w-64 p-4 bg-room-bg-elevated rounded-room border border-room-border">
          <h4 className="text-sm font-medium text-room-text-primary mb-3">
            {selectedDate?.toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </h4>
          {selectedEvents && selectedEvents.length > 0 ? (
            <ul className="space-y-2">
              {selectedEvents.map((event, index) => (
                <li
                  key={index}
                  className="px-3 py-2 text-sm bg-room-bg-surface rounded-room-sm border border-room-border text-room-text-primary"
                >
                  {event}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-room-text-muted">No events scheduled</p>
          )}
        </div>
      </div>
    );
  },
};

// Full featured
export const FullFeatured: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
      <div className="p-4 bg-room-bg-surface rounded-room border border-room-border">
        <Calendar
          value={selectedDate}
          onSelect={setSelectedDate}
          showWeekNumbers
          weekStartsOn={1}
          size="lg"
        />
      </div>
    );
  },
};

// All sizes comparison
export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-start gap-8">
      <div>
        <p className="text-sm text-room-text-muted mb-2 text-center">Small</p>
        <Calendar size="sm" value={new Date()} />
      </div>
      <div>
        <p className="text-sm text-room-text-muted mb-2 text-center">Medium</p>
        <Calendar size="md" value={new Date()} />
      </div>
      <div>
        <p className="text-sm text-room-text-muted mb-2 text-center">Large</p>
        <Calendar size="lg" value={new Date()} />
      </div>
    </div>
  ),
};
