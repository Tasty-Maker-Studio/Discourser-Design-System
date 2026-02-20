'use client'
import { useSortable } from '@dnd-kit/react/sortable'
import { ScenarioCard } from './ScenarioCard'
import type { Scenario } from './types'

interface ScenarioCardDraggableProps {
  scenario: Scenario
  /** 0-based index in the current list (required by useSortable) */
  index: number
  /** 1-based display position shown in the position badge */
  position: number
  /** Whether this is the active (first) card */
  isActive: boolean
  /** Whether this card was previously completed and re-queued */
  isRepeat?: boolean
}

export function ScenarioCardDraggable({
  scenario,
  index,
  position,
  isActive,
  isRepeat,
}: ScenarioCardDraggableProps) {
  const { ref, handleRef, isDragging } = useSortable({
    id: scenario.id,
    index,
  })

  return (
    <ScenarioCard
      scenario={scenario}
      position={position}
      isActive={isActive}
      isDragging={isDragging}
      isRepeat={isRepeat}
      rootRef={ref}
      handleRef={handleRef}
    />
  )
}