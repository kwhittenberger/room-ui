import React, { forwardRef } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AlertAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export interface AlertProps {
  /** Alert variant */
  variant?: 'success' | 'error' | 'warning' | 'info';
  /** Optional title for the alert */
  title?: string;
  /** Alert content */
  children: React.ReactNode;
  /** Callback when close button is clicked. If provided, shows close button */
  onClose?: () => void;
  /** Additional className */
  className?: string;
  /** Action buttons to display at the bottom of the alert */
  actions?: AlertAction[];
}

const variantStyles = {
  success: {
    container: 'bg-room-success-muted/50 border-room-success/30 text-room-text-primary',
    icon: 'text-room-success',
    primaryButton: 'bg-room-success text-white hover:bg-emerald-600',
    secondaryButton: 'bg-room-bg-surface border border-room-success/30 text-room-success hover:bg-room-success-muted/30',
  },
  error: {
    container: 'bg-room-error-muted/50 border-room-error/30 text-room-text-primary',
    icon: 'text-room-error',
    primaryButton: 'bg-room-error text-white hover:bg-red-600',
    secondaryButton: 'bg-room-bg-surface border border-room-error/30 text-room-error hover:bg-room-error-muted/30',
  },
  warning: {
    container: 'bg-room-warning-muted/50 border-room-warning/30 text-room-text-primary',
    icon: 'text-room-warning',
    primaryButton: 'bg-room-warning text-black hover:bg-amber-600',
    secondaryButton: 'bg-room-bg-surface border border-room-warning/30 text-room-warning hover:bg-room-warning-muted/30',
  },
  info: {
    container: 'bg-room-info-muted/50 border-room-info/30 text-room-text-primary',
    icon: 'text-room-info',
    primaryButton: 'bg-room-info text-white hover:bg-blue-600',
    secondaryButton: 'bg-room-bg-surface border border-room-info/30 text-room-info hover:bg-room-info-muted/30',
  },
};

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      children,
      onClose,
      className,
      actions = [],
    },
    ref
  ) => {
    const styles = variantStyles[variant];
    const IconComponent = icons[variant];

    const getButtonStyles = (actionVariant: 'primary' | 'secondary' = 'primary') => {
      const base = 'px-3 py-1.5 rounded-room-sm text-sm font-medium transition-colors';
      return cn(
        base,
        actionVariant === 'primary' ? styles.primaryButton : styles.secondaryButton
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-room border p-4',
          styles.container,
          className
        )}
        role="alert"
      >
        <div className="flex items-start gap-3">
          <div className={cn('flex-shrink-0 mt-0.5', styles.icon)}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="text-sm font-medium mb-1">{title}</h4>
            )}
            <div className="text-sm text-room-text-secondary">{children}</div>

            {actions.length > 0 && (
              <div className="flex gap-2 mt-3">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={getButtonStyles(action.variant)}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 text-room-text-muted hover:text-room-text-primary transition-opacity"
              aria-label="Close alert"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
