/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Custom color palettes
      colors: {
        // Primary palette (blue shades for buttons, links)
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Secondary palette (pink shades for accents)
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        // Accent palette (orange shades for highlights)
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Neutral palette (gray shades for backgrounds, text)
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Vibrant colors (used in gradients, buttons, icons)
        vibrant: {
          lime: '#36FB2C', // Formerly green1
          emerald: '#00FF69', // Formerly green2
          violet: '#5000C9', // Formerly purple
          aqua: '#00FDC7', // Formerly cyan
          mint: '#D4FFED', // Formerly light
        },
        // Additional colors used in components
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        indigo: {
          500: '#6366f1',
          600: '#4f46e5',
        },
        green: {
          100: '#d1fae5',
          500: '#22c55e',
          600: '#16a34a',
        },
        red: {
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
        },
        orange: {
          100: '#ffedd5',
          500: '#f97316',
          800: '#c2410c',
        },
        yellow: {
          400: '#facc15',
        },
        purple: {
          500: '#a855f7',
          600: '#9333ea',
        },
      },
      // Custom fonts
      fontFamily: {
        heading: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['Roboto', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      // Custom utilities
      maxWidth: {
        prose: '65ch',
      },
      // Line clamp for text truncation
      lineClamp: {
        2: '2',
        3: '3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};