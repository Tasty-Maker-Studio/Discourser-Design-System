#!/usr/bin/env tsx

/**
 * Organize Figma Token Exports
 *
 * Manual script to organize exported tokens from figma-token-sync
 * into the proper file structure for Discourser-Design-System.
 *
 * Usage: npm run organize-tokens
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json to get project metadata
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Gap 3: M3 semantic token names — maps lowercase key → canonical camelCase key
const M3_SEMANTIC_NAMES: Record<string, string> = {
  primary: 'primary',
  onprimary: 'onPrimary',
  primarycontainer: 'primaryContainer',
  onprimarycontainer: 'onPrimaryContainer',
  secondary: 'secondary',
  onsecondary: 'onSecondary',
  secondarycontainer: 'secondaryContainer',
  onsecondarycontainer: 'onSecondaryContainer',
  tertiary: 'tertiary',
  ontertiary: 'onTertiary',
  tertiarycontainer: 'tertiaryContainer',
  ontertiarycontainer: 'onTertiaryContainer',
  error: 'error',
  onerror: 'onError',
  errorcontainer: 'errorContainer',
  onerrorcontainer: 'onErrorContainer',
  background: 'background',
  onbackground: 'onBackground',
  surface: 'surface',
  onsurface: 'onSurface',
  surfacevariant: 'surfaceVariant',
  onsurfacevariant: 'onSurfaceVariant',
  surfacecontainer: 'surfaceContainer',
  surfacecontainerlow: 'surfaceContainerLow',
  surfacecontainerhigh: 'surfaceContainerHigh',
  surfacecontainerlowest: 'surfaceContainerLowest',
  surfacecontainerhighest: 'surfaceContainerHighest',
  outline: 'outline',
  outlinevariant: 'outlineVariant',
  shadow: 'shadow',
  scrim: 'scrim',
  inversesurface: 'inverseSurface',
  inverseonsurface: 'inverseOnSurface',
  inverseprimary: 'inversePrimary',
};

// Gap 4: M3 palette name normalization — maps lowercase → correct casing
const M3_PALETTE_CASING: Record<string, string> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  neutral: 'neutral',
  neutralvariant: 'neutralVariant',
  error: 'error',
};

// Normalize a semantic key to camelCase using the M3_SEMANTIC_NAMES lookup.
// Emits a console.warn for unknown keys so they are visible during script runs.
function normalizeSemanticKey(key: string): string {
  const lower = key.toLowerCase();
  const camel = M3_SEMANTIC_NAMES[lower];
  if (camel === undefined) {
    console.warn(`⚠ Unknown semantic token key: "${key}" — emitting as-is`);
    return key;
  }
  return camel;
}

// Normalize a DTCG alias $value string so the palette name uses correct casing.
// Input:  "{neutralvariant.90}"
// Output: "{neutralVariant.90}"
function normalizeAliasValue(value: string): string {
  return value.replace(/^\{(\w+)\.(\w+)\}$/, (_match, palette, tone) => {
    const lowerPalette = palette.toLowerCase();
    const normalized = M3_PALETTE_CASING[lowerPalette];
    if (normalized === undefined) {
      console.warn(
        `⚠ Unknown palette in alias reference: "${palette}" — emitting as-is`,
      );
      return `{${palette}.${tone}}`;
    }
    return `{${normalized}.${tone}}`;
  });
}

// Apply alias normalization to a single token's $value if it is a string alias.
function normalizeTokenValue(
  token: DTCGToken | TokenCollection,
): DTCGToken | TokenCollection {
  if ('$value' in token) {
    const t = token as DTCGToken;
    if (typeof t.$value === 'string') {
      return { ...t, $value: normalizeAliasValue(t.$value) };
    }
  }
  return token;
}

// Types
interface FigmaExportConfig {
  primitivesPath: string;
  semanticPath: string;
  outputDir: string;
}

interface DTCGToken {
  $type: string;
  $value: string;
  $description?: string;
  $extensions?: unknown;
}

interface TokenCollection {
  [key: string]: DTCGToken | TokenCollection;
}

interface OrganizedTokens {
  primitives: TokenCollection;
  semanticLight: TokenCollection;
  semanticDark: TokenCollection;
}

interface Summary {
  primitivesCount: number;
  lightCount: number;
  darkCount: number;
  totalCount: number;
  backupPath: string;
}

// Utility: Expand tilde in paths
function expandPath(filePath: string): string {
  if (filePath.startsWith('~/')) {
    return path.join(globalThis.process.env.HOME || '', filePath.slice(2));
  }
  return filePath;
}

// Utility: Count tokens recursively
function countTokens(obj: unknown): number {
  let count = 0;
  if (typeof obj !== 'object' || obj === null) return count;

  const record = obj as Record<string, unknown>;
  for (const key in record) {
    if (key.startsWith('$')) continue; // Skip metadata
    const value = record[key];
    if (value && typeof value === 'object') {
      const tokenValue = value as Record<string, unknown>;
      if (tokenValue.$value !== undefined) {
        count++;
      } else {
        count += countTokens(value);
      }
    }
  }
  return count;
}

// Step 1: Prompt for file paths
async function promptForFiles(): Promise<FigmaExportConfig> {
  console.log('\n📥 Figma Token Organizer\n');

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'primitivesPath',
      message: 'Path to primitives-colors.json:',
      default: '~/Downloads/primitives-colors.json',
      validate: (input: string) => {
        const expanded = expandPath(input);
        if (fs.existsSync(expanded)) {
          return true;
        }
        return `File not found: ${expanded}. Please check the path.`;
      },
    },
    {
      type: 'input',
      name: 'semanticPath',
      message: 'Path to semantic-colors.json:',
      default: '~/Downloads/semantic-colors.json',
      validate: (input: string) => {
        const expanded = expandPath(input);
        if (fs.existsSync(expanded)) {
          return true;
        }
        return `File not found: ${expanded}. Please check the path.`;
      },
    },
  ]);

  return {
    primitivesPath: expandPath(answers.primitivesPath),
    semanticPath: expandPath(answers.semanticPath),
    outputDir: path.join(__dirname, '..', 'tokens', 'imported-from-figma'),
  };
}

// Step 2: Validate and parse JSON file
async function validateAndParse(filePath: string): Promise<TokenCollection> {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(content);
    return parsed;
  } catch (error) {
    throw new Error(`Failed to parse ${filePath}: ${error}`);
  }
}

// Step 3: Create backup
async function createBackup(outputDir: string): Promise<string> {
  const timestamp =
    new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] +
    '-' +
    new Date().toTimeString().split(' ')[0].replace(/:/g, '');
  const backupDir = path.join(outputDir, `backup-${timestamp}`);

  // Create backup directory
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Files to backup
  const filesToBackup = [
    'primitives-generated.json',
    'semantic-light-generated.json',
    'semantic-dark-generated.json',
    'figma-variables.json',
  ];

  let backedUpCount = 0;
  for (const file of filesToBackup) {
    const sourcePath = path.join(outputDir, file);
    if (fs.existsSync(sourcePath)) {
      const destPath = path.join(backupDir, file);
      fs.copyFileSync(sourcePath, destPath);
      backedUpCount++;
    }
  }

  if (backedUpCount > 0) {
    console.log(`\n💾 Backup created: ${path.basename(backupDir)}/`);
    console.log(`   Backed up ${backedUpCount} file(s)\n`);
  }

  // Clean old backups (keep last 5)
  await cleanOldBackups(outputDir);

  return backupDir;
}

// Clean old backups (keep last 5)
async function cleanOldBackups(outputDir: string): Promise<void> {
  const backupPattern = /^backup-\d{4}-\d{2}-\d{2}-\d{6}$/;
  const entries = fs.readdirSync(outputDir);

  const backups = entries
    .filter((name) => backupPattern.test(name))
    .map((name) => ({
      name,
      path: path.join(outputDir, name),
      stat: fs.statSync(path.join(outputDir, name)),
    }))
    .sort((a, b) => b.stat.mtime.getTime() - a.stat.mtime.getTime());

  // Remove backups beyond the 5 most recent
  if (backups.length > 5) {
    const toRemove = backups.slice(5);
    for (const backup of toRemove) {
      fs.rmSync(backup.path, { recursive: true, force: true });
    }
  }
}

// Step 4: Split semantic tokens by mode
function splitSemanticModes(semantic: TokenCollection): {
  light: TokenCollection;
  dark: TokenCollection;
} {
  const light: TokenCollection = {};
  const dark: TokenCollection = {};

  for (const [tokenName, tokenData] of Object.entries(semantic)) {
    if (!tokenData || typeof tokenData !== 'object') continue;

    // Check if this is a token (has $value) or a nested group
    if ('$value' in tokenData) {
      // Handle tokens with dark- prefix
      if (tokenName.startsWith('dark-')) {
        const baseName = tokenName.replace(/^dark-/, '');
        dark[baseName] = tokenData;
      } else {
        // Default to light mode
        light[tokenName] = tokenData;
      }
    } else {
      // Recursively process nested groups
      const nested = splitSemanticModes(tokenData as TokenCollection);
      if (Object.keys(nested.light).length > 0) {
        light[tokenName] = nested.light;
      }
      if (Object.keys(nested.dark).length > 0) {
        dark[tokenName] = nested.dark;
      }
    }
  }

  return { light, dark };
}

// Step 5: Write organized token files
async function writeTokenFiles(
  tokens: OrganizedTokens,
  outputDir: string,
): Promise<void> {
  const files = [
    { name: 'primitives-generated.json', data: tokens.primitives },
    { name: 'semantic-light-generated.json', data: tokens.semanticLight },
    { name: 'semantic-dark-generated.json', data: tokens.semanticDark },
  ];

  for (const file of files) {
    const filePath = path.join(outputDir, file.name);
    fs.writeFileSync(filePath, JSON.stringify(file.data, null, 2), 'utf-8');
  }
}

// Step 6: Generate combined tokens.json
async function generateCombinedTokens(outputDir: string): Promise<void> {
  const primitivesPath = path.join(outputDir, 'primitives-generated.json');
  const lightPath = path.join(outputDir, 'semantic-light-generated.json');
  const darkPath = path.join(outputDir, 'semantic-dark-generated.json');

  const primitives = JSON.parse(fs.readFileSync(primitivesPath, 'utf-8'));
  const light = JSON.parse(fs.readFileSync(lightPath, 'utf-8'));
  const dark = JSON.parse(fs.readFileSync(darkPath, 'utf-8'));

  // Combine all tokens
  const combined: TokenCollection = {};

  // Add metadata at the top
  (combined as Record<string, unknown>).$metadata = {
    name: packageJson.name,
    version: packageJson.version,
    generated: new Date().toISOString(),
  };

  // Add primitives using slash notation (paletteName/tone)
  // This creates Figma variable groups like "primary/0", "primary/10", etc.
  for (const [paletteName, palette] of Object.entries(primitives)) {
    if (!palette || typeof palette !== 'object') continue;

    // Extract $type from palette if it exists
    const paletteType = (palette as Record<string, unknown>).$type;

    // Add each tone as a separate top-level token with slash notation
    for (const [key, value] of Object.entries(palette)) {
      if (key === '$type') continue; // Skip $type property

      // Create flattened token with slash notation
      if (paletteType && typeof value === 'object' && value !== null) {
        combined[`${paletteName}/${key}`] = {
          $type: paletteType,
          ...(value as object),
        } as DTCGToken | TokenCollection;
      } else if (typeof value === 'object' && value !== null) {
        combined[`${paletteName}/${key}`] = value as
          | DTCGToken
          | TokenCollection;
      }
    }
  }

  // Add light mode tokens at root level (no slash).
  // Gap 3: normalize keys to camelCase; Gap 4: normalize alias palette casing.
  for (const [key, value] of Object.entries(light)) {
    const normalizedKey = normalizeSemanticKey(key);
    combined[normalizedKey] = normalizeTokenValue(
      value as DTCGToken | TokenCollection,
    );
  }

  // Add dark mode tokens with dark- prefix, same normalizations applied.
  for (const [key, value] of Object.entries(dark)) {
    const normalizedKey = normalizeSemanticKey(key);
    combined[`dark-${normalizedKey}`] = normalizeTokenValue(
      value as DTCGToken | TokenCollection,
    );
  }

  const combinedPath = path.join(outputDir, 'figma-variables.json');
  fs.writeFileSync(combinedPath, JSON.stringify(combined, null, 2), 'utf-8');
}

// Step 7: Show summary
function showSummary(summary: Summary): void {
  console.log('\n✅ Organization complete!\n');
  console.log('📊 Summary:');
  console.log(`   • Primitives:       ${summary.primitivesCount} tokens`);
  console.log(`   • Semantic (light): ${summary.lightCount} tokens`);
  console.log(`   • Semantic (dark):  ${summary.darkCount} tokens`);
  console.log(`   • Total:            ${summary.totalCount} tokens\n`);

  console.log('📂 Files updated:');
  console.log('   ✓ tokens/imported-from-figma/primitives-generated.json');
  console.log('   ✓ tokens/imported-from-figma/semantic-light-generated.json');
  console.log('   ✓ tokens/imported-from-figma/semantic-dark-generated.json');
  console.log('   ✓ tokens/imported-from-figma/figma-variables.json\n');

  console.log(
    `💾 Backup saved: tokens/imported-from-figma/${path.basename(summary.backupPath)}/\n`,
  );

  console.log('Next steps:');
  console.log('   1. Review changes: git diff tokens/imported-from-figma/');
  console.log('   2. Test build: pnpm build:panda');
  console.log('   3. Commit changes: git add tokens/ && git commit\n');
}

// Main function
async function organizeFigmaExports(): Promise<void> {
  try {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('   FIGMA TOKEN ORGANIZER');
    console.log('═══════════════════════════════════════════════════════════');

    // 1. Prompt for file paths
    const config = await promptForFiles();

    console.log('\n⏳ Validating files...');

    // 2. Validate and parse
    const primitives = await validateAndParse(config.primitivesPath);
    const semantic = await validateAndParse(config.semanticPath);

    console.log('✅ Files validated successfully\n');

    // 3. Backup existing files
    console.log('⏳ Creating backup...');
    const backupPath = await createBackup(config.outputDir);

    // 4. Split semantic by mode
    console.log('⏳ Organizing tokens...');
    const { light, dark } = splitSemanticModes(semantic);

    // 5. Write organized files
    await writeTokenFiles(
      {
        primitives,
        semanticLight: light,
        semanticDark: dark,
      },
      config.outputDir,
    );

    // 6. Generate combined tokens.json
    console.log('⏳ Generating combined tokens.json...');
    await generateCombinedTokens(config.outputDir);

    // 7. Calculate summary
    const primitivesCount = countTokens(primitives);
    const lightCount = countTokens(light);
    const darkCount = countTokens(dark);
    const totalCount = primitivesCount + lightCount + darkCount;

    const summary: Summary = {
      primitivesCount,
      lightCount,
      darkCount,
      totalCount,
      backupPath,
    };

    // 8. Show summary
    showSummary(summary);
  } catch (error) {
    console.error(
      '\n❌ Error:',
      error instanceof Error ? error.message : error,
    );
    globalThis.process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${globalThis.process.argv[1]}`) {
  organizeFigmaExports();
}

export { organizeFigmaExports };
