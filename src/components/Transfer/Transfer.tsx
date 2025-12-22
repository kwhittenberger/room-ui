import React, { useState, useMemo, forwardRef } from 'react';
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, Search } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface TransferItem {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface TransferProps {
  /** Available items in source list */
  sourceItems: TransferItem[];
  /** Items in target list */
  targetItems: TransferItem[];
  /** Callback when items are transferred */
  onChange: (sourceItems: TransferItem[], targetItems: TransferItem[]) => void;
  /** Labels for source and target lists */
  titles?: {
    source: string;
    target: string;
  };
  /** Show search/filter inputs */
  showSearch?: boolean;
  /** Custom search filter function */
  filterFunction?: (item: TransferItem, searchTerm: string) => boolean;
  /** Height of lists */
  height?: string;
  /** Show item counts in headers */
  showCounts?: boolean;
  /** Render custom item content */
  renderItem?: (item: TransferItem) => React.ReactNode;
  /** Custom class name */
  className?: string;
}

const Transfer = forwardRef<HTMLDivElement, TransferProps>(
  (
    {
      sourceItems,
      targetItems,
      onChange,
      titles = { source: 'Available', target: 'Selected' },
      showSearch = true,
      filterFunction,
      height = '400px',
      showCounts = true,
      renderItem,
      className = '',
    },
    ref
  ) => {
    const [sourceSelected, setSourceSelected] = useState<string[]>([]);
    const [targetSelected, setTargetSelected] = useState<string[]>([]);
    const [sourceSearch, setSourceSearch] = useState('');
    const [targetSearch, setTargetSearch] = useState('');

    // Default filter function
    const defaultFilter = (item: TransferItem, searchTerm: string) => {
      const term = searchTerm.toLowerCase();
      return (
        item.label.toLowerCase().includes(term) ||
        (item.description?.toLowerCase().includes(term) ?? false)
      );
    };

    const filter = filterFunction || defaultFilter;

    // Filtered lists
    const filteredSource = useMemo(() => {
      if (!sourceSearch) return sourceItems;
      return sourceItems.filter((item) => filter(item, sourceSearch));
    }, [sourceItems, sourceSearch, filter]);

    const filteredTarget = useMemo(() => {
      if (!targetSearch) return targetItems;
      return targetItems.filter((item) => filter(item, targetSearch));
    }, [targetItems, targetSearch, filter]);

    // Handle selection toggle
    const toggleSourceSelection = (id: string) => {
      setSourceSelected((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };

    const toggleTargetSelection = (id: string) => {
      setTargetSelected((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };

    // Handle select all
    const selectAllSource = () => {
      const selectableIds = filteredSource.filter((item) => !item.disabled).map((item) => item.id);
      setSourceSelected(selectableIds);
    };

    const selectAllTarget = () => {
      const selectableIds = filteredTarget.filter((item) => !item.disabled).map((item) => item.id);
      setTargetSelected(selectableIds);
    };

    // Handle transfers
    const moveToTarget = () => {
      const itemsToMove = sourceItems.filter((item) => sourceSelected.includes(item.id));
      const newSource = sourceItems.filter((item) => !sourceSelected.includes(item.id));
      const newTarget = [...targetItems, ...itemsToMove];

      onChange(newSource, newTarget);
      setSourceSelected([]);
    };

    const moveToSource = () => {
      const itemsToMove = targetItems.filter((item) => targetSelected.includes(item.id));
      const newTarget = targetItems.filter((item) => !targetSelected.includes(item.id));
      const newSource = [...sourceItems, ...itemsToMove];

      onChange(newSource, newTarget);
      setTargetSelected([]);
    };

    const moveAllToTarget = () => {
      const selectableItems = sourceItems.filter((item) => !item.disabled);
      const disabledItems = sourceItems.filter((item) => item.disabled);
      const newTarget = [...targetItems, ...selectableItems];

      onChange(disabledItems, newTarget);
      setSourceSelected([]);
    };

    const moveAllToSource = () => {
      const selectableItems = targetItems.filter((item) => !item.disabled);
      const disabledItems = targetItems.filter((item) => item.disabled);
      const newSource = [...sourceItems, ...selectableItems];

      onChange(newSource, disabledItems);
      setTargetSelected([]);
    };

    // Render list panel
    const renderList = (
      items: TransferItem[],
      selected: string[],
      onToggle: (id: string) => void,
      onSelectAll: () => void,
      search: string,
      onSearchChange: (value: string) => void,
      title: string
    ) => {
      const selectedCount = selected.length;
      const totalCount = items.length;

      return (
        <div className="flex-1 bg-slate-800 rounded-lg border border-slate-700 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-100">
                {title}
                {showCounts && (
                  <span className="ml-2 text-slate-400 font-normal">
                    ({selectedCount}/{totalCount})
                  </span>
                )}
              </h3>
              {totalCount > 0 && (
                <button
                  onClick={onSelectAll}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Select all
                </button>
              )}
            </div>

            {/* Search */}
            {showSearch && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-900 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-2" style={{ height }}>
            {items.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-slate-500">
                No items
              </div>
            ) : (
              <div className="space-y-1">
                {items.map((item) => {
                  const isSelected = selected.includes(item.id);
                  const isDisabled = item.disabled;

                  return (
                    <button
                      key={item.id}
                      onClick={() => !isDisabled && onToggle(item.id)}
                      disabled={isDisabled}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-lg transition-colors',
                        isSelected
                          ? 'bg-cyan-900/30 border-2 border-cyan-500'
                          : 'border-2 border-transparent hover:bg-slate-700',
                        isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                      )}
                    >
                      {renderItem ? (
                        renderItem(item)
                      ) : (
                        <div>
                          <div className="text-sm font-medium text-slate-100">{item.label}</div>
                          {item.description && (
                            <div className="text-xs text-slate-400 mt-0.5">{item.description}</div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      );
    };

    return (
      <div ref={ref} className={cn('flex items-center gap-4', className)}>
        {/* Source List */}
        {renderList(
          filteredSource,
          sourceSelected,
          toggleSourceSelection,
          selectAllSource,
          sourceSearch,
          setSourceSearch,
          titles.source
        )}

        {/* Transfer Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={moveAllToTarget}
            disabled={sourceItems.filter((item) => !item.disabled).length === 0}
            className="p-2 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Move all to target"
          >
            <ChevronsRight className="h-4 w-4 text-slate-400" />
          </button>
          <button
            onClick={moveToTarget}
            disabled={sourceSelected.length === 0}
            className="p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Move selected to target"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={moveToSource}
            disabled={targetSelected.length === 0}
            className="p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Move selected to source"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={moveAllToSource}
            disabled={targetItems.filter((item) => !item.disabled).length === 0}
            className="p-2 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Move all to source"
          >
            <ChevronsLeft className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Target List */}
        {renderList(
          filteredTarget,
          targetSelected,
          toggleTargetSelection,
          selectAllTarget,
          targetSearch,
          setTargetSearch,
          titles.target
        )}
      </div>
    );
  }
);

Transfer.displayName = 'Transfer';

export default Transfer;
