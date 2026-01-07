/**
 * Material 3 Primary Color → Park UI Radix Scale
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
import { material3Language } from '../../languages/material3.language';

const m3 = material3Language.colors.primary;

export const primary = defineSemanticTokens.colors({
  // Base scale mapping M3 tonal to Radix
  '1': { value: { base: m3[99], _dark: m3[10] } },
  '2': { value: { base: m3[95], _dark: m3[20] } },
  '3': { value: { base: m3[90], _dark: m3[30] } },
  '4': { value: { base: m3[80], _dark: m3[30] } },
  '5': { value: { base: m3[70], _dark: m3[40] } },
  '6': { value: { base: m3[60], _dark: m3[40] } },
  '7': { value: { base: m3[50], _dark: m3[50] } },
  '8': { value: { base: m3[40], _dark: m3[60] } },
  '9': { value: { base: m3[40], _dark: m3[80] } },  // Primary action color
  '10': { value: { base: m3[30], _dark: m3[70] } }, // Hover state
  '11': { value: { base: m3[30], _dark: m3[90] } }, // Low-contrast text
  '12': { value: { base: m3[10], _dark: m3[95] } }, // High-contrast text

  // Alpha variants (for overlays/transparency)
  a1: { value: { base: `${m3[40]}08`, _dark: `${m3[80]}08` } },
  a2: { value: { base: `${m3[40]}10`, _dark: `${m3[80]}10` } },
  a3: { value: { base: `${m3[40]}18`, _dark: `${m3[80]}18` } },
  a4: { value: { base: `${m3[40]}24`, _dark: `${m3[80]}24` } },
  a5: { value: { base: `${m3[40]}32`, _dark: `${m3[80]}32` } },
  a6: { value: { base: `${m3[40]}48`, _dark: `${m3[80]}48` } },
  a7: { value: { base: `${m3[40]}64`, _dark: `${m3[80]}64` } },
  a8: { value: { base: `${m3[40]}80`, _dark: `${m3[80]}80` } },
  a9: { value: { base: `${m3[40]}96`, _dark: `${m3[80]}96` } },
  a10: { value: { base: `${m3[40]}AA`, _dark: `${m3[80]}AA` } },
  a11: { value: { base: `${m3[40]}CC`, _dark: `${m3[80]}CC` } },
  a12: { value: { base: `${m3[40]}EE`, _dark: `${m3[80]}EE` } },

  // Semantic variants (Park UI component styling)
  solid: {
    bg: {
      DEFAULT: { value: { base: '{colors.primary.9}', _dark: '{colors.primary.9}' } },
      hover: { value: { base: '{colors.primary.10}', _dark: '{colors.primary.10}' } },
    },
    fg: {
      DEFAULT: { value: { base: '{colors.white}', _dark: '{colors.primary.1}' } }
    },
  },
  subtle: {
    bg: {
      DEFAULT: { value: { base: '{colors.primary.a3}', _dark: '{colors.primary.a3}' } },
      hover: { value: { base: '{colors.primary.a4}', _dark: '{colors.primary.a4}' } },
      active: { value: { base: '{colors.primary.a5}', _dark: '{colors.primary.a5}' } },
    },
    fg: {
      DEFAULT: { value: { base: '{colors.primary.a11}', _dark: '{colors.primary.a11}' } }
    },
  },
  surface: {
    bg: {
      DEFAULT: { value: { base: '{colors.primary.a2}', _dark: '{colors.primary.a2}' } },
      active: { value: { base: '{colors.primary.a3}', _dark: '{colors.primary.a3}' } },
    },
    border: {
      DEFAULT: { value: { base: '{colors.primary.a6}', _dark: '{colors.primary.a6}' } },
      hover: { value: { base: '{colors.primary.a7}', _dark: '{colors.primary.a7}' } },
    },
    fg: {
      DEFAULT: { value: { base: '{colors.primary.a11}', _dark: '{colors.primary.a11}' } }
    },
  },
  outline: {
    bg: {
      hover: { value: { base: '{colors.primary.a2}', _dark: '{colors.primary.a2}' } },
      active: { value: { base: '{colors.primary.a3}', _dark: '{colors.primary.a3}' } },
    },
    border: {
      DEFAULT: { value: { base: '{colors.primary.a7}', _dark: '{colors.primary.a7}' } }
    },
    fg: {
      DEFAULT: { value: { base: '{colors.primary.a11}', _dark: '{colors.primary.a11}' } }
    },
  },
  plain: {
    bg: {
      hover: { value: { base: '{colors.primary.a3}', _dark: '{colors.primary.a3}' } },
      active: { value: { base: '{colors.primary.a4}', _dark: '{colors.primary.a4}' } },
    },
    fg: {
      DEFAULT: { value: { base: '{colors.primary.a11}', _dark: '{colors.primary.a11}' } }
    },
  },
});