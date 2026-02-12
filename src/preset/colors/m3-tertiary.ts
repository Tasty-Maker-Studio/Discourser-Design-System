/**
 * Material 3 Tertiary Color → Park UI Radix Scale
 *
 * Tertiary palette: teal accent color
 */

import { material3Language } from '../../languages/material3.language';
import { createPaletteBridge } from './create-palette-bridge';

export const tertiary = createPaletteBridge({
  name: 'tertiary',
  palette: material3Language.colors.tertiary,
});
