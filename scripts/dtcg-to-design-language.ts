/**
 * Transform DTCG tokens to DesignLanguageContract
 *
 * Reads DTCG-compliant JSON files exported from Figma and transforms them
 * into the TypeScript DesignLanguageContract format used by the design system.
 *
 * Usage: npm run transform:dtcg-to-contract
 */

import type {
  DesignLanguageContract,
  TonalPalette,
  SemanticColors,
  ColorPalettes,
} from '../src/contracts/design-language.contract';
import { material3Language } from '../src/languages/material3.language';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// DTCG Types
interface DTCGColorToken {
  $type?: 'color';
  $value: string;
  $description?: string;
  $extensions?: unknown;
}

interface DTCGColorGroup {
  $type?: 'color';
  [key: string]: DTCGColorToken | string | undefined;
}

interface DTCGPrimitivesColors {
  primary: DTCGColorGroup;
  secondary: DTCGColorGroup;
  tertiary: DTCGColorGroup;
  neutral: DTCGColorGroup;
  neutralVariant: DTCGColorGroup;
  error: DTCGColorGroup;
}

// Tonal steps as defined in M3
const TONAL_STEPS = [
  '0',
  '10',
  '20',
  '30',
  '40',
  '50',
  '60',
  '70',
  '80',
  '90',
  '95',
  '99',
  '100',
] as const;

/**
 * Transform DTCG color group to TonalPalette
 */
function toTonalPalette(group: DTCGColorGroup): TonalPalette {
  const palette: Partial<TonalPalette> = {};

  for (const step of TONAL_STEPS) {
    const token = group[step] as DTCGColorToken;
    if (token && token.$value) {
      palette[parseInt(step) as keyof TonalPalette] = token.$value;
    }
  }

  // Validate all steps present
  for (const step of TONAL_STEPS) {
    if (!palette[parseInt(step) as keyof TonalPalette]) {
      throw new Error(`Missing tonal step: ${step}`);
    }
  }

  return palette as TonalPalette;
}

/**
 * Transform DTCG primitives to ColorPalettes
 */
function toColorPalettes(primitives: DTCGPrimitivesColors): ColorPalettes {
  return {
    primary: toTonalPalette(primitives.primary),
    secondary: toTonalPalette(primitives.secondary),
    tertiary: toTonalPalette(primitives.tertiary),
    neutral: toTonalPalette(primitives.neutral),
    neutralVariant: toTonalPalette(primitives.neutralVariant),
    error: toTonalPalette(primitives.error),
  };
}

/**
 * Resolve DTCG alias reference to actual hex value
 * Input: "{primary.40}"
 * Output: "#3F6900"
 */
function resolveAlias(alias: string, primitives: DTCGPrimitivesColors): string {
  // Check if it's an alias
  if (!alias.startsWith('{') || !alias.endsWith('}')) {
    return alias; // Already a raw value
  }

  const path = alias.slice(1, -1); // Remove { }
  const [palette, tone] = path.split('.');

  const group = primitives[palette as keyof DTCGPrimitivesColors];
  if (!group) {
    throw new Error(`Unknown palette: ${palette}`);
  }

  const token = group[tone] as DTCGColorToken;
  if (!token || !token.$value) {
    throw new Error(`Unknown tone: ${palette}.${tone}`);
  }

  return token.$value;
}

/**
 * Transform DTCG semantic tokens to SemanticColors
 */
function toSemanticColors(
  semantic: Record<string, DTCGColorToken>,
  primitives: DTCGPrimitivesColors,
): SemanticColors {
  const resolve = (key: string): string => {
    const token = semantic[key];
    if (!token) {
      throw new Error(`Missing semantic token: ${key}`);
    }
    return resolveAlias(token.$value, primitives);
  };

  return {
    primary: resolve('primary'),
    onPrimary: resolve('onPrimary'),
    primaryContainer: resolve('primaryContainer'),
    onPrimaryContainer: resolve('onPrimaryContainer'),
    secondary: resolve('secondary'),
    onSecondary: resolve('onSecondary'),
    secondaryContainer: resolve('secondaryContainer'),
    onSecondaryContainer: resolve('onSecondaryContainer'),
    tertiary: resolve('tertiary'),
    onTertiary: resolve('onTertiary'),
    tertiaryContainer: resolve('tertiaryContainer'),
    onTertiaryContainer: resolve('onTertiaryContainer'),
    error: resolve('error'),
    onError: resolve('onError'),
    errorContainer: resolve('errorContainer'),
    onErrorContainer: resolve('onErrorContainer'),
    surface: resolve('surface'),
    onSurface: resolve('onSurface'),
    surfaceVariant: resolve('surfaceVariant'),
    onSurfaceVariant: resolve('onSurfaceVariant'),
    surfaceContainerLowest: resolve('surfaceContainerLowest'),
    surfaceContainerLow: resolve('surfaceContainerLow'),
    surfaceContainer: resolve('surfaceContainer'),
    surfaceContainerHigh: resolve('surfaceContainerHigh'),
    surfaceContainerHighest: resolve('surfaceContainerHighest'),
    outline: resolve('outline'),
    outlineVariant: resolve('outlineVariant'),
    inverseSurface: resolve('inverseSurface'),
    inverseOnSurface: resolve('inverseOnSurface'),
    inversePrimary: resolve('inversePrimary'),
    background: resolve('surface'), // M3 uses surface for background
    onBackground: resolve('onSurface'),
    scrim: resolve('scrim'),
    shadow: resolve('shadow'),
  };
}

/**
 * Main transform function
 */
export function transformDTCGToDesignLanguage(
  primitiveColors: DTCGPrimitivesColors,
  semanticLight: Record<string, DTCGColorToken>,
  semanticDark?: Record<string, DTCGColorToken>,
): Pick<DesignLanguageContract, 'colors' | 'semantic' | 'semanticDark'> {
  const result: Pick<
    DesignLanguageContract,
    'colors' | 'semantic' | 'semanticDark'
  > = {
    colors: toColorPalettes(primitiveColors),
    semantic: toSemanticColors(semanticLight, primitiveColors),
  };

  // Only add semanticDark if provided
  if (semanticDark && Object.keys(semanticDark).length > 0) {
    result.semanticDark = toSemanticColors(semanticDark, primitiveColors);
  }

  return result;
}

// ============================================================================
// Main Script Execution
// ============================================================================

async function main() {
  console.log('🔄 Starting DTCG → DesignLanguageContract transformation...\n');

  // Read DTCG token files
  const tokensDir = path.join(__dirname, '..', 'tokens');
  const primitivesPath = path.join(tokensDir, 'primitives', 'colors.json');
  const semanticLightPath = path.join(
    tokensDir,
    'semantic',
    'colors.light.json',
  );
  const semanticDarkPath = path.join(tokensDir, 'semantic', 'colors.dark.json');

  console.log('📖 Reading DTCG token files...');
  console.log(
    `   - ${path.relative(globalThis.process.cwd(), primitivesPath)}`,
  );
  console.log(
    `   - ${path.relative(globalThis.process.cwd(), semanticLightPath)}`,
  );
  console.log(
    `   - ${path.relative(globalThis.process.cwd(), semanticDarkPath)}`,
  );

  const primitives = JSON.parse(
    fs.readFileSync(primitivesPath, 'utf-8'),
  ) as DTCGPrimitivesColors;
  const semanticLight = JSON.parse(
    fs.readFileSync(semanticLightPath, 'utf-8'),
  ) as Record<string, DTCGColorToken>;

  // Check if dark theme exists and has content
  let semanticDark: Record<string, DTCGColorToken> | undefined;
  if (fs.existsSync(semanticDarkPath)) {
    const darkContent = JSON.parse(fs.readFileSync(semanticDarkPath, 'utf-8'));
    // Only use if it has actual tokens (not just $description placeholder)
    if (Object.keys(darkContent).some((k) => !k.startsWith('$'))) {
      semanticDark = darkContent;
      console.log('   ✓ Dark theme tokens found');
    } else {
      console.log('   ⚠ Dark theme file is a placeholder (skipping)');
    }
  } else {
    console.log('   ⚠ Dark theme file not found (skipping)');
  }

  console.log(
    '\n🔧 Transforming DTCG tokens to DesignLanguageContract format...',
  );

  // Transform
  const transformed = transformDTCGToDesignLanguage(
    primitives,
    semanticLight,
    semanticDark,
  );

  console.log('   ✓ Primitives transformed');
  console.log('   ✓ Semantic (light) transformed');
  if (transformed.semanticDark) {
    console.log('   ✓ Semantic (dark) transformed');
  }

  // Update material3.language.ts
  const languagePath = path.join(
    __dirname,
    '..',
    'src',
    'languages',
    'material3.language.ts',
  );

  console.log(
    `\n📝 Updating ${path.relative(globalThis.process.cwd(), languagePath)}...`,
  );

  // Read current language file
  const currentLanguage = material3Language;

  // Build updated language object
  const updatedLanguage: DesignLanguageContract = {
    ...currentLanguage,
    colors: transformed.colors,
    semantic: transformed.semantic,
    ...(transformed.semanticDark
      ? { semanticDark: transformed.semanticDark }
      : {}),
  };

  // Generate TypeScript code
  const tsCode = generateLanguageFile(updatedLanguage);
  fs.writeFileSync(languagePath, tsCode, 'utf-8');

  console.log('   ✓ File updated successfully');

  // Summary
  console.log('\n✅ Transformation complete!\n');
  console.log('Summary:');
  console.log(`   - 6 color palettes with 13 tones each`);
  console.log(
    `   - ${Object.keys(transformed.semantic).length} semantic tokens (light)`,
  );
  if (transformed.semanticDark) {
    console.log(
      `   - ${Object.keys(transformed.semanticDark).length} semantic tokens (dark)`,
    );
  }
  console.log();
}

/**
 * Generate TypeScript code for material3.language.ts
 */
function generateLanguageFile(language: DesignLanguageContract): string {
  return `import type { DesignLanguageContract } from '../contracts/design-language.contract';

/**
 * Material Design 3 Language Implementation
 *
 * Source color: #63A002 (TastyMakers green)
 * Generated via DTCG transform: ${new Date().toISOString().split('T')[0]}
 */
export const material3Language: DesignLanguageContract = ${JSON.stringify(language, null, 2)};
`;
}

// Run if executed directly (ES module check)
// In ES modules, there's no require.main, so we just run the main function
main().catch((error) => {
  console.error('\n❌ Error during transformation:');
  console.error(error);
  globalThis.process.exit(1);
});
