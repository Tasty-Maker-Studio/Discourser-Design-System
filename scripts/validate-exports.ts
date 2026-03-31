#!/usr/bin/env tsx
/**
 * validate-exports.ts
 *
 * Ensures every component exported from src/components/index.ts has a
 * corresponding named entry in package.json "exports".
 *
 * How it works:
 *  1. Parse src/components/index.ts to extract the set of export names
 *     (both individual exports and namespace re-exports like `export * as Dialog`).
 *  2. Read package.json and collect every top-level export key that looks like
 *     a component (i.e. starts with "./" and is not ".", "./preset", "./figma-codex").
 *  3. Diff the two sets and fail loudly if any component is missing from exports.
 *
 * Run manually:   pnpm tsx scripts/validate-exports.ts
 * Run in build:   included in `pnpm build` via package.json scripts
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// ── 1. Parse the component index to find exported component names ────────────

const indexPath = path.join(root, 'src/components/index.ts');
const indexSource = fs.readFileSync(indexPath, 'utf8');

const exportedComponents = new Set<string>();

// Matches:
//   export * as Dialog from './Dialog'
//   export * as Card from './Card'
const namespaceRe = /export\s+\*\s+as\s+(\w+)\s+from\s+['"][^'"]+['"]/g;

// Matches named exports like:
//   export { Button, ... } from './Button'
//   export { StudioControls, ... } from './StudioControls'
// We capture the *source path* to derive the component name, not every symbol.
const namedRe = /export\s+\{[^}]+\}\s+from\s+['"]\.\/([^/'"]+)/g;

for (const [, name] of indexSource.matchAll(namespaceRe)) {
  exportedComponents.add(name);
}

for (const [, srcPath] of indexSource.matchAll(namedRe)) {
  // Icons are individual named exports re-exported through the barrel — they are NOT
  // subpath exports and must not be validated as package.json export keys.
  // The namedRe captures only the first path segment, so './Icons/ClockIcon' → 'Icons'.
  if (srcPath === 'Icons') continue;
  // srcPath might be e.g. "Button", "StudioControls", "divider/index" — normalise to PascalCase key
  const name = srcPath.split('/')[0];
  // Capitalise first letter so "divider" → "Divider" for the export key check
  exportedComponents.add(name.charAt(0).toUpperCase() + name.slice(1));
}

// ── 2. Read package.json exports ─────────────────────────────────────────────

const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Non-component export keys to ignore
const SKIP_KEYS = new Set(['.', './preset', './figma-codex', './components']);

const packageExportKeys = new Set<string>();
for (const key of Object.keys(pkg.exports ?? {})) {
  if (SKIP_KEYS.has(key)) continue;
  // Strip leading "./" → component name
  packageExportKeys.add(key.replace(/^\.\//, ''));
}

// ── 3. Diff ──────────────────────────────────────────────────────────────────

const missing: string[] = [];
for (const component of exportedComponents) {
  if (!packageExportKeys.has(component)) {
    missing.push(component);
  }
}

const extra: string[] = [];
for (const key of packageExportKeys) {
  // Check if a matching export exists (case-insensitive for divider → Divider)
  const found = [...exportedComponents].some(
    (c) => c.toLowerCase() === key.toLowerCase(),
  );
  if (!found) {
    extra.push(key);
  }
}

// ── 4. Report ─────────────────────────────────────────────────────────────────

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

console.log('');
console.log(
  '📦 Validating package.json exports against src/components/index.ts...',
);
console.log('');

if (missing.length === 0 && extra.length === 0) {
  console.log(
    `${GREEN}✓ All exported components have matching package.json export entries.${RESET}`,
  );
  console.log('');
  process.exit(0);
}

if (missing.length > 0) {
  console.error(
    `${RED}✗ Components exported from index.ts but MISSING from package.json "exports":${RESET}`,
  );
  for (const name of missing.sort()) {
    console.error(`  ${RED}• ${name}${RESET}`);
  }
  console.error('');
  console.error(`${RED}  Add the following to package.json "exports":${RESET}`);
  console.error('');
  for (const name of missing.sort()) {
    // Emit both patterns and let the dev pick the right one.
    console.error(`    "./${name}": {`);
    console.error(`      "types": "./src/components/${name}/index.ts",`);
    console.error(`      "import": "./src/components/${name}/index.ts"`);
    console.error(`    },`);
    console.error(`  // — OR for single-file components —`);
    console.error(`    "./${name}": {`);
    console.error(`      "types": "./src/components/${name}.tsx",`);
    console.error(`      "import": "./src/components/${name}.tsx"`);
    console.error(`    },`);
    console.error('');
  }
}

if (extra.length > 0) {
  console.warn(
    `${YELLOW}⚠  package.json export entries with no matching index.ts export (may be intentional):${RESET}`,
  );
  for (const name of extra.sort()) {
    console.warn(`  ${YELLOW}• ${name}${RESET}`);
  }
  console.warn('');
}

// Fail the build only when components are missing from exports
if (missing.length > 0) {
  process.exit(1);
}
