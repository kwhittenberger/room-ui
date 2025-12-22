# Phase J: Remaining Components & Polish

## Session Prompt
```
I'm starting Phase J of @room-ui: Remaining Components and Polish.

Context: D:\repos\@room-ui\docs\active-work\phase-J-remaining.md
Master Plan: D:\repos\dewart-deal-room\docs\active-work\phase-7-room-ui-extraction.md

Goals:
1. Implement all remaining components not covered in phases A-I
2. Implement all remaining utilities
3. Implement all remaining hooks
4. Create Storybook stories for ALL components
5. Verify 100% parity with @papernote/ui exports
6. Final build and type verification

Reference:
- @papernote/ui exports: D:\repos\notebook-ui\src\components\index.ts
- @room-ui current: D:\repos\@room-ui\src\components\index.ts
```

## Priority: MEDIUM
Final phase to achieve 100% parity.

## Prerequisites
- Phase A-I completed

## Remaining Components to Implement

### Display Components

**Files to create for each:**

1. **StatCard**
```typescript
export interface StatCardProps {
  title: string;
  value: string | number;
  change?: { value: number; type: 'increase' | 'decrease' };
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}
```

2. **StatsGrid + StatItem**
```typescript
export interface StatsGridProps {
  children: React.ReactNode;
  columns?: number;
}

export interface StatItemProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
}
```

3. **CompactStat**
```typescript
export interface CompactStatProps {
  label: string;
  value: string | number;
  trend?: CompactStatTrend;
  size?: 'sm' | 'md';
}

export interface CompactStatTrend {
  value: number;
  direction: 'up' | 'down';
}
```

4. **CurrencyDisplay**
```typescript
export interface CurrencyDisplayProps {
  value: number;
  currency?: string;
  locale?: string;
  showSign?: boolean;
  colorCode?: boolean;
}
```

5. **CurrencyInput**
```typescript
export interface CurrencyInputProps {
  value?: number;
  onChange?: (value: number | null) => void;
  currency?: string;
  locale?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
}
```

6. **DateDisplay**
```typescript
export interface DateDisplayProps {
  value: Date | string;
  format?: string;
  relative?: boolean;
  showTime?: boolean;
}
```

7. **StepIndicator**
```typescript
export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  size?: 'sm' | 'md' | 'lg';
}

export interface Step {
  id: string;
  label: string;
  status?: 'pending' | 'current' | 'complete' | 'error';
}
```

### UI Components

8. **GridItem** (separate component)
```typescript
export interface GridItemProps {
  colSpan?: number | { sm?: number; md?: number; lg?: number };
  rowSpan?: number;
  children: React.ReactNode;
}
```

9. **Separator**
```typescript
export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  label?: string;
}
```

10. **Logo**
```typescript
export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  onClick?: () => void;
}
```

11. **ThemeToggle**
```typescript
export interface ThemeToggleProps {
  theme?: 'light' | 'dark' | 'system';
  onChange?: (theme: 'light' | 'dark' | 'system') => void;
  size?: 'sm' | 'md' | 'lg';
}
```

12. **SearchBar**
```typescript
export interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
  loading?: boolean;
}
```

13. **UserProfileButton**
```typescript
export interface UserProfileButtonProps {
  user: { name: string; email?: string; avatar?: string };
  menuItems?: DropdownItem[];
  onLogout?: () => void;
}
```

14. **NotificationIndicator**
```typescript
export interface NotificationIndicatorProps {
  count?: number;
  max?: number;
  showDot?: boolean;
  children: React.ReactElement;
}
```

15. **NotificationBell**
```typescript
export interface NotificationBellProps {
  notifications: NotificationItem[];
  onNotificationClick?: (notification: NotificationItem) => void;
  onMarkAllRead?: () => void;
  position?: NotificationBellPosition;
  style?: NotificationBellStyle;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  type?: 'info' | 'success' | 'warning' | 'error';
}
```

16. **NotificationBanner**
```typescript
export interface NotificationBannerProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  action?: NotificationBannerAction;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export interface NotificationBannerAction {
  label: string;
  onClick: () => void;
}
```

17. **NotificationBar**
```typescript
export interface NotificationBarProps {
  // Implementation TBD - check @papernote/ui
}
```

### Advanced Components

18. **TimezoneSelector**
```typescript
export interface TimezoneSelectorProps {
  value?: string;
  onChange?: (timezone: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
}

export interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
}

export function getLocalTimezone(): string;
export function isValidTimezone(tz: string): boolean;
```

19. **Autocomplete**
```typescript
export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  onChange?: (value: string) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  loading?: boolean;
  freeSolo?: boolean;
}

export interface AutocompleteOption {
  value: string;
  label: string;
  description?: string;
}

export interface AutocompleteHandle {
  focus: () => void;
  blur: () => void;
}
```

20. **PasswordInput**
```typescript
export interface PasswordInputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  showStrength?: boolean;
  requirements?: PasswordRequirement[];
}

export interface PasswordStrength {
  score: number;
  label: string;
}

export interface PasswordInputHandle {
  focus: () => void;
}
```

21. **MaskedInput**
```typescript
export interface MaskedInputProps {
  value?: string;
  onChange?: (value: string) => void;
  mask: string | MaskType;
  placeholder?: string;
  label?: string;
  error?: string;
}

export type MaskType = 'phone' | 'ssn' | 'creditCard' | 'date' | 'time' | 'currency';

export interface MaskedInputHandle {
  focus: () => void;
  getRawValue: () => string;
}
```

22. **InfiniteScroll**
```typescript
export interface InfiniteScrollProps {
  children: React.ReactNode;
  onLoadMore: () => void | Promise<void>;
  hasMore: boolean;
  loading?: boolean;
  loader?: React.ReactNode;
  threshold?: number;
}
```

23. **DropZone**
```typescript
export interface DropZoneProps {
  onDrop: (files: File[]) => void;
  accept?: string | string[];
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  children?: React.ReactNode;
}
```

24. **FileUpload**
```typescript
export interface FileUploadProps {
  onUpload: (files: UploadedFile[]) => void;
  accept?: string | string[];
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  showPreview?: boolean;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  progress?: number;
  error?: string;
}
```

25. **ErrorBoundary**
```typescript
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode | ((error: Error) => React.ReactNode);
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}
```

26. **Collapsible**
```typescript
export interface CollapsibleProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}
```

27. **ExpandablePanel**
```typescript
export interface ExpandablePanelProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  actions?: React.ReactNode;
}
```

28. **Show/Hide Responsive Utilities**
```typescript
export const Show: React.FC<{ above?: Breakpoint; below?: Breakpoint; children: React.ReactNode }>;
export const Hide: React.FC<{ above?: Breakpoint; below?: Breakpoint; children: React.ReactNode }>;
```

29. **CheckboxList**
```typescript
export interface CheckboxListProps {
  items: CheckboxListItem[];
  value?: string[];
  onChange?: (value: string[]) => void;
  selectAll?: boolean;
  searchable?: boolean;
}

export interface CheckboxListItem {
  id: string;
  label: string;
  disabled?: boolean;
}
```

30. **SearchableList**
```typescript
export interface SearchableListProps {
  items: SearchableListItem[];
  onSelect?: (item: SearchableListItem) => void;
  placeholder?: string;
  emptyMessage?: string;
}

export interface SearchableListItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}
```

31. **ContextMenu**
```typescript
export interface ContextMenuProps {
  trigger: React.ReactElement;
  items: MenuItem[];
  onSelect?: (item: MenuItem) => void;
}
```

32. **LoadingOverlay**
```typescript
export interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  blur?: boolean;
}
```

33. **QueryTransparency**
```typescript
export interface QueryTransparencyProps {
  query: QueryTransparencyInfo;
  onCopy?: () => void;
}

export interface QueryTransparencyInfo {
  sql?: string;
  params?: Record<string, unknown>;
  duration?: number;
}
```

34. **AdminModal**
```typescript
export interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tabs: AdminModalTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export interface AdminModalTab {
  id: string;
  label: string;
  content: React.ReactNode;
}
```

35. **CardView**
```typescript
export interface CardViewProps<T> {
  items: CardViewItem<T>[];
  onItemClick?: (item: T) => void;
  columns?: number;
}

export interface CardViewItem<T> {
  data: T;
  title: string;
  subtitle?: string;
  image?: string;
  badge?: React.ReactNode;
}
```

36. **ExpandableToolbar**
```typescript
export interface ExpandableToolbarProps {
  sections: ToolbarSection[];
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export interface ToolbarSection {
  id: string;
  content: React.ReactNode;
  collapsible?: boolean;
}
```

37. **FilterStatusBanner**
```typescript
export interface FilterStatusBannerProps {
  activeFilters: number;
  onClear: () => void;
  filterSummary?: string;
}
```

38. **ExpandableRowButton**
```typescript
export interface ExpandableRowButtonProps {
  expanded: boolean;
  onClick: () => void;
  disabled?: boolean;
}
```

39. **StatsCardGrid**
```typescript
export interface StatsCardGridProps {
  children: React.ReactNode;
  columns?: number;
}
```

## Remaining Utilities

**Files to create:**
- `src/utils/statisticsFormatter.ts`
- `src/utils/tableEnhancements.ts`
- `src/utils/excelExport.ts`
- `src/utils/formulaDefinitions.ts`

```typescript
// statisticsFormatter.ts
export function formatStatisticValue(value: number, format: StatisticFormat): string;
export function formatStatistics(stats: StatisticConfig[]): FormattedStatistic[];

// tableEnhancements.ts
export function calculateColumnWidth(...);
export function reorderArray(...);
export function saveColumnWidths(...);
export function loadColumnWidths(...);
export function saveColumnOrder(...);
export function loadColumnOrder(...);

// excelExport.ts
export function exportToExcel(data: unknown[], options: ExportToExcelOptions): void;
export function exportDataTableToExcel(data: unknown[], columns: DataTableColumn[], options: DataTableExportOptions): void;
export function createMultiSheetExcel(sheets: MultiSheetExcelOptions): Blob;

// formulaDefinitions.ts
export const FORMULA_DEFINITIONS: FormulaDefinition[];
export const FORMULA_NAMES: string[];
export const FORMULA_CATEGORIES: FormulaCategory[];
export function getFormulasByCategory(category: string): FormulaDefinition[];
export function searchFormulas(query: string): FormulaDefinition[];
export function getFormula(name: string): FormulaDefinition | undefined;
```

## Remaining Hooks

**Files to create:**
- `src/hooks/useTableEnhancements.ts`

```typescript
export function useColumnResize(options: UseColumnResizeOptions): ColumnResizeReturn;
export function useColumnReorder(options: UseColumnReorderOptions): ColumnReorderReturn;
```

## Storybook Stories

Create `.stories.tsx` files for EVERY component:

```
src/components/
├── Box/
│   ├── Box.tsx
│   ├── Box.stories.tsx  ← CREATE
│   └── index.ts
├── Button/
│   ├── Button.tsx
│   ├── Button.stories.tsx  ← CREATE
│   └── index.ts
... (for all ~120 components)
```

Each story should include:
- Default state
- All variants
- All sizes
- Interactive states (hover, focus, disabled)
- Edge cases

## Parity Verification Checklist

Run this verification after completion:

```bash
# Extract exports from @papernote/ui
grep -E "^export" d:/repos/notebook-ui/src/components/index.ts > papernote-exports.txt

# Extract exports from @room-ui
grep -E "^export" d:/repos/@room-ui/src/components/index.ts > room-exports.txt

# Compare
diff papernote-exports.txt room-exports.txt
```

Every export in @papernote/ui MUST exist in @room-ui.

## Final Verification

- [ ] All 117+ components implemented
- [ ] All hooks implemented
- [ ] All utilities implemented
- [ ] All context providers implemented
- [ ] All types exported
- [ ] Storybook stories for every component
- [ ] `npm run build` succeeds
- [ ] `npm run type-check` passes
- [ ] Export parity verified
- [ ] README updated with full component list

## Completion Criteria

1. 100% export parity with @papernote/ui
2. All components have Storybook stories
3. All tests pass
4. Build succeeds
5. Type-check passes
6. Documentation complete

## Post-Completion

After completing this phase:
1. Create final summary: `docs/PARITY-COMPLETE.md`
2. Archive all phase documents
3. Tag release: `v1.0.0`
4. Update package.json version
5. Publish to npm (if applicable)
