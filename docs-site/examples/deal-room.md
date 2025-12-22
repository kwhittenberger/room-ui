# Deal Room Dashboard Example

This example demonstrates how room-ui components work together to build a complete Deal Room application.

## Live Demo

View the interactive example in [Storybook](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/examples-deal-room--dashboard).

## Dashboard Overview

The Deal Room dashboard showcases:

- **Layout** with collapsible sidebar navigation
- **DataTable** with sorting, filtering, and row actions
- **StatCards** displaying key metrics
- **Timeline** for activity feeds
- **Modals** for creating and viewing deals
- **Forms** with validation

## Key Components Used

### Layout Structure

```tsx
import { Layout, Sidebar, SidebarHeader, SidebarGroup, SidebarFooter } from 'room-ui';

<Layout
  sidebar={
    <Sidebar>
      <SidebarHeader>
        {/* Logo and app name */}
      </SidebarHeader>
      <SidebarGroup
        items={[
          { id: 'dashboard', label: 'Dashboard', icon: <Home />, active: true },
          { id: 'deals', label: 'Deals', icon: <FileText />, badge: '5' },
          { id: 'contacts', label: 'Contacts', icon: <Users /> },
        ]}
      />
      <SidebarFooter>
        {/* User profile */}
      </SidebarFooter>
    </Sidebar>
  }
>
  {/* Main content */}
</Layout>
```

### Statistics Cards

```tsx
import { StatCard, StatsCardGrid } from 'room-ui';

<StatsCardGrid columns={4}>
  <StatCard
    icon={<DollarSign />}
    label="Total Pipeline"
    value="$133M"
    change={{ value: 12.5, isPositive: true }}
  />
  <StatCard
    icon={<FileText />}
    label="Active Deals"
    value="5"
    change={{ value: 2, isPositive: true }}
  />
  {/* More stats... */}
</StatsCardGrid>
```

### Data Table

```tsx
import { DataTable } from 'room-ui';
import type { DataTableColumn, DataTableAction } from 'room-ui';

const columns: DataTableColumn<Deal>[] = [
  {
    id: 'name',
    header: 'Deal',
    accessor: 'name',
    sortable: true,
    cell: (value, row) => (
      <div>
        <Text className="font-medium">{row.name}</Text>
        <Text size="sm" className="text-slate-400">{row.company}</Text>
      </div>
    ),
  },
  {
    id: 'value',
    header: 'Value',
    accessor: 'value',
    sortable: true,
    cell: (value) => formatCurrency(value),
  },
  // More columns...
];

const actions: DataTableAction<Deal>[] = [
  { id: 'view', label: 'View Details', onClick: (rows) => handleView(rows[0]) },
  { id: 'edit', label: 'Edit', onClick: handleEdit },
  { id: 'archive', label: 'Archive', onClick: handleArchive, variant: 'danger' },
];

<DataTable data={deals} columns={columns} actions={actions} />
```

### Activity Timeline

```tsx
import { Timeline, Card, CardHeader, CardTitle, CardContent } from 'room-ui';

<Card>
  <CardHeader>
    <CardTitle>Recent Activity</CardTitle>
  </CardHeader>
  <CardContent>
    <Timeline
      items={activities.map(item => ({
        id: item.id,
        icon: item.icon,
        content: (
          <div>
            <Text size="sm" className="font-medium">{item.title}</Text>
            <Text size="xs" className="text-slate-400">{item.description}</Text>
            <Text size="xs" className="text-slate-500">{item.timestamp}</Text>
          </div>
        ),
      }))}
    />
  </CardContent>
</Card>
```

### Deal Detail Modal

```tsx
import { Modal, Tabs } from 'room-ui';
import type { Tab } from 'room-ui';

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', content: <DealOverview deal={deal} /> },
  { id: 'documents', label: 'Documents', content: <DealDocuments /> },
  { id: 'team', label: 'Team', content: <DealTeam /> },
  { id: 'activity', label: 'Activity', content: <DealActivity /> },
];

<Modal isOpen={isOpen} onClose={onClose} title={deal.name} size="lg">
  <Tabs tabs={tabs} defaultTab="overview" />
</Modal>
```

## Additional Views

The example also includes:

### Deals List View

A dedicated page for managing deals with table/card view toggle:

- [View in Storybook](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/examples-deal-room--deals-list)

### Contact Detail View

A contact profile page with associated deals and activity:

- [View in Storybook](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/examples-deal-room--contact-detail)

## Source Code

The full source code for these examples is available at:

[`src/stories/DealRoomExample.stories.tsx`](https://github.com/kwhittenberger/room-ui/blob/main/src/stories/DealRoomExample.stories.tsx)
