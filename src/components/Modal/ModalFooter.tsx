import React from 'react';
import { cn } from '../../utils/cn';

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3',
        'px-6 py-4 border-t border-room-border',
        'bg-room-bg-surface/50',
        '-mx-6 -mb-4 mt-4 rounded-b-room-lg',
        className
      )}
    >
      {children}
    </div>
  );
};

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
