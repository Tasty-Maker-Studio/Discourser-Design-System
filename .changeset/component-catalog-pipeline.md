---
'@discourser/design-system': minor
---

Add automated component catalog pipeline and complete missing component coverage

- New `scripts/generate-component-catalog.ts` — generates `docs/component-catalog.md` from `ComponentCatalog.stories.tsx` on every build
- New `scripts/catalog:generate` script wired into `pnpm build` pipeline
- Extended `scripts/validate-exports.ts` with Phase 2 catalog coverage check
- `docs/component-catalog.md` now ships with the package (38 components, auto-dated, version-stamped)
- 7 new unit test files: AbsoluteCenter, Divider, Group, Icon, SettingsPopover, StudioControls, Toaster
- 3 new Storybook story files: AbsoluteCenter.stories.tsx, Group.stories.tsx, Icon.stories.tsx
- All 7 previously missing components added to ComponentCatalog.stories.tsx
- All 7 components now have package.json subpath export entries
- Toast/Toaster naming inconsistency documented via CATALOG_ALIASES map
