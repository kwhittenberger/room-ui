import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface MobileHeaderSpacerProps {
  /** Additional class name */
  className?: string;
}

/**
 * A spacer component that reserves space for the fixed mobile header.
 * Use this when the header is sticky/fixed and you need to prevent content
 * from being hidden behind it.
 */
const MobileHeaderSpacer = forwardRef<HTMLDivElement, MobileHeaderSpacerProps>(
  function MobileHeaderSpacer({ className }, ref) {
    return (
      <div
        ref={ref}
        className={cn('h-14 safe-area-pt', className)}
        aria-hidden="true"
      />
    );
  }
);

export { MobileHeaderSpacer };
export default MobileHeaderSpacer;
