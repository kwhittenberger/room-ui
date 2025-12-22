/**
 * Statistics formatting utilities
 */

export type StatisticFormat =
  | 'number'
  | 'currency'
  | 'percent'
  | 'decimal'
  | 'compact'
  | 'bytes'
  | 'duration';

export interface StatisticConfig {
  value: number;
  format: StatisticFormat;
  label?: string;
  precision?: number;
  currency?: string;
  locale?: string;
}

export interface FormattedStatistic {
  value: string;
  label?: string;
  rawValue: number;
}

/**
 * Format a numeric value according to the specified format
 */
export function formatStatisticValue(
  value: number,
  format: StatisticFormat,
  options: {
    precision?: number;
    currency?: string;
    locale?: string;
  } = {}
): string {
  const { precision = 2, currency = 'USD', locale = 'en-US' } = options;

  switch (format) {
    case 'number':
      return new Intl.NumberFormat(locale, {
        maximumFractionDigits: precision,
      }).format(value);

    case 'currency':
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: precision,
      }).format(value);

    case 'percent':
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        maximumFractionDigits: precision,
      }).format(value / 100);

    case 'decimal':
      return value.toFixed(precision);

    case 'compact':
      return new Intl.NumberFormat(locale, {
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(value);

    case 'bytes':
      return formatBytes(value);

    case 'duration':
      return formatDuration(value);

    default:
      return String(value);
  }
}

/**
 * Format multiple statistics at once
 */
export function formatStatistics(stats: StatisticConfig[]): FormattedStatistic[] {
  return stats.map((stat) => ({
    value: formatStatisticValue(stat.value, stat.format, {
      precision: stat.precision,
      currency: stat.currency,
      locale: stat.locale,
    }),
    label: stat.label,
    rawValue: stat.value,
  }));
}

/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format duration in milliseconds to human-readable string
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
}

/**
 * Format a number with thousands separators
 */
export function formatWithCommas(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Format a percentage change with sign
 */
export function formatChange(value: number, precision = 1): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(precision)}%`;
}

/**
 * Abbreviate large numbers (e.g., 1.2K, 3.4M)
 */
export function abbreviateNumber(value: number): string {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;
  let num = value;

  while (Math.abs(num) >= 1000 && suffixIndex < suffixes.length - 1) {
    num /= 1000;
    suffixIndex++;
  }

  return num.toFixed(1).replace(/\.0$/, '') + suffixes[suffixIndex];
}
