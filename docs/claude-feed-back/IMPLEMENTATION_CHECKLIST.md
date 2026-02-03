# Implementation Checklist: Fixing Discourser Design System

## Phase 1: Critical Dependency Fixes (5 minutes)

### 1.1 Update package.json Dependencies

```json
{
  "peerDependencies": {
    "@pandacss/dev": "^1.8.0",  // ADD THIS
    "react": ">=19.0.0",
    "react-dom": ">=19.0.0"
  },
  "dependencies": {
    "@ark-ui/react": "^5.30.0",
    "clsx": "^2.1.1"
  },
  "devDependencies": {
    "@pandacss/dev": "^1.8.0",  // KEEP THIS for local dev
    // ... rest of devDependencies
  }
}
```

**Files to modify:**
- `/Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System/package.json`

**Why:** Consumers need their own @pandacss/dev installation that matches your preset

---

### 1.2 Update Files to Publish

```json
{
  "files": [
    "dist"
    // ❌ REMOVE: "styled-system"
    // ❌ REMOVE: "src"
    // ❌ REMOVE: "guidelines"
  ]
}
```

**Files to modify:**
- `/Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System/package.json`

**Why:** Only publish compiled code, not generated styled-system or source files

---

### 1.3 Remove styled-system Rewrite Plugin

```typescript
// tsup.config.ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@pandacss/dev'  // ✅ ADD: Make sure Panda is external
  ],
  treeshake: true,
  minify: false,
  // ❌ REMOVE the esbuildPlugins section entirely
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
  },
})
```

**Files to modify:**
- `/Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System/tsup.config.ts`

**Why:** The plugin rewrites imports to a path that won't exist in consumer apps

---

## Phase 2: Decide Your Distribution Strategy

You have two choices. Pick ONE:

### Option A: Preset-Only (RECOMMENDED)

**What:** Publish only the preset configuration, no pre-built components
**Pros:** Simple, clean, consumers have full control
**Cons:** Consumers must build their own components

### Option B: Preset + Static CSS Components

**What:** Publish preset + components that use static CSS
**Pros:** Consumers get ready-made components
**Cons:** More complex build process, larger bundle size

**Decision Point:** Which do you prefer?

---

## Phase 3A: Implement Preset-Only (If you chose Option A)

### 3A.1 Update src/index.ts

```typescript
// src/index.ts
// ❌ REMOVE: export * from './components'
// ❌ REMOVE: export * from './recipes'
// ❌ REMOVE: export { cn } from './utils/cn'

// ✅ KEEP: Export preset
export { discourserPandaPreset } from './preset'

// ✅ KEEP: Export contracts for TypeScript users
export type * from './contracts/design-language.contract'

// ✅ OPTIONAL: Export language utilities for advanced users
export { transformToPandaTheme } from './languages/transform'
export { material3Language } from './languages/material3.language'
```

**Files to modify:**
- `/Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System/src/index.ts`

---

### 3A.2 Update package.json Exports

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./preset": {
      "types": "./dist/preset/index.d.ts",
      "import": "./dist/preset/index.js",
      "require": "./dist/preset/index.cjs"
    }
    // ❌ REMOVE all ./styled-system/* exports
  }
}
```

**Files to modify:**
- `/Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System/package.json`

---

### 3A.3 Update tsup Entry Points

```typescript
// tsup.config.ts
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'preset/index': 'src/preset/index.ts',
  },
  // ... rest of config
})
```

**Files to modify:**
- `/Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System/tsup.config.ts`

---

### 3A.4 Create Component Examples

Create a new folder for example components:

```bash
mkdir -p examples/components
```

Copy component code to examples folder:

```typescript
// examples/components/Button.tsx
/**
 * Example Button component using Discourser Design System preset
 *
 * To use this component:
 * 1. Install @discourser/design-system
 * 2. Add discourserPandaPreset to your panda.config.ts
 * 3. Run `panda codegen` to generate styled-system/
 * 4. Copy this file to your project
 * 5. Customize as needed
 */

import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { button, type ButtonVariantProps } from 'styled-system/recipes'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'filled', size = 'md', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={button({ variant, size })}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
```

Do this for all major components (Button, Input, Card, Dialog, etc.)

**Files to create:**
- `examples/components/Button.tsx`
- `examples/components/Input.tsx`
- `examples/components/Card.tsx`
- etc.

---

### 3A.5 Create Migration Guide

```markdown
// MIGRATION.md
# Migration Guide: v0.9.x to v1.0.0

## Breaking Changes

### Components No Longer Exported

**Before (v0.9.x):**
```typescript
import { Button, Input } from '@discourser/design-system'
```

**After (v1.0.0):**
```typescript
// 1. Import preset in panda.config.ts
import { discourserPandaPreset } from '@discourser/design-system/preset'

export default defineConfig({
  presets: [discourserPandaPreset],
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
})

// 2. Run panda codegen
pnpm panda codegen

// 3. Build your own components or copy from examples
import { button } from 'styled-system/recipes'

export function Button({ variant, ...props }) {
  return <button className={button({ variant })} {...props} />
}
```

### Why This Change?

The v0.9.x approach of publishing `styled-system/` doesn't work across package boundaries.
v1.0.0 publishes only the preset configuration, allowing you to generate `styled-system/`
in YOUR project with YOUR customizations.

### Benefits

1. Full control over component implementation
2. Better tree-shaking (only include what you use)
3. Easier customization
4. No dependency conflicts
```

**Files to create:**
- `MIGRATION.md`

---

### 3A.6 Update README

```markdown
# Discourser Design System

Material Design 3 preset for Panda CSS with aesthetic-agnostic architecture.

## Installation

```bash
pnpm add @discourser/design-system
pnpm add -D @pandacss/dev
```

## Usage

### 1. Configure Panda CSS

```typescript
// panda.config.ts
import { defineConfig } from '@pandacss/dev'
import { discourserPandaPreset } from '@discourser/design-system/preset'

export default defineConfig({
  presets: ['@pandacss/preset-base', discourserPandaPreset],
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
})
```

### 2. Generate Styled System

```bash
pnpm panda codegen
```

This generates `styled-system/` with Material 3 tokens and recipes.

### 3. Build Components

```typescript
import { button } from 'styled-system/recipes'

export function Button({ variant = 'filled', size = 'md', ...props }) {
  return (
    <button
      className={button({ variant, size })}
      {...props}
    />
  )
}
```

### 4. Use Tokens

```typescript
import { css } from 'styled-system/css'

const styles = css({
  bg: 'primary.60',      // M3 primary color
  color: 'onPrimary',    // M3 semantic token
  borderRadius: 'md',
})
```

## Example Components

See the `node_modules/@discourser/design-system/examples/` folder for
reference implementations of common components.

## Features

- ✅ Material Design 3 color system
- ✅ Semantic tokens for theming
- ✅ 23 pre-built recipes (button, input, card, etc.)
- ✅ Dark mode support
- ✅ TypeScript support
- ✅ Aesthetic-agnostic architecture

## Token Categories

### Colors
- Primary, Secondary, Tertiary palettes
- Neutral and Neutral Variant scales
- Error palette
- Semantic tokens (surface, onSurface, etc.)

### Typography
- 15 text styles (displayLarge → labelSmall)
- Font families (display, body, mono)

### Spacing
- 9-step scale (none → xxxl)

### Shape
- Border radius tokens (none → full)

### Elevation
- 5 shadow levels

## Customization

Override tokens in your panda.config.ts:

```typescript
export default defineConfig({
  presets: [discourserPandaPreset],
  theme: {
    extend: {
      tokens: {
        colors: {
          // Override M3 colors
          'primary.60': { value: '#YOUR_COLOR' }
        }
      }
    }
  }
})
```

## License

MIT
```

**Files to modify:**
- `README.md`

---

## Phase 3B: Implement Preset + Static CSS (If you chose Option B)

This is more complex. You would need to:

1. Generate static CSS at build time
2. Remove Panda CSS dependency from components
3. Use CSS modules or vanilla-extract
4. Publish both preset AND static components

**Recommendation:** Start with Option A (Preset-Only). You can always add static components later.

---

## Phase 4: Testing

### 4.1 Test Local Build

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System
pnpm build
pnpm pack
```

This creates `discourser-design-system-VERSION.tgz`

---

### 4.2 Test in Consumer App

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/discourser.ai
pnpm add ../Discourser-Design-System/discourser-design-system-VERSION.tgz
```

---

### 4.3 Update Consumer panda.config.ts

```typescript
// discourser.ai/panda.config.ts
import { defineConfig } from '@pandacss/dev'
import { discourserPandaPreset } from '@discourser/design-system/preset'

export default defineConfig({
  presets: ['@pandacss/preset-base', discourserPandaPreset],
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
})
```

---

### 4.4 Generate styled-system in Consumer

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/discourser.ai
pnpm panda codegen
```

Check that `styled-system/` was created with your M3 tokens.

---

### 4.5 Verify Tokens

```typescript
// discourser.ai/src/test.ts
import { token } from 'styled-system/tokens'

console.log(token('colors.primary.60'))  // Should output #64A104 (M3 primary)
console.log(token('colors.onPrimary'))   // Should output semantic token
```

---

### 4.6 Build a Test Component

```typescript
// discourser.ai/src/components/TestButton.tsx
import { button } from 'styled-system/recipes'

export function TestButton() {
  return (
    <button className={button({ variant: 'filled', size: 'md' })}>
      Click Me
    </button>
  )
}
```

If this works, the preset is working correctly!

---

## Phase 5: Publish to npm

### 5.1 Version Bump (Breaking Change)

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System
pnpm changeset
```

Select:
- **Major** (breaking change: removed component exports)
- Describe: "Refactor to preset-only distribution. Components now provided as examples."

---

### 5.2 Update CHANGELOG

```markdown
## 1.0.0 - Breaking Changes

### BREAKING CHANGES

- Components are no longer exported from the main package
- `styled-system/` is no longer published
- Consumers must generate their own `styled-system/` using the preset

### Migration

See MIGRATION.md for upgrade instructions.

### Added

- Example components in `examples/` folder
- Improved TypeScript types for preset
- @pandacss/dev now a peer dependency

### Changed

- Preset-only distribution model
- Simplified package exports

### Removed

- Pre-built component exports
- styled-system folder from published package
```

---

### 5.3 Build and Publish

```bash
pnpm build
pnpm release
```

This will:
1. Run changeset version (updates package.json to 1.0.0)
2. Build the package
3. Publish to npm

---

## Phase 6: Update Consumer App

### 6.1 Install New Version

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/discourser.ai
pnpm update @discourser/design-system
```

---

### 6.2 Verify panda.config.ts

```typescript
import { defineConfig } from '@pandacss/dev'
import { discourserPandaPreset } from '@discourser/design-system/preset'

export default defineConfig({
  presets: ['@pandacss/preset-base', discourserPandaPreset],
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
})
```

---

### 6.3 Regenerate styled-system

```bash
pnpm panda codegen
```

---

### 6.4 Build Components

Copy from `node_modules/@discourser/design-system/examples/` or build your own.

---

## Verification Checklist

- [ ] `@pandacss/dev` is in peerDependencies
- [ ] Only `dist/` folder is in `files` array
- [ ] tsup config has `@pandacss/dev` in externals
- [ ] tsup plugin removed (no styled-system rewriting)
- [ ] `src/index.ts` exports only preset and types
- [ ] package.json exports updated (removed styled-system paths)
- [ ] Example components created
- [ ] README updated with new usage instructions
- [ ] MIGRATION.md created
- [ ] Local build successful
- [ ] Local test in consumer app successful
- [ ] Tokens appear in consumer's styled-system/
- [ ] Recipes work in consumer app
- [ ] Version bumped to 1.0.0
- [ ] Published to npm

---

## Expected Results

After completing this checklist:

1. ✅ Your preset publishes as `@discourser/design-system`
2. ✅ Consumers can import `discourserPandaPreset`
3. ✅ Running `panda codegen` generates M3 tokens in consumer's `styled-system/`
4. ✅ Consumers can use `import { button } from 'styled-system/recipes'`
5. ✅ No dependency conflicts
6. ✅ Full customization available to consumers

---

## Next Steps After Publishing

1. Update documentation site
2. Create tutorial for new preset-only workflow
3. Publish example components as separate package (optional)
4. Consider creating a CLI tool to scaffold components
5. Gather feedback from early adopters

---

## Rollback Plan

If something goes wrong:

```bash
# Unpublish the broken version (within 72 hours)
npm unpublish @discourser/design-system@1.0.0

# Or publish a patch
pnpm changeset
# Select patch, describe the fix
pnpm build
pnpm release
```

---

## Support & Troubleshooting

### Common Issues

**Issue:** "Cannot find module 'styled-system/recipes'"
**Solution:** Run `panda codegen` in the consumer app

**Issue:** "Tokens are undefined"
**Solution:** Verify preset is imported in panda.config.ts

**Issue:** "Recipe not found"
**Solution:** Check that recipe is defined in preset and codegen was run

**Issue:** "Dark mode not working"
**Solution:** Add `data-theme="dark"` attribute to HTML element
