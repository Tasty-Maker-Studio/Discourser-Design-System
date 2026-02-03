# Component Import Path Updates Required

## Problem

Components currently import from relative `styled-system/*` paths:

```typescript
// Current (won't work when published)
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { button } from 'styled-system/recipes';
```

When consumers import `@discourser/design-system/Button`, these paths won't resolve because they're relative to the component file location in node_modules.

## Solution

Update all components to use package-scoped imports:

```typescript
// Updated (works when published)
import { cx } from '@discourser/design-system/styled-system/css';
import { styled } from '@discourser/design-system/styled-system/jsx';
import { button } from '@discourser/design-system/styled-system/recipes';
```

## Files to Update

All component files need their styled-system imports updated:

- src/components/Button.tsx (lines 6-8)
- src/components/Input.tsx
- src/components/Card.tsx
- src/components/Dialog.tsx
- src/components/Switch.tsx
- src/components/Accordion.tsx
- src/components/Drawer.tsx
- src/components/Tabs.tsx
- src/components/Checkbox.tsx
- src/components/RadioGroup.tsx
- src/components/Select.tsx
- src/components/Slider.tsx
- src/components/Avatar.tsx
- src/components/Badge.tsx
- src/components/Progress.tsx
- src/components/Skeleton.tsx
- src/components/Popover.tsx
- src/components/Tooltip.tsx
- src/components/Heading.tsx
- src/components/Textarea.tsx
- src/components/Spinner.tsx
- src/components/Toast.tsx
- src/components/IconButton.tsx
- src/components/InputAddon.tsx
- src/components/InputGroup.tsx
- src/components/CloseButton.tsx
- src/components/Icon.tsx
- src/components/AbsoluteCenter.tsx
- src/components/Group.tsx

## Import Pattern Replacements

### Pattern 1: CSS utilities
```typescript
// Before
import { cx } from 'styled-system/css';
import { css } from 'styled-system/css';
import { cva } from 'styled-system/css';

// After
import { cx } from '@discourser/design-system/styled-system/css';
import { css } from '@discourser/design-system/styled-system/css';
import { cva } from '@discourser/design-system/styled-system/css';
```

### Pattern 2: JSX factory
```typescript
// Before
import { styled } from 'styled-system/jsx';

// After
import { styled } from '@discourser/design-system/styled-system/jsx';
```

### Pattern 3: Recipes
```typescript
// Before
import { button } from 'styled-system/recipes';
import { input, type InputVariantProps } from 'styled-system/recipes';

// After
import { button } from '@discourser/design-system/styled-system/recipes';
import { input, type InputVariantProps } from '@discourser/design-system/styled-system/recipes';
```

### Pattern 4: Tokens
```typescript
// Before
import { token } from 'styled-system/tokens';

// After
import { token } from '@discourser/design-system/styled-system/tokens';
```

## How This Works

1. **Package exports styled-system** (already added to package.json):
   ```json
   "./styled-system/*": {
     "types": "./styled-system/*/index.d.ts",
     "import": "./styled-system/*.mjs",
     "require": "./styled-system/*.js"
   }
   ```

2. **styled-system is published** (in files array)

3. **Components import from published styled-system**

4. **Consumers import components**:
   ```typescript
   import { Button } from '@discourser/design-system/Button'
   ```

5. **Component imports resolve** to:
   ```
   node_modules/
   └── @discourser/
       └── design-system/
           ├── src/components/Button.tsx
           └── styled-system/
               ├── css/
               ├── jsx/
               └── recipes/
   ```

## Alternative: Use Path Aliases in tsconfig

If you don't want to hardcode the package name, you could use tsconfig path mapping:

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "styled-system/*": ["./styled-system/*"],
      "@discourser/design-system/styled-system/*": ["./styled-system/*"]
    }
  }
}
```

But this still requires updating imports for production builds.

## Recommendation

Update all component imports now before publishing. This is a one-time change that ensures components work correctly when imported individually.
