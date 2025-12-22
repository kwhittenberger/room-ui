import { forwardRef, useState } from 'react';
import { Download, FileSpreadsheet, FileText, FileJson, File } from 'lucide-react';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { Spinner } from '../Spinner';

export type ExportFormat = 'csv' | 'excel' | 'pdf' | 'json';

export interface ExportButtonProps {
  /** Export handler */
  onExport: (format: ExportFormat) => void | Promise<void>;
  /** Available export formats */
  formats?: ExportFormat[];
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Button label */
  label?: string;
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Additional class name */
  className?: string;
}

const formatConfig: Record<ExportFormat, { label: string; icon: React.ReactNode }> = {
  csv: {
    label: 'Export as CSV',
    icon: <FileText className="h-4 w-4" />,
  },
  excel: {
    label: 'Export as Excel',
    icon: <FileSpreadsheet className="h-4 w-4" />,
  },
  pdf: {
    label: 'Export as PDF',
    icon: <File className="h-4 w-4" />,
  },
  json: {
    label: 'Export as JSON',
    icon: <FileJson className="h-4 w-4" />,
  },
};

const ExportButton = forwardRef<HTMLButtonElement, ExportButtonProps>(
  function ExportButton(
    {
      onExport,
      formats = ['csv', 'excel'],
      loading = false,
      disabled = false,
      label = 'Export',
      size = 'md',
      variant = 'secondary',
      className,
    },
    ref
  ) {
    const [isExporting, setIsExporting] = useState(false);
    const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null);

    const handleExport = async (format: ExportFormat) => {
      setIsExporting(true);
      setExportingFormat(format);
      try {
        await onExport(format);
      } finally {
        setIsExporting(false);
        setExportingFormat(null);
      }
    };

    const isDisabled = disabled || loading || isExporting;

    // Single format - just a button
    if (formats.length === 1) {
      const format = formats[0];

      return (
        <Button
          ref={ref}
          variant={variant}
          size={size}
          disabled={isDisabled}
          onClick={() => handleExport(format)}
          icon={isExporting ? undefined : Download}
          className={className}
        >
          {isExporting ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Exporting...
            </>
          ) : (
            label
          )}
        </Button>
      );
    }

    // Multiple formats - dropdown
    return (
      <Dropdown
        trigger={
          <Button
            ref={ref}
            variant={variant}
            size={size}
            disabled={isDisabled}
            icon={isExporting ? undefined : Download}
            className={className}
          >
            {isExporting ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Exporting...
              </>
            ) : (
              label
            )}
          </Button>
        }
        items={formats.map((format) => {
          const config = formatConfig[format];
          const isCurrentlyExporting = exportingFormat === format;

          return {
            id: format,
            label: isCurrentlyExporting ? 'Exporting...' : config.label,
            icon: isCurrentlyExporting ? (
              <Spinner size="sm" />
            ) : (
              config.icon
            ),
            onClick: () => handleExport(format),
            disabled: isExporting,
          };
        })}
        placement="bottom-end"
      />
    );
  }
);

export { ExportButton };
export default ExportButton;
