# Discourser Design System — Persistent Memory

## Project Structure
- **Design System repo**: `/Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System` (this repo)
- **Main App repo**: `/Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/discourser.ai`
- **Figma design file**: `https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1`
- **Scenario Selection page node**: `38-4041`

## Pipeline Goal
Figma → Code Connect → Claude Code → Storybook. Target: near one-shot builds of Next.js pages with <3 correction iterations.

## Design Language
Earth tones: olive/sage greens, warm creams, soft browns. Three-panel layout: left nav sidebar, main content, right settings panel.

## Critical Rules (from project instructions)
1. **Always use existing components first** — check the design system before creating anything new
2. **Always use Panda CSS tokens** — never hardcode color, spacing, or font values
3. **Match Figma layout exactly** — use Figma MCP for spacing, cross-reference against tokens
4. **Maintain context** — track which components are used, which tokens map to which Figma values

## Key Architecture
- Components: Ark UI headless primitives + Panda CSS slot recipes
- Compound components use `createStyleContext` + `withProvider`/`withContext`
- Simple components use `forwardRef` + `styled()` + recipe
- Semantic tokens: `primary.*`, `secondary.*`, `tertiary.*`, `neutral.*`, `fg.*`, `canvas`, `border.default`
- Boolean variants in recipes use `true:`/`false:` keys (e.g. `isActive: { true: {...}, false: {} }`)

## Scroll Layout Pattern (learned)
For scrollable lists inside bounded flex containers:
- Use `display: block` (not `flex column`) on the scroll area so items grow to natural height
- Use `& > * + *: { marginTop: '3' }` for card spacing instead of `gap`
- Add `flex: 1, minHeight: 0, overflow: hidden` to intermediate flex containers (like Tabs.Root)
- A flex column distributes bounded height equally among children, collapsing them — block flow lets each item expand freely

## Components Built
- `ScenarioQueue` — full drag-to-reorder panel with Tabs, dnd-kit sortable, Dialog slot
  - Files: `src/components/ScenarioQueue/` (index, ScenarioQueue, ScenarioCard, ScenarioCardDraggable, AddScenarioDialog, types)
  - Recipe: `src/preset/recipes/scenario-card.ts`
  - dnd-kit package: `@dnd-kit/react` v0.3.1 (new API — uses `DragDropProvider` + `useSortable`, NOT the v1 `DndContext`/`SortableContext`)

## Code Connect Experiment
Being tested for the Scenario Selection page build. Two approaches:
- Code Connect UI in Figma (Dev Mode → Library → Connect)
- Code Connect CLI (`@figma/code-connect` package, `.figma.connect.tsx` files)
