import { forwardRef, useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '../../utils/cn';
import { statusManager, type StatusMessage, type StatusType } from './statusManager';

export interface StatusBarProps {
  /** Position on screen */
  position?: 'top' | 'bottom';
  /** Maximum number of visible messages */
  maxMessages?: number;
  /** Additional class name */
  className?: string;
}

const typeConfig: Record<StatusType, { icon: React.ElementType; className: string }> = {
  success: {
    icon: CheckCircle,
    className: 'bg-room-success/10 border-room-success/30 text-room-success',
  },
  error: {
    icon: AlertCircle,
    className: 'bg-room-error/10 border-room-error/30 text-room-error',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-room-warning/10 border-room-warning/30 text-room-warning',
  },
  info: {
    icon: Info,
    className: 'bg-room-info/10 border-room-info/30 text-room-info',
  },
};

const StatusBar = forwardRef<HTMLDivElement, StatusBarProps>(function StatusBar(
  { position = 'bottom', maxMessages = 5, className },
  ref
) {
  const [messages, setMessages] = useState<StatusMessage[]>([]);

  useEffect(() => {
    const unsubscribe = statusManager.subscribe(setMessages);
    return unsubscribe;
  }, []);

  const visibleMessages = messages.slice(-maxMessages);

  if (visibleMessages.length === 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        'fixed left-0 right-0 z-50 flex flex-col gap-2 px-4 py-2',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
    >
      {visibleMessages.map((message) => {
        const config = typeConfig[message.type];
        const Icon = config.icon;

        return (
          <div
            key={message.id}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-room border',
              'shadow-lg backdrop-blur-sm',
              'animate-in fade-in slide-in-from-bottom-2 duration-200',
              config.className
            )}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span className="flex-1 text-sm">{message.message}</span>
            <button
              type="button"
              onClick={() => statusManager.removeMessage(message.id)}
              className="flex-shrink-0 p-1 rounded-room-sm hover:bg-black/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
});

export { StatusBar };
export default StatusBar;
