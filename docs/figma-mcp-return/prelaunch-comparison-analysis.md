# Design Context Comparison: Node 66:2739 (Conversation Prelaunch)

**Before:** `conversation_lobby-design-context.md` (remote MCP, ~March 27)
**After:** `prelaunch-get-design-context.md` (desktop MCP, March 29, post-codex update)

---

## Key Difference: Desktop MCP Returns Much Richer Data

The desktop MCP (localhost:3845) returns significantly more detail than the remote MCP:

### Variable References — MAJOR IMPROVEMENT

The desktop MCP output uses CSS custom property syntax with fallback values, revealing 
the actual Figma variable bindings. Examples from the after pull:

- `var(--surfacecontainerhigh,#e8e9de)` — variable bound with hex fallback
- `var(--neutral\/90,#e3e3db)` — Primitive collection
- `var(--neutral\/99,#fdfcf5)` — Primitive collection
- `var(--neutral\/0,black)` — Primitive collection
- `var(--secondary\/50,#6c7d56)` — Primitive collection
- `var(--secondary\/80,#bbcda1)` — Primitive collection
- `var(--primary\/80,#97d945)` — Primitive collection
- `var(--primary\/99,#f9ffe9)` — Primitive collection
- `var(--primary\/10,#102000)` — Primitive collection
- `var(--primary\/60,#64a104)` — Primitive collection (RadioGroup border)
- `var(--neutral\/20,#30312c)` — Primitive collection
- `var(--neutral\/40,#5e5f59)` — Primitive collection
- `var(--neutral\/95,#f2f1e9)` — Primitive collection
- `var(--neutral\/70,#abaca5)` — Primitive collection
- `var(--neutral\/80,#c7c7c0)` — Primitive collection
- `var(--neutral\/30,#464742)` — Primitive collection
- `var(--neutralvariant\/95,#eff2e3)` — Primitive collection
- `var(--neutralvariant\/10,#191d14)` — Primitive collection
- `var(--surfacecontainer,#eeefe3)` — Semantic collection
- `var(--surface,#f9faef)` — Semantic collection

**Spacing & Shape variables also visible:**
- `var(--spacing\/xl,32px)` → px padding
- `var(--spacing\/xxl,48px)` → py padding
- `var(--spacing\/md,16px)` → Clock padding
- `var(--p-0,0px)`, `var(--p-1,4px)`, `var(--p-2,8px)`, `var(--p-4,16px)`
- `var(--radii\/small,8px)`, `var(--radii\/medium,12px)`, `var(--radii\/large,16px)`
- `var(--radius\/rounded-full,9999px)`
- `var(--border\/thin,1px)`

**Typography variables:**
- `var(--typography\/family\/body,'Poppins:SemiBold',sans-serif)`
- `var(--typography\/size\/xl,18px)`
- `var(--font\/family\/font-sans,'Inter:Medium',sans-serif)`
- `var(--font\/weight\/font-medium,500)`

**Shadow variables:**
- `var(--shadow\/2xs,rgba(26,26,26,0.05))`
- `var(--shadow\/md,rgba(26,26,26,0.05))` with multi-layer structure

The before pull (remote MCP) showed only hex values — no variable references at all.

### Hardcoded Hex Values (Still Dirty)

These appear as raw hex without variable bindings:
- `#c5d24d` — Primary/500 (Switch on state, Badge bg)
- `rgba(192,209,92,0.4)` — Primary/Beginner/40% (Badge bg, Switch off state)
- `#b8a9c9` — Accent/500 (Slider thumb)
- `#cfc4db` — Accent/400 (Slider thumb border)
- `#6b7a1f` — Primary/700 (Slider range fill)
- `#e0dcd5` — Gray/Neutral/30%/500 (Slider track)
- `#f5f1eb` — Stone/60%/500 (Accordion borders)
- `#fffdfa` — Info Panel bg
- `#363636` — Black/Neutral/30%/600 (text)
- `#2e2e2e` — Black/Neutral/30%/700 (text)
- `#4a5565` — (Scenario Settings subtext)
- `#e5e7eb` — (RightControlPanel border — likely from old external library)
- `#faf8f5` — Stone/60%/400 (Stage bg)

### Node IDs and Data Attributes — NEW

The desktop MCP includes `data-node-id` and `data-name` attributes on every element.
This is gold for Kai — it can trace any element back to its Figma source node.

### Component Structure Identified

Components detected with their Figma variant info:
- `SettingsPopover` — property1: "Default" | "Open-Popover"
- `DiscourserAiSwitchToggle` — state: "Default" | "Disabled" | "Focus", toggled: boolean
- `PopOver` — standalone
- `Logout` — standalone

### Code Connect — Still Not Active

No `<CodeConnectSnippet>` wrappers in output. The desktop MCP doesn't read 
figma-codex.json either. Components are identified by name but code is generated 
from scratch rather than using DDS imports.

---

## What This Means for Kai

The desktop MCP data is dramatically better than the remote MCP for Kai's pipeline:

1. **Variable names are visible** — Kai can now map `var(--secondary/50)` directly 
   to DDS tokens using figma-token-resolution.md

2. **Spacing/radius/border tokens are exposed** — These weren't available before. 
   Kai can now use `spacing.xl`, `radii.large` etc.

3. **Node IDs on every element** — Kai can cross-reference against figma-codex.json 
   to identify which elements are DDS components

4. **Component variant props are typed** — SettingsPopover and Switch show their 
   Figma variant properties, which map to DDS component props

## Remaining Gaps

1. **Swap Library still needed** — `#e5e7eb` borders and other hex values suggest 
   old external library bindings are still present in nested instances

2. **No Code Connect** — Would need `add_code_connect_map` or Code Connect UI 
   to get the MCP to return DDS imports directly

3. **Accent colors hardcoded** — `#b8a9c9` (slider thumb), `#cfc4db` (slider border) 
   are not variable-bound in Figma

4. **Badge uses inline hex** — `rgba(192,209,92,0.4)` instead of a variable binding

5. **Component doc links still point to shadcn** — Not DDS Storybook
