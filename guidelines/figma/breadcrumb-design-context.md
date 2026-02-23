# Breadcrumb — Figma Design Context

**Source:** https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-4139&m=dev
**Node ID:** `38:4139`
**Figma Name:** `Breadcrumb`
**Retrieved:** 2026-02-21

---

## Visual Description

A horizontal breadcrumb navigation bar showing a two-level path: **"Scenarios" → "My Queue"**. "Scenarios" is the parent crumb (slightly muted, 18px Inter Medium, `#4A4A4A`). A chevron-right icon separates the two. "My Queue" is the current/active crumb (darker, 16px Inter Medium, `#2E2E2E`, 275px wide button). The active crumb also contains a rotated left-arrow icon on the right side. The entire bar is on a warm off-white background consistent with the rest of the application shell.

---

## Component Structure

```
Breadcrumb (horizontal flex, gap 10px)
├── Button — "Scenarios"           (parent crumb, 36px tall, p-6, rounded-4)
│   └── Text: "Scenarios"          (Inter Medium 18px, #4A4A4A)
├── Icon — chevron-right            (27×27px, SVG, color #4A4A4A)
└── Button — "My Queue"            (active crumb, 36px tall, p-6, rounded-4, 275px wide)
    ├── Text: "My Queue"           (Inter Medium 16px, #2E2E2E)
    └── Icon — arrow-left (rotated 180°, i.e. arrow-right, 18×18px)
```

---

## Design Tokens

| Property | Figma Value | Token / Semantic Mapping |
|---|---|---|
| Parent crumb text color | `#4A4A4A` (Black/Neutral/30%/500) | `fg.subtle` |
| Active crumb text color | `#2E2E2E` (Black/Neutral/30%/700) | `onSurface` / `fg.default` |
| Accent / chevron color | `#6B7A1F` (Primary/700) | `primary.7` |
| Parent font | Inter Medium 18px, lineHeight 100% | `Dsktp/Mobile/Inter/H4/Medium/18` |
| Active crumb font | Inter Medium 16px, lineHeight 32px | `Dsktp/Inter/Link/Medium/16` |
| Button height | 36px | `h-9` |
| Button padding | 6px (all sides) | `p-1.5` |
| Button border radius | 4px | `l2` (radii token) |
| Chevron icon size | 27×27px | `size-7` approx |
| Arrow icon size | 18×18px | `size-4.5` |
| Active crumb width | 275px | fixed |

---

## Layout & Spacing

| Property | Value |
|---|---|
| Container direction | Horizontal flex |
| Container gap | 10px |
| Container alignment | `items-center` |
| Crumb button gap (internal) | 2px between text and spacer/icon |
| Spacer width inside button | 4px |

---

## Icons

Both icons reference [Lucide Icons](https://lucide.dev/icons/):

| Icon | Usage | Figma Node |
|---|---|---|
| `chevron-right` | Separator between breadcrumb levels | `38:542` |
| `arrow-left` (rotated 180°) | Right-pointing arrow on active crumb | `38:370` |

---

## DDS Mapping (Discourser Design System)

| Figma Element | DDS Component | Notes |
|---|---|---|
| Breadcrumb container | `<Breadcrumb.Root>` | Existing `breadcrumb` slot recipe |
| Parent crumb button | `<Breadcrumb.Item>` + `<Breadcrumb.Link>` | muted style |
| Chevron separator | `<Breadcrumb.Separator>` | Use `ChevronRightIcon` from DDS Icons |
| Active crumb button | `<Breadcrumb.Item>` + `<Breadcrumb.CurrentLink>` | bold/dark style, contains right-arrow icon |
| Right arrow | `<RightArrowIcon>` | Exists at `src/components/Icons/RightArrowIcon.tsx` |

---

## Figma Raw Code (Tailwind — for reference only, do NOT use directly)

```tsx
// Node 38:4139 — Breadcrumb
// "Scenarios" (parent) > chevron-right > "My Queue" (active, with right arrow)
// Parent text: Inter Medium 18px #4A4A4A
// Active text: Inter Medium 16px #2E2E2E
// Separator icon: lucide chevron-right, 27px
// Active crumb arrow: lucide arrow-left rotated 180deg, 18px
```

---

## Notes

- The "Scenarios" parent crumb does not have a background fill — it's transparent against the shell background.
- The "My Queue" active crumb also does not have a visible border or background fill in this design; the distinction is purely typographic (size and color).
- The right-arrow icon on the active crumb appears to indicate this is the current/last item in the path — it may act as a drill-down affordance in the real UI.
- The `fontFeatureSettings: 'liga' 0, 'calt' 0'` on the active crumb text suppresses ligatures — important for consistency with the rest of the UI.
