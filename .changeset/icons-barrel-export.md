---
'@discourser/design-system': patch
---

Export 17 new icon components from the main package barrel

The new icon components (TimerIcon, ClipBoardIcon, MicrophoneIcon, AudienceIcon, RecordIcon, NotebookPenIcon, SparklesIcon, ScrollTextIcon, RepeatQuestionIcon, ExitStudioIcon, PausePlayIcon, StopPlayIcon, BookmarkPlusIcon, AudioSpeakerIcon, UserProfileIcon, PlayIcon, SpeechIcon) were added in v0.18.0 but were missing from `src/components/index.ts`, making them inaccessible via `import { ... } from '@discourser/design-system'`.
