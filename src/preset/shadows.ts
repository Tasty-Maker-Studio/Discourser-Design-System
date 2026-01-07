import { defineSemanticTokens } from '@pandacss/dev';

/**
 * Shadow semantic tokens from Park UI
 * Adjusted to use 'base' instead of '_light' and neutral.a* instead of black.a*
 */
export const shadows = defineSemanticTokens.shadows({
  xs: {
    value: {
      base: '0px 1px 2px {colors.neutral.a6}, 0px 0px 1px {colors.neutral.a7}',
      _dark: '0px 1px 1px {colors.neutral.a8}, 0px 0px 1px inset {colors.neutral.a8}',
    },
  },
  sm: {
    value: {
      base: '0px 2px 4px {colors.neutral.a4}, 0px 0px 1px {colors.neutral.a4}',
      _dark: '0px 2px 4px {colors.neutral.a8}, 0px 0px 1px inset {colors.neutral.a8}',
    },
  },
  md: {
    value: {
      base: '0px 4px 8px {colors.neutral.a4}, 0px 0px 1px {colors.neutral.a4}',
      _dark: '0px 4px 8px {colors.neutral.a8}, 0px 0px 1px inset {colors.neutral.a8}',
    },
  },
  lg: {
    value: {
      base: '0px 8px 16px {colors.neutral.a4}, 0px 0px 1px {colors.neutral.a4}',
      _dark: '0px 8px 16px {colors.neutral.a8}, 0px 0px 1px inset {colors.neutral.a8}',
    },
  },
  xl: {
    value: {
      base: '0px 16px 24px {colors.neutral.a4}, 0px 0px 1px {colors.neutral.a4}',
      _dark: '0px 16px 24px {colors.neutral.a8}, 0px 0px 1px inset {colors.neutral.a8}',
    },
  },
  '2xl': {
    value: {
      base: '0px 24px 40px {colors.neutral.a4}, 0px 0px 1px {colors.neutral.a4}',
      _dark: '0px 24px 40px {colors.neutral.a8}, 0px 0px 1px inset {colors.neutral.a8}',
    },
  },
  inset: {
    value: {
      base: 'inset 8px 0 12px -8px {colors.neutral.a4}',
      _dark: 'inset 8px 0 12px -8px {colors.neutral.a6}',
    },
  },
});
