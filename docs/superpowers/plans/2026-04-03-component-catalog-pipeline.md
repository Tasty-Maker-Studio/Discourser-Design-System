# Component Catalog Generation Pipeline — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully automated pipeline that generates `docs/component-catalog.md` from the live component exports and catalog story, and validates catalog coverage at build time.

**Architecture:** A new `scripts/generate-component-catalog.ts` script parses `src/components/index.ts` and `stories/ComponentCatalog.stories.tsx` to generate a structured markdown catalog. `scripts/validate-exports.ts` gains a second validation phase that warns when exported components lack catalog story entries. Both scripts are wired into the `build` npm sequence.

**Tech Stack:** Node.js ESM, `tsx`, TypeScript, `node:fs`, `node:path` — same stack as `validate-exports.ts`. No new dependencies.

---

## Important Design Decision: Phase 2 Exit Behavior

The spec states Phase 2 (catalog coverage check) should use `process.exit(1)` when components are missing. However, 6 components are currently missing from `ComponentCatalog.stories.tsx` (see baseline table below). Making this fatal would block the build before the catalog is complete.

**Decision:** Phase 2 is **non-fatal (warning only)** — uses `console.warn` + `YELLOW` color, does not contribute to `process.exit(1)`. The mechanism is tested by the mutation test below. Phase 2 should be tightened to fatal once all components have catalog entries (a follow-up task). This is a known, deliberate divergence from the spec's literal text, motivated by the spec's own Phase 2 instruction: "If any stub warnings appear, list which components are missing catalog entries and **flag them for follow-up**."

---

## Phase 1 Coverage Baseline

**The component name parser in this pipeline extracts component identity from the _source path_ of each export statement, not from individual symbol names.** This means `AddScenarioDialog` (exported as a named symbol from `./ScenarioQueue`) is invisible to the parser — the parser sees `ScenarioQueue` (already in the catalog). Only the 6 components below will appear as stubs.

| Component | In index.ts | In Catalog Story | Will Appear as Stub |
|---|---|---|---|
| Button | ✅ | ✅ | — |
| ButtonGroup | ✅ | ✅ | — |
| IconButton | ✅ | ✅ | — |
| Input | ✅ | ✅ | — |
| InputAddon | ✅ | ✅ | — |
| InputGroup | ✅ | ✅ | — |
| Textarea | ✅ | ✅ | — |
| Header | ✅ | ✅ | — |
| **Divider** | ✅ | ❌ | ✅ |
| Badge | ✅ | ✅ | — |
| Spinner | ✅ | ✅ | — |
| Toaster | ✅ | ✅ | — |
| Card | ✅ | ✅ | — |
| Dialog | ✅ | ✅ | — |
| Switch | ✅ | ✅ | — |
| Accordion | ✅ | ✅ | — |
| Drawer | ✅ | ✅ | — |
| Tabs | ✅ | ✅ | — |
| Checkbox | ✅ | ✅ | — |
| RadioGroup | ✅ | ✅ | — |
| Select | ✅ | ✅ | — |
| Slider | ✅ | ✅ | — |
| Avatar | ✅ | ✅ | — |
| Progress | ✅ | ✅ | — |
| Skeleton | ✅ | ✅ | — |
| Popover | ✅ | ✅ | — |
| Tooltip | ✅ | ✅ | — |
| CloseButton | ✅ | ✅ (as `CloseButtonNS`) | — |
| **Icon** | ✅ | ❌ | ✅ |
| **AbsoluteCenter** | ✅ | ❌ | ✅ |
| **Group** | ✅ | ❌ | ✅ |
| Breadcrumb | ✅ | ✅ | — |
| ContentCard | ✅ | ✅ | — |
| Stepper | ✅ | ✅ | — |
| NavigationMenu | ✅ | ✅ | — |
| **SettingsPopover** | ✅ | ❌ | ✅ |
| ScenarioSettings | ✅ | ✅ | — |
| **StudioControls** | ✅ | ❌ | ✅ |
| ScenarioQueue | ✅ | ✅ | — |
| ScenarioCard | ✅ | ✅ | — |

**6 stub warnings expected:** AbsoluteCenter, Divider, Group, Icon, SettingsPopover, StudioControls

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `scripts/generate-component-catalog.ts` | **Create** | Parse index.ts + catalog story → write `docs/component-catalog.md` |
| `scripts/validate-exports.ts` | **Modify** (append) | Add Phase 2: catalog story coverage warning |
| `package.json` | **Modify** | Add `catalog:generate` script; insert into `build` |
| `docs/component-catalog.md` | **Generated** | Written by the script — never hand-edited |

---

## Task 1: Create `scripts/generate-component-catalog.ts`

**Files:**
- Create: `scripts/generate-component-catalog.ts`

Write the complete file in one step, assembling all sections:

- [ ] **Step 1A: Write the complete script**

```typescript
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
    const normalized =
      srcPath.charAt(0).toUpperCase() + srcPath.slice(1);
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
  lines.push(`${components.length} components in the Discourser Design System.`);
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
}

generateCatalog();
```

- [ ] **Step 1B: Run the script and verify it passes**

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System
pnpm tsx scripts/generate-component-catalog.ts
```

Expected output (script exits 0):
```
✓ Generated docs/component-catalog.md — N components

  ⚠️  6 components have no catalog entry:
    • AbsoluteCenter
    • Divider
    • Group
    • Icon
    • SettingsPopover
    • StudioControls
  Add these to stories/ComponentCatalog.stories.tsx to complete the catalog.
```

Then verify:
```bash
# File exists and is non-empty
wc -l docs/component-catalog.md

# Every component heading appears exactly once (should print nothing)
grep "^## " docs/component-catalog.md | sort | uniq -d

# Version and date headers are present
head -10 docs/component-catalog.md
```

- [ ] **Step 1C: Commit**

```bash
git add scripts/generate-component-catalog.ts docs/component-catalog.md
git commit -m "feat(catalog): add generate-component-catalog.ts script

Generates docs/component-catalog.md from src/components/index.ts and
stories/ComponentCatalog.stories.tsx. Stubs the 6 components missing
from the catalog story with a warning comment."
```

---

## Task 2: Extend `scripts/validate-exports.ts` with catalog coverage check

**Files:**
- Modify: `scripts/validate-exports.ts`

**Design:** Phase 2 is **warning-only** (non-fatal) because 6 components currently lack catalog entries. The mutation test below confirms the detection mechanism works. Phase 2 should be tightened to `process.exit(1)` once all components have catalog entries (tracked separately).

The existing file has two early exits that must both be removed:
1. `process.exit(0)` at line ~112 (inside the success branch) — defer so Phase 2 runs
2. `process.exit(1)` at line ~152 (bottom of file) — replace with `let phase1Failed`

### Exact diff for the existing file:

- [ ] **Step 2A: Remove the early `process.exit(0)` and defer the bottom `process.exit(1)`**

In `scripts/validate-exports.ts`, make these two edits:

**Edit 1** — lines 107–113: remove the inner `process.exit(0)`:

Replace:
```typescript
if (missing.length === 0 && extra.length === 0) {
  console.log(
    `${GREEN}✓ All exported components have matching package.json export entries.${RESET}`,
  );
  console.log('');
  process.exit(0);
}
```

With:
```typescript
if (missing.length === 0 && extra.length === 0) {
  console.log(
    `${GREEN}✓ All exported components have matching package.json export entries.${RESET}`,
  );
  console.log('');
  // Phase 2 runs next — do not exit here
}
```

**Edit 2** — lines 150–153: replace the bottom `process.exit(1)` with a flag:

Replace:
```typescript
// Fail the build only when components are missing from exports
if (missing.length > 0) {
  process.exit(1);
}
```

With:
```typescript
// Fail the build only when components are missing from exports (Phase 1)
const phase1Failed = missing.length > 0;
```

- [ ] **Step 2B: Append Phase 2 to the end of `scripts/validate-exports.ts`**

Append this block after the last line of the current file (after the `phase1Failed` declaration):

```typescript
// ── Phase 2: Validate ComponentCatalog.stories.tsx coverage ──────────────────
//
// Warning-only (non-fatal) while the catalog is being built out. Tighten to
// process.exit(1) once all exported components have catalog story entries.

console.log('');
console.log(
  '📖 Validating ComponentCatalog.stories.tsx coverage against src/components/index.ts...',
);
console.log('');

const storyPath = path.join(root, 'stories/ComponentCatalog.stories.tsx');
const storySource = fs.readFileSync(storyPath, 'utf8');

// Parse the import { ... } from '../src' block
const importBlockRe = /import\s+\{([^}]+)\}\s+from\s+['"]\.\.\/src['"]/s;
const importMatch = storySource.match(importBlockRe);

const catalogImports = new Set<string>();
if (importMatch) {
  for (const token of importMatch[1].split(',')) {
    const trimmed = token.trim();
    if (!trimmed || trimmed.startsWith('type ')) continue;
    // Handle "CloseButton as CloseButtonNS" → extract "CloseButton"
    const baseName = trimmed.split(/\s+as\s+/)[0].trim();
    if (baseName) catalogImports.add(baseName);
  }
}

const missingFromCatalog: string[] = [];
for (const component of exportedComponents) {
  if (!catalogImports.has(component)) {
    missingFromCatalog.push(component);
  }
}

const extraInCatalog: string[] = [];
for (const name of catalogImports) {
  // Only check PascalCase names (component names, not lowercase utilities like `toaster`)
  if (name.charAt(0) !== name.charAt(0).toUpperCase()) continue;
  const found = [...exportedComponents].some(
    (c) => c.toLowerCase() === name.toLowerCase(),
  );
  if (!found) extraInCatalog.push(name);
}

if (missingFromCatalog.length === 0) {
  console.log(
    `${GREEN}✓ All exported components are present in ComponentCatalog.stories.tsx.${RESET}`,
  );
  console.log('');
} else {
  // Warning-only — see comment above. Change to console.error + phase2Failed=true to harden.
  console.warn(
    `${YELLOW}⚠  Components exported from index.ts but not yet in ComponentCatalog.stories.tsx:${RESET}`,
  );
  for (const name of missingFromCatalog.sort()) {
    console.warn(`  ${YELLOW}• ${name}${RESET}`);
  }
  console.warn('');
  console.warn(
    `${YELLOW}  Add these to stories/ComponentCatalog.stories.tsx to complete the catalog.${RESET}`,
  );
  console.warn('');
}

if (extraInCatalog.length > 0) {
  console.warn(
    `${YELLOW}⚠  ComponentCatalog.stories.tsx imports components not found in index.ts (may be intentional):${RESET}`,
  );
  for (const name of extraInCatalog.sort()) {
    console.warn(`  ${YELLOW}• ${name}${RESET}`);
  }
  console.warn('');
}

// ── Final exit ────────────────────────────────────────────────────────────────
if (phase1Failed) {
  process.exit(1);
}

process.exit(0);
```

- [ ] **Step 2C: Run with current state — confirm exits 0, Phase 2 warns about 6 missing**

```bash
pnpm exports:validate
```

Expected: exits code 0. Output includes both phases. Phase 2 warns:
```
⚠  Components exported from index.ts but not yet in ComponentCatalog.stories.tsx:
  • AbsoluteCenter
  • Divider
  • Group
  • Icon
  • SettingsPopover
  • StudioControls
```

- [ ] **Step 2D: Mutation test — temporarily break one catalog import**

In `stories/ComponentCatalog.stories.tsx`, change `NavigationMenu,` to `FakeComponent,` in the import block.

```bash
pnpm exports:validate
```

Expected: exits code 0 (still non-fatal), Phase 2 now also warns about `NavigationMenu` in addition to the 6 known stubs.

Restore `FakeComponent` → `NavigationMenu`.

```bash
pnpm exports:validate
```

Expected: exits code 0, back to only the 6 known stubs in the Phase 2 warning.

> **Why exit 0 in the mutation test:** Phase 2 is warning-only by design. The test confirms the detection mechanism (missing components are correctly identified and reported) rather than the exit code. When Phase 2 is hardened to fatal in a follow-up task, the mutation test expectation should be updated to exit 1.

- [ ] **Step 2E: Commit**

```bash
git add scripts/validate-exports.ts
git commit -m "feat(catalog): add catalog coverage check to validate-exports.ts

Adds Phase 2 that checks every component exported from src/components/index.ts
appears in ComponentCatalog.stories.tsx. Non-fatal (warns) while 6 components
lack catalog entries. Tighten to fatal after catalog is complete."
```

---

## Task 3: Wire into `package.json`

**Files:**
- Modify: `package.json`

Two changes needed (`docs/` is already in the `files` array — it covers all files under `docs/`, including the generated catalog):

- [ ] **Step 3A: Add `catalog:generate` script to `package.json`**

In the `scripts` object, add this entry (place it near `exports:validate`):
```json
"catalog:generate": "tsx scripts/generate-component-catalog.ts",
```

- [ ] **Step 3B: Update the `build` script**

Current value:
```
"pnpm build:panda && pnpm typecheck && pnpm build:lib && pnpm build:types && pnpm exports:validate && pnpm codex:generate"
```

Updated value (insert `catalog:generate` after `exports:validate`, before `codex:generate`):
```
"pnpm build:panda && pnpm typecheck && pnpm build:lib && pnpm build:types && pnpm exports:validate && pnpm catalog:generate && pnpm codex:generate"
```

- [ ] **Step 3C: Run the full build and confirm it passes**

```bash
pnpm build
```

Expected:
- Build completes with exit code 0
- `docs/component-catalog.md` is updated with fresh date/version
- Build output shows `catalog:generate` running between `exports:validate` and `codex:generate`

- [ ] **Step 3D: Confirm catalog file will ship with the package**

`docs/` is already in the `files` array (`package.json` line 197: `"docs"`), so `docs/component-catalog.md` is covered without adding a more specific entry. Verify:

```bash
pnpm pack --dry-run 2>&1 | grep component-catalog
```

Expected: `docs/component-catalog.md` appears in the output.

- [ ] **Step 3E: Commit**

```bash
git add package.json
git commit -m "feat(catalog): wire catalog:generate into build pipeline

Adds catalog:generate npm script and inserts it between exports:validate
and codex:generate in the build sequence. The docs/ entry in the files
array already covers docs/component-catalog.md for package publishing."
```

---

## Task 4: Final Verification

Run each of these in order and confirm all pass:

- [ ] **4A:** `pnpm exports:validate` → exits 0; Phase 1 prints success; Phase 2 warns about 6 missing components
- [ ] **4B:** `pnpm catalog:generate` → exits 0; `docs/component-catalog.md` is updated
- [ ] **4C:** `pnpm build` → exits 0; full build succeeds end to end
- [ ] **4D:** Inspect `docs/component-catalog.md`:
  - `grep "^## " docs/component-catalog.md | sort | uniq -d` prints nothing (no duplicate headings)
  - Version header matches `package.json` version (`0.26.0`)
  - Date is today (`2026-04-03`)
  - Exactly 6 stub warnings appear for: AbsoluteCenter, Divider, Group, Icon, SettingsPopover, StudioControls

- [ ] **4E: Open a PR**

```bash
# Confirm you are on a feature branch (not dev or main)
git branch

# If all 3 commits are on the current branch:
git push -u origin HEAD

gh pr create --title "feat: component catalog generation pipeline" \
  --body "$(cat <<'EOF'
## Summary

- Adds `scripts/generate-component-catalog.ts` that auto-generates `docs/component-catalog.md` from live exports and the catalog story
- Extends `scripts/validate-exports.ts` with Phase 2: catalog coverage check (non-fatal warning while 6 components lack catalog entries)
- Wires `catalog:generate` into the `build` sequence after `exports:validate`

## Parser note

Component identity is derived from *source path* of export statements, not individual symbol names. Named symbols exported from compound modules (e.g. `AddScenarioDialog` from `./ScenarioQueue`) are not separately tracked — only the module-level name is.

## Known stub warnings (expected)

6 components are exported but have no entry in `ComponentCatalog.stories.tsx`:
AbsoluteCenter, Divider, Group, Icon, SettingsPopover, StudioControls

These warn at build time. A follow-up task should add them to the catalog story and harden Phase 2 to `process.exit(1)`.

## Test plan

- [ ] `pnpm exports:validate` exits 0, both phases print, Phase 2 warns about 6 components
- [ ] `pnpm catalog:generate` exits 0, file non-empty
- [ ] `pnpm build` exits 0 end to end
- [ ] `docs/component-catalog.md` has correct version/date, no duplicate headings

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

## Constraints

- Do **not** modify `stories/ComponentCatalog.stories.tsx` — it is the source of truth, not a target
- Do **not** modify `src/components/index.ts` — read it, never write it
- No hard-coded component names in either script
- Use `tsx`-compatible TypeScript (no transpilation step)
- Match `validate-exports.ts` code style exactly: same color constants (`RED`, `YELLOW`, `GREEN`, `RESET`), same ESM imports (`node:fs`, `node:path`, `fileURLToPath`), same comment header style
