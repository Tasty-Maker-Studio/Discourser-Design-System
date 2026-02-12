import type { Preview } from '@storybook/react-vite';
import '../src/global.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        surface: { name: 'surface', value: '#F9FAEF' },
        dark: { name: 'dark', value: '#12140E' }
      }
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'surface'
    }
  }
};

export default preview;
