# Phase H: Mobile Components

## Session Prompt
```
I'm starting Phase H of @room-ui: Mobile Components.

Context: D:\repos\@room-ui\docs\active-work\phase-H-mobile.md
Master Plan: D:\repos\dewart-deal-room\docs\active-work\phase-7-room-ui-extraction.md

Goals:
1. Implement MobileLayout
2. Implement BottomSheet
3. Implement BottomNavigation
4. Implement MobileHeader
5. Implement FloatingActionButton
6. Implement SwipeableCard
7. Implement SwipeableListItem
8. Implement SwipeActions
9. Implement PullToRefresh
10. Implement HorizontalScroll
11. Implement MobileProvider + context hooks

All components MUST match @papernote/ui API exactly for drop-in replacement.

Reference:
- @papernote/ui mobile components: D:\repos\notebook-ui\src\components\
- @papernote/ui MobileContext: D:\repos\notebook-ui\src\context\MobileContext.tsx
```

## Priority: MEDIUM
Mobile components enable responsive mobile experiences.

## Prerequisites
- Phase A-G completed

## Components to Implement

### 1. MobileLayout

**Files to create:**
- `src/components/MobileLayout/MobileLayout.tsx`
- `src/components/MobileLayout/index.ts`

**Props:**
```typescript
export interface MobileLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  bottomNavigation?: React.ReactNode;
  fab?: React.ReactNode;
}
```

### 2. BottomSheet

**Files to create:**
- `src/components/BottomSheet/BottomSheet.tsx`
- `src/components/BottomSheet/BottomSheetHeader.tsx`
- `src/components/BottomSheet/BottomSheetContent.tsx`
- `src/components/BottomSheet/BottomSheetActions.tsx`
- `src/components/BottomSheet/index.ts`

**Props:**
```typescript
export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  snapPoints?: number[];
  defaultSnapPoint?: number;
  dismissible?: boolean;
  children: React.ReactNode;
}

export interface BottomSheetHeaderProps {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  showHandle?: boolean;
}

export interface BottomSheetContentProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export interface BottomSheetActionsProps {
  children: React.ReactNode;
}
```

### 3. BottomNavigation

**Files to create:**
- `src/components/BottomNavigation/BottomNavigation.tsx`
- `src/components/BottomNavigation/BottomNavigationSpacer.tsx`
- `src/components/BottomNavigation/index.ts`

**Props:**
```typescript
export interface BottomNavigationProps {
  items: BottomNavItem[];
  activeItem?: string;
  onItemClick?: (item: BottomNavItem) => void;
  showLabels?: boolean;
}

export interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  href?: string;
  badge?: number | string;
}
```

### 4. MobileHeader

**Files to create:**
- `src/components/MobileHeader/MobileHeader.tsx`
- `src/components/MobileHeader/MobileHeaderSpacer.tsx`
- `src/components/MobileHeader/index.ts`

**Props:**
```typescript
export interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  leftAction?: React.ReactNode;
  rightActions?: React.ReactNode[];
  onBack?: () => void;
  showBack?: boolean;
  transparent?: boolean;
  sticky?: boolean;
}
```

### 5. FloatingActionButton

**Files to create:**
- `src/components/FloatingActionButton/FloatingActionButton.tsx`
- `src/components/FloatingActionButton/useFABScroll.ts`
- `src/components/FloatingActionButton/index.ts`

**Props:**
```typescript
export interface FloatingActionButtonProps {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  extended?: boolean;
  actions?: FABAction[];
  hideOnScroll?: boolean;
}

export interface FABAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export function useFABScroll(): {
  visible: boolean;
  scrollDirection: 'up' | 'down' | null;
};
```

### 6. SwipeableCard

**Files to create:**
- `src/components/SwipeableCard/SwipeableCard.tsx`
- `src/components/SwipeableCard/index.ts`

**Props:**
```typescript
export interface SwipeableCardProps {
  children: React.ReactNode;
  leftActions?: SwipeableCardAction[];
  rightActions?: SwipeableCardAction[];
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export interface SwipeableCardAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
}
```

### 7. SwipeableListItem

**Files to create:**
- `src/components/SwipeableListItem/SwipeableListItem.tsx`
- `src/components/SwipeableListItem/index.ts`

**Props:**
```typescript
export interface SwipeableListItemProps {
  children: React.ReactNode;
  leftActions?: SwipeListAction[];
  rightActions?: SwipeListAction[];
  onSwipeComplete?: (direction: 'left' | 'right', actionId: string) => void;
}

export interface SwipeListAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
}
```

### 8. SwipeActions

**Files to create:**
- `src/components/SwipeActions/SwipeActions.tsx`
- `src/components/SwipeActions/index.ts`

**Props:**
```typescript
export interface SwipeActionsProps {
  children: React.ReactNode;
  actions: SwipeAction[];
  direction?: 'left' | 'right' | 'both';
  threshold?: number;
}

export interface SwipeAction {
  id: string;
  icon: React.ReactNode;
  label?: string;
  color: string;
  onClick: () => void;
}
```

### 9. PullToRefresh

**Files to create:**
- `src/components/PullToRefresh/PullToRefresh.tsx`
- `src/components/PullToRefresh/index.ts`

**Props:**
```typescript
export interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  refreshing?: boolean;
  threshold?: number;
  indicator?: React.ReactNode;
  disabled?: boolean;
}
```

### 10. HorizontalScroll

**Files to create:**
- `src/components/HorizontalScroll/HorizontalScroll.tsx`
- `src/components/HorizontalScroll/index.ts`

**Props:**
```typescript
export interface HorizontalScrollProps {
  children: React.ReactNode;
  showArrows?: boolean;
  arrowPosition?: 'inside' | 'outside';
  gap?: 'sm' | 'md' | 'lg';
  snap?: boolean;
  snapAlign?: 'start' | 'center' | 'end';
}
```

### 11. MobileProvider + Context

**Files to create:**
- `src/context/MobileContext.tsx`
- `src/context/index.ts`

**API:**
```typescript
export interface MobileContextValue {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  breakpoint: Breakpoint;
  orientation: Orientation;
  safeAreaInsets: SafeAreaInsets;
}

export interface MobileProviderProps {
  children: React.ReactNode;
  forceMode?: 'mobile' | 'desktop';
}

export const MobileProvider: React.FC<MobileProviderProps>;
export function useMobileContext(): MobileContextValue;
export function withMobileContext<P>(Component: React.ComponentType<P>): React.FC<P>;

// Conditional rendering components
export const MobileOnly: React.FC<{ children: React.ReactNode }>;
export const DesktopOnly: React.FC<{ children: React.ReactNode }>;
export const Responsive: React.FC<{
  mobile?: React.ReactNode;
  tablet?: React.ReactNode;
  desktop?: React.ReactNode;
}>;
```

## Responsive Hooks

**Files to create:**
- `src/hooks/useResponsive.ts`

**Hooks:**
```typescript
export function useViewportSize(): ViewportSize;
export function useBreakpoint(): Breakpoint;
export function useMediaQuery(query: string): boolean;
export function useIsMobile(): boolean;
export function useIsTablet(): boolean;
export function useIsDesktop(): boolean;
export function useIsTouchDevice(): boolean;
export function useOrientation(): Orientation;
export function useBreakpointValue<T>(values: Record<Breakpoint, T>): T;
export function useResponsiveCallback(callbacks: Record<Breakpoint, () => void>): void;
export function useSafeAreaInsets(): SafeAreaInsets;
export function usePrefersMobile(): boolean;

export const BREAKPOINTS: Record<Breakpoint, number>;
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Orientation = 'portrait' | 'landscape';
export interface ViewportSize { width: number; height: number; }
export interface SafeAreaInsets { top: number; right: number; bottom: number; left: number; }
```

## Dark Theme Styling

| Element | Light (@papernote) | Dark (@room-ui) |
|---------|-------------------|-----------------|
| BottomSheet bg | bg-white | bg-slate-800 |
| BottomSheet handle | bg-paper-300 | bg-slate-600 |
| BottomNav bg | bg-white | bg-slate-800 |
| BottomNav active | text-accent-600 | text-cyan-400 |
| MobileHeader bg | bg-white | bg-slate-800 |
| FAB bg | bg-accent-500 | bg-cyan-600 |
| Swipe action | varies | varies |

## Export Updates

Update `src/components/index.ts` and create `src/context/index.ts`:
```typescript
// Mobile Components
export { default as MobileLayout } from './MobileLayout';
export type { MobileLayoutProps } from './MobileLayout';

export { default as BottomSheet, BottomSheetHeader, BottomSheetContent, BottomSheetActions } from './BottomSheet';
export type { BottomSheetProps, BottomSheetHeaderProps, BottomSheetContentProps, BottomSheetActionsProps } from './BottomSheet';

export { default as BottomNavigation, BottomNavigationSpacer } from './BottomNavigation';
export type { BottomNavigationProps, BottomNavItem } from './BottomNavigation';

export { default as MobileHeader, MobileHeaderSpacer } from './MobileHeader';
export type { MobileHeaderProps } from './MobileHeader';

export { default as FloatingActionButton, useFABScroll } from './FloatingActionButton';
export type { FloatingActionButtonProps, FABAction } from './FloatingActionButton';

export { default as SwipeableCard } from './SwipeableCard';
export type { SwipeableCardProps, SwipeableCardAction } from './SwipeableCard';

export { default as SwipeableListItem } from './SwipeableListItem';
export type { SwipeableListItemProps, SwipeListAction } from './SwipeableListItem';

export { default as SwipeActions } from './SwipeActions';
export type { SwipeActionsProps, SwipeAction } from './SwipeActions';

export { default as PullToRefresh } from './PullToRefresh';
export type { PullToRefreshProps } from './PullToRefresh';

export { default as HorizontalScroll } from './HorizontalScroll';
export type { HorizontalScrollProps } from './HorizontalScroll';

// Context
export {
  MobileProvider,
  useMobileContext,
  withMobileContext,
  MobileOnly,
  DesktopOnly,
  Responsive,
} from '../context/MobileContext';
export type { MobileContextValue, MobileProviderProps } from '../context/MobileContext';

// Responsive Hooks
export {
  useViewportSize,
  useBreakpoint,
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsTouchDevice,
  useOrientation,
  useBreakpointValue,
  useResponsiveCallback,
  useSafeAreaInsets,
  usePrefersMobile,
  BREAKPOINTS,
} from '../hooks/useResponsive';
export type { Breakpoint, ViewportSize, Orientation } from '../hooks/useResponsive';
```

## Testing Checklist

- [ ] MobileLayout renders correctly
- [ ] BottomSheet opens/closes with gestures
- [ ] BottomSheet snap points work
- [ ] BottomNavigation shows active state
- [ ] MobileHeader back button works
- [ ] FAB animates on scroll
- [ ] FAB speed dial works
- [ ] SwipeableCard swipe gestures work
- [ ] SwipeableListItem actions trigger
- [ ] SwipeActions reveal on swipe
- [ ] PullToRefresh triggers callback
- [ ] HorizontalScroll snaps correctly
- [ ] MobileProvider context values correct
- [ ] useIsMobile hook returns correct value
- [ ] MobileOnly/DesktopOnly render conditionally

## Completion Criteria

1. All 11 component groups implemented
2. All hooks implemented
3. MobileContext implemented
4. All props match @papernote/ui exactly
5. All exports added
6. Dark theme styling applied
7. Build succeeds
8. Type-check passes

## Post-Completion

After completing this phase:
1. Create summary: `docs/archive/phase-H-summary.md`
2. Move this file to `docs/archive/`
3. Proceed to Phase I: Advanced Components
