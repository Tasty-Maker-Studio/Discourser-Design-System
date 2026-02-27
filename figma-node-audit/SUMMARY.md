# Figma Node Audit — Discourser.AI V1

**File:** `GaHmFfmvO4loUzuZS4TgEz`
**Tool:** `mcp__figma-remote__get_metadata` (remote API — does not require Figma desktop)
**Date:** 2026-02-25

---

## Results

| Component                   | Node ID      | Node Type  | Name in Figma       | Is Component? | Notes                                                                                                                                                                |
| --------------------------- | ------------ | ---------- | ------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Logo (old instance)         | 38:4045      | —          | —                   | ❌ No         | **Node not found** — deleted/replaced. The Logo instance is now `491:4956` inside frame `38:4044` ("Logo Holder").                                                   |
| DiscourserLogo (definition) | **491:4933** | `symbol`   | "DiscourserLogo"    | ✅ Yes        | **Component definition** (`symbol` = `COMPONENT`). Valid for Code Connect. `Icons/DiscourserLogo.figma.tsx` is active.                                               |
| NavigationMenu (instance)   | 38:4046      | `instance` | "Navigation Menu"   | ❌ No         | Instance used in app screens. Master component found at `38:8485`.                                                                                                   |
| NavigationMenu (definition) | **38:8485**  | `symbol`   | "NavigationMenu"    | ✅ Yes        | **Component definition** (`symbol` = `COMPONENT`). Valid for Code Connect. `NavigationMenu.figma.tsx` should target this node.                                       |
| ScenarioQueue (instance)    | 478:5781     | `instance` | "ScenarioQueue"     | ❌ No         | Instance used in app screens. Master component found at `478:5757`.                                                                                                  |
| ScenarioQueue (definition)  | **478:5757** | `symbol`   | "ScenarioQueue"     | ✅ Yes        | **Component definition** (`symbol` = `COMPONENT`). Valid for Code Connect. `ScenarioQueue.figma.tsx` should target this node.                                        |
| Header                      | 485:4697     | `frame`    | "Header"            | ⚠️ Partial    | **Frame** containing 10 child `symbol` nodes (one per size variant: `size=xSm` through `size=7xlg`). Valid for Code Connect — `Header.figma.tsx` targets this frame. |
| Breadcrumb                  | 38:7978      | `symbol`   | "Breadcrumb"        | ✅ Yes        | **Component definition** (`symbol` = `COMPONENT`). Valid for Code Connect. `Breadcrumb.figma.tsx` is active.                                                         |
| ContentCard                 | 478:5957     | `symbol`   | "ContentCard"       | ✅ Yes        | **Component definition** (`symbol` = `COMPONENT`). Valid for Code Connect. `ContentCard.figma.tsx` is active.                                                        |
| ScenarioSettings            | 38:8240      | `symbol`   | "Scenario Settings" | ✅ Yes        | **Component definition** (`symbol` = `COMPONENT`). Valid for Code Connect. `ScenarioSettings.figma.tsx` is active.                                                   |

---

## Key: Node Types

| XML Tag      | Figma API Type                 | Code Connect Valid?                                 |
| ------------ | ------------------------------ | --------------------------------------------------- |
| `<symbol>`   | `COMPONENT` or `COMPONENT_SET` | ✅ Yes — component definition                       |
| `<instance>` | `INSTANCE`                     | ❌ No — placed copy of a component                  |
| `<frame>`    | `FRAME`                        | ⚠️ Depends — valid if it contains component symbols |

---

## Current Code Connect Status

After the audit + cleanup session, these are the **active `.figma.tsx` files**:

| File                                          | Node ID      | Status                                         |
| --------------------------------------------- | ------------ | ---------------------------------------------- |
| `Header.figma.tsx`                            | 485:4697     | ✅ Active — frame with 10 size-variant symbols |
| `Breadcrumb.figma.tsx`                        | 38:7978      | ✅ Active — symbol (component definition)      |
| `ContentCard/ContentCard.figma.tsx`           | 478:5957     | ✅ Active — symbol (component definition)      |
| `ScenarioSettings/ScenarioSettings.figma.tsx` | 38:8240      | ✅ Active — symbol (component definition)      |
| `Accordion.figma.tsx`                         | 38:8232      | ✅ Active — symbol (component definition)      |
| `NavigationMenu/NavigationMenu.figma.tsx`     | **38:8485**  | ✅ Active — symbol (component definition)      |
| `ScenarioQueue/ScenarioQueue.figma.tsx`       | **478:5757** | ✅ Active — symbol (component definition)      |
| `Icons/DiscourserLogo.figma.tsx`              | **491:4933** | ✅ Active — symbol (component definition)      |

**Deleted and confirmed unrestorable** (no component definition in this file):
`Logo`, `Button`, `Badge`, `Input`, `RadioGroup`, `Slider`, `Stepper`, `Avatar`, `Card`, `Checkbox`, `Dialog`, `Drawer`, `IconButton`, `Popover`, `Progress`, `Select`, `Skeleton`, `Spinner`, `Switch`, `Tabs`, `Textarea`, `Tooltip`

---

## Why Standard DDS Components Are Missing

The V1 file (`GaHmFfmvO4loUzuZS4TgEz`) is an **app design file**, not a component library file. Standard components (Button, Badge, Input, etc.) appear as **instances** imported from an external Figma component library — their definitions live in a separate library file. Code Connect for those components would need to point to the library file's node IDs, not this file.
