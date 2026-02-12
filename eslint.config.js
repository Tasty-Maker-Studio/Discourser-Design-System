// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [js.configs.recommended, {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      // Browser globals
      document: 'readonly',
      window: 'readonly',
      alert: 'readonly',
      console: 'readonly',
      // DOM types
      HTMLElement: 'readonly',
      HTMLButtonElement: 'readonly',
      HTMLDivElement: 'readonly',
      HTMLInputElement: 'readonly',
      Element: 'readonly',
    },
  },
  plugins: {
    '@typescript-eslint': typescript,
    'react': react,
    'react-hooks': reactHooks,
  },
  rules: {
    ...typescript.configs.recommended.rules,
    ...react.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-object-type': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}, {
  ignores: ['dist/', 'node_modules/', 'styled-system/', 'storybook-static/'],
}, ...storybook.configs["flat/recommended"]];
