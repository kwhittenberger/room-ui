import { forwardRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface MobileHeaderProps {
  /** Header title */
  title?: string;
  /** Header subtitle */
  subtitle?: string;
  /** Left action button (replaces back button if provided) */
  leftAction?: React.ReactNode;
  /** Right action buttons */
  rightActions?: React.ReactNode[];
  /** Back button click handler */
  onBack?: () => void;
  /** Show back button */
  showBack?: boolean;
  /** Transparent background */
  transparent?: boolean;
  /** Sticky positioning */
  sticky?: boolean;
  /** Additional class name */
  className?: string;
}

const MobileHeader = forwardRef<HTMLDivElement, MobileHeaderProps>(
  function MobileHeader(
    {
      title,
      subtitle,
      leftAction,
      rightActions,
      onBack,
      showBack = false,
      transparent = false,
      sticky = true,
      className,
    },
    ref
  ) {
    const showBackButton = showBack || onBack;

    return (
      <header
        ref={ref}
        className={cn(
          'flex items-center h-14 px-2 safe-area-pt',
          !transparent && 'bg-room-bg-elevated border-b border-room-border',
          sticky && 'sticky top-0 z-40',
          className
        )}
      >
        {/* Left Section */}
        <div className="flex items-center min-w-[48px]">
          {leftAction || (showBackButton && (
            <button
              type="button"
              onClick={onBack}
              className={cn(
                'p-3 -ml-1 rounded-room-sm',
                'text-room-text-muted hover:text-room-text-primary hover:bg-room-bg-hover',
                'transition-colors'
              )}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ))}
        </div>

        {/* Title Section */}
        <div className="flex-1 min-w-0 text-center">
          {title && (
            <h1 className={cn(
              'text-base font-semibold text-room-text-primary truncate',
              subtitle && 'leading-tight'
            )}>
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xs text-room-text-muted truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center min-w-[48px] justify-end">
          {rightActions?.map((action, index) => (
            <span key={index}>{action}</span>
          ))}
        </div>
      </header>
    );
  }
);

export { MobileHeader };
export default MobileHeader;
