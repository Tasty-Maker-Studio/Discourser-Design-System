---
name: panda-recipes
description: Patterns for creating Panda CSS recipes with variants, compound variants, and M3 styling
---

# Panda CSS Recipe Patterns

## When to Use This Skill

- Creating a new component recipe
- Adding variants to existing components
- Understanding recipe vs inline css() patterns
- Implementing M3 state layers (hover, pressed, focus)

## Recipe vs Inline CSS

```tsx
// ✅ USE RECIPES for components with variants
// src/recipes/button.recipe.ts
import { defineRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
  className: 'button',
  base: { /* shared styles */ },
  variants: {
    variant: {
      filled: { /* styles */ },
      outlined: { /* styles */ },
    },
    size: {
      sm: { /* styles */ },
      md: { /* styles */ },
    },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md',
  },
});

// ❌ AVOID inline css() for variant-based components
import { css } from 'styled-system/css';
// This doesn't give you type-safe variants
```

## Complete Recipe Example

```typescript
// src/recipes/button.recipe.ts
import { defineRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
  className: 'button',
  description: 'M3 button component with all five variants',
  
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'sm',
    fontFamily: 'body',
    fontWeight: 'medium',
    borderRadius: 'full',
    cursor: 'pointer',
    transition: 'all',
    transitionDuration: 'fast',
    
    // Focus ring
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'primary',
      outlineOffset: '2px',
    },
    
    // Disabled state
    _disabled: {
      opacity: 0.38,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
  
  variants: {
    variant: {
      filled: {
        bg: 'primary',
        color: 'onPrimary',
        _hover: {
          // M3 state layer: 8% opacity
          bg: 'primary',
          filter: 'brightness(1.08)',
        },
        _active: {
          // M3 state layer: 12% opacity
          filter: 'brightness(0.92)',
        },
      },
      
      outlined: {
        bg: 'transparent',
        color: 'primary',
        borderWidth: '1px',
        borderColor: 'outline',
        _hover: {
          bg: 'primaryContainer',
          bgOpacity: 0.08,
        },
      },
      
      text: {
        bg: 'transparent',
        color: 'primary',
        _hover: {
          bg: 'primaryContainer',
          bgOpacity: 0.08,
        },
      },
      
      elevated: {
        bg: 'surfaceContainerLow',
        color: 'primary',
        shadow: 'level1',
        _hover: {
          shadow: 'level2',
        },
      },
      
      tonal: {
        bg: 'secondaryContainer',
        color: 'onSecondaryContainer',
        _hover: {
          filter: 'brightness(0.96)',
        },
      },
    },
    
    size: {
      sm: {
        height: '32px',
        px: 'md',
        textStyle: 'labelMedium',
      },
      md: {
        height: '40px',
        px: 'lg',
        textStyle: 'labelLarge',
      },
      lg: {
        height: '48px',
        px: 'xl',
        textStyle: 'labelLarge',
      },
    },
  },
  
  compoundVariants: [
    // Icon-only buttons need square aspect ratio
    {
      size: 'sm',
      css: {
        // Applied when size is sm AND has iconOnly prop
      },
    },
  ],
  
  defaultVariants: {
    variant: 'filled',
    size: 'md',
  },
});
```

## Registering Recipes in panda.config.ts

```typescript
// panda.config.ts
import { defineConfig } from '@pandacss/dev';
import { buttonRecipe } from './src/recipes/button.recipe';
import { cardRecipe } from './src/recipes/card.recipe';

export default defineConfig({
  // ...
  theme: {
    extend: {
      recipes: {
        button: buttonRecipe,
        card: cardRecipe,
      },
    },
  },
});
```

## Using Recipes in Components

```tsx
// src/components/Button/Button.tsx
import { forwardRef } from 'react';
import { Button as ArkButton } from '@ark-ui/react';
import { button, type ButtonVariantProps } from 'styled-system/recipes';

export interface ButtonProps 
  extends React.ComponentPropsWithoutRef<typeof ArkButton>,
          ButtonVariantProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => (
    <ArkButton
      ref={ref}
      className={button({ variant, size })}
      {...props}
    />
  )
);

Button.displayName = 'Button';
```

## M3 State Layers Pattern

M3 uses opacity-based state layers instead of color changes:

| State    | Opacity | Implementation |
|----------|---------|----------------|
| Hover    | 8%      | `filter: brightness(1.08)` or bg overlay |
| Focus    | 12%     | Focus ring, not bg change |
| Pressed  | 12%     | `filter: brightness(0.92)` |
| Dragged  | 16%     | `filter: brightness(0.84)` |

## Files to Reference

- `docs/design-system-setup-prompt.md` - Full recipe examples
- `src/recipes/` - Existing recipe implementations (once created)
