import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Room UI uses a dark slate/cyan theme
        room: {
          // Background layers (darkest to lightest)
          bg: {
            base: '#0f172a',      // slate-900
            elevated: '#1e293b',  // slate-800
            surface: '#334155',   // slate-700
            hover: '#475569',     // slate-600
          },
          // Text colors
          text: {
            primary: '#f8fafc',   // slate-50
            secondary: '#e2e8f0', // slate-200
            muted: '#94a3b8',     // slate-400
            disabled: '#64748b',  // slate-500
          },
          // Accent colors
          accent: {
            DEFAULT: '#06b6d4',   // cyan-500
            hover: '#0891b2',     // cyan-600
            active: '#0e7490',    // cyan-700
            muted: '#164e63',     // cyan-900
          },
          // Semantic colors
          success: {
            DEFAULT: '#10b981',   // emerald-500
            muted: '#064e3b',     // emerald-900
          },
          warning: {
            DEFAULT: '#f59e0b',   // amber-500
            muted: '#78350f',     // amber-900
          },
          error: {
            DEFAULT: '#ef4444',   // red-500
            muted: '#7f1d1d',     // red-900
          },
          info: {
            DEFAULT: '#3b82f6',   // blue-500
            muted: '#1e3a8a',     // blue-900
          },
          // Border colors
          border: {
            DEFAULT: '#334155',   // slate-700
            hover: '#475569',     // slate-600
            focus: '#06b6d4',     // cyan-500
          },
        },
      },
      fontFamily: {
        sans: ['Geist Sans', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      borderRadius: {
        room: '0.75rem',          // 12px - default for cards
        'room-sm': '0.5rem',      // 8px - for inputs, buttons
        'room-lg': '1rem',        // 16px - for modals
      },
      boxShadow: {
        room: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
        'room-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
        'room-glow': '0 0 20px rgba(6, 182, 212, 0.3)',
      },
      animation: {
        'room-pulse': 'room-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'room-spin': 'spin 1s linear infinite',
      },
      keyframes: {
        'room-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
