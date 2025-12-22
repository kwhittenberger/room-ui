import { useState } from 'react';
import { X, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { IconButton } from '../IconButton';

export type NotificationBarVariant = 'info' | 'success' | 'warning' | 'error';
export type NotificationBarPosition = 'top' | 'bottom';

export interface NotificationBarAction {
  label: string;
  onClick: () => void;
}

export interface NotificationBarProps {
  /** Notification message */
  message: string;
  /** Notification variant */
  variant?: NotificationBarVariant;
  /** Position of the bar */
  position?: NotificationBarPosition;
  /** Whether the bar can be dismissed */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Action button */
  action?: NotificationBarAction;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Whether to show the default icon */
  showIcon?: boolean;
  /** Custom class name */
  className?: string;
}

const variantStyles: Record<NotificationBarVariant, { bg: string; border: string; text: string; icon: string }> = {
  info: {
    bg: 'bg-blue-900/50',
    border: 'border-blue-700',
    text: 'text-blue-100',
    icon: 'text-blue-400',
  },
  success: {
    bg: 'bg-emerald-900/50',
    border: 'border-emerald-700',
    text: 'text-emerald-100',
    icon: 'text-emerald-400',
  },
  warning: {
    bg: 'bg-amber-900/50',
    border: 'border-amber-700',
    text: 'text-amber-100',
    icon: 'text-amber-400',
  },
  error: {
    bg: 'bg-red-900/50',
    border: 'border-red-700',
    text: 'text-red-100',
    icon: 'text-red-400',
  },
};

const variantIcons: Record<NotificationBarVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

export function NotificationBar({
  message,
  variant = 'info',
  position = 'top',
  dismissible = true,
  onDismiss,
  action,
  icon,
  showIcon = true,
  className = '',
}: NotificationBarProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const styles = variantStyles[variant];
  const Icon = variantIcons[variant];

  return (
    <div
      className={cn(
        'w-full px-4 py-3 border-b flex items-center gap-3',
        styles.bg,
        styles.border,
        position === 'bottom' && 'border-t border-b-0',
        className
      )}
      role="alert"
    >
      {/* Icon */}
      {showIcon && (
        <div className={cn('flex-shrink-0', styles.icon)}>
          {icon || <Icon className="h-5 w-5" />}
        </div>
      )}

      {/* Message */}
      <p className={cn('flex-1 text-sm font-medium', styles.text)}>{message}</p>

      {/* Action */}
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={cn(
            'flex-shrink-0 text-sm font-medium underline hover:no-underline',
            styles.text
          )}
        >
          {action.label}
        </button>
      )}

      {/* Dismiss */}
      {dismissible && (
        <IconButton
          icon={X}
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className={cn('flex-shrink-0', styles.icon)}
        />
      )}
    </div>
  );
}

export default NotificationBar;
