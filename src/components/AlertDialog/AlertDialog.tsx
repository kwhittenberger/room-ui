import React, { useEffect, useCallback, useRef } from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';

export type AlertDialogVariant = 'info' | 'warning' | 'error' | 'success';

export interface AlertDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Callback when the dialog should close */
  onClose: () => void;
  /** Dialog title */
  title: string;
  /** Dialog description/message */
  description?: string;
  /** Dialog variant for styling */
  variant?: AlertDialogVariant;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Callback when confirm is clicked */
  onConfirm?: () => void;
  /** Callback when cancel is clicked */
  onCancel?: () => void;
  /** Whether the confirm button is in loading state */
  loading?: boolean;
  /** Whether the action is destructive */
  destructive?: boolean;
  /** Custom content to render */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

const variantIcons: Record<AlertDialogVariant, React.ElementType> = {
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
  success: CheckCircle,
};

const variantColors: Record<AlertDialogVariant, string> = {
  info: 'text-cyan-400 bg-cyan-500/10',
  warning: 'text-amber-400 bg-amber-500/10',
  error: 'text-red-400 bg-red-500/10',
  success: 'text-emerald-400 bg-emerald-500/10',
};

export function AlertDialog({
  isOpen,
  onClose,
  title,
  description,
  variant = 'info',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  destructive = false,
  children,
  className = '',
}: AlertDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) {
        onClose();
      }
    },
    [onClose, loading]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      // Focus the confirm button on open
      setTimeout(() => confirmRef.current?.focus(), 0);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  const handleConfirm = () => {
    onConfirm?.();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  if (!isOpen) return null;

  const Icon = variantIcons[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={loading ? undefined : onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className={cn(
          'relative bg-slate-900 border border-slate-700 rounded-xl shadow-xl',
          'w-full max-w-md',
          'animate-in fade-in-0 zoom-in-95 duration-200',
          className
        )}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-dialog-title"
        aria-describedby={description ? 'alert-dialog-description' : undefined}
      >
        <div className="p-6">
          {/* Icon and Title */}
          <div className="flex items-start gap-4">
            <div className={cn('flex-shrink-0 p-2 rounded-full', variantColors[variant])}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h2
                id="alert-dialog-title"
                className="text-lg font-semibold text-slate-100"
              >
                {title}
              </h2>
              {description && (
                <p
                  id="alert-dialog-description"
                  className="mt-2 text-sm text-slate-400"
                >
                  {description}
                </p>
              )}
              {children && <div className="mt-4">{children}</div>}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={handleCancel}
              disabled={loading}
            >
              {cancelText}
            </Button>
            <Button
              ref={confirmRef}
              variant={destructive ? 'danger' : 'primary'}
              onClick={handleConfirm}
              loading={loading}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertDialog;
