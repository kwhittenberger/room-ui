import React, { useState, forwardRef } from 'react';
import { MoreVertical, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  assignee?: string;
  priority?: 'low' | 'medium' | 'high';
  metadata?: Record<string, unknown>;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;
  limit?: number;
}

export interface KanbanBoardProps {
  /** Columns to display */
  columns: KanbanColumn[];
  /** Callback when columns change */
  onChange: (columns: KanbanColumn[]) => void;
  /** Callback when card is clicked */
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  /** Callback when add button is clicked */
  onAddCard?: (columnId: string) => void;
  /** Callback when column menu is clicked */
  onColumnMenu?: (columnId: string) => void;
  /** Custom card renderer */
  renderCard?: (card: KanbanCard, columnId: string) => React.ReactNode;
  /** Show add card button */
  showAddButton?: boolean;
  /** Custom class name */
  className?: string;
}

const KanbanBoard = forwardRef<HTMLDivElement, KanbanBoardProps>(
  (
    {
      columns,
      onChange,
      onCardClick,
      onAddCard,
      onColumnMenu,
      renderCard,
      showAddButton = true,
      className = '',
    },
    ref
  ) => {
    const [draggedCard, setDraggedCard] = useState<{
      card: KanbanCard;
      columnId: string;
    } | null>(null);
    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

    // Handle drag start
    const handleDragStart = (card: KanbanCard, columnId: string) => {
      setDraggedCard({ card, columnId });
    };

    // Handle drag over
    const handleDragOver = (e: React.DragEvent, columnId: string) => {
      e.preventDefault();
      setDragOverColumn(columnId);
    };

    // Handle drag leave
    const handleDragLeave = () => {
      setDragOverColumn(null);
    };

    // Handle drop
    const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
      e.preventDefault();
      setDragOverColumn(null);

      if (!draggedCard) return;

      const { card, columnId: sourceColumnId } = draggedCard;

      // Don't do anything if dropped in same column
      if (sourceColumnId === targetColumnId) {
        setDraggedCard(null);
        return;
      }

      // Create new columns array with updated cards
      const newColumns = columns.map((col) => {
        if (col.id === sourceColumnId) {
          // Remove card from source column
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== card.id),
          };
        } else if (col.id === targetColumnId) {
          // Add card to target column
          return {
            ...col,
            cards: [...col.cards, card],
          };
        }
        return col;
      });

      onChange(newColumns);
      setDraggedCard(null);
    };

    // Priority badge colors
    const priorityColors = {
      low: 'bg-emerald-900/50 text-emerald-300',
      medium: 'bg-amber-900/50 text-amber-300',
      high: 'bg-red-900/50 text-red-300',
    };

    // Default card renderer
    const defaultRenderCard = (card: KanbanCard) => (
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold text-slate-100 flex-1">{card.title}</h4>
          {card.priority && (
            <span
              className={cn(
                'px-2 py-0.5 text-xs font-medium rounded',
                priorityColors[card.priority]
              )}
            >
              {card.priority}
            </span>
          )}
        </div>
        {card.description && (
          <p className="text-xs text-slate-400 line-clamp-2">{card.description}</p>
        )}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {card.tags.map((tag, index) => (
              <span key={index} className="px-2 py-0.5 text-xs bg-slate-700 text-slate-300 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
        {card.assignee && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
            <div className="h-6 w-6 rounded-full bg-cyan-900/50 text-cyan-300 flex items-center justify-center text-xs font-semibold">
              {card.assignee.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-slate-400">{card.assignee}</span>
          </div>
        )}
      </div>
    );

    return (
      <div ref={ref} className={cn('flex gap-4 overflow-x-auto pb-4', className)}>
        {columns.map((column) => {
          const isOverLimit = column.limit && column.cards.length >= column.limit;
          const isDragOver = dragOverColumn === column.id;

          return (
            <div
              key={column.id}
              className="flex-shrink-0 w-80 bg-slate-800 rounded-lg"
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className="p-4 border-b border-slate-700">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {column.color && (
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: column.color }}
                      />
                    )}
                    <h3 className="text-sm font-semibold text-slate-100">{column.title}</h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {column.cards.length}
                      {column.limit && ` / ${column.limit}`}
                    </span>
                  </div>
                  {onColumnMenu && (
                    <button
                      onClick={() => onColumnMenu(column.id)}
                      className="p-1 hover:bg-slate-700 rounded transition-colors"
                      aria-label="Column menu"
                    >
                      <MoreVertical className="h-4 w-4 text-slate-400" />
                    </button>
                  )}
                </div>
                {isOverLimit && (
                  <p className="text-xs text-amber-400 mt-1">Card limit reached</p>
                )}
              </div>

              {/* Cards Container */}
              <div
                className={cn(
                  'p-3 space-y-3 min-h-[200px] max-h-[600px] overflow-y-auto',
                  'transition-colors',
                  isDragOver && 'bg-cyan-900/20'
                )}
              >
                {column.cards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={() => handleDragStart(card, column.id)}
                    onClick={() => onCardClick?.(card, column.id)}
                    className={cn(
                      'p-3 bg-slate-700 rounded-lg border border-slate-600 shadow-sm',
                      'cursor-move hover:shadow-md hover:border-slate-500 transition-all',
                      draggedCard?.card.id === card.id && 'opacity-50'
                    )}
                  >
                    {renderCard ? renderCard(card, column.id) : defaultRenderCard(card)}
                  </div>
                ))}

                {/* Empty state */}
                {column.cards.length === 0 && (
                  <div className="flex items-center justify-center h-32 text-sm text-slate-500">
                    No cards
                  </div>
                )}
              </div>

              {/* Add Card Button */}
              {showAddButton && onAddCard && (
                <div className="p-3 border-t border-slate-700">
                  <button
                    onClick={() => onAddCard(column.id)}
                    disabled={!!isOverLimit}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 px-3 py-2',
                      'text-sm font-medium text-slate-400',
                      'bg-slate-800 border-2 border-dashed border-slate-600 rounded-lg',
                      'hover:bg-slate-700 hover:border-cyan-500 hover:text-cyan-400',
                      'disabled:opacity-40 disabled:cursor-not-allowed',
                      'transition-all'
                    )}
                  >
                    <Plus className="h-4 w-4" />
                    Add card
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

KanbanBoard.displayName = 'KanbanBoard';

export default KanbanBoard;
