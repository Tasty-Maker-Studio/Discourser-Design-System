import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './stories/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {
            50: { value: '#f0f9ff' },
            100: { value: '#e0f2fe' },
            200: { value: '#bae6fd' },
            300: { value: '#7dd3fc' },
            400: { value: '#38bdf8' },
            500: { value: '#0ea5e9' },
            600: { value: '#0284c7' },
            700: { value: '#0369a1' },
            800: { value: '#075985' },
            900: { value: '#0c4a6e' },
          },
          secondary: {
            50: { value: '#faf5ff' },
            100: { value: '#f3e8ff' },
            200: { value: '#e9d5ff' },
            300: { value: '#d8b4fe' },
            400: { value: '#c084fc' },
            500: { value: '#a855f7' },
            600: { value: '#9333ea' },
            700: { value: '#7e22ce' },
            800: { value: '#6b21a8' },
            900: { value: '#581c87' },
          },
        },
        fonts: {
          body: { value: 'system-ui, sans-serif' },
          heading: { value: 'system-ui, sans-serif' },
          mono: { value: 'monospace' },
        },
        spacing: {
          xs: { value: '0.5rem' },
          sm: { value: '0.75rem' },
          md: { value: '1rem' },
          lg: { value: '1.5rem' },
          xl: { value: '2rem' },
          '2xl': { value: '3rem' },
        },
        radii: {
          sm: { value: '0.25rem' },
          md: { value: '0.5rem' },
          lg: { value: '0.75rem' },
          full: { value: '9999px' },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',

  // JSX framework
  jsxFramework: 'react',
});
