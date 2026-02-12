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

import { material3Language } from '../../languages/material3.language';
import { createPaletteBridge } from './create-palette-bridge';

export const primary = createPaletteBridge({
  name: 'primary',
  palette: material3Language.colors.primary,
});
