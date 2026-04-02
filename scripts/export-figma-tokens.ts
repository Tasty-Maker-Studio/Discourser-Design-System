/**
 * Export Design System Tokens for Figma
 *
 * Generates three DTCG-compatible output files from material3Language.
 * Zero hardcoded values — all data sourced programmatically.
 *
 * Usage: pnpm figma:export
 */

import { material3Language } from '../src/languages/material3.language';
import type { WeightVariant } from '../src/contracts/design-language.contract';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// ---------------------------------------------------------------------------
// Helper: strip px suffix and convert to number
// ---------------------------------------------------------------------------

function px(value: string): number {
  return parseFloat(value.replace('px', ''));
}

function ms(value: string): number {
  return parseFloat(value.replace('ms', ''));
}

// ---------------------------------------------------------------------------
// Helper: camelCase semantic key → Figma path (/ separator)
// ---------------------------------------------------------------------------

function semanticKeyToFigmaPath(key: string): string {
  // Surface container variants
  if (key === 'surfaceContainer') return 'surface/container';
  if (key === 'surfaceContainerLow') return 'surface/container/low';
  if (key === 'surfaceContainerLowest') return 'surface/container/lowest';
  if (key === 'surfaceContainerHigh') return 'surface/container/high';
  if (key === 'surfaceContainerHighest') return 'surface/container/highest';

  // surfaceVariant / onSurfaceVariant
  if (key === 'surfaceVariant') return 'surface/variant';
  if (key === 'onSurfaceVariant') return 'onSurface/variant';

  // outlineVariant
  if (key === 'outlineVariant') return 'outline/variant';

  // inverse*
  if (key === 'inverseSurface') return 'inverse/surface';
  if (key === 'inverseOnSurface') return 'inverse/onSurface';
  if (key === 'inversePrimary') return 'inverse/primary';

  // on*Container (e.g. onPrimaryContainer → onPrimary/container)
  const onContainerMatch = key.match(/^(on[A-Z][a-z]+)Container$/);
  if (onContainerMatch) {
    return `${onContainerMatch[1]}/container`;
  }

  // *Container (e.g. primaryContainer → primary/container)
  const containerMatch = key.match(/^([a-z][a-zA-Z]+)Container$/);
  if (containerMatch) {
    return `${containerMatch[1]}/container`;
  }

  // All others pass through as-is
  return key;
}

// ---------------------------------------------------------------------------
// Builder 1: Primitives collection — tonal palettes
// ---------------------------------------------------------------------------

type DtcgColorEntry = {
  $type: 'color';
  $value: Record<string, string>;
};

type DtcgNumberEntry = {
  $type: 'number';
  $value: Record<string, number>;
};

function buildPrimitives(): Record<string, DtcgColorEntry> {
  const result: Record<string, DtcgColorEntry> = {};
  const lang = material3Language;

  for (const [paletteName, tones] of Object.entries(lang.colors)) {
    for (const [tone, hex] of Object.entries(tones)) {
      const key = `${paletteName}/${tone}`;
      result[key] = {
        $type: 'color',
        $value: { Value: String(hex) },
      };
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Builder 2: Semantic collection — light + dark modes
// ---------------------------------------------------------------------------

function buildSemantic(): Record<string, DtcgColorEntry> {
  const result: Record<string, DtcgColorEntry> = {};
  const lang = material3Language;

  // Iterate light keys (semantic and semanticDark must have identical key sets)
  for (const [key, lightValue] of Object.entries(lang.semantic)) {
    const darkValue = (lang.semanticDark as unknown as Record<string, string>)[
      key
    ];
    const figmaPath = semanticKeyToFigmaPath(key);

    result[figmaPath] = {
      $type: 'color',
      $value: {
        Light: lightValue,
        Dark: darkValue,
      },
    };
  }

  return result;
}

// ---------------------------------------------------------------------------
// Builder 3: Spacing & Shape collection — numeric tokens
// ---------------------------------------------------------------------------

function buildSpacingAndShape(): Record<string, DtcgNumberEntry> {
  const result: Record<string, DtcgNumberEntry> = {};
  const lang = material3Language;

  // Spacing
  for (const [key, value] of Object.entries(lang.spacing)) {
    result[`spacing/${key}`] = {
      $type: 'number',
      $value: { Value: px(value) },
    };
  }

  // Radii
  for (const [key, value] of Object.entries(lang.shape.radii)) {
    result[`radii/${key}`] = {
      $type: 'number',
      $value: { Value: px(value) },
    };
  }

  // Border widths
  for (const [key, value] of Object.entries(lang.border.widths)) {
    result[`border/${key}`] = {
      $type: 'number',
      $value: { Value: px(value) },
    };
  }

  // Durations
  for (const [key, value] of Object.entries(lang.motion.durations)) {
    result[`duration/${key}`] = {
      $type: 'number',
      $value: { Value: ms(value) },
    };
  }

  return result;
}

// ---------------------------------------------------------------------------
// Builder 4: Effect styles — elevation
// ---------------------------------------------------------------------------

type ElevationEntry = {
  value: string;
  description: string;
};

const elevationDescriptions: Record<string, string> = {
  level0: 'No elevation — flat surfaces',
  level1: 'Cards at rest, contained buttons (semantic: xs)',
  level2: 'Cards on hover, raised buttons (semantic: sm)',
  level3: 'Dialogs, dropdowns, popovers (semantic: md)',
  level4: 'Navigation drawers, modal sheets (semantic: lg)',
  level5: 'FABs, tooltips, snackbars (semantic: xl)',
};

function buildEffectStyles(): { elevation: Record<string, ElevationEntry> } {
  const elevation: Record<string, ElevationEntry> = {};
  const lang = material3Language;

  for (const [key, value] of Object.entries(lang.elevation.levels)) {
    elevation[key] = {
      value,
      description: elevationDescriptions[key] ?? key,
    };
  }

  return { elevation };
}

// ---------------------------------------------------------------------------
// Helper: font style label → numeric font weight
// ---------------------------------------------------------------------------

const fontStyleToWeight: Record<string, number> = {
  Thin: 100,
  Light: 300,
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
};

// Convert a Figma group path (e.g. "Display/Large") to a camelCase step key
// (e.g. "displayLarge") — the inverse of stepKeyToFigmaGroup.
function figmaGroupToStepKey(group: string): string {
  const parts = group.split('/');
  return (
    parts[0].toLowerCase() +
    parts
      .slice(1)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join('')
  );
}

// ---------------------------------------------------------------------------
// Builder 5: Text styles — typography (one entry per weight variant = 56 total)
// ---------------------------------------------------------------------------

type TextStyleEntry = {
  name: string;
  description: string;
  fontFamily: string;
  fontStyle: string;
  fontSize: number;
  lineHeightPx: number;
  letterSpacing: number;
  fontVariationSettings?: string;
};

// Convert camelCase scale key to slash-separated Figma group path.
// e.g. "displayLarge" → "Display/Large", "headlineMedium" → "Headline/Medium"
function stepKeyToFigmaGroup(key: string): string {
  return key
    .replace(/([A-Z])/g, '/$1')
    .replace(/^(.)/, (c) => c.toUpperCase())
    .split('/')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('/');
}

// Capitalize first letter of a WeightName for the style label.
// e.g. "semiBold" → "SemiBold", "regular" → "Regular"
function weightLabel(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function buildTextStyles(): TextStyleEntry[] {
  const result: TextStyleEntry[] = [];
  const lang = material3Language;

  for (const [key, step] of Object.entries(lang.typography.scale)) {
    const fontKey = step.geometry.fontFamily as 'display' | 'body' | 'mono';
    const fontConfig = lang.typography.fonts[fontKey];
    const group = stepKeyToFigmaGroup(key);

    for (const [weightName, variantRaw] of Object.entries(step.weights)) {
      const variant = variantRaw as WeightVariant | undefined;
      if (!variant) continue;
      const fontStyle =
        fontConfig.weightMap[
          variant.fontWeight as keyof typeof fontConfig.weightMap
        ] ?? variant.fontWeight;

      const entry: TextStyleEntry = {
        name: `${group}/${weightLabel(weightName)}`,
        description: `dds:typography.scale.${key}.weights.${weightName}`,
        fontFamily: fontConfig.figmaName,
        fontStyle,
        fontSize: px(step.geometry.fontSize),
        lineHeightPx: px(step.geometry.lineHeight),
        letterSpacing: px(step.geometry.letterSpacing),
      };

      if (step.geometry.fontVariationSettings) {
        entry.fontVariationSettings = step.geometry.fontVariationSettings;
      }

      result.push(entry);
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Builder 6: Token name mapping — docs/token-name-mapping.json
// ---------------------------------------------------------------------------

type TextStyleMappingEntry = {
  figmaTextStyle: string;
  figmaDescription: string;
  ddsTokenPath: string;
  pandaTextStyle: string;
  fontFamily: string;
  fontStyle: string;
  fontWeight: number;
  fontSize: number;
  lineHeightPx: number;
  letterSpacing: number;
  isDefaultWeight: boolean;
  exampleUsage: string;
};

function buildTokenNameMapping(textStyles: TextStyleEntry[]): void {
  const mappingPath = path.join(
    __dirname,
    '..',
    'docs',
    'token-name-mapping.json',
  );
  const existing = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
  const scale = material3Language.typography.scale as unknown as Record<
    string,
    { defaultWeight?: string }
  >;

  const textStyleEntries: TextStyleMappingEntry[] = textStyles.map((entry) => {
    // entry.name = "Display/Large/SemiBold"
    // entry.description = "dds:typography.scale.displayLarge.weights.semiBold"
    const nameParts = entry.name.split('/');
    const group = nameParts.slice(0, -1).join('/'); // "Display/Large"
    const stepKey = figmaGroupToStepKey(group); // "displayLarge"
    const ddsTokenPath = entry.description.replace('dds:', '');
    const weightName = ddsTokenPath.split('.').pop() ?? '';
    const isDefaultWeight = scale[stepKey]?.defaultWeight === weightName;

    return {
      figmaTextStyle: entry.name,
      figmaDescription: entry.description,
      ddsTokenPath,
      pandaTextStyle: stepKey,
      fontFamily: entry.fontFamily,
      fontStyle: entry.fontStyle,
      fontWeight: fontStyleToWeight[entry.fontStyle] ?? 400,
      fontSize: entry.fontSize,
      lineHeightPx: entry.lineHeightPx,
      letterSpacing: entry.letterSpacing,
      isDefaultWeight,
      exampleUsage: `textStyle: '${stepKey}'`,
    };
  });

  const updated = {
    ...existing,
    version: packageJson.version ?? '0.0.0',
    generatedAt: new Date().toISOString(),
    shadowSemanticAliases: buildShadowSemanticAliases(),
    textStyles: textStyleEntries,
  };

  writeJson(mappingPath, updated);
}

// ---------------------------------------------------------------------------
// Builder 7: Shadow semantic aliases — docs/token-name-mapping.json
// ---------------------------------------------------------------------------

const shadowAliasDescriptions: Record<string, string> = {
  xs: 'Cards at rest — level1',
  sm: 'Cards on hover, panels — level2',
  md: 'Dialogs, dropdowns, popovers — level3',
  lg: 'Navigation drawers, modal sheets — level4',
  xl: 'FABs, tooltips, snackbars — level5',
  '2xl': 'Large overlays — level5',
  inset: 'Inset shadow for recessed elements (inputs, wells)',
};

const shadowAliasResolvesTo: Record<string, string> = {
  xs: 'level1',
  sm: 'level2',
  md: 'level3',
  lg: 'level4',
  xl: 'level5',
  '2xl': 'level5',
  inset: 'custom inset using neutral.a4/a6',
};

function buildShadowSemanticAliases() {
  return Object.keys(shadowAliasResolvesTo).map((token) => ({
    pandaToken: token,
    cssProperty: `--shadows-${token}`,
    resolvesTo: shadowAliasResolvesTo[token],
    description: shadowAliasDescriptions[token] ?? token,
    exampleUsage: `shadow: '${token}'`,
  }));
}

// ---------------------------------------------------------------------------
// Main: assemble, write files, print summary
// ---------------------------------------------------------------------------

function ensureDir(filePath: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeJson(filePath: string, data: unknown): void {
  ensureDir(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const exportDir = path.join(__dirname, '..', 'tokens', 'export-to-figma');

// --- figma-variables.json ---
const primitives = buildPrimitives();
const semantic = buildSemantic();
const spacingAndShape = buildSpacingAndShape();

const figmaVariables = {
  $metadata: {
    version: packageJson.version ?? '0.0.0',
    generated: new Date().toISOString(),
  },
  Primitives: primitives,
  Semantic: semantic,
  'Spacing & Shape': spacingAndShape,
};

const figmaVariablesPath = path.join(exportDir, 'figma-variables.json');
writeJson(figmaVariablesPath, figmaVariables);

// --- figma-effect-styles.json ---
const effectStyles = buildEffectStyles();
const effectStylesPath = path.join(exportDir, 'figma-effect-styles.json');
writeJson(effectStylesPath, effectStyles);

// --- figma-text-styles.json ---
const textStyles = buildTextStyles();
const textStylesPath = path.join(exportDir, 'figma-text-styles.json');
writeJson(textStylesPath, textStyles);

// --- docs/token-name-mapping.json ---
buildTokenNameMapping(textStyles);

// --- Summary ---
console.log(
  `✅ tokens/export-to-figma/figma-variables.json — ${Object.keys(primitives).length} Primitives, ${Object.keys(semantic).length} Semantic, ${Object.keys(spacingAndShape).length} Spacing & Shape tokens`,
);
console.log(
  `✅ tokens/export-to-figma/figma-effect-styles.json — ${Object.keys(effectStyles.elevation).length} elevation levels`,
);
console.log(
  `✅ tokens/export-to-figma/figma-text-styles.json — ${textStyles.length} text styles`,
);
console.log(
  `✅ docs/token-name-mapping.json updated — ${textStyles.length} text style entries`,
);
