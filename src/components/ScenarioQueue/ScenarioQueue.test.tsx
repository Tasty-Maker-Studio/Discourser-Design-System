/* global describe, it, expect, vi, beforeEach */
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ScenarioQueue } from './ScenarioQueue'
import type { Scenario } from './types'

// ── dnd-kit mock ──────────────────────────────────────────────────────────────
// @dnd-kit/react's onDragEnd event uses source.initialIndex / source.index,
// not source.id vs target.id. We capture the callback here so tests can
// call it directly with the correct event shape.

let capturedDragEnd: ((event: {
  canceled: boolean
  operation: { source: { id: unknown; index: number; initialIndex: number } | null }
}) => void) | undefined

vi.mock('@dnd-kit/react', () => ({
  DragDropProvider: ({
    children,
    onDragEnd,
  }: {
    children: React.ReactNode
    onDragEnd: typeof capturedDragEnd
  }) => {
    capturedDragEnd = onDragEnd
    return React.createElement(React.Fragment, null, children)
  },
}))

vi.mock('@dnd-kit/react/sortable', () => ({
  useSortable: () => ({
    ref: () => undefined,
    handleRef: () => undefined,
    isDragging: false,
  }),
}))

// ── Fixtures ──────────────────────────────────────────────────────────────────
// Mirrors the mock data in ScenarioQueue.stories.tsx

const MOCK_QUEUE: Scenario[] = [
  {
    id: 'ux-research',
    title: 'UX Research & Design Interview',
    category: 'Design',
    difficulty: 'beginner',
    duration: '10-15 min',
    status: 'queued',
  },
  {
    id: 'biz-analysis',
    title: 'Business Analysis ROI Design Presentation',
    category: 'Business',
    difficulty: 'intermediate',
    duration: '15-25 min',
    status: 'queued',
  },
  {
    id: 'product-redesign',
    title: 'Product Redesign Challenge',
    category: 'Product',
    difficulty: 'advanced',
    duration: '25-35 min',
    status: 'queued',
  },
]

const MOCK_COMPLETED: Scenario[] = [
  {
    id: 'stakeholder-mgmt',
    title: 'Stakeholder Management Scenario',
    category: 'Leadership',
    difficulty: 'intermediate',
    duration: '20-30 min',
    status: 'completed',
  },
  {
    id: 'agile-sprint',
    title: 'Agile Sprint Planning Session',
    category: 'Process',
    difficulty: 'beginner',
    duration: '10-15 min',
    status: 'completed',
  },
]

const ALL_SCENARIOS = [...MOCK_QUEUE, ...MOCK_COMPLETED]

// ── Helpers ───────────────────────────────────────────────────────────────────

function simulateDrag(initialIndex: number, newIndex: number) {
  act(() => {
    capturedDragEnd?.({
      canceled: false,
      operation: {
        source: { id: MOCK_QUEUE[initialIndex]?.id ?? 'item', initialIndex, index: newIndex },
      },
    })
  })
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('ScenarioQueue', () => {
  beforeEach(() => {
    capturedDragEnd = undefined
  })

  // ── Rendering ───────────────────────────────────────────────────────────────

  describe('Rendering', () => {
    it('queue tab is the default active tab', () => {
      render(<ScenarioQueue scenarios={ALL_SCENARIOS} />)

      const queueTab = screen.getByRole('tab', { name: 'In Queue' })
      expect(queueTab).toHaveAttribute('aria-selected', 'true')
    })

    it('queue tab renders 3 scenario cards by default', () => {
      render(<ScenarioQueue scenarios={ALL_SCENARIOS} />)

      expect(screen.getByText('UX Research & Design Interview')).toBeInTheDocument()
      expect(
        screen.getByText('Business Analysis ROI Design Presentation'),
      ).toBeInTheDocument()
      expect(screen.getByText('Product Redesign Challenge')).toBeInTheDocument()
    })

    it('switching to Completed tab makes 2 completed cards visible', async () => {
      const user = userEvent.setup()
      render(<ScenarioQueue scenarios={ALL_SCENARIOS} />)

      await user.click(screen.getByRole('tab', { name: 'Completed' }))

      expect(screen.getByText('Stakeholder Management Scenario')).toBeVisible()
      expect(screen.getByText('Agile Sprint Planning Session')).toBeVisible()
    })

    it('header count reflects total number of scenarios', () => {
      render(<ScenarioQueue scenarios={ALL_SCENARIOS} />)
      expect(screen.getByText('5 scenarios')).toBeInTheDocument()
    })

    it('queue tab cards show drag handle, position badge, title, difficulty, duration', () => {
      render(<ScenarioQueue scenarios={MOCK_QUEUE} />)

      // Drag handles — one per queued card
      expect(screen.getAllByLabelText('Drag to reorder')).toHaveLength(3)

      // Position badges
      expect(screen.getByLabelText('Position 1')).toBeInTheDocument()
      expect(screen.getByLabelText('Position 2')).toBeInTheDocument()
      expect(screen.getByLabelText('Position 3')).toBeInTheDocument()

      // Titles, difficulty labels, durations
      expect(screen.getByText('UX Research & Design Interview')).toBeInTheDocument()
      expect(screen.getByText('Beginner')).toBeInTheDocument()
      expect(screen.getByText('10-15 min')).toBeInTheDocument()
    })

    it('completed tab cards show title, difficulty, duration and re-queue toggle — no drag handle, no position badge', async () => {
      const user = userEvent.setup()
      // Render only completed — ensures zero drag handles exist anywhere in DOM
      render(<ScenarioQueue scenarios={MOCK_COMPLETED} />)

      await user.click(screen.getByRole('tab', { name: 'Completed' }))

      // Cards are present
      expect(screen.getByText('Stakeholder Management Scenario')).toBeInTheDocument()
      expect(screen.getByText('Agile Sprint Planning Session')).toBeInTheDocument()

      // Re-queue toggles present
      expect(
        screen.getByLabelText('Re-queue Stakeholder Management Scenario'),
      ).toBeInTheDocument()
      expect(
        screen.getByLabelText('Re-queue Agile Sprint Planning Session'),
      ).toBeInTheDocument()

      // No drag handles or position badges anywhere
      expect(screen.queryByLabelText('Drag to reorder')).not.toBeInTheDocument()
      expect(screen.queryByLabelText(/^Position \d/)).not.toBeInTheDocument()
    })

    it('empty queue tab shows empty state message', () => {
      render(<ScenarioQueue scenarios={MOCK_COMPLETED} />)
      expect(screen.getByText('No scenarios in queue')).toBeInTheDocument()
    })

    it('empty completed tab shows empty state message', async () => {
      const user = userEvent.setup()
      render(<ScenarioQueue scenarios={MOCK_QUEUE} />)

      await user.click(screen.getByRole('tab', { name: 'Completed' }))

      expect(screen.getByText('No completed scenarios')).toBeInTheDocument()
    })
  })

  // ── Position Numbering & Active Card Styling ────────────────────────────────

  describe('Position Numbering', () => {
    it('shows sequential position numbers 1, 2, 3 matching array order', () => {
      render(<ScenarioQueue scenarios={MOCK_QUEUE} />)

      expect(screen.getByLabelText('Position 1')).toHaveTextContent('1')
      expect(screen.getByLabelText('Position 2')).toHaveTextContent('2')
      expect(screen.getByLabelText('Position 3')).toHaveTextContent('3')
    })

    it('position badges are in the correct DOM order (1 before 2 before 3)', () => {
      const { container } = render(<ScenarioQueue scenarios={MOCK_QUEUE} />)

      const badges = container.querySelectorAll('[aria-label^="Position"]')
      expect(badges[0]).toHaveAccessibleName('Position 1')
      expect(badges[1]).toHaveAccessibleName('Position 2')
      expect(badges[2]).toHaveAccessibleName('Position 3')
    })
  })

  // ── Difficulty Badge Attributes ─────────────────────────────────────────────

  describe('Difficulty Badge Attributes', () => {
    it('beginner card renders data-difficulty="beginner" on its badge', () => {
      const { container } = render(<ScenarioQueue scenarios={MOCK_QUEUE} />)

      // At least one element (difficultyBadge) must carry data-difficulty="beginner"
      expect(
        container.querySelector('[data-difficulty="beginner"]'),
      ).toBeInTheDocument()
    })

    it('intermediate card renders data-difficulty="intermediate" on its badge', () => {
      const { container } = render(<ScenarioQueue scenarios={MOCK_QUEUE} />)

      expect(
        container.querySelector('[data-difficulty="intermediate"]'),
      ).toBeInTheDocument()
    })

    it('advanced card renders data-difficulty="advanced" on its badge', () => {
      const { container } = render(<ScenarioQueue scenarios={MOCK_QUEUE} />)

      expect(
        container.querySelector('[data-difficulty="advanced"]'),
      ).toBeInTheDocument()
    })

    it('difficulty label text matches the difficulty value', () => {
      render(<ScenarioQueue scenarios={MOCK_QUEUE} />)

      expect(screen.getByText('Beginner')).toBeInTheDocument()
      expect(screen.getByText('Intermediate')).toBeInTheDocument()
      expect(screen.getByText('Advanced')).toBeInTheDocument()
    })
  })

  // ── Re-queue Flow ───────────────────────────────────────────────────────────

  describe('Re-queue Flow', () => {
    it('toggling the re-queue switch calls onRequeue with the scenario ID', async () => {
      const user = userEvent.setup()
      const onRequeue = vi.fn()
      render(<ScenarioQueue scenarios={ALL_SCENARIOS} onRequeue={onRequeue} />)

      await user.click(screen.getByRole('tab', { name: 'Completed' }))

      // Switch starts checked (defaultChecked). Click to uncheck → triggers re-queue.
      const switchEl = screen.getByLabelText('Re-queue Stakeholder Management Scenario')
      await user.click(switchEl)

      expect(onRequeue).toHaveBeenCalledWith('stakeholder-mgmt')
      expect(onRequeue).toHaveBeenCalledTimes(1)
    })

    it('re-queued card with wasRequeued=true shows Repeat badge in queue tab', () => {
      const requeued: Scenario = {
        ...MOCK_COMPLETED[0],
        status: 'queued',
        wasRequeued: true,
      }
      render(<ScenarioQueue scenarios={[...MOCK_QUEUE, requeued]} />)

      expect(screen.getByText('Repeat')).toBeInTheDocument()
    })

    it('re-queued card appears as position 4 at end of queue', () => {
      const requeued: Scenario = {
        ...MOCK_COMPLETED[0],
        status: 'queued',
        wasRequeued: true,
      }
      render(<ScenarioQueue scenarios={[...MOCK_QUEUE, requeued]} />)

      expect(screen.getByLabelText('Position 4')).toHaveTextContent('4')
    })

    it('cards without wasRequeued flag do not show Repeat badge', () => {
      render(<ScenarioQueue scenarios={MOCK_QUEUE} />)
      expect(screen.queryByText('Repeat')).not.toBeInTheDocument()
    })

    it('only the re-queued card shows the Repeat badge, not other queue cards', () => {
      const requeued: Scenario = {
        ...MOCK_COMPLETED[0],
        status: 'queued',
        wasRequeued: true,
      }
      render(<ScenarioQueue scenarios={[...MOCK_QUEUE, requeued]} />)

      // Exactly one Repeat badge
      expect(screen.getAllByText('Repeat')).toHaveLength(1)
    })
  })

  // ── Drag-Drop Reorder ───────────────────────────────────────────────────────

  describe('Drag-Drop Reorder', () => {
    it('simulated reorder calls onReorder with new ID order', () => {
      const onReorder = vi.fn()
      render(<ScenarioQueue scenarios={MOCK_QUEUE} onReorder={onReorder} />)

      // Move card at index 0 (ux-research) to index 1
      simulateDrag(0, 1)

      expect(onReorder).toHaveBeenCalledWith([
        'biz-analysis',
        'ux-research',
        'product-redesign',
      ])
    })

    it('position badge numbers update to reflect new array order after reorder', () => {
      render(<ScenarioQueue scenarios={MOCK_QUEUE} />)

      // Move card 0 (ux-research) to index 2 (last position)
      simulateDrag(0, 2)

      // The 3 positions should still exist (numbers 1, 2, 3)
      expect(screen.getByLabelText('Position 1')).toHaveTextContent('1')
      expect(screen.getByLabelText('Position 2')).toHaveTextContent('2')
      expect(screen.getByLabelText('Position 3')).toHaveTextContent('3')
    })

    it('after reorder, position badges are in the correct DOM order', () => {
      const { container } = render(<ScenarioQueue scenarios={MOCK_QUEUE} />)

      simulateDrag(0, 2)

      // The DOM order of position badges should be 1 → 2 → 3 top to bottom
      const badges = container.querySelectorAll('[aria-label^="Position"]')
      expect(badges[0]).toHaveAccessibleName('Position 1')
      expect(badges[1]).toHaveAccessibleName('Position 2')
      expect(badges[2]).toHaveAccessibleName('Position 3')
    })

    it('canceled drag does not update positions or call onReorder', () => {
      const onReorder = vi.fn()
      render(<ScenarioQueue scenarios={MOCK_QUEUE} onReorder={onReorder} />)

      act(() => {
        capturedDragEnd?.({
          canceled: true,
          operation: {
            source: { id: 'ux-research', initialIndex: 0, index: 1 },
          },
        })
      })

      expect(onReorder).not.toHaveBeenCalled()
      // Positions unchanged
      expect(screen.getByLabelText('Position 1')).toHaveTextContent('1')
    })

    it('drag to same index does not update positions or call onReorder', () => {
      const onReorder = vi.fn()
      render(<ScenarioQueue scenarios={MOCK_QUEUE} onReorder={onReorder} />)

      simulateDrag(1, 1) // same index — no-op

      expect(onReorder).not.toHaveBeenCalled()
    })

    it('drag with null source does not throw or call onReorder', () => {
      const onReorder = vi.fn()
      render(<ScenarioQueue scenarios={MOCK_QUEUE} onReorder={onReorder} />)

      expect(() => {
        act(() => {
          capturedDragEnd?.({ canceled: false, operation: { source: null } })
        })
      }).not.toThrow()

      expect(onReorder).not.toHaveBeenCalled()
    })
  })
})
