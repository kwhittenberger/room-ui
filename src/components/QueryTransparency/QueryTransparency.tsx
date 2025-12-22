import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, Database, Clock } from 'lucide-react';
import { cn } from '../../utils/cn';
import { IconButton } from '../IconButton';

export interface QueryTransparencyInfo {
  /** SQL query string */
  sql?: string;
  /** Query parameters */
  params?: Record<string, unknown>;
  /** Query execution duration in milliseconds */
  duration?: number;
  /** Database name or identifier */
  database?: string;
  /** Timestamp when query was executed */
  timestamp?: Date;
}

export interface QueryTransparencyProps {
  /** Query information to display */
  query: QueryTransparencyInfo;
  /** Callback when query is copied */
  onCopy?: () => void;
  /** Whether to show the query expanded by default */
  defaultExpanded?: boolean;
  /** Custom title */
  title?: string;
  /** Custom class name */
  className?: string;
}

export function QueryTransparency({
  query,
  onCopy,
  defaultExpanded = false,
  title = 'Query Details',
  className = '',
}: QueryTransparencyProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!query.sql) return;

    try {
      await navigator.clipboard.writeText(query.sql);
      setIsCopied(true);
      onCopy?.();
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy query:', err);
    }
  };

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatParams = (params: Record<string, unknown>): string => {
    return JSON.stringify(params, null, 2);
  };

  return (
    <div
      className={cn(
        'bg-slate-800 border border-slate-700 rounded-lg overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-cyan-500" />
          <span className="text-sm font-medium text-slate-100">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {query.duration !== undefined && (
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="h-3 w-3" />
              <span>{formatDuration(query.duration)}</span>
            </div>
          )}
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-slate-700">
          {/* SQL Query */}
          {query.sql && (
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                  SQL Query
                </span>
                <IconButton
                  icon={isCopied ? Check : Copy}
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  aria-label="Copy query"
                  className={isCopied ? 'text-emerald-400' : ''}
                />
              </div>
              <pre className="bg-slate-900 rounded-md p-3 text-sm text-slate-300 overflow-x-auto font-mono">
                {query.sql}
              </pre>
            </div>
          )}

          {/* Parameters */}
          {query.params && Object.keys(query.params).length > 0 && (
            <div className="p-4 border-b border-slate-700">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wide block mb-2">
                Parameters
              </span>
              <pre className="bg-slate-900 rounded-md p-3 text-sm text-slate-300 overflow-x-auto font-mono">
                {formatParams(query.params)}
              </pre>
            </div>
          )}

          {/* Metadata */}
          <div className="px-4 py-3 flex items-center gap-4 text-xs text-slate-500">
            {query.database && (
              <span>
                Database: <span className="text-slate-400">{query.database}</span>
              </span>
            )}
            {query.timestamp && (
              <span>
                Executed:{' '}
                <span className="text-slate-400">
                  {query.timestamp.toLocaleString()}
                </span>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default QueryTransparency;
