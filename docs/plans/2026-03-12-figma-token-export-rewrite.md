# Figma Token Export Rewrite Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite `scripts/export-figma-tokens.ts` to generate three DTCG-compatible output files from `material3Language` with zero hardcoded values.

**Architecture:** Single script with pure helper functions. Each output file is built by a dedicated builder function that reads exclusively from `material3Language`. The semantic key → Figma path mapping is handled by a single `semanticKeyToFigmaPath()` pure function. All three files are written to `dist/`, and `dist/figma-variables.json` is also copied to `tokens/tokens.json`.

**Tech Stack:** TypeScript (ESM), tsx runner, Node.js `fs`/`path`, no new dependencies.

---

### Task 1: Add `figma:export` script to package.json

**Files:**

- Modify: `package.json`

**Step 1: Add the script entry**

In `package.json`, find the `"scripts"` block. Add after the last existing script entry:

```json
"figma:export": "tsx scripts/export-figma-tokens.ts"
```

**Step 2: Verify**

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System
cat package.json | grep figma:export
```

Expected output: `"figma:export": "tsx scripts/export-figma-tokens.ts"`

**Step 3: Commit**

```bash
git add package.json
git commit -m "chore: add figma:export script to package.json"
```

---

### Task 2: Rewrite scripts/export-figma-tokens.ts

**Files:**

- Modify: `scripts/export-figma-tokens.ts` (complete rewrite)

**Step 1: Replace the entire file with this implementation**

```typescript
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
    const darkValue = (lang.semanticDark as Record<string, string>)[key];
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

  for (const [key, style] of Object.entries(lang.typography.scale)) {
    const fontKey = style.fontFamily as 'display' | 'body' | 'mono';
    const fontFamilyString = lang.typography.fonts[fontKey];
    // Extract first font name before comma, strip quotes
    const fontFamily = fontFamilyString
      .split(',')[0]
      .replace(/['"]/g, '')
      .trim();

    result[key] = {
      fontFamily,
      fontSize: px(style.fontSize),
      fontWeight: Number(style.fontWeight),
      lineHeight: px(style.lineHeight),
      letterSpacing: px(style.letterSpacing),
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
```

**Step 2: Run the export script to verify it executes clean**

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System
pnpm figma:export
```

Expected output (exact numbers):

```
✅ dist/figma-variables.json — 78 Primitives, 31 Semantic, 24 Spacing & Shape tokens
✅ dist/figma-effect-styles.json — 6 elevation levels
✅ dist/figma-text-styles.json — 15 text styles
✅ tokens/tokens.json updated
```

**Step 3: Spot-check the output files**

```bash
# Verify Primitives structure
node -e "const f=JSON.parse(require('fs').readFileSync('dist/figma-variables.json','utf8')); console.log(Object.keys(f.Primitives).slice(0,3)); console.log(f.Primitives['primary/0'])"
```

Expected:

```
[ 'primary/0', 'primary/10', 'primary/20' ]
{ '$type': 'color', '$value': { Value: '#000000' } }
```

```bash
# Verify Semantic has Light/Dark modes (no dark-* prefix keys)
node -e "const f=JSON.parse(require('fs').readFileSync('dist/figma-variables.json','utf8')); const s=f.Semantic; console.log(s['primary']); console.log(s['primary/container']); console.log(s['surface/container/lowest'])"
```

Expected:

```
{ '$type': 'color', '$value': { Light: '#4C662B', Dark: '#B1D18A' } }
{ '$type': 'color', '$value': { Light: '#CDEDA3', Dark: '#354E16' } }
{ '$type': 'color', '$value': { Light: '#FFFFFF', Dark: '#0C0F09' } }
```

```bash
# Verify numeric tokens are numbers not strings
node -e "const f=JSON.parse(require('fs').readFileSync('dist/figma-variables.json','utf8')); const s=f['Spacing & Shape']; console.log(s['spacing/md']); console.log(s['radii/extraSmall']); console.log(s['border/thin']); console.log(s['duration/normal'])"
```

Expected:

```
{ '$type': 'number', '$value': { Value: 16 } }
{ '$type': 'number', '$value': { Value: 4 } }
{ '$type': 'number', '$value': { Value: 1 } }
{ '$type': 'number', '$value': { Value: 200 } }
```

```bash
# Verify text styles have numeric values and correct font family
node -e "const f=JSON.parse(require('fs').readFileSync('dist/figma-text-styles.json','utf8')); console.log(f['displayLarge']); console.log(f['bodyMedium'])"
```

Expected:

```
{
  fontFamily: 'Fraunces',
  fontSize: 57,
  fontWeight: 400,
  lineHeight: 64,
  letterSpacing: -0.25,
  figmaTextStyle: 'displayLarge'
}
{
  fontFamily: 'Poppins',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 20,
  letterSpacing: 0.25,
  figmaTextStyle: 'bodyMedium'
}
```

```bash
# Verify effect styles
node -e "const f=JSON.parse(require('fs').readFileSync('dist/figma-effect-styles.json','utf8')); console.log(Object.keys(f.elevation)); console.log(f.elevation.level1)"
```

Expected:

```
[ 'level0', 'level1', 'level2', 'level3', 'level4', 'level5' ]
{
  value: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
  description: 'Cards at rest, contained buttons (semantic: xs)'
}
```

```bash
# Verify tokens/tokens.json was updated
node -e "const f=JSON.parse(require('fs').readFileSync('tokens/tokens.json','utf8')); console.log(Object.keys(f))"
```

Expected:

```
[ '$metadata', 'Primitives', 'Semantic', 'Spacing & Shape' ]
```

**Step 4: Run typecheck**

```bash
pnpm tsc --noEmit
```

Expected: No errors.

**Step 5: Run tests to verify no regressions**

```bash
pnpm test
```

Expected: All tests pass (306/306).

**Step 6: Commit**

```bash
git add scripts/export-figma-tokens.ts tokens/tokens.json
git commit -m "feat: rewrite export-figma-tokens to DTCG format with Light/Dark modes"
```

---

## Success Criteria

- [ ] `pnpm figma:export` runs clean with no errors
- [ ] `dist/figma-variables.json` exists with `Primitives`, `Semantic`, `Spacing & Shape` collections
- [ ] Semantic collection has `Light`/`Dark` modes (no `dark-*` prefix keys anywhere)
- [ ] All numeric tokens (spacing, radii, border, duration) are numbers not strings
- [ ] `dist/figma-effect-styles.json` exists with 6 elevation levels
- [ ] `dist/figma-text-styles.json` exists with 15 text styles, numeric values
- [ ] `tokens/tokens.json` updated to match figma-variables.json content
- [ ] Zero hardcoded hex values in the script
- [ ] `pnpm test` passes: 306/306 (no regressions)
- [ ] `pnpm tsc --noEmit` clean
