# Phase 8: Mobile Components

## Session Goal
Add mobile-optimized components for touch interfaces and responsive design.

## Components to Implement

### 1. BottomSheet + BottomSheetHeader/Content/Actions
Mobile bottom sheet modal.

**Source**: `D:\repos\notebook-ui\src\components\BottomSheet.tsx`

**Props (BottomSheet)**:
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `height`: 'sm' | 'md' | 'lg' | 'full' | 'auto'
- `showHandle`: boolean
- `showCloseButton`: boolean
- `preventSwipeClose`: boolean

**Styling Adaptations**:
- Background: `bg-room-bg-elevated`
- Handle: `bg-room-border`
- Overlay: `bg-black/50`
- Border radius top: `rounded-t-room-lg`

### 2. BottomNavigation + BottomNavigationSpacer
Mobile bottom navigation bar.

**Source**: `D:\repos\notebook-ui\src\components\BottomNavigation.tsx`

**Props**:
- `items`: BottomNavItem[] (id, label, icon, badge)
- `activeId`: string
- `onChange`: (id: string) => void
- `hideLabels`: boolean

**Styling Adaptations**:
- Background: `bg-room-bg-elevated`
- Border top: `border-room-border`
- Item inactive: `text-room-text-muted`
- Item active: `text-room-accent`
- Badge: uses Badge component

### 3. MobileHeader + MobileHeaderSpacer
Mobile header with safe area support.

**Source**: `D:\repos\notebook-ui\src\components\MobileHeader.tsx`

**Props**:
- `title`: string
- `leftAction`: { icon, onClick, label }
- `rightAction`: { icon, onClick, label }
- `transparent`: boolean
- `sticky`: boolean

**Styling Adaptations**:
- Background: `bg-room-bg-elevated`
- Transparent: `bg-transparent`
- Title: `text-room-text-primary`
- Icons: `text-room-text-secondary`

### 4. FloatingActionButton + useFABScroll
Floating action button with optional actions.

**Source**: `D:\repos\notebook-ui\src\components\FloatingActionButton.tsx`

**Props**:
- `icon`: LucideIcon
- `onClick`: () => void
- `actions`: FABAction[] (for expandable FAB)
- `position`: 'bottom-right' | 'bottom-left' | 'bottom-center'
- `hideOnScroll`: boolean
- `variant`: 'primary' | 'secondary'
- `size`: 'md' | 'lg'

**Styling Adaptations**:
- Primary bg: `bg-room-accent`
- Primary text: `text-white`
- Secondary bg: `bg-room-bg-elevated`
- Secondary text: `text-room-text-primary`
- Shadow: `shadow-room-lg`

### 5. PullToRefresh
Pull-to-refresh gesture handler.

**Source**: `D:\repos\notebook-ui\src\components\PullToRefresh.tsx`

**Props**:
- `children`: ReactNode
- `onRefresh`: () => Promise<void>
- `refreshing`: boolean
- `pullDownThreshold`: number
- `maxPullDown`: number
- `disabled`: boolean

**Styling Adaptations**:
- Spinner: `text-room-accent`
- Pull indicator: `bg-room-bg-surface`

### 6. SwipeableCard
Card with swipe actions.

**Source**: `D:\repos\notebook-ui\src\components\SwipeableCard.tsx`

**Props**:
- `children`: ReactNode
- `leftActions`: SwipeAction[]
- `rightActions`: SwipeAction[]
- `onSwipeLeft`: () => void
- `onSwipeRight`: () => void
- `threshold`: number

**Styling Adaptations**:
- Card: existing Card component
- Action buttons: semantic colors

### 7. SwipeableListItem
List item with swipe reveal actions.

**Source**: `D:\repos\notebook-ui\src\components\SwipeableListItem.tsx`

**Props**:
- `children`: ReactNode
- `leftActions`: SwipeListAction[]
- `rightActions`: SwipeListAction[]
- `onAction`: (actionId: string) => void

**Styling Adaptations**:
- Background: `bg-room-bg-elevated`
- Action bg: semantic colors
- Revealed actions: `bg-room-error` (delete), `bg-room-accent` (primary)

### 8. SwipeActions
Swipe action button container.

**Source**: `D:\repos\notebook-ui\src\components\SwipeActions.tsx`

**Props**:
- `actions`: SwipeAction[]
- `side`: 'left' | 'right'

### 9. HorizontalScroll
Horizontal scrolling container.

**Source**: `D:\repos\notebook-ui\src\components\HorizontalScroll.tsx`

**Props**:
- `children`: ReactNode
- `showScrollbar`: boolean
- `snapToItem`: boolean
- `gap`: string
- `padding`: string

**Styling Adaptations**:
- Scrollbar: hide by default on mobile
- Snap points for items

### 10. NotificationBanner
Dismissible notification banner.

**Source**: `D:\repos\notebook-ui\src\components\NotificationBanner.tsx`

**Props**:
- `message`: string
- `variant`: 'info' | 'success' | 'warning' | 'error'
- `action`: NotificationBannerAction
- `dismissible`: boolean
- `onDismiss`: () => void
- `position`: 'top' | 'bottom'

**Styling Adaptations**:
- Background: semantic muted colors
- Text: `text-room-text-primary`
- Icon: semantic colors
- Action button: ghost variant

### 11. NotificationBell
Notification dropdown menu.

**Source**: `D:\repos\notebook-ui\src\components\NotificationBell.tsx`

**Props**:
- `notifications`: NotificationItem[]
- `unreadCount`: number
- `onNotificationClick`: (notification) => void
- `onMarkAllRead`: () => void
- `emptyMessage`: string

**Styling Adaptations**:
- Bell icon: `text-room-text-secondary`
- Badge: `bg-room-error text-white`
- Dropdown: `bg-room-bg-elevated`
- Notification item hover: `bg-room-bg-surface`
- Unread indicator: `bg-room-accent`

### 12. CompactStat
Compact statistic display.

**Source**: `D:\repos\notebook-ui\src\components\CompactStat.tsx`

**Props**:
- `label`: string
- `value`: string | number
- `trend`: CompactStatTrend
- `icon`: LucideIcon
- `size`: 'sm' | 'md'

**Styling Adaptations**:
- Label: `text-room-text-muted`
- Value: `text-room-text-primary`
- Trend up: `text-room-success`
- Trend down: `text-room-error`

### 13. Show/Hide
Responsive visibility utilities.

**Source**: `D:\repos\notebook-ui\src\components\ResponsiveUtilities.tsx`

**Props**:
- `children`: ReactNode
- `above`: 'sm' | 'md' | 'lg' | 'xl'
- `below`: 'sm' | 'md' | 'lg' | 'xl'

### 14. MobileOnly/DesktopOnly
Device-specific visibility.

**Source**: `D:\repos\notebook-ui\src\context\MobileContext.tsx`

**Props**:
- `children`: ReactNode
- `fallback`: ReactNode (optional)

### 15. MobileProvider + useMobileContext
Mobile context provider.

**Source**: `D:\repos\notebook-ui\src\context\MobileContext.tsx`

**Props (MobileProvider)**:
- `children`: ReactNode
- `mobileBreakpoint`: number

**Context Value**:
- `isMobile`: boolean
- `isTablet`: boolean
- `isDesktop`: boolean
- `isTouchDevice`: boolean
- `orientation`: 'portrait' | 'landscape'
- `safeAreaInsets`: { top, right, bottom, left }

## Hooks to Implement

### useResponsive Hooks
**Source**: `D:\repos\notebook-ui\src\hooks\useResponsive.ts`

Exports:
- `useViewportSize`: () => { width, height }
- `useBreakpoint`: () => 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `useMediaQuery`: (query: string) => boolean
- `useIsMobile`: () => boolean
- `useIsTablet`: () => boolean
- `useIsDesktop`: () => boolean
- `useIsTouchDevice`: () => boolean
- `useOrientation`: () => 'portrait' | 'landscape'
- `useBreakpointValue`: <T>(values: Record<Breakpoint, T>) => T
- `useResponsiveCallback`: (callbacks: Record<Breakpoint, Function>) => void
- `useSafeAreaInsets`: () => SafeAreaInsets
- `usePrefersMobile`: () => boolean
- `BREAKPOINTS`: { xs, sm, md, lg, xl }

## File Structure

```
src/components/
├── BottomSheet/
│   ├── BottomSheet.tsx
│   ├── BottomSheetHeader.tsx
│   ├── BottomSheetContent.tsx
│   ├── BottomSheetActions.tsx
│   └── index.ts
├── BottomNavigation/
│   ├── BottomNavigation.tsx
│   ├── BottomNavigationSpacer.tsx
│   └── index.ts
├── MobileHeader/
│   ├── MobileHeader.tsx
│   ├── MobileHeaderSpacer.tsx
│   └── index.ts
├── FloatingActionButton/
│   ├── FloatingActionButton.tsx
│   ├── useFABScroll.ts
│   └── index.ts
├── PullToRefresh/
│   ├── PullToRefresh.tsx
│   └── index.ts
├── SwipeableCard/
│   ├── SwipeableCard.tsx
│   └── index.ts
├── SwipeableListItem/
│   ├── SwipeableListItem.tsx
│   └── index.ts
├── SwipeActions/
│   ├── SwipeActions.tsx
│   └── index.ts
├── HorizontalScroll/
│   ├── HorizontalScroll.tsx
│   └── index.ts
├── NotificationBanner/
│   ├── NotificationBanner.tsx
│   └── index.ts
├── NotificationBell/
│   ├── NotificationBell.tsx
│   └── index.ts
├── CompactStat/
│   ├── CompactStat.tsx
│   └── index.ts
├── ResponsiveUtilities/
│   ├── Show.tsx
│   ├── Hide.tsx
│   └── index.ts

src/context/
├── MobileContext.tsx

src/hooks/
├── useResponsive.ts
├── index.ts
```

## Testing Checklist

- [ ] BottomSheet opens from bottom
- [ ] BottomSheet swipe to close
- [ ] BottomSheet height variants
- [ ] BottomNavigation active state
- [ ] BottomNavigation badges
- [ ] MobileHeader safe area padding
- [ ] MobileHeader actions work
- [ ] FloatingActionButton click
- [ ] FloatingActionButton expand actions
- [ ] FloatingActionButton scroll hide
- [ ] PullToRefresh gesture
- [ ] PullToRefresh loading state
- [ ] SwipeableCard swipe actions
- [ ] SwipeableListItem reveal actions
- [ ] HorizontalScroll snap
- [ ] NotificationBanner variants
- [ ] NotificationBanner dismiss
- [ ] NotificationBell dropdown
- [ ] NotificationBell mark read
- [ ] CompactStat renders
- [ ] Show/Hide breakpoints
- [ ] MobileOnly/DesktopOnly
- [ ] useIsMobile hook accuracy
- [ ] useBreakpoint transitions
- [ ] useSafeAreaInsets values

## Dependencies

- Touch gesture library consideration (react-use-gesture or custom)
- All previous phase components
