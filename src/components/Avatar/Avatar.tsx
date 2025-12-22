import { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** User's name (used for initials fallback) */
  name?: string;
  /** Size of the avatar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Shape of the avatar */
  shape?: 'circle' | 'square';
  /** Custom fallback content */
  fallback?: React.ReactNode;
  /** Online status indicator */
  status?: 'online' | 'offline' | 'busy' | 'away';
  /** Click handler */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
}

const sizeConfig = {
  xs: {
    container: 'h-6 w-6',
    text: 'text-xs',
    status: 'h-2 w-2 border',
  },
  sm: {
    container: 'h-8 w-8',
    text: 'text-sm',
    status: 'h-2.5 w-2.5 border',
  },
  md: {
    container: 'h-10 w-10',
    text: 'text-base',
    status: 'h-3 w-3 border-2',
  },
  lg: {
    container: 'h-12 w-12',
    text: 'text-lg',
    status: 'h-3.5 w-3.5 border-2',
  },
  xl: {
    container: 'h-16 w-16',
    text: 'text-xl',
    status: 'h-4 w-4 border-2',
  },
};

const statusColors = {
  online: 'bg-room-success',
  offline: 'bg-room-text-muted',
  busy: 'bg-room-error',
  away: 'bg-room-warning',
};

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function getColorFromName(name: string): string {
  // Generate a consistent color based on the name
  const colors = [
    'bg-cyan-600',
    'bg-blue-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-rose-600',
    'bg-orange-600',
    'bg-amber-600',
    'bg-emerald-600',
    'bg-teal-600',
    'bg-indigo-600',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    src,
    alt,
    name,
    size = 'md',
    shape = 'circle',
    fallback,
    status,
    onClick,
    className,
  },
  ref
) {
  const [imageError, setImageError] = useState(false);
  const config = sizeConfig[size];

  const showImage = src && !imageError;
  const showFallback = !showImage;

  const renderFallback = () => {
    if (fallback) {
      return fallback;
    }

    if (name) {
      return (
        <span className={cn(config.text, 'font-medium text-white select-none')}>
          {getInitials(name)}
        </span>
      );
    }

    // Default user icon
    return (
      <svg
        className={cn('w-1/2 h-1/2', 'text-room-text-muted')}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    );
  };

  const Container = onClick ? 'button' : 'div';

  return (
    <Container
      ref={ref as React.Ref<HTMLDivElement & HTMLButtonElement>}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden',
        config.container,
        shape === 'circle' ? 'rounded-full' : 'rounded-room-sm',
        showFallback && (name ? getColorFromName(name) : 'bg-room-bg-surface'),
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent focus-visible:ring-offset-2 focus-visible:ring-offset-room-bg-base',
        className
      )}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {showImage && (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      )}

      {showFallback && renderFallback()}

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-room-bg-base',
            config.status,
            statusColors[status]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </Container>
  );
});

export { Avatar };
export default Avatar;
