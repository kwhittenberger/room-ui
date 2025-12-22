# Navigation Components

Help users move through your application.

## Sidebar

Collapsible navigation sidebar with nested items.

```tsx
import { Sidebar, SidebarHeader, SidebarGroup, SidebarFooter } from 'room-ui';
import type { SidebarItemProps } from 'room-ui';

<Sidebar>
  <SidebarHeader>
    <Logo />
    <span>App Name</span>
  </SidebarHeader>

  <SidebarGroup
    items={[
      { id: 'home', label: 'Home', icon: <Home />, active: true },
      { id: 'users', label: 'Users', icon: <Users />, badge: '5' },
      { id: 'settings', label: 'Settings', icon: <Settings /> },
    ] as SidebarItemProps[]}
  />

  <SidebarFooter>
    <Avatar name="User" size="sm" />
    <span>John Doe</span>
  </SidebarFooter>
</Sidebar>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/navigation-sidebar)

## Tabs

Tab navigation with underline and pill variants.

```tsx
import { Tabs } from 'room-ui';
import type { Tab } from 'room-ui';

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', content: <Overview /> },
  { id: 'details', label: 'Details', content: <Details /> },
  { id: 'settings', label: 'Settings', content: <Settings /> },
];

<Tabs tabs={tabs} defaultTab="overview" />
<Tabs tabs={tabs} variant="pills" />
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/navigation-tabs)

## Breadcrumbs

Path navigation with custom separators.

```tsx
import { Breadcrumbs } from 'room-ui';

<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Details' },
  ]}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/navigation-breadcrumbs)

## Pagination

Page navigation with size options.

```tsx
import { Pagination } from 'room-ui';

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={setPage}
  showPageSize
  pageSizeOptions={[10, 25, 50, 100]}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/navigation-pagination)

## Menu

Menu component with icons and dividers.

```tsx
import { Menu } from 'room-ui';
import { Edit, Trash, Copy } from 'lucide-react';

<Menu
  items={[
    { id: 'edit', label: 'Edit', icon: <Edit />, onClick: handleEdit },
    { id: 'copy', label: 'Copy', icon: <Copy />, onClick: handleCopy },
    { id: 'divider', type: 'divider' },
    { id: 'delete', label: 'Delete', icon: <Trash />, onClick: handleDelete, variant: 'danger' },
  ]}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/navigation-menu)

## Dropdown

Action dropdown menu.

```tsx
import { Dropdown } from 'room-ui';

<Dropdown
  trigger={<Button>Actions</Button>}
  items={[
    { label: 'Edit', onClick: handleEdit },
    { label: 'Delete', onClick: handleDelete },
  ]}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/navigation-dropdown)

## CommandPalette

Keyboard-driven command launcher (Cmd+K / Ctrl+K).

```tsx
import { CommandPalette } from 'room-ui';

<CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  commands={[
    { id: 'home', label: 'Go to Home', shortcut: 'G H', action: () => navigate('/') },
    { id: 'search', label: 'Search', shortcut: '/', action: openSearch },
  ]}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/navigation-commandpalette)

## TreeView

Hierarchical tree navigation.

```tsx
import { TreeView } from 'room-ui';

<TreeView
  items={[
    {
      id: 'folder1',
      label: 'Folder 1',
      children: [
        { id: 'file1', label: 'File 1.txt' },
        { id: 'file2', label: 'File 2.txt' },
      ],
    },
    { id: 'file3', label: 'File 3.txt' },
  ]}
  onSelect={handleSelect}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/navigation-treeview)
