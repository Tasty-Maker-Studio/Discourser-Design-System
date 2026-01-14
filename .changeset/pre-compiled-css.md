---
"@discourser/design-system": minor
---

feat: add pre-compiled CSS for zero-config integration

The package now ships with a pre-compiled `styles.css` file (144KB), enabling instant integration without build configuration:

**New Usage:**
```tsx
import '@discourser/design-system/styles.css';
import { Button, Card } from '@discourser/design-system';
```

**Features:**
- ✅ No build step required - just import and use
- ✅ All semantic tokens, component recipes, and theme support included
- ✅ Light/dark theme support via `data-theme` attribute
- ✅ Optimized for Figma Make integration
- ✅ 144KB uncompressed (~20-25KB gzipped)

**Breaking Changes:**
None - existing styled-system imports continue to work

**Documentation:**
- New CSS_USAGE.md with complete integration guide
- Updated README with quick start examples
- Framework-specific examples (Vite, Next.js)

**Build Changes:**
- Added `build:css` script: `panda cssgen --outfile dist/styles.css`
- Updated package.json exports to include `./styles.css`
- Build order: panda codegen → tsup → cssgen

This enables tools like Figma Make to consume the package without requiring Panda CSS configuration.
