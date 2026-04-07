import type { SystemStyleObject } from 'styled-system/types';

export type RecordingMode = 'no-recording' | 'audio-only' | 'video-audio';

export interface StudioControlsProps {
  /** Override CSS for every accordion trigger label — customize font, size, weight from the consuming app */
  triggerCss?: SystemStyleObject;
  scenarioName: string;
  scenarioFocus: string;
  scenarioLevel: 'beginner' | 'intermediate' | 'advanced';
  defaultAudioLevel?: number;
  defaultMicLevel?: number;
  defaultRecordingMode?: RecordingMode;
  defaultShowTimer?: boolean;
  defaultHideInterviewers?: boolean;
  onAudioLevelChange?: (value: number) => void;
  onMicLevelChange?: (value: number) => void;
  onRecordingModeChange?: (mode: RecordingMode) => void;
  onTimerChange?: (show: boolean) => void;
  onInterviewersChange?: (hide: boolean) => void;
}
