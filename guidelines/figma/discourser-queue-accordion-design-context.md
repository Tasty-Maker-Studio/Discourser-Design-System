# Discourser Queue Right Accordion — Design Context

**Figma URL:** https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-4186&m=dev
**Node:** `38:4186` — `Discourser Queue Right Accordion`
**Dimensions:** 343 × 2370px

---

## Design Tokens Used

| Token                         | Value                           |
| ----------------------------- | ------------------------------- |
| `--surface`                   | `#f9faef`                       |
| `--surfacevariant`            | `#e1e4d5`                       |
| `--neutral/99`                | `#fdfcf5`                       |
| `--dark-surfacecontainerhigh` | `#282b24`                       |
| `--dark-primary`              | `#b1d18a`                       |
| `--secondary/50`              | `#6c7d56`                       |
| `--onprimary`                 | `white`                         |
| `--foreground`                | `#09090b`                       |
| `Primary/700`                 | `#6b7a1f` (radio border)        |
| `Primary/400`                 | `#d9e57a` (radio selected fill) |
| `Black/Neutral/30%/600`       | `#363636`                       |

## Typography Styles

| Style Name                       | Family            | Weight        | Size | Line Height |
| -------------------------------- | ----------------- | ------------- | ---- | ----------- |
| `Dsktp/Inter/BodyP/Medium/20`    | Inter             | 500 Medium    | 20px | normal      |
| `Dsktp/Inter/Button/Medium/18px` | Inter             | 500 Medium    | 18px | normal      |
| `Dsktp/Inter/Button/SemiB`       | Inter             | 600 Semi Bold | 18px | normal      |
| `Dsktp/Inter/Button/Regular/18`  | Inter             | 400 Regular   | 18px | 30px        |
| `Dsktp/Inter/Link/Regular`       | Inter             | 400 Regular   | 16px | normal      |
| `text-xs/leading-none`           | font-sans (Geist) | 400 Regular   | 12px | 1           |

## Shadow Tokens

| Token         | Description                                 |
| ------------- | ------------------------------------------- |
| `shadows/2xs` | Drop shadow — used on "Adjustments" buttons |
| `shadows/xs`  | Drop shadow — used on radio toggle elements |

---

## Component Structure

```
Discourser Queue Right Accordion (column, full-width)
├── AccordionItem: Conversation Flow
│   ├── AccordionTrigger (px-20, py-16, gap-16)
│   │   ├── Label: "Conversation Flow" (Inter/Medium/20, --dark-surfacecontainerhigh)
│   │   └── ChevronDown icon (24×24)
│   └── Panel (bg: --surfacevariant, p-20, gap-20)
│       ├── AttributeDefinition card (bg: --neutral/99, border: --surfacevariant, rounded-8, p-20, h-238)
│       │   ├── Heading: "What this means:" (Inter/Medium/20)
│       │   └── Bullets: Beginner / Intermediate / Advanced (Bold label + Regular body, 16px)
│       └── Button row: "Adjustments" (bg: --secondary/50, rounded-8, w-146, h-39, Inter/Medium/18, color: --onprimary)
│
├── AccordionItem: Question Complexity  [same structure as above]
├── AccordionItem: Discourse Tone       [same structure as above]
├── AccordionItem: Response Pacing      [same structure as above]
│
├── AccordionItem: Duration
│   ├── AccordionTrigger
│   │   ├── Label: "Duration"
│   │   └── ChevronDown icon
│   └── Panel (bg: --neutral/99, p-20, gap-25)
│       ├── "Expected time to complete" section
│       │   ├── Label (Inter/Medium/20, #363636)
│       │   └── "Currently:" row with green pill badge (~10–15 min, clock icon)
│       └── RadioGroup (w-231, gap-12)
│           ├── RadioItem: "Quick (10 - 15 min)"   [selected — filled bg: #d9e57a, border: #6b7a1f]
│           ├── RadioItem: "Standard (15 - 25 min)" [unselected]
│           └── RadioItem: "Extended (25 - 35 min)" [unselected]
│
└── AccordionItem: Number of Questions
    ├── AccordionTrigger
    │   ├── Label: "Number of Questions"
    │   └── ChevronDown icon
    └── Panel (bg: --neutral/99, p-20, gap-27)
        ├── "Follow up Questions in this session" section
        │   ├── Label (Inter/Medium/20, #363636)
        │   └── "Currently:" row with green pill badge (2-4 questions)
        └── RadioGroup (w-216, gap-12)
            ├── RadioItem: "Brief (2-4)"    [selected]
            ├── RadioItem: "Standard (5-8)" [unselected]
            └── RadioItem: "Extended (9-12)" [unselected]
```

---

## Accordion Panel Content Details

### Conversation Flow

- **Beginner:** Topic transitions are explicit and signposted
- **Intermediate:** Conversation flows organically with realistic tangents
- **Advanced:** Topic shifts are sudden and unpredictable

### Question Complexity

- **Beginner:** Questions focus on single, clear topics
- **Intermediate:** Questions are layered with multiple components
- **Advanced:** Questions are complex and multi-dimensional

### Discourse Tone

- **Beginner:** AI is warm, encouraging, and supportive
- **Intermediate:** AI is professional, neutral, and balanced
- **Advanced:** AI is direct, skeptical, and challenging

### Response Pacing

- **Beginner:** Long pauses welcomed, relaxed timing
- **Intermediate:** Natural conversational rhythm and pacing
- **Advanced:** Quick responses expected, minimal pauses

---

## Radio Toggle States

| State      | Background                          | Border                       |
| ---------- | ----------------------------------- | ---------------------------- |
| Selected   | `#d9e57a` (Primary/400) + checkmark | `#6b7a1f` (Primary/700), 1px |
| Unselected | transparent                         | `#6b7a1f` (Primary/700), 1px |

Radio item layout: `gap-12`, toggle `18×18`, label `Inter/Regular/18, line-height: 30px`

---

## Badge / Pill Style ("Currently:" indicator)

```
bg: --dark-primary (#b1d18a)
px: 16px, py: 6–8px
border-radius: 9999px (fully rounded)
font: Geist/Regular/12px, leading-none
color: #2c2a27
```

Duration badge also includes a 16×16 icon (clock).

---

## Raw Figma Design Context Code

```tsx
const imgVector =
  'http://localhost:3845/assets/6383fe4b6816a99190d1897bff33a6447dd3e802.svg';
const imgIcon =
  'http://localhost:3845/assets/da97b2873175467c923ea979b721fd1fed8c68cc.svg';
const imgCheck =
  'http://localhost:3845/assets/186b8e7c8fc18a575b8b56ed32e4d063ff622558.svg';

export default function DiscourserQueueRightAccordion() {
  return (
    <div
      className="content-stretch cursor-pointer flex flex-col items-start relative size-full"
      data-name="Discourser Queue Right Accordion"
      data-node-id="38:4186"
    >
      <button
        className="bg-[var(--surface,#f9faef)] content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center relative shrink-0 w-full"
        data-name="Discourse Accordion Item (Info Panel)"
        data-node-id="I38:4186;943:4448"
      >
        <div
          className="content-stretch flex gap-[var(--p-4,16px)] items-center justify-center px-[20px] py-[var(--p-4,16px)] relative rounded-[6px] shrink-0 w-full"
          data-name="AccordionTrigger"
          data-node-id="I38:4186;943:4448;604:4168"
        >
          <p className="flex-[1_0_0] font-[family-name:var(--font/family/font-sans,'Inter:Medium',sans-serif)] font-[var(--font/weight/font-medium,500)] leading-[normal] min-h-px min-w-px not-italic overflow-hidden relative text-[20px] text-[color:var(--dark-surfacecontainerhigh,#282b24)] text-ellipsis text-left whitespace-nowrap">
            Conversation Flow
          </p>
          <div
            className="overflow-clip relative shrink-0 size-[24px]"
            data-name="Lucide Icons / chevron-down"
          >
            <img
              alt=""
              className="block max-w-none size-full"
              src={imgVector}
            />
          </div>
        </div>
        <div
          className="bg-[var(--surfacevariant,#e1e4d5)] content-stretch flex flex-col gap-[20px] items-start p-[20px] relative shrink-0 w-full"
          data-name="panel- Conversation Flow"
        >
          <div className="bg-[var(--neutral/99,#fdfcf5)] border border-[var(--surfacevariant,#e1e4d5)] border-solid content-stretch flex flex-col gap-[16px] h-[238px] items-start p-[20px] relative rounded-[8px] shrink-0 w-full">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[20px] text-[color:var(--dark-surfacecontainerhigh,#282b24)]">
              What this means:
            </p>
            <ul>
              <li className="list-disc text-[16px]">
                <span className="font-bold">Beginner:</span> Topic transitions
                are explicit and signposted
              </li>
              <li className="list-disc text-[16px]">
                <span className="font-bold">Intermediate:</span> Conversation
                flows organically with realistic tangents
              </li>
              <li className="list-disc text-[16px]">
                <span className="font-bold">Advanced:</span> Topic shifts are
                sudden and unpredictable
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center w-full">
            <button className="bg-[var(--secondary/50,#6c7d56)] flex gap-[8px] h-[39px] items-center justify-center px-[16px] py-[8px] rounded-[8px] w-[146px] text-[18px] text-white font-medium">
              Adjustments
            </button>
          </div>
        </div>
      </button>

      {/* ... remaining accordion items follow the same pattern ... */}

      {/* Duration — with RadioGroup */}
      <button className="bg-[var(--surface,#f9faef)] ...">
        <div className="AccordionTrigger ...">
          <p>Duration</p>
          <ChevronDown />
        </div>
        <div className="panel bg-[var(--neutral/99,#fdfcf5)] ...">
          <div>
            <p>Expected time to complete</p>
            <div className="flex items-center gap-[10px]">
              <span>Currently:</span>
              <div className="bg-[var(--dark-primary,#b1d18a)] px-[16px] py-[6px] rounded-full text-[12px] text-[#2c2a27]">
                <img src={imgIcon} className="size-[16px]" alt="" />~ (10- 15
                min)
              </div>
            </div>
          </div>
          <div className="RadioGroup flex flex-col gap-[12px] w-[231px]">
            <label className="flex gap-[12px] items-center">
              <div className="size-[18px] rounded-full bg-[#d9e57a] border border-[#6b7a1f] relative">
                <img
                  src={imgCheck}
                  className="absolute inset-0 size-[10px] m-auto"
                  alt=""
                />
              </div>
              <span className="text-[18px] leading-[30px]">
                Quick (10 - 15 min)
              </span>
            </label>
            <label className="flex gap-[12px] items-center">
              <div className="size-[18px] rounded-full border border-[#6b7a1f]" />
              <span className="text-[18px] leading-[30px]">
                Standard (15 - 25 min)
              </span>
            </label>
            <label className="flex gap-[12px] items-center">
              <div className="size-[18px] rounded-full border border-[#6b7a1f]" />
              <span className="text-[18px] leading-[30px]">
                Extended (25 - 35 min)
              </span>
            </label>
          </div>
        </div>
      </button>
    </div>
  );
}
```

---

## Implementation Notes

1. Use **Ark UI `Accordion`** primitive — all items expand/collapse independently (multi-expand pattern).
2. The "Adjustments" button should use the existing `button` recipe with a custom `secondary` variant mapping to `--secondary/50`.
3. **Radio Groups** use Ark UI `RadioGroup` primitive. Selected state: `bg: Primary/400 (#d9e57a)` fill + checkmark SVG. Unselected: transparent + `Primary/700 (#6b7a1f)` border.
4. The "Currently:" badges are display-only pill components — not interactive.
5. Attribute definition cards (Conversation Flow, Question Complexity, Discourse Tone, Response Pacing) all share the same layout: `rounded-8, border: --surfacevariant, bg: --neutral/99, p-20`.
6. Panel backgrounds alternate: info panels use `--surfacevariant`; Duration and Number of Questions panels use `--neutral/99` directly.
