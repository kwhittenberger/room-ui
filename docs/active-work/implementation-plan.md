# Room UI Migration Plan: Notebook-UI Feature Parity

## Overview

This document outlines the plan to bring all notebook-ui functionality into @room-ui while maintaining room-ui's dark theme UX rules.

## Key UX Rules to Maintain

### Color System (Dark Theme)
- **Background layers**: slate-900 → slate-800 → slate-700 → slate-600
- **Text colors**: slate-50 (primary) → slate-200 (secondary) → slate-400 (muted) → slate-500 (disabled)
- **Accent**: Cyan-500 (#06b6d4) with hover/active states
- **Semantics**: Emerald (success), Amber (warning), Red (error), Blue (info)
- **Borders**: slate-700 default, slate-600 hover, cyan-500 focus

### Component Patterns
- Use `forwardRef` for all components
- Use `cn()` utility for class merging
- Use `room-*` Tailwind tokens
- Support `className` prop for customization
- Use lucide-react for icons

## Current @room-ui Components (20)

### Core Primitives
- Box, Stack, Grid, GridItem, Text, Heading, Icon

### Buttons
- Button, IconButton, ActionButton, ButtonGroup

### Form Controls
- Input, Select, TextArea, Checkbox, Radio, RadioGroup, SearchInput, FormField, FormGroup

### Feedback
- Badge, StatusBadge, Spinner, ProgressBar

### Cards
- Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

## Components to Add from notebook-ui (~100+)

### Phase 1: Core Missing Primitives (5 components)
Priority: CRITICAL - Foundation for other components

| Component | notebook-ui | Adaptation Notes |
|-----------|-------------|------------------|
| Switch | Toggle switch | Dark bg-surface, cyan accent |
| Separator | Horizontal/vertical divider | slate-700 border |
| Progress | Progress bar | Already have ProgressBar, may need to align API |
| Avatar | User avatar with image/initials | Dark fallback bg |
| Loading/Skeleton | Skeleton loading states | Animated slate shimmer |

**Session Prompt**: `docs/active-work/phase-1-session.md`

### Phase 2: Feedback Components (7 components)
Priority: HIGH - Essential for user feedback

| Component | notebook-ui | Adaptation Notes |
|-----------|-------------|------------------|
| Toast + ToastContainer | Notifications | Dark bg-elevated, semantic border |
| Alert | Alert banners | Dark muted backgrounds |
| Modal + ModalFooter | Dialog overlay | Dark overlay, elevated card |
| Drawer + DrawerFooter | Slide-out panel | Dark panel on dark overlay |
| ConfirmDialog | Confirmation modal | Danger/primary button variants |
| Tooltip | Hover tooltip | Dark bg-hover with light text |
| Popover | Click popover | Dark elevated card |

**Session Prompt**: `docs/active-work/phase-2-session.md`

### Phase 3: Navigation Components (8 components)
Priority: HIGH - Critical for app structure

| Component | notebook-ui | Adaptation Notes |
|-----------|-------------|------------------|
| Tabs + TabsRoot/List/Trigger/Content | Tab navigation | Dark underline/pill variants |
| Breadcrumbs | Navigation breadcrumbs | Muted separators |
| Pagination | Page navigation | Ghost buttons, cyan active |
| Sidebar + SidebarGroup | Side navigation | Dark elevated panel |
| Menu + MenuDivider | Dropdown menu | Dark elevated card |
| Dropdown + DropdownTrigger | Dropdown selector | Dark surface background |
| StepIndicator | Multi-step indicator | Cyan active, muted inactive |
| PageNavigation | Page nav links | Ghost button style |

**Session Prompt**: `docs/active-work/phase-3-session.md`

### Phase 4: Advanced Form Components (15 components)
Priority: MEDIUM-HIGH - Rich form functionality

| Component | notebook-ui | Adaptation Notes |
|-----------|-------------|------------------|
| DatePicker | Date selection | Dark calendar popup |
| TimePicker | Time selection | Dark time dropdown |
| DateRangePicker | Date range | Dark dual calendar |
| DateTimePicker | Combined | Combine date + time |
| TimezoneSelector | TZ selection | Dark combobox |
| Combobox | Searchable select | Dark dropdown |
| MultiSelect | Multi-value select | Dark chips |
| NumberInput | Numeric input | Dark surface |
| PasswordInput | Password field | Dark with show/hide |
| MaskedInput | Formatted input | Dark surface |
| Autocomplete | Auto-complete | Dark suggestions |
| Slider | Range slider | Cyan track |
| Rating | Star rating | Amber stars |
| ColorPicker | Color selection | Dark picker UI |
| FileUpload | File upload | Dark dropzone |

**Session Prompt**: `docs/active-work/phase-4-session.md`

### Phase 5: Data Display Components (15 components)
Priority: HIGH - Core data visualization

| Component | notebook-ui | Adaptation Notes |
|-----------|-------------|------------------|
| DataTable | Full-featured table | Dark rows, hover states |
| DataTableCardView | Card view for table | Dark cards |
| DataGrid | Excel-like grid | Dark cells, formula bar |
| Spreadsheet | Spreadsheet view | Dark grid |
| EmptyState | Empty state display | Dark muted icon |
| Chip + ChipGroup | Tag chips | Dark variants |
| CurrencyDisplay | Currency formatting | Text component |
| CurrencyInput | Currency input | Dark surface |
| DateDisplay | Date formatting | Text component |
| StatCard | Statistics card | Dark elevated |
| StatsGrid | Stats layout | Dark grid |
| StatsCardGrid | Combined stats | Dark cards |
| Timeline | Timeline display | Dark line, cyan dots |
| TreeView | Tree structure | Dark nested items |
| CardView | Card list view | Dark cards |

**Session Prompt**: `docs/active-work/phase-5-session.md`

### Phase 6: Layout Components (12 components)
Priority: HIGH - App structure

| Component | notebook-ui | Adaptation Notes |
|-----------|-------------|------------------|
| Layout | Main layout wrapper | Dark base background |
| MobileLayout | Mobile-specific layout | Dark with safe areas |
| AppLayout | Full app layout | Dark sidebar + content |
| Page | Page container | Dark content area |
| PageLayout | Page structure | Dark padding |
| PageHeader | Page header | Dark text, actions |
| Dashboard + components | Dashboard layout | Dark panels |
| TwoColumnContent | Split layout | Dark columns |
| ControlBar | Action bar | Dark surface |
| ActionBar + components | Action buttons | Dark surface |
| FilterBar | Filter controls | Dark inputs |
| FilterControls | Filter UI | Dark controls |

**Session Prompt**: `docs/active-work/phase-6-session.md`

### Phase 7: Advanced Components (20 components)
Priority: MEDIUM - Rich functionality

| Component | notebook-ui | Adaptation Notes |
|-----------|-------------|------------------|
| Calendar | Calendar widget | Dark grid, cyan today |
| KanbanBoard | Kanban drag-drop | Dark columns/cards |
| RichTextEditor | WYSIWYG editor | Dark toolbar |
| MarkdownEditor | Markdown editor | Dark preview |
| Form + useFormContext | Form validation | Dark error states |
| FormWizard | Multi-step form | Dark steps |
| FieldArray | Dynamic fields | Dark rows |
| Stepper | Step wizard | Cyan active step |
| Transfer | Transfer list | Dark dual lists |
| Carousel | Image carousel | Dark nav dots |
| InfiniteScroll | Infinite loading | Dark loader |
| DropZone | Drag-drop zone | Dark dashed border |
| CommandPalette | Command palette | Dark search overlay |
| Accordion | Collapsible sections | Dark headers |
| Collapsible | Single collapse | Dark header |
| ExpandablePanel | Expandable area | Dark toggle |
| HoverCard | Hover preview | Dark card |
| ContextMenu | Right-click menu | Dark menu |
| AlertDialog | Alert confirmation | Dark modal |
| ErrorBoundary | Error boundary | Dark error UI |

**Session Prompt**: `docs/active-work/phase-7-session.md`

### Phase 8: Mobile Components (15 components)
Priority: MEDIUM - Mobile support

| Component | notebook-ui | Adaptation Notes |
|-----------|-------------|------------------|
| BottomSheet + components | Bottom sheet modal | Dark sheet |
| BottomNavigation | Bottom nav bar | Dark nav |
| MobileHeader | Mobile header | Dark header |
| FloatingActionButton | FAB button | Cyan primary |
| PullToRefresh | Pull to refresh | Dark spinner |
| SwipeableCard | Swipe card | Dark card |
| SwipeableListItem | Swipe list item | Dark row |
| SwipeActions | Swipe action buttons | Semantic colors |
| HorizontalScroll | Horizontal scroll | Dark scrollbar |
| NotificationBanner | Notification bar | Dark banner |
| NotificationBell | Notification dropdown | Dark dropdown |
| CompactStat | Compact statistic | Dark text |
| Show/Hide | Responsive utilities | No styling |
| MobileOnly/DesktopOnly | Responsive wrappers | No styling |
| MobileProvider | Mobile context | No styling |

**Session Prompt**: `docs/active-work/phase-8-session.md`

### Phase 9: Utilities and Hooks (Many)
Priority: LOW - Supporting functionality

| Utility | Purpose |
|---------|---------|
| useResponsive hooks | Viewport detection |
| useTableEnhancements | Table column resize/reorder |
| statisticsFormatter | Number formatting |
| excelExport | Excel export |
| formulaDefinitions | DataGrid formulas |
| MobileContext | Mobile state |

---

## Implementation Strategy

### For Each Component:

1. **Read** the notebook-ui source
2. **Adapt** styling to room-ui dark theme:
   - Replace `bg-white` → `bg-room-bg-elevated`
   - Replace `text-ink-*` → `text-room-text-*`
   - Replace `border-paper-*` → `border-room-border`
   - Replace `accent-*` → `room-accent-*`
   - Replace light theme semantics with dark equivalents
3. **Ensure** forwardRef pattern is used
4. **Add** to component exports in `src/components/index.ts`
5. **Test** in Storybook

### Styling Mappings

```
notebook-ui          →  room-ui
-------------------------------------------
bg-white             →  bg-room-bg-elevated
bg-paper-50          →  bg-room-bg-surface
bg-paper-100         →  bg-room-bg-hover
text-ink-900         →  text-room-text-primary
text-ink-600         →  text-room-text-secondary
text-ink-400         →  text-room-text-muted
border-paper-200     →  border-room-border
accent-500           →  room-accent (cyan-500)
accent-600           →  room-accent-hover
success-500          →  room-success
warning-500          →  room-warning
error-500            →  room-error
```

---

## Execution Order

Start with Phase 1 immediately, as these are foundational components needed by later phases.

Phases 2-3 should be done next as they provide essential user feedback and navigation.

Phases 4-6 are the bulk of the work and can be parallelized.

Phases 7-8 are nice-to-have advanced features.

Phase 9 should be done as needed during other phases.
