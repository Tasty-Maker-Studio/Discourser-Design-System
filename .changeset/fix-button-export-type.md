---
'@discourser/design-system': patch
---

fix: export Button and ButtonGroup separately to fix React rendering

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
