import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ControlBarSection {
  /** Unique section ID */
  id: string;
  /** Section content */
  content: React.ReactNode;
  /** Section alignment */
  align?: 'left' | 'center' | 'right';
}

export interface ControlBarProps {
  /** Control bar sections */
  sections: ControlBarSection[];
  /** Additional class name */
  className?: string;
}

const ControlBar = forwardRef<HTMLDivElement, ControlBarProps>(function ControlBar(
  { sections, className },
  ref
) {
  const leftSections = sections.filter((s) => s.align === 'left' || !s.align);
  const centerSections = sections.filter((s) => s.align === 'center');
  const rightSections = sections.filter((s) => s.align === 'right');

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between gap-4 px-6 py-3',
        'bg-room-bg-elevated border-b border-room-border',
        className
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {leftSections.map((section) => (
          <div key={section.id}>{section.content}</div>
        ))}
      </div>

      {/* Center Section */}
      {centerSections.length > 0 && (
        <div className="flex items-center gap-4">
          {centerSections.map((section) => (
            <div key={section.id}>{section.content}</div>
          ))}
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {rightSections.map((section) => (
          <div key={section.id}>{section.content}</div>
        ))}
      </div>
    </div>
  );
});

export { ControlBar };
export default ControlBar;
