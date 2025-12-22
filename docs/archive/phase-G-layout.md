# Phase G: Layout Components

## Session Prompt
```
I'm starting Phase G of @room-ui: Layout Components.

Context: D:\repos\@room-ui\docs\active-work\phase-G-layout.md
Master Plan: D:\repos\dewart-deal-room\docs\active-work\phase-7-room-ui-extraction.md

Goals:
1. Implement Layout
2. Implement AppLayout
3. Implement Page
4. Implement PageLayout
5. Implement PageHeader
6. Implement Dashboard (+ DashboardHeader, DashboardContent)
7. Implement ActionBar
8. Implement ControlBar
9. Implement StatusBar (+ status message functions)
10. Implement TwoColumnContent

All components MUST match @papernote/ui API exactly for drop-in replacement.

Reference:
- @papernote/ui Layout: D:\repos\notebook-ui\src\components\Layout\
- @papernote/ui AppLayout: D:\repos\notebook-ui\src\components\AppLayout\
```

## Priority: HIGH
Layout components provide the application structure.

## Prerequisites
- Phase A-F completed

## Components to Implement

### 1. Layout

**Files to create:**
- `src/components/Layout/Layout.tsx`
- `src/components/Layout/index.ts`

**Props:**
```typescript
export interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
  sidebarCollapsed?: boolean;
  onSidebarCollapsedChange?: (collapsed: boolean) => void;
  sidebarWidth?: string | number;
  collapsedSidebarWidth?: string | number;
}
```

### 2. AppLayout

**Files to create:**
- `src/components/AppLayout/AppLayout.tsx`
- `src/components/AppLayout/index.ts`

**Props:**
```typescript
export interface AppLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  mobileHeader?: React.ReactNode;
  bottomNavigation?: React.ReactNode;
  sidebarCollapsed?: boolean;
  onSidebarCollapsedChange?: (collapsed: boolean) => void;
}
```

### 3. Page

**Files to create:**
- `src/components/Page/Page.tsx`
- `src/components/Page/index.ts`

**Props:**
```typescript
export interface PageProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  loading?: boolean;
  error?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}
```

### 4. PageLayout

**Files to create:**
- `src/components/PageLayout/PageLayout.tsx`
- `src/components/PageLayout/index.ts`

**Props:**
```typescript
export interface PageLayoutProps {
  children: React.ReactNode;
}
```

### 5. PageHeader

**Files to create:**
- `src/components/PageHeader/PageHeader.tsx`
- `src/components/PageHeader/index.ts`

**Props:**
```typescript
export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: PageHeaderAction[];
  backHref?: string;
  onBack?: () => void;
}

export interface PageHeaderAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
}
```

### 6. Dashboard

**Files to create:**
- `src/components/Dashboard/Dashboard.tsx`
- `src/components/Dashboard/DashboardHeader.tsx`
- `src/components/Dashboard/DashboardContent.tsx`
- `src/components/Dashboard/index.ts`

**Props:**
```typescript
export interface DashboardProps {
  children: React.ReactNode;
}

export interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export interface DashboardContentProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}
```

### 7. ActionBar

**Files to create:**
- `src/components/ActionBar/ActionBar.tsx`
- `src/components/ActionBar/ActionBarLeft.tsx`
- `src/components/ActionBar/ActionBarCenter.tsx`
- `src/components/ActionBar/ActionBarRight.tsx`
- `src/components/ActionBar/index.ts`

**Props:**
```typescript
export interface ActionBarProps {
  children: React.ReactNode;
  sticky?: boolean;
  bordered?: boolean;
}

export interface ActionBarAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
}
```

### 8. ControlBar

**Files to create:**
- `src/components/ControlBar/ControlBar.tsx`
- `src/components/ControlBar/sections.ts`
- `src/components/ControlBar/index.ts`

**Props:**
```typescript
export interface ControlBarProps {
  sections: ControlBarSection[];
}

export interface ControlBarSection {
  id: string;
  content: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

// Helper functions
export function createPageControlsSection(props: PageControlsSectionProps): ControlBarSection;
export function createFiltersSection(props: FiltersSectionProps): ControlBarSection;
export function createActionsSection(props: ActionsSectionProps): ControlBarSection;
export function createQueryDetailsSection(props: QueryDetailsSectionProps): ControlBarSection;
```

### 9. StatusBar

**Files to create:**
- `src/components/StatusBar/StatusBar.tsx`
- `src/components/StatusBar/statusManager.ts`
- `src/components/StatusBar/index.ts`

**Props:**
```typescript
export interface StatusBarProps {
  position?: 'top' | 'bottom';
  maxMessages?: number;
}

export interface StatusMessage {
  id: string;
  type: StatusType;
  message: string;
  timestamp: Date;
  duration?: number;
}

export type StatusType = 'success' | 'error' | 'warning' | 'info';

// Status Manager (global)
export const statusManager: {
  addMessage: (message: Omit<StatusMessage, 'id' | 'timestamp'>) => void;
  removeMessage: (id: string) => void;
  clearAll: () => void;
  subscribe: (callback: (messages: StatusMessage[]) => void) => () => void;
};

// Helper functions
export function addSuccessMessage(message: string, duration?: number): void;
export function addErrorMessage(message: string, duration?: number): void;
export function addWarningMessage(message: string, duration?: number): void;
export function addInfoMessage(message: string, duration?: number): void;
```

### 10. TwoColumnContent

**Files to create:**
- `src/components/TwoColumnContent/TwoColumnContent.tsx`
- `src/components/TwoColumnContent/index.ts`

**Props:**
```typescript
export interface TwoColumnContentProps {
  left: React.ReactNode;
  right: React.ReactNode;
  ratio?: '1:1' | '1:2' | '2:1' | '1:3' | '3:1';
  gap?: 'sm' | 'md' | 'lg';
  stackOnMobile?: boolean;
  reverseOnMobile?: boolean;
}
```

## Dark Theme Styling

| Element | Light (@papernote) | Dark (@room-ui) |
|---------|-------------------|-----------------|
| Layout bg | bg-paper-50 | bg-slate-950 |
| Page bg | bg-white | bg-slate-900 |
| Header bg | bg-white | bg-slate-800 |
| Sidebar bg | bg-paper-50 | bg-slate-900 |
| ActionBar bg | bg-white | bg-slate-800 |
| StatusBar bg | bg-paper-100 | bg-slate-800 |
| Border | border-paper-200 | border-slate-700 |

## Export Updates

Update `src/components/index.ts`:
```typescript
// Layout Components
export { default as Layout } from './Layout';
export type { LayoutProps } from './Layout';

export { AppLayout } from './AppLayout';
export type { AppLayoutProps } from './AppLayout';

export { default as Page } from './Page';
export type { PageProps } from './Page';

export { PageLayout } from './PageLayout';

export { default as PageHeader } from './PageHeader';
export type { PageHeaderProps, PageHeaderAction } from './PageHeader';

export { default as Dashboard, DashboardHeader, DashboardContent } from './Dashboard';
export type { DashboardProps, DashboardHeaderProps, DashboardContentProps } from './Dashboard';

export { default as ActionBar, ActionBarLeft, ActionBarCenter, ActionBarRight } from './ActionBar';
export type { ActionBarProps, ActionBarAction } from './ActionBar';

export {
  ControlBar,
  createPageControlsSection,
  createFiltersSection,
  createActionsSection,
  createQueryDetailsSection,
} from './ControlBar';
export type { ControlBarProps, ControlBarSection } from './ControlBar';

export { default as StatusBar, statusManager, addSuccessMessage, addErrorMessage, addWarningMessage, addInfoMessage } from './StatusBar';
export type { StatusBarProps, StatusMessage, StatusType } from './StatusBar';

export { default as TwoColumnContent } from './TwoColumnContent';
export type { TwoColumnContentProps } from './TwoColumnContent';
```

## Testing Checklist

- [ ] Layout renders sidebar and content
- [ ] Layout sidebar collapses
- [ ] AppLayout handles mobile/desktop
- [ ] Page shows title and actions
- [ ] Page loading state works
- [ ] PageHeader renders breadcrumbs
- [ ] PageHeader back button works
- [ ] Dashboard columns layout
- [ ] ActionBar renders sections
- [ ] ControlBar helper functions work
- [ ] StatusBar shows messages
- [ ] statusManager functions work globally
- [ ] TwoColumnContent responds to screen size

## Completion Criteria

1. All 10 component groups implemented
2. All props match @papernote/ui exactly
3. All exports added to index.ts
4. Dark theme styling applied
5. Build succeeds
6. Type-check passes

## Post-Completion

After completing this phase:
1. Create summary: `docs/archive/phase-G-summary.md`
2. Move this file to `docs/archive/`
3. Proceed to Phase H: Mobile Components
