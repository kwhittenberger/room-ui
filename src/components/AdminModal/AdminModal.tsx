import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { IconButton } from '../IconButton';

export interface AdminModalTab {
  /** Unique tab identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Tab content */
  content: React.ReactNode;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
}

export interface AdminModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Modal subtitle/description */
  subtitle?: string;
  /** Tabs to display */
  tabs: AdminModalTab[];
  /** Currently active tab ID */
  activeTab?: string;
  /** Callback when tab changes */
  onTabChange?: (tabId: string) => void;
  /** Footer content */
  footer?: React.ReactNode;
  /** Size of the modal */
  size?: 'md' | 'lg' | 'xl' | 'full';
  /** Custom class name */
  className?: string;
}

const sizeClasses: Record<string, string> = {
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-[95vw]',
};

export function AdminModal({
  isOpen,
  onClose,
  title,
  subtitle,
  tabs,
  activeTab: controlledActiveTab,
  onTabChange,
  footer,
  size = 'lg',
  className = '',
}: AdminModalProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '');

  const activeTabId = controlledActiveTab ?? internalActiveTab;
  const activeTabContent = tabs.find((tab) => tab.id === activeTabId)?.content;

  const handleTabChange = (tabId: string) => {
    if (!controlledActiveTab) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  };

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl',
          'flex flex-col max-h-[90vh]',
          'animate-in fade-in-0 zoom-in-95 duration-200',
          sizeClasses[size],
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-700">
          <div>
            <h2 id="admin-modal-title" className="text-xl font-semibold text-slate-100">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
            )}
          </div>
          <IconButton
            icon={X}
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close modal"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700 px-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => !tab.disabled && handleTabChange(tab.id)}
              disabled={tab.disabled}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap',
                'border-b-2 -mb-px transition-colors',
                activeTabId === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600',
                tab.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{activeTabContent}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminModal;
