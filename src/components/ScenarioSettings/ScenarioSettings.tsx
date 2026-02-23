'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import * as Accordion from '../Accordion';
import * as Dialog from '../Dialog';
import * as RadioGroup from '../RadioGroup';
import { Button } from '../Button';
import { scenarioSettings } from 'styled-system/recipes';
import type {
  ScenarioSettingsProps,
  AdjustableSectionId,
  DurationValue,
  QuestionCountValue,
} from './types';

// ── Static section data ────────────────────────────────────────────────────────

const INFO_SECTIONS = [
  {
    id: 'conversation-flow' as AdjustableSectionId,
    label: 'Conversation Flow',
    explanation: {
      beginner: 'Topic transitions are explicit and signposted',
      intermediate: 'Conversation flows organically with realistic tangents',
      advanced: 'Topic shifts are sudden and unpredictable',
    },
  },
  {
    id: 'question-complexity' as AdjustableSectionId,
    label: 'Question Complexity',
    explanation: {
      beginner: 'Questions focus on single, clear topics',
      intermediate: 'Questions are layered with multiple components',
      advanced: 'Questions are complex and multi-dimensional',
    },
  },
  {
    id: 'discourse-tone' as AdjustableSectionId,
    label: 'Discourse Tone',
    explanation: {
      beginner: 'AI is warm, encouraging, and supportive',
      intermediate: 'AI is professional, neutral, and balanced',
      advanced: 'AI is direct, skeptical, and challenging',
    },
  },
  {
    id: 'response-pacing' as AdjustableSectionId,
    label: 'Response Pacing',
    explanation: {
      beginner: 'Long pauses welcomed, relaxed timing',
      intermediate: 'Natural conversational rhythm and pacing',
      advanced: 'Quick responses expected, minimal pauses',
    },
  },
] as const;

const DURATION_OPTIONS = [
  { value: 'quick', label: 'Quick (10 - 15 min)', badgeLabel: '~ (10-15 min)' },
  {
    value: 'standard',
    label: 'Standard (15 - 25 min)',
    badgeLabel: '~ (15-25 min)',
  },
  {
    value: 'extended',
    label: 'Extended (25 - 35 min)',
    badgeLabel: '~ (25-35 min)',
  },
] as const;

const QUESTION_OPTIONS = [
  { value: 'brief', label: 'Brief (2-4)', badgeLabel: '2-4 questions' },
  { value: 'standard', label: 'Standard (5-8)', badgeLabel: '5-8 questions' },
  { value: 'extended', label: 'Extended (9-12)', badgeLabel: '9-12 questions' },
] as const;

const ALL_SECTION_IDS = [
  'conversation-flow',
  'question-complexity',
  'discourse-tone',
  'response-pacing',
  'duration',
  'number-of-questions',
];

// ── Component ─────────────────────────────────────────────────────────────────

export function ScenarioSettings({
  defaultValue,
  singleOpen = false,
  adjustmentDialogContent,
  renderAdjustmentDialog,
  defaultDuration = 'quick',
  defaultQuestionCount = 'brief',
  onSelectionChange,
}: ScenarioSettingsProps) {
  const styles = scenarioSettings();

  const resolvedDefaultValue =
    defaultValue ?? (singleOpen ? ['conversation-flow'] : ALL_SECTION_IDS);

  const [duration, setDuration] = useState<DurationValue>(defaultDuration);
  const [questionCount, setQuestionCount] =
    useState<QuestionCountValue>(defaultQuestionCount);

  const durationBadge =
    DURATION_OPTIONS.find((o) => o.value === duration)?.badgeLabel ??
    '~ (10-15 min)';
  const questionBadge =
    QUESTION_OPTIONS.find((o) => o.value === questionCount)?.badgeLabel ??
    '2-4 questions';

  function resolveDialogContent(sectionId: AdjustableSectionId): ReactNode {
    if (renderAdjustmentDialog) return renderAdjustmentDialog(sectionId);
    if (adjustmentDialogContent?.[sectionId])
      return adjustmentDialogContent[sectionId];
    return null;
  }

  return (
    <div className={styles.root}>
      <Accordion.Root
        defaultValue={resolvedDefaultValue}
        collapsible
        variant="plain"
      >
        {/* ── Sections 1-4: Info + Adjustments ───────────────────────────────── */}
        {INFO_SECTIONS.map((section) => {
          const dialogContent = resolveDialogContent(section.id);
          return (
            <Accordion.Item
              key={section.id}
              value={section.id}
              className={styles.section}
            >
              <Accordion.ItemTrigger
                className={styles.sectionTrigger}
                css={{
                  fontSize: 'lg',
                  fontWeight: 'medium',
                  borderRadius: '0',
                  py: '4',
                  bg: 'surface',
                  color: 'onSurface',
                }}
              >
                <span className={styles.triggerLabel}>{section.label}</span>
                <Accordion.ItemIndicator
                  className={styles.sectionIndicator}
                  css={{ color: 'primary.7' }}
                />
              </Accordion.ItemTrigger>

              <Accordion.ItemContent className={styles.sectionContent}>
                <div className={styles.infoPanel}>
                  <div className={styles.explanationCard}>
                    <p className={styles.explanationTitle}>What this means:</p>
                    <ul className={styles.explanationList}>
                      <li className={styles.explanationItem}>
                        <span className={styles.levelLabel}>Beginner:</span>{' '}
                        {section.explanation.beginner}
                      </li>
                      <li className={styles.explanationItem}>
                        <span className={styles.levelLabel}>Intermediate:</span>{' '}
                        {section.explanation.intermediate}
                      </li>
                      <li className={styles.explanationItem}>
                        <span className={styles.levelLabel}>Advanced:</span>{' '}
                        {section.explanation.advanced}
                      </li>
                    </ul>
                  </div>

                  <div className={styles.adjustmentsRow}>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <Button
                          size="sm"
                          aria-label={`Open ${section.label} adjustments`}
                          css={{
                            bg: 'secondary.7',
                            color: 'white',
                            fontWeight: 'medium',
                            fontSize: 'md',
                            borderRadius: 'l3',
                            px: '4',
                            h: '10',
                            minW: '36',
                            _hover: { bg: 'secondary.8' },
                          }}
                        >
                          Adjustments
                        </Button>
                      </Dialog.Trigger>

                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content css={{ maxW: 'lg', w: 'full' }}>
                          <Dialog.Header
                            css={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              pb: '3',
                            }}
                          >
                            <Dialog.Title
                              css={{ fontSize: 'xl', fontWeight: 'semibold' }}
                            >
                              Adjust {section.label}
                            </Dialog.Title>
                            <Dialog.CloseTrigger
                              aria-label="Close dialog"
                              css={{
                                cursor: 'pointer',
                                fontSize: 'lg',
                                color: 'fg.muted',
                                _hover: { color: 'fg.default' },
                              }}
                            >
                              ✕
                            </Dialog.CloseTrigger>
                          </Dialog.Header>

                          <Dialog.Body>
                            {dialogContent ?? (
                              <p>
                                Adjustment controls for {section.label} will
                                appear here.
                              </p>
                            )}
                          </Dialog.Body>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Dialog.Root>
                  </div>
                </div>
              </Accordion.ItemContent>
            </Accordion.Item>
          );
        })}

        {/* ── Section 5: Duration ─────────────────────────────────────────────── */}
        <Accordion.Item value="duration" className={styles.section}>
          <Accordion.ItemTrigger
            className={styles.sectionTrigger}
            css={{
              fontSize: 'lg',
              fontWeight: 'medium',
              borderRadius: '0',
              py: '4',
              bg: 'surface',
              color: 'onSurface',
            }}
          >
            <span className={styles.triggerLabel}>Duration</span>
            <Accordion.ItemIndicator
              className={styles.sectionIndicator}
              css={{ color: 'primary.7' }}
            />
          </Accordion.ItemTrigger>

          <Accordion.ItemContent className={styles.sectionContent}>
            <div className={styles.radioPanel}>
              <div>
                <p className={styles.radioPanelTitle}>
                  Expected time to complete
                </p>
                <div className={styles.radioCurrentRow}>
                  <span className={styles.radioCurrentLabel}>Currently:</span>
                  <span className={styles.currentlyBadge}>{durationBadge}</span>
                </div>
              </div>

              <RadioGroup.Root
                defaultValue={defaultDuration}
                colorPalette="primary"
                onValueChange={({ value }) => {
                  if (!value) return;
                  setDuration(value as DurationValue);
                  onSelectionChange?.('duration', value);
                }}
                css={{ gap: '3' }}
              >
                {DURATION_OPTIONS.map((option) => (
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

        {/* ── Section 6: Number of Questions ──────────────────────────────────── */}
        <Accordion.Item value="number-of-questions" className={styles.section}>
          <Accordion.ItemTrigger
            className={styles.sectionTrigger}
            css={{
              fontSize: 'lg',
              fontWeight: 'medium',
              borderRadius: '0',
              py: '4',
              bg: 'surface',
              color: 'onSurface',
            }}
          >
            <span className={styles.triggerLabel}>Number of Questions</span>
            <Accordion.ItemIndicator
              className={styles.sectionIndicator}
              css={{ color: 'primary.7' }}
            />
          </Accordion.ItemTrigger>

          <Accordion.ItemContent className={styles.sectionContent}>
            <div className={styles.radioPanel}>
              <div>
                <p className={styles.radioPanelTitle}>
                  Follow up Questions in this session
                </p>
                <div className={styles.radioCurrentRow}>
                  <span className={styles.radioCurrentLabel}>Currently:</span>
                  <span className={styles.currentlyBadge}>{questionBadge}</span>
                </div>
              </div>

              <RadioGroup.Root
                defaultValue={defaultQuestionCount}
                colorPalette="primary"
                onValueChange={({ value }) => {
                  if (!value) return;
                  setQuestionCount(value as QuestionCountValue);
                  onSelectionChange?.('number-of-questions', value);
                }}
                css={{ gap: '3' }}
              >
                {QUESTION_OPTIONS.map((option) => (
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
      </Accordion.Root>
    </div>
  );
}
