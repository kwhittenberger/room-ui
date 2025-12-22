/**
 * Excel export utilities
 * Note: For full Excel support, consumers should install xlsx package
 */

export interface ExportToExcelOptions {
  filename?: string;
  sheetName?: string;
  includeHeaders?: boolean;
  dateFormat?: string;
}

export interface DataTableColumn {
  id: string;
  header: string;
  accessor?: string | ((row: unknown) => unknown);
}

export interface DataTableExportOptions extends ExportToExcelOptions {
  visibleColumnsOnly?: boolean;
  selectedRowsOnly?: boolean;
}

export interface SheetConfig {
  name: string;
  data: unknown[];
  columns?: DataTableColumn[];
}

export interface MultiSheetExcelOptions {
  filename?: string;
  sheets: SheetConfig[];
}

/**
 * Convert data to CSV string
 */
export function dataToCSV(
  data: unknown[],
  columns?: DataTableColumn[],
  options: { includeHeaders?: boolean } = {}
): string {
  const { includeHeaders = true } = options;

  if (data.length === 0) return '';

  // Determine columns from data if not provided
  const cols = columns || Object.keys(data[0] as object).map((key) => ({
    id: key,
    header: key,
    accessor: key,
  }));

  const rows: string[][] = [];

  // Add headers
  if (includeHeaders) {
    rows.push(cols.map((col) => col.header));
  }

  // Add data rows
  data.forEach((row) => {
    const rowData = cols.map((col) => {
      let value: unknown;
      
      if (typeof col.accessor === 'function') {
        value = col.accessor(row);
      } else if (col.accessor) {
        value = (row as Record<string, unknown>)[col.accessor];
      } else {
        value = (row as Record<string, unknown>)[col.id];
      }

      return formatCellValue(value);
    });
    rows.push(rowData);
  });

  // Convert to CSV string
  return rows
    .map((row) =>
      row
        .map((cell) => {
          // Escape quotes and wrap in quotes if contains comma or newline
          if (cell.includes(',') || cell.includes('\n') || cell.includes('"')) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        })
        .join(',')
    )
    .join('\n');
}

/**
 * Format a cell value for export
 */
function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/**
 * Export data to CSV file download
 */
export function exportToCSV(
  data: unknown[],
  columns?: DataTableColumn[],
  options: ExportToExcelOptions = {}
): void {
  const { filename = 'export' } = options;
  const csv = dataToCSV(data, columns, options);
  downloadFile(csv, `${filename}.csv`, 'text/csv;charset=utf-8;');
}

/**
 * Export data to Excel file (requires xlsx package)
 * Falls back to CSV if xlsx is not available
 */
export function exportToExcel(
  data: unknown[],
  options: ExportToExcelOptions = {}
): void {
  const { filename = 'export' } = options;

  // Try to use xlsx if available
  try {
    // Dynamic import would go here if xlsx is bundled
    // For now, fall back to CSV
    console.warn('xlsx package not bundled. Falling back to CSV export.');
    exportToCSV(data, undefined, { ...options, filename });
  } catch {
    // Fall back to CSV
    exportToCSV(data, undefined, { ...options, filename });
  }
}

/**
 * Export DataTable data to Excel/CSV
 */
export function exportDataTableToExcel(
  data: unknown[],
  columns: DataTableColumn[],
  options: DataTableExportOptions = {}
): void {
  const { filename = 'export', visibleColumnsOnly = true } = options;

  const exportColumns = visibleColumnsOnly
    ? columns.filter((col) => col.id !== 'actions' && col.id !== 'select')
    : columns;

  exportToCSV(data, exportColumns, { ...options, filename });
}

/**
 * Create a multi-sheet Excel file (requires xlsx package)
 * Falls back to multiple CSV files if xlsx is not available
 */
export function createMultiSheetExcel(options: MultiSheetExcelOptions): Blob {
  const { sheets } = options;

  // Without xlsx, we create a combined CSV
  const combinedData = sheets
    .map((sheet) => {
      const header = `\n=== ${sheet.name} ===\n`;
      const csv = dataToCSV(sheet.data, sheet.columns);
      return header + csv;
    })
    .join('\n\n');

  return new Blob([combinedData], { type: 'text/csv;charset=utf-8;' });
}

/**
 * Download a file
 */
function downloadFile(content: string | Blob, filename: string, mimeType: string): void {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Download a Blob as file
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}
