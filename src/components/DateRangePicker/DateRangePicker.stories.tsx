import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateRangePicker, DateRange, DateRangePreset } from './DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Form Controls/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

// Basic examples
export const Default: Story = {
  args: {
    placeholder: 'Select date range',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Travel Dates',
    placeholder: 'Choose dates',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Selected Range',
    value: {
      start: new Date(2024, 0, 15),
      end: new Date(2024, 0, 22),
    },
  },
};

export const Clearable: Story = {
  args: {
    label: 'Clearable Range',
    value: {
      start: new Date(),
      end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    clearable: true,
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <DateRangePicker size="sm" label="Small" placeholder="Small picker" />
      <DateRangePicker size="md" label="Medium" placeholder="Medium picker" />
      <DateRangePicker size="lg" label="Large" placeholder="Large picker" />
    </div>
  ),
};

// States
export const WithError: Story = {
  args: {
    label: 'Project Timeline',
    error: 'Please select a valid date range',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Range',
    value: {
      start: new Date(),
      end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    disabled: true,
  },
};

// With presets
const defaultPresets: DateRangePreset[] = [
  {
    label: 'Today',
    range: { start: new Date(), end: new Date() },
  },
  {
    label: 'Last 7 days',
    range: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      end: new Date(),
    },
  },
  {
    label: 'Last 30 days',
    range: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date(),
    },
  },
  {
    label: 'This month',
    range: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      end: new Date(),
    },
  },
  {
    label: 'Last month',
    range: {
      start: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    },
  },
];

export const WithPresets: Story = {
  args: {
    label: 'Date Range',
    placeholder: 'Select range',
    presets: defaultPresets,
    clearable: true,
  },
};

// Date constraints
export const WithMinMaxDates: Story = {
  args: {
    label: 'Booking Period',
    placeholder: 'Select dates',
    minDate: new Date(),
    maxDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  },
  render: (args) => (
    <div className="w-80">
      <DateRangePicker {...args} />
      <p className="mt-2 text-sm text-room-text-muted">
        Only dates within the next 90 days are selectable
      </p>
    </div>
  ),
};

// Controlled example
export const Controlled: Story = {
  render: function ControlledDateRangePicker() {
    const [range, setRange] = useState<DateRange | null>({
      start: new Date(),
      end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const formatRange = (r: DateRange | null) => {
      if (!r?.start) return 'None';
      if (!r.end) return `${r.start.toLocaleDateString()} - ...`;
      return `${r.start.toLocaleDateString()} - ${r.end.toLocaleDateString()}`;
    };

    return (
      <div className="w-80 space-y-4">
        <DateRangePicker
          label="Controlled Range"
          value={range}
          onChange={setRange}
          presets={defaultPresets}
          clearable
        />
        <div className="p-3 bg-room-bg-surface rounded-room text-sm">
          <span className="text-room-text-muted">Selected: </span>
          <span className="text-room-text-primary">{formatRange(range)}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 text-sm bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover"
            onClick={() =>
              setRange({
                start: new Date(),
                end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              })
            }
          >
            Next Week
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-room-bg-surface text-room-text-primary border border-room-border rounded-room-sm hover:bg-room-bg-hover"
            onClick={() => setRange(null)}
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};

// Real-world example: Analytics dashboard
export const AnalyticsDashboard: Story = {
  render: function AnalyticsExample() {
    const [dateRange, setDateRange] = useState<DateRange | null>({
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date(),
    });

    const analyticsPresets: DateRangePreset[] = [
      {
        label: 'Today',
        range: { start: new Date(), end: new Date() },
      },
      {
        label: 'Yesterday',
        range: {
          start: new Date(Date.now() - 24 * 60 * 60 * 1000),
          end: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      {
        label: 'Last 7 days',
        range: {
          start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
      },
      {
        label: 'Last 30 days',
        range: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
      },
      {
        label: 'Last 90 days',
        range: {
          start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
      },
    ];

    // Calculate duration in days
    const getDuration = () => {
      if (!dateRange?.start || !dateRange?.end) return 0;
      const diffTime = Math.abs(dateRange.end.getTime() - dateRange.start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    return (
      <div className="w-96 p-4 bg-room-bg-elevated rounded-room border border-room-border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-room-text-primary">
            Analytics Dashboard
          </h3>
          <span className="text-xs text-room-accent bg-room-accent/10 px-2 py-1 rounded">
            {getDuration()} days
          </span>
        </div>

        <DateRangePicker
          label="Report Period"
          value={dateRange}
          onChange={setDateRange}
          presets={analyticsPresets}
          maxDate={new Date()}
          clearable
        />

        {dateRange?.start && dateRange?.end && (
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-room-border">
            <div className="p-3 bg-room-bg-surface rounded-room">
              <div className="text-2xl font-bold text-room-accent">12.4K</div>
              <div className="text-xs text-room-text-muted">Page Views</div>
            </div>
            <div className="p-3 bg-room-bg-surface rounded-room">
              <div className="text-2xl font-bold text-room-success">+24%</div>
              <div className="text-xs text-room-text-muted">Growth</div>
            </div>
          </div>
        )}
      </div>
    );
  },
};

// Booking example
export const HotelBooking: Story = {
  render: function BookingExample() {
    const [checkInOut, setCheckInOut] = useState<DateRange | null>(null);

    const nights =
      checkInOut?.start && checkInOut?.end
        ? Math.ceil(
            (checkInOut.end.getTime() - checkInOut.start.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : 0;

    return (
      <div className="w-80 p-4 bg-room-bg-elevated rounded-room border border-room-border space-y-4">
        <h3 className="text-lg font-semibold text-room-text-primary">
          Book Your Stay
        </h3>

        <DateRangePicker
          label="Check-in / Check-out"
          placeholder="Select dates"
          value={checkInOut}
          onChange={setCheckInOut}
          minDate={new Date()}
          clearable
        />

        {nights > 0 && (
          <div className="p-3 bg-room-bg-surface rounded-room space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-room-text-muted">Duration:</span>
              <span className="text-room-text-primary font-medium">
                {nights} night{nights !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-room-text-muted">Price per night:</span>
              <span className="text-room-text-primary">$150</span>
            </div>
            <div className="pt-2 border-t border-room-border flex justify-between">
              <span className="text-room-text-primary font-medium">Total:</span>
              <span className="text-room-accent font-bold">${nights * 150}</span>
            </div>
          </div>
        )}

        <button
          className="w-full py-2 bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!checkInOut?.start || !checkInOut?.end}
        >
          Book Now
        </button>
      </div>
    );
  },
};
