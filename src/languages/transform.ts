import type {
  DesignLanguageContract,
  TonalPalette,
  TypeScaleStep,
} from '../contracts/design-language.contract';
/**
 * Transforms a DesignLanguageContract into Panda CSS theme configuration
 */
export function transformToPandaTheme(language: DesignLanguageContract) {
  return {
    tokens: transformTokens(language),
    semanticTokens: transformSemanticTokens(language),
    textStyles: transformTextStyles(language),
  };
}

function transformTokens(language: DesignLanguageContract) {
  return {
    colors: transformColorPalettes(
      language.colors as unknown as Record<string, TonalPalette>,
    ),
    fonts: {
      display: { value: language.typography.fonts.display.family },
      body: { value: language.typography.fonts.body.family },
      mono: { value: language.typography.fonts.mono.family },
    },
    fontSizes: extractFontSizes(
      language.typography.scale as unknown as Record<string, TypeScaleStep>,
    ),
    lineHeights: extractLineHeights(
      language.typography.scale as unknown as Record<string, TypeScaleStep>,
    ),
    fontWeights: extractFontWeights(
      language.typography.scale as unknown as Record<string, TypeScaleStep>,
    ),
    letterSpacings: extractLetterSpacings(
      language.typography.scale as unknown as Record<string, TypeScaleStep>,
    ),
    spacing: objectToTokens(
      language.spacing as unknown as Record<string, string>,
    ),
    radii: objectToTokens(
      language.shape.radii as unknown as Record<string, string>,
    ),
    shadows: objectToTokens(
      language.elevation.levels as unknown as Record<string, string>,
    ),
    durations: objectToTokens(
      language.motion.durations as unknown as Record<string, string>,
    ),
    easings: objectToTokens(
      language.motion.easings as unknown as Record<string, string>,
    ),
    borderWidths: objectToTokens(
      language.border.widths as unknown as Record<string, string>,
    ),
  };
}

function transformSemanticTokens(_language: DesignLanguageContract) {
  // Semantic colors are now managed entirely by semantic-tokens.ts
  // This prevents flat hex tokens from overwriting the nested semantic token structure
  return {
    colors: {},
  };
}

function transformTextStyles(language: DesignLanguageContract) {
  const scale = language.typography.scale as unknown as Record<
    string,
    TypeScaleStep
  >;

  return Object.fromEntries(
    Object.entries(scale).map(([name, step]) => {
      const s = step as TypeScaleStep;
      const defaultVariant = s.weights[s.defaultWeight];
      const fontWeight = defaultVariant?.fontWeight ?? '400';
      return [
        name,
        {
          value: {
            fontFamily: `{fonts.${s.geometry.fontFamily}}`,
            fontSize: s.geometry.fontSize,
            lineHeight: s.geometry.lineHeight,
            fontWeight,
            letterSpacing: s.geometry.letterSpacing,
            ...(s.geometry.fontVariationSettings
              ? { fontVariationSettings: s.geometry.fontVariationSettings }
              : {}),
          },
        },
      ];
    }),
  );
}

function transformColorPalettes(palettes: Record<string, TonalPalette>) {
  return Object.fromEntries(
    Object.entries(palettes).map(([name, palette]) => [
      name,
      Object.fromEntries(
        Object.entries(palette).map(([tone, value]) => [tone, { value }]),
      ),
    ]),
  );
}

function objectToTokens<T extends Record<string, string>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, { value }]),
  );
}

function extractFontSizes(scale: Record<string, TypeScaleStep>) {
  return Object.fromEntries(
    Object.entries(scale).map(([name, step]) => [
      name,
      { value: step.geometry.fontSize },
    ]),
  );
}

function extractLineHeights(scale: Record<string, TypeScaleStep>) {
  return Object.fromEntries(
    Object.entries(scale).map(([name, step]) => [
      name,
      { value: step.geometry.lineHeight },
    ]),
  );
}

function extractFontWeights(scale: Record<string, TypeScaleStep>) {
  const weights = new Map<string, string>();
  Object.values(scale).forEach((step) => {
    Object.values(step.weights).forEach((variant) => {
      if (variant) weights.set(variant.fontWeight, variant.fontWeight);
    });
  });
  return Object.fromEntries(
    Array.from(weights.entries()).map(([key, value]) => [key, { value }]),
  );
}

function extractLetterSpacings(scale: Record<string, TypeScaleStep>) {
  return Object.fromEntries(
    Object.entries(scale).map(([name, step]) => [
      name,
      { value: step.geometry.letterSpacing },
    ]),
  );
}
