/**
 * Room UI Color Palette
 *
 * Dark slate/cyan theme designed for Deal Room applications.
 * Based on Tailwind slate/cyan color scales.
 */

export const colors = {
  // Background layers (darkest to lightest)
  background: {
    base: '#0f172a',      // slate-900 - main app background
    elevated: '#1e293b',  // slate-800 - cards, panels
    surface: '#334155',   // slate-700 - inputs, raised elements
    hover: '#475569',     // slate-600 - hover states
  },

  // Text colors (lightest to darkest)
  text: {
    primary: '#f8fafc',   // slate-50 - headings, important text
    secondary: '#e2e8f0', // slate-200 - body text
    muted: '#94a3b8',     // slate-400 - helper text, labels
    disabled: '#64748b',  // slate-500 - disabled states
  },

  // Primary accent color (cyan)
  accent: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',  // Default
    600: '#0891b2',  // Hover
    700: '#0e7490',  // Active
    800: '#155e75',
    900: '#164e63',  // Muted
    950: '#083344',
  },

  // Semantic colors
  success: {
    light: '#34d399',  // emerald-400
    DEFAULT: '#10b981', // emerald-500
    dark: '#059669',    // emerald-600
    muted: '#064e3b',   // emerald-900
  },

  warning: {
    light: '#fbbf24',  // amber-400
    DEFAULT: '#f59e0b', // amber-500
    dark: '#d97706',    // amber-600
    muted: '#78350f',   // amber-900
  },

  error: {
    light: '#f87171',  // red-400
    DEFAULT: '#ef4444', // red-500
    dark: '#dc2626',    // red-600
    muted: '#7f1d1d',   // red-900
  },

  info: {
    light: '#60a5fa',  // blue-400
    DEFAULT: '#3b82f6', // blue-500
    dark: '#2563eb',    // blue-600
    muted: '#1e3a8a',   // blue-900
  },

  // Border colors
  border: {
    DEFAULT: '#334155', // slate-700
    hover: '#475569',   // slate-600
    focus: '#06b6d4',   // cyan-500
  },

  // Transparent overlays
  overlay: {
    light: 'rgba(0, 0, 0, 0.3)',
    DEFAULT: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.7)',
  },
} as const;

export type ColorToken = keyof typeof colors;
