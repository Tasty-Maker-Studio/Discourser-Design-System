# STORY-006a: Figma Translation System — Foundation Files (00-04)

> **Epic:** Kai Agent — Design System MCP Integration
> **Parent Story:** STORY-006: Figma-to-Discourser Translation System
> **Part:** 1 of 3
> **Estimate:** 1.5-2hr

---

## Context

We're building a Figma-to-Discourser translation system — a multi-file MDX documentation suite in Storybook that maps external design vocabulary (Figma, Tailwind, Shadcn) to Discourser Design System vocabulary (Panda CSS, Park UI, Ark UI).

This is the core translation layer for:
- The **Kai Design Engineer agent** (reads these docs via Storybook MCP to make token/component decisions)
- **Human developers** onboarding from Tailwind/Shadcn projects
- **Design System as a Service** clients receiving implementation specs

This prompt covers the **overview + token-level mapping files** (files 00-04). No component knowledge needed — just tokens verified against `panda.config.ts`.

---

## Prerequisites — READ THESE FIRST

Before writing ANY code, read these files to understand the existing vocabulary and conventions:

1. `panda.config.ts` — The actual semantic tokens defined (fg.default, fg.muted, fg.subtle, canvas, border, radii l1/l2/l3, shadows). **This is the source of truth for every token name you reference.**
2. `src/preset/semantic-tokens.ts` — M3 semantic token definitions (surface, onSurface, outline, etc.)
3. `src/preset/shadows.ts` — Park UI shadow token scale
4. `stories/documentation/guidelines/design-tokens/colors.mdx` — Existing M3 color token docs
5. `stories/documentation/guidelines/design-tokens/spacing.mdx` — Existing spacing scale docs
6. `stories/documentation/guidelines/design-tokens/typography.mdx` — Existing typography scale docs
7. `stories/documentation/guidelines/design-tokens/elevation.mdx` — Existing shadow/elevation docs
8. `stories/documentation/guidelines/components/button.mdx` — Example of existing doc format (use as structure reference)

---

## Deliverables

Create directory: `stories/documentation/figma-translation/`

Create these 5 files:

### File 1: `00-FigmaTranslation.mdx`

**Storybook sidebar:** `Documentation/Figma Translation/00-Overview`

```tsx
import { Meta } from '@storybook/addon-docs/blocks';
<Meta title="Documentation/Figma Translation/00-Overview" />
```

Content:
- What this document suite is (translation layer between Figma/Tailwind/Shadcn vocabulary and Discourser)
- Who it's for (Kai agent, human developers onboarding from Tailwind/Shadcn projects)
- How to use it (look up the external term → get the Discourser equivalent)
- Architecture summary: Figma/Shadcn → Tailwind utilities → Discourser semantic tokens → Panda CSS output
- The 3-layer token architecture:
  - **Layer 1 (Infrastructure):** Panda CSS / Park UI token names (`xs`, `sm`, `md`, `lg`, `xl`) — unchanging
  - **Layer 2 (Design Language):** Material 3 — provides VALUES mapped to Layer 1 names — swappable
  - **Layer 3 (Components):** Recipes reference Layer 1 only — decoupled from aesthetic
- Table of contents linking to all sub-pages (01 through 07)

### File 2: `01-Colors.mdx`

**Storybook sidebar:** `Documentation/Figma Translation/01-Colors`

Translation tables with THREE columns: **Source (Figma/Tailwind/Shadcn) | Discourser Token | Notes**

**Background colors section:**

| Source (Figma/Tailwind/Shadcn) | Discourser | Notes |
|---|---|---|
| `bg-background`, `bg-white` | `bg="canvas"` | Page-level background, resolves to gray.1 |
| `bg-card`, `bg-popover` | `bg="bg.default"` or use component (Card.Root handles this) | Surface containers |
| `bg-muted` | `bg="bg.muted"` | Subtle background areas |
| `bg-primary` | `colorPalette="primary"` (on components) or `bg="primary.9"` (raw) | Primary action surfaces |
| `bg-secondary` | `colorPalette="secondary"` or `bg="secondary.9"` | Secondary surfaces |
| `bg-destructive` | `colorPalette="error"` or `bg="error.9"` | Error/destructive surfaces |
| `bg-accent` | `bg="primary.a3"` or `bg="secondary.a3"` | Accent/highlight backgrounds |

**Text colors section:**

| Source | Discourser | Notes |
|---|---|---|
| `text-foreground` | `color="fg.default"` | Primary text, resolves to gray.12 |
| `text-muted-foreground` | `color="fg.muted"` | Secondary text, resolves to gray.11 |
| `text-primary` | `color="primary.11"` | Branded text |
| `text-destructive` | `color="error.11"` | Error text |
| `text-primary-foreground` | `color="primary.contrast"` | Text on primary backgrounds |

**Border colors section:**

| Source | Discourser | Notes |
|---|---|---|
| `border`, `border-input` | `borderColor="border"` | Default border, resolves to gray.6 |
| `border-primary` | `borderColor="primary.7"` | Primary-colored borders |

**M3 Surface System section** (when Figma uses M3 vocabulary directly):

| Source (M3) | Discourser | Notes |
|---|---|---|
| `surface` | `bg="surface"` | M3 base surface |
| `surfaceContainer` | `bg="surface.container"` | M3 default container |
| `surfaceContainerLow` | `bg="surface.container.low"` | M3 low elevation |
| `surfaceContainerHigh` | `bg="surface.container.high"` | M3 high elevation |
| `surfaceContainerHighest` | `bg="surface.container.highest"` | M3 highest elevation |
| `onSurface` | `color="onSurface"` | Text on M3 surfaces |
| `onSurfaceVariant` | `color="onSurface.variant"` | Secondary text on M3 surfaces |
| `outline` | `borderColor="outline"` | M3 outline |
| `outlineVariant` | `borderColor="outline.variant"` | M3 subtle outline |

**Color Palette System section:**
- Explain the `colorPalette` prop system
- Rule: Components that support colorPalette prop → ALWAYS use colorPalette, not direct color tokens
- Available palettes: primary, secondary, tertiary, error, neutral/gray
- Radix scale explanation: 1-12 scale where 1=lightest, 12=darkest, 9=solid, a1-a12=alpha variants
- When to use `colorPalette="primary"` vs `bg="primary.9"` directly

**Common Mistakes section** with ❌/✅ examples:
```tsx
// ❌ WRONG: Hardcoded hex value
<Box bg="#4C662B">

// ❌ WRONG: Using Tailwind class name
<Box className="bg-primary">

// ❌ WRONG: Using raw Radix scale when component supports colorPalette
<Button bg="primary.9" color="primary.contrast">

// ✅ CORRECT: Semantic token
<Box bg="canvas">

// ✅ CORRECT: colorPalette on component
<Button colorPalette="primary">

// ✅ CORRECT: Radix scale for custom styling outside components
<Box bg="primary.3">
```

Cross-reference: Link to `Documentation/Guidelines/99-Colors` for full M3 color role details.

### File 3: `02-Typography.mdx`

**Storybook sidebar:** `Documentation/Figma Translation/02-Typography`

**Tailwind → M3 textStyle mapping table:**

| Source (Tailwind) | Discourser | Size | Notes |
|---|---|---|---|
| `text-xs` | `textStyle="labelSmall"` | 11px | Smallest readable text |
| `text-sm` | `textStyle="bodySmall"` | 12px | Captions, help text |
| `text-base` | `textStyle="bodyMedium"` | 14px | Default body text |
| `text-lg` | `textStyle="bodyLarge"` | 16px | Emphasized body |
| `text-xl` | `textStyle="titleSmall"` | 14px/500wt | Card titles, list headers |
| `text-2xl` | `textStyle="titleLarge"` or `<Heading size="xl">` | 22px | Section titles |
| `text-3xl` | `textStyle="headlineSmall"` or `<Heading size="2xl">` | 24px | Page subtitles |
| `text-4xl` | `textStyle="headlineLarge"` or `<Heading size="3xl">` | 32px | Page titles |
| `text-5xl`+ | `textStyle="displaySmall"` or `<Heading size="4xl">` | 36px+ | Hero text |

**Font family mapping:**

| Source | Discourser | Font |
|---|---|---|
| `font-sans` | `fontFamily="body"` | Poppins |
| `font-serif` | `fontFamily="display"` | Fraunces |
| `font-mono` | `fontFamily="mono"` | JetBrains Mono |

**Font weight mapping:**

| Source | Discourser | Value |
|---|---|---|
| `font-normal` | `fontWeight="normal"` | 400 |
| `font-medium` | `fontWeight="medium"` | 500 |
| `font-semibold` | `fontWeight="semibold"` | 600 |
| `font-bold` | `fontWeight="bold"` | 700 |

**Heading component section:**
- Rule: For headings, ALWAYS prefer `<Heading size="...">` component over raw textStyle
- Available sizes: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl
- Heading renders as h-tag levels — map Figma heading levels to component

**Common Mistakes** with ❌/✅ examples showing raw font-size vs textStyle vs Heading component.

Cross-reference: Link to `Documentation/Guidelines/99-Typography` for full M3 type scale.

### File 4: `03-Spacing.mdx`

**Storybook sidebar:** `Documentation/Figma Translation/03-Spacing`

**Tailwind numeric → Panda CSS numeric mapping:**

| Source (Tailwind) | Discourser | Pixels | Notes |
|---|---|---|---|
| `p-0`, `gap-0` | `p="0"`, `gap="0"` | 0px | Direct match |
| `p-0.5` | `p="0.5"` | 2px | |
| `p-1` | `p="1"` | 4px | |
| `p-2` | `p="2"` | 8px | |
| `p-3` | `p="3"` | 12px | |
| `p-4` | `p="4"` | 16px | Most common |
| `p-5` | `p="5"` | 20px | |
| `p-6` | `p="6"` | 24px | |
| `p-8` | `p="8"` | 32px | |
| `p-10` | `p="10"` | 40px | |
| `p-12` | `p="12"` | 48px | |
| `p-16` | `p="16"` | 64px | |

**Named token mapping** (from spacing.mdx):

| Named Token | Numeric Equivalent | Pixels | Usage |
|---|---|---|---|
| `none` | `0` | 0px | Reset |
| `xxs` | `0.5` | 2px | Minimal gaps |
| `xs` | `1` | 4px | Tight spacing |
| `sm` | `2` | 8px | Compact layouts |
| `md` | `4` | 16px | Default spacing |
| `lg` | `6` | 24px | Comfortable spacing |
| `xl` | `8` | 32px | Major sections |
| `xxl` | `12` | 48px | Large sections |
| `xxxl` | `16` | 64px | Maximum spacing |

**Figma Auto-Layout translation section:**

| Figma Property | Discourser | Example |
|---|---|---|
| Auto-layout: Vertical, gap: 16 | `display="flex" flexDir="column" gap="4"` or `<VStack gap="4">` | Form fields |
| Auto-layout: Horizontal, gap: 8 | `display="flex" flexDir="row" gap="2"` or `<HStack gap="2">` | Button groups |
| Auto-layout: Wrap | `<Flex wrap="wrap" gap="4">` | Tag clouds |
| Padding: 16px all sides | `p="4"` | Card content |
| Padding: 24px H, 16px V | `px="6" py="4"` | Page sections |
| Padding: 16px top, 8px bottom | `pt="4" pb="2"` | Asymmetric spacing |
| Gap: 16px | `gap="4"` | Between siblings |

**Common Mistakes** with ❌/✅ examples showing pixel values vs token values.

Cross-reference: Link to `Documentation/Guidelines/99-Spacing`.

### File 5: `04-Shadows-Radii.mdx`

**Storybook sidebar:** `Documentation/Figma Translation/04-Shadows & Radii`

**Shadow mapping:**

| Source (Tailwind) | Discourser | M3 Level | Notes |
|---|---|---|---|
| `shadow-none` | `shadow="none"` | Level 0 | Flat |
| `shadow-sm` | `shadow="xs"` | — | Subtle lift |
| `shadow` | `shadow="sm"` | Level 1 | Cards |
| `shadow-md` | `shadow="md"` | Level 2 | Raised elements |
| `shadow-lg` | `shadow="lg"` | Level 3 | Dialogs, menus |
| `shadow-xl` | `shadow="xl"` | Level 4 | Drawers |
| `shadow-2xl` | `shadow="2xl"` | Level 5 | Modals |

Note: Verify exact Park UI shadow token names against `src/preset/shadows.ts`. The above mapping is approximate — confirm every token exists.

Include a note: M3 primarily uses surface tint (surfaceContainer colors) for elevation, not shadows alone. Shadows are supplementary.

**Border radius mapping:**

| Source (Tailwind) | Discourser | Pixels | Notes |
|---|---|---|---|
| `rounded-none` | `rounded="none"` | 0 | |
| `rounded-sm` | `rounded="l1"` | 2px | Subtle rounding |
| `rounded` | `rounded="l2"` | 6px | Default |
| `rounded-md` | `rounded="l2"` | 6px | Same as default |
| `rounded-lg` | `rounded="l3"` | 8px | Cards, dialogs |
| `rounded-xl` | `rounded="xl"` | 12px | Large cards |
| `rounded-2xl` | `rounded="2xl"` | 16px | Pills, large containers |
| `rounded-full` | `rounded="full"` | 9999px | Avatars, circular |

Note: Verify radii tokens. The l1/l2/l3 tokens are defined in panda.config.ts semanticTokens.radii. Standard Panda preset radii (xs, sm, md, lg, xl, 2xl, full) also exist from @pandacss/preset-panda.

**Common Mistakes** with ❌/✅ examples.

Cross-reference: Link to `Documentation/Guidelines/99-Elevation`.

---

## Technical Requirements

1. **Every MDX file must start with:**
```tsx
import { Meta } from '@storybook/addon-docs/blocks';
<Meta title="Documentation/Figma Translation/[XX-Name]" />
```

2. **Tables must use consistent columns across all files.** First column = external/source term. Second column = Discourser equivalent. This is non-negotiable — machine parsing depends on it.

3. **Each mapping entry must be self-contained** — an agent or human can look up a single row and get a complete answer without reading surrounding context.

4. **Verify EVERY token name against actual config files** before writing it in a table. Check:
   - `panda.config.ts` semanticTokens section
   - `src/preset/semantic-tokens.ts`
   - `src/preset/shadows.ts`
   - `src/preset/colors/` directory
   
   If a token doesn't exist in config, DO NOT include it. Add a comment noting the gap instead.

5. **Run `pnpm storybook --no-open` briefly** after creating all files to verify MDX parses without errors. Kill after confirming no parse errors in terminal output.

---

## DO NOT

- Change any existing files outside the new `stories/documentation/figma-translation/` directory
- Modify `panda.config.ts` or any preset files
- Install any packages
- Create any `.stories.tsx` files — these are MDX documentation only
- Invent token names that don't exist in the config

---

## Acceptance Criteria

- [ ] `stories/documentation/figma-translation/` directory created
- [ ] `00-FigmaTranslation.mdx` — overview with architecture summary and links to all sub-pages
- [ ] `01-Colors.mdx` — complete color mapping (backgrounds, text, border, M3 surface, colorPalette system)
- [ ] `02-Typography.mdx` — complete typography mapping (text sizes, fonts, weights, Heading component)
- [ ] `03-Spacing.mdx` — complete spacing mapping (numeric scale, named tokens, Figma auto-layout)
- [ ] `04-Shadows-Radii.mdx` — complete shadow + border-radius mapping
- [ ] Every token referenced verified against actual config files
- [ ] All files render in Storybook without MDX parse errors
- [ ] Common Mistakes (❌/✅) section in each file (01-04)
- [ ] Cross-references to existing Guidelines MDX docs
