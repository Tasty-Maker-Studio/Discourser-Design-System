# Step 7 Design: Panda Token Resolution for Foundation Stories

**Date:** 2026-03-12
**Branch context:** fix/remove-m3-labels (or new feature branch)

## Goal

Replace raw-value rendering with Panda CSS token resolution in all four foundation MDX stories. A broken token must produce a blank/invisible output rather than silently working.

## Approach: A (Update Components)

Move all Panda `css()` lookups inside the display component files in `src/stories/foundations/components/`. The `.mdx` files pass token name strings instead of raw values. This is cleaner than inlining JSX in `.mdx`.

---

## Per-Story Design

### Colors.mdx

**TonalSwatch section** → Remove entirely. Replace with a note pointing to the Color Scale story. Rationale: tonal palette tones (0, 10, 20, …, 100) have no Panda token equivalents — they are internal pipeline values. Adding 65 documentation-only tokens would be noise. ColorScale.stories.tsx already covers the usable Radix-scale vocabulary.

**SemanticSwatch** → Update `ColorSwatch.tsx`:

- Remove `lightValue` / `darkValue` props
- Add `name` prop (token key string, e.g. `"primary"`, `"onPrimary"`, `"primary.container"`)
- Pre-declare `semanticBg: Record<string, string>` with ~31 explicit `css({ bg: '...' })` entries
- Show light/dark side-by-side: light box = plain div with lookup class; dark box = same class inside a `data-theme="dark"` wrapper
- Labels show token path (e.g. `primary`) and `primary [dark]` — no hex strings

`Colors.mdx` changes:

- Remove tonal palette grid divs + `TonalSwatch` import usage (keep import if ColorSwatch still exports it, or remove)
- Replace each `<SemanticSwatch lightValue=... darkValue=...>` with `<SemanticSwatch name="primary" ...>`
- Keep all prose, headings, and usage guidelines unchanged

### Elevation.mdx / ElevationCard.tsx

Shadow tokens `level0`–`level5` exist in Panda as `boxShadow` values.

`ElevationCard.tsx` changes:

- Pre-declare `elevationClasses: Record<string, string>` with 6 entries: `level0: css({ boxShadow: 'level0' })` … `level5: css({ boxShadow: 'level5' })`
- Remove `shadow` prop; use `level` prop as lookup key
- The displayed shadow string becomes static text (hardcoded in the mdx reference table)

`ElevationGrid.tsx`:

- Remove `elevations: Record<string, string>` prop
- Render a fixed array `['level0', 'level1', 'level2', 'level3', 'level4', 'level5']`

`Elevation.mdx` changes:

- `<ElevationGrid />` — no prop needed
- "Visual Comparison" inline divs use pre-declared elevation classes (pre-declared in the mdx or extracted to a helper)

### Spacing.mdx / SpacingBox.tsx

Spacing tokens `none`, `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl` exist in Panda.

`SpacingBox.tsx` changes:

- Pre-declare `spacingWidthClasses: Record<string, string>` with 9 entries: `none: css({ width: 'none' })` … `xxxl: css({ width: 'xxxl' })`
- Width bar uses `className={spacingWidthClasses[name]}` instead of `style={{ width: value }}`
- Keep `value` prop for the px label display

`Spacing.mdx` changes:

- `<SpacingBox>` calls keep `name` and `value` props (value is for px label only)
- "Visual Examples" section uses static px strings (e.g. `gap: '8px'`) instead of `material3Language.spacing.sm`

### Typography.mdx / TypeSpecimen.tsx

Text styles exist: `displayLarge`, `displayMedium`, `displaySmall`, `headlineLarge`, `headlineMedium`, `headlineSmall`, `titleLarge`, `titleMedium`, `titleSmall`, `bodyLarge`, `bodyMedium`, `bodySmall`, `labelLarge`, `labelMedium`, `labelSmall` (15 total).

`TypeSpecimen.tsx` changes:

- Add `styleName` prop (e.g. `'displayLarge'`)
- Pre-declare `textStyleClasses: Record<string, string>` with 15 explicit `css({ textStyle: '...' })` entries
- Specimen text uses `className={textStyleClasses[styleName]}` instead of inline `specimenStyle`
- Keep all raw-value props (`fontSize`, `lineHeight`, etc.) — used only for the spec table below each specimen

`Typography.mdx` changes:

- Each `<TypeSpecimen>` gets `styleName="displayLarge"` (etc.) added
- Font Families section: replace `fontFamily: material3Language.typography.fonts.display` with static string `'"Fraunces", Georgia, "Times New Roman", serif'` etc.

---

## Implementation Rules

- All `css()` calls use string literals — no dynamic template strings or variables
- Use a pre-declared lookup object (same pattern as `ColorScale.stories.tsx` `scaleBg` / `semanticClasses`)
- `material3Language` must not be used to set any rendered color, shadow, width, or textStyle
- `material3Language` may still be referenced for static label/description text only

---

## Test Requirement

After first story is refactored (Colors.mdx / SemanticSwatch):

1. In `semantic-tokens.ts`, temporarily rename `primary` → `primary_BROKEN`
2. Storybook: confirm primary color swatches go blank/invisible
3. Revert rename
4. Confirm swatches return to normal
   Document in commit message.

---

## Success Criteria

- [x] All four .mdx stories render via Panda CSS token variables, not raw values
- [x] No css() calls use dynamic string interpolation
- [x] material3Language is NOT used to set any rendered color, shadow, size, or textStyle
- [x] Test-and-revert confirms visual failure on token breakage
- [x] pnpm test passes: 306/306
- [x] pnpm tsc --noEmit clean
- [x] Storybook renders all stories without console errors
- [x] Sequence status doc updated: Step 7 complete
