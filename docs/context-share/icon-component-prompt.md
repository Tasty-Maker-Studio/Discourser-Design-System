# Icon Component Creation Prompt
# Target: Claude Code in Discourser-Design-System repo

---

## Task

Create 17 new icon components in the DDS, add them all to the Icons story gallery, add each one to the index, and create a Figma Code Connect file for each.

---

## Reference Pattern

Before writing any code, read these files to understand the exact pattern to follow:

- `src/components/Icons/AccountIcon.tsx` — icon component pattern
- `src/components/Icons/DiscourserLogo.figma.tsx` — Code Connect file pattern
- `stories/Icons.stories.tsx` — existing story to extend (Gallery story)
- `src/components/Icons/index.ts` — barrel export to extend

**Component pattern summary:**
```typescript
import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type {ComponentName}Props = ComponentProps<typeof StyledSvg>;

export const {ComponentName} = (props: {ComponentName}Props) => (
  <StyledSvg
    viewBox="{viewBox from SVG}"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    {/* paths here */}
  </StyledSvg>
);
```

**⚠️ CRITICAL — currentColor rule:**
Every SVG has hardcoded color values (`#6B7A1F`, `#518500`, `#FFFDFA`, `#F2F2F2`, `#D9E57A`, etc.). These MUST ALL be replaced with `currentColor` so icons inherit color from their parent via the token system. No hardcoded color values anywhere in any component.

- `stroke="#6B7A1F"` → `stroke="currentColor"`
- `fill="#6B7A1F"` → `fill="currentColor"`
- `stroke="#FFFDFA"` → `stroke="currentColor"`
- `fill="#FFFDFA"` → `fill="currentColor"`
- Any other hardcoded hex → `currentColor`

For icons that use BOTH `fill` and `stroke` on the same path (mixed rendering), use `fill="currentColor"` where fill is the primary visual and `stroke="none"`, or `stroke="currentColor"` and `fill="none"` — match the visual intent of the original. When in doubt, prefer `stroke="currentColor"` with `fill="none"` as that matches the majority of existing icons.

**Code Connect pattern:**
```typescript
import figma from '@figma/code-connect';
import { {ComponentName} } from './{ComponentName}';

figma.connect(
  {ComponentName},
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id={NODE_ID}',
  {
    example: () => <{ComponentName} />,
  },
);
```

---

## Icons to Create

All SVG source files are in `docs/context-share/icons/`. Create each component in `src/components/Icons/`.

| SVG File | Component Name | viewBox | Node ID |
|----------|---------------|---------|---------|
| `Timer.svg` | `TimerIcon` | `0 0 35 39` | `38-9817` |
| `ClipBoard.svg` | `ClipBoardIcon` | `0 0 40 39` | `38-9804` |
| `Microphone.svg` | `MicrophoneIcon` | `0 0 40 45` | `38-9821` |
| `Audience.svg` | `AudienceIcon` | `0 0 40 44` | `38-9825` |
| `Record.svg` | `RecordIcon` | `0 0 36 39` | `38-9843` |
| `NotebookPen.svg` | `NotebookPenIcon` | `0 0 42 42` | `38-9871` |
| `Sparkles.svg` | `SparklesIcon` | `0 0 24 27` | `38-9872` |
| `ScrollText.svg` | `ScrollTextIcon` | `0 0 42 42` | `38-9873` |
| `RepeatQuestion.svg` | `RepeatQuestionIcon` | `0 0 64 63` | `38-9863` |
| `ExitStudio.svg` | `ExitStudioIcon` | `0 0 64 64` | `38-9853` |
| `PausePlay.svg` | `PausePlayIcon` | `0 0 64 64` | `38-9849` |
| `StopPlay.svg` | `StopPlayIcon` | `0 0 64 64` | `38-9857` |
| `BookmarkPlus.svg` | `BookmarkPlusIcon` | `0 0 42 42` | `38-9870` |
| `AudioSpeaker.svg` | `AudioSpeakerIcon` | `0 0 40 28` | `38-9812` |
| `UserProfile.svg` | `UserProfileIcon` | `0 0 42 42` | `38-9874` |
| `Play.svg` | `PlayIcon` | `0 0 63 63` | `38-9861` |
| `Speech.svg` | `SpeechIcon` | `0 0 60 60` | `618-5193` |

---

## Files to CREATE (per icon — 17 × 2 = 34 files)

For each icon in the table above:

1. `src/components/Icons/{ComponentName}.tsx` — the component
2. `src/components/Icons/{ComponentName}.figma.tsx` — the Code Connect file

---

## Files to UPDATE (2 files)

### 1. `src/components/Icons/index.ts`
Add an export for every new component:
```typescript
export { TimerIcon, type TimerIconProps } from './TimerIcon';
export { ClipBoardIcon, type ClipBoardIconProps } from './ClipBoardIcon';
// ... all 17
```

### 2. `stories/Icons.stories.tsx`
- Add an import for every new component at the top
- Add every new icon to the existing `Gallery` story's `HStack` — same pattern as existing icons:
```tsx
<VStack gap="2" alignItems="center">
  <TimerIcon w="6" h="6" color="fg.default" />
  <span className={label}>TimerIcon</span>
</VStack>
```

---

## Special Notes Per Icon

**StopPlay** — has a `<rect>` element with `fill="#FFFDFA"`. Replace with `fill="currentColor"`. Keep the `rx="8"` attribute.

**ExitStudio** — has a `<circle>` element with `stroke="#FFFDFA"`. Replace with `stroke="currentColor"` and `fill="none"`.

**PausePlay** — has a `<circle>` with `stroke="#FFFDFA"`. Replace with `stroke="currentColor"` and `fill="none"`.

**Play** — has a `<circle>` outline and triangle path, both `stroke="white"`. Replace both with `stroke="currentColor"` and `fill="none"`.

**Audience** — uses `fill="#6B7A1F"` (not stroke) on all paths. Replace with `fill="currentColor"`. Remove any `stroke` attributes if present. Set top-level `fill` prop to `"currentColor"` instead of `"none"` for this component only.

**ClipBoard** — has two different hardcoded stroke colors (`#6B7A1F` and `#54643F`) on different paths. Replace both with `currentColor` — they should unify to a single color when tokenized.

**RepeatQuestion** — uses `stroke="#F2F2F2"`. Replace with `currentColor`.

**Speech** — uses `stroke="#D9E57A"`. Replace with `currentColor`.

---

## Quality Gate

After creating all files, verify:
- `pnpm type-check` — 0 errors
- `pnpm build` — builds cleanly
- No hardcoded hex color values remain in any new component file (grep check: `grep -r "#[0-9A-Fa-f]" src/components/Icons/` should return no new files)
