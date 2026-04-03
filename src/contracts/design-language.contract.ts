/**
 * Design Language Contract
 *
 * Any aesthetic (M3, Carbon, Fluent, custom) must implement this interface.
 * This enables swapping aesthetics by changing one import.
 */

export interface DesignLanguageContract {
  name: string;
  version: string;
  colors: ColorPalettes;
  semantic: SemanticColors;
  semanticDark?: SemanticColors; // Optional dark theme overrides
  typography: TypographyConfig;
  spacing: SpacingScale;
  shape: ShapeConfig;
  elevation: ElevationConfig;
  motion: MotionConfig;
  border: BorderConfig;
}

// Color Types
export interface ColorPalettes {
  primary: TonalPalette;
  secondary: TonalPalette;
  tertiary: TonalPalette;
  neutral: TonalPalette;
  neutralVariant: TonalPalette;
  error: TonalPalette;
}

export interface TonalPalette {
  0: string;
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
  95: string;
  99: string;
  100: string;
}

export interface SemanticColors {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  outline: string;
  outlineVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  background: string;
  onBackground: string;
  scrim: string;
  shadow: string;
}

// Typography Types

export type WeightName =
  | 'thin'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold';

export interface FontWeightMap {
  '100'?: string;
  '200'?: string;
  '300'?: string;
  '400'?: string;
  '500'?: string;
  '600'?: string;
  '700'?: string;
  '800'?: string;
  '900'?: string;
}

export interface FontConfig {
  family: string;
  figmaName: string;
  weightMap: FontWeightMap;
}

export interface TypeGeometry {
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  fontFamily: 'display' | 'body' | 'mono';
  fontVariationSettings?: string;
}

export interface WeightVariant {
  name: WeightName;
  fontWeight: string;
  fontVariationSettings?: string;
}

export interface TypeScaleStep {
  geometry: TypeGeometry;
  defaultWeight: WeightName;
  weights: Partial<Record<WeightName, WeightVariant>>;
}

export interface TypographyConfig {
  fonts: {
    display: FontConfig;
    body: FontConfig;
    mono: FontConfig;
  };
  scale: TypographyScale;
}

export interface TypographyScale {
  displayLarge: TypeScaleStep;
  displayMedium: TypeScaleStep;
  displaySmall: TypeScaleStep;
  headlineLarge: TypeScaleStep;
  headlineMedium: TypeScaleStep;
  headlineSmall: TypeScaleStep;
  titleLarge: TypeScaleStep;
  titleMedium: TypeScaleStep;
  titleSmall: TypeScaleStep;
  bodyLarge: TypeScaleStep;
  bodyMedium: TypeScaleStep;
  bodySmall: TypeScaleStep;
  labelLarge: TypeScaleStep;
  labelMedium: TypeScaleStep;
  labelSmall: TypeScaleStep;
}

// Kept unchanged — used by Panda recipes and the resolveTypeStyle() shim.
export interface TypeStyle {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
  fontFamily?: 'display' | 'body' | 'mono';
  fontVariationSettings?: string;
}

// Spacing Types
export interface SpacingScale {
  none: string;
  xxs: string;
  xs: string;
  '2xs': string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

// Shape Types
export interface ShapeConfig {
  radii: RadiiScale;
  style: 'sharp' | 'rounded' | 'soft' | 'organic';
}

export interface RadiiScale {
  none: string;
  extraSmall: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
  full: string;
}

// Elevation Types
export interface ElevationConfig {
  levels: ElevationScale;
  style: 'shadow' | 'border' | 'blur' | 'flat';
}

export interface ElevationScale {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
}

// Motion Types
export interface MotionConfig {
  durations: DurationScale;
  easings: EasingScale;
  style: 'expressive' | 'productive' | 'minimal';
}

export interface DurationScale {
  instant: string;
  fast: string;
  normal: string;
  slow: string;
  slower: string;
}

export interface EasingScale {
  standard: string;
  standardDecelerate: string;
  standardAccelerate: string;
  emphasized: string;
  emphasizedDecelerate: string;
  emphasizedAccelerate: string;
}

// Border Types
export interface BorderConfig {
  widths: BorderWidthScale;
}

export interface BorderWidthScale {
  thin: string;
  medium: string;
  thick: string;
}
