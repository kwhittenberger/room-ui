import { forwardRef, useState, useCallback } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface TreeNode {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Child nodes */
  children?: TreeNode[];
  /** Whether the node is disabled */
  disabled?: boolean;
  /** Custom data */
  data?: unknown;
}

export interface TreeViewProps {
  /** Tree data */
  data: TreeNode[];
  /** Default expanded node IDs (uncontrolled) */
  defaultExpandedIds?: string[];
  /** Controlled expanded node IDs */
  expandedIds?: string[];
  /** Callback when expanded state changes */
  onExpandedChange?: (ids: string[]) => void;
  /** Selected node ID (single select) */
  selectedId?: string;
  /** Callback when selection changes (single select) */
  onSelect?: (id: string) => void;
  /** Whether to allow multiple selection */
  multiSelect?: boolean;
  /** Selected node IDs (multi select) */
  selectedIds?: string[];
  /** Callback when selection changes (multi select) */
  onSelectedChange?: (ids: string[]) => void;
  /** Custom node renderer */
  renderNode?: (node: TreeNode) => React.ReactNode;
  /** Additional class name */
  className?: string;
}

interface TreeNodeComponentProps {
  node: TreeNode;
  depth: number;
  expandedIds: string[];
  toggleExpanded: (id: string) => void;
  selectedId?: string;
  onSelect?: (id: string) => void;
  multiSelect?: boolean;
  selectedIds?: string[];
  onSelectedChange?: (ids: string[]) => void;
  renderNode?: (node: TreeNode) => React.ReactNode;
}

function TreeNodeComponent({
  node,
  depth,
  expandedIds,
  toggleExpanded,
  selectedId,
  onSelect,
  multiSelect,
  selectedIds = [],
  onSelectedChange,
  renderNode,
}: TreeNodeComponentProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.includes(node.id);
  const isSelected = multiSelect
    ? selectedIds.includes(node.id)
    : selectedId === node.id;

  const handleClick = () => {
    if (node.disabled) return;

    if (multiSelect && onSelectedChange) {
      if (selectedIds.includes(node.id)) {
        onSelectedChange(selectedIds.filter((id) => id !== node.id));
      } else {
        onSelectedChange([...selectedIds, node.id]);
      }
    } else if (onSelect) {
      onSelect(node.id);
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      toggleExpanded(node.id);
    }
  };

  const getDefaultIcon = () => {
    if (hasChildren) {
      return isExpanded ? (
        <FolderOpen className="h-4 w-4 text-room-accent" />
      ) : (
        <Folder className="h-4 w-4 text-room-accent" />
      );
    }
    return <File className="h-4 w-4 text-room-text-muted" />;
  };

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-1 py-1 px-2 rounded-room-sm cursor-pointer transition-colors',
          'hover:bg-room-bg-hover',
          isSelected && 'bg-room-accent/10 text-room-accent',
          node.disabled && 'opacity-50 cursor-not-allowed',
          !isSelected && 'text-room-text-primary'
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleClick}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-disabled={node.disabled}
      >
        {/* Expand/collapse toggle */}
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            'flex-shrink-0 p-0.5 rounded transition-colors',
            hasChildren
              ? 'hover:bg-room-bg-surface text-room-text-muted'
              : 'invisible'
          )}
          tabIndex={-1}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {/* Icon */}
        <span className="flex-shrink-0">
          {node.icon || getDefaultIcon()}
        </span>

        {/* Label */}
        {renderNode ? (
          renderNode(node)
        ) : (
          <span className="text-sm truncate">{node.label}</span>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div role="group">
          {node.children!.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              toggleExpanded={toggleExpanded}
              selectedId={selectedId}
              onSelect={onSelect}
              multiSelect={multiSelect}
              selectedIds={selectedIds}
              onSelectedChange={onSelectedChange}
              renderNode={renderNode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(function TreeView(
  {
    data,
    defaultExpandedIds = [],
    expandedIds: controlledExpandedIds,
    onExpandedChange,
    selectedId,
    onSelect,
    multiSelect = false,
    selectedIds,
    onSelectedChange,
    renderNode,
    className,
  },
  ref
) {
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>(defaultExpandedIds);

  const isExpandedControlled = controlledExpandedIds !== undefined;
  const expandedIds = isExpandedControlled ? controlledExpandedIds : internalExpandedIds;

  const toggleExpanded = useCallback(
    (id: string) => {
      const newExpandedIds = expandedIds.includes(id)
        ? expandedIds.filter((eid) => eid !== id)
        : [...expandedIds, id];

      if (isExpandedControlled) {
        onExpandedChange?.(newExpandedIds);
      } else {
        setInternalExpandedIds(newExpandedIds);
        onExpandedChange?.(newExpandedIds);
      }
    },
    [expandedIds, isExpandedControlled, onExpandedChange]
  );

  return (
    <div
      ref={ref}
      className={cn('py-1', className)}
      role="tree"
      aria-multiselectable={multiSelect}
    >
      {data.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          depth={0}
          expandedIds={expandedIds}
          toggleExpanded={toggleExpanded}
          selectedId={selectedId}
          onSelect={onSelect}
          multiSelect={multiSelect}
          selectedIds={selectedIds}
          onSelectedChange={onSelectedChange}
          renderNode={renderNode}
        />
      ))}
    </div>
  );
});

export { TreeView };
export default TreeView;
