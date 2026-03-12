import { defineSemanticTokens } from '@pandacss/dev';
import { material3Language } from '../languages/material3.language';

/**
 * MAINTENANCE CONTRACT:
 * Every key in material3Language.semantic MUST have a corresponding entry here.
 * src/__tests__/token-contract.test.ts enforces this automatically.
 * When adding a new semantic role to material3.language.ts:
 *   1. Add the token here in semanticColorTokens
 *   2. Run pnpm test to confirm the contract test passes
 *   3. Update Colors.mdx to add the swatch
 *   4. Bump the minor version
 */

const s = material3Language.semantic;
const d = material3Language.semanticDark!;

/**
 * Clean semantic color tokens — no m3 prefix.
 * These are the authoritative names going forward.
 */
export const semanticColorTokens = defineSemanticTokens.colors({
  // Primary
  primary: {
    DEFAULT: { value: { base: s.primary, _dark: d.primary } },
    container: {
      value: { base: s.primaryContainer, _dark: d.primaryContainer },
    },
  },
  onPrimary: {
    DEFAULT: { value: { base: s.onPrimary, _dark: d.onPrimary } },
    container: {
      value: { base: s.onPrimaryContainer, _dark: d.onPrimaryContainer },
    },
  },

  // Secondary
  secondary: {
    DEFAULT: { value: { base: s.secondary, _dark: d.secondary } },
    container: {
      value: { base: s.secondaryContainer, _dark: d.secondaryContainer },
    },
  },
  onSecondary: {
    DEFAULT: { value: { base: s.onSecondary, _dark: d.onSecondary } },
    container: {
      value: { base: s.onSecondaryContainer, _dark: d.onSecondaryContainer },
    },
  },

  // Tertiary
  tertiary: {
    DEFAULT: { value: { base: s.tertiary, _dark: d.tertiary } },
    container: {
      value: { base: s.tertiaryContainer, _dark: d.tertiaryContainer },
    },
  },
  onTertiary: {
    DEFAULT: { value: { base: s.onTertiary, _dark: d.onTertiary } },
    container: {
      value: { base: s.onTertiaryContainer, _dark: d.onTertiaryContainer },
    },
  },

  // Error
  error: {
    DEFAULT: { value: { base: s.error, _dark: d.error } },
    container: { value: { base: s.errorContainer, _dark: d.errorContainer } },
  },
  onError: {
    DEFAULT: { value: { base: s.onError, _dark: d.onError } },
    container: {
      value: { base: s.onErrorContainer, _dark: d.onErrorContainer },
    },
  },

  // Surface system
  surface: {
    DEFAULT: { value: { base: s.surface, _dark: d.surface } },
    dim: {
      value: { base: s.surfaceContainerLow, _dark: d.surfaceContainerLow },
    },
    bright: {
      value: { base: s.surfaceContainerHigh, _dark: d.surfaceContainerHigh },
    },
    container: {
      DEFAULT: {
        value: { base: s.surfaceContainer, _dark: d.surfaceContainer },
      },
      low: {
        value: { base: s.surfaceContainerLow, _dark: d.surfaceContainerLow },
      },
      lowest: {
        value: {
          base: s.surfaceContainerLowest,
          _dark: d.surfaceContainerLowest,
        },
      },
      high: {
        value: { base: s.surfaceContainerHigh, _dark: d.surfaceContainerHigh },
      },
      highest: {
        value: {
          base: s.surfaceContainerHighest,
          _dark: d.surfaceContainerHighest,
        },
      },
    },
  },
  onSurface: {
    DEFAULT: { value: { base: s.onSurface, _dark: d.onSurface } },
    variant: { value: { base: s.onSurfaceVariant, _dark: d.onSurfaceVariant } },
  },
  surfaceVariant: {
    value: { base: s.surfaceVariant, _dark: d.surfaceVariant },
  },

  // Background
  background: { value: { base: s.background, _dark: d.background } },
  onBackground: { value: { base: s.onBackground, _dark: d.onBackground } },

  // Outline
  outline: {
    DEFAULT: { value: { base: s.outline, _dark: d.outline } },
    variant: { value: { base: s.outlineVariant, _dark: d.outlineVariant } },
  },

  // Inverse
  inverseSurface: {
    value: { base: s.inverseSurface, _dark: d.inverseSurface },
  },
  inverseOnSurface: {
    value: { base: s.inverseOnSurface, _dark: d.inverseOnSurface },
  },
  inversePrimary: {
    value: { base: s.inversePrimary, _dark: d.inversePrimary },
  },
  // Not standard M3 tokens, but follow inversePrimary's pattern:
  // light mode = dark-palette value, dark mode = light-palette value.
  inverseSecondary: { value: { base: d.secondary, _dark: s.secondary } },
  inverseTertiary: { value: { base: d.tertiary, _dark: s.tertiary } },

  // Utility
  scrim: { value: { base: s.scrim, _dark: d.scrim } },
  shadow: { value: { base: s.shadow, _dark: d.shadow } },
});
