# Storybook MCP + Kai Agent Research — Revised Summary

> **Date:** 2026-02-10
> **Purpose:** Carry-forward context for next conversation session
> **Start next chat with:** "Continuing Storybook MCP + Kai agent research — here's the revised summary"

---

## What We're Building

A Design Engineer BMAD agent ("Kai") that uses Storybook MCP as its single source of truth for the Discourser Design System, replacing the failed Figma-MCP-direct-to-code approach.

```
Figma MCP → visual intent only
    ↓
Kai (Design Engineer Agent)
    ↓
Storybook MCP (consolidated source)
├── Components (Ark UI / Park UI)
├── Layout Patterns (Panda CSS)
├── Tokens (semantic + visual)
└── Composition Guides
    ↓
Design Implementation Spec → Dev Agent (Amelia)
```

---

## Critical Discovery: Storybook Already at 10.2.8

You upgraded Storybook to **10.2.8** (well past the 10.1.0 minimum for component manifest). This changes the timeline significantly — the SB upgrade phase is **already done**.

---

## Current Storybook Inventory (Verified Live at localhost:6006)

### Components WITH Stories (.stories.tsx) — 17 components
All have Docs page + interactive controls + props table via docgen:

| Component | Stories | Notes |
|-----------|---------|-------|
| **Avatar** | Has stories | — |
| **Badge** | Has stories | — |
| **Button** | Default, All Variants, Color Palettes, All Sizes, Loading States, Disabled | Props: variant, size, colorPalette, loading, disabled. Docgen working. |
| **Card** | Basic, All Variants, With Image | — |
| **Checkbox** | Has stories (under Form) | — |
| **Dialog** | Default, Sizes, Placement, Long Content | Compound component (Ark UI) — stories work |
| **IconButton** | Has stories | — |
| **Input** | Has stories (under Form) | — |
| **InputGroup** | Has stories (under Form) | — |
| **Progress** | Has stories | — |
| **RadioGroup** | Has stories (under Form) | — |
| **Select** | Default, Sizes, Disabled, With Groups | — |
| **Slider** | Has stories | — |
| **Stepper** | Default, All Visual States, Sizes, Color Palettes, Interactive Demo, Linear Navigation, Vertical, Numbers Only | Comprehensive. Critical for onboarding. |
| **Switch** | Has stories | — |
| **Tabs** | Has stories | — |
| **Toast** | Has stories | — |

### Docs-Only Sections (MDX, no .stories.tsx)
| Section | Contents |
|---------|----------|
| **Layout** | Docs-only folder |
| **Form** | Grouping folder for Checkbox, Input, InputGroup, RadioGroup, Textarea |
| **Typography** | Docs-only |
| **Overlay** | Docs-only folder |
| **Feedback** | Docs-only folder |
| **Textarea** | Under Form group |

### Documentation Section
| Area | Contents |
|------|----------|
| **Figma Make** | Figma template guides |
| **Guidelines** | ~25 per-component implementation guides (99-Button, 99-Card, etc.) with decision trees, right/wrong patterns, import paths, variant tables, props reference, code examples |
| **Claude Skills** | Context engineering files for Claude Code |

### Foundations (MDX docs)
- Colors, Elevation, Spacing, Typography

### Key Observations
1. **Component stories already exist** — the original audit's "zero component stories" finding was outdated. This eliminates the biggest blocker.
2. **Docgen is working** — props tables auto-generate with descriptions (e.g., colorPalette shows "Color palette (M3 colors)").
3. **Guidelines section is the token bridge** — the 99-Button guide already documents variants, visual characteristics, and the M3 connection. This partially addresses the "TokenBridge.mdx" need.
4. **Compound components work** — Dialog stories render correctly despite Ark UI's Root/Trigger/Content pattern.

---

## What's NOT Done Yet

1. **`@storybook/addon-mcp` not installed** — `/mcp` endpoint returns "Not Found"
2. **`experimentalComponentsManifest` not enabled** — `/manifests/components.html` returns "Not Found"
3. **Kai agent YAML not written**
4. **Design Implementation Spec format not defined**

---

## Revised Phases

### Original Phases (from audit)
| Phase | What | Status |
|-------|------|--------|
| 0 | Fix shadow token ambiguity | Still needed |
| 1 | Create component stories | **DONE** — 17 components have stories |
| 2 | Create TokenBridge.mdx | **Partially done** — Guidelines section covers much of this |
| 3 | Add missing foundation docs | Still needed (Radii, layer styles) |
| 4 | Upgrade Storybook 8→9 | **DONE** — already at 10.2.8 |

### Revised Phases

| Phase | What | Effort | Why |
|-------|------|--------|-----|
| **0** | Install `@storybook/addon-mcp` + enable `experimentalComponentsManifest` | Small | Unlocks MCP endpoint. SB 10.2.8 already supports it. |
| **1** | Verify component manifest output | Small | Confirm docgen data flows through `/manifests/components.json`. Test compound component (Dialog) representation. |
| **2** | Fix shadow token ambiguity | Small | `level1-5` vs `lg` — consolidate vocabulary |
| **3** | Add missing foundation docs (Radii, layer styles) | Medium | Complete token documentation for Kai |
| **4** | Define Kai agent YAML + Design Implementation Spec format | Medium | The agent definition and its output contract |
| **5** | Evaluate Guidelines coverage gaps | Low priority | Guidelines already cover most components. Identify any missing entries for new components. |

**Phases 1 and 4 (original) are eliminated.** The biggest blockers are gone.

---

## Storybook MCP Addon — Version Requirements (Researched)

| Capability | Min SB Version | Your Version | Status |
|------------|---------------|--------------|--------|
| Dev toolset (story URLs, build instructions) | 9.1.16 | 10.2.8 | ✅ Ready |
| Docs toolset (component manifest, props, examples) | 10.1.0 | 10.2.8 | ✅ Ready (needs feature flag) |
| Node.js requirement | 24+ | TBD | Verify |

### To enable:
```ts
// .storybook/main.ts
export default {
  addons: ['@storybook/addon-mcp'],
  features: {
    experimentalComponentsManifest: true,
    // Optional: experimentalCodeExamples: true,
  },
};
```

### Two MCP toolsets:
1. **Dev toolset**: `get-ui-building-instructions`, `get-stories-urls` — needs .stories.tsx files ✅ (exist)
2. **Docs toolset**: `list-all-components`, `get-component-details` — needs component manifest ✅ (SB version supports it)

---

## Kai Agent — Structural Patterns (from existing BMAD agents)

Analyzed `dev_agent.yaml` and `tea_agent.yaml`:

```yaml
agent:
  webskip: true  # Used by dev and tea agents
  metadata:
    id: "_bmad/bmm/agents/{name}.md"
    name: {PersonaName}
    title: {Role}
    icon: {emoji}
    module: bmm
    hasSidecar: false
  persona:
    role: {description}
    identity: {core purpose}
    communication_style: {voice}
    principles: |
      - Bullet list of core principles
  critical_actions:
    - "Mandatory behaviors with specific file paths"
  menu:
    - trigger: {XX} or fuzzy match on {keyword}
      workflow: "{project-root}/_bmad/bmm/workflows/{path}/workflow.yaml"
      description: "[XX] Name: Description"
```

Key patterns: Dev agent is ultra-succinct, file-path oriented, strict test requirements. TEA agent uses knowledge fragment loading via index CSV. Both have `critical_actions` that run before any work.

---

## Panda CSS + Storybook Compatibility Notes

- Vite builder: PostCSS config must use array syntax: `plugins: [require('@pandacss/dev/postcss')()]`
- Import generated CSS in `.storybook/preview.ts`: `import '../src/index.css'`
- Add Storybook files to panda.config.ts include: `"./stories/**/*.{js,jsx,ts,tsx}"`
- Use `staticCss` to pre-generate recipe variants for Storybook
- Use `.raw()` marker for args that need Panda style detection

---

## Open Questions for Next Session

1. **Node.js version** — Is Node 24+ available in your dev environment? Required for addon-mcp.
2. **Component manifest with Ark UI compounds** — Does Dialog.Root/Trigger/Content pattern generate useful docgen data through the manifest? (Needs hands-on test after Phase 0)
3. **Kai agent output format** — What should a "Design Implementation Spec" look like to feed the Dev agent?
4. **Guidelines coverage** — Are there gaps between the 25 Guidelines entries and the 17 storied components?

---

## Key Files

| File | Location | Purpose |
|------|----------|---------|
| Storybook config | `.storybook/main.ts` | Add addon-mcp + feature flag here |
| Token source | `src/preset/` | Colors, semantic-tokens, shadows, text-styles, layer-styles |
| Recipes | `src/preset/recipes/` | 30 recipes |
| Components | `src/components/` | 27 components |
| Stories | Alongside components (verified working) | .stories.tsx files |
| Foundation docs | `src/stories/foundations/` | Colors, Typography, Spacing, Elevation MDX |
| Guidelines | Under Documentation section | 25+ component implementation guides |
| Repo | `Tasty-Maker-Studio/Discourser-Design-System` v0.13.0+ | — |
