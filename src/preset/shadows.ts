import { defineSemanticTokens } from '@pandacss/dev';

/**
 * Shadow semantic tokens - chained to M3 base elevation tokens
 *
 * Three-layer architecture:
 * 1. Base tokens (level0-5): M3 elevation values defined in transform.ts
 * 2. Semantic tokens (xs-2xl): Reference base tokens for consistency
 * 3. Components: Use semantic tokens for flexibility
 */
export const shadows = defineSemanticTokens.shadows({
  xs: {
    value: '{shadows.level1}',
  },
  sm: {
    value: '{shadows.level2}',
  },
  md: {
    value: '{shadows.level3}',
  },
  lg: {
    value: '{shadows.level4}',
  },
  xl: {
    value: '{shadows.level5}',
  },
  '2xl': {
    value: '{shadows.level5}',
  },
  inset: {
    value: {
      base: 'inset 8px 0 12px -8px {colors.neutral.a4}',
      _dark: 'inset 8px 0 12px -8px {colors.neutral.a6}',
    },
  },
});
