/**
 * Material 3 Error Color → Park UI Radix Scale
 */

import { material3Language } from '../../languages/material3.language';
import { createPaletteBridge } from './create-palette-bridge';

export const error = createPaletteBridge({
  name: 'error',
  palette: material3Language.colors.error,
  includeDefault: true,
  solidFgWhiteBoth: true,
});
