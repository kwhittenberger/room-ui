import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onSearch?: (value: string) => void;
  disabled?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  onSearch,
  disabled = false,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={cn('flex-1 max-w-2xl relative', className)}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-500" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          'block w-full pl-11 pr-4 py-3 border border-slate-700 rounded-lg leading-5',
          'bg-slate-800 placeholder-slate-500 text-slate-100',
          'focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500',
          'hover:border-slate-600 transition-all sm:text-sm',
          'disabled:bg-slate-900 disabled:cursor-not-allowed'
        )}
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBar;
