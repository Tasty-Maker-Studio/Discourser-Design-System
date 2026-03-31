export type RecordingMode = 'no-recording' | 'audio-only' | 'video-audio';

export interface StudioControlsProps {
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
