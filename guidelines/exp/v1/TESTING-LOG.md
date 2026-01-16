# Figma Make Testing Session Log

**Date:** 2025-01-16
**Package:** `@discourser/design-system@0.2.2`
**Tester:** Will Streeter

---

## Session Overview

| Test | Guidelines Version                                   | Total Size | Result     |
| ---- | ---------------------------------------------------- | ---------- | ---------- |
| A    | exp/v1                                               | 6.9 KB     | ⬜ Pending |
| B    | Current subset (Guidelines.md + overview-imports.md) | ~16 KB     | ⬜ Pending |
| C    | No guidelines (baseline)                             | 0 KB       | ⬜ Pending |

---

## Test A: Minimal Guidelines (exp/v1)

**Setup:**

- [ ] Created new Figma Make file
- [ ] Installed `@discourser/design-system`
- [ ] Added `guidelines/Guidelines.md` from exp/v1
- [ ] Added `guidelines/quick-ref.md` from exp/v1

### Prompt 1: Card with Button

**Prompt:** "Create a Card with a title and a primary button"

| Criteria                            | Pass | Fail | Notes |
| ----------------------------------- | ---- | ---- | ----- |
| Correct import path                 | ⬜   | ⬜   |       |
| Used `Card.Root` (not `<Card>`)     | ⬜   | ⬜   |       |
| Used `Card.Title` or `Card.Header`  | ⬜   | ⬜   |       |
| Button has `colorPalette="primary"` | ⬜   | ⬜   |       |
| Button has valid variant            | ⬜   | ⬜   |       |
| No Tailwind classes                 | ⬜   | ⬜   |       |
| Uses `css()` with semantic tokens   | ⬜   | ⬜   |       |

**Time to complete:** \_\_\_ seconds / ⬜ Timeout

**Actual output (paste key snippet):**

```tsx

```

**Notes:**

---

### Prompt 2: Login Form

**Prompt:** "Create a login form with email and password inputs and a submit button"

| Criteria                          | Pass | Fail | Notes |
| --------------------------------- | ---- | ---- | ----- |
| Correct import path               | ⬜   | ⬜   |       |
| Used `<Input>` component (simple) | ⬜   | ⬜   |       |
| Input has `label` prop            | ⬜   | ⬜   |       |
| Button has `colorPalette`         | ⬜   | ⬜   |       |
| Button has `type="submit"`        | ⬜   | ⬜   |       |
| No Tailwind classes               | ⬜   | ⬜   |       |
| Uses `css()` with semantic tokens | ⬜   | ⬜   |       |

**Time to complete:** \_\_\_ seconds / ⬜ Timeout

**Actual output (paste key snippet):**

```tsx

```

**Notes:**

---

### Prompt 3: Delete Confirmation Dialog

**Prompt:** "Create a dialog for confirming a delete action"

| Criteria                                             | Pass | Fail | Notes |
| ---------------------------------------------------- | ---- | ---- | ----- |
| Correct import path                                  | ⬜   | ⬜   |       |
| Used `Dialog.Root` (not `<Dialog>`)                  | ⬜   | ⬜   |       |
| Used `Dialog.Trigger`                                | ⬜   | ⬜   |       |
| Used `Dialog.Content`                                | ⬜   | ⬜   |       |
| Used `Dialog.Title`                                  | ⬜   | ⬜   |       |
| Cancel button: `variant="outline"` or `"plain"`      | ⬜   | ⬜   |       |
| Delete button: `colorPalette="error"` or `"primary"` | ⬜   | ⬜   |       |
| No Tailwind classes                                  | ⬜   | ⬜   |       |

**Time to complete:** \_\_\_ seconds / ⬜ Timeout

**Actual output (paste key snippet):**

```tsx

```

**Notes:**

---

### Test A Summary

| Prompt           | Pass Rate | Critical Failures |
| ---------------- | --------- | ----------------- |
| Card with Button | /7        |                   |
| Login Form       | /7        |                   |
| Delete Dialog    | /8        |                   |
| **Total**        | /22       |                   |

**Overall Assessment:** ⬜ Usable / ⬜ Needs Work / ⬜ Failed

**Key Observations:**

---

## Test B: Current Guidelines Subset

**Setup:**

- [ ] Created new Figma Make file
- [ ] Installed `@discourser/design-system`
- [ ] Added `guidelines/Guidelines.md` (current ~5.8KB)
- [ ] Added `guidelines/overview-imports.md` (current ~10.4KB)

### Prompt 1: Card with Button

**Prompt:** "Create a Card with a title and a primary button"

| Criteria                            | Pass | Fail | Notes |
| ----------------------------------- | ---- | ---- | ----- |
| Correct import path                 | ⬜   | ⬜   |       |
| Used `Card.Root` (not `<Card>`)     | ⬜   | ⬜   |       |
| Used `Card.Title` or `Card.Header`  | ⬜   | ⬜   |       |
| Button has `colorPalette="primary"` | ⬜   | ⬜   |       |
| Button has valid variant            | ⬜   | ⬜   |       |
| No Tailwind classes                 | ⬜   | ⬜   |       |
| Uses `css()` with semantic tokens   | ⬜   | ⬜   |       |

**Time to complete:** \_\_\_ seconds / ⬜ Timeout

**Actual output (paste key snippet):**

```tsx

```

**Notes:**

---

### Prompt 2: Login Form

**Prompt:** "Create a login form with email and password inputs and a submit button"

| Criteria                          | Pass | Fail | Notes |
| --------------------------------- | ---- | ---- | ----- |
| Correct import path               | ⬜   | ⬜   |       |
| Used `<Input>` component (simple) | ⬜   | ⬜   |       |
| Input has `label` prop            | ⬜   | ⬜   |       |
| Button has `colorPalette`         | ⬜   | ⬜   |       |
| Button has `type="submit"`        | ⬜   | ⬜   |       |
| No Tailwind classes               | ⬜   | ⬜   |       |
| Uses `css()` with semantic tokens | ⬜   | ⬜   |       |

**Time to complete:** \_\_\_ seconds / ⬜ Timeout

**Actual output (paste key snippet):**

```tsx

```

**Notes:**

---

### Prompt 3: Delete Confirmation Dialog

**Prompt:** "Create a dialog for confirming a delete action"

| Criteria                                             | Pass | Fail | Notes |
| ---------------------------------------------------- | ---- | ---- | ----- |
| Correct import path                                  | ⬜   | ⬜   |       |
| Used `Dialog.Root` (not `<Dialog>`)                  | ⬜   | ⬜   |       |
| Used `Dialog.Trigger`                                | ⬜   | ⬜   |       |
| Used `Dialog.Content`                                | ⬜   | ⬜   |       |
| Used `Dialog.Title`                                  | ⬜   | ⬜   |       |
| Cancel button: `variant="outline"` or `"plain"`      | ⬜   | ⬜   |       |
| Delete button: `colorPalette="error"` or `"primary"` | ⬜   | ⬜   |       |
| No Tailwind classes                                  | ⬜   | ⬜   |       |

**Time to complete:** \_\_\_ seconds / ⬜ Timeout

**Actual output (paste key snippet):**

```tsx

```

**Notes:**

---

### Test B Summary

| Prompt           | Pass Rate | Critical Failures |
| ---------------- | --------- | ----------------- |
| Card with Button | /7        |                   |
| Login Form       | /7        |                   |
| Delete Dialog    | /8        |                   |
| **Total**        | /22       |                   |

**Overall Assessment:** ⬜ Usable / ⬜ Needs Work / ⬜ Failed

**Key Observations:**

---

## Test C: No Guidelines (Baseline)

**Setup:**

- [ ] Created new Figma Make file
- [ ] Installed `@discourser/design-system`
- [ ] NO guidelines folder added

### Prompt 1: Card with Button

**Prompt:** "Create a Card with a title and a primary button using @discourser/design-system"

| Criteria                           | Pass | Fail | Notes |
| ---------------------------------- | ---- | ---- | ----- |
| Correct import path                | ⬜   | ⬜   |       |
| Used `Card.Root` (not `<Card>`)    | ⬜   | ⬜   |       |
| Used `Card.Title` or `Card.Header` | ⬜   | ⬜   |       |
| Button has `colorPalette`          | ⬜   | ⬜   |       |
| Button has valid variant           | ⬜   | ⬜   |       |
| No Tailwind classes                | ⬜   | ⬜   |       |

**Time to complete:** \_\_\_ seconds / ⬜ Timeout

**Actual output (paste key snippet):**

```tsx

```

**Notes:**

---

### Test C Summary

| Prompt           | Pass Rate | Critical Failures |
| ---------------- | --------- | ----------------- |
| Card with Button | /6        |                   |
| **Total**        | /6        |                   |

**Overall Assessment:** ⬜ Usable / ⬜ Needs Work / ⬜ Failed

**Key Observations:**

---

## Comparison Summary

| Test               | Guidelines Size | Pass Rate | Timeouts | Best For |
| ------------------ | --------------- | --------- | -------- | -------- |
| A (exp/v1)         | 6.9 KB          | /22       |          |          |
| B (Current subset) | ~16 KB          | /22       |          |          |
| C (No guidelines)  | 0 KB            | /6        |          |          |

---

## Key Findings

### What Worked

### What Failed

### Recommendations for exp/v2

---

## Iteration Notes

Use this section to track specific fixes needed:

| Issue | Guideline Fix | Priority |
| ----- | ------------- | -------- |
|       |               |          |
|       |               |          |
|       |               |          |

---

## Next Steps

- [ ]
- [ ]
- [ ]
