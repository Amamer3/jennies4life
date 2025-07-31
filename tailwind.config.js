/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Custom color palettes based on provided designs
      colors: {
        // Yellow-Green Palette (from first image)
        primary: {
          100: '#F4FFC1',
          200: '#EEFF86',
          300: '#ECFF41',
          400: '#F2FF0D',
          500: '#FFFF00', // Main yellow
          600: '#D1BF00',
          700: '#A68B02',
          800: '#896C0A',
        },
        // Orange Palette (from second image)
        secondary: {
          100: '#FFF5C5',
          200: '#FFEB85',
          300: '#FFDA46',
          400: '#FFC71B',
          500: '#FFA500', // Main orange
          600: '#E27C00',
          700: '#BB5502',
          800: '#984208',
        },
        // Neutral grays for text and backgrounds
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