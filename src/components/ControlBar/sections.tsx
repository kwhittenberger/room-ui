import { Button } from '../Button';
import { Select } from '../Select';
import type { ControlBarSection } from './ControlBar';

// Page Controls Section
export interface PageControlsSectionProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

export function createPageControlsSection(
  props: PageControlsSectionProps
): ControlBarSection {
  const { currentPage, totalPages, onPageChange, pageSize, onPageSizeChange, pageSizeOptions } = props;

  return {
    id: 'page-controls',
    align: 'right',
    content: (
      <div className="flex items-center gap-2">
        {pageSize !== undefined && onPageSizeChange && pageSizeOptions && (
          <Select
            value={String(pageSize)}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            options={pageSizeOptions.map((size) => ({
              value: String(size),
              label: `${size} per page`,
            }))}
            size="sm"
          />
        )}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </Button>
          <span className="text-sm text-room-text-muted px-2">
            {currentPage} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    ),
  };
}

// Filters Section
export interface FiltersSectionProps {
  children: React.ReactNode;
}

export function createFiltersSection(
  props: FiltersSectionProps
): ControlBarSection {
  return {
    id: 'filters',
    align: 'left',
    content: <div className="flex items-center gap-2">{props.children}</div>,
  };
}

// Actions Section
export interface ActionsSectionProps {
  children: React.ReactNode;
}

export function createActionsSection(
  props: ActionsSectionProps
): ControlBarSection {
  return {
    id: 'actions',
    align: 'right',
    content: <div className="flex items-center gap-2">{props.children}</div>,
  };
}

// Query Details Section
export interface QueryDetailsSectionProps {
  totalItems?: number;
  selectedCount?: number;
  queryTime?: number;
}

export function createQueryDetailsSection(
  props: QueryDetailsSectionProps
): ControlBarSection {
  const { totalItems, selectedCount, queryTime } = props;

  const parts: string[] = [];
  if (totalItems !== undefined) {
    parts.push(`${totalItems} item${totalItems !== 1 ? 's' : ''}`);
  }
  if (selectedCount !== undefined && selectedCount > 0) {
    parts.push(`${selectedCount} selected`);
  }
  if (queryTime !== undefined) {
    parts.push(`${queryTime}ms`);
  }

  return {
    id: 'query-details',
    align: 'left',
    content: (
      <span className="text-sm text-room-text-muted">
        {parts.join(' | ')}
      </span>
    ),
  };
}
