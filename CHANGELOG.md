# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-12-22

### Added

#### Badge Enhancements
- **pulse** prop - Adds pulsing animation for attention-grabbing badges
- **dot** prop - Shows a colored dot indicator before badge text
- **icon** prop - Support for custom icons in badges
- **outline** variant - New transparent badge style with border

#### StatusBadge New Statuses
- `archived` - For archived items (neutral variant)
- `cancelled` - For cancelled items (error variant)
- `on-hold` - For paused/waiting items (warning variant)
- `review` - For items in review (info variant)

#### Sample Application Stories
- **DealRoomExample** - Real-world Deal Room application stories showing Dashboard, Deals List, and Contact Detail views

#### Developer Experience
- ESLint 9 flat config support
- Relaxed hooks rules for Storybook stories

---

## [0.1.0] - 2025-12-22

### Added

#### Core Components
- **Box** - Generic container with spacing utilities
- **Stack** - Vertical/horizontal flex layout
- **Grid** - Responsive grid system with GridItem
- **Text** - Typography component with size variants
- **Heading** - Heading typography (h1-h6)
- **Icon** - Icon wrapper component

#### Button Components
- **Button** - Primary, secondary, ghost, danger, outline variants with loading states
- **IconButton** - Icon-only button with variants
- **ActionButton** - Button with icon and label
- **ButtonGroup** - Toggle button groups

#### Form Components
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
- **TimezoneSelector** - Timezone selection with search
- **FileUpload** - Drag-and-drop file upload
- **FormField** - Form field wrapper with label/error
- **FormGroup** - Grouped form fields

#### Card Components
- **Card** - Container with Header, Title, Content, Footer sections
- **CardHeader** - Card header section
- **CardTitle** - Card title typography
- **CardDescription** - Card description text
- **CardContent** - Card body content
- **CardFooter** - Card footer section
- **CardView** - Card grid layout for data display

#### Layout Components
- **Page** - Standard page container
- **PageLayout** - Page layout with title and description
- **Layout** - Complete app layout with sidebar
- **AppLayout** - Layout with toolbar and status bar
- **Dashboard** - Dashboard container components
- **TwoColumnContent** - Sidebar + main content layout
- **Separator** - Horizontal/vertical divider
- **Spacer** - Flexible spacing component

#### Navigation Components
- **Sidebar** - Collapsible navigation sidebar with nested items
- **Breadcrumbs** - Path navigation with custom separators
- **Pagination** - Page navigation with size options
- **Tabs** - Tab navigation (underline and pill variants)
- **StepIndicator** - Progress stepper
- **TreeView** - Hierarchical tree navigation
- **CommandPalette** - Keyboard-driven command launcher
- **Dropdown** - Action menu with icons and dividers
- **ContextMenu** - Right-click context menus
- **Menu** - Menu component
- **ExpandableToolbar** - Collapsible toolbar
- **FilterStatusBanner** - Active filter indicator

#### Data Display Components
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

#### Feedback Components
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

#### Loading & Progress Components
- **Spinner** - Loading spinner
- **Loading** - Spinners, dots, pulse loaders
- **Progress** - Linear progress bar with variants
- **ProgressBar** - Progress bar component
- **Skeleton** - Loading placeholders
- **SkeletonCard** - Card loading skeleton
- **SkeletonTable** - Table loading skeleton
- **LoadingOverlay** - Full-screen loading overlay

#### Advanced Components
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
- **QueryTransparency** - SQL query display/explanation

#### Utilities
- **cn** - Class name utility (clsx + tailwind-merge)
- **statisticsFormatter** - Number formatting utilities
- **tableEnhancements** - Column resize/reorder persistence
- **excelExport** - CSV/Excel export utilities
- **formulaDefinitions** - Spreadsheet formula library (30+ formulas)

#### Hooks
- **useColumnResize** - Column resize state management
- **useColumnReorder** - Column reorder state management

#### Theme System
- Dark slate/cyan color palette
- Custom Tailwind CSS utilities (`bg-room-*`, `text-room-*`, etc.)
- Typography tokens (Geist Sans/Mono fonts)
- Border radius tokens
- Shadow tokens

#### Documentation
- 71+ Storybook stories with interactive examples
- Comprehensive README with installation and usage guides
- API documentation for key components

### Technical
- TypeScript 5.7 support
- React 18/19 compatibility
- Vite build system with ESM and CommonJS outputs
- Tree-shakeable exports
- forwardRef support for all form components
