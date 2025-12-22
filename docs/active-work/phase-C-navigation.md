# Phase C: Navigation Components

## Session Prompt
```
I'm starting Phase C of @room-ui: Navigation Components.

Context: D:\repos\@room-ui\docs\active-work\phase-C-navigation.md
Master Plan: D:\repos\dewart-deal-room\docs\active-work\phase-7-room-ui-extraction.md

Goals:
1. Implement Tabs (+ TabsRoot, TabsList, TabsTrigger, TabsContent)
2. Implement Breadcrumbs + useBreadcrumbReset hook
3. Implement Sidebar + SidebarGroup
4. Implement Menu + MenuDivider
5. Implement Dropdown + DropdownTrigger
6. Implement Pagination
7. Implement Accordion

All components MUST match @papernote/ui API exactly for drop-in replacement.

Reference:
- @papernote/ui Tabs: D:\repos\notebook-ui\src\components\Tabs\
- @papernote/ui Breadcrumbs: D:\repos\notebook-ui\src\components\Breadcrumbs\
- @papernote/ui Sidebar: D:\repos\notebook-ui\src\components\Sidebar\
- @papernote/ui Menu: D:\repos\notebook-ui\src\components\Menu\
- @papernote/ui Dropdown: D:\repos\notebook-ui\src\components\Dropdown\
- @papernote/ui Pagination: D:\repos\notebook-ui\src\components\Pagination\
- @papernote/ui Accordion: D:\repos\notebook-ui\src\components\Accordion\
```

## Priority: HIGH
Navigation components are essential for app structure.

## Prerequisites
- Phase A completed (Tailwind CSS 4)
- Phase B completed (Core Feedback)

## Components to Implement

### 1. Tabs (Compound Component)

**Files to create:**
- `src/components/Tabs/Tabs.tsx`
- `src/components/Tabs/TabsRoot.tsx`
- `src/components/Tabs/TabsList.tsx`
- `src/components/Tabs/TabsTrigger.tsx`
- `src/components/Tabs/TabsContent.tsx`
- `src/components/Tabs/index.ts`

**Props:**
```typescript
// Simple API
export interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'line' | 'pills' | 'enclosed';
  size?: 'sm' | 'md' | 'lg';
}

export interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

// Compound API
export interface TabsRootProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}
```

### 2. Breadcrumbs + useBreadcrumbReset

**Files to create:**
- `src/components/Breadcrumbs/Breadcrumbs.tsx`
- `src/components/Breadcrumbs/useBreadcrumbReset.ts`
- `src/components/Breadcrumbs/index.ts`

**Props:**
```typescript
export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  homeHref?: string;
  homeLabel?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface BreadcrumbNavigationState {
  items: BreadcrumbItem[];
  push: (item: BreadcrumbItem) => void;
  pop: () => void;
  reset: () => void;
}

export function useBreadcrumbReset(): () => void;
```

### 3. Sidebar + SidebarGroup

**Files to create:**
- `src/components/Sidebar/Sidebar.tsx`
- `src/components/Sidebar/SidebarGroup.tsx`
- `src/components/Sidebar/index.ts`

**Props:**
```typescript
export interface SidebarProps {
  items: SidebarItem[];
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  children?: SidebarItem[];
  active?: boolean;
}

export interface SidebarGroupProps {
  title?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  children: React.ReactNode;
}
```

### 4. Menu + MenuDivider

**Files to create:**
- `src/components/Menu/Menu.tsx`
- `src/components/Menu/MenuDivider.tsx`
- `src/components/Menu/index.ts`

**Props:**
```typescript
export interface MenuProps {
  items: MenuItem[];
  onSelect?: (item: MenuItem) => void;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  children?: MenuItem[];
  onClick?: () => void;
}
```

### 5. Dropdown + DropdownTrigger

**Files to create:**
- `src/components/Dropdown/Dropdown.tsx`
- `src/components/Dropdown/DropdownTrigger.tsx`
- `src/components/Dropdown/index.ts`

**Props:**
```typescript
export interface DropdownProps {
  trigger: React.ReactElement;
  items: DropdownItem[];
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
  onSelect?: (item: DropdownItem) => void;
}

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  onClick?: () => void;
}
```

### 6. Pagination

**Files to create:**
- `src/components/Pagination/Pagination.tsx`
- `src/components/Pagination/index.ts`

**Props:**
```typescript
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}
```

### 7. Accordion

**Files to create:**
- `src/components/Accordion/Accordion.tsx`
- `src/components/Accordion/index.ts`

**Props:**
```typescript
export interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}
```

## Dark Theme Styling

| Element | Light (@papernote) | Dark (@room-ui) |
|---------|-------------------|-----------------|
| Tab active | border-accent-500 | border-cyan-500 |
| Tab inactive | text-ink-600 | text-slate-400 |
| Sidebar bg | bg-paper-50 | bg-slate-900 |
| Sidebar hover | bg-paper-100 | bg-slate-800 |
| Sidebar active | bg-accent-50 | bg-cyan-900/30 |
| Menu bg | bg-white | bg-slate-800 |
| Menu hover | bg-paper-50 | bg-slate-700 |
| Dropdown bg | bg-white | bg-slate-800 |
| Pagination active | bg-accent-500 | bg-cyan-600 |
| Accordion header | bg-paper-50 | bg-slate-800 |

## Export Updates

Update `src/components/index.ts`:
```typescript
// Navigation Components
export { default as Tabs, TabsRoot, TabsList, TabsTrigger, TabsContent } from './Tabs';
export type { TabsProps, Tab, TabsRootProps, TabsListProps, TabsTriggerProps, TabsContentProps } from './Tabs';

export { default as Breadcrumbs, useBreadcrumbReset } from './Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem, BreadcrumbNavigationState } from './Breadcrumbs';

export { default as Sidebar, SidebarGroup } from './Sidebar';
export type { SidebarProps, SidebarItem, SidebarGroupProps } from './Sidebar';

export { default as Menu, MenuDivider } from './Menu';
export type { MenuProps, MenuItem } from './Menu';

export { default as Dropdown, DropdownTrigger } from './Dropdown';
export type { DropdownProps, DropdownItem } from './Dropdown';

export { default as Pagination } from './Pagination';
export type { PaginationProps } from './Pagination';

export { default as Accordion } from './Accordion';
export type { AccordionProps, AccordionItem } from './Accordion';
```

## Testing Checklist

- [ ] Tabs switch between panels
- [ ] Tabs compound API works
- [ ] Breadcrumbs render with separator
- [ ] useBreadcrumbReset clears state
- [ ] Sidebar collapses/expands
- [ ] Sidebar nested items work
- [ ] Menu renders items correctly
- [ ] Menu keyboard navigation works
- [ ] Dropdown opens/closes
- [ ] Dropdown positions correctly
- [ ] Pagination calculates pages
- [ ] Pagination shows ellipsis
- [ ] Accordion expands/collapses
- [ ] Accordion single/multiple mode works

## Completion Criteria

1. All 7 component groups implemented
2. All props match @papernote/ui exactly
3. All exports added to index.ts
4. Dark theme styling applied
5. Build succeeds
6. Type-check passes

## Post-Completion

After completing this phase:
1. Create summary: `docs/archive/phase-C-summary.md`
2. Move this file to `docs/archive/`
3. Proceed to Phase D: Form Controls
