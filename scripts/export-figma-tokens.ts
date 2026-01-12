/**
 * Export Design System Tokens for Figma MCP Integration
 *
 * This script generates a JSON manifest that maps semantic tokens
 * to their values and expected Figma Variable names.
 *
 * Usage: npx ts-node scripts/export-figma-tokens.ts
 */

import { material3Language } from '../src/languages/material3.language';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json to get the project name
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const projectName = packageJson.name || 'Design System';

interface FigmaTokenManifest {
  name: string;
  version: string;
  generated: string;
  tokens: {
    colors: {
      semantic: Record<string, TokenValue>;
      palettes: Record<string, Record<string, TokenValue>>;
    };
    spacing: Record<string, TokenValue>;
    radii: Record<string, TokenValue>;
    borderWidths: Record<string, TokenValue>;
    typography: {
      fonts: Record<string, string>;
      scale: Record<string, TypographyTokenValue>;
    };
    elevation: Record<string, string>;
  };
}

interface TokenValue {
  value: string;
  figmaVariable: string;
  description?: string;
}

interface TypographyTokenValue {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
  fontFamily: string;
  figmaTextStyle?: string;
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function generateManifest(): FigmaTokenManifest {
  const lang = material3Language;

  // Build semantic colors
  const semanticColors: Record<string, TokenValue> = {};
  for (const [key, value] of Object.entries(lang.semantic)) {
    const kebabKey = toKebabCase(key);
    semanticColors[key] = {
      value: value,
      figmaVariable: `semantic/${kebabKey}`,
      description: `Semantic color: ${key}`,
    };
  }

  // Build color palettes
  const palettes: Record<string, Record<string, TokenValue>> = {};
  for (const [paletteName, tones] of Object.entries(lang.colors)) {
    palettes[paletteName] = {};
    for (const [tone, value] of Object.entries(tones)) {
      palettes[paletteName][tone] = {
        value: String(value),
        figmaVariable: `palettes/${paletteName}/${tone}`,
        description: `${paletteName} palette, tone ${tone}`,
      };
    }
  }

  // Build spacing
  const spacing: Record<string, TokenValue> = {};
  for (const [key, value] of Object.entries(lang.spacing)) {
    spacing[key] = {
      value: value,
      figmaVariable: `spacing/${key}`,
      description: `Spacing: ${key}`,
    };
  }

  // Build radii
  const radii: Record<string, TokenValue> = {};
  for (const [key, value] of Object.entries(lang.shape.radii)) {
    const kebabKey = toKebabCase(key);
    radii[key] = {
      value: value,
      figmaVariable: `shape/radii/${kebabKey}`,
      description: `Border radius: ${key}`,
    };
  }

  // Build border widths
  const borderWidths: Record<string, TokenValue> = {};
  for (const [key, value] of Object.entries(lang.border.widths)) {
    borderWidths[key] = {
      value: value,
      figmaVariable: `border/widths/${key}`,
      description: `Border width: ${key}`,
    };
  }

  // Build typography
  const typographyScale: Record<string, TypographyTokenValue> = {};
  for (const [key, style] of Object.entries(lang.typography.scale)) {
    const kebabKey = toKebabCase(key);
    const fontKey = (style.fontFamily || 'body') as 'display' | 'body' | 'mono';
    typographyScale[key] = {
      fontSize: style.fontSize,
      lineHeight: style.lineHeight,
      fontWeight: style.fontWeight,
      letterSpacing: style.letterSpacing,
      fontFamily: lang.typography.fonts[fontKey],
      figmaTextStyle: `typography/${kebabKey}`,
    };
  }

  // Build elevation
  const elevation: Record<string, string> = {};
  for (const [key, value] of Object.entries(lang.elevation.levels)) {
    elevation[key] = value;
  }

  return {
    name: projectName,
    version: packageJson.version || lang.version,
    generated: new Date().toISOString(),
    tokens: {
      colors: {
        semantic: semanticColors,
        palettes: palettes,
      },
      spacing: spacing,
      radii: radii,
      borderWidths: borderWidths,
      typography: {
        fonts: lang.typography.fonts,
        scale: typographyScale,
      },
      elevation: elevation,
    },
  };
}

// Generate and write manifest
const manifest = generateManifest();
const outputPath = path.join(__dirname, '..', 'dist', 'figma-tokens.json');

// Ensure dist directory exists
const distDir = path.dirname(outputPath);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
console.log(`✅ Token manifest generated: ${outputPath}`);

// Also output to stdout for piping
console.log('\n📋 Token Summary:');
console.log(
  `   Colors: ${Object.keys(manifest.tokens.colors.semantic).length} semantic tokens`,
);
console.log(
  `   Spacing: ${Object.keys(manifest.tokens.spacing).length} tokens`,
);
console.log(`   Radii: ${Object.keys(manifest.tokens.radii).length} tokens`);
console.log(
  `   Border Widths: ${Object.keys(manifest.tokens.borderWidths).length} tokens`,
);
console.log(
  `   Typography: ${Object.keys(manifest.tokens.typography.scale).length} styles`,
);

export { generateManifest };
export type { FigmaTokenManifest };
