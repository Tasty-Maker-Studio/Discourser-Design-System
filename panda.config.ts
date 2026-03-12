import { defineConfig } from '@pandacss/dev';
import { activeLanguage, transformToPandaTheme } from './src/languages';
import { colors as m3Colors } from './src/preset/colors';
import { semanticColorTokens } from './src/preset/semantic-tokens';
// Park UI recipes - Core
import { button as parkButton } from './src/preset/recipes/button';
import { input as parkInput } from './src/preset/recipes/input';
import { inputAddon } from './src/preset/recipes/input-addon';
import { inputGroup } from './src/preset/recipes/input-group';
import { field as parkField } from './src/preset/recipes/field';
import { group } from './src/preset/recipes/group';
import { spinner } from './src/preset/recipes/spinner';
import { absoluteCenter } from './src/preset/recipes/absolute-center';

// Park UI recipes - Layout & Containers
import { card as parkCard } from './src/preset/recipes/card';
import { accordion } from './src/preset/recipes/accordion';
import { drawer } from './src/preset/recipes/drawer';
import { tabs } from './src/preset/recipes/tabs';

// Park UI recipes - Navigation
import { breadcrumb } from './src/preset/recipes/breadcrumb';
import { navigationMenu } from './src/preset/recipes/navigation-menu';

// Park UI recipes - Form Elements
import { switchRecipe } from './src/preset/recipes/switch';
import { checkbox } from './src/preset/recipes/checkbox';
import { radioGroup } from './src/preset/recipes/radio-group';
import { select } from './src/preset/recipes/select';
import { textarea } from './src/preset/recipes/textarea';
import { slider } from './src/preset/recipes/slider';

// Park UI recipes - Feedback & Status
import { avatar } from './src/preset/recipes/avatar';
import { badge } from './src/preset/recipes/badge';
import { progress } from './src/preset/recipes/progress';
import { skeleton } from './src/preset/recipes/skeleton';
import { toast } from './src/preset/recipes/toast';

// Park UI recipes - Overlays
import { dialog } from './src/preset/recipes/dialog';
import { popover } from './src/preset/recipes/popover';
import { tooltip } from './src/preset/recipes/tooltip';

// Park UI recipes - Typography
import { heading } from './src/preset/recipes/heading';
// Park UI theme extensions
import { layerStyles } from './src/preset/layer-styles';
import { textStyles as parkTextStyles } from './src/preset/text-styles';
import { shadows as parkShadows } from './src/preset/shadows';
import { stepper } from './src/preset/recipes/stepper';
import { contentCard } from './src/preset/recipes/content-card';
import { scenarioCard } from './src/preset/recipes/scenario-card';
import { scenarioQueue } from './src/preset/recipes/scenario-queue';
import { scenarioSettings } from './src/preset/recipes/scenario-settings';

const theme = transformToPandaTheme(activeLanguage);

export default defineConfig({
  preflight: true,

  // Base presets for Park UI compatibility
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],

  // Generate static CSS for all recipes and colorPalette utilities
  staticCss: {
    recipes: '*',
    css: [
      {
        properties: {
          colorPalette: [
            'primary',
            'secondary',
            'tertiary',
            'error',
            'neutral',
            'gray',
            'red',
          ],
        },
      },
    ],
  },

  include: ['./src/**/*.{js,jsx,ts,tsx}', './stories/**/*.{js,jsx,ts,tsx}'],

  exclude: [],

  outdir: 'styled-system',

  jsxFramework: 'react',

  layers: {
    reset: 'reset',
    base: 'base',
    tokens: 'tokens',
    recipes: 'recipes',
    utilities: 'utilities',
  },

  theme: {
    extend: {
      // Add M3 tokens to Panda preset (colors, fonts, spacing, etc.)
      tokens: {
        colors: theme.tokens.colors,
        fonts: theme.tokens.fonts,
        fontSizes: theme.tokens.fontSizes,
        lineHeights: theme.tokens.lineHeights,
        fontWeights: theme.tokens.fontWeights,
        letterSpacings: theme.tokens.letterSpacings,
        spacing: theme.tokens.spacing,
        // xxs mirrors spacing.xxs so that `height/width: 'xxs'` resolves correctly
        // in the tabs indicator recipe (height maps to sizes, not spacing).
        sizes: { xxs: { value: '2px' } },
        radii: theme.tokens.radii,
        shadows: theme.tokens.shadows,
        durations: theme.tokens.durations,
        easings: theme.tokens.easings,
        borderWidths: theme.tokens.borderWidths,
      },

      // Park UI layer styles for common UI patterns (disabled, etc.)
      layerStyles,

      // Combined text styles: M3 + Park UI
      textStyles: {
        ...theme.textStyles,
        ...parkTextStyles,
      },

      // Semantic tokens: M3 colors + Park UI aliases + shadows + radii
      semanticTokens: {
        colors: {
          // Non-conflicting M3 semantic tokens land here first
          // (onPrimary, onSecondary, surface, outline, etc.)
          ...semanticColorTokens,

          // M3-to-Radix color bridges — overwrite conflicting top-level keys,
          // then re-merge the M3 semantic DEFAULT+container back in
          ...m3Colors,
          primary: { ...m3Colors.primary, ...semanticColorTokens.primary },
          secondary: {
            ...m3Colors.secondary,
            ...semanticColorTokens.secondary,
          },
          tertiary: { ...m3Colors.tertiary, ...semanticColorTokens.tertiary },
          error: { ...m3Colors.error, ...semanticColorTokens.error },

          // Park UI-style aliases for component compatibility
          fg: {
            default: {
              value: { base: '{colors.gray.12}', _dark: '{colors.gray.12}' },
            },
            muted: {
              value: { base: '{colors.gray.11}', _dark: '{colors.gray.11}' },
            },
            subtle: {
              value: { base: '{colors.gray.10}', _dark: '{colors.gray.10}' },
            },
          },
          canvas: {
            value: { base: '{colors.gray.1}', _dark: '{colors.gray.1}' },
          },
          border: {
            value: { base: '{colors.gray.6}', _dark: '{colors.gray.6}' },
          },

          // Base colors
          white: { value: '#FFFFFF' },
          black: { value: '#000000' },
        },

        // Park UI shadow tokens
        shadows: parkShadows,

        // Park UI radii tokens (l1, l2, l3 for consistent border radius)
        radii: {
          l1: { value: '0.125rem' }, // 2px (xs)
          l2: { value: '0.375rem' }, // 6px (sm)
          l3: { value: '0.5rem' }, // 8px (md)
        },
      },

      // Keyframes for accordion expand/collapse animations.
      // Uses --height CSS variable set automatically by zag-js collapsible machine.
      keyframes: {
        'slide-down': {
          from: { opacity: '0', height: '0' },
          to: { opacity: '1', height: 'var(--height)' },
        },
        'slide-up': {
          from: { opacity: '1', height: 'var(--height)' },
          to: { opacity: '0', height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },

      // Recipes: Park UI components (simple recipes)
      recipes: {
        // Core
        button: parkButton,
        input: parkInput,
        inputAddon,
        group,
        spinner,
        absoluteCenter,
        // Typography
        heading,
        // Feedback & Status
        badge,
        skeleton,
        textarea,
      },
      slotRecipes: {
        // Core
        field: parkField,
        inputGroup,
        // Layout & Containers
        card: parkCard,
        accordion,
        drawer,
        tabs,
        // Navigation
        breadcrumb,
        navigationMenu,
        // Form Elements
        switchComponent: switchRecipe,
        checkbox,
        radioGroup,
        select,
        slider,
        // Feedback & Status
        avatar,
        progress,
        toast,
        // Overlays
        dialog,
        popover,
        tooltip,
        // Custom Components
        stepper,
        contentCard,
        scenarioCard,
        scenarioQueue,
        scenarioSettings,
      },
    },
  },

  conditions: {
    light: '[data-theme=light] &, .light &',
    dark: '[data-theme=dark] &, .dark &',
    current: '&[data-current]',
    complete: '&[data-complete]',
    incomplete: '&[data-incomplete]',
  },

  globalCss: {
    html: {
      colorScheme: 'light dark',
      bg: 'canvas',
      color: 'fg.default',
      '--global-color-focus-ring': 'var(--colors-primary-9)',
    },
    body: {
      fontFamily: 'body',
      textStyle: 'bodyMedium',
    },
    // Safety net: prevent Panda's reset [hidden]{display:none!important} from
    // killing accordion close animations during zag-js's 'closing' transient state.
    // zag-js keeps hidden=false while closing, but this guards edge cases.
    '[data-scope="accordion"][data-part="item-content"][hidden]': {
      display: 'block',
    },
    '[data-collapsible][hidden]': {
      display: 'block',
    },
  },
});
