import type { Meta, StoryObj } from '@storybook/react';
import { Heart, TrendingUp } from 'lucide-react';
import { ScoreIndicator, ScoreBreakdownItem } from './ScoreIndicator';

const meta: Meta<typeof ScoreIndicator> = {
  title: 'Display/ScoreIndicator',
  component: ScoreIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    percentage: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    status: {
      control: 'select',
      options: ['good', 'warning', 'critical'],
    },
    variant: {
      control: 'select',
      options: ['compact', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleBreakdown: ScoreBreakdownItem[] = [
  { key: 'activity', label: 'Activity', score: 20, maxScore: 25, status: 'good' },
  { key: 'progress', label: 'Progress', score: 18, maxScore: 20, status: 'good' },
  { key: 'quotes', label: 'Quotes', score: 12, maxScore: 20, status: 'warning' },
  { key: 'tasks', label: 'Tasks', score: 10, maxScore: 15, status: 'warning' },
  { key: 'engagement', label: 'Engagement', score: 15, maxScore: 20, status: 'good' },
];

const sampleInsights = [
  'Activity level is strong with regular touchpoints',
  'Quote response time could be improved',
  'Task completion rate is above average',
];

const sampleRecommendations = [
  'Follow up on pending quote from Vendor A',
  'Schedule technical review meeting',
  'Update project timeline based on recent changes',
];

export const CompactGood: Story = {
  args: {
    percentage: 85,
    status: 'good',
    variant: 'compact',
    title: 'Health Score',
    onClick: () => console.log('View details'),
  },
};

export const CompactWarning: Story = {
  args: {
    percentage: 55,
    status: 'warning',
    variant: 'compact',
    title: 'Health Score',
    onClick: () => console.log('View details'),
  },
};

export const CompactCritical: Story = {
  args: {
    percentage: 25,
    status: 'critical',
    variant: 'compact',
    title: 'Health Score',
    onClick: () => console.log('View details'),
  },
};

export const CompactWithIcon: Story = {
  args: {
    percentage: 75,
    status: 'good',
    variant: 'compact',
    icon: <Heart size={12} className="text-emerald-400" />,
  },
};

export const FullBasic: Story = {
  args: {
    percentage: 75,
    status: 'good',
    title: 'Health Score',
    subtitle: 'Healthy',
    variant: 'full',
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const FullWithBreakdown: Story = {
  args: {
    percentage: 75,
    status: 'good',
    title: 'Deal Health',
    subtitle: 'On Track',
    variant: 'full',
    breakdown: sampleBreakdown,
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const FullWithInsights: Story = {
  args: {
    percentage: 65,
    status: 'warning',
    title: 'Deal Health',
    subtitle: 'Needs Attention',
    variant: 'full',
    breakdown: sampleBreakdown,
    insights: sampleInsights,
    recommendations: sampleRecommendations,
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const FullWithAction: Story = {
  args: {
    percentage: 75,
    status: 'good',
    title: 'Performance Score',
    subtitle: 'Excellent',
    variant: 'full',
    breakdown: sampleBreakdown,
    onClick: () => console.log('View analytics'),
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const FullWithCustomIcon: Story = {
  args: {
    percentage: 85,
    status: 'good',
    title: 'Growth Score',
    subtitle: 'Strong Growth',
    variant: 'full',
    icon: <TrendingUp size={24} className="text-emerald-400" />,
    breakdown: sampleBreakdown,
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const StatusVariations: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-[280px]">
        <ScoreIndicator
          percentage={85}
          status="good"
          title="Good Score"
          subtitle="Healthy"
          breakdown={[
            { key: 'a', label: 'Metric A', score: 18, maxScore: 20, status: 'good' },
            { key: 'b', label: 'Metric B', score: 17, maxScore: 20, status: 'good' },
          ]}
        />
      </div>
      <div className="w-[280px]">
        <ScoreIndicator
          percentage={55}
          status="warning"
          title="Warning Score"
          subtitle="Needs Attention"
          breakdown={[
            { key: 'a', label: 'Metric A', score: 12, maxScore: 20, status: 'warning' },
            { key: 'b', label: 'Metric B', score: 10, maxScore: 20, status: 'warning' },
          ]}
        />
      </div>
      <div className="w-[280px]">
        <ScoreIndicator
          percentage={25}
          status="critical"
          title="Critical Score"
          subtitle="At Risk"
          breakdown={[
            { key: 'a', label: 'Metric A', score: 5, maxScore: 20, status: 'critical' },
            { key: 'b', label: 'Metric B', score: 8, maxScore: 20, status: 'critical' },
          ]}
        />
      </div>
    </div>
  ),
};
