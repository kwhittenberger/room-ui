# Phase E: Data Display Components

## Session Prompt
```
I'm starting Phase E of @room-ui: Data Display Components.

Context: D:\repos\@room-ui\docs\active-work\phase-E-data-display.md
Master Plan: D:\repos\dewart-deal-room\docs\active-work\phase-7-room-ui-extraction.md

Goals:
1. Implement Loading + Skeleton + SkeletonCard + SkeletonTable
2. Implement Avatar
3. Implement EmptyState
4. Implement ComingSoon
5. Implement Chip + ChipGroup
6. Implement Timeline
7. Implement TreeView
8. Implement Calendar (standalone display)

All components MUST match @papernote/ui API exactly for drop-in replacement.

Reference:
- @papernote/ui components: D:\repos\notebook-ui\src\components\
```

## Priority: HIGH
Data display components are critical for showing information.

## Prerequisites
- Phase A-D completed

## Components to Implement

### 1. Loading + Skeleton Variants

**Files to create:**
- `src/components/Loading/Loading.tsx`
- `src/components/Loading/Skeleton.tsx`
- `src/components/Loading/SkeletonCard.tsx`
- `src/components/Loading/SkeletonTable.tsx`
- `src/components/Loading/index.ts`

**Props:**
```typescript
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
}

export interface SkeletonCardProps {
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  lines?: number;
}

export interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}
```

### 2. Avatar

**Files to create:**
- `src/components/Avatar/Avatar.tsx`
- `src/components/Avatar/index.ts`

**Props:**
```typescript
export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  fallback?: React.ReactNode;
  status?: 'online' | 'offline' | 'busy' | 'away';
  onClick?: () => void;
}
```

### 3. EmptyState

**Files to create:**
- `src/components/EmptyState/EmptyState.tsx`
- `src/components/EmptyState/index.ts`

**Props:**
```typescript
export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  size?: 'sm' | 'md' | 'lg';
}
```

### 4. ComingSoon

**Files to create:**
- `src/components/ComingSoon/ComingSoon.tsx`
- `src/components/ComingSoon/index.ts`

**Props:**
```typescript
export interface ComingSoonProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  expectedDate?: string;
}
```

### 5. Chip + ChipGroup

**Files to create:**
- `src/components/Chip/Chip.tsx`
- `src/components/Chip/ChipGroup.tsx`
- `src/components/Chip/index.ts`

**Props:**
```typescript
export interface ChipProps {
  label: string;
  variant?: 'filled' | 'outlined';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  onDelete?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export interface ChipGroupProps {
  children: React.ReactNode;
  spacing?: 'xs' | 'sm' | 'md';
  wrap?: boolean;
}
```

### 6. Timeline

**Files to create:**
- `src/components/Timeline/Timeline.tsx`
- `src/components/Timeline/index.ts`

**Props:**
```typescript
export interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  position?: 'left' | 'right' | 'alternate';
}

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  content?: React.ReactNode;
}
```

### 7. TreeView

**Files to create:**
- `src/components/TreeView/TreeView.tsx`
- `src/components/TreeView/index.ts`

**Props:**
```typescript
export interface TreeViewProps {
  data: TreeNode[];
  defaultExpandedIds?: string[];
  expandedIds?: string[];
  onExpandedChange?: (ids: string[]) => void;
  selectedId?: string;
  onSelect?: (id: string) => void;
  multiSelect?: boolean;
  selectedIds?: string[];
  onSelectedChange?: (ids: string[]) => void;
  renderNode?: (node: TreeNode) => React.ReactNode;
}

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  data?: unknown;
}
```

### 8. Calendar (Standalone)

**Files to create:**
- `src/components/Calendar/Calendar.tsx`
- `src/components/Calendar/index.ts`

**Props:**
```typescript
export interface CalendarProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  view?: 'month' | 'week' | 'day';
  onViewChange?: (view: 'month' | 'week' | 'day') => void;
  minDate?: Date;
  maxDate?: Date;
  highlightToday?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  color?: string;
  allDay?: boolean;
  data?: unknown;
}
```

## Dark Theme Styling

| Element | Light (@papernote) | Dark (@room-ui) |
|---------|-------------------|-----------------|
| Skeleton bg | bg-paper-200 | bg-slate-700 |
| Avatar fallback | bg-paper-200 | bg-slate-700 |
| EmptyState text | text-ink-500 | text-slate-400 |
| Chip filled | bg-paper-200 | bg-slate-700 |
| Chip outlined | border-paper-300 | border-slate-600 |
| Timeline line | bg-paper-300 | bg-slate-600 |
| TreeView hover | bg-paper-100 | bg-slate-800 |
| Calendar today | bg-accent-100 | bg-cyan-900/30 |
| Calendar event | bg-accent-500 | bg-cyan-600 |

## Export Updates

Update `src/components/index.ts`:
```typescript
// Loading Components
export { default as Loading, Skeleton, SkeletonCard, SkeletonTable } from './Loading';
export type { LoadingProps, SkeletonProps, SkeletonCardProps, SkeletonTableProps } from './Loading';

// Data Display
export { default as Avatar } from './Avatar';
export type { AvatarProps } from './Avatar';

export { default as EmptyState } from './EmptyState';
export type { EmptyStateProps } from './EmptyState';

export { ComingSoon } from './ComingSoon';
export type { ComingSoonProps } from './ComingSoon';

export { default as Chip, ChipGroup } from './Chip';
export type { ChipProps, ChipGroupProps } from './Chip';

export { default as Timeline } from './Timeline';
export type { TimelineProps, TimelineItem } from './Timeline';

export { default as TreeView } from './TreeView';
export type { TreeViewProps, TreeNode } from './TreeView';

export { default as Calendar } from './Calendar';
export type { CalendarProps, CalendarEvent } from './Calendar';
```

## Testing Checklist

- [ ] Loading spinner renders correctly
- [ ] Skeleton animates (pulse/wave)
- [ ] SkeletonCard shows placeholder
- [ ] SkeletonTable shows rows/columns
- [ ] Avatar shows image or fallback
- [ ] Avatar status indicator works
- [ ] EmptyState shows icon, title, description
- [ ] EmptyState action button works
- [ ] ComingSoon displays message
- [ ] Chip renders with label
- [ ] Chip onDelete works
- [ ] ChipGroup spaces children
- [ ] Timeline renders items
- [ ] Timeline alternate layout works
- [ ] TreeView expands/collapses
- [ ] TreeView selection works
- [ ] Calendar navigates months
- [ ] Calendar events display

## Completion Criteria

1. All 8 component groups implemented
2. All props match @papernote/ui exactly
3. All exports added to index.ts
4. Dark theme styling applied
5. Build succeeds
6. Type-check passes

## Post-Completion

After completing this phase:
1. Create summary: `docs/archive/phase-E-summary.md`
2. Move this file to `docs/archive/`
3. Proceed to Phase F: Data Table Components
