# Phase 6: Layout Components

## Session Goal
Add layout components for structuring application pages and content areas.

## Components to Implement

### 1. Layout
Main application layout wrapper.

**Source**: `D:\repos\notebook-ui\src\components\Layout.tsx`

**Props**:
- `children`: ReactNode
- `sidebar`: ReactNode
- `header`: ReactNode
- `footer`: ReactNode
- `sidebarCollapsed`: boolean
- `onSidebarCollapse`: (collapsed: boolean) => void

**Styling Adaptations**:
- Main bg: `bg-room-bg-base`
- Content area: full height flex

### 2. MobileLayout
Mobile-optimized layout with safe areas.

**Source**: `D:\repos\notebook-ui\src\components\MobileLayout.tsx`

**Props**:
- `children`: ReactNode
- `header`: ReactNode
- `footer`: ReactNode
- `bottomNavigation`: ReactNode
- `safeArea`: boolean

**Styling Adaptations**:
- Uses CSS `env(safe-area-inset-*)` for notch/home bar

### 3. AppLayout
Full application layout with sidebar, header, content.

**Source**: `D:\repos\notebook-ui\src\components\AppLayout.tsx`

**Props**:
- `children`: ReactNode
- `sidebarItems`: SidebarItem[]
- `logo`: ReactNode
- `user`: { name, email, avatar }
- `notifications`: NotificationItem[]
- `onLogout`: () => void
- `searchEnabled`: boolean
- `onSearch`: (query: string) => void

**Styling Adaptations**:
- Header bg: `bg-room-bg-elevated`
- Sidebar bg: `bg-room-bg-elevated`
- Content bg: `bg-room-bg-base`

### 4. Page
Page container with standard padding.

**Source**: `D:\repos\notebook-ui\src\components\Page.tsx`

**Props**:
- `children`: ReactNode
- `title`: string
- `subtitle`: string
- `actions`: ReactNode
- `breadcrumbs`: BreadcrumbItem[]
- `loading`: boolean
- `maxWidth`: 'sm' | 'md' | 'lg' | 'xl' | 'full'

**Styling Adaptations**:
- Background: `bg-room-bg-base`
- Title: `text-room-text-primary`
- Subtitle: `text-room-text-secondary`

### 5. PageLayout
Structured page layout with regions.

**Source**: `D:\repos\notebook-ui\src\components\PageLayout.tsx`

**Props**:
- `header`: ReactNode
- `sidebar`: ReactNode
- `content`: ReactNode
- `footer`: ReactNode
- `sidebarPosition`: 'left' | 'right'
- `sidebarWidth`: string

### 6. PageHeader
Page header with title and actions.

**Source**: `D:\repos\notebook-ui\src\components\PageHeader.tsx`

**Props**:
- `title`: string
- `subtitle`: string
- `icon`: LucideIcon
- `actions`: PageHeaderAction[]
- `breadcrumbs`: BreadcrumbItem[]
- `tabs`: Tab[]
- `activeTab`: string
- `onTabChange`: (tabId: string) => void
- `sticky`: boolean

**Styling Adaptations**:
- Background: `bg-room-bg-elevated` (when sticky)
- Title: `text-room-text-primary`
- Subtitle: `text-room-text-muted`
- Border bottom: `border-room-border`

### 7. Dashboard + DashboardHeader + DashboardContent
Dashboard layout components.

**Source**: `D:\repos\notebook-ui\src\components\Dashboard.tsx`

**Props (Dashboard)**:
- `children`: ReactNode
- `title`: string
- `subtitle`: string
- `actions`: ReactNode
- `filters`: ReactNode
- `loading`: boolean

**Styling Adaptations**:
- Same as Page

### 8. TwoColumnContent
Two-column split layout.

**Source**: `D:\repos\notebook-ui\src\components\TwoColumnContent.tsx`

**Props**:
- `left`: ReactNode
- `right`: ReactNode
- `leftWidth`: string (e.g., '300px', '30%')
- `rightWidth`: string
- `gap`: string
- `stickyLeft`: boolean
- `stickyRight`: boolean
- `mobileStack`: 'left-first' | 'right-first'

**Styling Adaptations**:
- Divider: `border-room-border` (optional)

### 9. ControlBar
Action/control bar for data pages.

**Source**: `D:\repos\notebook-ui\src\components\ControlBar.tsx`

**Props**:
- `sections`: ControlBarSection[]
- `sticky`: boolean

**Exports**:
- `createPageControlsSection`
- `createFiltersSection`
- `createActionsSection`
- `createQueryDetailsSection`

**Styling Adaptations**:
- Background: `bg-room-bg-elevated`
- Border: `border-room-border`
- Section dividers: `border-room-border`

### 10. ActionBar + ActionBarLeft/Center/Right
Flexible action bar with regions.

**Source**: `D:\repos\notebook-ui\src\components\ActionBar.tsx`

**Props**:
- `children`: ReactNode (ActionBarLeft, Center, Right)
- `sticky`: boolean
- `variant`: 'default' | 'elevated'

**Styling Adaptations**:
- Default bg: `bg-room-bg-base`
- Elevated bg: `bg-room-bg-elevated`

### 11. FilterBar
Filter controls container.

**Source**: `D:\repos\notebook-ui\src\components\FilterBar.tsx`

**Props**:
- `filters`: FilterConfig[]
- `values`: Record<string, any>
- `onChange`: (values) => void
- `onClear`: () => void
- `collapsible`: boolean
- `defaultExpanded`: boolean

**Styling Adaptations**:
- Background: `bg-room-bg-surface`
- Border: `border-room-border`

### 12. FilterControls
Individual filter control wrapper.

**Source**: `D:\repos\notebook-ui\src\components\FilterControls.tsx`

**Props**:
- Wrapper for filter inputs with label and clear

### 13. FilterStatusBanner
Active filters display banner.

**Source**: `D:\repos\notebook-ui\src\components\FilterStatusBanner.tsx`

**Props**:
- `filters`: AppliedFilter[]
- `onRemove`: (filterId: string) => void
- `onClearAll`: () => void

**Styling Adaptations**:
- Background: `bg-room-accent/10`
- Text: `text-room-accent`
- Clear button: `text-room-text-muted hover:text-room-text-primary`

### 14. ExpandableToolbar
Expandable toolbar with sections.

**Source**: `D:\repos\notebook-ui\src\components\ExpandableToolbar.tsx`

**Props**:
- `sections`: ToolbarSection[]
- `expanded`: boolean
- `onToggle`: () => void

## File Structure

```
src/components/
├── Layout/
│   ├── Layout.tsx
│   └── index.ts
├── MobileLayout/
│   ├── MobileLayout.tsx
│   └── index.ts
├── AppLayout/
│   ├── AppLayout.tsx
│   └── index.ts
├── Page/
│   ├── Page.tsx
│   └── index.ts
├── PageLayout/
│   ├── PageLayout.tsx
│   └── index.ts
├── PageHeader/
│   ├── PageHeader.tsx
│   └── index.ts
├── Dashboard/
│   ├── Dashboard.tsx
│   ├── DashboardHeader.tsx
│   ├── DashboardContent.tsx
│   └── index.ts
├── TwoColumnContent/
│   ├── TwoColumnContent.tsx
│   └── index.ts
├── ControlBar/
│   ├── ControlBar.tsx
│   ├── sections.ts
│   └── index.ts
├── ActionBar/
│   ├── ActionBar.tsx
│   ├── ActionBarLeft.tsx
│   ├── ActionBarCenter.tsx
│   ├── ActionBarRight.tsx
│   └── index.ts
├── FilterBar/
│   ├── FilterBar.tsx
│   └── index.ts
├── FilterControls/
│   ├── FilterControls.tsx
│   └── index.ts
├── FilterStatusBanner/
│   ├── FilterStatusBanner.tsx
│   └── index.ts
├── ExpandableToolbar/
│   ├── ExpandableToolbar.tsx
│   └── index.ts
```

## Testing Checklist

- [ ] Layout renders sidebar, header, content
- [ ] Layout sidebar collapse works
- [ ] MobileLayout respects safe areas
- [ ] AppLayout integrates all parts
- [ ] Page renders with breadcrumbs
- [ ] Page loading state
- [ ] PageLayout sidebar positions
- [ ] PageHeader sticky behavior
- [ ] PageHeader tabs work
- [ ] Dashboard filters area
- [ ] TwoColumnContent sticky columns
- [ ] TwoColumnContent mobile stacking
- [ ] ControlBar sections render
- [ ] ControlBar sticky
- [ ] ActionBar regions align
- [ ] FilterBar expand/collapse
- [ ] FilterBar clear all
- [ ] FilterStatusBanner remove filter
- [ ] ExpandableToolbar toggle

## Dependencies

- Phase 3 components (Sidebar, Breadcrumbs, Tabs)
- Phase 4 components (form controls for filters)
