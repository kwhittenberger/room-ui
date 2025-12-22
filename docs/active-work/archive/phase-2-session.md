# Phase 2: Feedback Components

## Session Goal
Add essential user feedback components for notifications, dialogs, and information display.

## Components to Implement

### 1. Toast + ToastContainer
Temporary notification messages.

**Source**: `D:\repos\notebook-ui\src\components\Toast.tsx`

**Props (Toast)**:
- `id`: string
- `type`: 'success' | 'error' | 'warning' | 'info'
- `title`: string
- `message`: string
- `duration`: number (default 5000ms)
- `onClose`: (id: string) => void
- `action`: { label, onClick } (optional)

**Props (ToastContainer)**:
- `toasts`: ToastProps[]
- `onClose`: (id: string) => void
- `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'

**Styling Adaptations**:
- Background: `bg-room-bg-elevated`
- Border-left: semantic colors (success/error/warning/info)
- Text: `text-room-text-primary` (title), `text-room-text-secondary` (message)
- Close button: `text-room-text-muted hover:text-room-text-primary`

### 2. Alert
Static alert banners for important messages.

**Source**: `D:\repos\notebook-ui\src\components\Alert.tsx`

**Props**:
- `variant`: 'success' | 'warning' | 'error' | 'info'
- `title`: string
- `children`: ReactNode (message content)
- `dismissible`: boolean
- `onDismiss`: () => void
- `icon`: LucideIcon (optional, auto-detected from variant)

**Styling Adaptations**:
- Background: `bg-room-{variant}-muted` (e.g., `bg-room-success-muted`)
- Border: `border-room-{variant}`
- Text: `text-room-text-primary`
- Icon: `text-room-{variant}`

### 3. Modal + ModalFooter
Dialog overlay for focused interactions.

**Source**: `D:\repos\notebook-ui\src\components\Modal.tsx`

**Props (Modal)**:
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `children`: ReactNode
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `showCloseButton`: boolean
- `animation`: 'scale' | 'slide-up' | 'slide-down' | 'fade' | 'none'
- `scrollable`: boolean
- `maxHeight`: string

**Styling Adaptations**:
- Overlay: `bg-black/50 backdrop-blur-sm`
- Modal bg: `bg-room-bg-elevated`
- Header border: `border-room-border`
- Title: `text-room-text-primary`
- Close button: `text-room-text-muted hover:text-room-text-primary`

### 4. Drawer + DrawerFooter
Slide-out panel from screen edge.

**Source**: `D:\repos\notebook-ui\src\components\Drawer.tsx`

**Props**:
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `children`: ReactNode
- `position`: 'left' | 'right' | 'top' | 'bottom'
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `showCloseButton`: boolean
- `showOverlay`: boolean

**Styling Adaptations**:
- Overlay: `bg-black/50`
- Panel bg: `bg-room-bg-elevated`
- Border: `border-room-border`
- Header text: `text-room-text-primary`

### 5. ConfirmDialog + useConfirmDialog
Confirmation dialog for destructive actions.

**Source**: `D:\repos\notebook-ui\src\components\ConfirmDialog.tsx`

**Props**:
- `isOpen`: boolean
- `onClose`: () => void
- `onConfirm`: () => void
- `title`: string
- `message`: string
- `confirmLabel`: string
- `cancelLabel`: string
- `variant`: 'danger' | 'warning' | 'primary'
- `loading`: boolean

**Styling Adaptations**:
- Uses Modal internally
- Confirm button: danger/warning/primary variants
- Cancel button: ghost variant

### 6. Tooltip
Hover-triggered information popup.

**Source**: `D:\repos\notebook-ui\src\components\Tooltip.tsx`

**Props**:
- `content`: ReactNode
- `children`: ReactNode (trigger element)
- `position`: 'top' | 'bottom' | 'left' | 'right'
- `delay`: number
- `disabled`: boolean

**Styling Adaptations**:
- Background: `bg-room-bg-hover`
- Text: `text-room-text-primary`
- Arrow: same bg color
- Shadow: `shadow-room`

### 7. Popover
Click-triggered content popup.

**Source**: `D:\repos\notebook-ui\src\components\Popover.tsx`

**Props**:
- `trigger`: ReactNode
- `children`: ReactNode (content)
- `position`: 'top' | 'bottom' | 'left' | 'right'
- `align`: 'start' | 'center' | 'end'
- `closeOnClickOutside`: boolean

**Styling Adaptations**:
- Background: `bg-room-bg-elevated`
- Border: `border-room-border`
- Shadow: `shadow-room-lg`

## Implementation Steps

1. Create component files in `src/components/`:
   - `Toast/Toast.tsx`, `Toast/ToastContainer.tsx`
   - `Alert/Alert.tsx`
   - `Modal/Modal.tsx`, `Modal/ModalFooter.tsx`
   - `Drawer/Drawer.tsx`, `Drawer/DrawerFooter.tsx`
   - `ConfirmDialog/ConfirmDialog.tsx`
   - `Tooltip/Tooltip.tsx`
   - `Popover/Popover.tsx`

2. Add CSS animations to `styles.css`:
   ```css
   @keyframes scale-in { ... }
   @keyframes slide-in-right { ... }
   @keyframes slide-in-left { ... }
   @keyframes slide-in-top { ... }
   @keyframes slide-in-bottom { ... }
   @keyframes fade-in { ... }
   ```

3. Update `src/components/index.ts` with new exports

## File Structure

```
src/components/
├── Toast/
│   ├── Toast.tsx
│   ├── ToastContainer.tsx
│   └── index.ts
├── Alert/
│   ├── Alert.tsx
│   └── index.ts
├── Modal/
│   ├── Modal.tsx
│   ├── ModalFooter.tsx
│   └── index.ts
├── Drawer/
│   ├── Drawer.tsx
│   ├── DrawerFooter.tsx
│   └── index.ts
├── ConfirmDialog/
│   ├── ConfirmDialog.tsx
│   ├── useConfirmDialog.ts
│   └── index.ts
├── Tooltip/
│   ├── Tooltip.tsx
│   └── index.ts
├── Popover/
│   ├── Popover.tsx
│   └── index.ts
```

## Testing Checklist

- [ ] Toast appears and auto-dismisses
- [ ] Toast action button works
- [ ] Toast positions correctly in all 6 positions
- [ ] Alert renders all 4 variants
- [ ] Alert dismisses when dismissible
- [ ] Modal opens/closes with animation
- [ ] Modal traps focus
- [ ] Modal closes on Escape key
- [ ] Modal closes on backdrop click
- [ ] Drawer slides from correct direction
- [ ] Drawer respects size prop
- [ ] ConfirmDialog shows correct variant styling
- [ ] ConfirmDialog loading state disables buttons
- [ ] useConfirmDialog hook works correctly
- [ ] Tooltip appears on hover after delay
- [ ] Tooltip positions correctly
- [ ] Popover opens on click
- [ ] Popover closes on outside click

## Dependencies

- `react-dom` createPortal (for Modal, Drawer, Toast)
- Phase 1 components (Button for ConfirmDialog)
