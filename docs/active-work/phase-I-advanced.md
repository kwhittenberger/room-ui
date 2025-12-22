# Phase I: Advanced Components

## Session Prompt
```
I'm starting Phase I of @room-ui: Advanced Components.

Context: D:\repos\@room-ui\docs\active-work\phase-I-advanced.md
Master Plan: D:\repos\dewart-deal-room\docs\active-work\phase-7-room-ui-extraction.md

Goals:
1. Implement Form + useFormContext + FieldArray
2. Implement FormWizard
3. Implement CommandPalette + useCommandPalette
4. Implement KanbanBoard
5. Implement RichTextEditor
6. Implement MarkdownEditor
7. Implement Slider
8. Implement ColorPicker
9. Implement Stepper
10. Implement Transfer
11. Implement Carousel

All components MUST match @papernote/ui API exactly for drop-in replacement.

Reference:
- @papernote/ui components: D:\repos\notebook-ui\src\components\
```

## Priority: MEDIUM
Advanced components for complex use cases.

## Prerequisites
- Phase A-H completed

## Components to Implement

### 1. Form System

**Files to create:**
- `src/components/Form/Form.tsx`
- `src/components/Form/FormContext.tsx`
- `src/components/Form/useFormContext.ts`
- `src/components/Form/index.ts`

**Props:**
```typescript
export interface FormProps {
  children: React.ReactNode;
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>;
  defaultValues?: Record<string, unknown>;
  validationRules?: Record<string, ValidationRule[]>;
  mode?: 'onSubmit' | 'onChange' | 'onBlur';
}

export interface FormContextValue {
  values: Record<string, unknown>;
  errors: FieldErrors;
  touched: Record<string, boolean>;
  setValue: (name: string, value: unknown) => void;
  setError: (name: string, error: string) => void;
  clearError: (name: string) => void;
  register: (name: string, rules?: ValidationRule[]) => void;
  unregister: (name: string) => void;
  handleSubmit: () => void;
  reset: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: unknown;
  message: string;
  validate?: (value: unknown) => boolean;
}

export type FieldErrors = Record<string, string | undefined>;

export function useFormContext(): FormContextValue;
export const FormContext: React.Context<FormContextValue>;
```

### 2. FieldArray

**Files to create:**
- `src/components/FieldArray/FieldArray.tsx`
- `src/components/FieldArray/index.ts`

**Props:**
```typescript
export interface FieldArrayProps {
  name: string;
  children: (fields: FieldArrayField[], helpers: FieldArrayHelpers) => React.ReactNode;
}

export interface FieldArrayField {
  id: string;
  index: number;
}

export interface FieldArrayHelpers {
  append: (value: unknown) => void;
  prepend: (value: unknown) => void;
  insert: (index: number, value: unknown) => void;
  remove: (index: number) => void;
  move: (from: number, to: number) => void;
  swap: (indexA: number, indexB: number) => void;
}
```

### 3. FormWizard

**Files to create:**
- `src/components/FormWizard/FormWizard.tsx`
- `src/components/FormWizard/index.ts`

**Props:**
```typescript
export interface FormWizardProps {
  steps: WizardStep[];
  onComplete: (data: Record<string, unknown>) => void | Promise<void>;
  onStepChange?: (step: number) => void;
  initialStep?: number;
  allowSkip?: boolean;
  showStepIndicator?: boolean;
}

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  validation?: (data: Record<string, unknown>) => boolean | Promise<boolean>;
  optional?: boolean;
}
```

### 4. CommandPalette

**Files to create:**
- `src/components/CommandPalette/CommandPalette.tsx`
- `src/components/CommandPalette/useCommandPalette.ts`
- `src/components/CommandPalette/index.ts`

**Props:**
```typescript
export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
  placeholder?: string;
  emptyMessage?: string;
  recentCommands?: Command[];
  maxRecentCommands?: number;
}

export interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  group?: string;
  onSelect: () => void;
  disabled?: boolean;
}

export function useCommandPalette(): {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};
```

### 5. KanbanBoard

**Files to create:**
- `src/components/KanbanBoard/KanbanBoard.tsx`
- `src/components/KanbanBoard/KanbanColumn.tsx`
- `src/components/KanbanBoard/KanbanCard.tsx`
- `src/components/KanbanBoard/index.ts`

**Props:**
```typescript
export interface KanbanBoardProps {
  columns: KanbanColumn[];
  onCardMove?: (cardId: string, fromColumn: string, toColumn: string, position: number) => void;
  onCardClick?: (card: KanbanCard) => void;
  onColumnAdd?: () => void;
  onColumnEdit?: (column: KanbanColumn) => void;
  renderCard?: (card: KanbanCard) => React.ReactNode;
  allowAddCard?: boolean;
  onAddCard?: (columnId: string) => void;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;
  limit?: number;
}

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  labels?: { id: string; label: string; color: string }[];
  assignee?: { name: string; avatar?: string };
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  data?: unknown;
}
```

### 6. RichTextEditor

**Files to create:**
- `src/components/RichTextEditor/RichTextEditor.tsx`
- `src/components/RichTextEditor/index.ts`

**Props:**
```typescript
export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  minHeight?: string | number;
  maxHeight?: string | number;
  toolbar?: RichTextToolbarConfig;
  onImageUpload?: (file: File) => Promise<string>;
}

export interface RichTextToolbarConfig {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  headings?: boolean;
  lists?: boolean;
  links?: boolean;
  images?: boolean;
  codeBlock?: boolean;
  quote?: boolean;
  alignment?: boolean;
}
```

### 7. MarkdownEditor

**Files to create:**
- `src/components/MarkdownEditor/MarkdownEditor.tsx`
- `src/components/MarkdownEditor/index.ts`

**Props:**
```typescript
export interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  preview?: boolean;
  splitView?: boolean;
  minHeight?: string | number;
  maxHeight?: string | number;
  onImageUpload?: (file: File) => Promise<string>;
}
```

### 8. Slider

**Files to create:**
- `src/components/Slider/Slider.tsx`
- `src/components/Slider/index.ts`

**Props:**
```typescript
export interface SliderProps {
  value?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  showMarks?: boolean;
  marks?: { value: number; label?: string }[];
  orientation?: 'horizontal' | 'vertical';
  range?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

### 9. ColorPicker

**Files to create:**
- `src/components/ColorPicker/ColorPicker.tsx`
- `src/components/ColorPicker/index.ts`

**Props:**
```typescript
export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  format?: 'hex' | 'rgb' | 'hsl';
  swatches?: string[];
  showInput?: boolean;
  showAlpha?: boolean;
  disabled?: boolean;
  label?: string;
}
```

### 10. Stepper

**Files to create:**
- `src/components/Stepper/Stepper.tsx`
- `src/components/Stepper/index.ts`

**Props:**
```typescript
export interface StepperProps {
  steps: StepConfig[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  orientation?: 'horizontal' | 'vertical';
  allowClickNavigation?: boolean;
  showConnector?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface StepConfig {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'pending' | 'current' | 'complete' | 'error';
  optional?: boolean;
}
```

### 11. Transfer

**Files to create:**
- `src/components/Transfer/Transfer.tsx`
- `src/components/Transfer/index.ts`

**Props:**
```typescript
export interface TransferProps {
  sourceItems: TransferItem[];
  targetItems: TransferItem[];
  onChange: (sourceItems: TransferItem[], targetItems: TransferItem[]) => void;
  sourceTitle?: string;
  targetTitle?: string;
  searchable?: boolean;
  showSelectAll?: boolean;
  disabled?: boolean;
  height?: string | number;
}

export interface TransferItem {
  id: string;
  label: string;
  disabled?: boolean;
  data?: unknown;
}
```

### 12. Carousel

**Files to create:**
- `src/components/Carousel/Carousel.tsx`
- `src/components/Carousel/index.ts`

**Props:**
```typescript
export interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  loop?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  onChange?: (index: number) => void;
}

export interface CarouselItem {
  id: string;
  content: React.ReactNode;
}
```

## Dark Theme Styling

| Element | Light (@papernote) | Dark (@room-ui) |
|---------|-------------------|-----------------|
| Form input bg | bg-white | bg-slate-800 |
| CommandPalette bg | bg-white | bg-slate-800 |
| Kanban column | bg-paper-100 | bg-slate-800 |
| Kanban card | bg-white | bg-slate-700 |
| Editor bg | bg-white | bg-slate-800 |
| Editor toolbar | bg-paper-100 | bg-slate-700 |
| Slider track | bg-paper-200 | bg-slate-600 |
| Slider thumb | bg-accent-500 | bg-cyan-500 |
| Stepper active | bg-accent-500 | bg-cyan-500 |
| Transfer bg | bg-paper-50 | bg-slate-800 |

## Testing Checklist

- [ ] Form validation works
- [ ] useFormContext provides values
- [ ] FieldArray add/remove works
- [ ] FormWizard step navigation works
- [ ] CommandPalette search works
- [ ] CommandPalette keyboard navigation
- [ ] KanbanBoard drag and drop
- [ ] RichTextEditor formatting works
- [ ] MarkdownEditor preview works
- [ ] Slider drag works
- [ ] Slider range mode works
- [ ] ColorPicker color selection
- [ ] Stepper step navigation
- [ ] Transfer move items between lists
- [ ] Carousel auto-play works

## Completion Criteria

1. All 12 component groups implemented
2. All props match @papernote/ui exactly
3. All exports added to index.ts
4. Dark theme styling applied
5. Build succeeds
6. Type-check passes

## Post-Completion

After completing this phase:
1. Create summary: `docs/archive/phase-I-summary.md`
2. Move this file to `docs/archive/`
3. Proceed to Phase J: Remaining Components & Polish
