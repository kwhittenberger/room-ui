import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps {
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Shape variant */
  variant?: 'text' | 'circular' | 'rectangular';
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
  /** Additional class name */
  className?: string;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  {
    width,
    height,
    variant = 'rectangular',
    animation = 'pulse',
    className,
  },
  ref
) {
  const variantClasses = {
    text: 'rounded-room-sm',
    circular: 'rounded-full',
    rectangular: 'rounded-room-sm',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: '',
  };

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  // Default heights for text variant
  if (variant === 'text' && !height) {
    style.height = '1em';
  }

  // Circular requires equal width/height
  if (variant === 'circular') {
    const size = width || height || 40;
    style.width = typeof size === 'number' ? `${size}px` : size;
    style.height = typeof size === 'number' ? `${size}px` : size;
  }

  return (
    <div
      ref={ref}
      className={cn(
        'bg-room-bg-surface',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
});

export { Skeleton };
export default Skeleton;
