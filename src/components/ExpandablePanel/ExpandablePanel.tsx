import { useState, useEffect, ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ExpandablePanelProps {
  /** Content shown in the collapsed header bar */
  collapsedContent: ReactNode;
  /** Full content shown when expanded */
  children: ReactNode;
  /** Position of the panel */
  position?: 'bottom' | 'top';
  /** Positioning mode */
  mode?: 'viewport' | 'container';
  /** Whether the panel is expanded (controlled) */
  expanded?: boolean;
  /** Default expanded state (uncontrolled) */
  defaultExpanded?: boolean;
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Height when expanded */
  expandedHeight?: string | number;
  /** Maximum width of the panel */
  maxWidth?: string | number;
  /** Whether to show the expand/collapse toggle button */
  showToggle?: boolean;
  /** Custom toggle button content */
  toggleContent?: ReactNode;
  /** Additional actions to show in the header (right side) */
  headerActions?: ReactNode;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  /** Visual variant */
  variant?: 'default' | 'elevated' | 'bordered';
  /** Size variant affecting header height */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for the header */
  headerClassName?: string;
  /** Additional CSS classes for the content */
  contentClassName?: string;
  /** Z-index for the panel (only applies in viewport mode) */
  zIndex?: number;
}

const sizeClasses = {
  sm: {
    header: 'h-10 px-3',
    text: 'text-sm',
    icon: 'h-4 w-4',
  },
  md: {
    header: 'h-12 px-4',
    text: 'text-sm',
    icon: 'h-5 w-5',
  },
  lg: {
    header: 'h-14 px-5',
    text: 'text-base',
    icon: 'h-5 w-5',
  },
};

const variantClasses = {
  default: {
    container: 'bg-slate-800 border-slate-700',
    header: 'bg-slate-900',
  },
  elevated: {
    container: 'bg-slate-800 shadow-lg border-slate-700',
    header: 'bg-slate-800',
  },
  bordered: {
    container: 'bg-slate-800 border-2 border-slate-600',
    header: 'bg-slate-900',
  },
};

export function ExpandablePanel({
  collapsedContent,
  children,
  position = 'bottom',
  mode = 'viewport',
  expanded: controlledExpanded,
  defaultExpanded = false,
  onExpandedChange,
  expandedHeight = '300px',
  maxWidth,
  showToggle = true,
  toggleContent,
  headerActions,
  closeOnEscape = true,
  variant = 'elevated',
  size = 'md',
  className = '',
  headerClassName = '',
  contentClassName = '',
  zIndex = 40,
}: ExpandablePanelProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const setExpanded = (value: boolean) => {
    if (!isControlled) {
      setInternalExpanded(value);
    }
    onExpandedChange?.(value);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (!closeOnEscape || !expanded) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpanded(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, expanded]);

  const sizeStyle = sizeClasses[size];
  const variantStyle = variantClasses[variant];

  const heightValue = typeof expandedHeight === 'number' ? `${expandedHeight}px` : expandedHeight;
  const maxWidthValue = maxWidth 
    ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth)
    : undefined;

  const getPositionClasses = () => {
    if (mode === 'viewport') {
      return position === 'bottom' 
        ? 'fixed bottom-0 left-0 right-0' 
        : 'fixed top-0 left-0 right-0';
    } else {
      return position === 'bottom'
        ? 'absolute bottom-0 left-0 right-0'
        : 'absolute top-0 left-0 right-0';
    }
  };

  const ChevronIcon = position === 'bottom'
    ? (expanded ? ChevronDown : ChevronUp)
    : (expanded ? ChevronUp : ChevronDown);

  const header = (
    <div
      className={cn(
        'flex items-center justify-between',
        sizeStyle.header,
        variantStyle.header,
        'border-slate-700',
        'flex-shrink-0',
        headerClassName
      )}
    >
      <div className={cn('flex-1 flex items-center', sizeStyle.text)}>
        {collapsedContent}
      </div>

      <div className="flex items-center gap-2">
        {headerActions}
        
        {showToggle && (
          <button
            type="button"
            onClick={toggleExpanded}
            className={cn(
              'flex items-center justify-center',
              'p-1.5 rounded-md',
              'text-slate-400 hover:text-slate-200',
              'hover:bg-slate-700',
              'transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1 focus:ring-offset-slate-800'
            )}
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse panel' : 'Expand panel'}
          >
            {toggleContent || <ChevronIcon className={sizeStyle.icon} />}
          </button>
        )}
      </div>
    </div>
  );

  const content = (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        maxHeight: expanded ? heightValue : '0px',
        opacity: expanded ? 1 : 0,
      }}
    >
      <div 
        className={cn('overflow-y-auto p-4', contentClassName)}
        style={{ maxHeight: heightValue }}
      >
        {children}
      </div>
    </div>
  );

  const containerStyle: React.CSSProperties = {
    ...(mode === 'viewport' ? { zIndex } : {}),
    ...(maxWidthValue ? { 
      maxWidth: maxWidthValue, 
      marginLeft: 'auto', 
      marginRight: 'auto' 
    } : {}),
  };

  return (
    <div
      className={cn(
        getPositionClasses(),
        variantStyle.container,
        'border-t rounded-t-lg',
        'transition-all duration-300 ease-in-out',
        'flex flex-col',
        className
      )}
      style={containerStyle}
    >
      {position === 'bottom' ? (
        <>
          {content}
          {header}
        </>
      ) : (
        <>
          {header}
          {content}
        </>
      )}
    </div>
  );
}

export function ExpandablePanelSpacer({ 
  size = 'md' 
}: { 
  size?: 'sm' | 'md' | 'lg' 
}) {
  const heights = {
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-14',
  };

  return <div className={heights[size]} />;
}

export function ExpandablePanelContainer({ 
  children,
  className = '',
}: { 
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative h-full overflow-hidden', className)}>
      {children}
    </div>
  );
}

export default ExpandablePanel;
