import React, { useState, useCallback, useRef, useEffect } from 'react';
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface NotificationBannerAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
}

export interface NotificationBannerProps {
  /** Banner variant determining color scheme */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Custom icon (defaults based on variant) */
  icon?: React.ReactNode;
  /** Primary message/title */
  title: string;
  /** Optional secondary description text */
  description?: string;
  /** Optional action button */
  action?: NotificationBannerAction;
  /** Callback when dismissed - if provided, shows dismiss button */
  onDismiss?: () => void;
  /** Can be swiped away on mobile */
  dismissible?: boolean;
  /** Stick to top of container on scroll */
  sticky?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * NotificationBanner - Dismissible banner for important alerts
 */
export function NotificationBanner({
  variant = 'info',
  icon,
  title,
  description,
  action,
  onDismiss,
  dismissible = true,
  sticky = false,
  className = '',
}: NotificationBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const startX = useRef(0);

  // Default icons based on variant
  const defaultIcons: Record<typeof variant, React.ReactNode> = {
    info: <Info className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
  };

  // Color classes (dark theme)
  const variantClasses: Record<typeof variant, string> = {
    info: 'bg-gradient-to-r from-cyan-900/50 to-cyan-800/50 border-cyan-700 text-cyan-100',
    success: 'bg-gradient-to-r from-emerald-900/50 to-emerald-800/50 border-emerald-700 text-emerald-100',
    warning: 'bg-gradient-to-r from-amber-900/50 to-amber-800/50 border-amber-700 text-amber-100',
    error: 'bg-gradient-to-r from-red-900/50 to-red-800/50 border-red-700 text-red-100',
  };

  const iconColorClasses: Record<typeof variant, string> = {
    info: 'text-cyan-400',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    error: 'text-red-400',
  };

  const buttonClasses: Record<typeof variant, string> = {
    info: 'bg-cyan-600 hover:bg-cyan-500 text-white',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    warning: 'bg-amber-600 hover:bg-amber-500 text-white',
    error: 'bg-red-600 hover:bg-red-500 text-white',
  };

  // Handle swipe dismiss
  const handleDragStart = useCallback((clientX: number) => {
    if (!dismissible) return;
    setIsDragging(true);
    startX.current = clientX;
  }, [dismissible]);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - startX.current;
    setOffsetX(delta);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(offsetX) > threshold) {
      // Animate out
      setOffsetX(offsetX > 0 ? window.innerWidth : -window.innerWidth);
      setIsDismissed(true);
      setTimeout(() => {
        onDismiss?.();
      }, 200);
    } else {
      // Snap back
      setOffsetX(0);
    }
  }, [isDragging, offsetX, onDismiss]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Mouse handlers for desktop testing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (dismissible) {
      handleDragStart(e.clientX);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX);
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  if (isDismissed) return null;

  return (
    <div
      ref={bannerRef}
      className={cn(
        'w-full border-b',
        variantClasses[variant],
        sticky && 'sticky top-0 z-40',
        !isDragging && 'transition-transform duration-200 ease-out',
        className
      )}
      style={{
        transform: `translateX(${offsetX}px)`,
        opacity: Math.max(0, 1 - Math.abs(offsetX) / 200),
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      role="alert"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Icon */}
        <div className={cn('flex-shrink-0', iconColorClasses[variant])}>
          {icon || defaultIcons[variant]}
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{title}</p>
          {description && (
            <p className="text-xs opacity-80 truncate">{description}</p>
          )}
        </div>

        {/* Action button */}
        {action && (
          <button
            onClick={action.onClick}
            className={cn(
              'flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-md',
              'transition-colors duration-200',
              buttonClasses[variant]
            )}
          >
            {action.label}
          </button>
        )}

        {/* Dismiss button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default NotificationBanner;
