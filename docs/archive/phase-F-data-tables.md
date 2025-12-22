# Phase F: Data Table Components

## Session Prompt
```
I'm starting Phase F of @room-ui: Data Table Components.

Context: D:\repos\@room-ui\docs\active-work\phase-F-data-tables.md
Master Plan: D:\repos\dewart-deal-room\docs\active-work\phase-7-room-ui-extraction.md

Goals:
1. Implement DataTable (CRITICAL - most complex component)
2. Implement DataTableCardView
3. Implement ExpandedRowEditForm
4. Implement FilterBar
5. Implement FilterControls
6. Implement ExportButton
7. Implement DataGrid (spreadsheet-like)
8. Implement Spreadsheet

All components MUST match @papernote/ui API exactly for drop-in replacement.

Reference:
- @papernote/ui DataTable: D:\repos\notebook-ui\src\components\DataTable\
- @papernote/ui DataGrid: D:\repos\notebook-ui\src\components\DataGrid\
```

## Priority: HIGH
DataTable is one of the most critical and complex components.

## Prerequisites
- Phase A-E completed

## Components to Implement

### 1. DataTable (CRITICAL)

**Files to create:**
- `src/components/DataTable/DataTable.tsx`
- `src/components/DataTable/DataTableHeader.tsx`
- `src/components/DataTable/DataTableRow.tsx`
- `src/components/DataTable/DataTableCell.tsx`
- `src/components/DataTable/DataTablePagination.tsx`
- `src/components/DataTable/index.ts`

**Props (must match exactly):**
```typescript
export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
  error?: string;

  // Selection
  selectable?: boolean;
  selectedRows?: T[];
  onSelectedRowsChange?: (rows: T[]) => void;

  // Sorting
  sortable?: boolean;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string, direction: 'asc' | 'desc') => void;

  // Pagination
  pagination?: boolean;
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];

  // Row expansion
  expandable?: boolean;
  expandedRowConfig?: ExpandedRowConfig<T>;
  expandedRows?: string[];
  onExpandedRowsChange?: (ids: string[]) => void;
  expansionMode?: ExpansionMode;

  // Actions
  actions?: DataTableAction<T>[];
  rowActions?: DataTableAction<T>[];

  // Styling
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;

  // Other
  getRowId?: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  loadingRows?: number;
}

export interface DataTableColumn<T> {
  id: string;
  header: string;
  accessor: keyof T | ((row: T) => unknown);
  cell?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  align?: 'left' | 'center' | 'right';
  sticky?: 'left' | 'right';
  hidden?: boolean;
}

export interface DataTableAction<T> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (rows: T[]) => void;
  disabled?: boolean | ((rows: T[]) => boolean);
  variant?: 'default' | 'danger';
}

export interface ExpandedRowConfig<T> {
  render: (row: T) => React.ReactNode;
}

export type ExpansionMode = 'single' | 'multiple';
```

### 2. DataTableCardView

**Files to create:**
- `src/components/DataTableCardView/DataTableCardView.tsx`
- `src/components/DataTableCardView/index.ts`

**Props:**
```typescript
export interface DataTableCardViewProps<T> {
  data: T[];
  config: CardViewConfig<T>;
  loading?: boolean;
  onCardClick?: (row: T) => void;
  actions?: DataTableAction<T>[];
}

export interface CardViewConfig<T> {
  title: (row: T) => React.ReactNode;
  subtitle?: (row: T) => React.ReactNode;
  image?: (row: T) => string;
  badge?: (row: T) => React.ReactNode;
  fields?: CardViewField<T>[];
}

export interface CardViewField<T> {
  label: string;
  value: (row: T) => React.ReactNode;
}
```

### 3. ExpandedRowEditForm

**Files to create:**
- `src/components/ExpandedRowEditForm/ExpandedRowEditForm.tsx`
- `src/components/ExpandedRowEditForm/index.ts`

**Props:**
```typescript
export interface ExpandedRowEditFormProps<T> {
  row: T;
  fields: FormField[];
  onSave: (data: Partial<T>) => void | Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  validation?: (value: unknown) => string | undefined;
}

export type FormFieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'switch'
  | 'number'
  | 'date';
```

### 4. FilterBar

**Files to create:**
- `src/components/FilterBar/FilterBar.tsx`
- `src/components/FilterBar/index.ts`

**Props:**
```typescript
export interface FilterBarProps {
  filters: FilterConfig[];
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
  onClear?: () => void;
  onApply?: () => void;
  showClearButton?: boolean;
  showApplyButton?: boolean;
}

export interface FilterConfig {
  id: string;
  label: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'daterange' | 'number';
  options?: { value: string; label: string }[];
  placeholder?: string;
}
```

### 5. FilterControls

**Files to create:**
- `src/components/FilterControls/FilterControls.tsx`
- `src/components/FilterControls/index.ts`

**Props:**
```typescript
export interface FilterControlsProps {
  children: React.ReactNode;
  onClear?: () => void;
  onApply?: () => void;
  showClear?: boolean;
  showApply?: boolean;
}
```

### 6. ExportButton

**Files to create:**
- `src/components/ExportButton/ExportButton.tsx`
- `src/components/ExportButton/index.ts`

**Props:**
```typescript
export interface ExportButtonProps {
  onExport: (format: ExportFormat) => void;
  formats?: ExportFormat[];
  loading?: boolean;
  disabled?: boolean;
  label?: string;
}

export type ExportFormat = 'csv' | 'excel' | 'pdf' | 'json';
```

### 7. DataGrid (Spreadsheet-like)

**Files to create:**
- `src/components/DataGrid/DataGrid.tsx`
- `src/components/DataGrid/DataGridCell.tsx`
- `src/components/DataGrid/DataGridHeader.tsx`
- `src/components/DataGrid/index.ts`

**Props:**
```typescript
export interface DataGridProps {
  columns: DataGridColumn[];
  data: DataGridCell[][];
  onChange?: (data: DataGridCell[][]) => void;

  // Features
  editable?: boolean;
  formulaSupport?: boolean;
  frozenRows?: number;
  frozenColumns?: number;

  // Selection
  selectionMode?: 'cell' | 'row' | 'column' | 'range';
  selectedCells?: CellReference[];
  onSelectionChange?: (cells: CellReference[]) => void;

  // Sizing
  rowHeight?: number;
  columnWidth?: number;

  // Other
  showRowNumbers?: boolean;
  showColumnHeaders?: boolean;
}

export interface DataGridColumn {
  id: string;
  header: string;
  width?: number;
  type?: 'text' | 'number' | 'date' | 'formula';
  format?: string;
}

export interface DataGridCell {
  value: CellValue;
  formula?: string;
  format?: string;
  style?: CellStyle;
}

export type CellValue = string | number | boolean | Date | null;

export interface DataGridHandle {
  getCellValue: (row: number, col: number) => CellValue;
  setCellValue: (row: number, col: number, value: CellValue) => void;
  getSelection: () => CellReference[];
  setSelection: (cells: CellReference[]) => void;
}
```

### 8. Spreadsheet

**Files to create:**
- `src/components/Spreadsheet/Spreadsheet.tsx`
- `src/components/Spreadsheet/SpreadsheetReport.tsx`
- `src/components/Spreadsheet/index.ts`

**Props:**
```typescript
export interface SpreadsheetProps {
  data: Matrix<SpreadsheetCell>;
  onChange?: (data: Matrix<SpreadsheetCell>) => void;
  columns?: number;
  rows?: number;
  readOnly?: boolean;
  formulaBar?: boolean;
}

export interface SpreadsheetCell extends CellBase {
  value: CellValue;
  formula?: string;
}

export type Matrix<T> = T[][];

export interface CellBase {
  className?: string;
  style?: React.CSSProperties;
}
```

## Dark Theme Styling

| Element | Light (@papernote) | Dark (@room-ui) |
|---------|-------------------|-----------------|
| Table header | bg-paper-100 | bg-slate-800 |
| Table row | bg-white | bg-slate-900 |
| Table row alt | bg-paper-50 | bg-slate-850 |
| Table row hover | bg-paper-100 | bg-slate-800 |
| Table border | border-paper-200 | border-slate-700 |
| Selected row | bg-accent-50 | bg-cyan-900/30 |
| Cell focus | ring-accent-500 | ring-cyan-500 |
| Filter bg | bg-paper-50 | bg-slate-800 |

## Export Updates

Update `src/components/index.ts`:
```typescript
// Data Table Components
export { default as DataTable } from './DataTable';
export type {
  DataTableColumn,
  DataTableAction,
  ExpandedRowConfig,
  ExpansionMode,
} from './DataTable';

export { default as DataTableCardView } from './DataTableCardView';
export type { CardViewConfig, DataTableCardViewProps } from './DataTableCardView';

export { default as ExpandedRowEditForm } from './ExpandedRowEditForm';
export type {
  ExpandedRowEditFormProps,
  FormField,
  FormFieldType,
} from './ExpandedRowEditForm';

export { default as FilterBar } from './FilterBar';
export type { FilterBarProps, FilterConfig } from './FilterBar';

export { FilterControls } from './FilterControls';

export { default as ExportButton } from './ExportButton';
export type { ExportButtonProps, ExportFormat } from './ExportButton';

export { default as DataGrid } from './DataGrid';
export type {
  DataGridProps,
  DataGridHandle,
  DataGridColumn,
  DataGridCell,
  CellValue,
} from './DataGrid';

export { Spreadsheet, SpreadsheetReport } from './Spreadsheet';
export type { SpreadsheetProps, SpreadsheetCell, Matrix, CellBase } from './Spreadsheet';
```

## Testing Checklist

- [ ] DataTable renders columns and rows
- [ ] DataTable sorting works
- [ ] DataTable pagination works
- [ ] DataTable row selection works
- [ ] DataTable row expansion works
- [ ] DataTable row actions work
- [ ] DataTableCardView renders cards
- [ ] ExpandedRowEditForm saves data
- [ ] FilterBar applies filters
- [ ] FilterControls clears filters
- [ ] ExportButton exports data
- [ ] DataGrid renders editable cells
- [ ] DataGrid formula support works
- [ ] Spreadsheet allows cell editing

## Complexity Warning

DataTable and DataGrid are the most complex components in the library.
Plan for significant development time:
- DataTable: Expect 1-2 sessions
- DataGrid: Expect 1-2 sessions

Consider breaking into sub-tasks.

## Completion Criteria

1. All 8 component groups implemented
2. All props match @papernote/ui exactly
3. All exports added to index.ts
4. Dark theme styling applied
5. Build succeeds
6. Type-check passes

## Post-Completion

After completing this phase:
1. Create summary: `docs/archive/phase-F-summary.md`
2. Move this file to `docs/archive/`
3. Proceed to Phase G: Layout Components
