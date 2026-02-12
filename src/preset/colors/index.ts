import { primary } from './m3-primary';
import { secondary } from './m3-secondary';
import { tertiary } from './m3-tertiary';
import { neutral } from './m3-neutral';
import { error } from './m3-error';

// Export all M3 colors mapped to Park UI structure
export const colors = {
  primary,
  secondary,
  tertiary,
  neutral,
  error,
  // Alias gray to neutral (Park UI expects this)
  gray: neutral,
  // Map red to error for Park UI compatibility
  red: error,
};
