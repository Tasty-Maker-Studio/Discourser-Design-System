import { defineSemanticTokens } from '@pandacss/dev';
import { material3Language } from '../languages/material3.language';

const semantic = material3Language.semantic;
const semanticDark = material3Language.semanticDark!;

/**
 * M3 Semantic Tokens - layered on top of Park UI
 *
 * These provide M3-style naming (surface, onSurface, etc.)
 * while Park UI components use their own naming (fg, canvas, etc.)
 */
export const m3SemanticTokens = defineSemanticTokens.colors({
  // M3 Surface System
  surface: {
    DEFAULT: { value: { base: semantic.surface, _dark: semanticDark.surface } },
    dim: { value: { base: semantic.surfaceContainerLow, _dark: semanticDark.surfaceContainerLow } },
    bright: { value: { base: semantic.surfaceContainerHigh, _dark: semanticDark.surfaceContainerHigh } },
    container: {
      DEFAULT: { value: { base: semantic.surfaceContainer, _dark: semanticDark.surfaceContainer } },
      low: { value: { base: semantic.surfaceContainerLow, _dark: semanticDark.surfaceContainerLow } },
      lowest: { value: { base: semantic.surfaceContainerLowest, _dark: semanticDark.surfaceContainerLowest } },
      high: { value: { base: semantic.surfaceContainerHigh, _dark: semanticDark.surfaceContainerHigh } },
      highest: { value: { base: semantic.surfaceContainerHighest, _dark: semanticDark.surfaceContainerHighest } },
    },
  },
  onSurface: {
    DEFAULT: { value: { base: semantic.onSurface, _dark: semanticDark.onSurface } },
    variant: { value: { base: semantic.onSurfaceVariant, _dark: semanticDark.onSurfaceVariant } },
  },

  // M3 Primary tokens (for explicit M3 usage)
  m3Primary: {
    DEFAULT: { value: { base: semantic.primary, _dark: semanticDark.primary } },
    container: { value: { base: semantic.primaryContainer, _dark: semanticDark.primaryContainer } },
  },
  onM3Primary: {
    DEFAULT: { value: { base: semantic.onPrimary, _dark: semanticDark.onPrimary } },
    container: { value: { base: semantic.onPrimaryContainer, _dark: semanticDark.onPrimaryContainer } },
  },

  // M3 Secondary (prefixed to avoid conflict with Park UI Radix-scale bridge)
  m3Secondary: {
    DEFAULT: { value: { base: semantic.secondary, _dark: semanticDark.secondary } },
    container: { value: { base: semantic.secondaryContainer, _dark: semanticDark.secondaryContainer } },
  },
  onM3Secondary: {
    DEFAULT: { value: { base: semantic.onSecondary, _dark: semanticDark.onSecondary } },
    container: { value: { base: semantic.onSecondaryContainer, _dark: semanticDark.onSecondaryContainer } },
  },

  // M3 Tertiary (prefixed to avoid conflict with Park UI Radix-scale bridge)
  m3Tertiary: {
    DEFAULT: { value: { base: semantic.tertiary, _dark: semanticDark.tertiary } },
    container: { value: { base: semantic.tertiaryContainer, _dark: semanticDark.tertiaryContainer } },
  },
  onM3Tertiary: {
    DEFAULT: { value: { base: semantic.onTertiary, _dark: semanticDark.onTertiary } },
    container: { value: { base: semantic.onTertiaryContainer, _dark: semanticDark.onTertiaryContainer } },
  },

  // M3 Outline
  outline: {
    DEFAULT: { value: { base: semantic.outline, _dark: semanticDark.outline } },
    variant: { value: { base: semantic.outlineVariant, _dark: semanticDark.outlineVariant } },
  },

  // M3 Inverse
  inverseSurface: { value: { base: semantic.inverseSurface, _dark: semanticDark.inverseSurface } },
  inverseOnSurface: { value: { base: semantic.inverseOnSurface, _dark: semanticDark.inverseOnSurface } },
  inversePrimary: { value: { base: semantic.inversePrimary, _dark: semanticDark.inversePrimary } },
  // Not standard M3 tokens, but follow inversePrimary's pattern:
  // light mode = dark-palette value, dark mode = light-palette value.
  inverseSecondary: { value: { base: semanticDark.secondary, _dark: semantic.secondary } },
  inverseTertiary: { value: { base: semanticDark.tertiary, _dark: semantic.tertiary } },

  // Scrim/Shadow
  scrim: { value: { base: semantic.scrim, _dark: semanticDark.scrim } },
});