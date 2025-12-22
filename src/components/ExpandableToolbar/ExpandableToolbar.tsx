import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../utils/cn';
import { IconButton } from '../IconButton';

export interface ToolbarSection {
  /** Unique section identifier */
  id: string;
  /** Section content */
  content: React.ReactNode;
  /** Whether this section can be collapsed */
  collapsible?: boolean;
  /** Section label (shown when collapsed) */
  label?: string;
}

export interface ExpandableToolbarProps {
  /** Toolbar sections */
  sections: ToolbarSection[];
  /** Whether the toolbar is expanded (controlled) */
  expanded?: boolean;
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Default expanded state (uncontrolled) */
  defaultExpanded?: boolean;
  /** Position of the expand button */
  expandButtonPosition?: 'left' | 'right';
  /** Custom class name */
  className?: string;
}

export function ExpandableToolbar({
  sections,
  expanded: controlledExpanded,
  onExpandedChange,
  defaultExpanded = true,
  expandButtonPosition = 'right',
  className = '',
}: ExpandableToolbarProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isControlled = controlledExpanded !== undefined;
  const isExpanded = isControlled ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    if (!isControlled) {
      setInternalExpanded(newExpanded);
    }
    onExpandedChange?.(newExpanded);
  };

  const collapsibleSections = sections.filter((s) => s.collapsible);
  const staticSections = sections.filter((s) => !s.collapsible);
  const hasCollapsibleSections = collapsibleSections.length > 0;

  return (
    <div
      className={cn(
        'bg-slate-800 border border-slate-700 rounded-lg',
        className
      )}
    >
      <div className="flex items-center gap-2 p-2">
        {/* Expand button (left) */}
        {hasCollapsibleSections && expandButtonPosition === 'left' && (
          <IconButton
            icon={isExpanded ? ChevronUp : ChevronDown}
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            aria-label={isExpanded ? 'Collapse toolbar' : 'Expand toolbar'}
            aria-expanded={isExpanded}
          />
        )}

        {/* Static sections (always visible) */}
        {staticSections.map((section) => (
          <div key={section.id} className="flex items-center">
            {section.content}
          </div>
        ))}

        {/* Collapsed labels */}
        {!isExpanded && collapsibleSections.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            {collapsibleSections
              .filter((s) => s.label)
              .map((section, index) => (
                <span key={section.id}>
                  {index > 0 && <span className="mx-1">·</span>}
                  {section.label}
                </span>
              ))}
          </div>
        )}

        {/* Expanded collapsible sections */}
        {isExpanded &&
          collapsibleSections.map((section) => (
            <div key={section.id} className="flex items-center">
              {section.content}
            </div>
          ))}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Expand button (right) */}
        {hasCollapsibleSections && expandButtonPosition === 'right' && (
          <IconButton
            icon={isExpanded ? ChevronUp : ChevronDown}
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            aria-label={isExpanded ? 'Collapse toolbar' : 'Expand toolbar'}
            aria-expanded={isExpanded}
          />
        )}
      </div>
    </div>
  );
}

export default ExpandableToolbar;
