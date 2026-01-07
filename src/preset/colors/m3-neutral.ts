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

  // Alpha variants
  a1: { value: { base: '#00000003', _dark: '#ffffff05' } },
  a2: { value: { base: '#00000006', _dark: '#ffffff09' } },
  a3: { value: { base: '#0000000f', _dark: '#ffffff12' } },
  a4: { value: { base: '#00000017', _dark: '#ffffff1b' } },
  a5: { value: { base: '#0000001f', _dark: '#ffffff22' } },
  a6: { value: { base: '#00000026', _dark: '#ffffff2c' } },
  a7: { value: { base: '#00000031', _dark: '#ffffff3b' } },
  a8: { value: { base: '#00000044', _dark: '#ffffff55' } },
  a9: { value: { base: '#00000072', _dark: '#ffffff64' } },
  a10: { value: { base: '#0000007c', _dark: '#ffffff72' } },
  a11: { value: { base: '#0000009b', _dark: '#ffffffaf' } },
  a12: { value: { base: '#000000df', _dark: '#ffffffed' } },

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
      hover: { value: { base: '{colors.neutral.a3}', _dark: '{colors.neutral.a3}' } },
      active: { value: { base: '{colors.neutral.a4}', _dark: '{colors.neutral.a4}' } },
    },
    fg: {
      DEFAULT: { value: { base: '{colors.neutral.12}', _dark: '{colors.neutral.12}' } }
    },
  },
});