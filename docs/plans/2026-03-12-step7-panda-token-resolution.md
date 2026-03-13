# Step 7: Panda Token Resolution for Foundation Stories — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace raw-value rendering in all four foundation MDX stories with Panda CSS token variables so a broken token produces a blank/invisible output.

**Architecture:** Approach A — update the display components in `src/stories/foundations/components/` to accept a token-name prop and look up pre-declared `css()` class strings. The `.mdx` files pass token name strings instead of raw hex/px/shadow values. `material3Language` is removed from all rendering paths.

**Tech Stack:** Panda CSS (`css()` from `styled-system/css`), React, MDX (Storybook), TypeScript.

---

## Task 1: Update `ColorSwatch.tsx` — refactor `SemanticSwatch`

**Files:**

- Modify: `src/stories/foundations/components/ColorSwatch.tsx`

The `SemanticSwatch` component currently accepts `lightValue`/`darkValue` hex strings and applies them as inline `backgroundColor`. Replace with a Panda CSS token lookup.

**Step 1: Add the `css` import and pre-declare the semantic background lookup**

At the top of `ColorSwatch.tsx`, add `import { css } from 'styled-system/css';`.

Then add this object **before** the `ColorSwatch` component definition (keep `ColorSwatch` and `TonalSwatch` as-is for now — they may still be imported even if unused):

```tsx
import { css } from 'styled-system/css';
import { type CSSProperties } from 'react';

// ── Pre-declared css() lookups — Panda CSS statically extracts these ─────────
// Keys match the `name` prop passed from Colors.mdx (M3 semantic role names).
// Values use the Panda semantic token path from src/preset/semantic-tokens.ts.
const semanticBg: Record<string, string> = {
  // Primary
  primary: css({ bg: 'primary' }),
  onPrimary: css({ bg: 'onPrimary' }),
  primaryContainer: css({ bg: 'primary.container' }),
  onPrimaryContainer: css({ bg: 'onPrimary.container' }),
  // Secondary
  secondary: css({ bg: 'secondary' }),
  onSecondary: css({ bg: 'onSecondary' }),
  secondaryContainer: css({ bg: 'secondary.container' }),
  onSecondaryContainer: css({ bg: 'onSecondary.container' }),
  // Tertiary
  tertiary: css({ bg: 'tertiary' }),
  onTertiary: css({ bg: 'onTertiary' }),
  tertiaryContainer: css({ bg: 'tertiary.container' }),
  onTertiaryContainer: css({ bg: 'onTertiary.container' }),
  // Error
  error: css({ bg: 'error' }),
  onError: css({ bg: 'onError' }),
  errorContainer: css({ bg: 'error.container' }),
  onErrorContainer: css({ bg: 'onError.container' }),
  // Surface
  surface: css({ bg: 'surface' }),
  onSurface: css({ bg: 'onSurface' }),
  surfaceVariant: css({ bg: 'surfaceVariant' }),
  onSurfaceVariant: css({ bg: 'onSurface.variant' }),
  // Surface containers
  surfaceContainerLowest: css({ bg: 'surface.container.lowest' }),
  surfaceContainerLow: css({ bg: 'surface.container.low' }),
  surfaceContainer: css({ bg: 'surface.container' }),
  surfaceContainerHigh: css({ bg: 'surface.container.high' }),
  surfaceContainerHighest: css({ bg: 'surface.container.highest' }),
  // Outline
  outline: css({ bg: 'outline' }),
  outlineVariant: css({ bg: 'outline.variant' }),
  // Inverse
  inverseSurface: css({ bg: 'inverseSurface' }),
  inverseOnSurface: css({ bg: 'inverseOnSurface' }),
  inversePrimary: css({ bg: 'inversePrimary' }),
  // Utility
  background: css({ bg: 'background' }),
  onBackground: css({ bg: 'onBackground' }),
  scrim: css({ bg: 'scrim' }),
  shadow: css({ bg: 'shadow' }),
};
```

**Step 2: Replace the `SemanticSwatchProps` interface and component**

Remove the old `SemanticSwatchProps` interface and `SemanticSwatch` component entirely, replace with:

```tsx
interface SemanticSwatchProps {
  name: string;
  description?: string;
}

export const SemanticSwatch = ({ name, description }: SemanticSwatchProps) => {
  const bgClass = semanticBg[name] ?? '';

  const containerStyle: CSSProperties = {
    marginBottom: '16px',
  };

  const labelStyle: CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px',
    fontFamily: 'Inter, sans-serif',
  };

  const swatchRowStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  };

  const swatchContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  const swatchStyle: CSSProperties = {
    height: '80px',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  };

  const modeStyle: CSSProperties = {
    fontSize: '10px',
    textTransform: 'uppercase',
    color: '#999',
    fontWeight: '600',
  };

  const tokenStyle: CSSProperties = {
    fontSize: '11px',
    fontFamily: 'monospace',
    color: '#666',
  };

  const descStyle: CSSProperties = {
    fontSize: '12px',
    color: '#666',
    marginTop: '8px',
  };

  return (
    <div style={containerStyle}>
      <div style={labelStyle}>{name}</div>
      <div style={swatchRowStyle}>
        {/* Light mode swatch — inherits default theme */}
        <div style={swatchContainerStyle}>
          <div style={modeStyle}>Light</div>
          <div className={bgClass} style={swatchStyle} />
          <div style={tokenStyle}>{name}</div>
        </div>
        {/* Dark mode swatch — forced via data-theme="dark" */}
        <div style={swatchContainerStyle} data-theme="dark">
          <div style={modeStyle}>Dark</div>
          <div className={bgClass} style={swatchStyle} />
          <div style={tokenStyle}>{name} [dark]</div>
        </div>
      </div>
      {description && <div style={descStyle}>{description}</div>}
    </div>
  );
};
```

**Step 3: Verify TypeScript compiles**

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System
pnpm typecheck
```

Expected: no new errors (there may be errors from Colors.mdx prop mismatch until Task 2 — that's OK for now, mdx files aren't type-checked the same way).

---

## Task 2: Update `Colors.mdx` — remove tonal grid, update SemanticSwatch calls

**Files:**

- Modify: `src/stories/foundations/Colors.mdx`

**Step 1: Remove the tonal palette section and update imports**

Replace the import line:

```mdx
import {
  ColorSwatch,
  TonalSwatch,
  SemanticSwatch,
} from './components/ColorSwatch';
import { material3Language } from '../../languages/material3.language';
```

With:

```mdx
import { SemanticSwatch } from './components/ColorSwatch';
```

**Step 2: Replace the six tonal palette grid sections**

The file has six `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(13, 1fr)' ...}}>` blocks (Primary, Secondary, Tertiary, Neutral, Neutral Variant, Error) each containing `{Object.entries(material3Language.colors.X).map(...)}`.

Replace **all six** (from `### Primary` through the Error tonal grid `</div>`) plus the `### Primary` through `### Error` subheadings and the paragraphs before each grid.

Replace the entire tonal palettes section (everything from `## Tonal Palettes` down to but not including `---`) with:

```mdx
## Tonal Palettes

> **These are internal pipeline values.** Tonal palette steps (0–100) are used to build the Radix-scale and semantic tokens — they are not Panda CSS tokens and should never be used directly in components. To see the usable color vocabulary, open **Foundations → Color Scale** in the sidebar.
```

**Step 3: Update all SemanticSwatch JSX calls — remove lightValue and darkValue props**

Find every `<SemanticSwatch` block. Each currently looks like:

```jsx
<SemanticSwatch
  name="primary"
  lightValue={material3Language.semantic.primary}
  darkValue={material3Language.semanticDark.primary}
  description="Primary brand color for key actions and emphasis"
/>
```

Remove `lightValue={...}` and `darkValue={...}` from every call. Result:

```jsx
<SemanticSwatch
  name="primary"
  description="Primary brand color for key actions and emphasis"
/>
```

There are ~34 `<SemanticSwatch` calls. Remove the `lightValue` and `darkValue` props from all of them.

**Step 4: Run typecheck**

```bash
pnpm typecheck
```

Expected: clean.

---

## Task 3: Token breakage test (verify + revert)

This is the manual verification required by the spec. Do NOT skip it.

**Step 1: Temporarily break the `primary` token**

In `src/preset/semantic-tokens.ts`, find:

```ts
primary: {
  DEFAULT: { value: { base: s.primary, _dark: d.primary } },
```

Rename `primary` → `primary_BROKEN`:

```ts
primary_BROKEN: {
  DEFAULT: { value: { base: s.primary, _dark: d.primary } },
```

**Step 2: Rebuild Panda**

```bash
pnpm build:panda
```

**Step 3: Confirm visual failure**

Open Storybook (`pnpm dev`) and navigate to **Foundations → Colors**. The `primary` semantic swatch boxes should appear blank/no color (showing the background color of the page rather than the primary token color). This confirms the swatch is reading from the CSS variable, not from a hardcoded hex.

**Step 4: Revert the token rename**

Restore `primary_BROKEN` → `primary` in `src/preset/semantic-tokens.ts`.

**Step 5: Rebuild Panda and confirm recovery**

```bash
pnpm build:panda
```

Storybook: primary swatches return to their correct green color.

---

## Task 4: Commit Colors + test result

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System
git add src/stories/foundations/components/ColorSwatch.tsx \
        src/stories/foundations/Colors.mdx
git commit -m "feat: Colors.mdx uses Panda token CSS vars for semantic swatches

- SemanticSwatch now accepts name prop (token key) + lookup table
- Light/dark swatches use data-theme wrapper + same css() class
- Token labels show token path instead of hex strings
- Tonal palette grid removed (internal values, not Panda tokens)
  → replaced with note pointing to Color Scale story
- material3Language removed from all rendering paths in Colors.mdx

Test performed: renamed 'primary' → 'primary_BROKEN' in semantic-tokens.ts,
confirmed primary swatches went blank; reverted, confirmed recovery."
```

---

## Task 5: Update `ElevationCard.tsx` — use shadow tokens

**Files:**

- Modify: `src/stories/foundations/components/ElevationCard.tsx`

**Step 1: Add `css` import and pre-declare elevation classes**

```tsx
import { css } from 'styled-system/css';
import { type CSSProperties } from 'react';

// ── Pre-declared css() calls — Panda CSS statically extracts these ─────────
const elevationClasses: Record<string, string> = {
  level0: css({ boxShadow: 'level0' }),
  level1: css({ boxShadow: 'level1' }),
  level2: css({ boxShadow: 'level2' }),
  level3: css({ boxShadow: 'level3' }),
  level4: css({ boxShadow: 'level4' }),
  level5: css({ boxShadow: 'level5' }),
};

export { elevationClasses };
```

**Step 2: Update `ElevationCardProps` — remove `shadow` prop**

```tsx
interface ElevationCardProps {
  level: string;
}
```

**Step 3: Update `ElevationCard` component**

Remove `shadow` from the destructured props. Remove `boxShadow` from `cardStyle`. Apply `elevationClasses[level]` as className on the card div:

```tsx
export const ElevationCard = ({ level }: ElevationCardProps) => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '32px',
  };

  const cardStyle: CSSProperties = {
    width: '200px',
    height: '120px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    // boxShadow applied via className — reads from Panda CSS variable
  };

  const labelStyle: CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '8px',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      <div style={labelStyle}>{level}</div>
      <div style={cardStyle} className={elevationClasses[level]}>
        <span style={{ color: '#999', fontSize: '14px' }}>
          {level === 'level0' ? 'No shadow' : 'Elevation'}
        </span>
      </div>
    </div>
  );
};
```

**Step 4: Update `ElevationGrid` — remove `elevations` prop, render fixed levels**

```tsx
export const ElevationGrid = () => {
  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '48px',
    marginTop: '32px',
    padding: '32px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  };

  return (
    <div style={gridStyle}>
      {(
        ['level0', 'level1', 'level2', 'level3', 'level4', 'level5'] as const
      ).map((level) => (
        <ElevationCard key={level} level={level} />
      ))}
    </div>
  );
};
```

**Step 5: Typecheck**

```bash
pnpm typecheck
```

---

## Task 6: Update `Elevation.mdx` — use token classes, remove material3Language

**Files:**

- Modify: `src/stories/foundations/Elevation.mdx`

**Step 1: Update imports**

Replace:

```mdx
import { ElevationGrid } from './components/ElevationCard';
import { material3Language } from '../../languages/material3.language';
```

With:

```mdx
import { ElevationGrid, elevationClasses } from './components/ElevationCard';
```

**Step 2: Update `<ElevationGrid />` — remove props**

Find:

```jsx
<ElevationGrid elevations={material3Language.elevation.levels} />
```

Replace with:

```jsx
<ElevationGrid />
```

**Step 3: Update "Visual Comparison — Cards with Different Elevations" section**

This section has an inline grid with three cards (Level 0, 1, 2). Each div uses `boxShadow: material3Language.elevation.levels.levelX`.

Replace `boxShadow: material3Language.elevation.levels.level0` with `className={elevationClasses['level0']}` (and remove the boxShadow from the style object). Do this for level0, level1, level2.

For example, the Level 0 card changes from:

```jsx
<div style={{
  padding: '24px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: material3Language.elevation.levels.level0,
  textAlign: 'center'
}}>
```

To:

```jsx
<div
  className={elevationClasses['level0']}
  style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', textAlign: 'center' }}
>
```

**Step 4: Update "Floating Elements" section**

Same treatment for level3, level4, level5 cards in the second visual grid.

**Step 5: Typecheck**

```bash
pnpm typecheck
```

---

## Task 7: Commit Elevation changes

```bash
git add src/stories/foundations/components/ElevationCard.tsx \
        src/stories/foundations/Elevation.mdx
git commit -m "feat: Elevation.mdx uses Panda token CSS vars for shadow swatches

- elevationClasses lookup: 6 explicit css({ boxShadow: 'levelX' }) entries
- ElevationCard uses className instead of inline boxShadow style
- ElevationGrid renders fixed level array, no longer accepts elevations prop
- elevationClasses exported for use in Elevation.mdx inline cards
- material3Language removed from all rendering paths in Elevation.mdx"
```

---

## Task 8: Update `SpacingBox.tsx` — use width tokens

**Files:**

- Modify: `src/stories/foundations/components/SpacingBox.tsx`

**Step 1: Add `css` import and pre-declare spacing width classes**

```tsx
import { css } from 'styled-system/css';
import { type CSSProperties } from 'react';

// ── Pre-declared css() calls — Panda CSS statically extracts these ─────────
const spacingWidthClasses: Record<string, string> = {
  none: css({ width: 'none' }),
  xxs: css({ width: 'xxs' }),
  xs: css({ width: 'xs' }),
  sm: css({ width: 'sm' }),
  md: css({ width: 'md' }),
  lg: css({ width: 'lg' }),
  xl: css({ width: 'xl' }),
  xxl: css({ width: 'xxl' }),
  xxxl: css({ width: 'xxxl' }),
};
```

**Step 2: Update `SpacingBox` component**

The `value` prop is kept for the px label. Remove `width: value` from `boxStyle`. Apply `spacingWidthClasses[name]` as className:

```tsx
export const SpacingBox = ({ name, value }: SpacingBoxProps) => {
  // ... same containerStyle, labelContainerStyle, nameStyle, valueStyle, boxContainerStyle ...

  const boxStyle: CSSProperties = {
    height: '40px',
    backgroundColor: '#4C662B',
    borderRadius: '4px',
    position: 'relative',
    // width applied via className — reads from Panda CSS variable
  };

  const dimensionStyle: CSSProperties = {
    position: 'absolute',
    top: '-20px',
    left: '0',
    right: '0',
    fontSize: '10px',
    fontFamily: 'monospace',
    color: '#999',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={labelContainerStyle}>
        <div style={nameStyle}>{name}</div>
        <div style={valueStyle}>{value}</div>
      </div>
      <div style={boxContainerStyle}>
        <div style={boxStyle} className={spacingWidthClasses[name]}>
          <div style={dimensionStyle}>{value}</div>
        </div>
      </div>
    </div>
  );
};
```

Keep `SpacingGrid` as-is (it already passes `name` and `value`).

**Step 3: Typecheck**

```bash
pnpm typecheck
```

---

## Task 9: Update `Spacing.mdx` — remove material3Language from rendering

**Files:**

- Modify: `src/stories/foundations/Spacing.mdx`

**Step 1: Update imports**

Remove the material3Language import entirely:

```mdx
import { Meta } from '@storybook/addon-docs/blocks';
import { SpacingBox } from './components/SpacingBox';
import { material3Language } from '../../languages/material3.language';
```

Replace with:

```mdx
import { Meta } from '@storybook/addon-docs/blocks';
import { SpacingBox } from './components/SpacingBox';
```

**Step 2: The `<SpacingBox>` calls in the spacing scale section — no change needed**

The calls already pass `name` and `value` with static strings:

```jsx
<SpacingBox name="none" value={material3Language.spacing.none} />
```

These use `material3Language` for the `value` prop which is **display only** (the px label). The spec says we can keep material3Language for static label text. However, since we're removing the import, we need to replace with static values.

Replace the nine `<SpacingBox>` calls with static values:

```jsx
<SpacingBox name="none" value="0px" />
<SpacingBox name="xxs"  value="2px" />
<SpacingBox name="xs"   value="4px" />
<SpacingBox name="sm"   value="8px" />
<SpacingBox name="md"   value="16px" />
<SpacingBox name="lg"   value="24px" />
<SpacingBox name="xl"   value="32px" />
<SpacingBox name="xxl"  value="48px" />
<SpacingBox name="xxxl" value="64px" />
```

**Step 3: Update the Spacing Reference Table**

The table uses `{material3Language.spacing.none}` etc. in the Value column. Replace with static values:

```mdx
| Token  | Value | Pixels | Use Case                        |
| ------ | ----- | ------ | ------------------------------- |
| `none` | 0px   | 0px    | Reset spacing, remove gaps      |
| `xxs`  | 2px   | 2px    | Minimal gaps, fine-tuning       |
| `xs`   | 4px   | 4px    | Tight spacing within components |
| `sm`   | 8px   | 8px    | Component internal spacing      |
| `md`   | 16px  | 16px   | Default spacing, component gaps |
| `lg`   | 24px  | 24px   | Section spacing, card padding   |
| `xl`   | 32px  | 32px   | Large section breaks            |
| `xxl`  | 48px  | 48px   | Major section dividers          |
| `xxxl` | 64px  | 64px   | Page-level spacing              |
```

**Step 4: Update "Visual Examples" section — replace material3Language gap/padding**

Three container divs use `gap: material3Language.spacing.sm`, `gap: material3Language.spacing.md`, `gap: material3Language.spacing.lg` and `padding: material3Language.spacing.md/lg/xl`.

Replace each with static px strings:

- `gap: material3Language.spacing.sm` → `gap: '8px'`
- `gap: material3Language.spacing.md` → `gap: '16px'`
- `gap: material3Language.spacing.lg` → `gap: '24px'`
- `padding: material3Language.spacing.md` → `padding: '16px'`
- `padding: material3Language.spacing.lg` → `padding: '24px'`
- `padding: material3Language.spacing.xl` → `padding: '32px'`

**Step 5: Typecheck**

```bash
pnpm typecheck
```

---

## Task 10: Commit Spacing changes

```bash
git add src/stories/foundations/components/SpacingBox.tsx \
        src/stories/foundations/Spacing.mdx
git commit -m "feat: Spacing.mdx uses Panda token CSS vars for spacing bars

- spacingWidthClasses lookup: 9 explicit css({ width: 'tokenName' }) entries
- SpacingBox uses className for the visual width bar
- value prop kept for px label display only
- material3Language removed from Spacing.mdx (static values inlined)"
```

---

## Task 11: Update `TypeSpecimen.tsx` — use textStyle tokens

**Files:**

- Modify: `src/stories/foundations/components/TypeSpecimen.tsx`

**Step 1: Add `css` import and pre-declare textStyle classes**

```tsx
import { css } from 'styled-system/css';
import { type CSSProperties } from 'react';

// ── Pre-declared css() calls — Panda CSS statically extracts these ─────────
const textStyleClasses: Record<string, string> = {
  displayLarge: css({ textStyle: 'displayLarge' }),
  displayMedium: css({ textStyle: 'displayMedium' }),
  displaySmall: css({ textStyle: 'displaySmall' }),
  headlineLarge: css({ textStyle: 'headlineLarge' }),
  headlineMedium: css({ textStyle: 'headlineMedium' }),
  headlineSmall: css({ textStyle: 'headlineSmall' }),
  titleLarge: css({ textStyle: 'titleLarge' }),
  titleMedium: css({ textStyle: 'titleMedium' }),
  titleSmall: css({ textStyle: 'titleSmall' }),
  bodyLarge: css({ textStyle: 'bodyLarge' }),
  bodyMedium: css({ textStyle: 'bodyMedium' }),
  bodySmall: css({ textStyle: 'bodySmall' }),
  labelLarge: css({ textStyle: 'labelLarge' }),
  labelMedium: css({ textStyle: 'labelMedium' }),
  labelSmall: css({ textStyle: 'labelSmall' }),
};
```

**Step 2: Update `TypeSpecimenProps` — add `styleName` prop**

```tsx
interface TypeSpecimenProps {
  styleName: string;
  name: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
  fontFamily: string;
  sampleText?: string;
}
```

**Step 3: Update the component — use textStyle class for specimen text**

The `specimenStyle` object with raw fontSize/lineHeight/fontWeight/letterSpacing/fontFamily should be removed from the specimen div. The `textStyleClasses[styleName]` class handles all typography. Keep a minimal style for `color` and `marginBottom`:

```tsx
export const TypeSpecimen = ({
  styleName,
  name,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  fontFamily,
  sampleText = 'The quick brown fox jumps over the lazy dog',
}: TypeSpecimenProps) => {
  // ... containerStyle, headerStyle, nameStyle, propertiesStyle, propertyStyle, propertyLabelStyle stay unchanged ...

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={nameStyle}>{name}</div>
      </div>
      {/* Specimen text: uses Panda textStyle token — blank if token broken */}
      <div
        className={textStyleClasses[styleName]}
        style={{ color: '#000', marginBottom: '16px' }}
      >
        {sampleText}
      </div>
      {/* Spec table: shows raw token values for reference */}
      <div style={propertiesStyle}>
        <div style={propertyStyle}>
          <div style={propertyLabelStyle}>Font Size</div>
          <div>{fontSize}</div>
        </div>
        <div style={propertyStyle}>
          <div style={propertyLabelStyle}>Line Height</div>
          <div>{lineHeight}</div>
        </div>
        <div style={propertyStyle}>
          <div style={propertyLabelStyle}>Font Weight</div>
          <div>{fontWeight}</div>
        </div>
        <div style={propertyStyle}>
          <div style={propertyLabelStyle}>Letter Spacing</div>
          <div>{letterSpacing}</div>
        </div>
        <div style={propertyStyle}>
          <div style={propertyLabelStyle}>Font Family</div>
          <div>{fontFamily}</div>
        </div>
      </div>
    </div>
  );
};
```

Remove the `getFontFamilyString` helper function — it's no longer needed since the specimen uses the Panda textStyle class.

**Step 4: Typecheck**

```bash
pnpm typecheck
```

---

## Task 12: Update `Typography.mdx` — add styleName prop, remove material3Language

**Files:**

- Modify: `src/stories/foundations/Typography.mdx`

**Step 1: Update imports**

Remove material3Language import:

```mdx
import { Meta } from '@storybook/addon-docs/blocks';
import { TypeSpecimen } from './components/TypeSpecimen';
```

**Step 2: Update Font Families section — replace dynamic font strings with static**

Replace three occurrences:

- `fontFamily: material3Language.typography.fonts.display` → `fontFamily: '"Fraunces", Georgia, serif'`
- `fontFamily: material3Language.typography.fonts.body` → `fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'`
- `fontFamily: material3Language.typography.fonts.mono` → `fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace'`

**Step 3: Add `styleName` prop to all 15 `<TypeSpecimen>` calls**

Each call currently looks like:

```jsx
<TypeSpecimen
  name="Display Large"
  fontSize={material3Language.typography.scale.displayLarge.fontSize}
  lineHeight={material3Language.typography.scale.displayLarge.lineHeight}
  fontWeight={material3Language.typography.scale.displayLarge.fontWeight}
  letterSpacing={material3Language.typography.scale.displayLarge.letterSpacing}
  fontFamily={material3Language.typography.scale.displayLarge.fontFamily}
  sampleText="Display Large"
/>
```

Add `styleName="displayLarge"` (and keep all existing props for the spec table). The `styleName` value matches the Panda textStyle key:

| name prop         | styleName        |
| ----------------- | ---------------- |
| "Display Large"   | `displayLarge`   |
| "Display Medium"  | `displayMedium`  |
| "Display Small"   | `displaySmall`   |
| "Headline Large"  | `headlineLarge`  |
| "Headline Medium" | `headlineMedium` |
| "Headline Small"  | `headlineSmall`  |
| "Title Large"     | `titleLarge`     |
| "Title Medium"    | `titleMedium`    |
| "Title Small"     | `titleSmall`     |
| "Body Large"      | `bodyLarge`      |
| "Body Medium"     | `bodyMedium`     |
| "Body Small"      | `bodySmall`      |
| "Label Large"     | `labelLarge`     |
| "Label Medium"    | `labelMedium`    |
| "Label Small"     | `labelSmall`     |

**Step 4: Replace `material3Language.typography.scale.*` props with static values**

After adding `styleName`, the remaining props are for the spec table only. Replace dynamic lookups with static strings from `material3Language.ts`:

```
displayLarge:   57px / 64px / 400 / -0.25px / display
displayMedium:  45px / 52px / 400 / 0px     / display
displaySmall:   36px / 44px / 400 / 0px     / display
headlineLarge:  32px / 40px / 400 / 0px     / display
headlineMedium: 28px / 36px / 400 / 0px     / display
headlineSmall:  24px / 32px / 400 / 0px     / display
titleLarge:     22px / 28px / 400 / 0px     / body
titleMedium:    16px / 24px / 500 / 0.15px  / body
titleSmall:     14px / 20px / 500 / 0.1px   / body
bodyLarge:      16px / 24px / 400 / 0.5px   / body
bodyMedium:     14px / 20px / 400 / 0.25px  / body
bodySmall:      12px / 16px / 400 / 0.4px   / body
labelLarge:     14px / 20px / 500 / 0.1px   / body
labelMedium:    12px / 16px / 500 / 0.5px   / body
labelSmall:     11px / 16px / 500 / 0.5px   / body
```

Verify these values against `src/languages/material3.language.ts` before writing them into the mdx — don't assume they're correct from this plan.

**Step 5: Typecheck**

```bash
pnpm typecheck
```

---

## Task 13: Commit Typography changes

```bash
git add src/stories/foundations/components/TypeSpecimen.tsx \
        src/stories/foundations/Typography.mdx
git commit -m "feat: Typography.mdx uses Panda textStyle tokens for specimen rendering

- textStyleClasses lookup: 15 explicit css({ textStyle: '...' }) entries
- TypeSpecimen specimen div uses className from lookup, not inline specimenStyle
- styleName prop added to all 15 TypeSpecimen calls in Typography.mdx
- Font family display uses static strings (font names aren't Panda tokens)
- material3Language removed from all rendering paths in Typography.mdx"
```

---

## Task 14: Final verification

**Step 1: Run full test suite**

```bash
pnpm test
```

Expected: 306/306 pass (display components have no unit tests; the token-contract test remains valid since we didn't change semantic-tokens.ts).

**Step 2: TypeScript check**

```bash
pnpm typecheck
```

Expected: 0 errors.

**Step 3: Build check**

```bash
pnpm build
```

Expected: clean build.

**Step 4: Storybook smoke check**

```bash
pnpm dev
```

Open each of the four stories:

- Foundations → Colors: semantic swatches show token-resolved colors; tonal section shows the reference note
- Foundations → Elevation: ElevationGrid shows 6 levels via box-shadow tokens; Visual Comparison section renders correctly
- Foundations → Spacing: SpacingBox bars render at correct widths; px labels still visible
- Foundations → Typography: TypeSpecimen specimens render with correct font/size via textStyle tokens; spec tables still show raw values

No console errors expected.

---

## Task 15: Update sequence status doc + final commit

**Step 1: Find the sequence status doc**

```bash
ls docs/
```

Look for a file tracking "Steps 1–N complete" — likely `docs/design-system-setup-prompt.md` or similar.

**Step 2: Mark Step 7 complete**

Find the Step 7 entry and update its status from pending to complete.

**Step 3: Final commit**

```bash
git add docs/
git commit -m "docs: mark Step 7 complete — Panda token resolution for foundation stories"
```

---

## Quick Reference: Panda Token Paths Used

| Rendered property          | Panda token syntax                                                        |
| -------------------------- | ------------------------------------------------------------------------- |
| Semantic color backgrounds | `css({ bg: 'primary' })`, `css({ bg: 'primary.container' })` etc.         |
| Box shadow levels          | `css({ boxShadow: 'level0' })` … `css({ boxShadow: 'level5' })`           |
| Spacing widths             | `css({ width: 'none' })`, `css({ width: 'sm' })` etc.                     |
| Typography                 | `css({ textStyle: 'displayLarge' })` … `css({ textStyle: 'labelSmall' })` |

All lookups follow the same pattern as `ColorScale.stories.tsx` — explicit string literals, no dynamic interpolation.
