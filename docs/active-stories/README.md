# Active Stories

Story specs for work in progress on the Discourser Design System. Each file is structured as a **self-contained prompt** — paste directly into Claude Code to execute.

## Execution Order

```
STORY-006a → STORY-006b → STORY-006c → STORY-011 → STORY-008
```

| # | File | Description | Estimate | Status |
|---|------|-------------|----------|--------|
| 1 | `STORY-006a-figma-translation-foundations.md` | Translation MDX files 00-04 (overview, colors, typography, spacing, shadows) | 1.5-2hr | Ready |
| 2 | `STORY-006b-figma-translation-components.md` | Translation MDX file 05 (all 25+ component mappings) | 2-3hr | Blocked on 006a |
| 3 | `STORY-006c-figma-translation-layout-extension.md` | Translation MDX files 06-07 (layout patterns, extension guide) | 1.5-2hr | Blocked on 006b |
| 4 | `STORY-011-verify-translation-docs.md` | Automated tests + verification scripts for translation accuracy | 2-3hr | Blocked on 006c |
| 5 | `STORY-008-kai-sidecar-fragments.md` | Extract condensed knowledge fragments for Kai agent | 2-3hr | Blocked on 011; executes in Discourser.ai repo |

## Lifecycle

When a story completes:
1. Move the file to `docs/context-share/` with completion notes appended
2. Update the corresponding Notion story status to Complete
3. Start the next story in sequence

## Parent Epic

**Kai Agent — Design System MCP Integration & Elevation Fix**
[Notion link](https://www.notion.so/3034d6019b428105a147e39a4fdb0a70)
