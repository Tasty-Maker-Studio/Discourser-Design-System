---
description: Create a new component with recipe, stories, and proper patterns
---

# Create New Component: $ARGUMENTS

## Steps

1. Read the component-patterns skill: `.claude/skills/component-patterns/SKILL.md`
2. Read the panda-recipes skill: `.claude/skills/panda-recipes/SKILL.md`
3. Read the m3-tokens skill: `.claude/skills/m3-tokens/SKILL.md`

## Create these files

1. `src/recipes/$ARGUMENTS.recipe.ts` - Panda CSS recipe with M3 variants
2. `src/components/$ARGUMENTS/$ARGUMENTS.tsx` - React component with forwardRef
3. `src/components/$ARGUMENTS/index.ts` - Barrel export
4. `stories/$ARGUMENTS.stories.tsx` - Storybook stories

## After creating

1. Add the recipe to `panda.config.ts` in `theme.extend.recipes`
2. Export the component from `src/components/index.ts`
3. Run `pnpm build:panda` to regenerate styled-system
4. Verify in Storybook with `pnpm dev`
