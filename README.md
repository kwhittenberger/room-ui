# @room-ui

[![npm version](https://img.shields.io/npm/v/room-ui.svg)](https://www.npmjs.com/package/room-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Storybook](https://img.shields.io/badge/Storybook-8.0-ff4785)](https://6949986ceb769ed38d88c5ee-oisdnmkbty.chromatic.com/)

A modern React component library with a dark, professional aesthetic designed for Deal Room and data-intensive applications. Built with TypeScript, Tailwind CSS, and designed for production use.

## Features

- **Dark Theme Design** - Professional slate/cyan palette optimized for extended use and low-light environments
- **135+ Components** - Comprehensive set of production-ready React components
- **71+ Storybook Stories** - Extensive documentation with interactive examples
- **TypeScript First** - Full TypeScript support with comprehensive type definitions
- **Tailwind CSS v3** - Built on Tailwind with custom design tokens
- **Accessible** - WCAG AA compliant with ARIA attributes and keyboard navigation
- **Tree-shakeable** - Import only what you need
- **Responsive** - Mobile-first design with responsive utilities
- **Virtual Scrolling** - High-performance rendering for large datasets (DataTable)
- **forwardRef Support** - All form components support ref forwarding

## Installation

```bash
npm install room-ui
# or
yarn add room-ui
# or
pnpm add room-ui
```

### Peer Dependencies

```bash
npm install react react-dom lucide-react tailwindcss
```

## Quick Start

### 1. Import Styles

In your main entry file (e.g., `src/main.tsx`):

```tsx
import 'room-ui/styles.css';
```

### 2. Configure Tailwind

In your `tailwind.config.js`:

```javascript
import roomConfig from 'room-ui/tailwind-config';

export default {
  ...roomConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/room-ui/src/**/*.{js,ts,jsx,tsx}',
  ],
};
```

### 3. Use Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from 'room-ui';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Room UI</CardTitle>
      </CardHeader>
      <CardContent>
        <p>A beautiful dark-themed component library</p>
        <Button variant="primary">Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

## Component Categories

### Form Components (20+)
- **Button** - Primary, secondary, ghost, danger, outline variants with loading states
- **IconButton** - Icon-only button with variants
- **ActionButton** - Button with icon and label
- **ButtonGroup** - Toggle button groups
- **Input** - Text input with prefix/suffix icons, clearable, validation states
- **SearchInput** - Search-specific input with clear button
- **PasswordInput** - Password field with show/hide toggle
- **NumberInput** - Numeric input with step controls
- **Select** - Searchable dropdown with clearable option
- **MultiSelect** - Multiple selection dropdown
- **Textarea** - Text area with resize control
- **Checkbox** - Checkbox with icon support
- **Radio** - Radio buttons with icon support
- **RadioGroup** - Grouped radio buttons
- **Switch** - Toggle switch with loading state
- **Slider** - Range input with value display
- **DatePicker** - Calendar date picker
- **TimePicker** - Time selection input
- **FileUpload** - Drag-and-drop file upload
- **FormField** - Form field wrapper with label/error
- **FormGroup** - Grouped form fields

### Layout Components (15+)
- **Box** - Generic container with spacing utilities
- **Stack** - Vertical/horizontal flex layout
- **Grid** - Responsive grid system with GridItem
- **Text** - Typography component with size variants
- **Heading** - Heading typography (h1-h6)
- **Card** - Container with Header, Title, Content, Footer sections
- **CardView** - Card grid layout for data display
- **Page** - Standard page container
- **PageLayout** - Page layout with title and description
- **Layout** - Complete app layout with sidebar
- **AppLayout** - Layout with toolbar and status bar
- **Dashboard** - Dashboard container components
- **TwoColumnContent** - Sidebar + main content layout
- **Separator** - Horizontal/vertical divider
- **Spacer** - Flexible spacing component

### Navigation Components (12+)
- **Sidebar** - Collapsible navigation sidebar with nested items
- **Breadcrumbs** - Path navigation with custom separators
- **Pagination** - Page navigation with size options
- **Tabs** - Tab navigation (underline and pill variants)
- **StepIndicator** - Progress stepper
- **TreeView** - Hierarchical tree navigation
- **CommandPalette** - Keyboard-driven command launcher (Cmd+K style)
- **Dropdown** - Action menu with icons and dividers
- **ContextMenu** - Right-click context menus
- **Menu** - Menu component
- **ExpandableToolbar** - Collapsible toolbar
- **FilterStatusBanner** - Active filter indicator

### Data Display Components (15+)
- **DataTable** - Feature-rich table with sorting, filtering, selection, row actions, expansion, virtual scrolling
- **Table** - Basic table component
- **Badge** - Status indicators with variants
- **StatusBadge** - Status badges with color variants
- **Avatar** - User avatars with fallback initials
- **Timeline** - Vertical/horizontal event timeline
- **KanbanBoard** - Drag-and-drop kanban board
- **Calendar** - Full calendar with event markers
- **CurrencyDisplay** - Formatted currency display
- **DateDisplay** - Formatted date display
- **StatCard** - Statistics card with trends
- **StatsCardGrid** - Grid layout for stat cards
- **ExpandableRowButton** - Row expansion toggle

### Feedback Components (12+)
- **Toast** - Notification system (success, error, warning, info)
- **Alert** - Notification banners with action buttons
- **AlertDialog** - Alert modal with variants
- **Modal** - Dialog with multiple sizes and animations
- **Drawer** - Side-sliding panel (left, right, top, bottom)
- **AdminModal** - Tabbed admin configuration modal
- **Tooltip** - Hover tooltips with positioning
- **HoverCard** - Rich content hover cards
- **Popover** - Rich content popovers
- **EmptyState** - No data/empty states
- **NotificationBar** - Persistent notification bar
- **ConfirmDialog** - Confirmation dialogs

### Loading & Progress (8+)
- **Spinner** - Loading spinner
- **Loading** - Spinners, dots, pulse loaders
- **Progress** - Linear progress bar with variants
- **ProgressBar** - Progress bar component
- **Skeleton** - Loading placeholders
- **SkeletonCard** - Card loading skeleton
- **SkeletonTable** - Table loading skeleton
- **LoadingOverlay** - Full-screen loading overlay

### Advanced Components (20+)
- **Accordion** - Collapsible panels with custom icons
- **Transfer** - Dual-list item transfer with search
- **Carousel** - Image/content carousel with auto-play
- **Stepper** - Multi-step wizard
- **Rating** - Star rating input
- **Autocomplete** - Auto-suggest input
- **Combobox** - Searchable select with custom options
- **DateRangePicker** - Date range selection
- **RichTextEditor** - WYSIWYG editor
- **MarkdownEditor** - Markdown editing
- **InfiniteScroll** - Infinite scroll loading
- **TimezoneSelector** - Timezone selection with search
- **QueryTransparency** - SQL query display/explanation

### Utility Components & Functions
- **Show/Hide** - Responsive visibility utilities
- **ErrorBoundary** - Error boundary wrapper
- **Icon** - Icon wrapper component
- **cn** - Class name utility (clsx + tailwind-merge)
- **statisticsFormatter** - Number formatting utilities
- **tableEnhancements** - Column resize/reorder persistence
- **excelExport** - CSV/Excel export utilities
- **formulaDefinitions** - Spreadsheet formula library

### Hooks
- **useColumnResize** - Column resize state management
- **useColumnReorder** - Column reorder state management

## Design System

### Color Palette

The library uses a dark slate/cyan palette optimized for professional applications:

```javascript
{
  background: {
    base: '#0f172a',      // slate-900 - main app background
    elevated: '#1e293b',  // slate-800 - cards, panels
    surface: '#334155',   // slate-700 - inputs, raised elements
    hover: '#475569',     // slate-600 - hover states
  },
  text: {
    primary: '#f8fafc',   // slate-50 - headings, important text
    secondary: '#e2e8f0', // slate-200 - body text
    muted: '#94a3b8',     // slate-400 - helper text, labels
    disabled: '#64748b',  // slate-500 - disabled states
  },
  accent: '#06b6d4',      // cyan-500 - primary accent
  success: '#10b981',     // emerald-500
  warning: '#f59e0b',     // amber-500
  error: '#ef4444',       // red-500
  info: '#3b82f6',        // blue-500
}
```

### Typography

- **Font Family**: Geist Sans / System font stack
- **Monospace**: Geist Mono / System monospace
- **Font Sizes**: 12px (xs) to 48px (4xl)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Border Radius

- **sm**: 8px - small elements
- **DEFAULT**: 12px - standard components
- **lg**: 16px - large containers

## Component Examples

### Button with Loading State

```tsx
import { Button } from 'room-ui';
import { Save } from 'lucide-react';

<Button 
  variant="primary" 
  size="md" 
  loading={isSaving}
  icon={Save}
  onClick={handleSave}
>
  Save Changes
</Button>
```

### Toast Notifications

```tsx
import { addSuccessMessage, addErrorMessage, ToastContainer } from 'room-ui';

function App() {
  const handleSuccess = () => {
    addSuccessMessage('Changes saved successfully!');
  };

  const handleError = () => {
    addErrorMessage('Failed to save changes', 'Please try again');
  };

  return (
    <>
      <Button onClick={handleSuccess}>Show Success</Button>
      <Button onClick={handleError}>Show Error</Button>
      <ToastContainer position="top-right" />
    </>
  );
}
```

### DataTable with Advanced Features

```tsx
import { DataTable, Badge } from 'room-ui';
import { Edit, Trash } from 'lucide-react';

const columns = [
  { key: 'name', header: 'Name', sortable: true, filterable: true },
  { key: 'email', header: 'Email', sortable: true },
  { 
    key: 'status', 
    header: 'Status',
    render: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'default'}>
        {row.status}
      </Badge>
    )
  },
];

const actions = [
  { 
    label: 'Edit', 
    icon: Edit, 
    onClick: (row) => handleEdit(row) 
  },
  { 
    label: 'Delete', 
    icon: Trash, 
    onClick: (row) => handleDelete(row), 
    variant: 'danger' 
  },
];

<DataTable
  data={users}
  columns={columns}
  actions={actions}
  loading={loading}
  selectable
  onRowSelect={(selectedRows) => console.log(selectedRows)}
  expandable
  renderExpandedRow={(row) => <UserDetails user={row} />}
  virtualized
  virtualHeight="600px"
/>
```

### Card Layout

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from 'room-ui';

<Card>
  <CardHeader>
    <CardTitle>Project Overview</CardTitle>
    <CardDescription>Summary of current project status</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your project content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Save</Button>
  </CardFooter>
</Card>
```

### Layout with Sidebar

```tsx
import { Layout, Sidebar, Page } from 'room-ui';
import { Home, Users, Settings } from 'lucide-react';

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'users', label: 'Users', icon: Users, href: '/users' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

function App() {
  return (
    <Layout sidebar={<Sidebar items={menuItems} />}>
      <Page>
        {/* Your page content */}
      </Page>
    </Layout>
  );
}
```

### Statistics Dashboard

```tsx
import { StatsCardGrid, StatCard } from 'room-ui';
import { Users, DollarSign, TrendingUp } from 'lucide-react';

<StatsCardGrid columns={3}>
  <StatCard
    icon={<Users className="h-5 w-5 text-cyan-400" />}
    label="Total Users"
    value="12,345"
    change={{ value: 12.5, isPositive: true }}
  />
  <StatCard
    icon={<DollarSign className="h-5 w-5 text-emerald-400" />}
    label="Revenue"
    value="$48,250"
    change={{ value: 8.2, isPositive: true }}
  />
  <StatCard
    icon={<TrendingUp className="h-5 w-5 text-purple-400" />}
    label="Growth"
    value="24%"
    subtitle="This quarter"
  />
</StatsCardGrid>
```

## Development

```bash
# Install dependencies
npm install

# Build library
npm run build

# Watch mode
npm run dev

# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook

# Type check
npm run type-check

# Lint
npm run lint
```

## API Reference

### Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'outline'` | `'secondary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `icon` | `LucideIcon` | - | Icon component (from lucide-react) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable button |

### Input Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Input label |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text below input |
| `leftIcon` | `LucideIcon` | - | Icon on left side |
| `rightIcon` | `LucideIcon` | - | Icon on right side |
| `clearable` | `boolean` | `false` | Show clear button |

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | `[]` | Table data |
| `columns` | `Column<T>[]` | `[]` | Column definitions |
| `actions` | `Action<T>[]` | - | Row actions |
| `loading` | `boolean` | `false` | Show loading state |
| `selectable` | `boolean` | `false` | Enable row selection |
| `expandable` | `boolean` | `false` | Enable row expansion |
| `virtualized` | `boolean` | `false` | Enable virtual scrolling |
| `virtualHeight` | `string` | `'400px'` | Height for virtual scrolling |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - Copyright (c) 2025

See [LICENSE](./LICENSE) for full details.

## Related Projects

- [@papernote/ui](https://github.com/kwhittenberger/papernote-ui) - Light-themed sibling library with paper notebook aesthetic

## Links

- [npm Package](https://www.npmjs.com/package/room-ui)
- [Live Storybook](https://6949986ceb769ed38d88c5ee-oisdnmkbty.chromatic.com/)
- [GitHub Repository](https://github.com/dewart/room-ui)
- [Report Issues](https://github.com/dewart/room-ui/issues)
