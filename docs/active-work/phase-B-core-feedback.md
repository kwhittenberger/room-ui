# Phase B: Core Feedback Components

## Session Prompt
```
I'm starting Phase B of @room-ui: Core Feedback Components.

Context: D:\repos\@room-ui\docs\active-work\phase-B-core-feedback.md
Master Plan: D:\repos\dewart-deal-room\docs\active-work\phase-7-room-ui-extraction.md

Goals:
1. Implement Toast + ToastContainer + status message functions
2. Implement Modal + ModalFooter
3. Implement Alert component
4. Implement ConfirmDialog + useConfirmDialog hook
5. Implement Tooltip component
6. Implement Popover component

All components MUST match @papernote/ui API exactly for drop-in replacement.

Reference:
- @papernote/ui Toast: D:\repos\notebook-ui\src\components\Toast\
- @papernote/ui Modal: D:\repos\notebook-ui\src\components\Modal\
- @papernote/ui Alert: D:\repos\notebook-ui\src\components\Alert\
- @papernote/ui ConfirmDialog: D:\repos\notebook-ui\src\components\ConfirmDialog\
- @papernote/ui Tooltip: D:\repos\notebook-ui\src\components\Tooltip\
- @papernote/ui Popover: D:\repos\notebook-ui\src\components\Popover\
```

## Priority: CRITICAL
These feedback components are used throughout most applications.

## Prerequisites
- Phase A completed (Tailwind CSS 4 upgrade)

## Components to Implement

### 1. Toast + ToastContainer

**Files to create:**
- `src/components/Toast/Toast.tsx`
- `src/components/Toast/ToastContainer.tsx`
- `src/components/Toast/index.ts`

**Props (must match @papernote/ui exactly):**
```typescript
export interface ToastProps {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  action?: ToastAction;
  onClose?: () => void;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastAction {
  label: string;
  onClick: () => void;
}
```

**Status Manager Functions (from StatusBar):**
```typescript
export function addSuccessMessage(message: string, duration?: number): void;
export function addErrorMessage(message: string, duration?: number): void;
export function addWarningMessage(message: string, duration?: number): void;
export function addInfoMessage(message: string, duration?: number): void;
export const statusManager: StatusManager;
```

### 2. Modal + ModalFooter

**Files to create:**
- `src/components/Modal/Modal.tsx`
- `src/components/Modal/ModalFooter.tsx`
- `src/components/Modal/index.ts`

**Props:**
```typescript
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
}
```

### 3. Alert

**Files to create:**
- `src/components/Alert/Alert.tsx`
- `src/components/Alert/index.ts`

**Props:**
```typescript
export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### 4. ConfirmDialog + useConfirmDialog

**Files to create:**
- `src/components/ConfirmDialog/ConfirmDialog.tsx`
- `src/components/ConfirmDialog/useConfirmDialog.ts`
- `src/components/ConfirmDialog/index.ts`

**Props:**
```typescript
export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}
```

**Hook:**
```typescript
export function useConfirmDialog(): {
  isOpen: boolean;
  open: (options: ConfirmDialogOptions) => Promise<boolean>;
  close: () => void;
  dialogProps: ConfirmDialogProps;
};
```

### 5. Tooltip

**Files to create:**
- `src/components/Tooltip/Tooltip.tsx`
- `src/components/Tooltip/index.ts`

**Props:**
```typescript
export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
}
```

### 6. Popover

**Files to create:**
- `src/components/Popover/Popover.tsx`
- `src/components/Popover/index.ts`

**Props:**
```typescript
export interface PopoverProps {
  trigger: React.ReactElement;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnClickOutside?: boolean;
}
```

## Dark Theme Styling

Apply these color mappings for dark theme:

| Element | Light (@papernote) | Dark (@room-ui) |
|---------|-------------------|-----------------|
| Modal background | bg-white | bg-slate-800 |
| Modal overlay | bg-black/50 | bg-black/70 |
| Alert success | bg-green-50 | bg-emerald-900/50 |
| Alert error | bg-red-50 | bg-red-900/50 |
| Alert warning | bg-yellow-50 | bg-amber-900/50 |
| Alert info | bg-blue-50 | bg-blue-900/50 |
| Tooltip bg | bg-gray-900 | bg-slate-700 |
| Popover bg | bg-white | bg-slate-800 |

## Export Updates

Update `src/components/index.ts`:
```typescript
// Feedback Components
export { default as Toast, ToastContainer } from './Toast';
export type { ToastProps, ToastType, ToastAction } from './Toast';

export { default as Alert } from './Alert';
export type { AlertProps } from './Alert';

export { default as Modal, ModalFooter } from './Modal';
export type { ModalProps } from './Modal';

export { default as ConfirmDialog, useConfirmDialog } from './ConfirmDialog';
export type { ConfirmDialogProps } from './ConfirmDialog';

export { default as Tooltip } from './Tooltip';
export type { TooltipProps } from './Tooltip';

export { default as Popover } from './Popover';
export type { PopoverProps } from './Popover';
```

## Testing Checklist

- [ ] Toast appears with correct styling
- [ ] Toast auto-dismisses after duration
- [ ] ToastContainer stacks multiple toasts
- [ ] statusManager functions work globally
- [ ] Modal opens/closes correctly
- [ ] Modal respects closeOnOverlayClick
- [ ] Modal respects closeOnEscape
- [ ] Alert renders all variants
- [ ] Alert dismissible works
- [ ] ConfirmDialog returns promise correctly
- [ ] useConfirmDialog hook works
- [ ] Tooltip appears on hover
- [ ] Tooltip respects delay
- [ ] Popover opens/closes
- [ ] Popover positions correctly

## Completion Criteria

1. All 6 components implemented
2. All props match @papernote/ui exactly
3. All exports added to index.ts
4. Dark theme styling applied
5. Build succeeds
6. Type-check passes

## Post-Completion

After completing this phase:
1. Create summary: `docs/archive/phase-B-summary.md`
2. Move this file to `docs/archive/`
3. Proceed to Phase C: Navigation Components
