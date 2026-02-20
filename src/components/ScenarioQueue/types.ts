import type { ReactNode } from 'react'

// ──────────────────────────────────────────────
// Data Types
// ──────────────────────────────────────────────

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type ScenarioStatus = 'queued' | 'completed' | 'repeat'

export interface Scenario {
  id: string
  title: string
  category: string
  difficulty: Difficulty
  /** Display string, e.g. "10-15 min" */
  duration: string
  status: ScenarioStatus
}

// ──────────────────────────────────────────────
// Difficulty → Badge colorPalette mapping
// ──────────────────────────────────────────────

export const difficultyColorMap: Record<Difficulty, 'primary' | 'secondary' | 'tertiary'> = {
  beginner: 'primary',
  intermediate: 'secondary',
  advanced: 'tertiary',
}

export const difficultyLabel: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

// ──────────────────────────────────────────────
// Component Props
// ──────────────────────────────────────────────

export interface ScenarioQueueProps {
  /** All scenarios — the component splits them by status internally */
  scenarios: Scenario[]

  /** Called when user reorders cards in the "In Queue" tab */
  onReorder?: (reorderedIds: string[]) => void

  /** Called when user toggles a completed scenario back to the queue */
  onRequeue?: (scenarioId: string) => void

  /** Called when user removes a scenario from the queue */
  onRemove?: (scenarioId: string) => void

  /**
   * Render prop / slot for the Add Scenario modal body.
   * The design system provides the Dialog shell; the consumer (discourser.ai)
   * provides the collection content.
   *
   * Receives `onClose` to allow the consumer to close the modal after selection.
   */
  renderAddScenarioContent?: (props: { onClose: () => void }) => ReactNode

  /** Called when user clicks "Browse More Scenarios" link inside the modal */
  onBrowseMore?: () => void

  /** Called when user clicks "Build Custom Scenario" link inside the modal */
  onBuildCustom?: () => void
}

export interface ScenarioCardProps {
  scenario: Scenario
  /** 1-based position number shown in the circle badge */
  position: number
  /** Whether this card is the active (first) scenario */
  isActive: boolean
  /** Show the re-queue switch (used in Completed tab) */
  showRequeueSwitch?: boolean
  /** Called when re-queue switch is toggled */
  onRequeue?: (scenarioId: string) => void
  /** Whether this is a repeat scenario */
  isRepeat?: boolean
  /** Visual state while the card is being dragged (applies opacity) */
  isDragging?: boolean
}
