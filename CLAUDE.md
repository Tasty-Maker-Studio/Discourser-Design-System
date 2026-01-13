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
  )
)
```

### Semantic tokens for theming
Use semantic names (`primary`, `onPrimary`, `surface`) not raw values.
Dark mode works automatically via `data-theme="dark"` attribute.

## Before Starting Work

1. **Read the relevant skill** in `.claude/skills/` for the task type
2. **Check docs/design-system-setup-prompt.md** for full architecture details
3. **Reference docs/material-theme.json** for M3 color values
4. **Follow the branching strategy** - see [BRANCHING_STRATEGY.md](./BRANCHING_STRATEGY.md)
   - Create feature branches from `dev` (not `main`)
   - Open PRs to `dev` (not `main`)
   - Run `pnpm check-branch` to verify your branch setup

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

## Code Style

Handled by tooling—don't manually enforce:
- Biome/ESLint for formatting
- TypeScript strict mode
- Run `pnpm typecheck` before committing

## File Naming

- Components: `PascalCase.tsx` in `src/components/ComponentName/`
- Recipes: `kebab-case.recipe.ts` in `src/recipes/`
- Stories: `ComponentName.stories.tsx` alongside component
