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

## Current State

- [x] Basic scaffolding exists
- [ ] Dependencies need updating (see package.json in PRD)
- [ ] Contract/language architecture not yet implemented
- [ ] Components using inline css() instead of recipes
- [ ] M3 tokens from material-theme.json not integrated

## Code Style

Handled by tooling—don't manually enforce:
- Biome/ESLint for formatting
- TypeScript strict mode
- Run `pnpm typecheck` before committing

## File Naming

- Components: `PascalCase.tsx` in `src/components/ComponentName/`
- Recipes: `kebab-case.recipe.ts` in `src/recipes/`
- Stories: `ComponentName.stories.tsx` alongside component
