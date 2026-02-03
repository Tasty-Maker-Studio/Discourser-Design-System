import { definePreset } from '@pandacss/dev';
import { activeLanguage, transformToPandaTheme } from '../languages';
import { colors as m3Colors } from './colors';
import { m3SemanticTokens } from './semantic-tokens';

// Park UI recipes - Core
import { button as parkButton } from './recipes/button';
import { input as parkInput } from './recipes/input';
import { inputAddon } from './recipes/input-addon';
import { inputGroup } from './recipes/input-group';
import { field as parkField } from './recipes/field';
import { group } from './recipes/group';
import { spinner } from './recipes/spinner';
import { absoluteCenter } from './recipes/absolute-center';

// Park UI recipes - Layout & Containers
import { card as parkCard } from './recipes/card';
import { accordion } from './recipes/accordion';
import { drawer } from './recipes/drawer';
import { tabs } from './recipes/tabs';

// Park UI recipes - Form Elements
import { switchRecipe } from './recipes/switch';
import { checkbox } from './recipes/checkbox';
import { radioGroup } from './recipes/radio-group';
import { select } from './recipes/select';
import { textarea } from './recipes/textarea';
import { slider } from './recipes/slider';

// Park UI recipes - Feedback & Status
import { avatar } from './recipes/avatar';
import { badge } from './recipes/badge';
import { progress } from './recipes/progress';
import { skeleton } from './recipes/skeleton';
import { toast } from './recipes/toast';

// Park UI recipes - Overlays
import { dialog } from './recipes/dialog';
import { popover } from './recipes/popover';
import { tooltip } from './recipes/tooltip';

// Park UI recipes - Typography
import { heading } from './recipes/heading';
// Park UI theme extensions
import { layerStyles } from './layer-styles';
import { textStyles as parkTextStyles } from './text-styles';
import { shadows as parkShadows } from './shadows';

const theme = transformToPandaTheme(activeLanguage);

export const discourserPandaPreset = definePreset({
  name: 'discourser-design-system-preset',

  // Include Panda base presets like Park UI
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],

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
        // Remove manual sizes - inherit from @pandacss/preset-panda
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
          // M3-to-Radix color bridges
          ...m3Colors,

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
            default: {
              value: { base: '{colors.gray.6}', _dark: '{colors.gray.6}' },
            },
            muted: {
              value: { base: '{colors.gray.4}', _dark: '{colors.gray.4}' },
            },
          },

          // M3 semantic tokens (surface, onSurface, etc.)
          ...m3SemanticTokens,

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
      },
    },
  },

  conditions: {
    light: '[data-theme=light] &, .light &',
    dark: '[data-theme=dark] &, .dark &',
  },

  globalCss: {
    html: {
      colorScheme: 'light dark',
      bg: 'canvas',
      color: 'fg.default',
    },
    body: {
      fontFamily: 'body',
      textStyle: 'bodyMedium',
    },
  },
});
