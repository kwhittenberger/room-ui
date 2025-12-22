/**
 * Room UI Typography System
 *
 * Uses Geist Sans for body text and Geist Mono for code.
 */

export const fontFamily = {
  sans: ['Geist Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
} as const;

export const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }],       // 12px
  sm: ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
  base: ['1rem', { lineHeight: '1.5rem' }],       // 16px
  lg: ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
  xl: ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
  '2xl': ['1.5rem', { lineHeight: '2rem' }],     // 24px
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px
  '5xl': ['3rem', { lineHeight: '1' }],          // 48px
} as const;

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Text style presets
export const textStyles = {
  // Headings
  h1: {
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
    fontWeight: '600',
    letterSpacing: '-0.025em',
  },
  h2: {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
    fontWeight: '600',
    letterSpacing: '-0.025em',
  },
  h3: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontWeight: '600',
  },
  h4: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    fontWeight: '600',
  },
  h5: {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    fontWeight: '600',
  },
  h6: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: '600',
  },
  // Body text
  body: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: '400',
  },
  bodySmall: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: '400',
  },
  // Labels and captions
  label: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: '500',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    fontWeight: '400',
  },
} as const;

export type TextStyle = keyof typeof textStyles;
