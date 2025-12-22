import { useState, useCallback, useRef, useEffect } from 'react';
import {
  saveColumnWidths,
  loadColumnWidths,
  saveColumnOrder,
  loadColumnOrder,
  reorderArray,
  type ColumnWidth,
} from '../utils/tableEnhancements';

export interface UseColumnResizeOptions {
  /** Table identifier for persistence */
  tableId?: string;
  /** Minimum column width */
  minWidth?: number;
  /** Maximum column width */
  maxWidth?: number;
  /** Initial column widths */
  initialWidths?: ColumnWidth[];
  /** Callback when widths change */
  onWidthsChange?: (widths: ColumnWidth[]) => void;
}

export interface ColumnResizeReturn {
  /** Current column widths */
  columnWidths: ColumnWidth[];
  /** Get width for a specific column */
  getColumnWidth: (columnId: string) => number | undefined;
  /** Start resizing a column */
  startResize: (columnId: string, startX: number) => void;
  /** Handle resize move */
  handleResizeMove: (currentX: number) => void;
  /** End resize */
  endResize: () => void;
  /** Whether currently resizing */
  isResizing: boolean;
  /** Reset to initial widths */
  resetWidths: () => void;
  /** Set width for a specific column */
  setColumnWidth: (columnId: string, width: number) => void;
}

/**
 * Hook for managing column resize functionality
 */
export function useColumnResize(options: UseColumnResizeOptions = {}): ColumnResizeReturn {
  const {
    tableId,
    minWidth = 50,
    maxWidth = 500,
    initialWidths = [],
    onWidthsChange,
  } = options;

  const [columnWidths, setColumnWidths] = useState<ColumnWidth[]>(() => {
    if (tableId) {
      const saved = loadColumnWidths(tableId);
      if (saved) return saved;
    }
    return initialWidths;
  });

  const [isResizing, setIsResizing] = useState(false);
  const resizeState = useRef<{
    columnId: string;
    startX: number;
    startWidth: number;
  } | null>(null);

  const getColumnWidth = useCallback(
    (columnId: string): number | undefined => {
      return columnWidths.find((w) => w.id === columnId)?.width;
    },
    [columnWidths]
  );

  const setColumnWidth = useCallback(
    (columnId: string, width: number) => {
      const clampedWidth = Math.min(Math.max(width, minWidth), maxWidth);
      
      setColumnWidths((prev) => {
        const existing = prev.find((w) => w.id === columnId);
        const newWidths = existing
          ? prev.map((w) => (w.id === columnId ? { ...w, width: clampedWidth } : w))
          : [...prev, { id: columnId, width: clampedWidth }];

        if (tableId) {
          saveColumnWidths(tableId, newWidths);
        }
        onWidthsChange?.(newWidths);
        return newWidths;
      });
    },
    [minWidth, maxWidth, tableId, onWidthsChange]
  );

  const startResize = useCallback(
    (columnId: string, startX: number) => {
      const currentWidth = getColumnWidth(columnId) || 100;
      resizeState.current = {
        columnId,
        startX,
        startWidth: currentWidth,
      };
      setIsResizing(true);
    },
    [getColumnWidth]
  );

  const handleResizeMove = useCallback(
    (currentX: number) => {
      if (!resizeState.current) return;

      const { columnId, startX, startWidth } = resizeState.current;
      const delta = currentX - startX;
      const newWidth = startWidth + delta;

      setColumnWidth(columnId, newWidth);
    },
    [setColumnWidth]
  );

  const endResize = useCallback(() => {
    resizeState.current = null;
    setIsResizing(false);
  }, []);

  const resetWidths = useCallback(() => {
    setColumnWidths(initialWidths);
    if (tableId) {
      saveColumnWidths(tableId, initialWidths);
    }
    onWidthsChange?.(initialWidths);
  }, [initialWidths, tableId, onWidthsChange]);

  return {
    columnWidths,
    getColumnWidth,
    startResize,
    handleResizeMove,
    endResize,
    isResizing,
    resetWidths,
    setColumnWidth,
  };
}

export interface UseColumnReorderOptions {
  /** Table identifier for persistence */
  tableId?: string;
  /** Initial column order (array of column IDs) */
  initialOrder?: string[];
  /** Callback when order changes */
  onOrderChange?: (order: string[]) => void;
}

export interface ColumnReorderReturn {
  /** Current column order */
  columnOrder: string[];
  /** Move a column from one position to another */
  moveColumn: (fromIndex: number, toIndex: number) => void;
  /** Reset to initial order */
  resetOrder: () => void;
  /** Start dragging a column */
  startDrag: (columnId: string) => void;
  /** End dragging */
  endDrag: () => void;
  /** Currently dragging column ID */
  draggingColumnId: string | null;
  /** Set column order directly */
  setColumnOrder: (order: string[]) => void;
}

/**
 * Hook for managing column reorder functionality
 */
export function useColumnReorder(options: UseColumnReorderOptions = {}): ColumnReorderReturn {
  const { tableId, initialOrder = [], onOrderChange } = options;

  const [columnOrder, setColumnOrderState] = useState<string[]>(() => {
    if (tableId) {
      const saved = loadColumnOrder(tableId);
      if (saved) return saved;
    }
    return initialOrder;
  });

  const [draggingColumnId, setDraggingColumnId] = useState<string | null>(null);

  const setColumnOrder = useCallback(
    (order: string[]) => {
      setColumnOrderState(order);
      if (tableId) {
        saveColumnOrder(tableId, order);
      }
      onOrderChange?.(order);
    },
    [tableId, onOrderChange]
  );

  const moveColumn = useCallback(
    (fromIndex: number, toIndex: number) => {
      const newOrder = reorderArray(columnOrder, fromIndex, toIndex);
      setColumnOrder(newOrder);
    },
    [columnOrder, setColumnOrder]
  );

  const resetOrder = useCallback(() => {
    setColumnOrder(initialOrder);
  }, [initialOrder, setColumnOrder]);

  const startDrag = useCallback((columnId: string) => {
    setDraggingColumnId(columnId);
  }, []);

  const endDrag = useCallback(() => {
    setDraggingColumnId(null);
  }, []);

  // Sync with initialOrder changes
  useEffect(() => {
    if (columnOrder.length === 0 && initialOrder.length > 0) {
      setColumnOrderState(initialOrder);
    }
  }, [initialOrder, columnOrder.length]);

  return {
    columnOrder,
    moveColumn,
    resetOrder,
    startDrag,
    endDrag,
    draggingColumnId,
    setColumnOrder,
  };
}
