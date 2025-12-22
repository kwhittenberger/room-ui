import React from 'react';
import { Toast, ToastProps, ToastPosition } from './Toast';
import { cn } from '../../utils/cn';

export interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
  position?: ToastPosition;
  className?: string;
}

const positionStyles: Record<ToastPosition, string> = {
  'top-right': 'top-20 right-6',
  'top-left': 'top-20 left-6',
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'top-center': 'top-20 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
};

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
  position = 'top-right',
  className,
}) => {
  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col gap-3 pointer-events-none',
        positionStyles[position],
        className
      )}
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  );
};

ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;
