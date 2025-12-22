# Data Display Components

Present data and information effectively.

## DataTable

Feature-rich data table with sorting, filtering, selection, and row actions.

```tsx
import { DataTable } from 'room-ui';
import type { DataTableColumn, DataTableAction } from 'room-ui';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: DataTableColumn<User>[] = [
  { id: 'name', header: 'Name', accessor: 'name', sortable: true },
  { id: 'email', header: 'Email', accessor: 'email' },
  { id: 'role', header: 'Role', accessor: 'role' },
];

const actions: DataTableAction<User>[] = [
  { id: 'edit', label: 'Edit', onClick: (rows) => handleEdit(rows[0]) },
  { id: 'delete', label: 'Delete', onClick: handleDelete, variant: 'danger' },
];

<DataTable
  data={users}
  columns={columns}
  actions={actions}
  selectable
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/data-display-datatable)

## Badge

Status indicators with color variants.

```tsx
import { Badge, StatusBadge } from 'room-ui';

// Variants
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>

// With dot indicator
<Badge dot variant="success">Active</Badge>

// Pulsing animation
<Badge pulse variant="error">Live</Badge>

// Predefined status badges
<StatusBadge status="in-progress" />
<StatusBadge status="complete" />
<StatusBadge status="overdue" />
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/data-display-badge)

## Avatar

User avatars with fallback initials.

```tsx
import { Avatar } from 'room-ui';

<Avatar name="John Doe" />
<Avatar name="Jane Smith" src="/avatar.jpg" />
<Avatar name="Bob" size="lg" />
<Avatar name="Alice" status="online" />
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/data-display-avatar)

## Timeline

Vertical event timeline.

```tsx
import { Timeline } from 'room-ui';

<Timeline
  items={[
    {
      id: '1',
      icon: <CheckCircle />,
      content: <div>Task completed</div>,
    },
    {
      id: '2',
      icon: <AlertCircle />,
      content: <div>Warning issued</div>,
    },
  ]}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/data-display-timeline)

## StatCard

Statistics card with trend indicators.

```tsx
import { StatCard, StatsCardGrid } from 'room-ui';
import { DollarSign, Users } from 'lucide-react';

<StatsCardGrid columns={4}>
  <StatCard
    icon={<DollarSign />}
    label="Revenue"
    value="$125,000"
    change={{ value: 12.5, isPositive: true }}
  />
  <StatCard
    icon={<Users />}
    label="Users"
    value="1,234"
    subtitle="Active this month"
  />
</StatsCardGrid>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/data-display-statcard)

## Progress

Progress bar with multiple variants.

```tsx
import { Progress } from 'room-ui';

<Progress value={75} />
<Progress value={50} variant="success" />
<Progress value={25} size="sm" />
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/feedback-progress)

## Calendar

Full calendar with event markers.

```tsx
import { Calendar } from 'room-ui';

<Calendar
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
  events={events}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/data-display-calendar)
