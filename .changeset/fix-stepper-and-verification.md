---
'@discourser/design-system': minor
---

## Stepper Component Fixes

- Fix label text wrapping by adding `whiteSpace: nowrap` styling
- Fix missing connector lines by adding `minWidth: 40px` and proper color token (`neutral.surface.border`)
- Fix uneven spacing by adding `flexShrink: 0` to trigger
- Add dedicated `label` slot to stepper recipe

## Development Workflow Improvements

- Add comprehensive `pnpm verify` script with colored output
- Add pre-push hook to run all checks automatically before pushing
- Update pre-commit hook to auto-regenerate Panda types when recipes change
- Update build process to include typecheck step

These changes ensure the stepper component displays correctly in consuming applications and prevent CI failures by catching errors locally.
