import type { ReactNode } from 'react'

export type AdjustableSectionId =
  | 'conversation-flow'
  | 'question-complexity'
  | 'discourse-tone'
  | 'response-pacing'

export type RadioSectionId = 'duration' | 'number-of-questions'

export type SectionId = AdjustableSectionId | RadioSectionId

export type DurationValue = 'quick' | 'standard' | 'extended'
export type QuestionCountValue = 'brief' | 'standard' | 'extended'

export interface ExplanationContent {
  beginner: string
  intermediate: string
  advanced: string
}

export interface RadioOption {
  value: string
  label: string
}

export interface ScenarioSettingsProps {
  /**
   * Section IDs that start expanded.
   * Defaults to all six sections, or ['conversation-flow'] when singleOpen is true.
   */
  defaultValue?: string[]

  /**
   * When true, only one accordion section can be open at a time.
   * @default false
   */
  singleOpen?: boolean

  /**
   * ReactNode content to render inside each adjustable section's dialog.
   * Keyed by section ID. Falls back to a placeholder when not provided.
   */
  adjustmentDialogContent?: Partial<Record<AdjustableSectionId, ReactNode>>

  /**
   * Alternative render-function API for dialog content.
   * Takes precedence over adjustmentDialogContent when both are provided.
   */
  renderAdjustmentDialog?: (sectionId: AdjustableSectionId) => ReactNode

  /**
   * Default selected value for the Duration radio group.
   * @default 'quick'
   */
  defaultDuration?: DurationValue

  /**
   * Default selected value for the Number of Questions radio group.
   * @default 'brief'
   */
  defaultQuestionCount?: QuestionCountValue

  /**
   * Called when a radio group selection changes.
   * @param sectionId - 'duration' or 'number-of-questions'
   * @param value - the selected radio value
   */
  onSelectionChange?: (sectionId: RadioSectionId, value: string) => void
}
