import type { Meta, StoryObj } from '@storybook/react';
import { Check, Clock, Send, FileText, User, Star, AlertCircle } from 'lucide-react';
import { Timeline, TimelineItem } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Data Display/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const basicItems: TimelineItem[] = [
  {
    id: '1',
    title: 'Order placed',
    description: 'Your order has been placed successfully.',
    date: 'Jan 1, 2024',
  },
  {
    id: '2',
    title: 'Processing',
    description: 'We are preparing your order.',
    date: 'Jan 2, 2024',
  },
  {
    id: '3',
    title: 'Shipped',
    description: 'Your order is on the way.',
    date: 'Jan 3, 2024',
  },
  {
    id: '4',
    title: 'Delivered',
    description: 'Your order has been delivered.',
    date: 'Jan 4, 2024',
  },
];

// Basic examples
export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Order placed',
        description: 'Your order has been placed successfully.',
        date: 'Jan 1, 2024',
        icon: <FileText className="h-4 w-4 text-room-text-primary" />,
      },
      {
        id: '2',
        title: 'Processing',
        description: 'We are preparing your order.',
        date: 'Jan 2, 2024',
        icon: <Clock className="h-4 w-4 text-room-warning" />,
      },
      {
        id: '3',
        title: 'Shipped',
        description: 'Your order is on the way.',
        date: 'Jan 3, 2024',
        icon: <Send className="h-4 w-4 text-room-accent" />,
      },
      {
        id: '4',
        title: 'Delivered',
        description: 'Your order has been delivered.',
        date: 'Jan 4, 2024',
        icon: <Check className="h-4 w-4 text-room-success" />,
      },
    ],
  },
};

export const WithColors: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Completed step',
        description: 'This step is complete.',
        date: 'Yesterday',
        color: 'success',
      },
      {
        id: '2',
        title: 'Current step',
        description: 'This is the current step.',
        date: 'Today',
        color: 'primary',
      },
      {
        id: '3',
        title: 'Pending step',
        description: 'This step is pending.',
        date: 'Tomorrow',
        color: 'default',
      },
    ],
  },
};

// Positions
export const PositionLeft: Story = {
  args: {
    items: basicItems,
    position: 'left',
  },
};

export const PositionAlternate: Story = {
  args: {
    items: basicItems,
    position: 'alternate',
  },
};

// Horizontal
export const Horizontal: Story = {
  args: {
    items: basicItems.slice(0, 4),
    orientation: 'horizontal',
  },
};

// Activity feed
export const ActivityFeed: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'John Doe updated the project',
        date: '2 hours ago',
        icon: <User className="h-4 w-4 text-room-accent" />,
        color: 'primary',
      },
      {
        id: '2',
        title: 'New file uploaded',
        description: 'design-specs.pdf was added to the project.',
        date: '5 hours ago',
        icon: <FileText className="h-4 w-4 text-room-text-secondary" />,
      },
      {
        id: '3',
        title: 'Project milestone reached',
        description: 'Phase 1 has been completed successfully!',
        date: 'Yesterday',
        icon: <Star className="h-4 w-4 text-room-warning" />,
        color: 'warning',
      },
      {
        id: '4',
        title: 'Issue reported',
        description: 'A bug was found in the checkout process.',
        date: '2 days ago',
        icon: <AlertCircle className="h-4 w-4 text-room-error" />,
        color: 'error',
      },
    ],
  },
};

// With custom content
export const WithCustomContent: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Project kickoff',
        date: 'Week 1',
        color: 'success',
        content: (
          <div className="mt-2 p-3 bg-room-bg-surface rounded-room border border-room-border">
            <p className="text-sm text-room-text-primary">Initial meeting with stakeholders</p>
            <p className="text-xs text-room-text-muted mt-1">5 attendees</p>
          </div>
        ),
      },
      {
        id: '2',
        title: 'Design phase',
        date: 'Week 2-4',
        color: 'primary',
        content: (
          <div className="mt-2 p-3 bg-room-bg-surface rounded-room border border-room-border">
            <p className="text-sm text-room-text-primary">UI/UX design and prototyping</p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 text-xs bg-room-accent/10 text-room-accent rounded">Figma</span>
              <span className="px-2 py-0.5 text-xs bg-room-accent/10 text-room-accent rounded">Prototype</span>
            </div>
          </div>
        ),
      },
      {
        id: '3',
        title: 'Development',
        date: 'Week 5-10',
        content: (
          <div className="mt-2 p-3 bg-room-bg-surface rounded-room border border-room-border">
            <p className="text-sm text-room-text-primary">Frontend and backend implementation</p>
            <div className="mt-2 h-2 bg-room-bg-hover rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-room-accent rounded-full" />
            </div>
            <p className="text-xs text-room-text-muted mt-1">75% complete</p>
          </div>
        ),
      },
    ],
  },
};

// Order tracking
export const OrderTracking: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-4 bg-room-bg-elevated rounded-room border border-room-border">
      <h3 className="text-lg font-semibold text-room-text-primary mb-4">
        Order #12345
      </h3>
      <Timeline
        items={[
          {
            id: '1',
            title: 'Order confirmed',
            date: 'Dec 15, 2024 • 10:30 AM',
            icon: <Check className="h-4 w-4 text-white" />,
            color: 'success',
          },
          {
            id: '2',
            title: 'Payment received',
            date: 'Dec 15, 2024 • 10:32 AM',
            icon: <Check className="h-4 w-4 text-white" />,
            color: 'success',
          },
          {
            id: '3',
            title: 'Processing order',
            date: 'Dec 16, 2024 • 9:00 AM',
            icon: <Clock className="h-4 w-4 text-white" />,
            color: 'primary',
          },
          {
            id: '4',
            title: 'Shipped',
            description: 'Tracking: 1Z999AA10123456784',
            date: 'Expected Dec 18',
          },
          {
            id: '5',
            title: 'Delivered',
            date: 'Expected Dec 20',
          },
        ]}
      />
    </div>
  ),
};

// Project milestones
export const ProjectMilestones: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Planning',
        description: 'Requirements gathering and project scope definition',
        date: 'Q1 2024',
        color: 'success',
        icon: <Check className="h-4 w-4" />,
      },
      {
        id: '2',
        title: 'Design',
        description: 'UI/UX design, wireframing, and prototyping',
        date: 'Q2 2024',
        color: 'success',
        icon: <Check className="h-4 w-4" />,
      },
      {
        id: '3',
        title: 'Development',
        description: 'Core feature implementation and testing',
        date: 'Q3 2024',
        color: 'primary',
        icon: <Clock className="h-4 w-4" />,
      },
      {
        id: '4',
        title: 'Launch',
        description: 'Production deployment and user onboarding',
        date: 'Q4 2024',
        color: 'default',
      },
    ],
    position: 'alternate',
  },
};
