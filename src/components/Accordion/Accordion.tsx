import { forwardRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Allow multiple items to be open simultaneously. Default: false */
  allowMultiple?: boolean;
  /** IDs of initially open items */
  defaultOpen?: string[];
  /** Controlled: IDs of currently open items */
  value?: string[];
  /** Callback when open items change */
  onChange?: (openItems: string[]) => void;
  /** Custom icon for collapsed state (default: ChevronDown) */
  expandIcon?: React.ReactNode;
  /** Custom icon for expanded state (default: rotated ChevronDown) */
  collapseIcon?: React.ReactNode;
  /** Show step numbers (1, 2, 3...) instead of icons */
  showStepNumbers?: boolean;
  /** Additional class name */
  className?: string;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    items,
    allowMultiple = false,
    defaultOpen = [],
    value,
    onChange,
    expandIcon,
    collapseIcon,
    showStepNumbers = false,
    className,
  },
  ref
) {
  const [internalOpenItems, setInternalOpenItems] = useState<Set<string>>(
    new Set(defaultOpen)
  );

  // Determine if controlled
  const isControlled = value !== undefined;
  const openItems = isControlled ? new Set(value) : internalOpenItems;

  const toggleItem = useCallback(
    (itemId: string) => {
      const newOpenItems = new Set(openItems);

      if (newOpenItems.has(itemId)) {
        newOpenItems.delete(itemId);
      } else {
        if (!allowMultiple) {
          newOpenItems.clear();
        }
        newOpenItems.add(itemId);
      }

      if (!isControlled) {
        setInternalOpenItems(newOpenItems);
      }
      onChange?.(Array.from(newOpenItems));
    },
    [openItems, allowMultiple, isControlled, onChange]
  );

  return (
    <div ref={ref} className={cn('space-y-2', className)}>
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id);
        const stepNumber = index + 1;

        return (
          <div
            key={item.id}
            className={cn(
              'bg-room-bg-surface border border-room-border rounded-room overflow-hidden transition-all duration-200',
              isOpen && 'ring-1 ring-room-accent/20'
            )}
          >
            {/* Header */}
            <button
              id={`accordion-header-${item.id}`}
              onClick={() => !item.disabled && toggleItem(item.id)}
              disabled={item.disabled}
              className={cn(
                'w-full flex items-center justify-between px-6 py-4 text-left transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent focus-visible:ring-inset',
                item.disabled
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-room-bg-hover cursor-pointer'
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <div className="flex items-center gap-3 flex-1">
                {/* Step Number or Icon */}
                {showStepNumbers ? (
                  <div
                    className={cn(
                      'flex items-center justify-center h-7 w-7 rounded-full text-sm font-semibold flex-shrink-0 transition-colors duration-200',
                      isOpen
                        ? 'bg-room-accent text-white'
                        : 'bg-room-bg-hover text-room-text-secondary'
                    )}
                  >
                    {stepNumber}
                  </div>
                ) : item.icon ? (
                  <span className="flex-shrink-0 text-room-text-secondary">
                    {item.icon}
                  </span>
                ) : null}
                <span className="text-sm font-medium text-room-text-primary">
                  {item.title}
                </span>
              </div>
              {/* Expand/Collapse Icon (hidden when showStepNumbers is true) */}
              {!showStepNumbers && (
                <>
                  {isOpen && collapseIcon ? (
                    <span className="h-5 w-5 text-room-text-muted">
                      {collapseIcon}
                    </span>
                  ) : isOpen && !collapseIcon ? (
                    <ChevronDown className="h-5 w-5 text-room-text-muted transition-transform duration-200 rotate-180" />
                  ) : !isOpen && expandIcon ? (
                    <span className="h-5 w-5 text-room-text-muted">
                      {expandIcon}
                    </span>
                  ) : (
                    <ChevronDown className="h-5 w-5 text-room-text-muted transition-transform duration-200" />
                  )}
                </>
              )}
            </button>

            {/* Content */}
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-header-${item.id}`}
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="px-6 py-4 border-t border-room-border bg-room-bg-base">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export { Accordion };
export default Accordion;
