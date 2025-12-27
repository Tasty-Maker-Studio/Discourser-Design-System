---
"@discourser/design-system": patch
---

Fix critical packaging issue: Rewrite styled-system imports to package-relative paths

Components were importing from 'styled-system/recipes' which couldn't be resolved by consuming applications. Added esbuild plugin to tsup that rewrites these to '@discourser/design-system/styled-system/recipes' during build, ensuring compatibility with all bundlers (Vite, Webpack, etc.) without requiring special configuration.
