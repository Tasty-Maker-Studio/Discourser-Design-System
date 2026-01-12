import type { DesignLanguageContract, TonalPalette, SemanticColors } from '../contracts/design-language.contract';

/**
 * Transforms a DesignLanguageContract into Panda CSS theme configuration
 */
export function transformToPandaTheme(language: DesignLanguageContract) {
  return {
    tokens: transformTokens(language),
    semanticTokens: transformSemanticTokens(language),
    textStyles: transformTextStyles(language)
  };
}

function transformTokens(language: DesignLanguageContract) {
  return {
    colors: transformColorPalettes(language.colors as unknown as Record<string, TonalPalette>),
    fonts: {
      display: { value: language.typography.fonts.display },
      body: { value: language.typography.fonts.body },
      mono: { value: language.typography.fonts.mono }
    },
    fontSizes: extractFontSizes(language.typography.scale as unknown as Record<string, { fontSize: string }>),
    lineHeights: extractLineHeights(language.typography.scale as unknown as Record<string, { lineHeight: string }>),
    fontWeights: extractFontWeights(language.typography.scale as unknown as Record<string, { fontWeight: string }>),
    letterSpacings: extractLetterSpacings(language.typography.scale as unknown as Record<string, { letterSpacing: string }>),
    spacing: objectToTokens(language.spacing as unknown as Record<string, string>),
    radii: objectToTokens(language.shape.radii as unknown as Record<string, string>),
    shadows: objectToTokens(language.elevation.levels as unknown as Record<string, string>),
    durations: objectToTokens(language.motion.durations as unknown as Record<string, string>),
    easings: objectToTokens(language.motion.easings as unknown as Record<string, string>),
    borderWidths: objectToTokens(language.border.widths as unknown as Record<string, string>)
  };
}

function transformSemanticTokens(language: DesignLanguageContract) {
  const light = language.semantic;
  const dark = language.semanticDark || light; // Fallback to light if no dark

  return {
    colors: Object.fromEntries(
      Object.entries(light).map(([key, lightValue]) => [
        key,
        {
          value: {
            base: lightValue,
            _dark: dark[key as keyof SemanticColors] || lightValue
          }
        }
      ])
    )
  };
}

function transformTextStyles(language: DesignLanguageContract) {
  const scale = language.typography.scale;

  return Object.fromEntries(
    Object.entries(scale).map(([name, style]) => [
      name,
      {
        value: {
          fontFamily: style.fontFamily || 'body',
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing
        }
      }
    ])
  );
}

function transformColorPalettes(palettes: Record<string, TonalPalette>) {
  return Object.fromEntries(
    Object.entries(palettes).map(([name, palette]) => [
      name,
      Object.fromEntries(
        Object.entries(palette).map(([tone, value]) => [
          tone,
          { value }
        ])
      )
    ])
  );
}

function objectToTokens<T extends Record<string, string>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, { value }])
  );
}

function extractFontSizes(scale: Record<string, { fontSize: string }>) {
  return Object.fromEntries(
    Object.entries(scale).map(([name, style]) => [
      name,
      { value: style.fontSize }
    ])
  );
}

function extractLineHeights(scale: Record<string, { lineHeight: string }>) {
  return Object.fromEntries(
    Object.entries(scale).map(([name, style]) => [
      name,
      { value: style.lineHeight }
    ])
  );
}

function extractFontWeights(scale: Record<string, { fontWeight: string }>) {
  const weights = new Map<string, string>();
  Object.values(scale).forEach(style => {
    weights.set(style.fontWeight, style.fontWeight);
  });
  return Object.fromEntries(
    Array.from(weights.entries()).map(([key, value]) => [
      key,
      { value }
    ])
  );
}

function extractLetterSpacings(scale: Record<string, { letterSpacing: string }>) {
  return Object.fromEntries(
    Object.entries(scale).map(([name, style]) => [
      name,
      { value: style.letterSpacing }
    ])
  );
}