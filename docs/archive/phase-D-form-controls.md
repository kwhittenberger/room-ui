# Phase D: Advanced Form Controls

## Session Prompt
```
I'm starting Phase D of @room-ui: Advanced Form Controls.

Context: D:\repos\@room-ui\docs\active-work\phase-D-form-controls.md
Master Plan: D:\repos\dewart-deal-room\docs\active-work\phase-7-room-ui-extraction.md

Goals:
1. Implement MultiSelect
2. Implement Switch
3. Implement DatePicker
4. Implement TimePicker
5. Implement DateRangePicker
6. Implement DateTimePicker
7. Implement Combobox
8. Implement NumberInput
9. Implement FormControl
10. Implement Rating

All components MUST match @papernote/ui API exactly for drop-in replacement.

Reference:
- @papernote/ui components: D:\repos\notebook-ui\src\components\
- Existing @room-ui form controls: D:\repos\@room-ui\src\components\
```

## Priority: HIGH
Form controls are essential for data entry.

## Prerequisites
- Phase A completed (Tailwind CSS 4)
- Phase B completed (Core Feedback)
- Phase C completed (Navigation)

## Components to Implement

### 1. MultiSelect

**Files to create:**
- `src/components/MultiSelect/MultiSelect.tsx`
- `src/components/MultiSelect/index.ts`

**Props:**
```typescript
export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  maxItems?: number;
  size?: 'sm' | 'md' | 'lg';
}

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface MultiSelectHandle {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}
```

### 2. Switch

**Files to create:**
- `src/components/Switch/Switch.tsx`
- `src/components/Switch/index.ts`

**Props:**
```typescript
export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  labelPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  name?: string;
  id?: string;
}
```

### 3. DatePicker

**Files to create:**
- `src/components/DatePicker/DatePicker.tsx`
- `src/components/DatePicker/Calendar.tsx` (internal)
- `src/components/DatePicker/index.ts`

**Props:**
```typescript
export interface DatePickerProps {
  value?: Date | string | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date | string;
  maxDate?: Date | string;
  format?: string;
  clearable?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface DatePickerHandle {
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
}
```

### 4. TimePicker

**Files to create:**
- `src/components/TimePicker/TimePicker.tsx`
- `src/components/TimePicker/index.ts`

**Props:**
```typescript
export interface TimePickerProps {
  value?: string | null;
  onChange?: (time: string | null) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  minTime?: string;
  maxTime?: string;
  step?: number; // minutes
  format?: '12h' | '24h';
  size?: 'sm' | 'md' | 'lg';
}

export interface TimePickerHandle {
  focus: () => void;
  blur: () => void;
}
```

### 5. DateRangePicker

**Files to create:**
- `src/components/DateRangePicker/DateRangePicker.tsx`
- `src/components/DateRangePicker/index.ts`

**Props:**
```typescript
export interface DateRangePickerProps {
  value?: DateRange | null;
  onChange?: (range: DateRange | null) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  minDate?: Date | string;
  maxDate?: Date | string;
  presets?: DateRangePreset[];
  size?: 'sm' | 'md' | 'lg';
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePreset {
  label: string;
  range: DateRange;
}

export interface DateRangePickerHandle {
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
}
```

### 6. DateTimePicker

**Files to create:**
- `src/components/DateTimePicker/DateTimePicker.tsx`
- `src/components/DateTimePicker/index.ts`

**Props:**
```typescript
export interface DateTimePickerProps {
  value?: Date | string | null;
  onChange?: (dateTime: Date | null) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  minDateTime?: Date | string;
  maxDateTime?: Date | string;
  dateFormat?: string;
  timeFormat?: '12h' | '24h';
  size?: 'sm' | 'md' | 'lg';
}
```

### 7. Combobox

**Files to create:**
- `src/components/Combobox/Combobox.tsx`
- `src/components/Combobox/index.ts`

**Props:**
```typescript
export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
  creatable?: boolean;
  onCreate?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
}

export interface ComboboxHandle {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}
```

### 8. NumberInput

**Files to create:**
- `src/components/NumberInput/NumberInput.tsx`
- `src/components/NumberInput/index.ts`

**Props:**
```typescript
export interface NumberInputProps {
  value?: number | null;
  onChange?: (value: number | null) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  prefix?: string;
  suffix?: string;
  showButtons?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

### 9. FormControl

**Files to create:**
- `src/components/FormControl/FormControl.tsx`
- `src/components/FormControl/index.ts`

**Props:**
```typescript
export interface FormControlProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  disabled?: boolean;
}
```

### 10. Rating

**Files to create:**
- `src/components/Rating/Rating.tsx`
- `src/components/Rating/index.ts`

**Props:**
```typescript
export interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  allowHalf?: boolean;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  label?: string;
}
```

## Dark Theme Styling

| Element | Light (@papernote) | Dark (@room-ui) |
|---------|-------------------|-----------------|
| Input bg | bg-white | bg-slate-800 |
| Input border | border-paper-300 | border-slate-600 |
| Input focus | ring-accent-500 | ring-cyan-500 |
| Dropdown bg | bg-white | bg-slate-800 |
| Option hover | bg-paper-100 | bg-slate-700 |
| Option selected | bg-accent-50 | bg-cyan-900/30 |
| Switch track | bg-paper-300 | bg-slate-600 |
| Switch active | bg-accent-500 | bg-cyan-500 |
| Rating star | text-amber-400 | text-amber-400 |

## Export Updates

Update `src/components/index.ts`:
```typescript
// Advanced Form Controls
export { default as MultiSelect } from './MultiSelect';
export type { MultiSelectProps, MultiSelectOption, MultiSelectHandle } from './MultiSelect';

export { default as Switch } from './Switch';
export type { SwitchProps } from './Switch';

export { default as DatePicker } from './DatePicker';
export type { DatePickerProps, DatePickerHandle } from './DatePicker';

export { default as TimePicker } from './TimePicker';
export type { TimePickerProps, TimePickerHandle } from './TimePicker';

export { default as DateRangePicker } from './DateRangePicker';
export type { DateRangePickerProps, DateRange, DateRangePickerHandle } from './DateRangePicker';

export { default as DateTimePicker } from './DateTimePicker';
export type { DateTimePickerProps } from './DateTimePicker';

export { default as Combobox } from './Combobox';
export type { ComboboxProps, ComboboxOption, ComboboxHandle } from './Combobox';

export { default as NumberInput } from './NumberInput';
export type { NumberInputProps } from './NumberInput';

export { default as FormControl } from './FormControl';
export type { FormControlProps } from './FormControl';

export { default as Rating } from './Rating';
export type { RatingProps } from './Rating';
```

## Testing Checklist

- [ ] MultiSelect allows multiple selections
- [ ] MultiSelect searchable filters options
- [ ] Switch toggles on/off
- [ ] Switch respects disabled state
- [ ] DatePicker opens calendar
- [ ] DatePicker respects min/max dates
- [ ] TimePicker shows time options
- [ ] DateRangePicker selects range
- [ ] DateRangePicker presets work
- [ ] DateTimePicker combines date and time
- [ ] Combobox filters and selects
- [ ] Combobox creatable works
- [ ] NumberInput increments/decrements
- [ ] NumberInput respects min/max
- [ ] FormControl shows error state
- [ ] Rating allows star selection

## Completion Criteria

1. All 10 components implemented
2. All props match @papernote/ui exactly
3. All exports added to index.ts
4. Dark theme styling applied
5. Build succeeds
6. Type-check passes

## Post-Completion

After completing this phase:
1. Create summary: `docs/archive/phase-D-summary.md`
2. Move this file to `docs/archive/`
3. Proceed to Phase E: Data Display Components
