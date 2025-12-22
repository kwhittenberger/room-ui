import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface DashboardProps {
  /** Dashboard content */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

const Dashboard = forwardRef<HTMLDivElement, DashboardProps>(function Dashboard(
  { children, className },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col min-h-full bg-room-bg-base',
        className
      )}
    >
      {children}
    </div>
  );
});

export { Dashboard };
export default Dashboard;
