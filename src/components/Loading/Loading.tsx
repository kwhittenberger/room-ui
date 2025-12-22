import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Spinner } from '../Spinner';

export interface LoadingProps {
  /** Size of the loading spinner */
  size?: 'sm' | 'md' | 'lg';
  /** Optional label text */
  label?: string;
  /** Whether to show full screen overlay */
  fullScreen?: boolean;
  /** Whether to show a semi-transparent overlay */
  overlay?: boolean;
  /** Additional class name */
  className?: string;
}

const sizeConfig = {
  sm: {
    spinner: 'sm' as const,
    label: 'text-xs',
    gap: 'gap-2',
  },
  md: {
    spinner: 'md' as const,
    label: 'text-sm',
    gap: 'gap-3',
  },
  lg: {
    spinner: 'lg' as const,
    label: 'text-base',
    gap: 'gap-4',
  },
};

const Loading = forwardRef<HTMLDivElement, LoadingProps>(function Loading(
  {
    size = 'md',
    label,
    fullScreen = false,
    overlay = false,
    className,
  },
  ref
) {
  const config = sizeConfig[size];

  const content = (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center',
        config.gap,
        className
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner size={config.spinner} />
      {label && (
        <span className={cn(config.label, 'text-room-text-secondary')}>
          {label}
        </span>
      )}
      <span className="sr-only">{label || 'Loading...'}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          overlay ? 'bg-room-bg-base/80 backdrop-blur-sm' : 'bg-room-bg-base'
        )}
      >
        {content}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-room-bg-base/60 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
});

export { Loading };
export default Loading;
