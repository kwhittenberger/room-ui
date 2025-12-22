import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Download, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { Dashboard, DashboardHeader, DashboardContent } from './';
import { Button } from '../Button';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

const meta: Meta<typeof Dashboard> = {
  title: 'Layout/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

const StatCard = ({ title, value, icon: Icon, trend }: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-room-text-muted">{title}</p>
          <p className="text-2xl font-bold text-room-text-primary mt-1">{value}</p>
          {trend && (
            <p className="text-sm text-room-success mt-1">{trend}</p>
          )}
        </div>
        <div className="p-3 bg-room-accent/10 rounded-room">
          <Icon className="h-6 w-6 text-room-accent" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Default dashboard
export const Default: Story = {
  render: () => (
    <Dashboard>
      <DashboardHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Widget
            </Button>
          </>
        }
      />
      <DashboardContent columns={4}>
        <StatCard title="Total Revenue" value="$45,231" icon={DollarSign} trend="+12.5%" />
        <StatCard title="Active Users" value="2,350" icon={Users} trend="+8.2%" />
        <StatCard title="Conversion Rate" value="3.24%" icon={TrendingUp} trend="+2.1%" />
        <StatCard title="Active Sessions" value="1,429" icon={Activity} />
      </DashboardContent>
    </Dashboard>
  ),
};

// Two column layout
export const TwoColumns: Story = {
  render: () => (
    <Dashboard>
      <DashboardHeader title="Analytics" subtitle="Performance overview" />
      <DashboardContent columns={2}>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Chart</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center text-room-text-muted">
            Chart placeholder
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center text-room-text-muted">
            Chart placeholder
          </CardContent>
        </Card>
      </DashboardContent>
    </Dashboard>
  ),
};

// Three column layout
export const ThreeColumns: Story = {
  render: () => (
    <Dashboard>
      <DashboardHeader title="Reports" />
      <DashboardContent columns={3} gap="lg">
        <StatCard title="Orders" value="1,234" icon={Activity} />
        <StatCard title="Revenue" value="$12.4k" icon={DollarSign} />
        <StatCard title="Customers" value="891" icon={Users} />
      </DashboardContent>
    </Dashboard>
  ),
};

// With header children
export const WithHeaderChildren: Story = {
  render: () => (
    <Dashboard>
      <DashboardHeader
        title="Team Dashboard"
        subtitle="Manage your team's performance"
      >
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-room-bg-surface rounded-room-sm">
            <span className="text-sm text-room-text-muted">Period:</span>
            <span className="text-sm font-medium text-room-text-primary">Last 30 days</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-room-bg-surface rounded-room-sm">
            <span className="text-sm text-room-text-muted">Team:</span>
            <span className="text-sm font-medium text-room-text-primary">All Teams</span>
          </div>
        </div>
      </DashboardHeader>
      <DashboardContent columns={2}>
        <Card>
          <CardContent className="p-6">Content Area 1</CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">Content Area 2</CardContent>
        </Card>
      </DashboardContent>
    </Dashboard>
  ),
};

// Small gap
export const SmallGap: Story = {
  render: () => (
    <Dashboard>
      <DashboardHeader title="Compact Layout" />
      <DashboardContent columns={4} gap="sm">
        <StatCard title="Metric 1" value="100" icon={Activity} />
        <StatCard title="Metric 2" value="200" icon={Activity} />
        <StatCard title="Metric 3" value="300" icon={Activity} />
        <StatCard title="Metric 4" value="400" icon={Activity} />
      </DashboardContent>
    </Dashboard>
  ),
};
