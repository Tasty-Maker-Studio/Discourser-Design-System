# STORY-006b: Figma Translation System — Component Mappings (05)

> **Epic:** Kai Agent — Design System MCP Integration
> **Parent Story:** STORY-006: Figma-to-Discourser Translation System
> **Part:** 2 of 3
> **Depends on:** STORY-006a (files 00-04 must exist)
> **Estimate:** 2-3hr

---

## Context

This prompt creates the **component registry** — the most comprehensive file in the translation suite. It maps every Discourser component from its Figma/Shadcn equivalent, including props, variants, import paths, and compound component anatomy.

**This file must be accurate.** Every import path, prop name, variant value, and compound anatomy must come from reading the actual source files — not from memory or guessing.

---

## Prerequisites — READ THESE FIRST

Before writing ANY code, read these files in this order:

1. **`src/components/index.ts`** — The complete list of exported components. Every component here MUST appear in the mapping.
2. **`panda.config.ts`** — Check the `recipes` and `slotRecipes` sections to know which components are simple (recipe) vs compound (slotRecipe).
3. **Read each component's guideline MDX** in `stories/documentation/guidelines/components/` — these have variant tables, prop lists, and usage guidance.
4. **Read each component's `.stories.tsx`** in `stories/` — these show actual prop values and usage patterns.
5. **Read the source file** for each component in `src/components/` — for compound components, this shows the exact anatomy (Root, Trigger, Content, etc.).
6. **`stories/documentation/figma-translation/00-FigmaTranslation.mdx`** — Read the overview from STORY-006a to understand the document conventions and architecture.

---

## Deliverable

Create one file: `stories/documentation/figma-translation/05-Components.mdx`

**Storybook sidebar:** `Documentation/Figma Translation/05-Components`

```tsx
import { Meta } from '@storybook/addon-docs/blocks';
<Meta title="Documentation/Figma Translation/05-Components" />
```

### Structure

Organize components into these groups:

1. **Interactive Elements:** Button, IconButton, Input, InputGroup, InputAddon, Textarea, Select, Checkbox, RadioGroup, Switch, Slider
2. **Layout & Containers:** Card, Accordion, Drawer, Tabs, Stepper
3. **Feedback & Status:** Badge, Avatar, Progress, Skeleton, Spinner, Toast
4. **Overlays:** Dialog, Popover, Tooltip
5. **Typography:** Heading
6. **Utility:** CloseButton, Group, AbsoluteCenter, Icon, Loader

### Per-Component Format

For **simple components** (recipe — listed in `panda.config.ts` under `recipes`):

```markdown
### [ComponentName]

**Maps from:** [Figma equivalent], [Shadcn equivalent if applicable]
**Import:** `import { [ComponentName] } from '@discourser/design-system'`
**Type:** Simple (recipe)

| Source (Figma/Shadcn) Prop | Discourser Prop | Values | Notes |
|---|---|---|---|
| [external prop] | [discourser prop] | [available values] | [mapping notes] |
```

For **compound components** (slotRecipe — listed in `panda.config.ts` under `slotRecipes`):

```markdown
### [ComponentName]

**Maps from:** [Figma equivalent], [Shadcn equivalent if applicable]
**Import:** `import { [ComponentName] } from '@discourser/design-system'`
**Type:** Compound (slot recipe)

**Anatomy:**
- `<ComponentName.Root>` — [purpose]
- `<ComponentName.Part>` — [purpose]
- ...

| Source (Shadcn) | Discourser | Notes |
|---|---|---|
| `<ShadcnPart>` | `<ComponentName.Part>` | [mapping notes] |

| Source Prop | Discourser Prop | Values | Notes |
|---|---|---|---|
| [external prop] | [discourser prop] | [available values] | [notes] |
```

### Detailed Mapping Requirements

Here's what MUST be covered for key components. For each, read the actual source file and guideline MDX:

**Button** (recipe):
- Variant mapping: Shadcn "default" → Discourser "solid", "destructive" → `colorPalette="error"` (color, not variant)
- All variant values from recipe: solid, outline, ghost, subtle, elevated (verify against actual recipe)
- All size values from recipe (verify against actual recipe)
- Note that `colorPalette` prop changes the color theme, not a variant

**Card** (slotRecipe):
- Anatomy: Root, Header, Body, Footer, Title, Description
- Shadcn `<Card>` → `<Card.Root>`, `<CardHeader>` → `<Card.Header>`, etc.
- Note that Card is compound in Discourser but flat in Shadcn

**Dialog** (slotRecipe):
- Anatomy: Root, Trigger, Backdrop, Positioner, Content, Title, Description, CloseTrigger
- Critical: Shadcn `<DialogContent>` → `<Dialog.Positioner><Dialog.Content>` (needs positioner wrapper)
- Shadcn `<DialogHeader>` → `<VStack gap="1.5">` (no dedicated component — use layout)
- Shadcn `<DialogFooter>` → `<HStack gap="3" justify="flex-end">` (no dedicated component — use layout)

**Select** (slotRecipe):
- Full compound anatomy from Ark UI
- Shadcn Select is much simpler — note the structural differences

**Drawer** (slotRecipe):
- Similar to Dialog but with slide-in behavior
- Map Shadcn Sheet → Discourser Drawer

**Input / InputGroup / InputAddon**:
- Show how Shadcn's simple `<Input>` maps to potential InputGroup + InputAddon composition
- Variant and size mappings

**Toast** (slotRecipe):
- Programmatic API: `toaster.create()` vs Shadcn's `toast()`
- Show the different invocation pattern

**Accordion** (slotRecipe):
- Anatomy from Ark UI compound pattern

For ALL other components: read the source, guideline, and story to produce accurate mappings. Do not skip any component exported from `src/components/index.ts`.

### Common Mistakes Section

Include at the bottom:

```tsx
// ❌ WRONG: Using flat Shadcn pattern for compound Discourser component
<Dialog>
  <DialogContent>...</DialogContent>
</Dialog>

// ✅ CORRECT: Using Ark UI compound pattern
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>...</Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>

// ❌ WRONG: Using "destructive" as a variant
<Button variant="destructive">Delete</Button>

// ✅ CORRECT: Using colorPalette for destructive intent
<Button variant="solid" colorPalette="error">Delete</Button>

// ❌ WRONG: Importing from wrong path
import { Button } from '@ark-ui/react'
import { button } from '../preset/recipes/button'

// ✅ CORRECT: Importing from design system
import { Button } from '@discourser/design-system'
```

---

## Technical Requirements

1. **Read the actual source for every component** — Do not guess at anatomy, props, or variant values.
2. **Consistent table columns** — `Source (Figma/Shadcn) | Discourser | Notes` pattern maintained.
3. **Every import path must be `@discourser/design-system`** — this is the only valid import path for consumers.
4. **Cross-reference each component** to its guideline MDX with a link like: "See [Guidelines/99-Button] for full usage guidance."
5. **Verify against panda.config.ts** — recipe vs slotRecipe classification must match what's in config.

---

## DO NOT

- Change any existing files
- Modify any source code
- Install any packages
- Guess at component anatomy — read the source file
- Omit any component from `src/components/index.ts`

---

## Acceptance Criteria

- [ ] `05-Components.mdx` created with all components from `src/components/index.ts` mapped
- [ ] Components grouped by category (Interactive, Layout, Feedback, Overlays, Typography, Utility)
- [ ] Simple components have variant/size/prop tables from actual recipe definitions
- [ ] Compound components have full anatomy listing from actual source files
- [ ] Shadcn → Discourser structural mapping for all compound components (Dialog, Card, Select, etc.)
- [ ] Common Mistakes section with ❌/✅ patterns
- [ ] Every import path verified as `@discourser/design-system`
- [ ] Cross-references to existing guideline MDX docs
- [ ] Recipe vs slotRecipe classification matches `panda.config.ts`
- [ ] File renders in Storybook without MDX parse errors
