import { defineSemanticTokens } from '@pandacss/dev';
import { material3Language } from '../../languages/material3.language';

const m3 = material3Language.colors.error;

export const error = defineSemanticTokens.colors({
  '1': { value: { base: m3[99], _dark: m3[10] } },
  '2': { value: { base: m3[95], _dark: m3[20] } },
  '3': { value: { base: m3[90], _dark: m3[30] } },
  '4': { value: { base: m3[80], _dark: m3[30] } },
  '5': { value: { base: m3[70], _dark: m3[40] } },
  '6': { value: { base: m3[60], _dark: m3[40] } },
  '7': { value: { base: m3[50], _dark: m3[50] } },
  '8': { value: { base: m3[40], _dark: m3[60] } },
  '9': { value: { base: m3[40], _dark: m3[80] } },
  '10': { value: { base: m3[30], _dark: m3[70] } },
  '11': { value: { base: m3[30], _dark: m3[90] } },
  '12': { value: { base: m3[10], _dark: m3[95] } },

  // Alpha variants
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

  // Semantic variants
  solid: {
    bg: {
      DEFAULT: { value: { base: '{colors.error.9}', _dark: '{colors.error.9}' } },
      hover: { value: { base: '{colors.error.10}', _dark: '{colors.error.10}' } },
    },
    fg: { DEFAULT: { value: { base: 'white', _dark: 'white' } } },
  },
  subtle: {
    bg: {
      DEFAULT: { value: { base: '{colors.error.a3}', _dark: '{colors.error.a3}' } },
      hover: { value: { base: '{colors.error.a4}', _dark: '{colors.error.a4}' } },
      active: { value: { base: '{colors.error.a5}', _dark: '{colors.error.a5}' } },
    },
    fg: { DEFAULT: { value: { base: '{colors.error.a11}', _dark: '{colors.error.a11}' } } },
  },
  surface: {
    bg: {
      DEFAULT: { value: { base: '{colors.error.a2}', _dark: '{colors.error.a2}' } },
      active: { value: { base: '{colors.error.a3}', _dark: '{colors.error.a3}' } },
    },
    border: {
      DEFAULT: { value: { base: '{colors.error.a6}', _dark: '{colors.error.a6}' } },
      hover: { value: { base: '{colors.error.a7}', _dark: '{colors.error.a7}' } },
    },
    fg: { DEFAULT: { value: { base: '{colors.error.a11}', _dark: '{colors.error.a11}' } } },
  },
  outline: {
    bg: {
      hover: { value: { base: '{colors.error.a2}', _dark: '{colors.error.a2}' } },
      active: { value: { base: '{colors.error.a3}', _dark: '{colors.error.a3}' } },
    },
    border: { DEFAULT: { value: { base: '{colors.error.a7}', _dark: '{colors.error.a7}' } } },
    fg: { DEFAULT: { value: { base: '{colors.error.a11}', _dark: '{colors.error.a11}' } } },
  },
  plain: {
    bg: {
      hover: { value: { base: '{colors.error.a3}', _dark: '{colors.error.a3}' } },
      active: { value: { base: '{colors.error.a4}', _dark: '{colors.error.a4}' } },
    },
    fg: { DEFAULT: { value: { base: '{colors.error.a11}', _dark: '{colors.error.a11}' } } },
  },
});