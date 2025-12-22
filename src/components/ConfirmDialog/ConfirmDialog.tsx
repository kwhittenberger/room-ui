import React, { forwardRef } from 'react';
import { AlertTriangle, Info, Trash2 } from 'lucide-react';
import { Modal, ModalFooter } from '../Modal';
import { Button } from '../Button';
import { cn } from '../../utils/cn';

export interface ConfirmDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Callback when the dialog should close */
  onClose: () => void;
  /** Callback when the confirm button is clicked */
  onConfirm: () => void | Promise<void>;
  /** Dialog title */
  title: string;
  /** Dialog message */
  message: string;
  /** Confirm button label */
  confirmLabel?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Dialog variant affects styling */
  variant?: 'danger' | 'warning' | 'info';
  /** Custom icon to display */
  icon?: React.ReactNode;
  /** Whether the dialog is in a loading state */
  isLoading?: boolean;
}

const variantStyles = {
  danger: {
    icon: Trash2,
    iconColor: 'text-room-error',
    iconBg: 'bg-room-error-muted/50',
    buttonVariant: 'danger' as const,
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-room-warning',
    iconBg: 'bg-room-warning-muted/50',
    buttonVariant: 'primary' as const, // Warning uses primary styling
  },
  info: {
    icon: Info,
    iconColor: 'text-room-info',
    iconBg: 'bg-room-info-muted/50',
    buttonVariant: 'primary' as const,
  },
};

export const ConfirmDialog = forwardRef<HTMLDivElement, ConfirmDialogProps>(
  (
    {
      isOpen,
      onClose,
      onConfirm,
      title,
      message,
      confirmLabel = 'Confirm',
      cancelLabel = 'Cancel',
      variant = 'danger',
      icon,
      isLoading = false,
    },
    ref
  ) => {
    const variantStyle = variantStyles[variant];
    const IconComponent = variantStyle.icon;

    const handleConfirm = async () => {
      await onConfirm();
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        size="sm"
        showCloseButton={false}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={cn(
              'flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full',
              variantStyle.iconBg
            )}
          >
            {icon ? (
              icon
            ) : (
              <IconComponent className={cn('h-6 w-6', variantStyle.iconColor)} />
            )}
          </div>

          {/* Message */}
          <div className="flex-1 pt-1">
            <p className="text-sm text-room-text-secondary leading-relaxed whitespace-pre-line">
              {message}
            </p>
          </div>
        </div>

        {/* Footer with buttons */}
        <ModalFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variantStyle.buttonVariant}
            onClick={handleConfirm}
            loading={isLoading}
          >
            {confirmLabel}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
);

ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;
