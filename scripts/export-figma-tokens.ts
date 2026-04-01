/**
 * Export Design System Tokens for Figma
 *
 * Generates three DTCG-compatible output files from material3Language.
 * Zero hardcoded values — all data sourced programmatically.
 *
 * Usage: pnpm figma:export
 */

import { material3Language } from '../src/languages/material3.language';
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
// Builder 5: Text styles — typography
// ---------------------------------------------------------------------------

type TextStyleEntry = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  figmaTextStyle: string;
};

function buildTextStyles(): Record<string, TextStyleEntry> {
  const result: Record<string, TextStyleEntry> = {};
  const lang = material3Language;

  for (const [key, step] of Object.entries(lang.typography.scale)) {
    const fontKey = step.geometry.fontFamily as 'display' | 'body' | 'mono';
    const fontConfig = lang.typography.fonts[fontKey];
    const fontFamily = fontConfig.figmaName;
    const defaultVariant = step.weights[step.defaultWeight];
    const fontWeight = Number(defaultVariant?.fontWeight ?? '400');

    result[key] = {
      fontFamily,
      fontSize: px(step.geometry.fontSize),
      fontWeight,
      lineHeight: px(step.geometry.lineHeight),
      letterSpacing: px(step.geometry.letterSpacing),
      figmaTextStyle: key,
    };
  }

  return result;
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

const distDir = path.join(__dirname, '..', 'dist');

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

const figmaVariablesPath = path.join(distDir, 'figma-variables.json');
writeJson(figmaVariablesPath, figmaVariables);

// --- figma-effect-styles.json ---
const effectStyles = buildEffectStyles();
const effectStylesPath = path.join(distDir, 'figma-effect-styles.json');
writeJson(effectStylesPath, effectStyles);

// --- figma-text-styles.json ---
const textStyles = buildTextStyles();
const textStylesPath = path.join(distDir, 'figma-text-styles.json');
writeJson(textStylesPath, textStyles);

// --- tokens/tokens.json (copy of figma-variables.json) ---
const tokensPath = path.join(__dirname, '..', 'tokens', 'tokens.json');
writeJson(tokensPath, figmaVariables);

// --- Summary ---
console.log(
  `✅ dist/figma-variables.json — ${Object.keys(primitives).length} Primitives, ${Object.keys(semantic).length} Semantic, ${Object.keys(spacingAndShape).length} Spacing & Shape tokens`,
);
console.log(
  `✅ dist/figma-effect-styles.json — ${Object.keys(effectStyles.elevation).length} elevation levels`,
);
console.log(
  `✅ dist/figma-text-styles.json — ${Object.keys(textStyles).length} text styles`,
);
console.log(`✅ tokens/tokens.json updated`);
