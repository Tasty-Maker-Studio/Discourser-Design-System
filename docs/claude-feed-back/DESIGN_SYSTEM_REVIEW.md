# Discourser Design System - Comprehensive Review

**Date:** 2026-02-02
**Status:** Critical Issues Identified
**Recommendation:** Architecture Refactor Required

---

## Executive Summary

Your design system has a solid conceptual foundation with the three-layer architecture (contracts → languages → recipes), but there are **critical misunderstandings** about how Panda CSS presets work that prevent the system from functioning correctly when consumed by other applications.

### Core Problem

You're attempting to publish **both a component library AND a Panda CSS preset** in the same package, but these serve fundamentally different purposes and have incompatible distribution models:

1. **Panda CSS Preset** = Build-time configuration (tokens, recipes definitions)
2. **Component Library** = Runtime React components that import from styled-system

**Current Issue:** Your components import from `styled-system/*` (generated inside the design system), but consuming apps need to generate their OWN `styled-system/` from your preset.

---

## Critical Issues

### 🚨 Issue #1: Publishing `styled-system/` Folder

**Current Setup:**
```json
// package.json
"files": [
  "dist",
  "styled-system",  // ❌ WRONG
  "src",
  "guidelines"
]
```

**Why This Is Wrong:**

- `styled-system/` is **generated output** from running `panda codegen`
- It's specific to YOUR project's configuration
- Consuming apps need to generate their own `styled-system/` from your preset
- Publishing this folder creates conflicts and doesn't provide the flexibility you want

**What Should Happen:**

Consuming apps run `panda codegen` with your preset, which generates THEIR OWN `styled-system/` folder with:
- Tokens from your preset
- Recipes from your preset
- Their own custom additions/overrides

---

### 🚨 Issue #2: Misaligned Dependencies

**Current Setup:**
```json
"devDependencies": {
  "@pandacss/dev": "^1.8.0"  // ❌ Should be peerDependency
}
```

**Why This Is Wrong:**

Presets MUST declare `@pandacss/dev` as a **peer dependency** because:
- The consuming app needs its own copy of Panda CSS
- Type definitions from `@pandacss/dev` need to match across preset and consumer
- Prevents version conflicts and duplicate installations

**Correct Setup:**
```json
"peerDependencies": {
  "@pandacss/dev": "^1.8.0",
  "react": ">=19.0.0",
  "react-dom": ">=19.0.0"
},
"devDependencies": {
  "@pandacss/dev": "^1.8.0"  // For local development
}
```

---

### 🚨 Issue #3: Component Import Paths

**Current Component Code:**
```tsx
// src/components/Button.tsx
import { button } from 'styled-system/recipes'  // ❌ WRONG
```

**Why This Is Wrong:**

Your components import from `styled-system/*`, which is:
1. Generated locally during YOUR build
2. Published to npm (incorrectly)
3. Won't work in consuming apps because they generate THEIR OWN `styled-system/`

**Two Possible Solutions:**

#### **Option A: Preset-Only Package (Recommended)**

Don't publish components at all. Only publish the preset configuration:

```typescript
// Consumer app code
import { css } from 'styled-system/css'
import { button } from 'styled-system/recipes'  // Generated from YOUR preset

export function Button({ variant, size, ...props }) {
  return <button className={button({ variant, size })} {...props} />
}
```

**Pros:**
- Simple, clean separation
- Consumers have full control
- No import path issues

**Cons:**
- Consumers must build their own components
- More setup required for consumers

#### **Option B: Hybrid Package (Complex)**

Publish components that expect styled-system to exist in consumer's project:

```json
// package.json - Add to exports
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js"
  },
  "./preset": {
    "types": "./dist/preset/index.d.ts",
    "import": "./dist/preset/index.js"
  }
}
```

```typescript
// Consumer must:
// 1. Import preset in panda.config.ts
import { discourserPandaPreset } from '@discourser/design-system/preset'

// 2. Run panda codegen to generate styled-system/

// 3. Import components
import { Button } from '@discourser/design-system'  // Uses consumer's styled-system
```

**Pros:**
- Provides ready-made components
- Consumers can still customize via preset

**Cons:**
- Complex dependency on consumer's build process
- Components MUST be marked with explicit dependency on styled-system existence
- Requires careful documentation

---

### 🚨 Issue #4: Runtime vs Build-Time Confusion

**Current Preset Code:**
```typescript
// src/preset/index.ts (LINE 49)
const theme = transformToPandaTheme(activeLanguage);  // ❌ Runtime execution

export const discourserPandaPreset: Preset = {
  theme: {
    extend: {
      tokens: theme.tokens.colors,  // ❌ Uses runtime value
      // ...
    }
  }
}
```

**Why This Is a Potential Issue:**

1. `activeLanguage` is imported from `src/languages/index.ts`
2. `transformToPandaTheme()` is called at module evaluation time
3. This works locally but creates a static snapshot when published

**Current Impact:**
- The preset is "baked" with Material 3 tokens when you run `pnpm build`
- Consumers can't switch languages without republishing
- The "swappable language" concept doesn't work across package boundaries

**Solution:**

For a published preset, you need to **commit to ONE language**:

```typescript
// src/preset/index.ts
import { material3Language } from '../languages/material3.language'
import { transformToPandaTheme } from '../languages/transform'

// Generate theme at BUILD TIME (during npm publish)
const m3Theme = transformToPandaTheme(material3Language);

export const discourserPandaPreset: Preset = {
  name: 'discourser-material3-preset',
  theme: {
    extend: {
      tokens: m3Theme.tokens,
      textStyles: m3Theme.textStyles,
      semanticTokens: m3Theme.semanticTokens,
      // ...
    }
  }
}
```

If you want multiple language presets, publish separate presets:
- `@discourser/preset-material3`
- `@discourser/preset-carbon`
- `@discourser/preset-fluent`

---

### 🚨 Issue #5: tsup Configuration Issue

**Current Setup:**
```typescript
// tsup.config.ts
esbuildPlugins: [
  {
    name: 'rewrite-styled-system-imports',
    setup(build) {
      build.onResolve({ filter: /^styled-system\// }, (args) => {
        return {
          path: args.path.replace('styled-system/', '@discourser/design-system/styled-system/'),
          external: true,
        };
      });
    },
  },
]
```

**Why This Doesn't Work:**

This rewrites imports from `styled-system/*` to `@discourser/design-system/styled-system/*`, but:
1. Consuming apps won't have `@discourser/design-system/styled-system/*` in node_modules
2. They generate their own `styled-system/` in their project root
3. This creates an impossible dependency chain

---

## Recommended Architecture

### Architecture Decision: Choose Your Path

You need to decide what you're building:

| Approach | What You Publish | What Consumers Get | Complexity |
|----------|-----------------|-------------------|------------|
| **Preset-Only** | Token definitions, recipes, theme config | Build their own components | Low |
| **Component Library** | Pre-built components + CSS | Import components directly | Medium |
| **Hybrid** | Preset + Components that use consumer's styled-system | Both preset and components | High |

---

## Recommended Solution: Preset-Only Package

Based on your architecture goals (swappable languages, contracts, semantic tokens), I recommend **Option A: Preset-Only**.

### Package Structure

```
@discourser/design-system/
├── dist/
│   ├── index.js              # Main export
│   ├── index.d.ts
│   ├── preset/
│   │   └── index.js          # Preset export
│   ├── contracts/
│   │   └── index.js          # Type definitions
│   └── languages/
│       └── index.js          # Language utilities
├── package.json
└── README.md
```

### Updated package.json

```json
{
  "name": "@discourser/design-system",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./preset": {
      "types": "./dist/preset/index.d.ts",
      "import": "./dist/preset/index.js"
    }
  },
  "files": [
    "dist"
  ],
  "peerDependencies": {
    "@pandacss/dev": "^1.8.0"
  },
  "dependencies": {
    "@ark-ui/react": "^5.30.0"
  },
  "devDependencies": {
    "@pandacss/dev": "^1.8.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tsup": "^8.3.0",
    "typescript": "^5.7.0"
  }
}
```

### Updated src/index.ts

```typescript
// Export preset
export { discourserPandaPreset } from './preset'

// Export contracts (for TypeScript users)
export type * from './contracts/design-language.contract'

// Export language utilities (for advanced users)
export { transformToPandaTheme } from './languages/transform'
export { material3Language } from './languages/material3.language'
```

### Updated tsup.config.ts

```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'preset/index': 'src/preset/index.ts',
    'contracts/index': 'src/contracts/design-language.contract.ts',
    'languages/index': 'src/languages/index.ts'
  },
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', '@pandacss/dev'],
  treeshake: true,
})
```

### How Consumers Use It

```typescript
// Consumer's panda.config.ts
import { defineConfig } from '@pandacss/dev'
import { discourserPandaPreset } from '@discourser/design-system/preset'

export default defineConfig({
  presets: ['@pandacss/preset-base', discourserPandaPreset],
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
})
```

```bash
# Consumer runs
pnpm install @discourser/design-system
pnpm panda codegen  # Generates styled-system/ with your tokens/recipes
```

```tsx
// Consumer's component
import { button } from 'styled-system/recipes'  // From THEIR generated code

export function Button({ variant, size, ...props }) {
  return <button className={button({ variant, size })} {...props} />
}
```

---

## Alternative Solution: Component Library (If You Insist)

If you want to publish ready-made components, you need a **completely different approach**:

### Use Vanilla Extract or CSS Modules

Don't use Panda CSS's generated `styled-system/` at all. Instead:

1. Generate static CSS at build time
2. Publish CSS file alongside components
3. Components use CSS modules or class names

```typescript
// Build process
pnpm panda cssgen --outfile dist/styles.css
```

```json
// package.json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js"
  },
  "./styles.css": "./dist/styles.css"
}
```

```tsx
// Consumer imports
import { Button } from '@discourser/design-system'
import '@discourser/design-system/styles.css'  // Static CSS
```

**Pros:**
- Works out of the box
- No Panda CSS required in consumer app

**Cons:**
- Loses Panda CSS benefits (tree-shaking, JIT generation)
- No customization via preset
- Larger bundle sizes

---

## Migration Path

### Phase 1: Fix Critical Issues (Immediate)

1. **Move @pandacss/dev to peerDependencies**
   ```json
   "peerDependencies": {
     "@pandacss/dev": "^1.8.0"
   }
   ```

2. **Remove styled-system/ from published files**
   ```json
   "files": [
     "dist"
   ]
   ```

3. **Update tsup config** - Remove the styled-system rewrite plugin

4. **Decide on approach** - Preset-only vs Component Library

### Phase 2: Refactor for Chosen Approach

#### If Preset-Only:

1. Remove component exports from `src/index.ts`
2. Keep components in codebase for Storybook/testing
3. Document how consumers build their own components
4. Publish preset at `@discourser/design-system/preset`

#### If Component Library:

1. Switch to static CSS generation
2. Remove Panda CSS styled-system dependency from components
3. Use CSS modules or vanilla-extract
4. Publish CSS alongside components

### Phase 3: Update Documentation

1. Create clear README with usage examples
2. Document how to consume the preset
3. Provide example components consumers can copy
4. Explain the language/contract architecture

---

## Testing the Fix

### Local Testing (Before Publishing)

```bash
# In design system
pnpm build
pnpm pack  # Creates @discourser-design-system-0.9.6.tgz

# In consuming app (discourser.ai)
pnpm add /path/to/discourser-design-system-0.9.6.tgz
```

### Verify Preset Works

```typescript
// Consumer's panda.config.ts
import { discourserPandaPreset } from '@discourser/design-system/preset'

export default defineConfig({
  presets: [discourserPandaPreset],
  include: ['./src/**/*.{ts,tsx}'],
})
```

```bash
pnpm panda codegen  # Should generate styled-system/ with your tokens
```

### Check Generated Tokens

```typescript
// Consumer can verify
import { token } from 'styled-system/tokens'

console.log(token('colors.primary.500'))  // Should show M3 primary color
```

---

## Summary of Required Changes

| Issue | Current State | Required Change | Priority |
|-------|--------------|----------------|----------|
| Dependencies | @pandacss/dev in devDeps only | Add as peerDependency | 🔴 Critical |
| Published files | Includes styled-system/ | Remove styled-system/ | 🔴 Critical |
| Component imports | Import from 'styled-system/*' | Either remove components or switch to static CSS | 🔴 Critical |
| tsup plugin | Rewrites styled-system imports | Remove the plugin | 🟡 High |
| Preset export | Correct structure | Keep as-is (this part is good!) | ✅ OK |
| Language switching | Runtime transformation | Build-time only (document limitation) | 🟡 High |

---

## Questions to Answer

Before proceeding with fixes, you need to decide:

1. **Primary Use Case**: Do you want consumers to:
   - A) Use your preset to build their own components? (Recommended)
   - B) Import pre-built components directly?
   - C) Both (complex, requires hybrid approach)?

2. **Language Switching**: Should consumers be able to:
   - A) Switch languages by changing a config value? (Requires preset-only approach)
   - B) Choose one language at install time? (Publish separate presets)
   - C) Use only Material 3? (Simplest, current state)

3. **Customization Level**: How much control should consumers have?
   - A) Full control (preset-only, build their own components)
   - B) Style overrides only (component library with theme props)
   - C) No customization (static CSS library)

---

## Recommended Next Steps

1. **Read this review thoroughly** and decide on your approach
2. **Choose**: Preset-Only (recommended) or Component Library
3. **Create a migration plan** based on your choice
4. **Test locally** before publishing to npm
5. **Update documentation** to match new architecture
6. **Publish new major version** (breaking changes require semver bump)

---

## Conclusion

Your design system has excellent bones—the contract/language/preset architecture is well-thought-out. However, the fundamental misunderstanding of how Panda CSS presets work across package boundaries is preventing it from functioning correctly.

**The fix is straightforward but requires architectural decisions:**
- Stop publishing `styled-system/`
- Move to preset-only distribution (recommended)
- Or switch to static CSS for component library approach

Once these changes are made, your system will work as intended: consumers can import your preset, generate their styled-system, and build components using your Material 3 tokens.

Let me know which approach you'd like to pursue, and I can help implement the necessary changes.
