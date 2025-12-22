# Phase 7: Advanced Components

## Session Goal
Add complex interactive components for rich functionality.

## Components to Implement

### 1. Calendar
Full calendar widget with events.

**Source**: `D:\repos\notebook-ui\src\components\Calendar.tsx`

**Props**:
- `events`: CalendarEvent[] (id, title, start, end, color)
- `view`: 'month' | 'week' | 'day'
- `onViewChange`: (view) => void
- `selectedDate`: Date
- `onDateSelect`: (date: Date) => void
- `onEventClick`: (event: CalendarEvent) => void
- `onCreateEvent`: (start: Date, end: Date) => void

**Styling Adaptations**:
- Background: `bg-room-bg-elevated`
- Header: `text-room-text-primary`
- Day cells: `bg-room-bg-base`
- Today highlight: `border-room-accent`
- Event colors: semantic colors
- Weekend: `bg-room-bg-surface`

### 2. KanbanBoard
Drag-and-drop kanban board.

**Source**: `D:\repos\notebook-ui\src\components\KanbanBoard.tsx`

**Props**:
- `columns`: KanbanColumn[] (id, title, cards)
- `cards`: KanbanCard[] (id, title, description, columnId)
- `onCardMove`: (cardId, targetColumnId, targetIndex) => void
- `onCardClick`: (card: KanbanCard) => void
- `onAddCard`: (columnId: string) => void
- `renderCard`: (card: KanbanCard) => ReactNode

**Styling Adaptations**:
- Column bg: `bg-room-bg-surface`
- Column header: `text-room-text-primary`
- Card bg: `bg-room-bg-elevated`
- Card dragging: `shadow-room-lg opacity-75`
- Drop zone: `border-room-accent border-dashed`

### 3. RichTextEditor
WYSIWYG rich text editor.

**Source**: `D:\repos\notebook-ui\src\components\RichTextEditor.tsx`

**Props**:
- `value`: string (HTML)
- `onChange`: (html: string) => void
- `placeholder`: string
- `toolbar`: ('bold' | 'italic' | 'underline' | 'link' | 'list' | 'heading')[]
- `readonly`: boolean
- `minHeight`: string

**Styling Adaptations**:
- Toolbar bg: `bg-room-bg-surface`
- Toolbar button: `text-room-text-muted hover:text-room-text-primary`
- Toolbar button active: `bg-room-bg-hover text-room-accent`
- Editor bg: `bg-room-bg-elevated`
- Editor text: `text-room-text-primary`
- Link color: `text-room-accent`

### 4. MarkdownEditor
Markdown editor with preview.

**Source**: `D:\repos\notebook-ui\src\components\MarkdownEditor.tsx`

**Props**:
- `value`: string (markdown)
- `onChange`: (markdown: string) => void
- `placeholder`: string
- `preview`: 'side-by-side' | 'split' | 'hidden'
- `toolbar`: boolean

**Styling Adaptations**:
- Similar to RichTextEditor
- Preview pane: `bg-room-bg-base`
- Code blocks: `bg-room-bg-surface`

### 5. Form + useFormContext + FormContext
Form validation and state management.

**Source**: `D:\repos\notebook-ui\src\components\Form.tsx`

**Props**:
- `children`: ReactNode
- `onSubmit`: (values) => void
- `defaultValues`: Record<string, any>
- `validationRules`: Record<string, ValidationRule>
- `mode`: 'onBlur' | 'onChange' | 'onSubmit'

**Exports**:
- `Form`
- `useFormContext`
- `FormContext`

**Styling Adaptations**:
- Error states use existing form component styling

### 6. FieldArray
Dynamic field array for forms.

**Source**: `D:\repos\notebook-ui\src\components\FieldArray.tsx`

**Props**:
- `name`: string
- `render`: (fields, { append, remove, move }) => ReactNode
- `defaultValue`: any

### 7. FormWizard
Multi-step form wizard.

**Source**: `D:\repos\notebook-ui\src\components\FormWizard.tsx`

**Props**:
- `steps`: WizardStep[] (id, title, content, validation)
- `currentStep`: number
- `onStepChange`: (step: number) => void
- `onComplete`: (values) => void
- `showStepIndicator`: boolean

**Styling Adaptations**:
- Step indicator: uses StepIndicator component
- Navigation buttons: primary/ghost variants

### 8. Stepper
Step-by-step navigation component.

**Source**: `D:\repos\notebook-ui\src\components\Stepper.tsx`

**Props**:
- `steps`: StepConfig[] (title, description, icon, content)
- `currentStep`: number
- `onStepChange`: (step: number) => void
- `orientation`: 'horizontal' | 'vertical'
- `allowClickNavigation`: boolean

**Styling Adaptations**:
- Same as StepIndicator

### 9. Transfer
Transfer list between two panels.

**Source**: `D:\repos\notebook-ui\src\components\Transfer.tsx`

**Props**:
- `dataSource`: TransferItem[]
- `targetKeys`: string[]
- `onChange`: (targetKeys: string[]) => void
- `titles`: [string, string]
- `showSearch`: boolean
- `render`: (item: TransferItem) => ReactNode

**Styling Adaptations**:
- Panel bg: `bg-room-bg-elevated`
- Panel border: `border-room-border`
- Item hover: `bg-room-bg-surface`
- Transfer buttons: ghost variant

### 10. Carousel
Image/content carousel.

**Source**: `D:\repos\notebook-ui\src\components\Carousel.tsx`

**Props**:
- `items`: CarouselItem[]
- `autoPlay`: boolean
- `interval`: number
- `showDots`: boolean
- `showArrows`: boolean
- `infinite`: boolean

**Styling Adaptations**:
- Arrow buttons: `bg-room-bg-surface/80 text-room-text-primary`
- Dots inactive: `bg-room-border`
- Dots active: `bg-room-accent`

### 11. InfiniteScroll
Infinite scroll loader.

**Source**: `D:\repos\notebook-ui\src\components\InfiniteScroll.tsx`

**Props**:
- `children`: ReactNode
- `hasMore`: boolean
- `loadMore`: () => void
- `loading`: boolean
- `threshold`: number

**Styling Adaptations**:
- Loader: uses Spinner component

### 12. DropZone
Drag-and-drop zone.

**Source**: `D:\repos\notebook-ui\src\components\DropZone.tsx`

**Props**:
- `onDrop`: (files: File[]) => void
- `accept`: string
- `children`: ReactNode | ((isDragging) => ReactNode)
- `disabled`: boolean

**Styling Adaptations**:
- Border: `border-room-border border-dashed`
- Active: `border-room-accent bg-room-accent/5`

### 13. CommandPalette + useCommandPalette
Keyboard-driven command palette.

**Source**: `D:\repos\notebook-ui\src\components\CommandPalette.tsx`

**Props**:
- `commands`: Command[] (id, name, icon, shortcut, action, group)
- `isOpen`: boolean
- `onClose`: () => void
- `placeholder`: string

**Styling Adaptations**:
- Overlay: `bg-black/50`
- Palette bg: `bg-room-bg-elevated`
- Search input: `bg-room-bg-surface`
- Item hover: `bg-room-bg-surface`
- Item active: `bg-room-accent/10`
- Shortcut badge: `bg-room-bg-surface text-room-text-muted`
- Group header: `text-room-text-muted`

### 14. Accordion
Collapsible accordion sections.

**Source**: `D:\repos\notebook-ui\src\components\Accordion.tsx`

**Props**:
- `items`: AccordionItem[] (id, title, content, disabled)
- `defaultExpanded`: string[]
- `allowMultiple`: boolean
- `variant`: 'default' | 'bordered' | 'separated'

**Styling Adaptations**:
- Header bg: `bg-room-bg-surface hover:bg-room-bg-hover`
- Header text: `text-room-text-primary`
- Content bg: `bg-room-bg-elevated`
- Border: `border-room-border`
- Expand icon: `text-room-text-muted`

### 15. Collapsible
Single collapsible section.

**Source**: `D:\repos\notebook-ui\src\components\Collapsible.tsx`

**Props**:
- `title`: string | ReactNode
- `children`: ReactNode
- `defaultOpen`: boolean
- `open`: boolean (controlled)
- `onOpenChange`: (open: boolean) => void

**Styling Adaptations**:
- Same as Accordion single item

### 16. ExpandablePanel
Expandable content panel.

**Source**: `D:\repos\notebook-ui\src\components\ExpandablePanel.tsx`

**Props**:
- `children`: ReactNode
- `expanded`: boolean
- `onToggle`: () => void
- `togglePosition`: 'top' | 'bottom'
- `maxHeight`: string (when collapsed)

### 17. HoverCard
Hover-triggered preview card.

**Source**: `D:\repos\notebook-ui\src\components\HoverCard.tsx`

**Props**:
- `trigger`: ReactNode
- `children`: ReactNode
- `openDelay`: number
- `closeDelay`: number
- `side`: 'top' | 'bottom' | 'left' | 'right'

**Styling Adaptations**:
- Card bg: `bg-room-bg-elevated`
- Border: `border-room-border`
- Shadow: `shadow-room-lg`

### 18. ContextMenu
Right-click context menu.

**Source**: `D:\repos\notebook-ui\src\components\ContextMenu.tsx`

**Props**:
- `items`: MenuItem[]
- `children`: ReactNode
- `onAction`: (actionId: string) => void

**Styling Adaptations**:
- Same as Menu component

### 19. AlertDialog
Alert/confirmation dialog.

**Source**: `D:\repos\notebook-ui\src\components\AlertDialog.tsx`

**Props**:
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `description`: string
- `actions`: AlertDialogAction[]
- `variant`: 'info' | 'warning' | 'danger'

**Styling Adaptations**:
- Similar to ConfirmDialog

### 20. ErrorBoundary
React error boundary component.

**Source**: `D:\repos\notebook-ui\src\components\ErrorBoundary.tsx`

**Props**:
- `children`: ReactNode
- `fallback`: ReactNode | ((error, reset) => ReactNode)
- `onError`: (error, errorInfo) => void

**Styling Adaptations**:
- Error display: uses Alert component
- Reset button: primary variant

## File Structure

```
src/components/
├── Calendar/
│   ├── Calendar.tsx
│   ├── CalendarHeader.tsx
│   ├── CalendarGrid.tsx
│   ├── CalendarEvent.tsx
│   └── index.ts
├── KanbanBoard/
│   ├── KanbanBoard.tsx
│   ├── KanbanColumn.tsx
│   ├── KanbanCard.tsx
│   └── index.ts
├── RichTextEditor/
│   ├── RichTextEditor.tsx
│   ├── Toolbar.tsx
│   └── index.ts
├── MarkdownEditor/
│   ├── MarkdownEditor.tsx
│   └── index.ts
├── Form/
│   ├── Form.tsx
│   ├── FormContext.tsx
│   ├── useFormContext.ts
│   └── index.ts
├── FieldArray/
│   ├── FieldArray.tsx
│   └── index.ts
├── FormWizard/
│   ├── FormWizard.tsx
│   └── index.ts
├── Stepper/
│   ├── Stepper.tsx
│   └── index.ts
├── Transfer/
│   ├── Transfer.tsx
│   └── index.ts
├── Carousel/
│   ├── Carousel.tsx
│   └── index.ts
├── InfiniteScroll/
│   ├── InfiniteScroll.tsx
│   └── index.ts
├── DropZone/
│   ├── DropZone.tsx
│   └── index.ts
├── CommandPalette/
│   ├── CommandPalette.tsx
│   ├── useCommandPalette.ts
│   └── index.ts
├── Accordion/
│   ├── Accordion.tsx
│   └── index.ts
├── Collapsible/
│   ├── Collapsible.tsx
│   └── index.ts
├── ExpandablePanel/
│   ├── ExpandablePanel.tsx
│   └── index.ts
├── HoverCard/
│   ├── HoverCard.tsx
│   └── index.ts
├── ContextMenu/
│   ├── ContextMenu.tsx
│   └── index.ts
├── AlertDialog/
│   ├── AlertDialog.tsx
│   └── index.ts
├── ErrorBoundary/
│   ├── ErrorBoundary.tsx
│   └── index.ts
```

## Testing Checklist

- [ ] Calendar view switching
- [ ] Calendar event rendering
- [ ] Calendar date selection
- [ ] KanbanBoard drag-and-drop
- [ ] KanbanBoard card creation
- [ ] RichTextEditor formatting
- [ ] RichTextEditor toolbar
- [ ] MarkdownEditor preview
- [ ] Form validation
- [ ] Form submission
- [ ] FieldArray add/remove
- [ ] FormWizard navigation
- [ ] FormWizard validation per step
- [ ] Stepper navigation
- [ ] Transfer item movement
- [ ] Carousel auto-play
- [ ] Carousel navigation
- [ ] InfiniteScroll trigger
- [ ] DropZone file handling
- [ ] CommandPalette search
- [ ] CommandPalette keyboard navigation
- [ ] Accordion expand/collapse
- [ ] Accordion multi-select
- [ ] Collapsible animation
- [ ] HoverCard delay
- [ ] ContextMenu positioning
- [ ] ErrorBoundary catches errors

## Dependencies

- All previous phase components
- Drag-and-drop library consideration (react-dnd or @dnd-kit)
- Rich text library consideration (slate, tiptap, or custom)
