import { defineConfig } from '@pandacss/dev';
import { activeLanguage, transformToPandaTheme } from './src/languages';
import { buttonRecipe, cardRecipe, iconButtonRecipe, inputRecipe, dialogRecipe, switchRecipe } from './src/recipes';

const theme = transformToPandaTheme(activeLanguage);

export default defineConfig({
  preflight: true,

  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './stories/**/*.{js,jsx,ts,tsx}'
  ],

  exclude: [],

  outdir: 'styled-system',

  jsxFramework: 'react',

  layers: {
    reset: 'reset',
    base: 'base',
    tokens: 'tokens',
    recipes: 'recipes',
    utilities: 'utilities'
  },

  theme: {
    tokens: theme.tokens,
    semanticTokens: theme.semanticTokens,
    textStyles: theme.textStyles,
    extend: {
      recipes: {
        button: buttonRecipe,
        card: cardRecipe,
        iconButton: iconButtonRecipe,
        input: inputRecipe,
      },
      slotRecipes: {
        dialog: dialogRecipe,
        switchControl: switchRecipe,
      }
    }
  },

  conditions: {
    light: '[data-theme=light] &, .light &',
    dark: '[data-theme=dark] &, .dark &'
  },

  globalCss: {
    html: {
      colorScheme: 'light dark'
    },
    body: {
      fontFamily: 'body',
      bg: 'surface',
      color: 'onSurface',
      textStyle: 'bodyMedium'
    }
  }
});
