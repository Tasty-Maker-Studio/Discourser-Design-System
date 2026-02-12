# STORY-008: Extract Kai Sidecar Knowledge Fragments

> **Epic:** Kai Agent — Design System MCP Integration
> **Depends on:** STORY-006 (all parts), STORY-007 (sidecar structure scaffolded)
> **Estimate:** 2-3hr
> **Note:** This story executes in the **Discourser.ai** project, not the design system repo. However, the source content comes from the design system's translation docs. This file documents what to extract and how.

---

## Context

STORY-006 created comprehensive Figma Translation MDX docs in Storybook — designed for human readability and MCP queryability. The Kai agent needs **condensed extracts** optimized for LLM context loading:
- Tables only, no prose explanations
- No Common Mistakes sections (Kai's `instructions.md` handles error prevention)
- One fragment per concern for selective loading via `kai-index.csv`
- Total fragment size per task stays under agent context budget

This story extracts the translation MDX content into Kai-optimized sidecar fragments.

---

## Prerequisites

1. **STORY-006 complete** — All 8 translation MDX files exist in `Discourser-Design-System/stories/documentation/figma-translation/`
2. **STORY-007 complete** — Kai sidecar structure exists at `_bmad/_cfg/agents/kai/kai-sidecar/knowledge/`
3. **STORY-011 complete (recommended)** — Translation docs verified as accurate before extracting

---

## Deliverables

All files go in the Discourser.ai project's Kai sidecar knowledge directory:
```
_bmad/_cfg/agents/kai/kai-sidecar/knowledge/
```

### Fragment 1: `figma-translation-colors.md`

**Source:** `01-Colors.mdx`
**Extract:** All mapping tables (backgrounds, text, border, M3 surface, colorPalette). Strip prose, keep only tables and the colorPalette system rules (available palettes, when to use colorPalette vs direct token).

### Fragment 2: `figma-translation-typography.md`

**Source:** `02-Typography.mdx`
**Extract:** Text size mapping table, font family table, font weight table, Heading component size mapping. Strip prose.

### Fragment 3: `figma-translation-spacing.md`

**Source:** `03-Spacing.mdx`
**Extract:** Numeric scale table, named token table, Figma auto-layout translation table. Strip prose.

### Fragment 4: `figma-translation-shadows-radii.md`

**Source:** `04-Shadows-Radii.mdx`
**Extract:** Shadow mapping table, border radius table. Strip prose.

### Fragment 5: `figma-translation-components.md`

**Source:** `05-Components.mdx`
**Extract:** All component entries with their type (recipe/slotRecipe), import path, key props, and compound anatomy. This will be the largest fragment. Consider splitting into `figma-translation-components-interactive.md` and `figma-translation-components-compound.md` if too large for single context load.

### Fragment 6: `layout-patterns.md`

**Source:** `06-Layout.mdx`
**Extract:** Layout primitive mapping table, decision tree, responsive breakpoint table. Strip page composition examples (Kai can query Storybook MCP for those).

### Fragment 7: `component-catalog.md`

**Source:** Component guidelines in `stories/documentation/guidelines/components/` + `05-Components.mdx`
**Content:** Quick-reference catalog of all components with: name, type, variants, sizes, import path. One table, all components. This is the "at a glance" view Kai checks before diving into specific component details.

### Fragment 8: `token-decision-trees.md`

**Source:** Design token MDX files in `stories/documentation/guidelines/design-tokens/` + translation files
**Content:** Decision trees for common token choices:
- Which background token? (canvas vs surface vs surfaceContainer vs component default)
- Which text color? (fg.default vs fg.muted vs fg.subtle vs onSurface)
- Which shadow? (none vs xs vs sm vs md vs lg — with component context)
- Which border radius? (l1 vs l2 vs l3 vs none vs full — with component context)

### Update: `kai-index.csv`

Map task types to fragments:

```csv
task,fragment,description
color-mapping,figma-translation-colors.md,Figma/Tailwind/Shadcn color → Discourser token mapping
typography-mapping,figma-translation-typography.md,Text size/font/weight translation
spacing-mapping,figma-translation-spacing.md,Spacing scale + auto-layout translation
shadow-radius-mapping,figma-translation-shadows-radii.md,Shadow + border radius translation
component-selection,figma-translation-components.md,Full component mapping with props and anatomy
layout-decisions,layout-patterns.md,VStack/HStack/Grid/Flex selection + responsive patterns
component-catalog,component-catalog.md,Quick-reference: all components at a glance
token-decisions,token-decision-trees.md,Decision trees for semantic token selection
design-translate-full,figma-translation-colors.md;figma-translation-typography.md;figma-translation-spacing.md;figma-translation-shadows-radii.md;figma-translation-components.md;layout-patterns.md,Full context for DT workflow
design-validate,component-catalog.md;token-decision-trees.md;figma-translation-components.md,Context for DV (validation) workflow
```

---

## Extraction Rules

1. **Tables only** — Remove all prose paragraphs, introductions, and explanations
2. **Keep column headers** — Every table must retain its header row
3. **Keep section headers** — Use `##` for sections within a fragment so Kai can navigate
4. **No Common Mistakes** — Kai's `instructions.md` handles this via critical_actions
5. **No cross-references** — Kai loads fragments directly, doesn't follow Storybook links
6. **Add fragment header** — Each file starts with:
   ```markdown
   # [Fragment Title]
   > Source: stories/documentation/figma-translation/[XX-File.mdx]
   > Last synced: [date]
   > Design System version: [version from package.json]
   ```
7. **Size budget** — Each fragment should be under 2000 tokens. If larger, split.

---

## Verification

After extraction:
1. Spot-check 5 random entries from each fragment against the source MDX — they must match
2. Load the `design-translate-full` fragment set via kai-index.csv — total size should be reasonable for agent context
3. Give Kai a test query: "Translate a Figma card with primary background, 16px padding, medium shadow, containing a heading and body text" — verify the spec output references correct tokens

---

## Acceptance Criteria

- [ ] 8 knowledge fragments created in Kai sidecar
- [ ] `kai-index.csv` updated with all task-to-fragment mappings
- [ ] Each fragment has header with source file, sync date, and version
- [ ] Tables-only format (no prose except section headers)
- [ ] Each fragment under 2000 tokens
- [ ] `design-translate-full` fragment set covers all translation content
- [ ] Spot-check accuracy: 5 random entries per fragment match source MDX
- [ ] Fragment loading via kai-index.csv works correctly
