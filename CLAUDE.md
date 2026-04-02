# Discourser Design System

## Quick Reference

```bash
pnpm dev              # Storybook at localhost:6006
pnpm build:panda      # Regenerate styled-system/ after token changes
pnpm build            # Full build (panda + tsup)
pnpm typecheck        # TypeScript validation
```

## Architecture

Three-layer aesthetic-agnostic system:

```
Layer 1: Infrastructure (unchanging)
├── src/contracts/     → TypeScript interfaces
├── Build system       → tsup, Storybook, Panda CSS
└── Component logic    → Ark UI primitives

Layer 2: Design Language (swappable)
├── src/languages/     → Token values, semantic mappings
└── Swap aesthetic by changing one import in src/languages/index.ts

Layer 3: Component Recipes (derived)
├── src/recipes/       → Panda CSS defineRecipe patterns
└── Automatically adapts to active language
```

## Key Patterns

### Components use recipes, not inline css()

```tsx
// ✅ Correct
import { button } from 'styled-system/recipes'
<button className={button({ variant: 'filled', size: 'md' })}>

// ❌ Avoid
import { css } from 'styled-system/css'
<button className={css({ bg: 'primary' })}>
```

### forwardRef pattern for all components

```tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'filled', size = 'md', ...props }, ref) => (
    <Ark.Button ref={ref} className={button({ variant, size })} {...props} />
  ),
);
```

### Semantic tokens for theming

Use semantic names (`primary`, `onPrimary`, `surface`) not raw values.
Dark mode works automatically via `data-theme="dark"` attribute.

## ⚠️ MANDATORY Git Workflow — Non-Negotiable

**NEVER push directly to `dev` or `main`.** The pre-push hook will block you.

The only permitted workflow is:

```bash
# 1. Always start from dev
git checkout dev && git pull origin dev

# 2. Create a correctly-named feature branch
git checkout -b feature/your-feature-name   # or fix/, docs/, chore/

# 3. Make changes, commit
git add . && git commit -m "feat: description"

# 4. REQUIRED if any src/ files changed — create a changeset
pnpm changeset
# Select: patch (bug fix/tweak) | minor (new feature/prop) | major (breaking)
# If no package impact (docs/tests only): pnpm changeset --empty

# 5. Push the feature branch (NOT dev, NOT main)
git push -u origin feature/your-feature-name

# 6. Open a PR to dev on GitHub — never directly to main
```

**Changeset rules:**

- Any change to `src/` files requires a changeset
- Test-only or docs-only changes use `pnpm changeset --empty`
- The pre-push hook enforces this — you cannot push without one

## Before Starting Work

1. **Read the relevant skill** in `.claude/skills/` for the task type
2. **Check docs/design-system-setup-prompt.md** for full architecture details
3. **Reference docs/material-theme.json** for M3 color values
4. **Verify your branch** — run `git branch` and confirm you are NOT on `dev` or `main`

## Current State

- [x] Basic scaffolding exists
- [ ] Dependencies need updating (see package.json in PRD)
- [ ] Contract/language architecture not yet implemented
- [ ] Components using inline css() instead of recipes
- [ ] M3 tokens from material-theme.json not integrated

## Figma Token Sync Integration

**Specification:** See `FIGMA_DESIGN_SYSTEM_SYNC_SPEC.md` in the figma-token-sync repo.

Location: `/Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/figma-token-sync/FIGMA_DESIGN_SYSTEM_SYNC_SPEC.md`

### Token Flow:

```
Figma Variables → DTCG JSON → DesignLanguageContract → PandaCSS
```

### Key Files:

- `src/contracts/design-language.contract.ts` — TypeScript interface for all tokens
- `src/languages/material3.language.ts` — M3 implementation (generated from DTCG)
- `src/preset/colors/m3-primary.ts` — Maps M3 tonal → Radix scale for Park UI

### Expected DTCG Input:

```
tokens/
├── primitives/colors.json    ← Tonal palettes (78 colors)
└── semantic/
    ├── colors.light.json    ← Light mode semantics (31 tokens)
    └── colors.dark.json     ← Dark mode semantics (31 tokens)
```

## Token Mapping — Keep in Sync

`docs/token-name-mapping.json` and `docs/token-name-mapping.md` are the
authoritative map between Figma styles/variables and DDS/Panda tokens.
They are consumed by Kai (Design Engineer agent) when resolving what the
Figma MCP returns back to DDS token names.

### When you MUST run `pnpm figma:export`

Run this script any time you change any of the following — it regenerates
both the Figma import files AND token-name-mapping.json automatically:

| Change made                                         | Why export is needed             |
| --------------------------------------------------- | -------------------------------- |
| Add/remove/rename a scale step in TypographyScale   | Text styles and mapping change   |
| Add/remove a weight variant from any scale step     | 56-style count changes           |
| Change geometry values (fontSize, lineHeight, etc.) | Export files become stale        |
| Change fontFamily or weightMap in FontConfig        | Font names in styles change      |
| Add/remove a semantic color in SemanticColors       | Variable mapping changes         |
| Change spacing or radii values                      | Spacing & Shape variables change |
| Add/remove elevation levels                         | Effect styles change             |

### Files regenerated by `pnpm figma:export`

- tokens/export-to-figma/figma-variables.json
- tokens/export-to-figma/figma-text-styles.json
- tokens/export-to-figma/figma-effect-styles.json
- docs/token-name-mapping.json ← consumed by AI agents

### token-name-mapping.md

This is the human-readable version of token-name-mapping.json. It must
be manually kept in sync with the .json file when the .json changes.
Run `pnpm figma:export` first, then update the .md to match.

A future script will automate this. Until then: if you update
token-name-mapping.json, always update token-name-mapping.md in the
same commit.

## Code Style

Handled by tooling—don't manually enforce:

- Biome/ESLint for formatting
- TypeScript strict mode
- Run `pnpm typecheck` before committing

## File Naming

- Components: `PascalCase.tsx` in `src/components/ComponentName/`
- Recipes: `kebab-case.recipe.ts` in `src/recipes/`
- Stories: `ComponentName.stories.tsx` alongside component
