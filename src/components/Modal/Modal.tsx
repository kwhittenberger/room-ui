import React, { useEffect, useRef, useId, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Modal content */
  children: React.ReactNode;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Animation variant for modal entrance */
  animation?: 'scale' | 'slide-up' | 'slide-down' | 'fade' | 'none';
  /** Enable automatic scrolling for content that exceeds viewport height */
  scrollable?: boolean;
  /** Maximum height of the modal content area (e.g., '70vh', '500px') */
  maxHeight?: string;
  /** Additional className for the modal container */
  className?: string;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-7xl',
};

const animationClasses = {
  scale: 'animate-scale-in',
  'slide-up': 'animate-slide-up',
  'slide-down': 'animate-slide-down',
  fade: 'animate-fade-in',
  none: '',
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      size = 'md',
      showCloseButton = true,
      animation = 'scale',
      scrollable = false,
      maxHeight,
      className,
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const mouseDownOnBackdrop = useRef(false);
    const titleId = useId();

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, onClose]);

    // Track if mousedown originated on the backdrop
    const handleBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      mouseDownOnBackdrop.current = e.target === e.currentTarget;
    };

    // Handle click outside - only close if both mousedown and click happened on backdrop
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && mouseDownOnBackdrop.current) {
        onClose();
      }
      mouseDownOnBackdrop.current = false;
    };

    if (!isOpen) return null;

    const modalContent = (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-4',
          'bg-black/70 backdrop-blur-sm animate-fade-in'
        )}
        onMouseDown={handleBackdropMouseDown}
        onClick={handleBackdropClick}
      >
        <div
          ref={ref || modalRef}
          className={cn(
            sizeClasses[size],
            'w-full bg-room-bg-elevated rounded-room-lg shadow-room-lg',
            'border border-room-border',
            animationClasses[animation],
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-room-border">
            <h3
              id={titleId}
              className="text-lg font-medium text-room-text-primary"
            >
              {title}
            </h3>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-room-text-muted hover:text-room-text-primary transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Content */}
          <div
            className={cn(
              'px-6 py-4',
              (scrollable || maxHeight) && 'overflow-y-auto'
            )}
            style={{
              maxHeight:
                maxHeight || (scrollable ? 'calc(100vh - 200px)' : undefined),
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  }
);

Modal.displayName = 'Modal';

export default Modal;
