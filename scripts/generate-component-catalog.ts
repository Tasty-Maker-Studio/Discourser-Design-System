#!/usr/bin/env tsx
/**
 * generate-component-catalog.ts
 *
 * Reads src/components/index.ts and stories/ComponentCatalog.stories.tsx,
 * then writes a complete docs/component-catalog.md.
 *
 * Parser note: component identity is derived from the *source path* of each
 * export statement, not from individual symbol names. Named symbols exported
 * from a compound module (e.g. AddScenarioDialog from ./ScenarioQueue) are
 * not individually tracked — only the module-level name (ScenarioQueue) is.
 *
 * Run manually:  pnpm catalog:generate
 * Run in build:  included after exports:validate in pnpm build
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// ── Color constants (match validate-exports.ts) ───────────────────────────────
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

// ── 1. Parse src/components/index.ts ─────────────────────────────────────────

type ComponentEntry = { name: string; type: 'Simple' | 'Compound' };

function parseComponentIndex(): ComponentEntry[] {
  const indexPath = path.join(root, 'src/components/index.ts');
  const source = fs.readFileSync(indexPath, 'utf8');
  const entries: ComponentEntry[] = [];

  // export * as Dialog from './Dialog'  → Compound
  const namespaceRe = /export\s+\*\s+as\s+(\w+)\s+from\s+['"][^'"]+['"]/g;
  for (const [, name] of source.matchAll(namespaceRe)) {
    entries.push({ name, type: 'Compound' });
  }

  // export { Button, ... } from './Button'  → Simple
  // Captures only the first path segment — Icons/ entries are skipped.
  // Individual symbols from compound modules (e.g. AddScenarioDialog from
  // ./ScenarioQueue) are not separately tracked; only the module name is.
  const namedRe = /export\s+\{[^}]+\}\s+from\s+['"]\.\/([^/'"]+)/g;
  for (const [, srcPath] of source.matchAll(namedRe)) {
    if (srcPath === 'Icons') continue;
    const normalized = srcPath.charAt(0).toUpperCase() + srcPath.slice(1);
    if (!entries.some((e) => e.name === normalized)) {
      entries.push({ name: normalized, type: 'Simple' });
    }
  }

  return entries.sort((a, b) => a.name.localeCompare(b.name));
}

// ── 2. Parse stories/ComponentCatalog.stories.tsx ────────────────────────────

function parseCatalogImports(): Set<string> {
  const storyPath = path.join(root, 'stories/ComponentCatalog.stories.tsx');
  const source = fs.readFileSync(storyPath, 'utf8');

  // Find the import { ... } from '../src' block
  const importBlockRe = /import\s+\{([^}]+)\}\s+from\s+['"]\.\.\/src['"]/s;
  const match = source.match(importBlockRe);
  if (!match) return new Set();

  const importedNames = new Set<string>();
  for (const token of match[1].split(',')) {
    const trimmed = token.trim();
    if (!trimmed || trimmed.startsWith('type ')) continue;
    // Handle "CloseButton as CloseButtonNS" → extract "CloseButton"
    const baseName = trimmed.split(/\s+as\s+/)[0].trim();
    if (baseName) importedNames.add(baseName);
  }
  return importedNames;
}

// ── 3. Extract JSX usage examples ────────────────────────────────────────────

function extractUsageExample(
  componentName: string,
  source: string,
): string | null {
  // Find first self-closing or opening JSX tag for this component.
  // Handles namespace components like <Card.Root ...> via <Card.*
  const tagRe = new RegExp(
    `<${componentName}(?:\\.[A-Z]\\w*)?[\\s\\S]{0,200}?(?:/>|>)`,
  );
  const match = source.match(tagRe);
  if (!match) return null;

  // Collapse whitespace to a single representative line
  return match[0]
    .replace(/\s+/g, ' ')
    .replace(/\{ /g, '{')
    .replace(/ \}/g, '}')
    .trim();
}

// ── 4. Generate docs/component-catalog.md ────────────────────────────────────

function generateCatalog(): void {
  const components = parseComponentIndex();
  const catalogImports = parseCatalogImports();

  const storyPath = path.join(root, 'stories/ComponentCatalog.stories.tsx');
  const storySource = fs.readFileSync(storyPath, 'utf8');

  const pkgPath = path.join(root, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as {
    version?: string;
  };
  const version = pkg.version ?? '0.0.0';
  const now = new Date().toISOString().split('T')[0];

  const lines: string[] = [];

  // ── Header ────────────────────────────────────────────────────────────────
  lines.push('# Component Catalog');
  lines.push('');
  lines.push(
    '> **Status:** Generated — auto-produced by `scripts/generate-component-catalog.ts`',
  );
  lines.push(
    '> **Source:** `stories/ComponentCatalog.stories.tsx` + `src/components/index.ts`',
  );
  lines.push(`> **Design System Version:** ${version}`);
  lines.push(`> **Generated:** ${now}`);
  lines.push(
    '> **Do not hand-edit** — this file is overwritten on every build',
  );
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Overview');
  lines.push('');
  lines.push(
    `${components.length} components in the Discourser Design System.`,
  );
  lines.push('Run `pnpm catalog:generate` to regenerate after changes.');
  lines.push('');
  lines.push('---');
  lines.push('');

  // ── Component sections ────────────────────────────────────────────────────
  const stubWarnings: string[] = [];

  for (const { name, type } of components) {
    lines.push(`## ${name}`);
    lines.push('');
    lines.push(`**Type:** ${type}`);
    lines.push(
      `**Import:** \`import { ${name} } from '@discourser/design-system'\``,
    );
    lines.push('');

    if (!catalogImports.has(name)) {
      lines.push(
        '> ⚠️ No catalog entry found in ComponentCatalog.stories.tsx — add an example to keep this catalog accurate.',
      );
      stubWarnings.push(name);
    } else {
      const example = extractUsageExample(name, storySource);
      if (example) {
        lines.push('**Usage:**');
        lines.push('```tsx');
        lines.push(example);
        lines.push('```');
      } else {
        lines.push('**Usage:** *(see ComponentCatalog.stories.tsx)*');
      }
    }

    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // ── Write output ──────────────────────────────────────────────────────────
  const outPath = path.join(root, 'docs/component-catalog.md');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');

  console.log('');
  console.log(
    `${GREEN}✓ Generated docs/component-catalog.md — ${components.length} components${RESET}`,
  );

  if (stubWarnings.length > 0) {
    console.log('');
    console.log(
      `${YELLOW}  ⚠️  ${stubWarnings.length} components have no catalog entry:${RESET}`,
    );
    for (const name of stubWarnings) {
      console.log(`${YELLOW}    • ${name}${RESET}`);
    }
    console.log(
      `${YELLOW}  Add these to stories/ComponentCatalog.stories.tsx to complete the catalog.${RESET}`,
    );
  }

  console.log('');

  // Suppress unused variable warning — RED is declared for style consistency
  // with validate-exports.ts but not needed in this script's output paths.
  void RED;
}

generateCatalog();
