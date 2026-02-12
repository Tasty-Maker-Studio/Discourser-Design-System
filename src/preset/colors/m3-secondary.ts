/**
 * Material 3 Secondary Color → Park UI Radix Scale
 *
 * Secondary palette: muted olive-green accent color
 */

import { material3Language } from '../../languages/material3.language';
import { createPaletteBridge } from './create-palette-bridge';

export const secondary = createPaletteBridge({
  name: 'secondary',
  palette: material3Language.colors.secondary,
});
