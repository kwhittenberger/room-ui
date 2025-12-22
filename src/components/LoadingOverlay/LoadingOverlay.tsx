import { cn } from '../../utils/cn';

export interface LoadingOverlayProps {
  /** Whether to show the overlay */
  show: boolean;
  /** Message to display */
  message?: string;
  /** Position of the overlay */
  position?: 'top-right' | 'top-left' | 'center';
  /** Additional CSS classes */
  className?: string;
}

/**
 * LoadingOverlay - Subtle loading overlay that doesn't interfere with existing content
 *
 * @example
 * ```tsx
 * <div className="relative">
 *   <DataTable data={data} />
 *   <LoadingOverlay show={isLoading} message="Loading data..." />
 * </div>
 * ```
 */
export function LoadingOverlay({
  show,
  message = 'Loading...',
  position = 'top-right',
  className = ''
}: LoadingOverlayProps) {
  if (!show) return null;

  const positionClasses = {
    'top-right': 'top-2 right-2',
    'top-left': 'top-2 left-2',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <div className={cn('absolute z-10', positionClasses[position], className)}>
      <div className="flex items-center gap-2 text-slate-300 bg-slate-800/90 px-3 py-2 rounded-md shadow-sm border border-slate-700">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-500"></div>
        <span className="text-xs font-medium">{message}</span>
      </div>
    </div>
  );
}

export default LoadingOverlay;
