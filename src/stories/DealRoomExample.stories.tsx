import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Home,
  FileText,
  Users,
  BarChart3,
  Settings,
  Bell,
  Plus,
  Filter,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Building2,
  Mail,
  Phone,
} from 'lucide-react';

import { Layout } from '../components/Layout';
import { Sidebar, SidebarHeader, SidebarFooter, SidebarGroup } from '../components/Sidebar';
import type { SidebarItemProps } from '../components/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { DataTable } from '../components/DataTable';
import type { DataTableColumn, DataTableAction } from '../components/DataTable';
import { StatCard } from '../components/StatCard';
import { StatsCardGrid } from '../components/StatsCardGrid';
import { Tabs } from '../components/Tabs';
import type { Tab } from '../components/Tabs';
import { Stack } from '../components/Stack';
import { Text } from '../components/Text';
import { Timeline } from '../components/Timeline';
import { Modal } from '../components/Modal';
import { SearchInput } from '../components/SearchInput';
import { Select } from '../components/Select';
import { Input } from '../components/Input';
import { Progress } from '../components/Progress';

const meta: Meta = {
  title: 'Examples/Deal Room',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

// Sample data types
interface Deal {
  id: number;
  name: string;
  company: string;
  value: number;
  stage: string;
  progress: number;
  assignee: { name: string; avatar: string };
  dueDate: string;
  status: 'on-track' | 'at-risk' | 'delayed';
}

const deals: Deal[] = [
  {
    id: 1,
    name: 'Acme Corp Acquisition',
    company: 'Acme Corporation',
    value: 25000000,
    stage: 'Due Diligence',
    progress: 65,
    assignee: { name: 'Sarah Chen', avatar: '' },
    dueDate: '2025-02-15',
    status: 'on-track',
  },
  {
    id: 2,
    name: 'TechStart Series B',
    company: 'TechStart Inc',
    value: 15000000,
    stage: 'Term Sheet',
    progress: 40,
    assignee: { name: 'Michael Ross', avatar: '' },
    dueDate: '2025-01-30',
    status: 'at-risk',
  },
  {
    id: 3,
    name: 'GlobalTech Merger',
    company: 'GlobalTech Ltd',
    value: 50000000,
    stage: 'Closing',
    progress: 90,
    assignee: { name: 'Emily Watson', avatar: '' },
    dueDate: '2025-01-20',
    status: 'on-track',
  },
  {
    id: 4,
    name: 'DataFlow Investment',
    company: 'DataFlow Systems',
    value: 8000000,
    stage: 'Initial Review',
    progress: 15,
    assignee: { name: 'James Liu', avatar: '' },
    dueDate: '2025-03-01',
    status: 'on-track',
  },
  {
    id: 5,
    name: 'CloudBase Acquisition',
    company: 'CloudBase Inc',
    value: 35000000,
    stage: 'Negotiation',
    progress: 55,
    assignee: { name: 'Anna Martinez', avatar: '' },
    dueDate: '2025-02-28',
    status: 'delayed',
  },
];

const recentActivity = [
  {
    id: '1',
    title: 'Document uploaded',
    description: 'Financial statements Q4 2024 added to Acme Corp deal',
    timestamp: '10 minutes ago',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: '2',
    title: 'Stage updated',
    description: 'GlobalTech Merger moved to Closing stage',
    timestamp: '1 hour ago',
    icon: <CheckCircle className="h-4 w-4 text-emerald-400" />,
  },
  {
    id: '3',
    title: 'Comment added',
    description: 'Sarah Chen commented on TechStart valuation',
    timestamp: '2 hours ago',
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: '4',
    title: 'Due date alert',
    description: 'GlobalTech Merger closing date approaching',
    timestamp: '3 hours ago',
    icon: <AlertCircle className="h-4 w-4 text-amber-400" />,
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};

const DealRoomDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);

  const columns: DataTableColumn<Deal>[] = [
    {
      id: 'name',
      header: 'Deal',
      accessor: 'name',
      sortable: true,
      cell: (_value: unknown, row: Deal) => (
        <div>
          <Text className="font-medium text-slate-100">{row.name}</Text>
          <Text size="sm" className="text-slate-400">{row.company}</Text>
        </div>
      ),
    },
    {
      id: 'value',
      header: 'Value',
      accessor: 'value',
      sortable: true,
      cell: (value: unknown) => (
        <Text className="font-medium text-slate-100">{formatCurrency(value as number)}</Text>
      ),
    },
    {
      id: 'stage',
      header: 'Stage',
      accessor: 'stage',
      sortable: true,
      cell: (value: unknown) => <Badge variant="default">{String(value)}</Badge>,
    },
    {
      id: 'progress',
      header: 'Progress',
      accessor: 'progress',
      cell: (value: unknown) => (
        <div className="w-32">
          <Progress value={value as number} size="sm" />
          <Text size="xs" className="text-slate-400 mt-1">{String(value)}%</Text>
        </div>
      ),
    },
    {
      id: 'assignee',
      header: 'Assignee',
      accessor: (row) => row.assignee.name,
      cell: (_value: unknown, row: Deal) => (
        <div className="flex items-center gap-2">
          <Avatar name={row.assignee.name} size="sm" />
          <Text size="sm" className="text-slate-300">{row.assignee.name}</Text>
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      cell: (value: unknown) => {
        const variants: Record<string, 'success' | 'warning' | 'error'> = {
          'on-track': 'success',
          'at-risk': 'warning',
          'delayed': 'error',
        };
        const labels: Record<string, string> = {
          'on-track': 'On Track',
          'at-risk': 'At Risk',
          'delayed': 'Delayed',
        };
        return <Badge variant={variants[String(value)]}>{labels[String(value)]}</Badge>;
      },
    },
  ];

  const actions: DataTableAction<Deal>[] = [
    {
      id: 'view',
      label: 'View Details',
      onClick: (rows) => setSelectedDeal(rows[0]),
    },
    {
      id: 'edit',
      label: 'Edit',
      onClick: () => {},
    },
    {
      id: 'archive',
      label: 'Archive',
      onClick: () => {},
      variant: 'danger',
    },
  ];

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const avgProgress = Math.round(deals.reduce((sum, deal) => sum + deal.progress, 0) / deals.length);
  const atRiskCount = deals.filter(d => d.status === 'at-risk' || d.status === 'delayed').length;

  const dealDetailTabs: Tab[] = selectedDeal ? [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <Stack gap="md">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text size="sm" className="text-slate-400">Company</Text>
              <Text className="text-slate-100">{selectedDeal.company}</Text>
            </div>
            <div>
              <Text size="sm" className="text-slate-400">Deal Value</Text>
              <Text className="text-slate-100">{formatCurrency(selectedDeal.value)}</Text>
            </div>
            <div>
              <Text size="sm" className="text-slate-400">Stage</Text>
              <Badge variant="default">{selectedDeal.stage}</Badge>
            </div>
            <div>
              <Text size="sm" className="text-slate-400">Due Date</Text>
              <Text className="text-slate-100">{selectedDeal.dueDate}</Text>
            </div>
          </div>
          <div>
            <Text size="sm" className="text-slate-400 mb-2">Progress</Text>
            <Progress value={selectedDeal.progress} />
            <Text size="sm" className="text-slate-400 mt-1">{selectedDeal.progress}% complete</Text>
          </div>
          <div>
            <Text size="sm" className="text-slate-400 mb-2">Assigned To</Text>
            <div className="flex items-center gap-2">
              <Avatar name={selectedDeal.assignee.name} size="sm" />
              <Text className="text-slate-200">{selectedDeal.assignee.name}</Text>
            </div>
          </div>
        </Stack>
      ),
    },
    {
      id: 'documents',
      label: 'Documents',
      content: <Text className="text-slate-400">No documents uploaded yet.</Text>,
    },
    {
      id: 'team',
      label: 'Team',
      content: <Text className="text-slate-400">Team members will appear here.</Text>,
    },
    {
      id: 'activity',
      label: 'Activity',
      content: <Text className="text-slate-400">Activity log will appear here.</Text>,
    },
  ] : [];

  return (
    <Layout
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <div className="h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <Text className="font-semibold text-slate-100">Deal Room</Text>
            </div>
          </SidebarHeader>
          <SidebarGroup
            items={[
              { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-4 w-4" />, active: true },
              { id: 'deals', label: 'Deals', icon: <FileText className="h-4 w-4" />, badge: '5' },
              { id: 'contacts', label: 'Contacts', icon: <Users className="h-4 w-4" /> },
              { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
              { id: 'calendar', label: 'Calendar', icon: <Calendar className="h-4 w-4" /> },
              { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
            ] as SidebarItemProps[]}
          />
          <SidebarFooter>
            <div className="flex items-center gap-3 px-2">
              <Avatar name="John Smith" size="sm" />
              <div className="flex-1 min-w-0">
                <Text size="sm" className="font-medium text-slate-200 truncate">John Smith</Text>
                <Text size="xs" className="text-slate-400 truncate">john@company.com</Text>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
      }
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Text className="text-2xl font-semibold text-slate-100">Dashboard</Text>
            <Text className="text-slate-400">Welcome back, John. Here&apos;s your deal overview.</Text>
          </div>
          <div className="flex items-center gap-3">
            <SearchInput
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="primary" icon={Plus} onClick={() => setIsNewDealModalOpen(true)}>
              New Deal
            </Button>
          </div>
        </div>

        {/* Stats */}
        <StatsCardGrid columns={4}>
          <StatCard
            icon={<DollarSign className="h-5 w-5 text-cyan-400" />}
            label="Total Pipeline"
            value={formatCurrency(totalValue)}
            change={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            icon={<FileText className="h-5 w-5 text-emerald-400" />}
            label="Active Deals"
            value={deals.length.toString()}
            change={{ value: 2, isPositive: true }}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5 text-purple-400" />}
            label="Avg. Progress"
            value={`${avgProgress}%`}
            subtitle="Across all deals"
          />
          <StatCard
            icon={<AlertCircle className="h-5 w-5 text-amber-400" />}
            label="At Risk"
            value={atRiskCount.toString()}
            subtitle="Requires attention"
          />
        </StatsCardGrid>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Deals Table */}
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Deals</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" icon={Filter}>
                      Filter
                    </Button>
                    <Button variant="ghost" size="sm" icon={Download}>
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <DataTable
                  data={deals}
                  columns={columns}
                  actions={actions}
                />
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Timeline
                  items={recentActivity.map(item => ({
                    ...item,
                    content: (
                      <div>
                        <Text size="sm" className="font-medium text-slate-200">{item.title}</Text>
                        <Text size="xs" className="text-slate-400">{item.description}</Text>
                        <Text size="xs" className="text-slate-500 mt-1">{item.timestamp}</Text>
                      </div>
                    ),
                  }))}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Deal Detail Modal */}
        {selectedDeal && (
          <Modal
            isOpen={!!selectedDeal}
            onClose={() => setSelectedDeal(null)}
            title={selectedDeal.name}
            size="lg"
          >
            <Tabs tabs={dealDetailTabs} defaultTab="overview" />
          </Modal>
        )}

        {/* New Deal Modal */}
        <Modal
          isOpen={isNewDealModalOpen}
          onClose={() => setIsNewDealModalOpen(false)}
          title="Create New Deal"
          size="md"
        >
          <Stack gap="md">
            <Input label="Deal Name" placeholder="Enter deal name" />
            <Input label="Company Name" placeholder="Enter company name" />
            <Input label="Deal Value" placeholder="$0.00" leftIcon={DollarSign} />
            <Select
              label="Stage"
              options={[
                { value: 'initial', label: 'Initial Review' },
                { value: 'term-sheet', label: 'Term Sheet' },
                { value: 'due-diligence', label: 'Due Diligence' },
                { value: 'negotiation', label: 'Negotiation' },
                { value: 'closing', label: 'Closing' },
              ]}
            />
            <Input label="Due Date" type="date" />
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="ghost" onClick={() => setIsNewDealModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsNewDealModalOpen(false)}>
                Create Deal
              </Button>
            </div>
          </Stack>
        </Modal>
      </div>
    </Layout>
  );
};

export const Dashboard: Story = {
  render: () => <DealRoomDashboard />,
};

// Deals List View
const DealsListView = () => {
  const [view, setView] = useState<'table' | 'cards'>('table');

  const columns: DataTableColumn<Deal>[] = [
    {
      id: 'name',
      header: 'Deal',
      accessor: 'name',
      sortable: true,
      cell: (_value, row) => (
        <div>
          <Text className="font-medium text-slate-100">{row.name}</Text>
          <Text size="sm" className="text-slate-400">{row.company}</Text>
        </div>
      ),
    },
    {
      id: 'value',
      header: 'Value',
      accessor: 'value',
      sortable: true,
      cell: (value) => formatCurrency(value as number),
    },
    {
      id: 'stage',
      header: 'Stage',
      accessor: 'stage',
      cell: (value) => <Badge>{value as string}</Badge>,
    },
    {
      id: 'progress',
      header: 'Progress',
      accessor: 'progress',
      cell: (value) => (
        <div className="w-24">
          <Progress value={value as number} size="sm" />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Deals</CardTitle>
              <Text size="sm" className="text-slate-400 mt-1">
                Manage and track all your deals in one place
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={view === 'table' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setView('table')}
              >
                Table
              </Button>
              <Button
                variant={view === 'cards' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setView('cards')}
              >
                Cards
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {view === 'table' ? (
            <DataTable
              data={deals}
              columns={columns}
              selectable
            />
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {deals.map((deal) => (
                <Card key={deal.id} className="bg-slate-800/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Text className="font-medium text-slate-100">{deal.name}</Text>
                        <Text size="sm" className="text-slate-400">{deal.company}</Text>
                      </div>
                      <Badge>{deal.stage}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Text size="sm" className="text-slate-400">Value</Text>
                        <Text size="sm" className="text-slate-200">{formatCurrency(deal.value)}</Text>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <Text size="sm" className="text-slate-400">Progress</Text>
                          <Text size="sm" className="text-slate-200">{deal.progress}%</Text>
                        </div>
                        <Progress value={deal.progress} size="sm" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export const DealsList: Story = {
  render: () => <DealsListView />,
};

// Contact Detail View
const ContactDetailView = () => {
  const contactTabs: Tab[] = [
    {
      id: 'deals',
      label: 'Associated Deals',
      content: (
        <div className="space-y-3">
          {deals.slice(0, 2).map((deal) => (
            <div
              key={deal.id}
              className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <Text className="font-medium text-slate-100">{deal.name}</Text>
                  <Text size="sm" className="text-slate-400">{deal.stage}</Text>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Text className="font-medium text-slate-100">{formatCurrency(deal.value)}</Text>
                <ChevronRight className="h-5 w-5 text-slate-500" />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'notes',
      label: 'Notes',
      content: <Text className="text-slate-400">No notes yet. Add your first note about this contact.</Text>,
    },
    {
      id: 'activity',
      label: 'Activity',
      content: (
        <Timeline
          items={recentActivity.slice(0, 3).map(item => ({
            ...item,
            content: (
              <div>
                <Text size="sm" className="font-medium text-slate-200">{item.title}</Text>
                <Text size="xs" className="text-slate-400">{item.description}</Text>
                <Text size="xs" className="text-slate-500 mt-1">{item.timestamp}</Text>
              </div>
            ),
          }))}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Contact Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Avatar name="Sarah Chen" size="xl" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-2xl font-semibold text-slate-100">Sarah Chen</Text>
                    <Text className="text-slate-400">Chief Financial Officer at Acme Corporation</Text>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" icon={Mail}>Email</Button>
                    <Button variant="ghost" icon={Phone}>Call</Button>
                    <Button variant="primary">Schedule Meeting</Button>
                  </div>
                </div>
                <div className="flex gap-6 mt-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Mail className="h-4 w-4" />
                    <Text size="sm">sarah.chen@acme.com</Text>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Phone className="h-4 w-4" />
                    <Text size="sm">+1 (555) 123-4567</Text>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Building2 className="h-4 w-4" />
                    <Text size="sm">San Francisco, CA</Text>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs tabs={contactTabs} defaultTab="deals" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const ContactDetail: Story = {
  render: () => <ContactDetailView />,
};
