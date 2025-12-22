import { forwardRef, useState, useCallback, useMemo } from 'react';
import { cn } from '../../utils/cn';

export type CellValue = string | number | boolean | Date | null;

export interface CellBase {
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export interface SpreadsheetCell extends CellBase {
  /** Cell value */
  value: CellValue;
  /** Formula (if any) */
  formula?: string;
  /** Whether cell is read-only */
  readOnly?: boolean;
}

export type Matrix<T> = T[][];

export interface SpreadsheetProps {
  /** Spreadsheet data */
  data: Matrix<SpreadsheetCell>;
  /** Change handler */
  onChange?: (data: Matrix<SpreadsheetCell>) => void;
  /** Number of columns (used when data is empty) */
  columns?: number;
  /** Number of rows (used when data is empty) */
  rows?: number;
  /** Read-only mode */
  readOnly?: boolean;
  /** Show formula bar */
  formulaBar?: boolean;
  /** Cell width */
  cellWidth?: number;
  /** Cell height */
  cellHeight?: number;
  /** Additional class name */
  className?: string;
}

function getColumnLetter(index: number): string {
  let letter = '';
  let n = index;
  while (n >= 0) {
    letter = String.fromCharCode((n % 26) + 65) + letter;
    n = Math.floor(n / 26) - 1;
  }
  return letter;
}

function getCellReference(row: number, col: number): string {
  return `${getColumnLetter(col)}${row + 1}`;
}

const Spreadsheet = forwardRef<HTMLDivElement, SpreadsheetProps>(
  function Spreadsheet(
    {
      data: controlledData,
      onChange,
      columns: defaultColumns = 8,
      rows: defaultRows = 10,
      readOnly = false,
      formulaBar = false,
      cellWidth = 100,
      cellHeight = 32,
      className,
    },
    ref
  ) {
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
    const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
    const [editValue, setEditValue] = useState('');

    // Initialize data with default size if empty
    const data = useMemo((): Matrix<SpreadsheetCell> => {
      if (controlledData.length > 0) return controlledData;
      return Array.from({ length: defaultRows }, () =>
        Array.from({ length: defaultColumns }, (): SpreadsheetCell => ({ value: '' }))
      );
    }, [controlledData, defaultRows, defaultColumns]);

    const numRows = data.length;
    const numCols = data[0]?.length || defaultColumns;

    const handleCellClick = useCallback((row: number, col: number) => {
      setSelectedCell({ row, col });
    }, []);

    const handleCellDoubleClick = useCallback(
      (row: number, col: number) => {
        if (readOnly) return;
        const cell = data[row]?.[col];
        if (cell?.readOnly) return;

        setEditingCell({ row, col });
        const value = cell?.formula || cell?.value;
        setEditValue(value !== null && value !== undefined ? String(value) : '');
      },
      [data, readOnly]
    );

    const handleEditComplete = useCallback(() => {
      if (!editingCell || !onChange) {
        setEditingCell(null);
        return;
      }

      const { row, col } = editingCell;
      const newData = data.map((r, ri) =>
        r.map((c, ci) => {
          if (ri === row && ci === col) {
            // Check if it's a formula
            if (editValue.startsWith('=')) {
              return { ...c, formula: editValue, value: editValue };
            }

            // Try to parse as number
            const numValue = parseFloat(editValue);
            const value = !isNaN(numValue) ? numValue : editValue;

            return { ...c, value, formula: undefined };
          }
          return c;
        })
      );

      onChange(newData);
      setEditingCell(null);
    }, [editingCell, editValue, data, onChange]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (editingCell) {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleEditComplete();
            // Move to next row
            if (selectedCell && selectedCell.row < numRows - 1) {
              setSelectedCell({ row: selectedCell.row + 1, col: selectedCell.col });
            }
          } else if (e.key === 'Escape') {
            setEditingCell(null);
          } else if (e.key === 'Tab') {
            e.preventDefault();
            handleEditComplete();
            // Move to next column
            if (selectedCell) {
              if (selectedCell.col < numCols - 1) {
                setSelectedCell({ row: selectedCell.row, col: selectedCell.col + 1 });
              } else if (selectedCell.row < numRows - 1) {
                setSelectedCell({ row: selectedCell.row + 1, col: 0 });
              }
            }
          }
          return;
        }

        if (!selectedCell) return;

        let newRow = selectedCell.row;
        let newCol = selectedCell.col;

        switch (e.key) {
          case 'ArrowUp':
            newRow = Math.max(0, selectedCell.row - 1);
            break;
          case 'ArrowDown':
            newRow = Math.min(numRows - 1, selectedCell.row + 1);
            break;
          case 'ArrowLeft':
            newCol = Math.max(0, selectedCell.col - 1);
            break;
          case 'ArrowRight':
            newCol = Math.min(numCols - 1, selectedCell.col + 1);
            break;
          case 'Enter':
          case 'F2':
            handleCellDoubleClick(selectedCell.row, selectedCell.col);
            return;
          case 'Delete':
          case 'Backspace':
            if (!readOnly && onChange) {
              const newData = data.map((r, ri) =>
                r.map((c, ci) =>
                  ri === selectedCell.row && ci === selectedCell.col && !c.readOnly
                    ? { ...c, value: '', formula: undefined }
                    : c
                )
              );
              onChange(newData);
            }
            return;
          default:
            // Start typing in cell
            if (
              !readOnly &&
              e.key.length === 1 &&
              !e.ctrlKey &&
              !e.metaKey &&
              !e.altKey
            ) {
              handleCellDoubleClick(selectedCell.row, selectedCell.col);
              setEditValue(e.key);
            }
            return;
        }

        e.preventDefault();
        setSelectedCell({ row: newRow, col: newCol });
      },
      [
        editingCell,
        selectedCell,
        numRows,
        numCols,
        data,
        readOnly,
        onChange,
        handleEditComplete,
        handleCellDoubleClick,
      ]
    );

    const selectedCellData = selectedCell ? data[selectedCell.row]?.[selectedCell.col] : null;
    const selectedCellRef = selectedCell ? getCellReference(selectedCell.row, selectedCell.col) : '';

    return (
      <div ref={ref} className={cn('flex flex-col', className)}>
        {/* Formula bar */}
        {formulaBar && (
          <div className="flex items-center gap-2 p-2 bg-room-bg-surface border border-room-border rounded-t-room">
            <span className="text-xs font-medium text-room-text-muted min-w-[40px]">
              {selectedCellRef}
            </span>
            <input
              type="text"
              value={
                editingCell
                  ? editValue
                  : selectedCellData?.formula || String(selectedCellData?.value ?? '')
              }
              onChange={(e) => {
                if (editingCell) {
                  setEditValue(e.target.value);
                } else if (selectedCell && !readOnly && !selectedCellData?.readOnly) {
                  setEditingCell(selectedCell);
                  setEditValue(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEditComplete();
                } else if (e.key === 'Escape') {
                  setEditingCell(null);
                }
              }}
              className={cn(
                'flex-1 h-7 px-2 text-sm bg-room-bg-base text-room-text-primary',
                'border border-room-border rounded-room-sm',
                'focus:outline-none focus:border-room-accent'
              )}
              placeholder={selectedCell ? 'Enter value or formula (=)' : 'Select a cell'}
            />
          </div>
        )}

        {/* Grid */}
        <div
          className={cn(
            'overflow-auto border border-room-border bg-room-bg-base',
            formulaBar ? 'rounded-b-room border-t-0' : 'rounded-room'
          )}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div
            className="relative"
            style={{
              width: 50 + numCols * cellWidth,
              minWidth: '100%',
            }}
          >
            {/* Header row */}
            <div
              className="flex sticky top-0 z-20 bg-room-bg-surface border-b border-room-border"
              style={{ height: cellHeight }}
            >
              {/* Corner */}
              <div
                className="flex-shrink-0 border-r border-room-border bg-room-bg-surface sticky left-0 z-10"
                style={{ width: 50 }}
              />
              {/* Column headers */}
              {Array.from({ length: numCols }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={cn(
                    'flex-shrink-0 flex items-center justify-center',
                    'text-xs font-medium text-room-text-muted border-r border-room-border',
                    'select-none'
                  )}
                  style={{ width: cellWidth }}
                >
                  {getColumnLetter(colIndex)}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {data.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex border-b border-room-border"
                style={{ height: cellHeight }}
              >
                {/* Row number */}
                <div
                  className={cn(
                    'flex-shrink-0 flex items-center justify-center',
                    'text-xs text-room-text-muted bg-room-bg-surface border-r border-room-border',
                    'sticky left-0 z-10 select-none'
                  )}
                  style={{ width: 50 }}
                >
                  {rowIndex + 1}
                </div>

                {/* Cells */}
                {row.map((cell, colIndex) => {
                  const isSelected =
                    selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                  const isEditing =
                    editingCell?.row === rowIndex && editingCell?.col === colIndex;

                  return (
                    <div
                      key={colIndex}
                      className={cn(
                        'flex-shrink-0 flex items-center px-2 border-r border-room-border',
                        'text-sm cursor-cell',
                        isSelected && 'ring-2 ring-room-accent ring-inset bg-room-accent/10',
                        !isSelected && 'hover:bg-room-bg-hover',
                        cell.className
                      )}
                      style={{
                        width: cellWidth,
                        ...cell.style,
                      }}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      onDoubleClick={() => handleCellDoubleClick(rowIndex, colIndex)}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleEditComplete}
                          autoFocus
                          className={cn(
                            'w-full h-full bg-transparent text-room-text-primary',
                            'border-none outline-none text-sm px-0'
                          )}
                        />
                      ) : (
                        <span className="truncate text-room-text-primary">
                          {cell.value !== null && cell.value !== undefined
                            ? String(cell.value)
                            : ''}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export { Spreadsheet };
export default Spreadsheet;
