/**
 * Room UI Border System
 */

export const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  DEFAULT: '0.5rem', // 8px - inputs, buttons
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px - cards
  xl: '1rem',       // 16px - modals
  '2xl': '1.5rem',  // 24px
  full: '9999px',   // Pills, circles
} as const;

export const borderWidth = {
  0: '0',
  DEFAULT: '1px',
  2: '2px',
  4: '4px',
} as const;

// Named border radius tokens
export const radiusTokens = {
  input: '0.5rem',   // 8px
  button: '0.5rem',  // 8px
  card: '0.75rem',   // 12px
  modal: '1rem',     // 16px
  badge: '0.375rem', // 6px
  pill: '9999px',
} as const;

export type RadiusToken = keyof typeof radiusTokens;
