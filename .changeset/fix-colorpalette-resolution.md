---
'@discourser/design-system': patch
---

fix: resolve colorPalette token resolution for Button and Badge components

**Problem:** Park UI's button and badge recipes use virtual `colorPalette.*` tokens (like `colorPalette.solid.bg`) that only resolve when a colorPalette class is explicitly applied. Without this, buttons and badges rendered with no background color.

**Root Cause:** The virtual `colorPalette.*` tokens generate CSS variables like `--colors-color-palette-solid-bg`, but these variables remain undefined until a `.color-palette_<value>` class is applied to set them.

**Solution:**

1. Updated Button and Badge components to accept and default `colorPalette` prop to `'primary'`
2. Applied colorPalette using Panda's `css({ colorPalette })` function to generate the required class
3. Added staticCss configuration to pre-generate CSS for all colorPalette values

**Changes:**

- `src/components/Button.tsx`: Added colorPalette prop handling with 'primary' default
- `src/components/Badge.tsx`: Added colorPalette prop handling with 'primary' default
- `panda.config.ts`: Added staticCss to pre-generate colorPalette CSS for ['primary', 'neutral', 'error', 'gray', 'red']

**Testing:**
Verified that `dist/styles.css` now includes `.color-palette_primary`, `.color-palette_neutral`, `.color-palette_error`, `.color-palette_gray`, and `.color-palette_red` classes with proper CSS variable definitions.

**Impact:**

- Buttons and badges now render with proper background colors by default
- Users can still override with custom colorPalette values
- All Park UI recipe patterns now work correctly with Material Design 3 tokens
