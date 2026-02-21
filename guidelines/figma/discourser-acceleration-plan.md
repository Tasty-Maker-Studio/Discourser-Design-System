# Discourser Development Acceleration Plan

## The Problem

Building components and pages takes too many prompt cycles. Claude Code cold-starts every task, discovers requirements through trial and error, and can't see its own output. The human becomes a manual feedback loop — approving, checking, re-prompting — which is slower than just writing the code.

## The Solution: Three Acceleration Layers

---

## Layer 1: Component Brief Template (Pre-Claude Code)

Fill this out BEFORE opening Claude Code. 15-20 minutes of prep eliminates 15+ correction cycles.

### Template: `component-brief.md`

```markdown
# Component Brief: [ComponentName]

## Identity

- **Name**: [PascalCase component name]
- **Location**: [design-system repo or app repo]
- **Type**: [slot-recipe | cva-recipe | composed-module | page-layout]
- **Ark UI base**: [e.g., Tabs.Root, or "none - custom"]
- **Park UI styled version exists?**: [yes/no — if yes, import from Park UI]

## Files to Read First

<!-- Claude Code reads these BEFORE writing any code -->

1. `panda.config.ts` — lines [X-Y] for relevant tokens
2. `[path/to/existing/similar-recipe.ts]` — pattern to follow
3. `[path/to/existing/similar-component.tsx]` — structural reference
4. `[path/to/types-or-interfaces.ts]` — if extending existing types

## Recipe Definition

- **Recipe type**: [slotRecipe | cva]
- **Slots**: [list every slot name]
```

root, tabList, tab, panel, card, badge, dragHandle

```
- **Variants**:
```

size: { sm, md, lg }
visual: { filled, outlined }
state: { default, active, disabled, dragging }

````
- **Default variant**: [e.g., size=md, visual=filled, state=default]

## Token Mapping Table
<!-- Every visual property resolved to a semantic token BEFORE Claude Code touches it -->

| Element | Property | Figma Value | Semantic Token |
|---------|----------|-------------|----------------|
| root background | background-color | #F5F0E8 | colors.surfaceContainerLow |
| card background | background-color | #FFFBF5 | colors.surfaceContainerLowest |
| tab active indicator | border-color | #5C6B4F | colors.primary |
| badge "Beginner" bg | background-color | #E8DEF8 | colors.tertiaryContainer |
| badge "Beginner" text | color | #4A4458 | colors.onTertiaryContainer |
| drag handle icon | color | #49454F | colors.onSurfaceVariant |
| card title | font | 16px/500 | fontSizes.md, fontWeights.medium |
| queue number | font | 14px/700 | fontSizes.sm, fontWeights.bold |

## Spacing & Sizing
| Element | Property | Figma px | Token |
|---------|----------|----------|-------|
| root padding | padding | 16px | spacing.4 |
| card gap | gap | 8px | spacing.2 |
| card padding | padding | 12px | spacing.3 |
| tab list gap | gap | 0 | — |
| badge padding-x | padding-inline | 8px | spacing.2 |

## Component Structure (Pseudocode)
```tsx
<Root>                          // slot: root
<TabList>                     // slot: tabList
  <Tab value="queue">         // slot: tab
  <Tab value="completed">
</TabList>
<Panel value="queue">         // slot: panel
  <DragContext>
    <Card>                    // slot: card
      <DragHandle />          // slot: dragHandle
      <QueueNumber>1</QueueNumber>
      <CardContent>
        <Title />
        <BadgeRow>
          <Badge variant="level" />  // slot: badge
          <Badge variant="duration" />
        </BadgeRow>
      </CardContent>
    </Card>
  </DragContext>
</Panel>
<Panel value="completed">
  <Card completed>
    <CardContent>
      <Title />
      <RequeueButton />
    </CardContent>
  </Card>
</Panel>
</Root>
````

## Behavior Notes

- Drag and drop: uses `@dnd-kit/core` + `@dnd-kit/sortable`
- Tab switching: Ark UI Tabs with controlled value
- Re-queue action: moves card from completed → queue, appends to end
- Position numbers: auto-calculated from array index + 1

## What NOT To Do

- Do NOT use inline `css()` calls — all styling through the slot recipe
- Do NOT hardcode any hex values
- Do NOT flatten Ark UI compound patterns
- Do NOT create new tokens — use existing or flag the gap
- Do NOT approximate colors — trace every value through the token chain

## Acceptance Criteria

- [ ] All slots render with correct semantic tokens
- [ ] Drag and drop reorders queue items
- [ ] Tab switching shows correct panel
- [ ] Position numbers update after reorder
- [ ] Badges use correct token for each difficulty level
- [ ] Component renders in Storybook with mock data
- [ ] Zero hardcoded color/spacing values in source

```

---

## Layer 2: Self-Correcting Agent Loop (The Big Win)

This is where we use Claude.ai's access to Chrome MCP + Figma MCP to create a closed-loop agent that can see its own output and compare against the design.

### Architecture: Visual Validation Agent

```

┌─────────────────────────────────────────────────┐
│ AGENT LOOP │
│ │
│ 1. Get Figma screenshot (Figma MCP) │
│ └─ Figma:get_screenshot for target node │
│ │
│ 2. Get Storybook screenshot (Chrome MCP) │
│ └─ Navigate to component story │
│ └─ computer:screenshot │
│ │
│ 3. Compare & generate diff list │
│ └─ "Figma shows X, browser shows Y" │
│ └─ Specific: token, spacing, color diffs │
│ │
│ 4. Generate fix commands │
│ └─ File edits with exact token corrections │
│ │
│ 5. Apply fixes (Filesystem tools) │
│ └─ Edit recipe/component files │
│ │
│ 6. Reload Storybook (Chrome MCP) │
│ └─ Wait for hot reload │
│ └─ Take new screenshot │
│ │
│ 7. Re-compare → loop or exit │
│ └─ If diffs remain: go to step 3 │
│ └─ If match: report success │
│ └─ If stuck after 3 loops: report to user │
│ │
└─────────────────────────────────────────────────┘

```

### How This Works in Practice (Claude.ai Session)

You can run this loop RIGHT HERE in a Claude.ai conversation with Chrome + Figma MCP connected:

**Step 1 — Capture the target:**
```

Figma:get_screenshot(fileKey, nodeId) → saves reference image

```

**Step 2 — Capture current state:**
```

Claude in Chrome:navigate(tabId, "http://localhost:6006/?path=/story/scenarioqueue--default")
Claude in Chrome:computer(action="screenshot") → saves current image

```

**Step 3 — Visual diff (Claude's vision capability):**
Claude can SEE both images and describe specific differences:
- "The card background in Storybook is #FFFFFF but Figma shows a warm cream"
- "The badge border-radius is too sharp — Figma shows 8px, browser shows 4px"
- "Tab underline indicator is missing"

**Step 4 — Fix via filesystem:**
```

Filesystem:edit_file(path, edits) → fix the recipe/component

```

**Step 5 — Reload and re-check:**
```

Claude in Chrome:reload_tab(tabId)
Claude in Chrome:computer(action="wait", duration=3)
Claude in Chrome:computer(action="screenshot")

```

**Step 6 — Compare again, loop or exit.**

### What You'd Say to Trigger This

A single prompt like:

> "Compare the ScenarioQueue component at Figma node 38-4041 against what's
> rendering in Storybook at localhost:6006. The component source is at
> [path]. The recipe is at [path]. Iterate until they match, fixing token
> and spacing issues. Stop after 3 iterations if you can't resolve remaining
> diffs and report what's left."

That's it. You walk away and come back to either a matching component or a specific list of what couldn't be auto-resolved.

---

## Layer 3: Custom Skill for Design System Builds

Using the skill-creator pattern, we can build a reusable skill that encodes all of the Discourser-specific knowledge so it doesn't need to be re-explained every session.

### Skill: `discourser-component-builder`

**What it encodes:**
- The token pipeline (MD3 → Semantic → Component)
- The recipe patterns (slot recipe vs CVA)
- The Ark UI compound component rules
- The file structure conventions
- The "read config first" requirement
- The validation loop (Figma screenshot → Storybook screenshot → diff → fix)

**Skill structure:**
```

discourser-component-builder/
├── SKILL.md # Main instructions
├── references/
│ ├── token-pipeline.md # Token chain reference
│ ├── recipe-patterns.md # Slot recipe / CVA examples  
│ ├── component-checklist.md # Pre-flight and validation checks
│ └── known-tokens.md # Extracted token table from panda.config
├── templates/
│ ├── component-brief.md # The template from Layer 1
│ ├── slot-recipe.template.ts # Skeleton recipe file
│ └── story.template.tsx # Skeleton Storybook story
├── evals/
│ ├── evals.json
│ └── files/
│ └── sample-brief.md # Test component brief
└── agents/
├── builder.md # Build agent instructions
└── validator.md # Visual comparison agent instructions

````

**SKILL.md core logic:**
```markdown
# Discourser Component Builder

## Process
1. Read the component brief (user provides or we generate from Figma)
2. Read panda.config.ts token sections
3. Read the nearest existing recipe as a structural pattern
4. Generate the slot recipe
5. Generate the component TSX
6. Generate the Storybook story
7. If Chrome MCP available: run visual validation loop
8. If not: output checklist for manual validation

## Critical Rules (always applied)
- All styling through semantic tokens — never hardcode
- Slot recipes — never inline css()
- Ark UI compound patterns — never flatten
- Read before write — always examine existing patterns first
````

### Building the Skill

We can use the skill-creator right here to draft this, then iterate on it with real component builds as test cases. The ScenarioQueue build you just did is actually a perfect eval case — we know what the correct output looks like, so we can test whether the skill produces it in fewer cycles.

---

## Layer 4: Page Implementation Prompt Template (for discourser.ai)

For the consumer app, the brief is different — it's about composing existing components, not building new ones.

### Template: `page-implementation-prompt.md`

```markdown
# Page Build: [PageName]

## Figma Source

- **File**: GaHmFfmvO4loUzuZS4TgEz
- **Node**: [node-id]
- **Screenshot taken**: [yes — attached or captured via Figma MCP]

## Layout Structure
```

<PageShell> // existing layout component
<LeftSidebar> // existing sidebar component
<NavMenu items={menuItems} /> // existing nav component
</LeftSidebar>
<MainContent>
<Breadcrumb items={crumbs} /> // existing breadcrumb
<PageTitle>...</PageTitle> // typography token: headings.lg
[MAIN CONTENT COMPOSITION HERE]
</MainContent>
<RightPanel>
<SettingsAccordion> // existing accordion
<Section title="...">
[FORM CONTROLS HERE]
</Section>
</SettingsAccordion>
</RightPanel>
</PageShell>

````

## Component Inventory
| Figma Element | Design System Component | Import Path | Props/Config |
|---------------|------------------------|-------------|-------------|
| Scenario Card | ScenarioCard | @discourser/ds/ScenarioCard | variant="queue" |
| Level Badge | Badge | @discourser/ds/Badge | variant="level", level="beginner" |
| Start Button | Button | @park-ui/button | variant="primary", size="lg" |
| Settings Panel | Accordion | @park-ui/accordion | collapsible, multiple |

## Token Overrides Needed
<!-- Only if page-level styling deviates from component defaults -->
| Element | Override | Token |
|---------|----------|-------|
| Main content bg | background | colors.surface |
| Right panel bg | background | colors.surfaceContainerLow |

## Data Shape
```typescript
// Props/data the page needs
interface PageProps {
  scenarios: Scenario[]
  settings: DiscourseSettings
  // ...
}
````

## Files to Create

1. `app/scenario-selection/page.tsx` — the page component
2. `app/scenario-selection/components/[anything page-specific].tsx`

## Validation

- [ ] Three-panel layout matches Figma proportions
- [ ] All components imported from design system (zero local recreations)
- [ ] Semantic tokens only
- [ ] Responsive behavior (if specified in Figma)

```

---

## Recommended Execution Plan for Tomorrow

### Morning: Set Up the Agent Loop
1. Open Claude.ai with Chrome MCP + Figma MCP connected
2. Have Storybook running at localhost:6006
3. Test the visual validation loop on ScenarioQueue:
   - Figma screenshot → Storybook screenshot → compare → report diffs
   - See if Claude can identify and fix issues autonomously

### Midday: Test Code Connect
4. Set up Code Connect for 2-3 core components (Button, Card, Badge)
5. Run Figma MCP on the Scenario Selection page node
6. Check: does the MCP output now include CodeConnectSnippets?
7. Try a page build with the enriched MCP context

### Afternoon: Build the Skill
8. Use skill-creator to draft `discourser-component-builder`
9. Use the ScenarioQueue as the first eval case
10. Iterate the skill until it can produce correct output in ≤3 prompts

### Success Metric
**Today (baseline)**: Full day, 20+ prompt cycles for one component
**Target**: Component build in ≤5 prompts, page build in ≤5 prompts, with the agent self-correcting visual issues
```
