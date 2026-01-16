# @discourser/design-system

## 0.8.0

### Minor Changes

- [#49](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/49) [`0b52fbc`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/0b52fbc26dfaf1c23ab4c7ba8ca1e9c8ed7d563c) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - fix: improve component export pattern for better developer experience

  **Breaking Change:** Simple components are now directly usable without double-naming.

  **Before:**

  ```tsx
  import { Button, Badge, Spinner, IconButton } from '@discourser/design-system';

  // Confusing double-naming required
  <Button.Button variant="filled">Click</Button.Button>
  <Badge.Badge>New</Badge.Badge>
  <Spinner.Spinner />
  <IconButton.IconButton aria-label="Close" />
  ```

  **After:**

  ```tsx
  import { Button, Badge, Spinner, IconButton } from '@discourser/design-system';

  // Direct, intuitive usage
  <Button variant="filled">Click</Button>
  <Badge>New</Badge>
  <Spinner />
  <IconButton aria-label="Close" />

  // Sub-components still accessible
  <Button.Group>
    <Button>One</Button>
    <Button>Two</Button>
  </Button.Group>
  ```

  **Changes:**
  - Simple components (Button, Badge, Spinner, IconButton, Input, Textarea, Heading, InputAddon, InputGroup) are now directly usable
  - Button.Group is accessible via the Button namespace for sub-components
  - Compound components (Card, Dialog, Switch, Accordion, etc.) retain their namespace pattern as expected

  **Benefits:**
  - Intuitive API that follows React conventions
  - Enables Figma Make AI to correctly use components
  - Fixes runtime errors: "React.jsx: type is invalid -- expected a string but got: object"
  - Maintains access to sub-components via namespace (e.g., Button.Group)

  **Migration:**
  If you were using the namespace pattern for simple components, update your imports:

  ```tsx
  // Old (no longer works)
  <Button.Button variant="filled">Click</Button.Button>

  // New (correct)
  <Button variant="filled">Click</Button>
  ```

  Compound components (Card, Dialog, etc.) are unchanged:

  ```tsx
  // Still correct
  <Card.Root>
    <Card.Header>
      <Card.Title>Title</Card.Title>
    </Card.Header>
  </Card.Root>
  ```

- [#49](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/49) [`0b52fbc`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/0b52fbc26dfaf1c23ab4c7ba8ca1e9c8ed7d563c) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Add comprehensive token management and transformation scripts
  - Add design language transformation scripts (DTCG to/from contract)
  - Add Figma token export and organization scripts
  - Add token backup, comparison, and round-trip testing utilities
  - Update and complete task documentation (DS-003, DS-004, DS-004.5, DS-005)
  - Fix multiple component styling issues (Drawer, Dialog, Popover, Tooltip, etc.)
  - Add token directory structure with primitives and semantic tokens
  - Improve Material Design 3 integration and type safety in scripts

- [#49](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/49) [`0b52fbc`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/0b52fbc26dfaf1c23ab4c7ba8ca1e9c8ed7d563c) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - feat: add pre-compiled CSS for zero-config integration

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

### Patch Changes

- [#49](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/49) [`0b52fbc`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/0b52fbc26dfaf1c23ab4c7ba8ca1e9c8ed7d563c) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - fix: export Button and ButtonGroup separately to fix React rendering

  **Problem:** Button component was being exported as a namespace object `{ Button, ButtonGroup }` instead of the Button component itself, causing React error: "React.jsx: type is invalid -- expected a string or a class/function but got: object."

  **Root Cause:** When using intermediate assignment patterns (Object.assign or type assertions), bundlers like Vite/esbuild create a namespace object:

  ```javascript
  var Button_exports = {};
  __export(Button_exports, {
    Button: () => Button,
    ButtonGroup: () => ButtonGroup,
  });
  // Then exports Button_exports as "Button"
  ```

  **Solution:** Export Button and ButtonGroup as separate named exports:

  ```typescript
  // Before:
  const Button = ButtonComponent as typeof ButtonComponent & {
    Group: typeof ButtonGroup;
  };
  Button.Group = ButtonGroup;
  export { Button };

  // After:
  export {
    Button,
    ButtonGroup,
    type ButtonProps,
    type ButtonGroupProps,
  } from './Button';
  ```

  **Impact:**
  - Button now exports as a proper React forwardRef component
  - React can properly render `<Button>` components without errors
  - ButtonGroup available as separate export: `import { Button, ButtonGroup } from '@discourser/design-system'`
  - Fixes compatibility with Figma Make, Vite, and other bundlers
  - All styles from `/dist/styles.css` now apply correctly

- [#49](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/49) [`0b52fbc`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/0b52fbc26dfaf1c23ab4c7ba8ca1e9c8ed7d563c) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - fix: resolve colorPalette token resolution for Button and Badge components

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

- [#49](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/49) [`0b52fbc`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/0b52fbc26dfaf1c23ab4c7ba8ca1e9c8ed7d563c) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - fix: add missing package exports for styled-system/jsx and styled-system/patterns

  The package's compiled code imports from these paths internally, but they were not
  exposed in the exports field of package.json. This caused build errors in consuming
  projects:

  ```
  Missing "./styled-system/jsx" specifier in "@discourser/design-system" package
  ```

  Added exports for:
  - `./styled-system/jsx`
  - `./styled-system/patterns`

  These exports enable consumers to import from these paths and resolve the build errors
  when using the package in projects with strict module resolution.

## 0.7.0

### Minor Changes

- [#45](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/45) [`e235781`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/e2357818a2eb47f44d8728c0010da3e71225dbd8) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - fix: improve component export pattern for better developer experience

  **Breaking Change:** Simple components are now directly usable without double-naming.

  **Before:**

  ```tsx
  import { Button, Badge, Spinner, IconButton } from '@discourser/design-system';

  // Confusing double-naming required
  <Button.Button variant="filled">Click</Button.Button>
  <Badge.Badge>New</Badge.Badge>
  <Spinner.Spinner />
  <IconButton.IconButton aria-label="Close" />
  ```

  **After:**

  ```tsx
  import { Button, Badge, Spinner, IconButton } from '@discourser/design-system';

  // Direct, intuitive usage
  <Button variant="filled">Click</Button>
  <Badge>New</Badge>
  <Spinner />
  <IconButton aria-label="Close" />

  // Sub-components still accessible
  <Button.Group>
    <Button>One</Button>
    <Button>Two</Button>
  </Button.Group>
  ```

  **Changes:**
  - Simple components (Button, Badge, Spinner, IconButton, Input, Textarea, Heading, InputAddon, InputGroup) are now directly usable
  - Button.Group is accessible via the Button namespace for sub-components
  - Compound components (Card, Dialog, Switch, Accordion, etc.) retain their namespace pattern as expected

  **Benefits:**
  - Intuitive API that follows React conventions
  - Enables Figma Make AI to correctly use components
  - Fixes runtime errors: "React.jsx: type is invalid -- expected a string but got: object"
  - Maintains access to sub-components via namespace (e.g., Button.Group)

  **Migration:**
  If you were using the namespace pattern for simple components, update your imports:

  ```tsx
  // Old (no longer works)
  <Button.Button variant="filled">Click</Button.Button>

  // New (correct)
  <Button variant="filled">Click</Button>
  ```

  Compound components (Card, Dialog, etc.) are unchanged:

  ```tsx
  // Still correct
  <Card.Root>
    <Card.Header>
      <Card.Title>Title</Card.Title>
    </Card.Header>
  </Card.Root>
  ```

- [#45](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/45) [`e235781`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/e2357818a2eb47f44d8728c0010da3e71225dbd8) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Add comprehensive token management and transformation scripts
  - Add design language transformation scripts (DTCG to/from contract)
  - Add Figma token export and organization scripts
  - Add token backup, comparison, and round-trip testing utilities
  - Update and complete task documentation (DS-003, DS-004, DS-004.5, DS-005)
  - Fix multiple component styling issues (Drawer, Dialog, Popover, Tooltip, etc.)
  - Add token directory structure with primitives and semantic tokens
  - Improve Material Design 3 integration and type safety in scripts

- [#45](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/45) [`e235781`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/e2357818a2eb47f44d8728c0010da3e71225dbd8) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - feat: add pre-compiled CSS for zero-config integration

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

### Patch Changes

- [#45](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/45) [`e235781`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/e2357818a2eb47f44d8728c0010da3e71225dbd8) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - fix: export Button and ButtonGroup separately to fix React rendering

  **Problem:** Button component was being exported as a namespace object `{ Button, ButtonGroup }` instead of the Button component itself, causing React error: "React.jsx: type is invalid -- expected a string or a class/function but got: object."

  **Root Cause:** When using intermediate assignment patterns (Object.assign or type assertions), bundlers like Vite/esbuild create a namespace object:

  ```javascript
  var Button_exports = {};
  __export(Button_exports, {
    Button: () => Button,
    ButtonGroup: () => ButtonGroup,
  });
  // Then exports Button_exports as "Button"
  ```

  **Solution:** Export Button and ButtonGroup as separate named exports:

  ```typescript
  // Before:
  const Button = ButtonComponent as typeof ButtonComponent & {
    Group: typeof ButtonGroup;
  };
  Button.Group = ButtonGroup;
  export { Button };

  // After:
  export {
    Button,
    ButtonGroup,
    type ButtonProps,
    type ButtonGroupProps,
  } from './Button';
  ```

  **Impact:**
  - Button now exports as a proper React forwardRef component
  - React can properly render `<Button>` components without errors
  - ButtonGroup available as separate export: `import { Button, ButtonGroup } from '@discourser/design-system'`
  - Fixes compatibility with Figma Make, Vite, and other bundlers
  - All styles from `/dist/styles.css` now apply correctly

- [#45](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/45) [`e235781`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/e2357818a2eb47f44d8728c0010da3e71225dbd8) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - fix: resolve colorPalette token resolution for Button and Badge components

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

- [#45](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/45) [`e235781`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/e2357818a2eb47f44d8728c0010da3e71225dbd8) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - fix: add missing package exports for styled-system/jsx and styled-system/patterns

  The package's compiled code imports from these paths internally, but they were not
  exposed in the exports field of package.json. This caused build errors in consuming
  projects:

  ```
  Missing "./styled-system/jsx" specifier in "@discourser/design-system" package
  ```

  Added exports for:
  - `./styled-system/jsx`
  - `./styled-system/patterns`

  These exports enable consumers to import from these paths and resolve the build errors
  when using the package in projects with strict module resolution.

## 0.6.0

### Minor Changes

- [#42](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/42) [`a4c3d23`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/a4c3d2300b6d80b65b00e695f1570d743adfb1d4) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - fix: improve component export pattern for better developer experience

  **Breaking Change:** Simple components are now directly usable without double-naming.

  **Before:**

  ```tsx
  import { Button, Badge, Spinner, IconButton } from '@discourser/design-system';

  // Confusing double-naming required
  <Button.Button variant="filled">Click</Button.Button>
  <Badge.Badge>New</Badge.Badge>
  <Spinner.Spinner />
  <IconButton.IconButton aria-label="Close" />
  ```

  **After:**

  ```tsx
  import { Button, Badge, Spinner, IconButton } from '@discourser/design-system';

  // Direct, intuitive usage
  <Button variant="filled">Click</Button>
  <Badge>New</Badge>
  <Spinner />
  <IconButton aria-label="Close" />

  // Sub-components still accessible
  <Button.Group>
    <Button>One</Button>
    <Button>Two</Button>
  </Button.Group>
  ```

  **Changes:**
  - Simple components (Button, Badge, Spinner, IconButton, Input, Textarea, Heading, InputAddon, InputGroup) are now directly usable
  - Button.Group is accessible via the Button namespace for sub-components
  - Compound components (Card, Dialog, Switch, Accordion, etc.) retain their namespace pattern as expected

  **Benefits:**
  - Intuitive API that follows React conventions
  - Enables Figma Make AI to correctly use components
  - Fixes runtime errors: "React.jsx: type is invalid -- expected a string but got: object"
  - Maintains access to sub-components via namespace (e.g., Button.Group)

  **Migration:**
  If you were using the namespace pattern for simple components, update your imports:

  ```tsx
  // Old (no longer works)
  <Button.Button variant="filled">Click</Button.Button>

  // New (correct)
  <Button variant="filled">Click</Button>
  ```

  Compound components (Card, Dialog, etc.) are unchanged:

  ```tsx
  // Still correct
  <Card.Root>
    <Card.Header>
      <Card.Title>Title</Card.Title>
    </Card.Header>
  </Card.Root>
  ```

- [#42](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/42) [`a4c3d23`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/a4c3d2300b6d80b65b00e695f1570d743adfb1d4) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Add comprehensive token management and transformation scripts
  - Add design language transformation scripts (DTCG to/from contract)
  - Add Figma token export and organization scripts
  - Add token backup, comparison, and round-trip testing utilities
  - Update and complete task documentation (DS-003, DS-004, DS-004.5, DS-005)
  - Fix multiple component styling issues (Drawer, Dialog, Popover, Tooltip, etc.)
  - Add token directory structure with primitives and semantic tokens
  - Improve Material Design 3 integration and type safety in scripts

- [#42](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/42) [`a4c3d23`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/a4c3d2300b6d80b65b00e695f1570d743adfb1d4) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - feat: add pre-compiled CSS for zero-config integration

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

### Patch Changes

- [#42](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/42) [`a4c3d23`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/a4c3d2300b6d80b65b00e695f1570d743adfb1d4) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - fix: add missing package exports for styled-system/jsx and styled-system/patterns

  The package's compiled code imports from these paths internally, but they were not
  exposed in the exports field of package.json. This caused build errors in consuming
  projects:

  ```
  Missing "./styled-system/jsx" specifier in "@discourser/design-system" package
  ```

  Added exports for:
  - `./styled-system/jsx`
  - `./styled-system/patterns`

  These exports enable consumers to import from these paths and resolve the build errors
  when using the package in projects with strict module resolution.

## 0.5.0

### Minor Changes

- [#39](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/39) [`452479e`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/452479e6284913eefd3c25f2e774d96b3e134508) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Add comprehensive token management and transformation scripts
  - Add design language transformation scripts (DTCG to/from contract)
  - Add Figma token export and organization scripts
  - Add token backup, comparison, and round-trip testing utilities
  - Update and complete task documentation (DS-003, DS-004, DS-004.5, DS-005)
  - Fix multiple component styling issues (Drawer, Dialog, Popover, Tooltip, etc.)
  - Add token directory structure with primitives and semantic tokens
  - Improve Material Design 3 integration and type safety in scripts

- [#39](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/39) [`452479e`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/452479e6284913eefd3c25f2e774d96b3e134508) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - feat: add pre-compiled CSS for zero-config integration

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

## 0.4.0

### Minor Changes

- [#34](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/34) [`22f997e`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/22f997ebfde1a768ee7bbb4cf5ff16d9a5a6a04d) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Add comprehensive token management and transformation scripts
  - Add design language transformation scripts (DTCG to/from contract)
  - Add Figma token export and organization scripts
  - Add token backup, comparison, and round-trip testing utilities
  - Update and complete task documentation (DS-003, DS-004, DS-004.5, DS-005)
  - Fix multiple component styling issues (Drawer, Dialog, Popover, Tooltip, etc.)
  - Add token directory structure with primitives and semantic tokens
  - Improve Material Design 3 integration and type safety in scripts

### Patch Changes

- [#33](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/33) [`2e89d11`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/2e89d11712b2895b2554ed185c19f17394b0b241) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Add guidelines folder to published npm package for Figma Make integration
  - Include comprehensive design system guidelines in npm package
  - Enable Figma Make to access component and token documentation
  - Support AI-powered design generation with embedded guidelines

## 0.3.0

### Minor Changes

- [#31](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/31) [`63c8c95`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/63c8c95904fe5194dc694051462148dd8f75fdf6) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Add comprehensive token management and transformation scripts
  - Add design language transformation scripts (DTCG to/from contract)
  - Add Figma token export and organization scripts
  - Add token backup, comparison, and round-trip testing utilities
  - Update and complete task documentation (DS-003, DS-004, DS-004.5, DS-005)
  - Fix multiple component styling issues (Drawer, Dialog, Popover, Tooltip, etc.)
  - Add token directory structure with primitives and semantic tokens
  - Improve Material Design 3 integration and type safety in scripts

## 0.2.2

### Patch Changes

- [#25](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/25) [`693dbda`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/693dbda4ed0239d88d03a6e89b4a33c677bf1e1a) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Add Badge component stories and development workflow protections
  - Add comprehensive Badge.stories.tsx with all variants, sizes, and color palettes
  - Add CODEOWNERS to require approval for critical files (.github/workflows/, package.json, etc.)
  - Add pre-commit hooks with husky and lint-staged for automatic linting, formatting, and type checking
  - Add RELEASE_PROCESS.md documentation
  - Add warning comments to release.yml to prevent accidental modifications

  These protections ensure developers working on components won't accidentally modify the carefully debugged release workflow.

## 0.2.1

### Patch Changes

- [#16](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/16) [`3abcfbd`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/3abcfbdd3e798e51baa41ab860329a1ba890250f) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Add comprehensive design system documentation and Storybook integration
  - Add complete design system guidelines (12 files) for Figma Make AI
  - Add Figma Make template creation documentation (9 guides)
  - Add auto-generation script to sync markdown docs to Storybook
  - Add Storybook documentation pages and configuration
  - Fix MDX2 syntax errors in documentation (self-closing br tags)
  - Remove duplicate story files
  - Update npm OIDC publishing skill documentation

## 0.1.7

### Patch Changes

- [#13](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/13) [`d610805`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/d6108055ddb43acc2f42e9ddce308caac3e6bc68) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Republish to ensure packaging fix reaches npm (0.1.4 was published before fix was merged)

## 0.1.6

### Patch Changes

- [#11](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/11) [`75de3a1`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/75de3a12a21ed5bc63608103d24311a8a8eb6c7b) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Fix: Remove dist/ from git tracking to ensure fresh builds in CI

  Previously, stale dist/ files were committed causing published packages to have old builds. Now dist/ is generated fresh during each CI build, ensuring the packaging fix (rewritten styled-system imports) is actually published.

## 0.1.5

### Patch Changes

- [#8](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/8) [`a738842`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/a7388423ac2975af1afc8f67b53e9ce858e4b442) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Republish to ensure packaging fix reaches npm (0.1.4 was published before fix was merged)

## 0.1.4

### Patch Changes

- [#6](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/6) [`710a420`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/710a420499dd4d8a7e5800830d40e2c31df287dc) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Fix critical packaging issue: Rewrite styled-system imports to package-relative paths

  Components were importing from 'styled-system/recipes' which couldn't be resolved by consuming applications. Added esbuild plugin to tsup that rewrites these to '@discourser/design-system/styled-system/recipes' during build, ensuring compatibility with all bundlers (Vite, Webpack, etc.) without requiring special configuration.

## 0.1.3

### Patch Changes

- [#4](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/4) [`35dcc99`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/35dcc99cf8b5d613807fa18806da9f8ddb80822a) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Test: Validate complete release pipeline with automated versioning and npm publishing via OIDC

## 0.1.1

### Patch Changes

- [`006455d`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/006455d78c7d663459564f7bc937873024cff90c) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - updating CI/CD workflow

## Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
