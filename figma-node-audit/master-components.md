# Master Component Trace — Discourser.AI V1

**File:** `GaHmFfmvO4loUzuZS4TgEz`
**Date:** 2026-02-25

---

## Method

Figma instance nodes store their master component reference in the `componentId` field of the REST API. The MCP `get_metadata` tool returns simplified XML that does not expose this field directly. Instead, master components were identified using two signals:

1. **Root `data-node-id` in `get_design_context` output** — The generated code annotates the root element with the master component's node ID (distinct from the instance ID).
2. **Child node ID pattern** — Instance children use the format `I{instanceId};{masterChildId}`. The namespace prefix of `{masterChildId}` (e.g., `810:xxxx`) identifies which file the master component lives in.
3. **Full-page `get_metadata` on `0:1`** — Scanned all `<symbol>` tags in the page to confirm which component definitions exist locally.

---

## Results

### NavigationMenu — Instance `38:4046`

| Field                          | Value                                                                                                                                                                                                                                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instance node                  | `38:4046` (instance)                                                                                                                                                                                                                                                              |
| Name                           | "Navigation Menu"                                                                                                                                                                                                                                                                 |
| Location in file               | Frame `38:4043` ("Left Side Nav")                                                                                                                                                                                                                                                 |
| Child ID pattern               | `I38:4046;810:4220`, `I38:4046;810:4221`, …                                                                                                                                                                                                                                       |
| Master component namespace     | **`810:`**                                                                                                                                                                                                                                                                        |
| Master component in this file? | **❌ No**                                                                                                                                                                                                                                                                         |
| Conclusion                     | Master component lives in an **external component library** (creator ID `810`). No `<symbol>` named "Navigation Menu" exists anywhere in `GaHmFfmvO4loUzuZS4TgEz`. The entire page scan (`0:1`) found only ONE symbol in the file: `66:2739` ("Studio Conversation / Prelaunch"). |
| Code Connect viable?           | ❌ Cannot point Code Connect at this file — need the library file key                                                                                                                                                                                                             |

---

### ScenarioQueue — Instance `478:5781`

| Field                                 | Value                                                                                            |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Instance node                         | `478:5781` (instance)                                                                            |
| Name                                  | "ScenarioQueue"                                                                                  |
| Root `data-node-id` in design context | **`478:5757`**                                                                                   |
| Master component node                 | **`478:5757`**                                                                                   |
| Master node type                      | `<symbol>` — **COMPONENT** ✅                                                                    |
| Master in this file?                  | ✅ Yes — confirmed by `get_metadata` returning `<symbol id="478:5757" name="ScenarioQueue" ...>` |
| Master coordinates                    | x=5693.5, y=4093 (off-canvas component definition area)                                          |
| Code Connect viable?                  | ✅ Yes — node `478:5757` is a valid COMPONENT in this file                                       |

---

### Logo — Instance node `38:4045` (original, now missing)

| Field                          | Value                                                                                                                                                                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Original node                  | `38:4045` — **does not exist** (deleted or moved)                                                                                                                                                                                                                                           |
| Current Logo Holder            | Frame `38:4044` ("Logo Holder")                                                                                                                                                                                                                                                             |
| Current Logo instance          | `491:4956` (instance named "DiscourserLogo") inside `38:4044`                                                                                                                                                                                                                               |
| Master component namespace     | **`491:`**                                                                                                                                                                                                                                                                                  |
| Master component in this file? | **❌ No**                                                                                                                                                                                                                                                                                   |
| Conclusion                     | The Logo/DiscourserLogo component definition lives in an **external component library** (creator ID `491`). Node `38:4045` no longer exists — it was likely the old Logo instance that was replaced by `491:4956` ("DiscourserLogo"). The frame `38:4044` ("Logo Holder") is the container. |
| Code Connect viable?           | ❌ Cannot point Code Connect at this file — need the library file key                                                                                                                                                                                                                       |

---

## Summary Table

| Component             | Instance Node | Master Node           | Master Type              | In This File? | Code Connect?        |
| --------------------- | ------------- | --------------------- | ------------------------ | ------------- | -------------------- |
| NavigationMenu        | `38:4046`     | `810:????` (external) | COMPONENT (external lib) | ❌ No         | ❌ Need library file |
| ScenarioQueue         | `478:5781`    | **`478:5757`**        | `symbol` (COMPONENT)     | ✅ Yes        | ✅ Use `478:5757`    |
| Logo / DiscourserLogo | `491:4956`    | `491:????` (external) | COMPONENT (external lib) | ❌ No         | ❌ Need library file |

---

## Key Finding

This file (`GaHmFfmvO4loUzuZS4TgEz`) is an **app design file**, not a component library. The page scan found only **one component definition** (`<symbol>`) in the entire file: `66:2739` ("Studio Conversation / Prelaunch").

All other components (NavigationMenu, Logo/DiscourserLogo, Button, Badge, etc.) are **instances imported from external Figma component libraries**. To set up Code Connect for those components, the library file key would need to be identified and each component's definition node ID located in that file.

The only DDS components with definitions in this file are the custom app-specific ones:

- `478:5757` — ScenarioQueue
- `38:7978` — Breadcrumb
- `478:5957` — ContentCard
- `38:8240` — ScenarioSettings
- `38:8232` — Accordion
- `485:4697` — Header (frame containing component symbols)
