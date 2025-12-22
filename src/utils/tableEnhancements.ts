/**
 * Table enhancement utilities for column resizing, reordering, and persistence
 */

export interface ColumnWidth {
  id: string;
  width: number;
}

export interface ColumnOrder {
  id: string;
  order: number;
}

export interface TableState {
  columnWidths: ColumnWidth[];
  columnOrder: string[];
  hiddenColumns: string[];
}

/**
 * Calculate optimal column width based on content
 */
export function calculateColumnWidth(
  content: string[],
  options: {
    minWidth?: number;
    maxWidth?: number;
    padding?: number;
    charWidth?: number;
  } = {}
): number {
  const {
    minWidth = 80,
    maxWidth = 400,
    padding = 32,
    charWidth = 8,
  } = options;

  if (content.length === 0) return minWidth;

  const maxContentLength = Math.max(...content.map((c) => c.length));
  const calculatedWidth = maxContentLength * charWidth + padding;

  return Math.min(Math.max(calculatedWidth, minWidth), maxWidth);
}

/**
 * Reorder an array by moving an item from one index to another
 */
export function reorderArray<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...array];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

/**
 * Save column widths to localStorage
 */
export function saveColumnWidths(tableId: string, widths: ColumnWidth[]): void {
  try {
    const key = `room-ui-table-widths-${tableId}`;
    localStorage.setItem(key, JSON.stringify(widths));
  } catch (error) {
    console.warn('Failed to save column widths:', error);
  }
}

/**
 * Load column widths from localStorage
 */
export function loadColumnWidths(tableId: string): ColumnWidth[] | null {
  try {
    const key = `room-ui-table-widths-${tableId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to load column widths:', error);
    return null;
  }
}

/**
 * Save column order to localStorage
 */
export function saveColumnOrder(tableId: string, order: string[]): void {
  try {
    const key = `room-ui-table-order-${tableId}`;
    localStorage.setItem(key, JSON.stringify(order));
  } catch (error) {
    console.warn('Failed to save column order:', error);
  }
}

/**
 * Load column order from localStorage
 */
export function loadColumnOrder(tableId: string): string[] | null {
  try {
    const key = `room-ui-table-order-${tableId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to load column order:', error);
    return null;
  }
}

/**
 * Save hidden columns to localStorage
 */
export function saveHiddenColumns(tableId: string, hiddenColumns: string[]): void {
  try {
    const key = `room-ui-table-hidden-${tableId}`;
    localStorage.setItem(key, JSON.stringify(hiddenColumns));
  } catch (error) {
    console.warn('Failed to save hidden columns:', error);
  }
}

/**
 * Load hidden columns from localStorage
 */
export function loadHiddenColumns(tableId: string): string[] | null {
  try {
    const key = `room-ui-table-hidden-${tableId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to load hidden columns:', error);
    return null;
  }
}

/**
 * Save complete table state
 */
export function saveTableState(tableId: string, state: TableState): void {
  saveColumnWidths(tableId, state.columnWidths);
  saveColumnOrder(tableId, state.columnOrder);
  saveHiddenColumns(tableId, state.hiddenColumns);
}

/**
 * Load complete table state
 */
export function loadTableState(tableId: string): Partial<TableState> {
  return {
    columnWidths: loadColumnWidths(tableId) || undefined,
    columnOrder: loadColumnOrder(tableId) || undefined,
    hiddenColumns: loadHiddenColumns(tableId) || undefined,
  };
}

/**
 * Clear all table state from localStorage
 */
export function clearTableState(tableId: string): void {
  try {
    localStorage.removeItem(`room-ui-table-widths-${tableId}`);
    localStorage.removeItem(`room-ui-table-order-${tableId}`);
    localStorage.removeItem(`room-ui-table-hidden-${tableId}`);
  } catch (error) {
    console.warn('Failed to clear table state:', error);
  }
}

/**
 * Apply saved column widths to columns
 */
export function applyColumnWidths<T extends { id: string; width?: number }>(
  columns: T[],
  savedWidths: ColumnWidth[] | null
): T[] {
  if (!savedWidths) return columns;

  const widthMap = new Map(savedWidths.map((w) => [w.id, w.width]));

  return columns.map((col) => ({
    ...col,
    width: widthMap.get(col.id) ?? col.width,
  }));
}

/**
 * Apply saved column order to columns
 */
export function applyColumnOrder<T extends { id: string }>(
  columns: T[],
  savedOrder: string[] | null
): T[] {
  if (!savedOrder) return columns;

  const orderMap = new Map(savedOrder.map((id, index) => [id, index]));

  return [...columns].sort((a, b) => {
    const orderA = orderMap.get(a.id) ?? Infinity;
    const orderB = orderMap.get(b.id) ?? Infinity;
    return orderA - orderB;
  });
}
