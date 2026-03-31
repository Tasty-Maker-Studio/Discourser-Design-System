'use client';

import { useState } from 'react';
import * as Accordion from '../Accordion';
import * as RadioGroup from '../RadioGroup';
import * as Switch from '../Switch';
import * as Slider from '../Slider';
import { ScenarioIcon } from '../Icons/ScenarioIcon';
import { AudioSpeakerIcon } from '../Icons/AudioSpeakerIcon';
import { MicrophoneIcon } from '../Icons/MicrophoneIcon';
import { RecordIcon } from '../Icons/RecordIcon';
import { TimerIcon } from '../Icons/TimerIcon';
import { AudienceIcon } from '../Icons/AudienceIcon';
import { studioControls } from 'styled-system/recipes';
import { Badge } from '../Badge';
import type { StudioControlsProps, RecordingMode } from './types';

// ── Static section data ────────────────────────────────────────────────────────

const SETTING_BADGES = [
  { id: 'conversation-flow', label: 'Conversation Flow' },
  { id: 'question-complexity', label: 'Question Complexity' },
  { id: 'response-pacing', label: 'Response Pacing' },
  { id: 'interview-tone', label: 'Interview Tone' },
] as const;

const RECORDING_OPTIONS = [
  { value: 'no-recording', label: 'No Recording' },
  { value: 'audio-only', label: 'Record just audio' },
  { value: 'video-audio', label: 'Record video & audio' },
] as const;

const LEVEL_COLOR_PALETTE = {
  beginner: 'primary',
  intermediate: 'secondary',
  advanced: 'tertiary',
} as const;

const ALL_SECTION_IDS = [
  'scenario-settings',
  'audio-output',
  'mic-input',
  'av-recording',
  'display-timer',
  'hide-interviewers',
];

// ── Component ─────────────────────────────────────────────────────────────────

export function StudioControls({
  scenarioName,
  scenarioFocus,
  scenarioLevel,
  defaultAudioLevel = 75,
  defaultMicLevel = 75,
  defaultRecordingMode = 'no-recording',
  defaultShowTimer = true,
  defaultHideInterviewers = false,
  onAudioLevelChange,
  onMicLevelChange,
  onRecordingModeChange,
  onTimerChange,
  onInterviewersChange,
}: StudioControlsProps) {
  const styles = studioControls();

  const [audioLevel, setAudioLevel] = useState(defaultAudioLevel);
  const [micLevel, setMicLevel] = useState(defaultMicLevel);

  const levelLabel =
    scenarioLevel.charAt(0).toUpperCase() + scenarioLevel.slice(1);

  return (
    <div className={styles.root}>
      <Accordion.Root defaultValue={ALL_SECTION_IDS} multiple variant="plain">
        {/* ── Section 1: Scenario Settings ─────────────────────────────────── */}
        <Accordion.Item value="scenario-settings" className={styles.section}>
          <Accordion.ItemTrigger
            className={styles.sectionTrigger}
            css={{
              fontSize: 'lg',
              fontWeight: 'medium',
              borderRadius: '0',
              py: '4',
              bg: 'neutral.1',
              color: 'onSurface',
            }}
          >
            <span className={styles.triggerIcon}>
              <ScenarioIcon />
            </span>
            <span className={styles.triggerLabel}>Scenario Settings</span>
            <Accordion.ItemIndicator
              className={styles.sectionIndicator}
              css={{ color: 'primary.7' }}
            />
          </Accordion.ItemTrigger>

          <Accordion.ItemContent className={styles.sectionContent}>
            <div className={styles.infoPanel}>
              <div className={styles.scenarioMeta}>
                <p className={styles.scenarioName}>{scenarioName}</p>
                <p className={styles.scenarioFocus}>
                  <strong>Focus</strong>: {scenarioFocus}
                </p>
              </div>
              <div className={styles.settingsCard}>
                <p className={styles.settingsCardHeading}>Scenario Settings</p>
                <div className={styles.settingsList}>
                  {SETTING_BADGES.map((badge) => (
                    <div key={badge.id} className={styles.settingsRow}>
                      <span className={styles.settingsRowLabel}>
                        {badge.label}:
                      </span>
                      <Badge
                        variant="rating"
                        colorPalette={LEVEL_COLOR_PALETTE[scenarioLevel]}
                        size="md"
                      >
                        {levelLabel}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* ── Section 2: Audio Output ──────────────────────────────────────── */}
        <Accordion.Item value="audio-output" className={styles.section}>
          <Accordion.ItemTrigger
            className={styles.sectionTrigger}
            css={{
              fontSize: 'lg',
              fontWeight: 'medium',
              borderRadius: '0',
              py: '4',
              bg: 'neutral.1',
              color: 'onSurface',
            }}
          >
            <span className={styles.triggerIcon}>
              <AudioSpeakerIcon />
            </span>
            <span className={styles.triggerLabel}>Audio Output</span>
            <Accordion.ItemIndicator
              className={styles.sectionIndicator}
              css={{ color: 'primary.7' }}
            />
          </Accordion.ItemTrigger>

          <Accordion.ItemContent className={styles.sectionContent}>
            <div className={styles.sliderPanel}>
              <div className={styles.sliderLabel}>
                <span className={styles.sliderLabelText}>Volume</span>
                <span className={styles.levelBadge}>{audioLevel}%</span>
              </div>
              <Slider.Root
                min={0}
                max={100}
                value={[audioLevel]}
                colorPalette="tertiary"
                onValueChange={({ value }) => {
                  const next = value[0] ?? audioLevel;
                  setAudioLevel(next);
                  onAudioLevelChange?.(next);
                }}
              >
                <Slider.Control className={styles.sliderTrack}>
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumbs />
                </Slider.Control>
              </Slider.Root>
            </div>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* ── Section 3: Microphone Output ─────────────────────────────────── */}
        <Accordion.Item value="mic-input" className={styles.section}>
          <Accordion.ItemTrigger
            className={styles.sectionTrigger}
            css={{
              fontSize: 'lg',
              fontWeight: 'medium',
              borderRadius: '0',
              py: '4',
              bg: 'neutral.1',
              color: 'onSurface',
            }}
          >
            <span className={styles.triggerIcon}>
              <MicrophoneIcon />
            </span>
            <span className={styles.triggerLabel}>Microphone Input</span>
            <Accordion.ItemIndicator
              className={styles.sectionIndicator}
              css={{ color: 'primary.7' }}
            />
          </Accordion.ItemTrigger>

          <Accordion.ItemContent className={styles.sectionContent}>
            <div className={styles.sliderPanel}>
              <div className={styles.sliderLabel}>
                <span className={styles.sliderLabelText}>Mic Gain</span>
                <span className={styles.levelBadge}>{micLevel}%</span>
              </div>
              <Slider.Root
                min={0}
                max={100}
                value={[micLevel]}
                colorPalette="tertiary"
                onValueChange={({ value }) => {
                  const next = value[0] ?? micLevel;
                  setMicLevel(next);
                  onMicLevelChange?.(next);
                }}
              >
                <Slider.Control className={styles.sliderTrack}>
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumbs />
                </Slider.Control>
              </Slider.Root>
            </div>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* ── Section 4: A/V Recording ─────────────────────────────────────── */}
        <Accordion.Item value="av-recording" className={styles.section}>
          <Accordion.ItemTrigger
            className={styles.sectionTrigger}
            css={{
              fontSize: 'lg',
              fontWeight: 'medium',
              borderRadius: '0',
              py: '4',
              bg: 'neutral.1',
              color: 'onSurface',
            }}
          >
            <span className={styles.triggerIcon}>
              <RecordIcon />
            </span>
            <span className={styles.triggerLabel}>A/V Recording</span>
            <Accordion.ItemIndicator
              className={styles.sectionIndicator}
              css={{ color: 'primary.7' }}
            />
          </Accordion.ItemTrigger>

          <Accordion.ItemContent className={styles.sectionContent}>
            <div className={styles.radioPanel}>
              <RadioGroup.Root
                defaultValue={defaultRecordingMode}
                colorPalette="primary"
                onValueChange={({ value }) => {
                  if (!value) return;
                  onRecordingModeChange?.(value as RecordingMode);
                }}
                css={{ gap: '3' }}
              >
                {RECORDING_OPTIONS.map((option) => (
                  <RadioGroup.Item key={option.value} value={option.value}>
                    <RadioGroup.ItemControl
                      css={{
                        boxShadow: 'none',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'primary.7',
                        _checked: {
                          bg: 'm3Primary.container',
                          borderColor: 'primary.7',
                          _after: { bg: 'primary.7' },
                        },
                      }}
                    />
                    <RadioGroup.ItemText
                      css={{ fontSize: 'md', fontWeight: 'medium' }}
                    >
                      {option.label}
                    </RadioGroup.ItemText>
                    <RadioGroup.ItemHiddenInput />
                  </RadioGroup.Item>
                ))}
              </RadioGroup.Root>
            </div>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* ── Section 5: Display Timer ──────────────────────────────────────── */}
        <Accordion.Item value="display-timer" className={styles.section}>
          <Accordion.ItemTrigger
            className={styles.sectionTrigger}
            css={{
              fontSize: 'lg',
              fontWeight: 'medium',
              borderRadius: '0',
              py: '4',
              bg: 'neutral.1',
              color: 'onSurface',
            }}
          >
            <span className={styles.triggerIcon}>
              <TimerIcon />
            </span>
            <span className={styles.triggerLabel}>Display Timer</span>
            <Accordion.ItemIndicator
              className={styles.sectionIndicator}
              css={{ color: 'primary.7' }}
            />
          </Accordion.ItemTrigger>

          <Accordion.ItemContent className={styles.sectionContent}>
            <div className={styles.togglePanel}>
              <p className={styles.toggleDescription}>
                Hide timer to create more realistic interview
              </p>
              <Switch.Root
                colorPalette="primary"
                defaultChecked={defaultShowTimer}
                onCheckedChange={({ checked }) => {
                  onTimerChange?.(checked);
                }}
              >
                <Switch.Control />
                <Switch.HiddenInput />
              </Switch.Root>
            </div>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* ── Section 6: Hide Interviewers ─────────────────────────────────── */}
        <Accordion.Item value="hide-interviewers" className={styles.section}>
          <Accordion.ItemTrigger
            className={styles.sectionTrigger}
            css={{
              fontSize: 'lg',
              fontWeight: 'medium',
              borderRadius: '0',
              py: '4',
              bg: 'neutral.1',
              color: 'onSurface',
            }}
          >
            <span className={styles.triggerIcon}>
              <AudienceIcon />
            </span>
            <span className={styles.triggerLabel}>Hide Interviewers</span>
            <Accordion.ItemIndicator
              className={styles.sectionIndicator}
              css={{ color: 'primary.7' }}
            />
          </Accordion.ItemTrigger>

          <Accordion.ItemContent className={styles.sectionContent}>
            <div className={styles.togglePanel}>
              <p className={styles.toggleDescription}>
                Switch off to hide video of interviewers if it is too
                distracting
              </p>
              <Switch.Root
                colorPalette="primary"
                defaultChecked={defaultHideInterviewers}
                onCheckedChange={({ checked }) => {
                  onInterviewersChange?.(checked);
                }}
              >
                <Switch.Control />
                <Switch.HiddenInput />
              </Switch.Root>
            </div>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}
