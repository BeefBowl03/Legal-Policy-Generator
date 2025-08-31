/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium gold palette with sophisticated blending
        primary: {
          50: '#fefdf7',
          100: '#fef9e3',
          200: '#fdf2c4',
          300: '#fbe7a1',
          400: '#f8d675',
          500: '#f4c044', // Main premium gold
          600: '#e5a52e',
          700: '#c17f25',
          800: '#9a6524',
          900: '#7d5321',
          950: '#432c0e',
        },
        // Rich dark theme with depth
        dark: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Premium background system
        background: {
          primary: '#0a0a0a',    // Deep black with subtle warmth
          secondary: '#111111',   // Rich dark gray
          tertiary: '#1a1a1a',   // Elevated surface
          card: '#0f0f0f',       // Premium card background
          surface: '#0d0d0d',    // Sophisticated surface
          elevated: '#151515',   // Elevated elements
          accent: '#1c1c1c',     // Accent surfaces
        },
        // Refined text system
        text: {
          primary: '#fafafa',    // Pure white with warmth
          secondary: '#e5e5e5',  // Soft white
          tertiary: '#d4d4d4',   // Muted white
          muted: '#a3a3a3',      // Subtle text
          accent: '#f4c044',     // Premium gold accent
          subtle: '#737373',     // Very subtle text
        },
        // Premium border system
        border: {
          primary: '#1a1a1a',    // Subtle borders
          secondary: '#262626',  // Medium borders
          accent: '#f4c044',     // Gold accent borders
          subtle: '#0f0f0f',     // Very subtle borders
          elevated: '#2a2a2a',   // Elevated borders
        },
        // Status colors with premium feel
        success: {
          light: '#ecfdf5',
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        warning: {
          light: '#fffbeb',
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        error: {
          light: '#fef2f2',
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        info: {
          light: '#eff6ff',
          DEFAULT: '#3b82f6',
          dark: '#1d4ed8',
        },
        // Premium accent colors
        accent: {
          gold: '#f4c044',
          bronze: '#cd7f32',
          copper: '#b87333',
          platinum: '#e5e4e2',
          silver: '#c0c0c0',
        }
      },
      backgroundColor: {
        'app': '#0a0a0a',
        'card': '#0f0f0f',
        'surface': '#0d0d0d',
        'premium': '#151515',
        'elevated': '#1a1a1a',
      },
      textColor: {
        'app': '#fafafa',
        'muted': '#a3a3a3',
        'accent': '#f4c044',
        'premium': '#e5e5e5',
      },
      borderColor: {
        'app': '#1a1a1a',
        'accent': '#f4c044',
        'premium': '#262626',
      },
      // Custom shadows for premium feel
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 10px 10px -5px rgba(0, 0, 0, 0.6)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
} 