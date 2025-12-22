import type { Meta, StoryObj } from '@storybook/react';
import { Construction, Sparkles, Zap, Gift, Calendar } from 'lucide-react';
import { ComingSoon } from './ComingSoon';

const meta: Meta<typeof ComingSoon> = {
  title: 'Data Display/ComingSoon',
  component: ComingSoon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComingSoon>;

// Basic examples
export const Default: Story = {
  args: {},
};

export const WithExpectedDate: Story = {
  args: {
    expectedDate: 'Q1 2025',
  },
};

export const CustomContent: Story = {
  args: {
    title: 'Analytics Dashboard',
    description: 'We\'re working on a powerful analytics dashboard to help you track your metrics.',
    expectedDate: 'March 2025',
  },
};

// Custom icons
export const WithCustomIcon: Story = {
  args: {
    icon: (
      <div className="p-4 bg-room-warning/10 rounded-full">
        <Construction className="h-12 w-12 text-room-warning" />
      </div>
    ),
    title: 'Under Construction',
    description: 'We\'re building something awesome. Check back soon!',
  },
};

export const SparklesIcon: Story = {
  args: {
    icon: (
      <div className="p-4 bg-purple-500/10 rounded-full">
        <Sparkles className="h-12 w-12 text-purple-500" />
      </div>
    ),
    title: 'AI Features',
    description: 'Intelligent automation powered by machine learning is on its way.',
    expectedDate: 'Coming 2025',
  },
};

export const NewFeature: Story = {
  args: {
    icon: (
      <div className="p-4 bg-room-success/10 rounded-full">
        <Gift className="h-12 w-12 text-room-success" />
      </div>
    ),
    title: 'New Feature Coming',
    description: 'Something exciting is in the works. Stay tuned for updates!',
  },
};

// In context
export const InCard: Story = {
  render: () => (
    <div className="w-[500px] bg-room-bg-elevated rounded-room border border-room-border overflow-hidden">
      <div className="p-4 border-b border-room-border">
        <h2 className="text-lg font-semibold text-room-text-primary">Reports</h2>
      </div>
      <ComingSoon
        title="Advanced Reports"
        description="Generate detailed reports with customizable templates."
        expectedDate="Q2 2025"
      />
    </div>
  ),
};

export const InPage: Story = {
  render: () => (
    <div className="w-[800px] min-h-[500px] bg-room-bg-base rounded-room border border-room-border overflow-hidden relative">
      {/* Navigation */}
      <div className="border-b border-room-border px-4 py-3 flex items-center gap-4">
        <span className="text-sm text-room-text-muted">Dashboard</span>
        <span className="text-sm text-room-text-muted">/</span>
        <span className="text-sm text-room-text-primary">Integrations</span>
      </div>

      {/* Content */}
      <div className="flex items-center justify-center h-[400px]">
        <ComingSoon
          icon={
            <div className="p-4 bg-room-accent/10 rounded-full">
              <Zap className="h-12 w-12 text-room-accent" />
            </div>
          }
          title="Third-Party Integrations"
          description="Connect with your favorite tools and services. We're adding support for Slack, GitHub, Jira, and more."
          expectedDate="January 2025"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Feature roadmap style
export const FeatureRoadmap: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      {[
        {
          icon: <Calendar className="h-6 w-6 text-room-accent" />,
          title: 'Calendar Sync',
          date: 'January 2025',
        },
        {
          icon: <Zap className="h-6 w-6 text-room-warning" />,
          title: 'Automation',
          date: 'February 2025',
        },
        {
          icon: <Sparkles className="h-6 w-6 text-purple-500" />,
          title: 'AI Assistant',
          date: 'Q2 2025',
        },
      ].map((feature) => (
        <div
          key={feature.title}
          className="flex items-center gap-4 p-4 bg-room-bg-elevated rounded-room border border-room-border"
        >
          <div className="p-2 bg-room-bg-surface rounded-room">
            {feature.icon}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-room-text-primary">{feature.title}</h4>
            <p className="text-sm text-room-text-muted">Expected: {feature.date}</p>
          </div>
          <span className="px-2 py-1 text-xs bg-room-accent/10 text-room-accent rounded-full">
            Coming Soon
          </span>
        </div>
      ))}
    </div>
  ),
};
