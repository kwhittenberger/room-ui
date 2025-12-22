---
layout: home

hero:
  name: "room-ui"
  text: "Dark Professional Aesthetic"
  tagline: A modern React component library designed for Deal Room and data-intensive applications
  image:
    src: /logo.svg
    alt: room-ui
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: View Components
      link: /components/
    - theme: alt
      text: Live Demo
      link: https://main--6949986ceb769ed38d88c5ee.chromatic.com/

features:
  - icon: 🌙
    title: Dark Theme Design
    details: Professional slate/cyan palette optimized for extended use and low-light environments. Perfect for data-intensive applications.

  - icon: ⚡
    title: 135+ Components
    details: Comprehensive set of production-ready React components covering forms, layouts, data display, navigation, and more.

  - icon: 📚
    title: 70+ Storybook Stories
    details: Extensive documentation with 600+ interactive examples. See every component in action.

  - icon: 🎯
    title: TypeScript First
    details: Full TypeScript support with comprehensive type definitions. Excellent IntelliSense experience.

  - icon: 🎨
    title: Tailwind CSS v3
    details: Built on Tailwind with custom design tokens. Easy to customize and extend.

  - icon: ♿
    title: Accessible
    details: WCAG AA compliant with ARIA attributes and full keyboard navigation support.

  - icon: 🚀
    title: Tree-shakeable
    details: Import only what you need. Optimized bundle size with ESM support.

  - icon: 📱
    title: Responsive
    details: Mobile-first design with responsive utilities. Works beautifully on all devices.

  - icon: 🔧
    title: Virtual Scrolling
    details: High-performance rendering for large datasets. Handle 10,000+ rows with ease.
---

## Quick Start

::: code-group

```bash [npm]
npm install room-ui
```

```bash [yarn]
yarn add room-ui
```

```bash [pnpm]
pnpm add room-ui
```

:::

### Peer Dependencies

```bash
npm install react react-dom lucide-react tailwindcss
```

### Basic Usage

```tsx
import 'room-ui/styles';
import { Button, Card, CardHeader, CardTitle, CardContent } from 'room-ui';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to room-ui</CardTitle>
      </CardHeader>
      <CardContent>
        <p>A beautiful component library with dark professional aesthetic</p>
        <Button variant="primary">Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

## Component Categories

### Form Components (20+)
Button, Input, Select, MultiSelect, DatePicker, TimePicker, DateTimePicker, Textarea, Checkbox, RadioGroup, Switch, Rating, PasswordInput, NumberInput, Slider, ColorPicker, FileUpload, SearchInput, TimezoneSelector

### Layout Components (15+)
Stack, Grid, Box, Text, Card, Modal, Drawer, Page, PageLayout, Layout, AppLayout, Dashboard, TwoColumnContent, Separator, Spacer

### Data Display (15+)
DataTable, Table, Badge, StatusBadge, Avatar, Timeline, KanbanBoard, Calendar, CurrencyDisplay, DateDisplay, StatCard, StatsCardGrid, Progress, CardView

### Navigation (12+)
Breadcrumbs, Pagination, Sidebar, Tabs, StepIndicator, Menu, Dropdown, CommandPalette, TreeView, ContextMenu, ExpandableToolbar, FilterStatusBanner

### Feedback Components (12+)
Toast, Alert, AlertDialog, Modal, Drawer, Tooltip, HoverCard, Popover, EmptyState, Loading, Skeleton, LoadingOverlay, ConfirmDialog, NotificationBar

### Advanced Components (20+)
Accordion, Transfer, Carousel, Stepper, ButtonGroup, Autocomplete, Combobox, DateRangePicker, FormWizard, RichTextEditor, MarkdownEditor, InfiniteScroll, DropZone, ErrorBoundary, AdminModal, QueryTransparency

## Why room-ui?

### Production Ready
Published on npm, documented in Storybook with 600+ examples, comprehensive TypeScript support, optimized bundle size.

### Developer Experience
TypeScript first, tree-shakeable exports, virtual scrolling for large datasets, optimized bundle size, fast build times.

### Design System
Dark slate/cyan palette, professional appearance, minimalist design philosophy optimized for data-intensive applications.

### Accessibility
WCAG AA compliant, ARIA attributes throughout, full keyboard navigation, screen reader support.

## Related Projects

- [@papernote/ui](https://github.com/kwhittenberger/papernote-ui) - Light-themed sibling library with paper notebook aesthetic

## Resources

- [Live Storybook](https://main--6949986ceb769ed38d88c5ee.chromatic.com/) - Interactive component playground
- [npm Package](https://www.npmjs.com/package/room-ui) - Published package
- [GitHub](https://github.com/kwhittenberger/room-ui) - Source code and issues
- [Design System](/design-system) - Colors, typography, and patterns

## License

MIT License - Copyright (c) 2025 kwhittenberger
