import { defineSemanticTokens } from '@pandacss/dev';
import { material3Language } from '../../languages/material3.language';

const m3 = material3Language.colors.neutral;

export const neutral = defineSemanticTokens.colors({
  '1': { value: { base: m3[99], _dark: m3[10] } },
  '2': { value: { base: m3[95], _dark: m3[20] } },
  '3': { value: { base: m3[90], _dark: m3[20] } },
  '4': { value: { base: m3[80], _dark: m3[30] } },
  '5': { value: { base: m3[70], _dark: m3[30] } },
  '6': { value: { base: m3[60], _dark: m3[40] } },
  '7': { value: { base: m3[50], _dark: m3[50] } },
  '8': { value: { base: m3[40], _dark: m3[60] } },
  '9': { value: { base: m3[40], _dark: m3[60] } },
  '10': { value: { base: m3[30], _dark: m3[70] } },
  '11': { value: { base: m3[30], _dark: m3[80] } },
  '12': { value: { base: m3[10], _dark: m3[90] } },

  // Alpha variants (increased opacity for better visibility)
  a1: { value: { base: '#00000008', _dark: '#ffffff08' } },
  a2: { value: { base: '#00000020', _dark: '#ffffff20' } }, // ~13% for surface bg
  a3: { value: { base: '#00000030', _dark: '#ffffff30' } }, // ~19% for subtle bg
  a4: { value: { base: '#00000040', _dark: '#ffffff40' } }, // ~25% for hover states
  a5: { value: { base: '#00000050', _dark: '#ffffff50' } }, // ~31% for active states
  a6: { value: { base: '#00000080', _dark: '#ffffff80' } }, // ~50% for visible borders
  a7: { value: { base: '#000000A0', _dark: '#ffffffA0' } }, // ~63% for prominent borders
  a8: { value: { base: '#000000B0', _dark: '#ffffffB0' } }, // ~69%
  a9: { value: { base: '#000000C0', _dark: '#ffffffC0' } }, // ~75%
  a10: { value: { base: '#000000D0', _dark: '#ffffffD0' } }, // ~81%
  a11: { value: { base: '#000000E0', _dark: '#ffffffE0' } }, // ~88% for text colors
  a12: { value: { base: '#000000F0', _dark: '#ffffffF0' } }, // ~94% for high contrast

  // Semantic variants
  solid: {
    bg: {
      DEFAULT: { value: { base: '{colors.black}', _dark: '{colors.white}' } },
      hover: { value: { base: '{colors.neutral.12}', _dark: '{colors.neutral.12}' } },
    },
    fg: {
      DEFAULT: { value: { base: '{colors.white}', _dark: '{colors.black}' } }
    },
  },
  subtle: {
    bg: {
      DEFAULT: { value: { base: '{colors.neutral.a3}', _dark: '{colors.neutral.a3}' } },
      hover: { value: { base: '{colors.neutral.a4}', _dark: '{colors.neutral.a4}' } },
      active: { value: { base: '{colors.neutral.a5}', _dark: '{colors.neutral.a5}' } },
    },
    fg: {
      DEFAULT: { value: { base: '{colors.neutral.12}', _dark: '{colors.neutral.12}' } }
    },
  },
  surface: {
    bg: {
      DEFAULT: { value: { base: '{colors.white}', _dark: '{colors.neutral.1}' } },
      hover: { value: { base: '{colors.neutral.2}', _dark: '{colors.neutral.2}' } },
      active: { value: { base: '{colors.neutral.3}', _dark: '{colors.neutral.3}' } },
    },
    border: {
      DEFAULT: { value: { base: '{colors.neutral.6}', _dark: '{colors.neutral.6}' } },
      hover: { value: { base: '{colors.neutral.7}', _dark: '{colors.neutral.7}' } },
    },
    fg: {
      DEFAULT: { value: { base: '{colors.neutral.12}', _dark: '{colors.neutral.12}' } }
    },
  },
  outline: {
    bg: {
      DEFAULT: { value: { base: 'transparent', _dark: 'transparent' } },
      hover: { value: { base: '{colors.neutral.a2}', _dark: '{colors.neutral.a2}' } },
      active: { value: { base: '{colors.neutral.a3}', _dark: '{colors.neutral.a3}' } },
    },
    border: {
      DEFAULT: { value: { base: '{colors.neutral.6}', _dark: '{colors.neutral.6}' } }
    },
    fg: {
      DEFAULT: { value: { base: '{colors.neutral.12}', _dark: '{colors.neutral.12}' } }
    },
  },
  plain: {
    bg: {
      DEFAULT: { value: { base: 'transparent', _dark: 'transparent' } },
      hover: { value: { base: '{colors.neutral.a3}', _dark: '{colors.neutral.a3}' } },
      active: { value: { base: '{colors.neutral.a4}', _dark: '{colors.neutral.a4}' } },
    },
    fg: {
      DEFAULT: { value: { base: '{colors.neutral.12}', _dark: '{colors.neutral.12}' } }
    },
  },
});