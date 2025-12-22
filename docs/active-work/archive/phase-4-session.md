# Phase 4: Advanced Form Components

## Session Goal
Add rich form components for complex data entry scenarios.

## Components to Implement

### 1. DatePicker
Date selection with calendar popup.

**Source**: `D:\repos\notebook-ui\src\components\DatePicker.tsx`

**Props**:
- `value`: Date | null
- `onChange`: (date: Date | null) => void
- `minDate`: Date
- `maxDate`: Date
- `disabled`: boolean
- `placeholder`: string
- `format`: string (e.g., 'MM/dd/yyyy')
- `clearable`: boolean

**Styling Adaptations**:
- Input: Use existing Input component
- Calendar bg: `bg-room-bg-elevated`
- Day hover: `bg-room-bg-surface`
- Day selected: `bg-room-accent text-white`
- Day today: `border-room-accent`
- Day disabled: `text-room-text-disabled`
- Month/year text: `text-room-text-primary`
- Weekday headers: `text-room-text-muted`

### 2. TimePicker
Time selection dropdown.

**Source**: `D:\repos\notebook-ui\src\components\TimePicker.tsx`

**Props**:
- `value`: string (HH:mm format)
- `onChange`: (time: string) => void
- `minuteStep`: number (5, 10, 15, 30)
- `use24Hour`: boolean
- `disabled`: boolean
- `placeholder`: string

**Styling Adaptations**:
- Same as DatePicker calendar

### 3. DateRangePicker
Date range selection.

**Source**: `D:\repos\notebook-ui\src\components\DateRangePicker.tsx`

**Props**:
- `value`: DateRange { start: Date, end: Date }
- `onChange`: (range: DateRange) => void
- `minDate`: Date
- `maxDate`: Date
- `presets`: { label, range }[]

**Styling Adaptations**:
- Range highlight: `bg-room-accent/10`
- Range endpoints: `bg-room-accent`

### 4. DateTimePicker
Combined date and time selection.

**Source**: `D:\repos\notebook-ui\src\components\DateTimePicker.tsx`

**Props**:
- Combines DatePicker and TimePicker props

### 5. TimezoneSelector
Timezone selection with search.

**Source**: `D:\repos\notebook-ui\src\components\TimezoneSelector.tsx`

**Props**:
- `value`: string (timezone ID)
- `onChange`: (timezone: string) => void
- `showOffset`: boolean
- `groupByRegion`: boolean

### 6. Combobox
Searchable dropdown with filtering.

**Source**: `D:\repos\notebook-ui\src\components\Combobox.tsx`

**Props**:
- `options`: ComboboxOption[] (value, label, icon, disabled)
- `value`: string
- `onChange`: (value: string) => void
- `placeholder`: string
- `searchPlaceholder`: string
- `emptyMessage`: string
- `loading`: boolean
- `disabled`: boolean
- `clearable`: boolean

**Styling Adaptations**:
- Search input: `bg-room-bg-surface`
- Dropdown: `bg-room-bg-elevated`
- Option hover: `bg-room-bg-surface`
- Option selected: `bg-room-accent/10`

### 7. MultiSelect
Multiple selection with chips.

**Source**: `D:\repos\notebook-ui\src\components\MultiSelect.tsx`

**Props**:
- `options`: MultiSelectOption[]
- `value`: string[]
- `onChange`: (values: string[]) => void
- `placeholder`: string
- `maxItems`: number (max visible chips)
- `searchable`: boolean
- `clearable`: boolean

**Styling Adaptations**:
- Selected chips: `bg-room-bg-surface`
- Chip remove button: `text-room-text-muted hover:text-room-error`

### 8. NumberInput
Numeric input with stepper controls.

**Source**: `D:\repos\notebook-ui\src\components\NumberInput.tsx`

**Props**:
- `value`: number
- `onChange`: (value: number) => void
- `min`: number
- `max`: number
- `step`: number
- `precision`: number (decimal places)
- `showStepper`: boolean
- `prefix`: string
- `suffix`: string

**Styling Adaptations**:
- Input: existing Input styles
- Stepper buttons: `bg-room-bg-surface hover:bg-room-bg-hover`

### 9. PasswordInput
Password field with visibility toggle.

**Source**: `D:\repos\notebook-ui\src\components\PasswordInput.tsx`

**Props**:
- All Input props plus:
- `showStrengthIndicator`: boolean
- `strengthRules`: PasswordStrengthRule[]

**Styling Adaptations**:
- Strength bar: semantic colors (error → warning → success)

### 10. MaskedInput
Input with formatting mask.

**Source**: `D:\repos\notebook-ui\src\components\MaskedInput.tsx`

**Props**:
- `mask`: MaskType | string
- `value`: string
- `onChange`: (value: string) => void
- Predefined masks: 'phone', 'ssn', 'credit-card', 'date', 'time', 'currency'

### 11. Autocomplete
Auto-complete with async search.

**Source**: `D:\repos\notebook-ui\src\components\Autocomplete.tsx`

**Props**:
- `options`: AutocompleteOption[] | ((query: string) => Promise<AutocompleteOption[]>)
- `value`: string
- `onChange`: (value: string, option: AutocompleteOption) => void
- `debounce`: number
- `minChars`: number
- `loading`: boolean
- `emptyMessage`: string

### 12. Slider
Range slider control.

**Source**: `D:\repos\notebook-ui\src\components\Slider.tsx`

**Props**:
- `value`: number | [number, number] (range mode)
- `onChange`: (value) => void
- `min`: number
- `max`: number
- `step`: number
- `marks`: { value, label }[]
- `showTooltip`: boolean
- `disabled`: boolean

**Styling Adaptations**:
- Track bg: `bg-room-bg-surface`
- Track fill: `bg-room-accent`
- Thumb: `bg-white border-room-accent`
- Mark: `bg-room-border`
- Mark label: `text-room-text-muted`

### 13. Rating
Star rating input.

**Source**: `D:\repos\notebook-ui\src\components\Rating.tsx`

**Props**:
- `value`: number
- `onChange`: (value: number) => void
- `max`: number
- `size`: 'sm' | 'md' | 'lg'
- `allowHalf`: boolean
- `readonly`: boolean
- `icon`: LucideIcon

**Styling Adaptations**:
- Empty star: `text-room-border`
- Filled star: `text-room-warning` (amber)
- Hover: `text-room-warning-light`

### 14. ColorPicker
Color selection tool.

**Source**: `D:\repos\notebook-ui\src\components\ColorPicker.tsx`

**Props**:
- `value`: string (hex)
- `onChange`: (color: string) => void
- `presets`: string[] (preset colors)
- `showInput`: boolean
- `showAlpha`: boolean

**Styling Adaptations**:
- Popup bg: `bg-room-bg-elevated`
- Input: existing Input styles
- Preset swatch border: `border-room-border`

### 15. FileUpload
File upload with drag-and-drop.

**Source**: `D:\repos\notebook-ui\src\components\FileUpload.tsx`

**Props**:
- `accept`: string
- `multiple`: boolean
- `maxSize`: number (bytes)
- `maxFiles`: number
- `onUpload`: (files: File[]) => void
- `onRemove`: (file: UploadedFile) => void
- `value`: UploadedFile[]
- `variant`: 'dropzone' | 'button'

**Styling Adaptations**:
- Dropzone border: `border-room-border border-dashed`
- Dropzone hover: `border-room-accent bg-room-accent/5`
- File item: `bg-room-bg-surface`
- Progress bar: existing ProgressBar

## Implementation Steps

1. Create calendar utilities for DatePicker
2. Implement date formatting/parsing
3. Create shared dropdown logic for Combobox, MultiSelect, Autocomplete
4. Add input masks for MaskedInput
5. Implement drag-and-drop for FileUpload

## File Structure

```
src/components/
├── DatePicker/
│   ├── DatePicker.tsx
│   ├── Calendar.tsx
│   ├── CalendarGrid.tsx
│   └── index.ts
├── TimePicker/
│   ├── TimePicker.tsx
│   └── index.ts
├── DateRangePicker/
│   ├── DateRangePicker.tsx
│   └── index.ts
├── DateTimePicker/
│   ├── DateTimePicker.tsx
│   └── index.ts
├── TimezoneSelector/
│   ├── TimezoneSelector.tsx
│   ├── timezones.ts
│   └── index.ts
├── Combobox/
│   ├── Combobox.tsx
│   └── index.ts
├── MultiSelect/
│   ├── MultiSelect.tsx
│   └── index.ts
├── NumberInput/
│   ├── NumberInput.tsx
│   └── index.ts
├── PasswordInput/
│   ├── PasswordInput.tsx
│   ├── PasswordStrength.tsx
│   └── index.ts
├── MaskedInput/
│   ├── MaskedInput.tsx
│   ├── masks.ts
│   └── index.ts
├── Autocomplete/
│   ├── Autocomplete.tsx
│   └── index.ts
├── Slider/
│   ├── Slider.tsx
│   └── index.ts
├── Rating/
│   ├── Rating.tsx
│   └── index.ts
├── ColorPicker/
│   ├── ColorPicker.tsx
│   ├── ColorSwatch.tsx
│   └── index.ts
├── FileUpload/
│   ├── FileUpload.tsx
│   ├── DropZone.tsx
│   └── index.ts
```

## Testing Checklist

- [ ] DatePicker opens calendar on click
- [ ] DatePicker keyboard navigation
- [ ] DatePicker respects min/max dates
- [ ] TimePicker 12/24 hour modes
- [ ] DateRangePicker range selection
- [ ] DateRangePicker presets work
- [ ] Combobox filtering works
- [ ] Combobox keyboard navigation
- [ ] MultiSelect chip management
- [ ] NumberInput increment/decrement
- [ ] NumberInput min/max bounds
- [ ] PasswordInput visibility toggle
- [ ] PasswordInput strength indicator
- [ ] MaskedInput formatting
- [ ] Autocomplete async search
- [ ] Slider drag interaction
- [ ] Slider range mode
- [ ] Rating click/hover
- [ ] ColorPicker color selection
- [ ] FileUpload drag-and-drop
- [ ] FileUpload file validation

## Dependencies

- Phase 1 components (Input, Icon)
- Phase 2 components (Popover for dropdowns)
- Phase 3 components (Dropdown logic)
