# Phase 3: Navigation Components

## Session Goal
Add navigation components for app structure and user navigation patterns.

## Components to Implement

### 1. Tabs (Data-driven + Compound)
Tab navigation with content panels.

**Source**: `D:\repos\notebook-ui\src\components\Tabs.tsx`

**Exports**:
- `Tabs` (data-driven API)
- `TabsRoot`, `TabsList`, `TabsTrigger`, `TabsContent` (compound API)

**Props (Tabs - data-driven)**:
- `tabs`: Tab[] (id, label, icon, content, disabled, badge, badgeVariant, closeable)
- `activeTab`: string (controlled)
- `defaultTab`: string (uncontrolled)
- `variant`: 'underline' | 'pill'
- `orientation`: 'horizontal' | 'vertical'
- `size`: 'sm' | 'md' | 'lg'
- `onChange`: (tabId: string) => void
- `lazy`: boolean
- `preserveState`: boolean
- `closeable`: boolean
- `onClose`: (tabId: string) => void
- `showAddButton`: boolean
- `onAdd`: () => void

**Styling Adaptations**:
- Underline border: `border-room-border`
- Active underline: `border-room-accent`
- Pill background: `bg-room-bg-surface`
- Active pill: `bg-room-bg-elevated`
- Text inactive: `text-room-text-muted`
- Text active: `text-room-text-primary`

### 2. Breadcrumbs
Navigation breadcrumb trail.

**Source**: `D:\repos\notebook-ui\src\components\Breadcrumbs.tsx`

**Props**:
- `items`: BreadcrumbItem[] (label, href, icon)
- `separator`: ReactNode
- `maxItems`: number (truncation)
- `className`: string

**Styling Adaptations**:
- Text: `text-room-text-muted`
- Current item: `text-room-text-primary`
- Hover: `text-room-accent`
- Separator: `text-room-text-disabled`

### 3. Pagination
Page navigation controls.

**Source**: `D:\repos\notebook-ui\src\components\Pagination.tsx`

**Props**:
- `currentPage`: number
- `totalPages`: number
- `onPageChange`: (page: number) => void
- `siblingCount`: number
- `showFirstLast`: boolean
- `size`: 'sm' | 'md' | 'lg'

**Styling Adaptations**:
- Button bg: `bg-room-bg-surface`
- Active button: `bg-room-accent text-white`
- Hover: `bg-room-bg-hover`
- Disabled: `opacity-50`

### 4. Sidebar + SidebarGroup
Side navigation panel.

**Source**: `D:\repos\notebook-ui\src\components\Sidebar.tsx`

**Props (Sidebar)**:
- `items`: SidebarItem[] (label, icon, href, active, badge, children)
- `collapsed`: boolean
- `onCollapse`: (collapsed: boolean) => void
- `header`: ReactNode
- `footer`: ReactNode

**Props (SidebarGroup)**:
- `title`: string
- `collapsible`: boolean
- `children`: ReactNode

**Styling Adaptations**:
- Background: `bg-room-bg-elevated`
- Border: `border-room-border`
- Item hover: `bg-room-bg-surface`
- Item active: `bg-room-accent/10 text-room-accent`
- Text: `text-room-text-secondary`
- Icon: `text-room-text-muted`

### 5. Menu + MenuDivider
Dropdown menu component.

**Source**: `D:\repos\notebook-ui\src\components\Menu.tsx`

**Props**:
- `items`: MenuItem[] (label, icon, onClick, disabled, danger, children)
- `trigger`: ReactNode
- `align`: 'start' | 'end'

**Styling Adaptations**:
- Background: `bg-room-bg-elevated`
- Border: `border-room-border`
- Item hover: `bg-room-bg-surface`
- Item text: `text-room-text-secondary`
- Danger item: `text-room-error`
- Divider: `border-room-border`

### 6. Dropdown + DropdownTrigger
Dropdown selector component.

**Source**: `D:\repos\notebook-ui\src\components\Dropdown.tsx`

**Props**:
- `items`: DropdownItem[] (label, value, icon, disabled)
- `value`: string
- `onChange`: (value: string) => void
- `placeholder`: string
- `disabled`: boolean

**Styling Adaptations**:
- Trigger bg: `bg-room-bg-surface`
- Dropdown bg: `bg-room-bg-elevated`
- Item hover: `bg-room-bg-surface`
- Selected: `bg-room-accent/10`

### 7. StepIndicator
Multi-step progress indicator.

**Source**: `D:\repos\notebook-ui\src\components\StepIndicator.tsx`

**Props**:
- `steps`: Step[] (label, description, icon)
- `currentStep`: number
- `variant`: 'horizontal' | 'vertical'
- `size`: 'sm' | 'md' | 'lg'
- `completedIcon`: LucideIcon

**Styling Adaptations**:
- Line color: `bg-room-border`
- Completed line: `bg-room-accent`
- Step circle inactive: `bg-room-bg-surface border-room-border`
- Step circle active: `bg-room-accent border-room-accent`
- Step circle completed: `bg-room-accent`
- Text inactive: `text-room-text-muted`
- Text active: `text-room-text-primary`

### 8. PageNavigation
Simple page navigation links.

**Source**: `D:\repos\notebook-ui\src\components\PageNavigation.tsx`

**Props**:
- `prevLabel`: string
- `nextLabel`: string
- `onPrev`: () => void
- `onNext`: () => void
- `hasPrev`: boolean
- `hasNext`: boolean

**Styling Adaptations**:
- Uses Button component with ghost variant

## Implementation Steps

1. Create component files in `src/components/`
2. Implement keyboard navigation for Tabs and Menu
3. Add ARIA attributes for accessibility
4. Update exports in `src/components/index.ts`

## File Structure

```
src/components/
├── Tabs/
│   ├── Tabs.tsx
│   ├── TabsRoot.tsx
│   ├── TabsList.tsx
│   ├── TabsTrigger.tsx
│   ├── TabsContent.tsx
│   ├── TabsContext.tsx
│   └── index.ts
├── Breadcrumbs/
│   ├── Breadcrumbs.tsx
│   └── index.ts
├── Pagination/
│   ├── Pagination.tsx
│   └── index.ts
├── Sidebar/
│   ├── Sidebar.tsx
│   ├── SidebarGroup.tsx
│   └── index.ts
├── Menu/
│   ├── Menu.tsx
│   ├── MenuDivider.tsx
│   └── index.ts
├── Dropdown/
│   ├── Dropdown.tsx
│   ├── DropdownTrigger.tsx
│   └── index.ts
├── StepIndicator/
│   ├── StepIndicator.tsx
│   └── index.ts
├── PageNavigation/
│   ├── PageNavigation.tsx
│   └── index.ts
```

## Testing Checklist

- [ ] Tabs keyboard navigation (Arrow keys, Home, End)
- [ ] Tabs lazy loading works
- [ ] Tabs preserveState works
- [ ] Tabs closeable works
- [ ] Compound tabs API works
- [ ] Breadcrumbs truncation works
- [ ] Breadcrumbs navigation works
- [ ] Pagination shows correct page numbers
- [ ] Pagination edge cases (first/last page)
- [ ] Sidebar collapse animation
- [ ] Sidebar nested items expand/collapse
- [ ] Sidebar active state highlights correctly
- [ ] Menu opens on click
- [ ] Menu keyboard navigation
- [ ] Menu closes on outside click
- [ ] Dropdown selection works
- [ ] StepIndicator shows correct states
- [ ] PageNavigation prev/next work

## Dependencies

- Phase 1 components (Icon, Badge)
- Phase 2 components (Popover for Menu/Dropdown)
