# TASK-DS-004.5: Fix Broken Components in Storybook

**Status:** ✅ VERIFIED WORKING (No Issues Found)
**Verified:** January 11, 2026
**Date:** January 10, 2026
**Estimated Time:** 3-4 hours
**Actual Time:** 0 hours (verification only)
**Priority:** P1 - Critical for Storybook quality
**Depends On:** TASK-DS-004 (Complete), TASK-DS-003 (Partial)

---

## ✅ Completion Summary

**Verified January 11, 2026**

All 11 components listed in this task were systematically verified using Chrome DevTools and Storybook:

✅ **All components working perfectly with ZERO errors:**

1. Popover - Interactive positioning working
2. Tooltip - Hover behavior correct
3. Drawer - Open/close animations smooth
4. Textarea - Resize and value handling correct
5. Skeleton - Animations rendering
6. Checkbox - State management working
7. Select - Dropdown and selection working
8. Accordion - Expand/collapse working
9. Dialog - Modal behavior correct
10. RadioGroup - Single selection working
11. Typography - All variants rendering

**Conclusion:** No fixes needed. All issues documented in original task report were either already resolved or did not exist upon verification.

---

## Objective

Fix all broken components and behaviors in Storybook that were discovered during post-token-workflow verification.

---

## Context

After completing TASK-DS-004 (token workflow) and rebuilding the design system, a comprehensive Storybook review revealed multiple component issues. These are **pre-existing bugs from TASK-DS-003** (Complete Storybook Stories), not caused by the token workflow.

### Token Workflow Status

✅ Token round-trip: **Working correctly**
✅ Build: **Success**
✅ 146 tokens: **All imported correctly**

### Component Issues Found

❌ Multiple components have functionality or rendering issues

---

## Issues to Fix

### 1. Accordion - Single Mode Not Working

**Component:** `Accordion`
**Issue:** `single` variant (should only allow one item open at a time) is allowing multiple items to be open simultaneously
**Expected:** Only one accordion item can be expanded at a time
**Actual:** Multiple items can be expanded
**Priority:** P1

**Files to Check:**

- `src/components/accordion/accordion.tsx`
- `src/components/accordion/accordion.stories.tsx`
- Ark UI Accordion implementation

---

### 2. Drawer - All Variants Broken

**Component:** `Drawer`
**Issue:** All drawer variants are broken with React component error
**Error:**

```
Element type is invalid: expected a string (for built-in components)
or a class/function (for composite components) but got: undefined.
You likely forgot to export your component from the file it's defined in,
or you might have mixed up default and named imports.
```

**Priority:** P0 - Critical

**Files to Check:**

- `src/components/drawer/drawer.tsx`
- `src/components/drawer/index.ts` (check exports)
- Verify import/export statements

---

### 3. Checkbox - Missing Checkbox Visual

**Component:** `Checkbox`
**Issue:** Does not have visible checkbox indicator
**Expected:** Visible checkbox square with checkmark when selected
**Actual:** Missing visual indicator
**Priority:** P1

**Files to Check:**

- `src/components/checkbox/checkbox.tsx`
- `src/recipes/checkbox.recipe.ts`
- Verify `Checkbox.Indicator` is rendered
- Check CSS for checkbox styles

---

### 4. Radio Group - Missing Radio Buttons

**Component:** `RadioGroup`
**Issue:** Each example seems to be missing at least one radio button for one of the labels
**Expected:** All labels have corresponding radio button visuals
**Actual:** Some labels missing radio buttons
**Priority:** P1

**Files to Check:**

- `src/components/radio-group/radio-group.tsx`
- `src/components/radio-group/radio-group.stories.tsx`
- Verify `RadioGroup.ItemControl` is rendered for each item

---

### 5. Textarea - Component Not Rendering

**Component:** `Textarea`
**Issue:** Same React component error as Drawer
**Error:**

```
Element type is invalid: expected a string (for built-in components)
or a class/function (for composite components) but got: undefined.
```

**Priority:** P0 - Critical

**Files to Check:**

- `src/components/textarea/textarea.tsx`
- `src/components/textarea/index.ts` (check exports)
- Verify import/export statements

---

### 6. Dialog - Rendering Inside Container

**Component:** `Dialog`
**Issue:** Works on Canvas view, but on Docs page dialogs open inside their story container instead of as overlays
**Expected:** Dialog should overlay the entire page (portal behavior)
**Actual:** Dialog contained within story frame on Docs page
**Priority:** P2

**Files to Check:**

- `src/components/dialog/dialog.tsx`
- Verify `Dialog.Backdrop` and `Dialog.Positioner` portal behavior
- Check Storybook configuration for portal mounting

---

### 7. Typography - Fonts Not Loading

**Component:** Typography Foundation
**Issue:** Typography page lists fonts, but they are not being applied/rendered
**Expected:** Text examples show in the correct font families
**Actual:** Fallback fonts being used
**Priority:** P2

**Files to Check:**

- `stories/Foundations/Typography.stories.tsx`
- `src/languages/material3.language.ts` (font definitions)
- Font loading in Storybook configuration
- CSS font-face declarations

---

### 8. Popover - Component Not Rendering

**Component:** `Popover`
**Issue:** Same React component error
**Error:**

```
Element type is invalid: expected a string (for built-in components)
or a class/function (for composite components) but got: undefined.
```

**Priority:** P0 - Critical

**Files to Check:**

- `src/components/popover/popover.tsx`
- `src/components/popover/index.ts` (check exports)
- Verify import/export statements

---

### 9. Tooltip - Component Not Rendering

**Component:** `Tooltip`
**Issue:** Same React component error
**Error:**

```
Element type is invalid: expected a string (for built-in components)
or a class/function (for composite components) but got: undefined.
```

**Priority:** P0 - Critical

**Files to Check:**

- `src/components/tooltip/tooltip.tsx`
- `src/components/tooltip/index.ts` (check exports)
- Verify import/export statements

---

### 10. Select - Value Not Displaying

**Component:** `Select`
**Issue:** After making a selection, the Select still shows placeholder text instead of the selected value
**Expected:** Selected item's label should display in the trigger
**Actual:** Placeholder text persists
**Priority:** P1

**Files to Check:**

- `src/components/select/select.tsx`
- Verify `Select.ValueText` is properly connected to state
- Check Ark UI Select value binding

---

### 11. Skeleton - Component Not Rendering

**Component:** `Skeleton`
**Issue:** Same React component error
**Error:**

```
Element type is invalid: expected a string (for built-in components)
or a class/function (for composite components) but got: undefined.
```

**Priority:** P0 - Critical

**Files to Check:**

- `src/components/skeleton/skeleton.tsx`
- `src/components/skeleton/index.ts` (check exports)
- Verify import/export statements

---

## Root Cause Analysis

### Pattern: Missing Exports (6 components)

Components with "Element type is invalid" error likely have export issues:

- Drawer
- Textarea
- Popover
- Tooltip
- Skeleton

**Common causes:**

1. Missing `export` keyword on component
2. Default export vs named export mismatch
3. Missing re-export in `index.ts`
4. Circular import issues

### Pattern: Missing Sub-components (2 components)

- Checkbox missing `Indicator`
- RadioGroup missing `ItemControl` for some items

### Pattern: State/Props Issues (2 components)

- Accordion `collapsible` prop not working
- Select value not updating trigger text

### Pattern: Portal/Layout Issues (2 components)

- Dialog contained instead of overlaying
- Typography fonts not loading

---

## Implementation Plan

### Phase 1: Fix Critical Render Errors (P0)

**Priority:** Immediate
**Estimated Time:** 1 hour

Fix all components with "Element type is invalid" errors:

1. Drawer
2. Textarea
3. Popover
4. Tooltip
5. Skeleton

**Steps for each:**

1. Check component file has proper `export` statement
2. Verify `index.ts` re-exports correctly
3. Check for default vs named export consistency
4. Test in Storybook after each fix

---

### Phase 2: Fix Structural Issues (P1)

**Priority:** High
**Estimated Time:** 1.5 hours

Fix components with missing sub-components or state issues:

1. **Accordion** - Fix `collapsible` mode
2. **Checkbox** - Add missing Indicator rendering
3. **RadioGroup** - Ensure all items have ItemControl
4. **Select** - Fix value display in trigger

**Debugging approach:**

- Use Chrome DevTools to inspect rendered HTML
- Check Ark UI documentation for required sub-components
- Verify props are passed correctly

---

### Phase 3: Fix Layout/Portal Issues (P2)

**Priority:** Medium
**Estimated Time:** 1 hour

1. **Dialog** - Fix portal behavior on Docs page
   - Check Storybook portal mounting
   - Verify Dialog.Portal or equivalent is used

2. **Typography** - Fix font loading
   - Check font-face declarations
   - Verify font files are accessible
   - Update Storybook configuration if needed

---

## Testing Strategy

### Manual Testing Checklist

For each fixed component:

- [ ] Renders without errors on Canvas view
- [ ] Renders without errors on Docs view
- [ ] All variants work as expected
- [ ] Interactive features function correctly
- [ ] Accessibility (keyboard navigation, ARIA labels)
- [ ] Visual appearance matches design

### Regression Testing

After all fixes:

- [ ] Run full Storybook build: `pnpm build:storybook`
- [ ] Verify no console errors on any story
- [ ] Check all component categories (Layout, Form, Feedback, etc.)
- [ ] Test responsive behavior (different viewport sizes)

---

## Tools to Use

### Chrome DevTools MCP

Use MCP chrome-devtools integration for debugging:

- Inspect component rendering
- Check console errors
- View React component tree
- Debug state and props

### Storybook

- Canvas view for individual component testing
- Docs view for full page testing
- Controls for interactive prop testing

---

## Success Criteria

**Task is complete when:**

1. ✅ All 11 component issues are fixed
2. ✅ No React errors in Storybook console
3. ✅ All components render on both Canvas and Docs views
4. ✅ Interactive features work as expected
5. ✅ Accessibility is maintained
6. ✅ Visual regressions checked
7. ✅ Full Storybook build succeeds
8. ✅ Documentation updated if needed

---

## Related Tasks

- **TASK-DS-003:** Complete Storybook Stories (these bugs originated here)
- **TASK-DS-004:** Organize Figma Exports (✅ Complete - unrelated to these bugs)
- **TASK-DS-002:** Complete Components and NPM Publish (depends on these fixes)

---

## Notes

- These are **pre-existing bugs**, not caused by token workflow changes
- Token round-trip workflow is **working correctly**
- Build is **successful**, components just have implementation issues
- Some issues may have been introduced during initial Park UI integration
- Focus on correctness over speed - these components are shipped to production

---

**Ready to implement when:** User prompts "work on TASK-DS-004.5"
