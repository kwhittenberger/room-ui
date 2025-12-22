import React, { useEffect, useState, useCallback, forwardRef } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
  /** Optional action button (e.g., Undo) */
  action?: ToastAction;
  className?: string;
}

const toastStyles: Record<ToastType, { border: string; iconColor: string; icon: React.ReactNode }> = {
  success: {
    border: 'border-l-4 border-room-success',
    iconColor: 'text-room-success',
    icon: <CheckCircle className="h-5 w-5" />,
  },
  error: {
    border: 'border-l-4 border-room-error',
    iconColor: 'text-room-error',
    icon: <AlertCircle className="h-5 w-5" />,
  },
  warning: {
    border: 'border-l-4 border-room-warning',
    iconColor: 'text-room-warning',
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  info: {
    border: 'border-l-4 border-room-info',
    iconColor: 'text-room-info',
    icon: <Info className="h-5 w-5" />,
  },
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ id, type, title, message, duration = 5000, onClose, action, className }, ref) => {
    const [isExiting, setIsExiting] = useState(false);
    const styles = toastStyles[type];

    const handleClose = useCallback(() => {
      setIsExiting(true);
      setTimeout(() => {
        onClose(id);
      }, 300); // Match animation duration
    }, [id, onClose]);

    const handleAction = useCallback(() => {
      if (action) {
        action.onClick();
        handleClose();
      }
    }, [action, handleClose]);

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration, handleClose]);

    return (
      <div
        ref={ref}
        className={cn(
          'bg-room-bg-elevated rounded-room shadow-room',
          'p-4 min-w-[320px] max-w-md',
          'transition-all duration-300',
          styles.border,
          isExiting
            ? 'opacity-0 translate-x-full'
            : 'opacity-100 translate-x-0 animate-slide-in-right',
          className
        )}
      >
        <div className="flex items-start gap-3">
          <div className={cn('flex-shrink-0 mt-0.5', styles.iconColor)}>
            {styles.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-room-text-primary mb-1">{title}</h4>
            <p className="text-sm text-room-text-secondary">{message}</p>
            {action && (
              <button
                onClick={handleAction}
                className="mt-2 text-sm font-medium text-room-accent hover:text-room-accent-hover transition-colors"
              >
                {action.label}
              </button>
            )}
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-room-text-muted hover:text-room-text-primary transition-colors"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export default Toast;
