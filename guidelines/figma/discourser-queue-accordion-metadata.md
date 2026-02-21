# Discourser Queue Right Accordion — Figma Metadata

**Figma URL:** https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-4186&m=dev

## Node Info

| Field   | Value                              |
| ------- | ---------------------------------- |
| Node ID | `38:4186`                          |
| Name    | `Discourser Queue Right Accordion` |
| Type    | Instance                           |
| X       | 0                                  |
| Y       | 113                                |
| Width   | 343px                              |
| Height  | 2370px                             |

## Accordion Sections

The component is composed of **6 accordion items**, each with a trigger header and a collapsible panel body.

| #   | Item Name (Figma)                             | Panel Label         | Node ID             |
| --- | --------------------------------------------- | ------------------- | ------------------- |
| 1   | Discourse Accordion Item (Info Panel)         | Conversation Flow   | `I38:4186;943:4448` |
| 2   | Discourse Accordion Item (Audio Output Panel) | Question Complexity | `I38:4186;943:4449` |
| 3   | Discourse Accordion Item (EQ & Slider)        | Discourse Tone      | `I38:4186;943:4450` |
| 4   | Discourse Accordion Item (A/V Record)         | Response Pacing     | `I38:4186;943:4451` |
| 5   | Discourse Accordion Item (Show Timer)         | Duration            | `I38:4186;943:4452` |
| 6   | Discourse Accordion Item (Hide Interview)     | Number of Questions | `I38:4186;943:4453` |

## Panel Content Summary

### 1. Conversation Flow

- Attribute definition card with "What this means:" heading
- 3 bullet points: Beginner / Intermediate / Advanced descriptions
- "Adjustments" button (secondary/50 green)

### 2. Question Complexity

- Attribute definition card with "What this means:" heading
- 3 bullet points: Beginner / Intermediate / Advanced
- "Adjustments" button

### 3. Discourse Tone

- Attribute definition card with "What this means:" heading
- 3 bullet points: Beginner / Intermediate / Advanced
- "Adjustments" button

### 4. Response Pacing

- Attribute definition card with "What this means:" heading
- 3 bullet points: Beginner / Intermediate / Advanced
- "Adjustments" button

### 5. Duration

- "Expected time to complete" label
- "Currently: ~(10–15 min)" badge (dark-primary green pill with clock icon)
- Radio Group: Quick (10–15 min) [selected] / Standard (15–25 min) / Extended (25–35 min)

### 6. Number of Questions

- "Follow up Questions in this session" label
- "Currently: 2-4 questions" badge (dark-primary green pill)
- Radio Group: Brief (2–4) [selected] / Standard (5–8) / Extended (9–12)

## Component References (Figma Docs)

- Accordion items: https://ui.shadcn.com/docs/components/accordion
- Lucide chevron-down icon: https://lucide.dev/icons/
- Radio Group: https://ui.shadcn.com/docs/components/radio-group
