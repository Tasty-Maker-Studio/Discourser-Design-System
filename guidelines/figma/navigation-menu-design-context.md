# Navigation Menu — Figma Design Context

**Source:** https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-4046&m=dev
**Node ID:** `38:4046`
**Retrieved:** 2026-02-20

---

## Visual Description

All 5 sections are fully expanded in the Figma design. The sidebar is 283px wide with a warm off-white/beige tone (`#f5f1eb`). Section headers have rounded pill-shaped backgrounds. Nav items are indented 30px from the left edge. The active item (MyQueue in Scenarios) has a slightly lighter background (`#f3f4e9`). The chevron indicator points down (expanded state) for all sections.

---

## Design Tokens

| Token                                                  | Figma Value                                         | Semantic Mapping                 |
| ------------------------------------------------------ | --------------------------------------------------- | -------------------------------- |
| Section header background (default)                    | `#f5f1eb` (Stone/60%/500)                           | `surface.container`              |
| Section header background (Scenarios / active section) | `var(--surfacecontainer, #eeefe3)`                  | `surface.container`              |
| Active nav item background                             | `var(--surfacecontainerlow, #f3f4e9)`               | `surface.container.low`          |
| Highlighted nav item background                        | `#ebe7e1` (Gray/Neutral/30%/400)                    | `surface.container.high`         |
| Text color (all labels)                                | `#363636` (Black/Neutral/30%/600)                   | `onSurface`                      |
| Section title font                                     | Inter Medium 18px, lineHeight 100%, letterSpacing 0 | `Dsktp/Inter/Button/Medium/18px` |
| Nav item font                                          | Inter Medium 16px, lineHeight 100%, letterSpacing 0 | `Dsktp/Inter/Link/Medium/16`     |

---

## Layout & Spacing

| Property                            | Value                                               |
| ----------------------------------- | --------------------------------------------------- |
| Component width                     | 283px                                               |
| ListItem padding                    | `10px` all sides                                    |
| Gap between items within a ListItem | `10px`                                              |
| Section header border radius        | `8px`                                               |
| Section header padding              | `5px`                                               |
| Nav item padding                    | `top/bottom: 5px`, `left: 30px`, `right: 5px`       |
| Nav item border radius              | `8px`                                               |
| Nav item row width                  | `241px` (fills container minus section padding)     |
| Icon container                      | `24×24px` with `2px` inner padding → `20×20px` icon |

---

## Icons (Lucide)

The Figma component references Lucide icons. All icons are `20×20px` stroke-based.

| Section                   | Lucide Icon Name              | Node ID  |
| ------------------------- | ----------------------------- | -------- |
| Dashboard                 | `layout-dashboard`            | `38:217` |
| MyNotebook                | `book-open-text`              | `38:256` |
| Scenarios                 | `message-square`              | `38:30`  |
| Help                      | `hand-helping`                | `38:26`  |
| Account                   | `user-round`                  | `38:28`  |
| Expand/collapse indicator | `chevron-right` (rotated 90°) | (inline) |

**Icon source:** https://lucide.dev/icons/

---

## Interaction States

### Section Header (Expandable List Item trigger)

- **Default / collapsed:** `bg: #f5f1eb`, chevron pointing right (rotated 90°)
- **Expanded:** same background, all child items visible below
- **Active section (Scenarios shown):** `bg: var(--surfacecontainer, #eeefe3)`

### Nav Item

- **Default:** transparent background, `color: #363636`
- **Active (current page):** `bg: var(--surfacecontainerlow, #f3f4e9)` — subtle warm tint
- **Hover (inactive):** `bg: #ebe7e1`

---

## Content Map

### Dashboard

- Quick Start → `/dashboard/quick-start`
- Resume Session → `/dashboard/resume-session`
- Progress → `/dashboard/progress`
- Momentum → `/dashboard/momentum`
- Recent Session → `/dashboard/recent-session`

### MyNotebook

- Knowledge Base → `/notebook/knowledge-base`
- Session Library → `/notebook/session-library` _(shown as active in Figma)_
- Decision Patterns → `/notebook/decision-patterns`
- Personal Insights → `/notebook/personal-insights`

### Scenarios

- MyQueue → `/scenarios/my-queue` _(shown as active in Figma)_
- Conversation Studio → `/scenarios/conversation-studio`
- Studio Setup → `/scenarios/studio-setup`
- By Level → `/scenarios/by-level`
- By Skill → `/scenarios/by-skill`

### Help

- How it Works → `/help/how-it-works`
- Practice Tips → `/help/practice-tips`
- Technical Support → `/help/technical-support`
- Context → `/help/context`
- Contact Support → `/help/contact-support`

### Account

- Profile → `/account/profile`
- User Preferences → `/account/preferences`

---

## Raw Figma Code Output (Tailwind/React)

```tsx
const imgVector =
  'http://localhost:3845/assets/ff82f93fd0c5d7e4ad7133f0cf4199daa138ecc5.svg';
const imgVector1 =
  'http://localhost:3845/assets/9aaea68f3499852103a7e9a96d7203347c9c9f5a.svg';
const imgVector2 =
  'http://localhost:3845/assets/12eed93f145fe9872c072b428f31d292ea6afff7.svg';
const imgVector3 =
  'http://localhost:3845/assets/175015f1ba1f3df60d92581208e93029e9c35dc8.svg';
const imgVector4 =
  'http://localhost:3845/assets/c92aee36dab6888dec9b39d7ff72047f9dc316a0.svg';
const imgVector5 =
  'http://localhost:3845/assets/42f0ea724312075df04838d07ed64b5e66627bd0.svg';

// Note: imgVector = Dashboard icon (layout-dashboard)
// Note: imgVector1 = Chevron icon (shared across all sections)
// Note: imgVector2 = MyNotebook icon (book-open-text)
// Note: imgVector3 = Scenarios icon (message-square)
// Note: imgVector4 = Help icon (hand-helping)
// Note: imgVector5 = Account icon (user-round)
```

> **Note:** localhost asset URLs are local Figma MCP server references — they are not persistent.
> Use the DDS icon components (`DashboardIcon`, `NotebookIcon`, `ScenarioIcon`, `HelpIcon`, `AccountIcon`) instead.

---

## Implementation Notes for DDS

1. **Icon mapping** — Replace Figma localhost SVG refs with DDS icon components from `src/components/Icons/`
2. **Background tokens** — The `#eeefe3` (surfacecontainer) maps to the `surface.container` semantic token; `#f3f4e9` (surfacecontainerlow) maps to `surface.container.low`
3. **All sections are expanded** in the Figma design — use `defaultOpenSections` to control this in stories
4. **Chevron direction** — Figma shows `rotate-[90.13deg]` on the chevron, meaning the expanded state uses a downward-pointing arrow. The Accordion recipe's `ItemIndicator` already handles open/closed rotation.
5. **Active item is `MyQueue`** in the Scenarios section in the Figma design — the item row background uses `surface.container.low` not `primary.container`. This differs from the current DDS implementation which uses `primary.container` for active items.
6. **Font weight** — All labels use `Inter Medium (500)`. The DDS `onSurface` token covers the `#363636` text color.
