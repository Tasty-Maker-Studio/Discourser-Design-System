# Kai Resolution Simulation — Conversation Prelaunch (66:2739)
## Post-Rebind Analysis: What Kai Can and Cannot Resolve

---

## 1. Component Resolution (via figma-codex.json)

Kai cross-references `data-name` attributes against figma-codex component names.

### ✅ RESOLVES to DDS component
| data-name in MCP output | figma-codex match | DDS import |
|---|---|---|
| `DiscourserLogo` | DiscourserLogo (node 491:4933) | `import { DiscourserLogo } from '@discourser/design-system/Icons/DiscourserLogo'` |
| `Navigation Menu` | NavigationMenu (node 38:8485) | `import * as NavigationMenu from '@discourser/design-system/NavigationMenu'` |
| `StudioControlsMenu` | StudioControls (node 38:8232) | `import { StudioControls } from '@discourser/design-system/StudioControls'` |
| `Breadcrumb` | Breadcrumb (node 38:7978) | `import * as Breadcrumb from '@discourser/design-system/Breadcrumb'` |
| `Discourser Button` | Button (node 38:7993) | `import { Button } from '@discourser/design-system/Button'` |
| `Badge` | Badge (node 0:0 placeholder) | `import { Badge } from '@discourser/design-system/Badge'` |
| `Slider` / `.Slider Item` | Slider (node 38:7988) | `import * as Slider from '@discourser/design-system/Slider'` |
| `Radio Group` / `.Radio Group Item` | RadioGroup (node 38:8757) | `import * as RadioGroup from '@discourser/design-system/RadioGroup'` |
| `Discourser AI Switch Toggle` / `Switch` | Switch (node 38:8121) | `import * as Switch from '@discourser/design-system/Switch'` |

### ⚠️ PARTIAL — Recognized but needs interpretation
| data-name | What Kai sees | Gap |
|---|---|---|
| `SettingsPopover` (via `PopOver` component) | SettingsPopover exists in codex (node 810:5398) | MCP splits it into PopOver + Logout sub-components — Kai needs to reassemble |
| `Discourse Accordion Item (Info Panel)` etc. | Accordion exists in codex (node 38:8232) | These are domain-specific panels, not generic Accordion — Kai uses StudioControls instead |
| `LoggedInAvatar` | Not in codex | Kai would need to fall back to Storybook MCP for Avatar component |

### ❌ NOT in codex — falls back to Storybook MCP or raw code
| data-name | What it is | Resolution path |
|---|---|---|
| `ListItem` / `Expandable List Item` | NavigationMenu internal parts | Covered by NavigationMenu composite — not separate |
| `icon-Front` / `icon-Back` / Lucide Icons | Icon components | DDS has icon .figma.tsx files but these are Figma's Lucide instances |
| `Heading 2` | Georgia Bold 24px header | Raw text styling — no DDS heading component for this |
| `Clock` | Custom timer display | App-specific, not a DDS component |
| `Instructions Container` | Content card | Could use Card component — Kai needs to infer |

---

## 2. Color Token Resolution

### ✅ Variables that resolve directly via figma-token-resolution.md

| var() in MCP output | Token resolution path | DDS Panda CSS |
|---|---|---|
| `var(--neutral/99,#fdfcf5)` | Primitive → neutral/99 | `bg="neutral.99"` or `token('colors.surface')` |
| `var(--neutral/90,#e3e3db)` | Primitive → neutral/90 | `token('colors.surface.container.high')` |
| `var(--neutral/30,#464742)` | Primitive → neutral/30 | `token('colors.onSurface.variant')` |
| `var(--neutral/20,#30312c)` | Primitive → neutral/20 | `token('colors.onSurface')` approx |
| `var(--neutral/40,#5e5f59)` | Primitive → neutral/40 | Muted text |
| `var(--neutral/80,#c7c7c0)` | Primitive → outline/variant border | `token('colors.outline.variant')` |
| `var(--neutral/0,black)` | Primitive → black | Stage background |
| `var(--secondary/50,#6c7d56)` | Primitive → secondary | `token('colors.secondary')` |
| `var(--secondary/80,#bbcda1)` | Primitive → secondary/container | `token('colors.secondary.container')` |
| `var(--primary/80,#97d945)` | Primitive → inverse/primary | `token('colors.inverse.primary')` |
| `var(--primary/99,#f9ffe9)` | Primitive → near-white tint | `token('colors.primary.palette.99')` |
| `var(--primary/10,#102000)` | Primitive → dark green | Clock background |
| `var(--primary/60,#64a104)` | Primitive → accent | RadioGroup selected border |
| `var(--neutralvariant/95,#eff2e3)` | Primitive → light tint | `token('colors.surface.container.low')` |
| `var(--neutralvariant/10,#191d14)` | Primitive → dark text | Section header text |
| `var(--neutralvariant/80,#c5c8ba)` | Primitive → outline/variant | SettingsPopover border |
| `var(--surface,#f9faef)` | **Semantic** → surface | `token('colors.surface')` ✨ |
| `var(--surface/container,#eeefe3)` | **Semantic** → surface/container | `token('colors.surface.container')` ✨ |
| `var(--surface/container/high,#e8e9de)` | **Semantic** → surface/container/high | `token('colors.surface.container.high')` ✨ |
| `var(--shadow,black)` | **Semantic** → shadow | `token('colors.shadow')` ✨ |

The ✨ items are the ones we **fixed this session** — previously these were shadcn-named (`foreground`, `border`, etc.) or old-library (`surfacecontainerhigh`).

### ✅ Spacing/Shape variables that resolve
| var() in MCP output | DDS token |
|---|---|
| `var(--spacing/xl,32px)` | `p="xl"` |
| `var(--spacing/xxl,48px)` | `p="xxl"` |
| `var(--spacing/md,16px)` | `p="md"` |
| `var(--radii/small,8px)` | `borderRadius="small"` |
| `var(--radii/medium,12px)` | `borderRadius="medium"` |
| `var(--radii/large,16px)` | `borderRadius="large"` |
| `var(--border/thin,1px)` | `borderWidth="thin"` |

### ⚠️ Hardcoded hex that Kai CAN resolve via hex lookup
| Hex | figma-token-resolution.md match | DDS token |
|---|---|---|
| `#1b1c18` | onSurface | `token('colors.onSurface')` |
| `#30312c` | neutral/20 → onSurface approx | `token('colors.onSurface')` |
| `#363636` | Black/Neutral/30%/600 style | **NOT in DDS** — closest `onSurface` |
| `#2e2e2e` | Black/Neutral/30%/700 style | **NOT in DDS** — closest `onSurface` |
| `#464742` | neutral/30 | `token('colors.onSurface.variant')` |
| `#6c7d56` | secondary/50 | `token('colors.secondary')` |
| `#97d945` | primary/80 | `token('colors.inverse.primary')` |
| `#e3e3db` | neutral/90 | `token('colors.surface.container.high')` |
| `#eeefe3` | surfacecontainer | `token('colors.surface.container')` |
| `#e8e9de` | surfacecontainerhigh | `token('colors.surface.container.high')` |
| `#fdfcf5` | neutral/99 | near-white surface |
| `#f9faef` | surface | `token('colors.surface')` |
| `#f2f1e9` | neutral/95 | `token('colors.surface.container.low')` |
| `#eff2e3` | neutralvariant/95 | `token('colors.surface.container.low')` |
| `#f9ffe9` | primary/99 | near-white primary tint |
| `#bbcda1` | secondary/80 | `token('colors.secondary.container')` |
| `#abaca5` | neutral/70 | border color |

### ❌ Hardcoded hex Kai CANNOT resolve — NOT in token resolution tables
| Hex | Where used | Problem |
|---|---|---|
| `#363636` | Text throughout (accordion triggers, nav) | Local style "Black/Neutral/30%/600" — not a DDS variable |
| `#2e2e2e` | Bullet text | Local style "Black/Neutral/30%/700" — not a DDS variable |
| `#4a5565` | Scenario Settings subtext | Unknown — possibly from old design |
| `#c5d24d` | Primary/500 — Switch on, Badge bg accent | Local Figma style, NOT variable-bound |
| `rgba(192,209,92,0.4)` | Primary/Beginner/40% — Badge, Switch off | Local style with opacity |
| `#b8a9c9` | Accent/500 — Slider thumb | Local Figma style |
| `#cfc4db` | Accent/400 — Slider thumb border | Local Figma style |
| `#6b7a1f` | Primary/700 — Slider range fill | Local Figma style |
| `#e0dcd5` | Gray/Neutral/30%/500 — Slider track | Local Figma style |
| `#f5f1eb` | Stone/60%/500 — Accordion borders | Local Figma style |
| `#faf8f5` | Stone/60%/400 — Stage bg | Local Figma style |
| `#fffdfa` | Info Panel bg | Unknown |
| `#e5e7eb` | RightControlPanel border | Likely Tailwind gray-200 default — from old library |
| `#91918b` | neutral/60 text | In var() but not in hex table |

---

## 3. Typography Resolution

| Figma style detected | Font | Size/Weight | Kai resolution |
|---|---|---|---|
| `headlineMedium` | Fraunces 28px/400 | ✅ `textStyle="headlineMedium"` |
| `bodyLarge` / `bodyLargeReg` / `bodyLargeSemiBold` | Poppins 18px/400-600 | ✅ `textStyle="bodyLarge"` |
| `bodyMedium` | Poppins 14px/400 | ✅ `textStyle="bodyMedium"` |
| Georgia Bold 24px | `Dsktp/Georgia/H4/SemiB/24` | ❌ Not in DDS typography scale — "Studio Controls" header |
| Inter Regular 18px | Nav labels | ❌ Inter not in DDS typography — Figma uses Inter, DDS uses Poppins |
| Inter Medium 20px | Accordion triggers | ❌ Inter not in DDS typography |
| Inter Medium 16px | Nav sub-items | ❌ Inter not in DDS typography |

**Key gap:** The nav and accordion use Inter font, but DDS typography is Poppins for body/UI. This is a design-code mismatch Kai would flag.

---

## 4. Summary: Kai's Fidelity Estimate

### What resolves cleanly: ~70%
- Page structure (3-column layout) — fully understood
- 9 DDS components identified via codex
- 20+ color variables resolve through Primitive/Semantic tables
- Spacing, radius, border tokens all resolve
- Core typography (headlineMedium, bodyLarge, bodyMedium) resolves

### What requires inference or workaround: ~15%
- 14 hardcoded hex values need hex lookup table (most DO match)
- Typography font mismatch (Inter in Figma vs Poppins in DDS)
- SettingsPopover needs reassembly from sub-components
- Instructions Container should map to Card but isn't explicitly named

### What Kai can't resolve: ~15%
- `#363636` / `#2e2e2e` text colors — not in any DDS token table
- `#c5d24d` Primary/500 and Accent palette — local Figma styles, no variables
- `#e5e7eb` border — leftover Tailwind default
- `#4a5565` subtext — unknown origin
- Georgia Bold 24px — not in DDS type scale
- `#fffdfa` panel bg — not in any table

---

## 5. Recommended Next Actions (priority order)

### HIGH — Would move fidelity from ~70% to ~85%
1. **Create Figma variables for the Accent palette** (`#b8a9c9`, `#cfc4db`, `#6b5a7d`, `#8d7ea3`) and Primary/500 (`#c5d24d`). These are used on sliders, switches, and badges but have no variable bindings.

2. **Replace `#363636` and `#2e2e2e` with `onSurface` or `onSurface/variant`** on text nodes. These are local styles that should be variable-bound.

3. **Add `#363636`, `#2e2e2e`, and `#4a5565` to Kai's hex lookup table** as interim measure while Figma bindings are fixed.

### MEDIUM — Would move to ~90%
4. **Resolve the Inter vs Poppins typography mismatch** — decide whether nav/accordion should use Poppins (DDS standard) or if Inter is intentional for these contexts.

5. **Replace `#e5e7eb` border** on RightControlPanel with `outline/variant` variable.

6. **Create `#fffdfa` → near-white token** or map to existing `neutral/99`.

### LOW — Polish
7. Update Figma component descriptions to point to DDS Storybook instead of shadcn docs.
8. Explore `add_code_connect_map` to get MCP to return DDS imports directly.
