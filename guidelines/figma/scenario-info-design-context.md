# Scenario Info — Figma Design Context

**Source:** https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-4140&m=dev
**Node ID:** `38:4140`
**Figma Name:** `Stage Container`
**Retrieved:** 2026-02-21

---

## Visual Description

A full-page "scenario detail" view. The page has a warm off-white/beige shell background. At the top is a breadcrumb ("Scenarios > My Queue"). Below it is a large Fraunces serif heading: **"A Practice Scenario Defined"**. The main content sits inside a white rounded card (`#FDFCF5`, 12px radius, subtle border `rgba(0,0,0,0.1)`) that is 704px wide and 817px tall with 40px top padding and 40px horizontal padding.

Inside the card:
- **Scenario title** in Fraunces SemiBold 24px
- **Badge bar** — four pill badges: "Beginner" (green, `#CDEDA3` bg), "Professional", "Visual Design", "Interview" (all neutral `#EFF2E3` bg)
- **Purpose text** — two paragraphs in Inter Regular 20px describing the scenario
- **Horizontal separator** (subtle line)
- **"Sample Questions:"** section header (Fraunces SemiBold 24px) followed by three bullet-list items
- **"Topics Covered:"** section header (Fraunces SemiBold 24px) followed by three neutral pill badges: "User Research", "Design Problem Definition", "Portfolio Review"

---

## Component Structure

```
Stage Container (full-page flex column, gap 40px, pt 80px, rounded-2)
├── Breadcrumb                            (node 38:4139 — see breadcrumb-design-context.md)
├── Header 1                             (704px wide, py 2px)
│   └── "A Practice Scenario Defined"    (Fraunces SemiBold 28px, #33362E)
└── Scenario Info Container              (white card, 704×817px, rounded-12, border)
    ├── Scenario Title                   (Fraunces SemiBold 24px, #282B24, 482px wide)
    │   └── "UX Research & Design Interview"
    ├── Badge Bar (metadata)             (flex row, gap 10px, px 10px, py 4px)
    │   ├── Badge: "Beginner"           (green pill, bg #CDEDA3, 93px wide, 29px tall)
    │   ├── Badge: "Professional"       (neutral pill, bg #EFF2E3, 113px wide)
    │   ├── Badge: "Visual Design"      (neutral pill, bg #EFF2E3)
    │   └── Badge: "Interview"          (neutral pill, bg #EFF2E3)
    ├── Purpose (body text)             (flex column, gap 36px, Inter Regular 20px)
    │   ├── "Practice explaining your UX research process and design decisions..."
    │   └── "Ideal for building communication skills..."
    ├── Separator                        (full-width horizontal line, py 30px)
    ├── Section: "Sample Questions:"    (Fraunces SemiBold 24px, #33362E)
    ├── Question list                   (bullet list, Inter Regular 20px, gap 20px)
    │   ├── "Walk me through your research methodology."
    │   ├── "How did you validate that [this] was actually a problem..."
    │   └── "Describe a challenging project you worked."
    ├── Section: "Topics Covered:"      (Fraunces SemiBold 24px, #282B24)
    └── Topics Badge Bar               (flex row, gap 10px)
        ├── Badge: "User Research"      (neutral pill, bg #E1E4D5, Inter Regular 16px)
        ├── Badge: "Design Problem Definition"
        └── Badge: "Portfolio Review"
```

---

## Design Tokens

### Typography

| Element | Figma Value | Token |
|---|---|---|
| Page heading | Fraunces SemiBold 28px, `fontVariationSettings: 'SOFT' 0, 'WONK' 1` | `heading.2xl` approx |
| Card title | Fraunces SemiBold 24px, same variation settings | `heading.xl` |
| Section headers ("Sample Questions", "Topics Covered") | Fraunces SemiBold 24px | `heading.xl` |
| Purpose / body text | Inter Regular 20px, lineHeight 100% | `Dsktp/Inter/BodyP/Regular/20` |
| Badge text (metadata) | Inter Regular 14px, lineHeight 100% | `Dsktp/Mobile/Inter/Button/Regular/14` |
| Badge text (topics) | Inter Regular 16px | `Dsktp/Inter/Link/Regular/16` |

### Colors

| Element | Figma Value | Semantic Token |
|---|---|---|
| Page heading text | `#33362E` (`--dark-surfacecontainerhighest`) | `surface.container.highest` (dark) / `onSurface` |
| Card title text | `#282B24` (`--dark-surfacecontainerhigh`) | `surface.container.high` (dark) |
| Body / purpose text | `#1E201A` (`--dark-surfacecontainer`) | `surface.container` (dark) / `fg.default` |
| Muted text | `#4A4A4A` (Black/Neutral/30%/500) | `fg.subtle` |
| Card background | `#FDFCF5` (`--neutral/99`) | `neutral.1` |
| Card border | `rgba(0,0,0,0.1)` | No direct token — use `border` with opacity |
| Shell background | `#FDFCF5` (beige/warm off-white) | `canvas` |
| Beginner badge bg | `#CDEDA3` (`--primarycontainer`) | `inversePrimary` / `m3Primary.container` |
| Beginner badge text | `#2C2A27` | `fg.default` |
| Metadata badge bg | `#EFF2E3` (`--neutralvariant/95`) | `surface.container.low` / `neutral.2` |
| Topics badge bg | `#E1E4D5` (`--neutralvariant/90`) | `surface.container.highest` |
| Topics badge text | `#2C2A27` | `fg.default` |

### Spacing & Layout

| Element | Value | Token |
|---|---|---|
| Page top padding | 80px | `pt-20` |
| Page gap (heading → card) | 40px | `gap-10` |
| Card width | 704px | Fixed |
| Card height | 817px | Fixed (or `min-h`) |
| Card top padding | 40px | `pt-10` |
| Card horizontal padding | 40px | `px-10` |
| Card border radius | 12px | `l3` approx (or custom) |
| Card border width | 2px | `borderWidth: '2px'` |
| Card internal gap | 25px | `gap-6` |
| Header container width | 704px, py 2px | — |
| Header text width | 620.793px | ~88% of container |
| Card title width | 482px | ~68% of card |
| Badge bar padding | px 10px, py 4px | `px-2.5 py-1` |
| Beginner badge dimensions | 93px wide × 29px tall, px 11px py 8px | pill |
| Metadata badge dimensions | 113px wide × 30px tall, px 16px py 4px | pill |
| Topics badge padding | px 16px py 6px | pill |
| Purpose section gap | 36px between paragraphs | `gap-9` |
| Sample questions gap | 20px between items | `gap-5` |
| Bullet list indent | 30px (`ms-[30px]`) | `pl-8` |
| Separator vertical padding | 30px top + 30px bottom | `py-8` |

---

## Badge Variants

| Badge | Background | Text Color | Font | Pill |
|---|---|---|---|---|
| Beginner (difficulty) | `#CDEDA3` (`m3Primary.container`) | `#2C2A27` | Inter Regular 14px | Fully rounded |
| Professional (context) | `#EFF2E3` (`neutral.2`) | `#2E2E2E` | Inter Regular 14px | Fully rounded |
| Visual Design / Interview | `#EFF2E3` (`neutral.2`) | `#4A4A4A` | Inter Regular 14px | Fully rounded |
| User Research (topic) | `#E1E4D5` (`surface.container.highest`) | `#2C2A27` | Inter Regular 16px | Fully rounded |
| Design Problem Definition | `#E1E4D5` | `#2C2A27` | Inter Regular 16px | Fully rounded |
| Portfolio Review | `#E1E4D5` | `#2C2A27` | Inter Regular 16px | Fully rounded |

The "Beginner" badge uses the `inversePrimary` / `m3Primary.container` token (light green) to signal difficulty level — this matches the existing `currentlyBadge` pattern in ScenarioSettings.

---

## Separator

The separator is a full-width horizontal line. Per Figma's component documentation it references `shadcn/ui Separator`. In this DDS it maps to a plain `<hr>` or a `<div>` with `borderTopWidth: '1px'`, `borderColor: 'border'`, full width.

---

## DDS Mapping

| Figma Element | DDS Component | Notes |
|---|---|---|
| Breadcrumb bar | `<Breadcrumb.*>` | See `breadcrumb-design-context.md` |
| Page heading | `<Header>` | `as="h1"`, Fraunces font |
| Scenario Info Container | `<Card>` or plain `<div>` | White card with border |
| Scenario title | `<Header>` | `as="h2"`, Fraunces 24px |
| Difficulty badge ("Beginner") | `<Badge>` | Green variant using `inversePrimary` bg |
| Metadata badges ("Professional" etc.) | `<Badge>` | Neutral variant using `neutral.2` bg |
| Topics badges | `<Badge>` | Subtle variant using `surface.container.highest` bg |
| Purpose text paragraphs | `<p>` / typography tokens | Inter Regular 20px |
| Separator | `<hr>` or `<Box borderTop>` | `border.color` token |
| Section headers | `<Header>` | `as="h3"`, Fraunces 24px |
| Sample question bullets | `<ul>` / `<li>` | `list-disc`, pl-8 |

---

## Image Assets

| Asset | Type | Usage |
|---|---|---|
| `http://localhost:3845/assets/e38b0d08e188b95569c7e2d505f0859cc74d85b5.svg` | SVG | Separator horizontal line |

---

## Notes

- **Fraunces font** is a variable font with `SOFT` and `WONK` axes. Apply `fontVariationSettings: "'SOFT' 0, 'WONK' 1"` on all Fraunces headings.
- The card is a fixed `704×817px` in Figma but should be `w-full max-w-[704px]` with `min-h` in a responsive implementation.
- The "Beginner" badge uses a distinct green background (`#CDEDA3`) to visually separate difficulty from other metadata badges — this is intentional and important.
- The `[this]` text in the second sample question uses italic/regular styling differentiation in Figma — the word "this" is in regular weight inside an otherwise normal sentence.
- Topics badges (bottom section) use a slightly darker neutral (`#E1E4D5`) vs metadata badges (`#EFF2E3`) — the darker tone distinguishes topic tags from metadata tags.
- The second badge bar row (`38:4180`) is empty in this Figma snapshot — it may be a placeholder for overflow topics.
