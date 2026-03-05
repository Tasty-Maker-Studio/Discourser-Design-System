---
'@discourser/design-system': minor
---

Add figma-codex manifest generator

Introduces `figma-codex` — a portable Node.js tool that reads `.figma.tsx` Code Connect files and generates `dist/figma-codex.json`, a structured manifest mapping Figma design components to their code implementations (import paths, prop interfaces, sub-components, usage examples).

- New `pnpm codex:generate` and `pnpm codex:watch` scripts
- New `./figma-codex` package export pointing to `dist/figma-codex.json`
- Auto-regeneration on `.figma.tsx` commit via lint-staged
- Covers all 8 DDS components with correct `simple`, `compound`, and `composite` classification
- Handles multi-line function prop types (e.g. `renderLink` on `NavigationMenu`)
