# M3 Token Pipeline Audit Report

> **Date:** 2026-02-10
> **Codebase:** Discourser Design System
> **Scope:** Full Material 3 token pipeline — from `material-theme.json` through transforms, bridge files, preset, `panda.config.ts`, and generated `styled-system` output.

---

## Executive Summary

The pipeline is **mostly healthy** after the recent fixes. Shadow token chaining works correctly, error/red DEFAULT tokens resolve properly, and the three palettes with Radix bridge files (primary, neutral/gray, error/red) have complete 1-12, a1-a12, and semantic variant (solid/subtle/surface/outline/plain) coverage in both light and dark modes.

**Three issues found** — one is a significant gap, one is a minor discrepancy, and one is a question for you to decide on.

---

## Findings

### 🔴 Finding 1: Secondary and Tertiary Have No Radix Bridge Files

**Severity: Significant gap**

The `src/preset/colors/` directory contains bridge files for primary, neutral, and error — but **no `m3-secondary.ts` or `m3-tertiary.ts`**. The colors index only exports:

```ts
export const colors = {
  primary,   // ← has bridge (1-12, a1-a12, solid/subtle/surface/outline/plain)
  neutral,   // ← has bridge
  error,     // ← has bridge
  gray: neutral,  // alias
  red: error,     // alias
};
```

**What exists for secondary/tertiary:** Only M3 tonal palette values (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100) from the language transform, plus M3 semantic tokens (secondary, secondary.container, onSecondary, onSecondary.container) from `semantic-tokens.ts`.

**What's missing:** The Radix-scale bridge (1-12 solid scale, a1-a12 alpha scale) and all Park UI semantic variants (solid.bg, solid.fg, subtle.bg, surface.bg, outline.bg, plain.bg, etc.).

**Impact:** Any Park UI component using `colorPalette="secondary"` or `colorPalette="tertiary"` will fail to resolve tokens like `colorPalette.9`, `colorPalette.solid.bg`, etc. If no components currently use these palettes, this is latent. But Kai (or any developer) would hit this the moment they try to use secondary/tertiary with a Park UI recipe.

**Fix:** Create `m3-secondary.ts` and `m3-tertiary.ts` following the exact pattern of `m3-primary.ts`, then add them to the colors index with appropriate aliases.

---

### 🟡 Finding 2: `border` Token Discrepancy Between `panda.config.ts` and Preset

**Severity: Minor — functionally OK, architecturally inconsistent**

In `panda.config.ts`, the border token has **both** a root-level value and nested children:

```ts
border: {
  value: { base: '{colors.gray.6}', _dark: '{colors.gray.6}' },  // root value ✅
  default: { value: { base: '{colors.gray.6}', _dark: '{colors.gray.6}' } },
  muted: { value: { base: '{colors.gray.4}', _dark: '{colors.gray.4}' } },
},
```

In `src/preset/index.ts`, it has **only** nested children (no root value):

```ts
border: {
  default: { value: { base: '{colors.gray.6}', _dark: '{colors.gray.6}' } },
  muted: { value: { base: '{colors.gray.4}', _dark: '{colors.gray.4}' } },
},
```

**Generated output:** Only `colors.border` exists as a CSS variable. `colors.border.default` and `colors.border.muted` do **not** appear in `styled-system/tokens/index.mjs`. This means `panda.config.ts` is the one that ran codegen, and the root value took precedence — the nested children got merged/flattened.

**Impact:** Nobody currently references `border.default` or `border.muted` in any recipe or component (confirmed by grep). Park UI upstream also defines border as a simple flat token. So functionally this is fine. But the preset definition (which would be what gets published as a package) differs from the local config, and the nested structure isn't generating separate tokens.

**Fix:** Align the two files. Recommendation: match Park UI upstream — make border a flat token with just a root value. Remove the unused `default` and `muted` nesting from both files.

---

### 🟢 Finding 3: Confirmed Working — Shadow Token Chaining

The recent elevation fix is fully operational:

```
shadows.xs  → resolves to → var(--shadows-level1)
shadows.sm  → resolves to → var(--shadows-level2)
shadows.md  → resolves to → var(--shadows-level3)
shadows.lg  → resolves to → var(--shadows-level4)
shadows.xl  → resolves to → var(--shadows-level5)
shadows.2xl → resolves to → var(--shadows-level5)
```

No recipes reference `level` tokens directly. No raw hex colors found in any recipe. The three-layer architecture (M3 base → Park UI semantic → component) is intact.

---

### 🟢 Finding 4: Confirmed Working — Error/Red DEFAULT Resolution

`m3-error.ts` has a proper DEFAULT key:

```ts
DEFAULT: { value: { base: m3[40], _dark: m3[80] } },
```

Generated output shows both `colors.error` and `colors.red` resolve to CSS variables. The alias chain `red → error → m3 tonal palette` is intact.

---

### 🟢 Finding 5: M3 Semantic Tokens — No Nesting Issues

All M3 semantic tokens in `semantic-tokens.ts` use proper `DEFAULT` keys where they have children (surface.DEFAULT + surface.container, onSurface.DEFAULT + onSurface.variant, etc.). No orphaned nested structures without root values.

The `outline` token (M3 semantic: outline.DEFAULT, outline.variant) does **not** collide with the per-palette `outline` semantic variant (primary.outline.bg, error.outline.bg, etc.) because they're at different paths in the token tree.

---

## Items I Could NOT Verify (Require Running in the Project)

- **`pnpm panda codegen` for fresh warnings** — The generated output I audited may be stale. Running codegen would confirm zero `Missing token` warnings.
- **`pnpm test`** — Couldn't execute tests remotely. Test files exist for the language transform and should be run to confirm.

---

## Recommendation: Priority Order

1. **Create secondary/tertiary bridge files** — This is the real gap. Until these exist, those palettes are incomplete for Park UI consumption.
2. **Align border token structure** — Quick cleanup, flatten to match Park UI upstream.
3. **Run `pnpm panda codegen` and `pnpm test`** — Confirm clean output after any changes.
4. **Consider whether secondary/tertiary need aliases** (like `gray → neutral` and `red → error`) — depends on whether Park UI recipes ever reference these by alternate names.
