import { Bell } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface NotificationIndicatorProps {
  count?: number;
  onClick?: () => void;
  className?: string;
  maxCount?: number;
  variant?: 'default' | 'primary' | 'danger';
}

export function NotificationIndicator({
  count = 0,
  onClick,
  className = '',
  maxCount = 99,
  variant = 'default',
}: NotificationIndicatorProps) {
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  const showBadge = count > 0;

  const variantClasses = {
    default: 'bg-slate-600',
    primary: 'bg-cyan-600',
    danger: 'bg-red-600',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative bg-slate-800 p-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-900',
        'transition-all shadow-sm',
        className
      )}
      aria-label="View notifications"
    >
      <Bell className="h-5 w-5" />
      {showBadge && (
        <span
          className={cn(
            'absolute -top-1 -right-1 text-white text-xs font-semibold rounded-full h-5 min-w-5 px-1 flex items-center justify-center',
            variantClasses[variant]
          )}
        >
          {displayCount}
        </span>
      )}
    </button>
  );
}

export default NotificationIndicator;
