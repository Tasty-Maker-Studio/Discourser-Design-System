---
"@discourser/design-system": patch
---

Add Badge component stories and development workflow protections

- Add comprehensive Badge.stories.tsx with all variants, sizes, and color palettes
- Add CODEOWNERS to require approval for critical files (.github/workflows/, package.json, etc.)
- Add pre-commit hooks with husky and lint-staged for automatic linting, formatting, and type checking
- Add RELEASE_PROCESS.md documentation
- Add warning comments to release.yml to prevent accidental modifications

These protections ensure developers working on components won't accidentally modify the carefully debugged release workflow.
