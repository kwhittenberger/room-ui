# Phase 5: Data Display Components

## Session Goal
Add components for displaying and interacting with tabular and complex data.

## Components to Implement

### 1. DataTable
Full-featured data table with sorting, filtering, pagination.

**Source**: `D:\repos\notebook-ui\src\components\DataTable.tsx`

**Props**:
- `columns`: DataTableColumn[] (key, label, sortable, render, width)
- `data`: T[]
- `loading`: boolean
- `emptyMessage`: string
- `selectable`: boolean | 'single' | 'multi'
- `selectedRows`: string[]
- `onSelectionChange`: (ids: string[]) => void
- `sortable`: boolean
- `sortConfig`: { key, direction }
- `onSort`: (key: string) => void
- `expandable`: boolean
- `expandedRows`: string[]
- `onExpand`: (id: string) => void
- `renderExpandedRow`: (row) => ReactNode
- `actions`: DataTableAction[]
- `pagination`: { page, pageSize, total, onPageChange }
- `stickyHeader`: boolean

**Styling Adaptations**:
- Header bg: `bg-room-bg-surface`
- Header text: `text-room-text-muted`
- Row bg: `bg-room-bg-elevated`
- Row hover: `hover:bg-room-bg-surface`
- Row selected: `bg-room-accent/10`
- Border: `border-room-border`
- Sort icon: `text-room-text-muted` active: `text-room-accent`

### 2. DataTableCardView
Card-based view for mobile/responsive tables.

**Source**: `D:\repos\notebook-ui\src\components\DataTableCardView.tsx`

**Props**:
- Similar to DataTable but renders as cards
- `cardConfig`: { title, subtitle, image, fields }

**Styling Adaptations**:
- Card: existing Card component

### 3. DataGrid
Excel-like spreadsheet grid with formulas.

**Source**: `D:\repos\notebook-ui\src\components\DataGrid.tsx`

**Props**:
- `columns`: DataGridColumn[]
- `data`: DataGridCell[][]
- `onChange`: (data) => void
- `editable`: boolean
- `rowHeaders`: boolean
- `frozenColumns`: number
- `frozenRows`: number
- `formulas`: boolean
- `selection`: { start, end }
- `onSelectionChange`: (selection) => void

**Styling Adaptations**:
- Cell bg: `bg-room-bg-elevated`
- Cell selected: `border-room-accent`
- Cell editing: `bg-room-bg-base`
- Header cells: `bg-room-bg-surface`
- Frozen row/col: `bg-room-bg-surface`
- Formula bar: `bg-room-bg-surface`

### 4. Chip + ChipGroup
Tag/chip display and selection.

**Source**: `D:\repos\notebook-ui\src\components\Chip.tsx`

**Props (Chip)**:
- `children`: ReactNode
- `variant`: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
- `size`: 'sm' | 'md'
- `removable`: boolean
- `onRemove`: () => void
- `onClick`: () => void
- `selected`: boolean

**Props (ChipGroup)**:
- `children`: ReactNode (Chip elements)
- `selectable`: boolean | 'single' | 'multi'
- `value`: string | string[]
- `onChange`: (value) => void

**Styling Adaptations**:
- Default bg: `bg-room-bg-surface`
- Variant bg: semantic muted colors
- Selected: `ring-2 ring-room-accent`
- Remove button: `text-room-text-muted hover:text-room-error`

### 5. Timeline
Timeline/activity feed display.

**Source**: `D:\repos\notebook-ui\src\components\Timeline.tsx`

**Props**:
- `items`: TimelineItem[] (title, description, timestamp, icon, variant)
- `orientation`: 'vertical' | 'horizontal'
- `alternating`: boolean (left/right alternating)

**Styling Adaptations**:
- Line: `bg-room-border`
- Dot default: `bg-room-bg-surface border-room-border`
- Dot variant: semantic colors
- Text: `text-room-text-primary` (title), `text-room-text-muted` (time)

### 6. TreeView
Hierarchical tree structure.

**Source**: `D:\repos\notebook-ui\src\components\TreeView.tsx`

**Props**:
- `nodes`: TreeNode[] (id, label, icon, children, disabled)
- `selectedId`: string
- `expandedIds`: string[]
- `onSelect`: (id: string) => void
- `onExpand`: (id: string) => void
- `selectable`: boolean
- `checkable`: boolean
- `checkedIds`: string[]
- `onCheck`: (ids: string[]) => void

**Styling Adaptations**:
- Node hover: `bg-room-bg-surface`
- Node selected: `bg-room-accent/10 text-room-accent`
- Expand icon: `text-room-text-muted`
- Checkbox: existing Checkbox component

### 7. StatCard
Single statistic display card.

**Source**: `D:\repos\notebook-ui\src\components\StatCard.tsx`

**Props**:
- `title`: string
- `value`: string | number
- `change`: { value: number, type: 'increase' | 'decrease' }
- `icon`: LucideIcon
- `trend`: 'up' | 'down' | 'neutral'
- `loading`: boolean

**Styling Adaptations**:
- Card: existing Card component
- Title: `text-room-text-muted`
- Value: `text-room-text-primary`
- Trend up: `text-room-success`
- Trend down: `text-room-error`

### 8. StatsGrid + StatsCardGrid
Grid layout for multiple stats.

**Source**: `D:\repos\notebook-ui\src\components\StatsGrid.tsx`

**Props**:
- `stats`: StatItem[]
- `columns`: number | responsive
- `loading`: boolean

### 9. CurrencyDisplay
Formatted currency display.

**Source**: `D:\repos\notebook-ui\src\components\CurrencyDisplay.tsx`

**Props**:
- `value`: number
- `currency`: string (USD, EUR, etc.)
- `locale`: string
- `showSymbol`: boolean
- `showCode`: boolean
- `compact`: boolean (e.g., "$1.2M")

### 10. CurrencyInput
Currency input with formatting.

**Source**: `D:\repos\notebook-ui\src\components\CurrencyInput.tsx`

**Props**:
- `value`: number
- `onChange`: (value: number) => void
- `currency`: string
- `locale`: string
- All Input props

### 11. DateDisplay
Formatted date display.

**Source**: `D:\repos\notebook-ui\src\components\DateDisplay.tsx`

**Props**:
- `value`: Date | string
- `format`: string | 'relative'
- `timezone`: string
- `showTime`: boolean

### 12. CardView
Card-based list view.

**Source**: `D:\repos\notebook-ui\src\components\CardView.tsx`

**Props**:
- `items`: CardViewItem[]
- `renderCard`: (item) => ReactNode
- `columns`: number | responsive
- `loading`: boolean
- `emptyMessage`: string

### 13. ExpandableRowButton
Button to expand table rows.

**Source**: `D:\repos\notebook-ui\src\components\ExpandableRowButton.tsx`

**Props**:
- `expanded`: boolean
- `onClick`: () => void

### 14. ExportButton
Export data to various formats.

**Source**: `D:\repos\notebook-ui\src\components\ExportButton.tsx`

**Props**:
- `data`: any[]
- `columns`: ExportColumn[]
- `filename`: string
- `formats`: ('csv' | 'xlsx' | 'json')[]
- `onExport`: (format) => void

### 15. QueryTransparency
Display query/filter information.

**Source**: `D:\repos\notebook-ui\src\components\QueryTransparency.tsx`

**Props**:
- `info`: QueryTransparencyInfo
- `onClearFilters`: () => void

## File Structure

```
src/components/
├── DataTable/
│   ├── DataTable.tsx
│   ├── DataTableHeader.tsx
│   ├── DataTableRow.tsx
│   ├── DataTablePagination.tsx
│   └── index.ts
├── DataTableCardView/
│   ├── DataTableCardView.tsx
│   └── index.ts
├── DataGrid/
│   ├── DataGrid.tsx
│   ├── DataGridCell.tsx
│   ├── FormulaBar.tsx
│   └── index.ts
├── Chip/
│   ├── Chip.tsx
│   ├── ChipGroup.tsx
│   └── index.ts
├── Timeline/
│   ├── Timeline.tsx
│   └── index.ts
├── TreeView/
│   ├── TreeView.tsx
│   ├── TreeNode.tsx
│   └── index.ts
├── StatCard/
│   ├── StatCard.tsx
│   └── index.ts
├── StatsGrid/
│   ├── StatsGrid.tsx
│   ├── StatsCardGrid.tsx
│   └── index.ts
├── CurrencyDisplay/
│   ├── CurrencyDisplay.tsx
│   └── index.ts
├── CurrencyInput/
│   ├── CurrencyInput.tsx
│   └── index.ts
├── DateDisplay/
│   ├── DateDisplay.tsx
│   └── index.ts
├── CardView/
│   ├── CardView.tsx
│   └── index.ts
├── ExpandableRowButton/
│   ├── ExpandableRowButton.tsx
│   └── index.ts
├── ExportButton/
│   ├── ExportButton.tsx
│   └── index.ts
├── QueryTransparency/
│   ├── QueryTransparency.tsx
│   └── index.ts
```

## Testing Checklist

- [ ] DataTable sorting works
- [ ] DataTable row selection (single/multi)
- [ ] DataTable row expansion
- [ ] DataTable pagination
- [ ] DataTable sticky header
- [ ] DataTableCardView responsive
- [ ] DataGrid cell editing
- [ ] DataGrid formula calculation
- [ ] DataGrid selection
- [ ] Chip removable works
- [ ] ChipGroup selection
- [ ] Timeline renders correctly
- [ ] Timeline alternating mode
- [ ] TreeView expand/collapse
- [ ] TreeView selection
- [ ] TreeView checkable mode
- [ ] StatCard displays correctly
- [ ] StatCard loading state
- [ ] StatsGrid responsive
- [ ] CurrencyDisplay formats correctly
- [ ] CurrencyInput parsing
- [ ] DateDisplay formats
- [ ] DateDisplay relative time
- [ ] CardView grid layout
- [ ] ExportButton downloads files

## Dependencies

- Phase 1 components (Skeleton, EmptyState)
- Phase 3 components (Pagination, Dropdown)
- Phase 4 components for editing cells
