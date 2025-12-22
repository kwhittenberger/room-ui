import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface BottomNavigationSpacerProps {
  /** Additional class name */
  className?: string;
}

/**
 * A spacer component that reserves space for the fixed bottom navigation.
 * Place this at the bottom of your content to prevent content from being hidden
 * behind the bottom navigation.
 */
const BottomNavigationSpacer = forwardRef<HTMLDivElement, BottomNavigationSpacerProps>(
  function BottomNavigationSpacer({ className }, ref) {
    return (
      <div
        ref={ref}
        className={cn('h-16 safe-area-pb', className)}
        aria-hidden="true"
      />
    );
  }
);

export { BottomNavigationSpacer };
export default BottomNavigationSpacer;
