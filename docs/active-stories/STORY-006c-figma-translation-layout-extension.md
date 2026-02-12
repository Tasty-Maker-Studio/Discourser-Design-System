# STORY-006c: Figma Translation System — Layout Patterns + Extension Guide (06-07)

> **Epic:** Kai Agent — Design System MCP Integration
> **Parent Story:** STORY-006: Figma-to-Discourser Translation System
> **Part:** 3 of 3
> **Depends on:** STORY-006a (files 00-04) and STORY-006b (file 05)
> **Estimate:** 1.5-2hr

---

## Context

This prompt creates the final two files in the translation suite:
- **06-Layout.mdx** — Maps Figma auto-layout and Tailwind flex/grid to Panda CSS patterns. This subsumes the work originally planned for STORY-005 (Panda CSS Layout Pattern MDX Docs).
- **07-ExtensionGuide.mdx** — Templates and processes for maintaining the translation suite as the design system evolves. This is what makes the whole system sustainable.

---

## Prerequisites — READ THESE FIRST

1. **All files created by STORY-006a and STORY-006b** — Read the existing translation files (00-05) to match conventions, column formats, and tone.
2. `stories/documentation/guidelines/overview-patterns.mdx` — Existing layout/composition patterns. Reference but don't duplicate.
3. `stories/documentation/guidelines/design-tokens/spacing.mdx` — Spacing scale (already mapped in 03-Spacing.mdx, reference for consistency).
4. `panda.config.ts` — Check available breakpoint conditions, global CSS settings.
5. `src/components/index.ts` — Full component list for completeness checks in extension guide.

---

## Deliverables

### File 1: `stories/documentation/figma-translation/06-Layout.mdx`

**Storybook sidebar:** `Documentation/Figma Translation/06-Layout Patterns`

```tsx
import { Meta } from '@storybook/addon-docs/blocks';
<Meta title="Documentation/Figma Translation/06-Layout Patterns" />
```

**Figma/Tailwind → Panda CSS layout mapping:**

| Source (Figma/Tailwind) | Discourser | When to Use |
|---|---|---|
| `flex flex-col` | `display="flex" flexDir="column"` or `<VStack>` | Vertical stacking |
| `flex flex-row` | `display="flex" flexDir="row"` or `<HStack>` | Horizontal layout |
| `flex flex-wrap` | `<Flex wrap="wrap">` | Wrapping items |
| `grid grid-cols-2` | `display="grid" gridTemplateColumns="repeat(2, 1fr)"` or `<Grid columns={2}>` | Fixed column grid |
| `grid grid-cols-3` | `<Grid columns={{ base: 1, md: 3 }}>` | Responsive grid |
| `items-center` | `alignItems="center"` | Same prop name |
| `justify-between` | `justifyContent="space-between"` | Same prop name |
| `justify-center` | `justifyContent="center"` | Same prop name |
| `container mx-auto` | `maxW="breakpoint-xl" mx="auto"` | Centered container |
| `w-full` | `w="full"` | Full width |
| `h-screen`, `min-h-screen` | `h="100vh"` or `minH="dvh"` | Full viewport height |
| `space-y-4` | `display="flex" flexDir="column" gap="4"` | Use gap, not space utilities |
| `space-x-4` | `display="flex" flexDir="row" gap="4"` | Use gap, not space utilities |
| `divide-y` | Individual `borderBottom` on items or use gap + border approach | No direct equivalent |

**VStack vs HStack vs Grid vs Flex decision tree:**

| Layout Need | Use | Example |
|---|---|---|
| Stack items vertically with uniform gap | `<VStack gap="...">` | Form fields, card list |
| Stack items horizontally with uniform gap | `<HStack gap="...">` | Button groups, icon + text |
| Items need to wrap to next line | `<Flex wrap="wrap" gap="...">` | Tags, chips, badges |
| Fixed column/row structure | `<Grid columns={...}>` | Card grid, dashboard |
| Complex alignment + spacing | `display="flex"` with props | Custom layouts |

**Responsive breakpoint translation:**

| Source (Tailwind) | Discourser (Panda CSS) | Min Width |
|---|---|---|
| `sm:` | `sm:` or `{ sm: value }` | 640px |
| `md:` | `md:` or `{ md: value }` | 768px |
| `lg:` | `lg:` or `{ lg: value }` | 1024px |
| `xl:` | `xl:` or `{ xl: value }` | 1280px |
| `2xl:` | `2xl:` or `{ '2xl': value }` | 1536px |

**Two responsive syntax forms** (show both):

```tsx
// Object syntax (JSX props) — preferred for component props
<Box p={{ base: '4', md: '6', lg: '8' }}>
<Grid columns={{ base: 1, md: 2, lg: 3 }}>

// CSS utility syntax — preferred for css() calls
const styles = css({
  p: { base: '4', md: '6', lg: '8' },
  display: { base: 'block', md: 'grid' },
  gridTemplateColumns: { md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
});
```

**Common page layout patterns** (from overview-patterns.mdx, translated):

Show 3-4 common compositions:
1. **Page shell** — sidebar + main content area
2. **Form layout** — VStack of labeled fields with action buttons
3. **Card grid** — responsive grid of Card components
4. **Centered content** — max-width container with centered content

For each, show the Figma auto-layout structure alongside the Discourser implementation.

**Common Mistakes** section:

```tsx
// ❌ WRONG: Using Tailwind's space utilities
<div className="space-y-4">

// ✅ CORRECT: Using flex + gap
<VStack gap="4">

// ❌ WRONG: Fixed breakpoint values
<Box display={{ '640px': 'grid' }}>

// ✅ CORRECT: Named breakpoint tokens
<Box display={{ sm: 'grid' }}>

// ❌ WRONG: Using px for responsive queries
@media (min-width: 768px) { ... }

// ✅ CORRECT: Panda CSS responsive syntax
const styles = css({
  flexDir: { base: 'column', md: 'row' }
});
```

Cross-reference: Link to `Documentation/Guidelines/99-Overview Patterns` for complete composition examples.

---

### File 2: `stories/documentation/figma-translation/07-ExtensionGuide.mdx`

**Storybook sidebar:** `Documentation/Figma Translation/07-Extension Guide`

```tsx
import { Meta } from '@storybook/addon-docs/blocks';
<Meta title="Documentation/Figma Translation/07-Extension Guide" />
```

This file documents how to maintain and extend the translation suite. It's the "meta-doc" that ensures consistency as the design system evolves.

**Sections to include:**

#### 1. Adding a New Component Mapping

Provide the exact template:

```markdown
### [ComponentName]

**Maps from:** [Figma equivalent], [Shadcn equivalent]
**Import:** `import { [ComponentName] } from '@discourser/design-system'`
**Type:** Simple (recipe) | Compound (slot recipe)
**Added in:** v[X.Y.Z]

| Source (Figma/Shadcn) Prop | Discourser Prop | Values | Notes |
|---|---|---|---|

**Compound Anatomy (if applicable):**
- `<ComponentName.Root>` — [purpose]
- `<ComponentName.Part>` — [purpose]
```

Step-by-step process:
1. Check if component is recipe or slotRecipe in `panda.config.ts`
2. Read source file in `src/components/[ComponentName].tsx` for anatomy
3. Read guideline MDX in `stories/documentation/guidelines/components/[name].mdx` for variants/props
4. Find the closest Shadcn equivalent (if any) from [shadcn/ui docs](https://ui.shadcn.com)
5. Add entry to `05-Components.mdx` in the appropriate group
6. Add cross-reference link to component's guideline MDX

#### 2. Adding a New Token Mapping

For each token type, specify which file to update:

| Token Type | File to Update | Table to Add Entry To |
|---|---|---|
| Background color | `01-Colors.mdx` | Background colors table |
| Text color | `01-Colors.mdx` | Text colors table |
| Border color | `01-Colors.mdx` | Border colors table |
| Typography | `02-Typography.mdx` | Text size or font mapping table |
| Spacing | `03-Spacing.mdx` | Numeric or named token table |
| Shadow | `04-Shadows-Radii.mdx` | Shadow mapping table |
| Border radius | `04-Shadows-Radii.mdx` | Border radius table |

Process:
1. Verify new token exists in `panda.config.ts` (run `pnpm prepare` to regenerate)
2. Find the closest Tailwind/Shadcn equivalent
3. Add row to appropriate table maintaining column format: Source | Discourser | Notes
4. Run verification test: `pnpm test -- --grep translation` (STORY-011)

#### 3. Adding a New Color Palette

When a new palette bridge is created (using `create-palette-bridge.ts`):
1. Add palette name to `01-Colors.mdx` colorPalette system section
2. Add background/text/border entries for the new palette
3. Update `05-Components.mdx` — any components that support `colorPalette` need the new value listed
4. Run verification tests

#### 4. Versioning & Maintenance

When to re-verify translation docs:
- Any change to `panda.config.ts` semantic tokens
- Any new component added to `src/components/index.ts`
- Any recipe/slotRecipe modification (new variants, renamed props)
- Any design system version bump
- After running `pnpm prepare` if token output changes

How to verify:
```bash
# Run all translation verification tests (STORY-011)
pnpm test -- --grep translation

# Or manually check Storybook render
pnpm storybook
# Navigate to Documentation/Figma Translation and verify each page
```

#### 5. Relationship to Kai Sidecar Knowledge

The translation MDX files are comprehensive (for human + MCP consumption). Kai's sidecar knowledge fragments (`_bmad/_memory/kai-sidecar/knowledge/`) are **condensed extracts** optimized for agent context:
- Tables only, no prose explanations
- No Common Mistakes sections (Kai's instructions.md handles error prevention)
- Fragment per concern (colors, typography, components, layout) for selective loading

When updating translation MDX, also update the corresponding sidecar fragment (STORY-008).

#### 6. Document Conventions

- All tables: First column = Source/external term, Second column = Discourser equivalent
- All MDX files start with `import { Meta }` and `<Meta title="Documentation/Figma Translation/[XX-Name]" />`
- Common Mistakes in each file use ❌/✅ pattern
- Cross-references use Storybook page titles, not file paths
- File naming: `XX-Name.mdx` where XX is zero-padded number for sort order

---

## DO NOT

- Change any existing files (00-05.mdx)
- Modify source code or config
- Install packages

---

## Acceptance Criteria

- [ ] `06-Layout.mdx` created with layout primitive mapping, decision tree, responsive breakpoints, and page composition patterns
- [ ] `07-ExtensionGuide.mdx` created with templates for components, tokens, palettes + versioning process
- [ ] Layout file covers VStack/HStack/Grid/Flex with decision guidance
- [ ] Responsive breakpoint table with both syntax forms
- [ ] Extension guide has copy-pasteable templates for each type of addition
- [ ] Versioning section documents when/how to re-verify
- [ ] Kai sidecar relationship documented
- [ ] Both files render in Storybook without MDX parse errors
- [ ] Conventions section ensures future contributors maintain consistency
- [ ] Common Mistakes section in layout file with ❌/✅ patterns
