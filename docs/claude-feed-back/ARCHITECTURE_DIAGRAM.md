# Design System Architecture: Current vs. Correct

## Current (Broken) Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ @discourser/design-system (Published Package)               │
│                                                             │
│  ┌──────────────┐   ┌─────────────────┐   ┌──────────────┐│
│  │ src/preset/  │   │ src/components/ │   │ styled-      ││
│  │ index.ts     │───│ Button.tsx      │   │ system/      ││
│  │              │   │                 │   │              ││
│  │ (defines     │   │ import { button}│──▶│ (GENERATED   ││
│  │  tokens,     │   │ from 'styled-   │   │  during build││
│  │  recipes)    │   │ system/recipes' │   │  published   ││
│  └──────────────┘   └─────────────────┘   │  to npm) ❌  ││
│                                            └──────────────┘│
└─────────────────────────────────────────────────────────────┘
                         │
                         │ npm install
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Consumer App (discourser.ai)                                │
│                                                             │
│  ┌────────────────────┐   ┌──────────────────────────────┐ │
│  │ panda.config.ts    │   │ node_modules/                │ │
│  │                    │   │ @discourser/                 │ │
│  │ presets: [         │   │   design-system/             │ │
│  │   discourserPanda  │───│     styled-system/ ❌        │ │
│  │   Preset           │   │     (outdated, wrong tokens) │ │
│  │ ]                  │   │                              │ │
│  └────────────────────┘   └──────────────────────────────┘ │
│                                                             │
│  ❌ PROBLEM: Consumer tries to import from                 │
│     @discourser/design-system/styled-system/*               │
│     but that was generated for the design system's build,   │
│     not the consumer's app                                  │
└─────────────────────────────────────────────────────────────┘
```

**Why This Fails:**
1. Components in design system import from `styled-system/recipes`
2. That `styled-system/` folder is built for the design system project
3. Published to npm alongside components
4. Consumer imports components, which reference a `styled-system/` that doesn't match their app
5. Token references break, recipes don't align with consumer's configuration

---

## Correct Architecture: Preset-Only

```
┌─────────────────────────────────────────────────────────────┐
│ @discourser/design-system (Published Package)               │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ dist/preset/index.js                                 │  │
│  │                                                      │  │
│  │ export const discourserPandaPreset = {               │  │
│  │   name: 'discourser-material3-preset',               │  │
│  │   theme: {                                           │  │
│  │     extend: {                                        │  │
│  │       tokens: {                                      │  │
│  │         colors: { /* M3 palettes */ },               │  │
│  │         spacing: { /* M3 spacing */ },               │  │
│  │         // ... all token definitions                 │  │
│  │       },                                             │  │
│  │       recipes: {                                     │  │
│  │         button: { /* button recipe */ },             │  │
│  │         input: { /* input recipe */ },               │  │
│  │         // ... all recipe definitions                │  │
│  │       }                                              │  │
│  │     }                                                │  │
│  │   }                                                  │  │
│  │ }                                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ✅ NO styled-system/ folder published                     │
│  ✅ NO components published (or see Alternative below)     │
│  ✅ Only preset configuration as JavaScript/TypeScript     │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ npm install
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Consumer App (discourser.ai)                                │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ panda.config.ts                                     │   │
│  │                                                     │   │
│  │ import { discourserPandaPreset }                    │   │
│  │   from '@discourser/design-system/preset'           │   │
│  │                                                     │   │
│  │ export default defineConfig({                       │   │
│  │   presets: [discourserPandaPreset],                 │   │
│  │   include: ['./src/**/*.{ts,tsx}'],                 │   │
│  │   outdir: 'styled-system' ────────────┐             │   │
│  │ })                                    │             │   │
│  └───────────────────────────────────────┼─────────────┘   │
│                                          │                 │
│                                          ▼                 │
│  ┌───────────────────────────────────────────────────┐    │
│  │ pnpm panda codegen                                │    │
│  │                                                   │    │
│  │ Generates styled-system/ in consumer's project:   │    │
│  │                                                   │    │
│  │ styled-system/                                    │    │
│  │ ├── css/          ← CSS utility functions         │    │
│  │ ├── tokens/       ← M3 tokens from preset         │    │
│  │ ├── recipes/      ← Button, input recipes         │    │
│  │ └── patterns/     ← Layout patterns               │    │
│  │                                                   │    │
│  │ ✅ Generated locally for THIS app                 │    │
│  │ ✅ Uses tokens/recipes from preset                │    │
│  │ ✅ Can add app-specific overrides                 │    │
│  └───────────────────────────────────────────────────┘    │
│                                          │                 │
│                                          ▼                 │
│  ┌───────────────────────────────────────────────────┐    │
│  │ Consumer builds their own components              │    │
│  │                                                   │    │
│  │ import { button } from 'styled-system/recipes'    │    │
│  │                                                   │    │
│  │ export function Button({ variant, ...props }) {   │    │
│  │   return (                                        │    │
│  │     <button                                       │    │
│  │       className={button({ variant })}             │    │
│  │       {...props}                                  │    │
│  │     />                                            │    │
│  │   )                                               │    │
│  │ }                                                 │    │
│  │                                                   │    │
│  │ ✅ Uses THEIR styled-system/ (local)              │    │
│  │ ✅ Full control over components                   │    │
│  │ ✅ Can customize as needed                        │    │
│  └───────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Alternative: Preset + Component Examples

If you want to help consumers with pre-built components:

```
┌─────────────────────────────────────────────────────────────┐
│ @discourser/design-system (Published Package)               │
│                                                             │
│  ┌──────────────────┐   ┌──────────────────────────────┐   │
│  │ dist/preset/     │   │ examples/ (in published pkg) │   │
│  │ index.js         │   │                              │   │
│  │                  │   │ Button.example.tsx           │   │
│  │ (preset config)  │   │ Input.example.tsx            │   │
│  │                  │   │ Card.example.tsx             │   │
│  │ ✅ Build-time    │   │                              │   │
│  │    configuration │   │ ✅ Reference implementations │   │
│  └──────────────────┘   │ ✅ Copy-paste ready          │   │
│                         │ ✅ Use consumer's            │   │
│                         │    styled-system/            │   │
│                         └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ npm install
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Consumer App                                                │
│                                                             │
│  1. Import preset in panda.config.ts                        │
│  2. Run panda codegen                                       │
│  3. Copy examples from node_modules/.../examples/           │
│  4. Customize as needed                                     │
│                                                             │
│  ✅ Full flexibility                                        │
│  ✅ No dependency hell                                      │
│  ✅ Examples as documentation                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Principles

### ✅ Correct Approach

1. **Preset = Configuration Only**
   - Token definitions (colors, spacing, typography)
   - Recipe definitions (button variants, input styles)
   - Semantic tokens (surface, primary, onPrimary)
   - Theme extensions
   - NO generated code
   - NO styled-system/

2. **Consumer Generates styled-system/**
   - Runs `panda codegen` with your preset
   - Gets their own `styled-system/` folder
   - Matches their app configuration
   - Can add overrides/extensions

3. **Components Are Consumer Responsibility**
   - OR provide as examples to copy
   - OR publish separately as static CSS components
   - Never mix runtime components with Panda preset

### ❌ What NOT to Do

1. **Don't Publish styled-system/**
   - It's generated for YOUR project
   - Won't work in consumer projects
   - Creates conflicts and confusion

2. **Don't Import styled-system/ in Published Components**
   - If components are published, they can't reference styled-system/
   - Must use static CSS or CSS modules instead

3. **Don't Make @pandacss/dev a Regular Dependency**
   - Must be peerDependency
   - Prevents version conflicts
   - Allows consumers to control Panda version

---

## Migration Summary

### Remove from Published Package
- ❌ `styled-system/` folder
- ❌ Components that import from `styled-system/*`
- ❌ tsup plugin that rewrites styled-system imports

### Keep in Published Package
- ✅ Preset configuration (`dist/preset/index.js`)
- ✅ Type definitions (`DesignLanguageContract`)
- ✅ Language utilities (for advanced users)

### Update package.json
- ✅ Move `@pandacss/dev` to peerDependencies
- ✅ Remove `styled-system` from files array
- ✅ Export only `dist/` folder

### Documentation
- ✅ README with usage examples
- ✅ Example components consumers can copy
- ✅ Migration guide from 0.9.x to 1.0.0
