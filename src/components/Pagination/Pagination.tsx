import { forwardRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface PaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Show page number buttons. Default: true */
  showPageNumbers?: boolean;
  /** Maximum page numbers to show before adding ellipsis. Default: 5 */
  maxPageNumbers?: number;
  /** Show page jump input field. Default: false */
  showPageJump?: boolean;
  /** Show first/last page buttons. Default: false */
  showFirstLast?: boolean;
  /** Size variant. Default: 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    currentPage,
    totalPages,
    onPageChange,
    showPageNumbers = true,
    maxPageNumbers = 5,
    showPageJump = false,
    showFirstLast = false,
    size = 'md',
    disabled = false,
    className,
  },
  ref
) {
  const [jumpValue, setJumpValue] = useState('');

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const halfMax = Math.floor(maxPageNumbers / 2);

    let startPage = Math.max(1, currentPage - halfMax);
    let endPage = Math.min(totalPages, currentPage + halfMax);

    // Adjust if we're near the start or end
    if (currentPage <= halfMax) {
      endPage = Math.min(maxPageNumbers, totalPages);
    }
    if (currentPage > totalPages - halfMax) {
      startPage = Math.max(1, totalPages - maxPageNumbers + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = showPageNumbers ? getPageNumbers() : [];

  const handlePageJump = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpValue, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setJumpValue('');
    }
  };

  const sizeClasses = {
    sm: {
      button: 'px-2 py-1 text-xs',
      pageButton: 'px-2 py-1 text-xs min-w-[28px]',
      icon: 'h-3.5 w-3.5',
      input: 'w-12 px-1.5 py-1 text-xs',
    },
    md: {
      button: 'px-3 py-2 text-sm',
      pageButton: 'px-3 py-2 text-sm min-w-[36px]',
      icon: 'h-4 w-4',
      input: 'w-14 px-2 py-1.5 text-sm',
    },
    lg: {
      button: 'px-4 py-2.5 text-base',
      pageButton: 'px-4 py-2.5 text-base min-w-[44px]',
      icon: 'h-5 w-5',
      input: 'w-16 px-2 py-2 text-base',
    },
  };

  const baseButtonClasses = cn(
    'inline-flex items-center justify-center gap-2 font-medium rounded-room-sm transition-all',
    'text-room-text-secondary bg-room-bg-surface border border-room-border',
    'hover:bg-room-bg-hover hover:text-room-text-primary hover:border-room-border',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent focus-visible:ring-offset-1 focus-visible:ring-offset-room-bg-base',
    'disabled:opacity-40 disabled:cursor-not-allowed'
  );

  const activeButtonClasses = cn(
    'bg-room-accent text-white border-room-accent',
    'hover:bg-room-accent-hover hover:border-room-accent-hover'
  );

  return (
    <nav
      ref={ref}
      className={cn('flex items-center justify-center gap-2', className)}
      aria-label="Pagination"
    >
      {/* First Page Button */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={disabled || currentPage === 1}
          className={cn(baseButtonClasses, sizeClasses[size].button)}
          aria-label="First page"
        >
          <ChevronsLeft className={sizeClasses[size].icon} />
        </button>
      )}

      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
        className={cn(baseButtonClasses, sizeClasses[size].button)}
        aria-label="Previous page"
      >
        <ChevronLeft className={sizeClasses[size].icon} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      {showPageNumbers && (
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className={cn('px-2 text-room-text-muted', sizeClasses[size].pageButton)}
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                disabled={disabled}
                className={cn(
                  baseButtonClasses,
                  sizeClasses[size].pageButton,
                  isActive && activeButtonClasses
                )}
                aria-label={`Page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
        className={cn(baseButtonClasses, sizeClasses[size].button)}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className={sizeClasses[size].icon} />
      </button>

      {/* Last Page Button */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={disabled || currentPage === totalPages}
          className={cn(baseButtonClasses, sizeClasses[size].button)}
          aria-label="Last page"
        >
          <ChevronsRight className={sizeClasses[size].icon} />
        </button>
      )}

      {/* Page Jump */}
      {showPageJump && (
        <form onSubmit={handlePageJump} className="flex items-center gap-2 ml-2">
          <span className="text-sm text-room-text-secondary hidden sm:inline">Go to:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            placeholder="#"
            disabled={disabled}
            className={cn(
              'text-center bg-room-bg-surface border border-room-border rounded-room-sm',
              'text-room-text-primary placeholder:text-room-text-muted',
              'focus:outline-none focus:ring-2 focus:ring-room-accent focus:border-room-accent',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              sizeClasses[size].input
            )}
            aria-label="Jump to page"
          />
          <button
            type="submit"
            disabled={disabled || !jumpValue}
            className={cn(
              'font-medium rounded-room-sm transition-all',
              'bg-room-accent text-white',
              'hover:bg-room-accent-hover',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-room-accent focus-visible:ring-offset-1 focus-visible:ring-offset-room-bg-base',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              sizeClasses[size].button
            )}
          >
            Go
          </button>
        </form>
      )}
    </nav>
  );
});

export { Pagination };
export default Pagination;
