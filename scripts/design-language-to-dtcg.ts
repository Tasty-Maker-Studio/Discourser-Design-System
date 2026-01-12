/**
 * Reverse Transform: DesignLanguageContract to DTCG
 *
 * Generates a single combined tokens.json file from the DesignLanguageContract
 * for importing into Figma. The combined format provides better UX in Figma
 * (similar to Material 3 Design Kit).
 *
 * Output: Single tokens.json with primitives + semantic (light) + semantic (dark)
 *
 * Usage: npm run transform:contract-to-dtcg
 */

import type {
  DesignLanguageContract,
  TonalPalette,
  SemanticColors,
} from '../src/contracts/design-language.contract';
import { material3Language } from '../src/languages/material3.language';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TONAL_STEPS = [
  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100,
] as const;

/**
 * Transform TonalPalette to DTCG format
 */
function tonalPaletteToDTCG(palette: TonalPalette, _paletteName: string) {
  const group: Record<string, unknown> = {
    $type: 'color',
  };

  for (const step of TONAL_STEPS) {
    group[String(step)] = {
      $value: palette[step],
    };
  }

  return group;
}

/**
 * Find which primitive a semantic color references
 * Returns alias string like "{primary.40}"
 */
function findPrimitiveAlias(
  hexValue: string,
  colors: DesignLanguageContract['colors'],
): string | null {
  const palettes = [
    'primary',
    'secondary',
    'tertiary',
    'neutral',
    'neutralVariant',
    'error',
  ] as const;

  for (const paletteName of palettes) {
    const palette = colors[paletteName];
    for (const step of TONAL_STEPS) {
      if (palette[step].toLowerCase() === hexValue.toLowerCase()) {
        return `{${paletteName}.${step}}`;
      }
    }
  }

  return null; // No matching primitive found
}

/**
 * Transform SemanticColors to DTCG format with aliases
 */
function semanticColorsToDTCG(
  semantic: SemanticColors,
  colors: DesignLanguageContract['colors'],
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  const semanticKeys: (keyof SemanticColors)[] = [
    'primary',
    'onPrimary',
    'primaryContainer',
    'onPrimaryContainer',
    'secondary',
    'onSecondary',
    'secondaryContainer',
    'onSecondaryContainer',
    'tertiary',
    'onTertiary',
    'tertiaryContainer',
    'onTertiaryContainer',
    'error',
    'onError',
    'errorContainer',
    'onErrorContainer',
    'surface',
    'onSurface',
    'surfaceVariant',
    'onSurfaceVariant',
    'surfaceContainerLowest',
    'surfaceContainerLow',
    'surfaceContainer',
    'surfaceContainerHigh',
    'surfaceContainerHighest',
    'outline',
    'outlineVariant',
    'inverseSurface',
    'inverseOnSurface',
    'inversePrimary',
    'background',
    'onBackground',
    'scrim',
    'shadow',
  ];

  for (const key of semanticKeys) {
    const hexValue = semantic[key];
    const alias = findPrimitiveAlias(hexValue, colors);

    result[key] = {
      $type: 'color',
      $value: alias || hexValue, // Use alias if found, otherwise raw hex
    };
  }

  return result;
}

/**
 * Main reverse transform function
 */
export function transformDesignLanguageToDTCG(
  language: DesignLanguageContract,
): {
  primitives: Record<string, unknown>;
  semanticLight: Record<string, unknown>;
  semanticDark: Record<string, unknown>;
} {
  // Transform primitives
  const primitives: Record<string, unknown> = {};
  const palettes = [
    'primary',
    'secondary',
    'tertiary',
    'neutral',
    'neutralVariant',
    'error',
  ] as const;

  for (const paletteName of palettes) {
    primitives[paletteName] = tonalPaletteToDTCG(
      language.colors[paletteName],
      paletteName,
    );
  }

  // Transform semantics
  const semanticLight = semanticColorsToDTCG(
    language.semantic,
    language.colors,
  );
  const semanticDark = language.semanticDark
    ? semanticColorsToDTCG(language.semanticDark, language.colors)
    : {};

  return {
    primitives,
    semanticLight,
    semanticDark,
  };
}

/**
 * Combine primitives and semantics into single DTCG file for Figma import
 * Architecture decision: Single file for better Figma UX (like Material 3 Design Kit)
 *
 * Uses Figma slash notation to create hierarchical structure:
 * - Primitives: "paletteName/tone" (e.g., "primary/40")
 * - Semantics: flat names (e.g., "primary", "error")
 *
 * This avoids naming collisions (e.g., "error" palette vs "error" semantic token)
 */
function combineToDTCG(
  primitives: Record<string, unknown>,
  semanticLight: Record<string, unknown>,
  semanticDark: Record<string, unknown>,
): Record<string, unknown> {
  const combined: Record<string, unknown> = {};

  // Add primitives using slash notation (paletteName/tone)
  // This creates Figma variable groups like "primary/0", "primary/10", etc.
  for (const [paletteName, palette] of Object.entries(primitives)) {
    if (typeof palette !== 'object' || palette === null) continue;

    // Extract $type from palette
    const paletteRecord = palette as Record<string, unknown>;
    const paletteType = paletteRecord.$type;

    // Add each tone as a separate top-level token with slash notation
    for (const [key, value] of Object.entries(paletteRecord)) {
      if (key === '$type') continue; // Skip $type property

      // Create flattened token with slash notation
      if (typeof value === 'object' && value !== null) {
        combined[`${paletteName}/${key}`] = {
          $type: paletteType,
          ...(value as object),
        };
      }
    }
  }

  // Add semantic light tokens at root level (no slash)
  // These will be distinct from primitives due to lack of slash
  for (const [key, value] of Object.entries(semanticLight)) {
    combined[key] = value;
  }

  // Add semantic dark tokens if present (optional for V1)
  // Note: For multi-mode support in Figma, dark mode should be handled differently
  // For now, we use a "dark-" prefix to distinguish from light mode
  if (Object.keys(semanticDark).length > 0) {
    for (const [key, value] of Object.entries(semanticDark)) {
      combined[`dark-${key}`] = value;
    }
  }

  return combined;
}

// ============================================================================
// Main Script Execution
// ============================================================================

async function main() {
  console.log('🔄 Starting DesignLanguageContract → DTCG transformation...\n');

  // Load the Material 3 language
  const language = material3Language;

  console.log('📖 Reading Material 3 language data...');
  console.log(`   - Name: ${language.name}`);
  console.log(`   - Version: ${language.version}`);
  console.log(`   - 6 color palettes with 13 tones each`);
  console.log(
    `   - ${Object.keys(language.semantic).length} semantic tokens (light)`,
  );
  if (language.semanticDark) {
    console.log(
      `   - ${Object.keys(language.semanticDark).length} semantic tokens (dark)`,
    );
  }

  console.log('\n🔧 Transforming to DTCG format...');

  // Transform
  const { primitives, semanticLight, semanticDark } =
    transformDesignLanguageToDTCG(language);

  console.log('   ✓ Primitives transformed');
  console.log('   ✓ Semantic (light) transformed');
  if (Object.keys(semanticDark).length > 0) {
    console.log('   ✓ Semantic (dark) transformed');
  }

  // Combine into single file for Figma import
  console.log('\n📦 Combining into single tokens.json for Figma import...');
  const combined = combineToDTCG(primitives, semanticLight, semanticDark);

  // Output paths
  const outputDir = path.join(__dirname, '..', 'tokens');
  const combinedPath = path.join(outputDir, 'tokens.json');

  // Also output separate files for reference/debugging
  const primitivesPath = path.join(outputDir, 'primitives-generated.json');
  const semanticLightPath = path.join(
    outputDir,
    'semantic-light-generated.json',
  );
  const semanticDarkPath = path.join(outputDir, 'semantic-dark-generated.json');

  console.log('\n💾 Writing output files...');

  // Write combined file (for Figma import)
  fs.writeFileSync(combinedPath, JSON.stringify(combined, null, 2), 'utf-8');
  console.log(
    `   ✓ ${path.relative(globalThis.process.cwd(), combinedPath)} (for Figma import)`,
  );

  // Write separate files (for reference/debugging)
  fs.writeFileSync(
    primitivesPath,
    JSON.stringify(primitives, null, 2),
    'utf-8',
  );
  console.log(
    `   ✓ ${path.relative(globalThis.process.cwd(), primitivesPath)} (reference)`,
  );

  fs.writeFileSync(
    semanticLightPath,
    JSON.stringify(semanticLight, null, 2),
    'utf-8',
  );
  console.log(
    `   ✓ ${path.relative(globalThis.process.cwd(), semanticLightPath)} (reference)`,
  );

  if (Object.keys(semanticDark).length > 0) {
    fs.writeFileSync(
      semanticDarkPath,
      JSON.stringify(semanticDark, null, 2),
      'utf-8',
    );
    console.log(
      `   ✓ ${path.relative(globalThis.process.cwd(), semanticDarkPath)} (reference)`,
    );
  }

  // Summary
  console.log('\n✅ Reverse transformation complete!\n');
  console.log('Summary:');
  console.log(`   - ${Object.keys(primitives).length} primitive palettes`);
  console.log(
    `   - ${Object.keys(semanticLight).length} semantic tokens (light)`,
  );
  if (Object.keys(semanticDark).length > 0) {
    console.log(
      `   - ${Object.keys(semanticDark).length} semantic tokens (dark)`,
    );
  }
  console.log(
    `   - ${Object.keys(combined).length} total tokens in combined file`,
  );
  console.log('\nNext step: Import tokens.json into Figma using the plugin');
  console.log();
}

// Run if executed directly (ES module)
main().catch((error) => {
  console.error('\n❌ Error during reverse transformation:');
  console.error(error);
  globalThis.process.exit(1);
});
