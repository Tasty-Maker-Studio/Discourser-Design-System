#!/usr/bin/env tsx
/**
 * scaffold-figma-connect.ts
 *
 * Scaffolds a .figma.tsx Code Connect file for a DDS component by:
 *   1. Reading the component's TypeScript source to determine type, imports, and props
 *   2. Querying the Figma REST API to get the component's REAL variant property names
 *      and values — no guessing
 *   3. Generating a figma.connect() call with accurate figma.enum() mappings
 *   4. Writing the .figma.tsx file next to the component source
 *
 * Usage (run from DDS repo root):
 *   pnpm scaffold:figma-connect --component Button --nodeId 38:7993
 *   pnpm scaffold:figma-connect --component SettingsPopover --nodeId 810:5398
 *   pnpm scaffold:figma-connect --component Badge --nodeId XX:XXXX --type simple
 *   pnpm scaffold:figma-connect --component Accordion --nodeId 38:8232 --dry-run
 *
 * Options:
 *   --component   Component name, e.g. Button (required)
 *   --nodeId      Figma node ID, e.g. 38:7993 or 38-7993 (required)
 *   --type        Override type detection: simple | compound | composite
 *   --dry-run     Print generated content without writing
 *   --force       Overwrite existing .figma.tsx file
 *   --skip-figma  Skip Figma variant query (use when FIGMA_TOKEN is not set)
 *
 * Environment variables:
 *   FIGMA_TOKEN   Figma personal access token — required for variant query
 *                 Get from Figma → Settings → Personal access tokens
 *                 Add to .env.local: FIGMA_TOKEN=figd_xxxx
 *
 * Lookup tables (update these when you find new Figma → DDS naming mismatches):
 *   FIGMA_PROP_TO_DDS_PROP   Figma property name → DDS prop name
 *   FIGMA_VALUE_TO_DDS_VALUE Figma variant value → DDS prop value (per property)
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const FIGMA_FILE_KEY = 'GaHmFfmvO4loUzuZS4TgEz';
const FIGMA_FILE_NAME = 'Discourser.AI--V1';

// ─── Load .env.local if present ───────────────────────────────────────────────
const envPath = join(ROOT, '.env.local');
if (existsSync(envPath)) {
  const env = readFileSync(envPath, 'utf-8');
  for (const line of env.split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

// ─── DDS prop name mapping ────────────────────────────────────────────────────
// Maps Figma property names → DDS prop names.
// null = skip this property entirely (generic placeholder or interaction state)
const FIGMA_PROP_TO_DDS_PROP: Record<string, string | null> = {
  Type: 'variant',
  Variant: 'variant',
  Color: 'colorPalette',
  'Color Palette': 'colorPalette',
  Size: 'size',
  State: null, // interaction state, not a React prop — skip
  'Property 1': null, // generic Figma placeholder — skip
  'Property 2': null,
  'Property 3': null,
};

// Maps Figma variant values → DDS prop values, keyed by Figma property name.
// For any value not listed, the script falls back to value.toLowerCase().
const FIGMA_VALUE_TO_DDS_VALUE: Record<string, Record<string, string>> = {
  Type: {
    Default: 'solid',
    Secondary: 'outline',
    Tertiary: 'plain',
    Neutral: 'surface',
  },
  Variant: {
    Solid: 'solid',
    Outline: 'outline',
    Plain: 'plain',
    Surface: 'surface',
    Subtle: 'subtle',
  },
  Color: {
    Primary: 'primary',
    Secondary: 'secondary',
    Error: 'error',
    Tertiary: 'tertiary',
  },
  Size: {
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
    XSmall: 'xs',
  },
};

// ─── CLI args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getArg(flag: string): string | undefined {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : undefined;
}

function hasFlag(flag: string): boolean {
  return args.includes(flag);
}

const componentName = getArg('--component');
const rawNodeId = getArg('--nodeId');
const explicitType = getArg('--type') as
  | 'simple'
  | 'compound'
  | 'composite'
  | undefined;
const isDryRun = hasFlag('--dry-run');
const isForce = hasFlag('--force');
const skipFigma = hasFlag('--skip-figma');

if (!componentName || !rawNodeId) {
  console.error(
    '❌  Usage: pnpm scaffold:figma-connect --component <Name> --nodeId <id>',
  );
  console.error(
    '   Example: pnpm scaffold:figma-connect --component Button --nodeId 38:7993',
  );
  process.exit(1);
}

// Normalise node ID — accept both colon and dash forms
const nodeIdDash = rawNodeId.replace(':', '-');
const nodeIdColon = rawNodeId.replace('-', ':');

// ─── Locate component source ──────────────────────────────────────────────────

type ComponentLocation = {
  sourcePath: string; // relative to ROOT, used for display
  mainFilePath: string; // absolute path to main .tsx file (where implementation lives)
  typesFilePath: string; // absolute path to types.ts sibling (may not exist)
  figmaPath: string; // absolute path to write .figma.tsx
  importPath: string; // relative import used inside .figma.tsx
  isDirectory: boolean;
};

function locateComponent(name: string): ComponentLocation {
  // Option 1: flat file — src/components/Button.tsx
  const flatPath = join(ROOT, 'src/components', `${name}.tsx`);
  if (existsSync(flatPath)) {
    return {
      sourcePath: `src/components/${name}.tsx`,
      mainFilePath: flatPath,
      typesFilePath: join(ROOT, 'src/components', `${name}.types.ts`),
      figmaPath: join(ROOT, 'src/components', `${name}.figma.tsx`),
      importPath: `./${name}`,
      isDirectory: false,
    };
  }

  // Option 2: directory — src/components/NavigationMenu/
  const dirPath = join(ROOT, 'src/components', name);
  if (existsSync(dirPath)) {
    return {
      sourcePath: `src/components/${name}/${name}.tsx`,
      mainFilePath: join(dirPath, `${name}.tsx`),
      typesFilePath: join(dirPath, 'types.ts'),
      figmaPath: join(dirPath, `${name}.figma.tsx`),
      importPath: `./${name}`,
      isDirectory: true,
    };
  }

  console.error(`❌  Cannot find component source for "${name}"`);
  console.error(`   Looked for:`);
  console.error(`     ${flatPath}`);
  console.error(`     ${dirPath}/`);
  process.exit(1);
}

const location = locateComponent(componentName);

// ─── Guard existing file ──────────────────────────────────────────────────────

if (existsSync(location.figmaPath) && !isForce && !isDryRun) {
  console.error(`❌  ${location.figmaPath} already exists.`);
  console.error('   Use --force to overwrite or --dry-run to preview.');
  process.exit(1);
}

// ─── Read component source(s) ─────────────────────────────────────────────────

function readMainSource(loc: ComponentLocation): string {
  if (existsSync(loc.mainFilePath))
    return readFileSync(loc.mainFilePath, 'utf-8');
  // fallback to index.ts for directory components
  const indexPath = join(ROOT, 'src/components', componentName!, 'index.ts');
  if (existsSync(indexPath)) return readFileSync(indexPath, 'utf-8');
  console.error(`❌  Cannot read source file for ${componentName}`);
  process.exit(1);
}

function readTypesSource(loc: ComponentLocation): string {
  if (existsSync(loc.typesFilePath))
    return readFileSync(loc.typesFilePath, 'utf-8');
  return '';
}

const source = readMainSource(location);
const typesSource = readTypesSource(location);
// Combined source for prop extraction — try main file first, fall through to types.ts
const combinedSource = source + '\n' + typesSource;

// ─── Detect component type ────────────────────────────────────────────────────
// FIX 1: Only flag as compound if THIS component itself EXPORTS .Root,
// not just if it uses another component's .Root internally.

function detectType(
  src: string,
  name: string,
): 'simple' | 'compound' | 'composite' {
  if (explicitType) return explicitType;

  // Compound signals: this file exports a Root sub-component
  const exportsOwnRoot =
    src.includes(`${name}Root`) || // e.g. export const ButtonRoot
    src.includes(`export const Root`) || // export const Root = ...
    src.includes('withContext') || // Ark UI compound pattern
    src.includes('withProvider'); // DDS compound pattern

  if (exportsOwnRoot) return 'compound';

  // Composite: imports other DDS components (sibling imports)
  // Uses ../ (parent dir) or ./ (sibling) imports of actual components
  const importsSiblings =
    /from ['"]\.\.\/[A-Z]/.test(src) || // ../Button, ../Avatar etc.
    /from ['"]\.\/[A-Z]/.test(src); // ./SomeComponent

  if (importsSiblings) return 'composite';

  return 'simple';
}

const componentType = detectType(source, componentName);

// ─── Extract props interface ──────────────────────────────────────────────────
// FIX 2: Try main file first, then fall through to types.ts sibling.

type PropInfo = { name: string; type: string; required: boolean };

function extractPropsFromSource(src: string, name: string): PropInfo[] {
  // Try `interface ${Name}Props { ... }`
  const interfaceMatch = src.match(
    new RegExp(`interface ${name}Props\\s*\\{([^}]+)\\}`, 's'),
  );
  if (!interfaceMatch) return [];

  return interfaceMatch[1]
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) =>
        line &&
        !line.startsWith('//') &&
        !line.startsWith('*') &&
        !line.startsWith('/*'),
    )
    .map((line) => {
      const m = line.match(/^(\w+)(\?)?:\s*(.+?);?\s*$/);
      if (!m) return null;
      return { name: m[1], required: !m[2], type: m[3].trim() };
    })
    .filter(Boolean) as PropInfo[];
}

function extractProps(name: string): PropInfo[] {
  // Try main source first
  const fromMain = extractPropsFromSource(source, name);
  if (fromMain.length > 0) return fromMain;

  // Fall through to types.ts
  const fromTypes = extractPropsFromSource(typesSource, name);
  if (fromTypes.length > 0) {
    console.log('   ℹ️  Props loaded from types.ts');
    return fromTypes;
  }

  return [];
}

// ─── Extract named exports (compound components) ──────────────────────────────

function extractExports(src: string): string[] {
  const exports: string[] = [];
  for (const m of src.matchAll(/export (?:const|function|class) (\w+)/g)) {
    exports.push(m[1]);
  }
  const reExport = src.match(/export \{([^}]+)\}/);
  if (reExport) {
    exports.push(
      ...reExport[1].split(',').map((s) => s.trim().split(' as ')[0].trim()),
    );
  }
  return [...new Set(exports)].filter(Boolean);
}

// ─── Query Figma for real variant properties ──────────────────────────────────
// FIX 3: Use Figma REST API with FIGMA_TOKEN env var instead of raw MCP fetch.
// The REST API /v1/files/:fileKey/nodes endpoint returns component variant properties.

type FigmaVariantProps = Record<string, string[]>;

async function queryFigmaVariants(
  nodeId: string,
): Promise<FigmaVariantProps | null> {
  if (skipFigma) {
    console.log('   ⚠️  --skip-figma set — skipping variant query');
    return null;
  }

  const token = process.env.FIGMA_TOKEN ?? process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    console.log(
      '   ⚠️  FIGMA_TOKEN / FIGMA_ACCESS_TOKEN not set — skipping variant query',
    );
    console.log('   ℹ️  Add FIGMA_TOKEN=figd_xxx to .env.local to enable');
    console.log('   ℹ️  Get token: Figma → Settings → Personal access tokens');
    return null;
  }

  // Convert node ID to URL-safe format (38:7993 → 38%3A7993)
  const encodedNodeId = nodeId.replace(':', '%3A');
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${encodedNodeId}`;

  try {
    const response = await fetch(url, {
      headers: { 'X-Figma-Token': token },
    });

    if (!response.ok) {
      console.warn(
        `   ⚠️  Figma API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = (await response.json()) as any;
    const nodeData = data?.nodes?.[nodeId]?.document;

    if (!nodeData) {
      console.warn(`   ⚠️  Node ${nodeId} not found in Figma response`);
      return null;
    }

    // COMPONENT_SET — newer Figma REST API returns componentPropertyDefinitions
    // with { type: "VARIANT", variantOptions: [...] } entries
    if (nodeData.componentPropertyDefinitions) {
      const result: FigmaVariantProps = {};
      for (const [propName, propData] of Object.entries(
        nodeData.componentPropertyDefinitions as any,
      )) {
        if ((propData as any).type === 'VARIANT') {
          result[propName] = (propData as any).variantOptions ?? [];
        }
      }
      if (Object.keys(result).length > 0) return result;
    }

    // Fallback: older variantGroupProperties format
    if (nodeData.variantGroupProperties) {
      const result: FigmaVariantProps = {};
      for (const [propName, propData] of Object.entries(
        nodeData.variantGroupProperties as any,
      )) {
        result[propName] = (propData as any).values ?? [];
      }
      return result;
    }

    // COMPONENT (single, no variants) — parse from name e.g. "State=Default, Type=Primary"
    if (nodeData.type === 'COMPONENT' && nodeData.name?.includes('=')) {
      const result: FigmaVariantProps = {};
      for (const part of nodeData.name.split(', ')) {
        const [key, value] = part.split('=');
        if (key && value) result[key.trim()] = [value.trim()];
      }
      return Object.keys(result).length > 0 ? result : null;
    }

    return null;
  } catch (e) {
    console.warn(`   ⚠️  Figma query failed: ${String(e).slice(0, 150)}`);
    return null;
  }
}

// ─── Build props mapping from Figma variant data ──────────────────────────────

type PropsBlock = {
  ddsPropName: string;
  figmaPropName: string;
  values: Array<{ figmaValue: string; ddsValue: string }>;
}[];

function buildPropsMapping(
  figmaVariants: FigmaVariantProps | null,
): PropsBlock {
  if (!figmaVariants) return [];

  const result: PropsBlock = [];

  for (const [figmaPropName, figmaValues] of Object.entries(figmaVariants)) {
    const ddsPropName = FIGMA_PROP_TO_DDS_PROP[figmaPropName];

    // null = explicitly skipped (State, Property 1, etc.)
    if (ddsPropName === null) continue;

    // undefined = not in lookup table, fall back to lowercased prop name
    const resolvedDdsProp =
      ddsPropName ?? figmaPropName.toLowerCase().replace(/\s+/g, '');

    // Skip single-value props — not useful as a prop mapping
    if (figmaValues.length <= 1) continue;

    const valueMap = FIGMA_VALUE_TO_DDS_VALUE[figmaPropName] ?? {};
    const values = figmaValues.map((figmaValue) => ({
      figmaValue,
      ddsValue:
        valueMap[figmaValue] ??
        figmaValue.toLowerCase().replace(/[\s-]+/g, '-'),
    }));

    result.push({ ddsPropName: resolvedDdsProp, figmaPropName, values });
  }

  return result;
}

// ─── Generate example JSX ─────────────────────────────────────────────────────

function inferValue(propName: string, type: string): string {
  const t = type.toLowerCase();
  if (propName === 'children') return `{"Label"}`;
  if (t.includes('string')) return `{"value"}`;
  if (t.includes('boolean')) return `{false}`;
  if (t.includes('number')) return `{0}`;
  if (t.includes('[]') || t.startsWith('array')) return `{[]}`;
  if (t.includes('reactnode')) return `{"Content"}`;
  if (t.includes('=>') || t.startsWith('function')) return `{() => {}}`;
  return `{"value"}`;
}

function generateExample(
  name: string,
  type: 'simple' | 'compound' | 'composite',
  props: PropInfo[],
  exports: string[],
  propsMapping: PropsBlock,
): string {
  if (type === 'compound') {
    const hasItem = exports.some((e) => e.includes('Item'));
    const hasTrigger = exports.some(
      (e) => e.includes('ItemTrigger') || e.includes('Trigger'),
    );
    const hasContent = exports.some(
      (e) => e.includes('ItemContent') || e.includes('Content'),
    );
    const lines: string[] = [`<${name}.Root>`];
    if (hasItem) {
      lines.push(`  <${name}.Item value="item-1">`);
      if (hasTrigger)
        lines.push(`    <${name}.ItemTrigger>Label</${name}.ItemTrigger>`);
      if (hasContent)
        lines.push(`    <${name}.ItemContent>Content</${name}.ItemContent>`);
      lines.push(`  </${name}.Item>`);
    }
    lines.push(`</${name}.Root>`);
    return lines.join('\n      ');
  }

  // simple / composite with props mapping
  if (propsMapping.length > 0) {
    const inlineProps = propsMapping
      .map((p) => `${p.ddsPropName}={${p.ddsPropName}}`)
      .join(' ');
    const needsChildren = source.includes('children') || name === 'Button';
    return needsChildren
      ? `<${name} ${inlineProps}>Label</${name}>`
      : `<${name} ${inlineProps} />`;
  }

  // simple / composite without props mapping — use required props from TypeScript
  const requiredProps = props.filter(
    (p) => p.required && p.name !== 'children',
  );
  if (requiredProps.length === 0) {
    const needsChildren =
      source.includes('children') || combinedSource.includes('children');
    return needsChildren ? `<${name}>Label</${name}>` : `<${name} />`;
  }

  const propStrings = requiredProps
    .slice(0, 4)
    .map((p) => `${p.name}=${inferValue(p.name, p.type)}`);
  const needsChildren =
    source.includes('children') || combinedSource.includes('children');

  if (propStrings.length <= 2) {
    return needsChildren
      ? `<${name} ${propStrings.join(' ')}>Content</${name}>`
      : `<${name} ${propStrings.join(' ')} />`;
  }

  // Multi-line for 3+ props
  const lines = [
    `<${name}`,
    ...propStrings.map((p) => `  ${p}`),
    needsChildren ? '>' : '/>',
  ];
  const result = lines.join('\n      ');
  return needsChildren
    ? `${result}\n        Content\n      </${name}>`
    : result;
}

// ─── Build .figma.tsx file content ────────────────────────────────────────────

function buildFile(
  propsMapping: PropsBlock,
  props: PropInfo[],
  exports: string[],
): string {
  const importStyle = componentType === 'compound' ? 'namespace' : 'named';
  const connectTarget =
    importStyle === 'namespace' ? `${componentName}.Root` : componentName;
  const figmaUrl = `https://www.figma.com/design/${FIGMA_FILE_KEY}/${FIGMA_FILE_NAME}?node-id=${nodeIdDash}`;
  const hasPropsParam = propsMapping.length > 0;
  const exampleJsx = generateExample(
    componentName!,
    componentType,
    props,
    exports,
    propsMapping,
  );

  const lines: string[] = [];
  lines.push(`import figma from '@figma/code-connect';`);
  lines.push(
    importStyle === 'namespace'
      ? `import * as ${componentName} from '${location.importPath}';`
      : `import { ${componentName} } from '${location.importPath}';`,
  );
  lines.push('');
  lines.push(`figma.connect(`);
  lines.push(`  ${connectTarget},`);
  lines.push(`  '${figmaUrl}',`);
  lines.push(`  {`);

  if (hasPropsParam) {
    lines.push(`    props: {`);
    for (const mapping of propsMapping) {
      lines.push(
        `      ${mapping.ddsPropName}: figma.enum('${mapping.figmaPropName}', {`,
      );
      for (const { figmaValue, ddsValue } of mapping.values) {
        lines.push(`        ${figmaValue}: '${ddsValue}',`);
      }
      lines.push(`      }),`);
    }
    lines.push(`    },`);
    const paramNames = propsMapping.map((p) => p.ddsPropName).join(', ');
    lines.push(`    example: ({ ${paramNames} }) => (`);
  } else {
    lines.push(`    example: () => (`);
  }

  const indented = exampleJsx
    .split('\n')
    .map((l) => `      ${l}`)
    .join('\n');
  lines.push(indented);
  lines.push(`    ),`);
  lines.push(`  },`);
  lines.push(`);`);
  lines.push('');

  return lines.join('\n');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log(`🔧 scaffold-figma-connect`);
  console.log(`   Component : ${componentName}`);
  console.log(`   Node ID   : ${nodeIdColon}`);
  console.log(
    `   Type      : ${componentType}${explicitType ? ' (explicit)' : ' (auto-detected)'}`,
  );
  console.log(`   Output    : ${location.figmaPath}`);
  console.log('');

  console.log('📡 Querying Figma for variant properties...');
  const figmaVariants = await queryFigmaVariants(nodeIdColon);

  if (figmaVariants && Object.keys(figmaVariants).length > 0) {
    console.log('   Found:');
    for (const [k, v] of Object.entries(figmaVariants)) {
      const mapped = FIGMA_PROP_TO_DDS_PROP[k];
      const status =
        mapped === null ? '(skip)' : mapped ? `→ "${mapped}"` : '(unmapped)';
      console.log(`   ${k}: [${v.join(', ')}]  ${status}`);
    }
  } else {
    console.log('   ⚠️  No variant data — example will use TypeScript props');
  }

  console.log('');

  const propsMapping = buildPropsMapping(figmaVariants);
  const props = extractProps(componentName!);
  const exports = extractExports(source);
  const fileContent = buildFile(propsMapping, props, exports);

  if (isDryRun) {
    console.log(
      '─── DRY RUN — generated content ────────────────────────────────────',
    );
    console.log(fileContent);
    console.log(
      '────────────────────────────────────────────────────────────────────',
    );
    console.log('ℹ️  Dry run — no file written. Remove --dry-run to write.');
  } else {
    writeFileSync(location.figmaPath, fileContent, 'utf-8');
    console.log(`✅  Written: ${location.figmaPath}`);
    console.log('');

    if (propsMapping.length > 0) {
      console.log('⚠️  Verify these Figma → DDS mappings before committing:');
      for (const m of propsMapping) {
        console.log(`   "${m.figmaPropName}" → prop "${m.ddsPropName}"`);
        for (const { figmaValue, ddsValue } of m.values) {
          console.log(`     "${figmaValue}" → "${ddsValue}"`);
        }
      }
      console.log('');
      console.log(
        '   To fix wrong mappings, update FIGMA_PROP_TO_DDS_PROP and',
      );
      console.log(
        '   FIGMA_VALUE_TO_DDS_VALUE at the top of scaffold-figma-connect.ts',
      );
      console.log('   then re-run with --force.');
      console.log('');
    }

    console.log('Next:');
    console.log('  pnpm codex:generate   — rebuild figma-codex.json');
    console.log('  (or just commit — lint-staged runs it automatically)');
  }
}

main().catch((e) => {
  console.error('❌  Scaffold failed:', e);
  process.exit(1);
});
