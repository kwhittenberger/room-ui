import { Moon, Sun } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
}

export function ThemeToggle({ theme, onToggle, className = '' }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'p-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all shadow-sm hover:shadow-md',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}

export default ThemeToggle;
