import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface TwoColumnContentProps {
  /** Left column content */
  left: React.ReactNode;
  /** Right column content */
  right: React.ReactNode;
  /** Column ratio */
  ratio?: '1:1' | '1:2' | '2:1' | '1:3' | '3:1';
  /** Gap size */
  gap?: 'sm' | 'md' | 'lg';
  /** Stack columns on mobile */
  stackOnMobile?: boolean;
  /** Reverse order on mobile */
  reverseOnMobile?: boolean;
  /** Additional class name */
  className?: string;
}

const ratioConfig = {
  '1:1': { left: 'lg:w-1/2', right: 'lg:w-1/2' },
  '1:2': { left: 'lg:w-1/3', right: 'lg:w-2/3' },
  '2:1': { left: 'lg:w-2/3', right: 'lg:w-1/3' },
  '1:3': { left: 'lg:w-1/4', right: 'lg:w-3/4' },
  '3:1': { left: 'lg:w-3/4', right: 'lg:w-1/4' },
};

const gapConfig = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

const TwoColumnContent = forwardRef<HTMLDivElement, TwoColumnContentProps>(
  function TwoColumnContent(
    {
      left,
      right,
      ratio = '1:1',
      gap = 'md',
      stackOnMobile = true,
      reverseOnMobile = false,
      className,
    },
    ref
  ) {
    const ratioClasses = ratioConfig[ratio];

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          stackOnMobile ? 'flex-col lg:flex-row' : 'flex-row',
          reverseOnMobile && stackOnMobile && 'flex-col-reverse lg:flex-row',
          gapConfig[gap],
          className
        )}
      >
        {/* Left Column */}
        <div className={cn('w-full', ratioClasses.left)}>
          {left}
        </div>

        {/* Right Column */}
        <div className={cn('w-full', ratioClasses.right)}>
          {right}
        </div>
      </div>
    );
  }
);

export { TwoColumnContent };
export default TwoColumnContent;
