# Token Name Mapping

> Generated from `tokens/export-to-figma/figma-variables.json`, `tokens/export-to-figma/figma-effect-styles.json`,
> `tokens/export-to-figma/figma-text-styles.json`, `src/preset/semantic-tokens.ts`,
> `src/preset/colors/create-palette-bridge.ts`, and `src/languages/material3.language.ts`.
>
> Version: 0.25.3

---

## Section 1: Semantic Colors

34 entries from the `Semantic` collection in `figma-variables.json`, mapped to
their Panda CSS semantic token names (defined in `src/preset/semantic-tokens.ts`).

> **CSS custom property convention:** Panda converts camelCase token keys to
> kebab-case. Nested tokens (dot notation) become dashes. Example:
> `onPrimary.container` → `--colors-on-primary-container`.

| Figma Variable Path                  | Panda CSS Token             | CSS Custom Property                  | Example Usage                                         |
| ------------------------------------ | --------------------------- | ------------------------------------ | ----------------------------------------------------- |
| `Semantic/primary`                   | `primary`                   | `--colors-primary`                   | `color: 'primary'`                                    |
| `Semantic/onPrimary`                 | `onPrimary`                 | `--colors-on-primary`                | `color: 'onPrimary'`                                  |
| `Semantic/primary/container`         | `primary.container`         | `--colors-primary-container`         | `bg: 'primary.container'`                             |
| `Semantic/onPrimary/container`       | `onPrimary.container`       | `--colors-on-primary-container`      | `color: 'onPrimary.container'`                        |
| `Semantic/secondary`                 | `secondary`                 | `--colors-secondary`                 | `color: 'secondary'`                                  |
| `Semantic/onSecondary`               | `onSecondary`               | `--colors-on-secondary`              | `color: 'onSecondary'`                                |
| `Semantic/secondary/container`       | `secondary.container`       | `--colors-secondary-container`       | `bg: 'secondary.container'`                           |
| `Semantic/onSecondary/container`     | `onSecondary.container`     | `--colors-on-secondary-container`    | `color: 'onSecondary.container'`                      |
| `Semantic/tertiary`                  | `tertiary`                  | `--colors-tertiary`                  | `color: 'tertiary'`                                   |
| `Semantic/onTertiary`                | `onTertiary`                | `--colors-on-tertiary`               | `color: 'onTertiary'`                                 |
| `Semantic/tertiary/container`        | `tertiary.container`        | `--colors-tertiary-container`        | `bg: 'tertiary.container'`                            |
| `Semantic/onTertiary/container`      | `onTertiary.container`      | `--colors-on-tertiary-container`     | `color: 'onTertiary.container'`                       |
| `Semantic/error`                     | `error`                     | `--colors-error`                     | `color: 'error'`                                      |
| `Semantic/onError`                   | `onError`                   | `--colors-on-error`                  | `color: 'onError'`                                    |
| `Semantic/error/container`           | `error.container`           | `--colors-error-container`           | `bg: 'error.container'`                               |
| `Semantic/onError/container`         | `onError.container`         | `--colors-on-error-container`        | `color: 'onError.container'`                          |
| `Semantic/surface`                   | `surface`                   | `--colors-surface`                   | `bg: 'surface'`                                       |
| `Semantic/onSurface`                 | `onSurface`                 | `--colors-on-surface`                | `color: 'onSurface'`                                  |
| `Semantic/surface/variant`           | `surfaceVariant`            | `--colors-surface-variant`           | `bg: 'surfaceVariant'` ⚠️ Mismatch (see note A)       |
| `Semantic/onSurface/variant`         | `onSurface.variant`         | `--colors-on-surface-variant`        | `color: 'onSurface.variant'` ⚠️ Mismatch (see note B) |
| `Semantic/surface/container/lowest`  | `surface.container.lowest`  | `--colors-surface-container-lowest`  | `bg: 'surface.container.lowest'`                      |
| `Semantic/surface/container/low`     | `surface.container.low`     | `--colors-surface-container-low`     | `bg: 'surface.container.low'`                         |
| `Semantic/surface/container`         | `surface.container`         | `--colors-surface-container`         | `bg: 'surface.container'`                             |
| `Semantic/surface/container/high`    | `surface.container.high`    | `--colors-surface-container-high`    | `bg: 'surface.container.high'`                        |
| `Semantic/surface/container/highest` | `surface.container.highest` | `--colors-surface-container-highest` | `bg: 'surface.container.highest'`                     |
| `Semantic/outline`                   | `outline`                   | `--colors-outline`                   | `borderColor: 'outline'`                              |
| `Semantic/outline/variant`           | `outline.variant`           | `--colors-outline-variant`           | `borderColor: 'outline.variant'`                      |
| `Semantic/inverse/surface`           | `inverseSurface`            | `--colors-inverse-surface`           | `bg: 'inverseSurface'` ⚠️ Mismatch (see note C)       |
| `Semantic/inverse/onSurface`         | `inverseOnSurface`          | `--colors-inverse-on-surface`        | `color: 'inverseOnSurface'` ⚠️ Mismatch (see note C)  |
| `Semantic/inverse/primary`           | `inversePrimary`            | `--colors-inverse-primary`           | `color: 'inversePrimary'` ⚠️ Mismatch (see note C)    |
| `Semantic/background`                | `background`                | `--colors-background`                | `bg: 'background'`                                    |
| `Semantic/onBackground`              | `onBackground`              | `--colors-on-background`             | `color: 'onBackground'`                               |
| `Semantic/scrim`                     | `scrim`                     | `--colors-scrim`                     | `bg: 'scrim'`                                         |
| `Semantic/shadow`                    | `shadow`                    | `--colors-shadow`                    | `color: 'shadow'`                                     |

### Panda-only tokens (no Figma variable equivalent)

These tokens exist in `semantic-tokens.ts` but have no direct key in
`figma-variables.json`:

| Panda CSS Token    | CSS Custom Property          | Notes                                             |
| ------------------ | ---------------------------- | ------------------------------------------------- |
| `surface.dim`      | `--colors-surface-dim`       | Aliased from `surfaceContainerLow`                |
| `surface.bright`   | `--colors-surface-bright`    | Aliased from `surfaceContainerHigh`               |
| `inverseSecondary` | `--colors-inverse-secondary` | Non-standard M3, follows `inversePrimary` pattern |
| `inverseTertiary`  | `--colors-inverse-tertiary`  | Non-standard M3, follows `inversePrimary` pattern |

### Mismatch Notes

**Note A — `surface/variant` vs `surfaceVariant`:**
Figma uses the slash-separated path `surface/variant`, suggesting a nested
structure. In Panda (`semantic-tokens.ts:114`), this is registered as a flat
top-level key `surfaceVariant` (camelCase), not as `surface.variant`. Use
`bg: 'surfaceVariant'`, NOT `bg: 'surface.variant'`.

**Note B — `onSurface/variant` inconsistency:**
Unlike `surface/variant` (flat camelCase), `onSurface/variant` IS nested in
Panda as `onSurface.variant` (`semantic-tokens.ts:112`). The two tokens use
different structural conventions despite analogous Figma paths.

**Note C — `inverse/*` paths flatten to camelCase:**
All three `inverse/` Figma paths (`inverse/surface`, `inverse/onSurface`,
`inverse/primary`) map to flat camelCase Panda tokens (`inverseSurface`,
`inverseOnSurface`, `inversePrimary`), not dot-notation nested tokens. This
matches M3 convention where these are atomic roles, not sub-tokens.

---

## Section 2: Primitive / Radix Bridge Colors

These tokens are generated by `src/preset/colors/create-palette-bridge.ts`.
They are **not** present in `figma-variables.json` (the Primitives collection
only has M3 tonal steps 0–100; the Radix 1–12 bridge is a Panda-side
abstraction).

The same structure applies to all five palettes:
`primary`, `secondary`, `tertiary`, `error`, `neutral`

### Base Scale (M3 tonal → Radix 1–12)

| Token Pattern                  | CSS Custom Property Pattern                      | Radix Semantics                                                                                                                          | Example Usage                            |
| ------------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `{palette}.1` – `{palette}.12` | `--colors-{palette}-1` – `--colors-{palette}-12` | 1–2: app bg; 3–4: subtle bg; 5–6: UI element bg; 7–8: borders; 9: solid action; 10: hover; 11: low-contrast text; 12: high-contrast text | `bg: 'primary.3'`, `color: 'primary.12'` |

### Alpha Scale

| Token Pattern                    | CSS Custom Property Pattern                        | Notes                                                                        | Example Usage      |
| -------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------ |
| `{palette}.a1` – `{palette}.a12` | `--colors-{palette}-a1` – `--colors-{palette}-a12` | Transparency variants for overlays; suffix is hex opacity (e.g. `a6` = ~50%) | `bg: 'primary.a3'` |

### Semantic Variant Tokens

These Park UI–style semantic variants are nested under each palette:

| Token Pattern                    | CSS Custom Property Pattern               | Purpose                            | Example Usage                           |
| -------------------------------- | ----------------------------------------- | ---------------------------------- | --------------------------------------- |
| `{palette}.solid.bg`             | `--colors-{palette}-solid-bg`             | Primary action background          | `bg: 'primary.solid.bg'`                |
| `{palette}.solid.bg.hover`       | `--colors-{palette}-solid-bg-hover`       | Hovered solid background           | —                                       |
| `{palette}.solid.fg`             | `--colors-{palette}-solid-fg`             | Foreground on solid background     | `color: 'primary.solid.fg'`             |
| `{palette}.subtle.bg`            | `--colors-{palette}-subtle-bg`            | Subtle tinted background           | `bg: 'primary.subtle.bg'`               |
| `{palette}.subtle.bg.hover`      | `--colors-{palette}-subtle-bg-hover`      | Hovered subtle background          | —                                       |
| `{palette}.subtle.bg.active`     | `--colors-{palette}-subtle-bg-active`     | Active subtle background           | —                                       |
| `{palette}.subtle.fg`            | `--colors-{palette}-subtle-fg`            | Foreground on subtle background    | `color: 'primary.subtle.fg'`            |
| `{palette}.surface.bg`           | `--colors-{palette}-surface-bg`           | Low-tint surface background        | `bg: 'primary.surface.bg'`              |
| `{palette}.surface.bg.active`    | `--colors-{palette}-surface-bg-active`    | Active surface background          | —                                       |
| `{palette}.surface.border`       | `--colors-{palette}-surface-border`       | Surface border                     | `borderColor: 'primary.surface.border'` |
| `{palette}.surface.border.hover` | `--colors-{palette}-surface-border-hover` | Hovered surface border             | —                                       |
| `{palette}.surface.fg`           | `--colors-{palette}-surface-fg`           | Foreground on surface              | `color: 'primary.surface.fg'`           |
| `{palette}.outline.bg`           | `--colors-{palette}-outline-bg`           | Transparent outline background     | `bg: 'primary.outline.bg'`              |
| `{palette}.outline.bg.hover`     | `--colors-{palette}-outline-bg-hover`     | Hovered outline background         | —                                       |
| `{palette}.outline.bg.active`    | `--colors-{palette}-outline-bg-active`    | Active outline background          | —                                       |
| `{palette}.outline.border`       | `--colors-{palette}-outline-border`       | Outline border                     | `borderColor: 'primary.outline.border'` |
| `{palette}.outline.fg`           | `--colors-{palette}-outline-fg`           | Foreground on outline              | `color: 'primary.outline.fg'`           |
| `{palette}.plain.bg`             | `--colors-{palette}-plain-bg`             | No-chrome background (transparent) | `bg: 'primary.plain.bg'`                |
| `{palette}.plain.bg.hover`       | `--colors-{palette}-plain-bg-hover`       | Hovered plain background           | —                                       |
| `{palette}.plain.bg.active`      | `--colors-{palette}-plain-bg-active`      | Active plain background            | —                                       |
| `{palette}.plain.fg`             | `--colors-{palette}-plain-fg`             | Foreground for plain variant       | `color: 'primary.plain.fg'`             |

> **`error` palette special case:** The `error` bridge also includes a `DEFAULT`
> key at the root (`error` itself), registered via `includeDefault: true` in
> `create-palette-bridge.ts:148`. This means `error.9` is the Radix action color
> AND `error` (DEFAULT) resolves to `m3[40]` (light) / `m3[80]` (dark).

---

## Section 3: Spacing & Shape

24 entries from the `Spacing & Shape` collection in `figma-variables.json`.
Panda stores these under four categories: `spacing`, `radii`, `borderWidths`,
and `durations` (from `theme.tokens.*` in `src/preset/index.ts`).

| Figma Variable Path                | Panda CSS Token         | CSS Custom Property      | Example Usage                   |
| ---------------------------------- | ----------------------- | ------------------------ | ------------------------------- |
| `Spacing & Shape/spacing/none`     | `none` (spacing)        | `--spacing-none`         | `p: 'none'`                     |
| `Spacing & Shape/spacing/xxs`      | `xxs` (spacing)         | `--spacing-xxs`          | `p: 'xxs'`                      |
| `Spacing & Shape/spacing/xs`       | `xs` (spacing)          | `--spacing-xs`           | `p: 'xs'`                       |
| `Spacing & Shape/spacing/sm`       | `sm` (spacing)          | `--spacing-sm`           | `p: 'sm'`                       |
| `Spacing & Shape/spacing/md`       | `md` (spacing)          | `--spacing-md`           | `p: 'md', gap: 'md'`            |
| `Spacing & Shape/spacing/lg`       | `lg` (spacing)          | `--spacing-lg`           | `p: 'lg'`                       |
| `Spacing & Shape/spacing/xl`       | `xl` (spacing)          | `--spacing-xl`           | `p: 'xl'`                       |
| `Spacing & Shape/spacing/xxl`      | `xxl` (spacing)         | `--spacing-xxl`          | `p: 'xxl'`                      |
| `Spacing & Shape/spacing/xxxl`     | `xxxl` (spacing)        | `--spacing-xxxl`         | `p: 'xxxl'`                     |
| `Spacing & Shape/radii/none`       | `none` (radii)          | `--radii-none`           | `borderRadius: 'none'`          |
| `Spacing & Shape/radii/extraSmall` | `extraSmall` (radii)    | `--radii-extra-small`    | `borderRadius: 'extraSmall'`    |
| `Spacing & Shape/radii/small`      | `small` (radii)         | `--radii-small`          | `borderRadius: 'small'`         |
| `Spacing & Shape/radii/medium`     | `medium` (radii)        | `--radii-medium`         | `borderRadius: 'medium'`        |
| `Spacing & Shape/radii/large`      | `large` (radii)         | `--radii-large`          | `borderRadius: 'large'`         |
| `Spacing & Shape/radii/extraLarge` | `extraLarge` (radii)    | `--radii-extra-large`    | `borderRadius: 'extraLarge'`    |
| `Spacing & Shape/radii/full`       | `full` (radii)          | `--radii-full`           | `borderRadius: 'full'`          |
| `Spacing & Shape/border/thin`      | `thin` (borderWidths)   | `--border-widths-thin`   | `borderWidth: 'thin'`           |
| `Spacing & Shape/border/medium`    | `medium` (borderWidths) | `--border-widths-medium` | `borderWidth: 'medium'`         |
| `Spacing & Shape/border/thick`     | `thick` (borderWidths)  | `--border-widths-thick`  | `borderWidth: 'thick'`          |
| `Spacing & Shape/duration/instant` | `instant` (durations)   | `--durations-instant`    | `transitionDuration: 'instant'` |
| `Spacing & Shape/duration/fast`    | `fast` (durations)      | `--durations-fast`       | `transitionDuration: 'fast'`    |
| `Spacing & Shape/duration/normal`  | `normal` (durations)    | `--durations-normal`     | `transitionDuration: 'normal'`  |
| `Spacing & Shape/duration/slow`    | `slow` (durations)      | `--durations-slow`       | `transitionDuration: 'slow'`    |
| `Spacing & Shape/duration/slower`  | `slower` (durations)    | `--durations-slower`     | `transitionDuration: 'slower'`  |

> **Radii camelCase → kebab conversion:** `extraSmall` → `--radii-extra-small`,
> `extraLarge` → `--radii-extra-large`. The Panda token name in JSX remains
> camelCase (e.g. `borderRadius: 'extraSmall'`).

### Panda-only radii (Park UI aliases, not in Figma)

Defined in `src/preset/index.ts:144–147` as semantic tokens:

| Panda Token  | CSS Custom Property | Value            | Purpose                  |
| ------------ | ------------------- | ---------------- | ------------------------ |
| `l1` (radii) | `--radii-l1`        | `0.125rem` (2px) | Park UI xs border radius |
| `l2` (radii) | `--radii-l2`        | `0.375rem` (6px) | Park UI sm border radius |
| `l3` (radii) | `--radii-l3`        | `0.5rem` (8px)   | Park UI md border radius |

---

## Section 4: Shadows (Effect Styles)

6 base elevation tokens from `tokens/export-to-figma/figma-effect-styles.json`, plus semantic
aliases defined in `src/preset/shadows.ts`.

### Base Elevation Tokens

| Figma Effect Style | Panda Token | CSS Custom Property | M3 Use Case                      | Example Usage      |
| ------------------ | ----------- | ------------------- | -------------------------------- | ------------------ |
| `elevation/level0` | `level0`    | `--shadows-level0`  | Flat surfaces                    | `shadow: 'level0'` |
| `elevation/level1` | `level1`    | `--shadows-level1`  | Cards at rest, contained buttons | `shadow: 'level1'` |
| `elevation/level2` | `level2`    | `--shadows-level2`  | Cards on hover, raised buttons   | `shadow: 'level2'` |
| `elevation/level3` | `level3`    | `--shadows-level3`  | Dialogs, dropdowns, popovers     | `shadow: 'level3'` |
| `elevation/level4` | `level4`    | `--shadows-level4`  | Navigation drawers, modal sheets | `shadow: 'level4'` |
| `elevation/level5` | `level5`    | `--shadows-level5`  | FABs, tooltips, snackbars        | `shadow: 'level5'` |

### Semantic Shadow Aliases (Panda-only, defined in `src/preset/shadows.ts`)

| Panda Token | CSS Custom Property | Resolves To                          | Example Usage     |
| ----------- | ------------------- | ------------------------------------ | ----------------- |
| `xs`        | `--shadows-xs`      | `level1`                             | `shadow: 'xs'`    |
| `sm`        | `--shadows-sm`      | `level2`                             | `shadow: 'sm'`    |
| `md`        | `--shadows-md`      | `level3`                             | `shadow: 'md'`    |
| `lg`        | `--shadows-lg`      | `level4`                             | `shadow: 'lg'`    |
| `xl`        | `--shadows-xl`      | `level5`                             | `shadow: 'xl'`    |
| `2xl`       | `--shadows-2xl`     | `level5`                             | `shadow: '2xl'`   |
| `inset`     | `--shadows-inset`   | Custom inset using `neutral.a4`/`a6` | `shadow: 'inset'` |

---

## Section 5: Typography (Text Styles)

51 entries from `tokens/export-to-figma/figma-text-styles.json`. The system
uses slash-hierarchy naming (`Category/Size/Weight`) with all weight variants
per scale step — upgraded from 15 flat styles (one per scale step, default
weight only) to 51 styles covering all variants.

**Description field convention:** Each Figma text style carries a description
field in the format `dds:typography.scale.{scaleName}.weights.{weightName}`.
This is the semantic bridge the Figma MCP reads to resolve back to the DDS token.

> **pandaTextStyle uses the scale step name, not the weight variant.** Panda
> `textStyle` tokens are geometry-only (size, line height, letter spacing, font
> family). Font weight is applied separately via the `fontWeight` utility.
> For example: `textStyle: 'headlineSmall'` sets geometry; add
> `fontWeight: 600` (or `'semiBold'`) separately for the SemiBold variant.

### Display (Fraunces)

| Figma Text Style | Font | Weight | Size | Line Height | Letter Spacing | DDS Token Path | Panda textStyle | Default? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Display/Large/Regular` | Fraunces | Regular (400) | 57px | 64px | -0.25 | `typography.scale.displayLarge.weights.regular` | `displayLarge` | ✓ |
| `Display/Large/SemiBold` | Fraunces | SemiBold (600) | 57px | 64px | -0.25 | `typography.scale.displayLarge.weights.semiBold` | `displayLarge` | |
| `Display/Medium/Regular` | Fraunces | Regular (400) | 45px | 52px | 0 | `typography.scale.displayMedium.weights.regular` | `displayMedium` | ✓ |
| `Display/Medium/SemiBold` | Fraunces | SemiBold (600) | 45px | 52px | 0 | `typography.scale.displayMedium.weights.semiBold` | `displayMedium` | |
| `Display/Small/Regular` | Fraunces | Regular (400) | 36px | 44px | 0 | `typography.scale.displaySmall.weights.regular` | `displaySmall` | ✓ |
| `Display/Small/SemiBold` | Fraunces | SemiBold (600) | 36px | 44px | 0 | `typography.scale.displaySmall.weights.semiBold` | `displaySmall` | |

### Headline (Fraunces)

| Figma Text Style | Font | Weight | Size | Line Height | Letter Spacing | DDS Token Path | Panda textStyle | Default? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Headline/Large/Light` | Fraunces | Light (300) | 32px | 40px | 0 | `typography.scale.headlineLarge.weights.light` | `headlineLarge` | |
| `Headline/Large/Regular` | Fraunces | Regular (400) | 32px | 40px | 0 | `typography.scale.headlineLarge.weights.regular` | `headlineLarge` | ✓ |
| `Headline/Large/SemiBold` | Fraunces | SemiBold (600) | 32px | 40px | 0 | `typography.scale.headlineLarge.weights.semiBold` | `headlineLarge` | |
| `Headline/Medium/Light` | Fraunces | Light (300) | 28px | 36px | 0 | `typography.scale.headlineMedium.weights.light` | `headlineMedium` | |
| `Headline/Medium/Regular` | Fraunces | Regular (400) | 28px | 36px | 0 | `typography.scale.headlineMedium.weights.regular` | `headlineMedium` | ✓ |
| `Headline/Medium/SemiBold` | Fraunces | SemiBold (600) | 28px | 36px | 0 | `typography.scale.headlineMedium.weights.semiBold` | `headlineMedium` | |
| `Headline/Small/Light` | Fraunces | Light (300) | 24px | 32px | 0 | `typography.scale.headlineSmall.weights.light` | `headlineSmall` | |
| `Headline/Small/Regular` | Fraunces | Regular (400) | 24px | 32px | 0 | `typography.scale.headlineSmall.weights.regular` | `headlineSmall` | ✓ |
| `Headline/Small/SemiBold` | Fraunces | SemiBold (600) | 24px | 32px | 0 | `typography.scale.headlineSmall.weights.semiBold` | `headlineSmall` | |

### Title (Poppins)

| Figma Text Style | Font | Weight | Size | Line Height | Letter Spacing | DDS Token Path | Panda textStyle | Default? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Title/Large/Regular` | Poppins | Regular (400) | 22px | 28px | 0 | `typography.scale.titleLarge.weights.regular` | `titleLarge` | |
| `Title/Large/Medium` | Poppins | Medium (500) | 22px | 28px | 0 | `typography.scale.titleLarge.weights.medium` | `titleLarge` | ✓ |
| `Title/Large/SemiBold` | Poppins | SemiBold (600) | 22px | 28px | 0 | `typography.scale.titleLarge.weights.semiBold` | `titleLarge` | |
| `Title/Large/Bold` | Poppins | Bold (700) | 22px | 28px | 0 | `typography.scale.titleLarge.weights.bold` | `titleLarge` | |
| `Title/Medium/Regular` | Poppins | Regular (400) | 16px | 24px | 0.15 | `typography.scale.titleMedium.weights.regular` | `titleMedium` | |
| `Title/Medium/Medium` | Poppins | Medium (500) | 16px | 24px | 0.15 | `typography.scale.titleMedium.weights.medium` | `titleMedium` | ✓ |
| `Title/Medium/SemiBold` | Poppins | SemiBold (600) | 16px | 24px | 0.15 | `typography.scale.titleMedium.weights.semiBold` | `titleMedium` | |
| `Title/Medium/Bold` | Poppins | Bold (700) | 16px | 24px | 0.15 | `typography.scale.titleMedium.weights.bold` | `titleMedium` | |
| `Title/Small/Regular` | Poppins | Regular (400) | 14px | 20px | 0.1 | `typography.scale.titleSmall.weights.regular` | `titleSmall` | |
| `Title/Small/Medium` | Poppins | Medium (500) | 14px | 20px | 0.1 | `typography.scale.titleSmall.weights.medium` | `titleSmall` | ✓ |
| `Title/Small/SemiBold` | Poppins | SemiBold (600) | 14px | 20px | 0.1 | `typography.scale.titleSmall.weights.semiBold` | `titleSmall` | |
| `Title/Small/Bold` | Poppins | Bold (700) | 14px | 20px | 0.1 | `typography.scale.titleSmall.weights.bold` | `titleSmall` | |

### Body (Poppins)

| Figma Text Style | Font | Weight | Size | Line Height | Letter Spacing | DDS Token Path | Panda textStyle | Default? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Body/Large/Light` | Poppins | Light (300) | 18px | 28px | 0.5 | `typography.scale.bodyLarge.weights.light` | `bodyLarge` | |
| `Body/Large/Regular` | Poppins | Regular (400) | 18px | 28px | 0.5 | `typography.scale.bodyLarge.weights.regular` | `bodyLarge` | ✓ |
| `Body/Large/Medium` | Poppins | Medium (500) | 18px | 28px | 0.5 | `typography.scale.bodyLarge.weights.medium` | `bodyLarge` | |
| `Body/Large/SemiBold` | Poppins | SemiBold (600) | 18px | 28px | 0.5 | `typography.scale.bodyLarge.weights.semiBold` | `bodyLarge` | |
| `Body/Medium/Light` | Poppins | Light (300) | 14px | 20px | 0.25 | `typography.scale.bodyMedium.weights.light` | `bodyMedium` | |
| `Body/Medium/Regular` | Poppins | Regular (400) | 14px | 20px | 0.25 | `typography.scale.bodyMedium.weights.regular` | `bodyMedium` | ✓ |
| `Body/Medium/Medium` | Poppins | Medium (500) | 14px | 20px | 0.25 | `typography.scale.bodyMedium.weights.medium` | `bodyMedium` | |
| `Body/Medium/SemiBold` | Poppins | SemiBold (600) | 14px | 20px | 0.25 | `typography.scale.bodyMedium.weights.semiBold` | `bodyMedium` | |
| `Body/Small/Light` | Poppins | Light (300) | 12px | 16px | 0.4 | `typography.scale.bodySmall.weights.light` | `bodySmall` | |
| `Body/Small/Regular` | Poppins | Regular (400) | 12px | 16px | 0.4 | `typography.scale.bodySmall.weights.regular` | `bodySmall` | ✓ |
| `Body/Small/Medium` | Poppins | Medium (500) | 12px | 16px | 0.4 | `typography.scale.bodySmall.weights.medium` | `bodySmall` | |
| `Body/Small/SemiBold` | Poppins | SemiBold (600) | 12px | 16px | 0.4 | `typography.scale.bodySmall.weights.semiBold` | `bodySmall` | |

### Label (Poppins)

| Figma Text Style | Font | Weight | Size | Line Height | Letter Spacing | DDS Token Path | Panda textStyle | Default? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Label/Large/Light` | Poppins | Light (300) | 14px | 20px | 0.1 | `typography.scale.labelLarge.weights.light` | `labelLarge` | |
| `Label/Large/Medium` | Poppins | Medium (500) | 14px | 20px | 0.1 | `typography.scale.labelLarge.weights.medium` | `labelLarge` | ✓ |
| `Label/Large/SemiBold` | Poppins | SemiBold (600) | 14px | 20px | 0.1 | `typography.scale.labelLarge.weights.semiBold` | `labelLarge` | |
| `Label/Large/Bold` | Poppins | Bold (700) | 14px | 20px | 0.1 | `typography.scale.labelLarge.weights.bold` | `labelLarge` | |
| `Label/Medium/Light` | Poppins | Light (300) | 12px | 16px | 0.5 | `typography.scale.labelMedium.weights.light` | `labelMedium` | |
| `Label/Medium/Medium` | Poppins | Medium (500) | 12px | 16px | 0.5 | `typography.scale.labelMedium.weights.medium` | `labelMedium` | ✓ |
| `Label/Medium/SemiBold` | Poppins | SemiBold (600) | 12px | 16px | 0.5 | `typography.scale.labelMedium.weights.semiBold` | `labelMedium` | |
| `Label/Medium/Bold` | Poppins | Bold (700) | 12px | 16px | 0.5 | `typography.scale.labelMedium.weights.bold` | `labelMedium` | |
| `Label/Small/Light` | Poppins | Light (300) | 11px | 16px | 0.5 | `typography.scale.labelSmall.weights.light` | `labelSmall` | |
| `Label/Small/Medium` | Poppins | Medium (500) | 11px | 16px | 0.5 | `typography.scale.labelSmall.weights.medium` | `labelSmall` | ✓ |
| `Label/Small/SemiBold` | Poppins | SemiBold (600) | 11px | 16px | 0.5 | `typography.scale.labelSmall.weights.semiBold` | `labelSmall` | |
| `Label/Small/Bold` | Poppins | Bold (700) | 11px | 16px | 0.5 | `typography.scale.labelSmall.weights.bold` | `labelSmall` | |

---

## Section 6: Figma MCP Resolution — What the AI Sees

When the Figma Desktop MCP reads a node via `get_design_context`, it returns
structured data. This table shows what each token type looks like in MCP
output and how it resolves to a DDS token.

| Token Type | What MCP Returns | How to Resolve to DDS Token |
| --- | --- | --- |
| Color fill | `boundVariables.fills[].id` → variable name e.g. `"Semantic/primary"` | Look up `figmaPath` in `token-name-mapping.json` `semantic` array → `pandaToken` |
| Spacing/padding | `boundVariables.paddingLeft.id` → variable name e.g. `"Spacing & Shape/spacing/md"` | Look up `figmaPath` in `spacingAndShape` array → `pandaToken` + `pandaCategory` |
| Border radius | `boundVariables.cornerRadius.id` → variable name e.g. `"Spacing & Shape/radii/medium"` | Look up `figmaPath` in `spacingAndShape` array |
| Shadow/elevation | `effects[].styleId` → effect style name e.g. `"elevation/level2"` | Look up `figmaEffectStyle` in `effectStyles` array → `pandaToken` |
| Text style | `style.textStyleId` → text style name e.g. `"Headline/Small/SemiBold"` | Look up `figmaTextStyle` in `textStyles` array → `ddsTokenPath` and `pandaTextStyle` |
| Text style description | `style.description` = `"dds:typography.scale.headlineSmall.weights.semiBold"` | Parse after `"dds:"` → direct DDS token path |

> **The text style description field is the most direct resolution path for
> typography** — no lookup table needed. The MCP returns it as part of the
> style metadata and it maps directly to the `DesignLanguageContract` token
> path (strip the `dds:` prefix to get `typography.scale.{step}.weights.{weight}`).
