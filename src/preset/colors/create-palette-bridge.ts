/**
 * Factory for creating Radix-scale bridges from M3 tonal palettes
 *
 * Converts Material 3 tonal palettes (0-100 scale) to Park UI Radix scale (1-12 + alpha + semantic variants)
 *
 * Mapping Strategy:
 * - Radix 1-12 represents light → dark in light mode
 * - M3 tonal palette 100 → 0 (white to black)
 *
 * Radix Scale Semantics:
 * 1-2: App background
 * 3-4: Subtle backgrounds
 * 5-6: UI element backgrounds
 * 7-8: Borders and separators
 * 9: Solid backgrounds (primary action color)
 * 10: Hovered solid backgrounds
 * 11: Low-contrast text
 * 12: High-contrast text
 */

import { defineSemanticTokens } from '@pandacss/dev';
import type { TonalPalette } from '../../contracts/design-language.contract';

interface PaletteBridgeOptions {
  /**
   * Palette name for self-referencing semantic tokens (e.g., 'primary', 'error')
   */
  name: string;

  /**
   * M3 tonal palette object with keys 0-100
   */
  palette: TonalPalette;

  /**
   * Whether to include a DEFAULT key (used for error palette)
   */
  includeDefault?: boolean;

  /**
   * Override for solid.fg token (default uses white/palette[1] pattern)
   * If true, uses 'white' for both light and dark modes (error pattern)
   */
  solidFgWhiteBoth?: boolean;
}

/**
 * Creates a complete Radix-scale bridge from an M3 tonal palette
 */
export function createPaletteBridge({
  name,
  palette: m3,
  includeDefault = false,
  solidFgWhiteBoth = false,
}: PaletteBridgeOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokens: any = {
    // Base scale mapping M3 tonal to Radix (same for all chromatic colors)
    '1': { value: { base: m3[99], _dark: m3[10] } },
    '2': { value: { base: m3[95], _dark: m3[20] } },
    '3': { value: { base: m3[90], _dark: m3[30] } },
    '4': { value: { base: m3[80], _dark: m3[30] } },
    '5': { value: { base: m3[70], _dark: m3[40] } },
    '6': { value: { base: m3[60], _dark: m3[40] } },
    '7': { value: { base: m3[50], _dark: m3[50] } },
    '8': { value: { base: m3[40], _dark: m3[60] } },
    '9': { value: { base: m3[40], _dark: m3[80] } }, // Primary action color
    '10': { value: { base: m3[30], _dark: m3[70] } }, // Hover state
    '11': { value: { base: m3[30], _dark: m3[90] } }, // Low-contrast text
    '12': { value: { base: m3[10], _dark: m3[95] } }, // High-contrast text

    // Alpha variants (for overlays/transparency)
    // Increased opacity for better visibility in UI components
    a1: { value: { base: `${m3[40]}08`, _dark: `${m3[80]}08` } },
    a2: { value: { base: `${m3[40]}20`, _dark: `${m3[80]}20` } }, // ~13% for surface bg
    a3: { value: { base: `${m3[40]}30`, _dark: `${m3[80]}30` } }, // ~19% for subtle bg
    a4: { value: { base: `${m3[40]}40`, _dark: `${m3[80]}40` } }, // ~25% for hover states
    a5: { value: { base: `${m3[40]}50`, _dark: `${m3[80]}50` } }, // ~31% for active states
    a6: { value: { base: `${m3[40]}80`, _dark: `${m3[80]}80` } }, // ~50% for visible borders
    a7: { value: { base: `${m3[40]}A0`, _dark: `${m3[80]}A0` } }, // ~63% for prominent borders
    a8: { value: { base: `${m3[40]}B0`, _dark: `${m3[80]}B0` } }, // ~69%
    a9: { value: { base: `${m3[40]}C0`, _dark: `${m3[80]}C0` } }, // ~75%
    a10: { value: { base: `${m3[40]}D0`, _dark: `${m3[80]}D0` } }, // ~81%
    a11: { value: { base: `${m3[40]}E0`, _dark: `${m3[80]}E0` } }, // ~88% for text colors
    a12: { value: { base: `${m3[40]}F0`, _dark: `${m3[80]}F0` } }, // ~94% for high contrast

    // Semantic variants (Park UI component styling)
    solid: {
      bg: {
        DEFAULT: { value: { base: `{colors.${name}.9}`, _dark: `{colors.${name}.9}` } },
        hover: { value: { base: `{colors.${name}.10}`, _dark: `{colors.${name}.10}` } },
      },
      fg: {
        DEFAULT: solidFgWhiteBoth
          ? { value: { base: 'white', _dark: 'white' } }
          : { value: { base: '{colors.white}', _dark: `{colors.${name}.1}` } },
      },
    },
    subtle: {
      bg: {
        DEFAULT: { value: { base: `{colors.${name}.a3}`, _dark: `{colors.${name}.a3}` } },
        hover: { value: { base: `{colors.${name}.a4}`, _dark: `{colors.${name}.a4}` } },
        active: { value: { base: `{colors.${name}.a5}`, _dark: `{colors.${name}.a5}` } },
      },
      fg: {
        DEFAULT: { value: { base: `{colors.${name}.a11}`, _dark: `{colors.${name}.a11}` } },
      },
    },
    surface: {
      bg: {
        DEFAULT: { value: { base: `{colors.${name}.a2}`, _dark: `{colors.${name}.a2}` } },
        active: { value: { base: `{colors.${name}.a3}`, _dark: `{colors.${name}.a3}` } },
      },
      border: {
        DEFAULT: { value: { base: `{colors.${name}.a6}`, _dark: `{colors.${name}.a6}` } },
        hover: { value: { base: `{colors.${name}.a7}`, _dark: `{colors.${name}.a7}` } },
      },
      fg: {
        DEFAULT: { value: { base: `{colors.${name}.a11}`, _dark: `{colors.${name}.a11}` } },
      },
    },
    outline: {
      bg: {
        DEFAULT: { value: { base: 'transparent', _dark: 'transparent' } },
        hover: { value: { base: `{colors.${name}.a2}`, _dark: `{colors.${name}.a2}` } },
        active: { value: { base: `{colors.${name}.a3}`, _dark: `{colors.${name}.a3}` } },
      },
      border: {
        DEFAULT: { value: { base: `{colors.${name}.a7}`, _dark: `{colors.${name}.a7}` } },
      },
      fg: {
        DEFAULT: { value: { base: `{colors.${name}.a11}`, _dark: `{colors.${name}.a11}` } },
      },
    },
    plain: {
      bg: {
        DEFAULT: { value: { base: 'transparent', _dark: 'transparent' } },
        hover: { value: { base: `{colors.${name}.a3}`, _dark: `{colors.${name}.a3}` } },
        active: { value: { base: `{colors.${name}.a4}`, _dark: `{colors.${name}.a4}` } },
      },
      fg: {
        DEFAULT: { value: { base: `{colors.${name}.a11}`, _dark: `{colors.${name}.a11}` } },
      },
    },
  };

  // Add DEFAULT key if requested (for error palette)
  if (includeDefault) {
    return defineSemanticTokens.colors({
      DEFAULT: { value: { base: m3[40], _dark: m3[80] } },
      ...tokens,
    });
  }

  return defineSemanticTokens.colors(tokens);
}
