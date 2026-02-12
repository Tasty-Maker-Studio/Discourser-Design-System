import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
      '@storybook/addon-a11y',
       '@storybook/addon-docs',
       '@storybook/addon-mcp',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  features: {
    experimentalComponentsManifest: true,
  },
};

export default config;
