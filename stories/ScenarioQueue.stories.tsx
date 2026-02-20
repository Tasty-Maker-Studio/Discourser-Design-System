import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { css } from '../styled-system/css'
import { ScenarioQueue } from '../src/components/ScenarioQueue'
import type { Scenario } from '../src/components/ScenarioQueue'

const meta: Meta<typeof ScenarioQueue> = {
  title: 'Components/ScenarioQueue',
  component: ScenarioQueue,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof ScenarioQueue>

// ── Mock data ─────────────────────────────────────────────────────────────────

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
    status: 'repeat',
  },
]

// Extended dataset for scroll testing — 8 queued + 5 completed
const MOCK_QUEUE_LONG: Scenario[] = [
  ...MOCK_QUEUE,
  {
    id: 'system-design',
    title: 'System Design for Scale',
    category: 'Engineering',
    difficulty: 'advanced',
    duration: '30-45 min',
    status: 'queued',
  },
  {
    id: 'customer-empathy',
    title: 'Customer Empathy Mapping',
    category: 'Research',
    difficulty: 'beginner',
    duration: '10-15 min',
    status: 'queued',
  },
  {
    id: 'data-storytelling',
    title: 'Data Storytelling for Non-Technical Stakeholders',
    category: 'Communication',
    difficulty: 'intermediate',
    duration: '20-25 min',
    status: 'queued',
  },
  {
    id: 'conflict-resolution',
    title: 'Cross-Team Conflict Resolution',
    category: 'Leadership',
    difficulty: 'intermediate',
    duration: '15-20 min',
    status: 'queued',
  },
  {
    id: 'api-design',
    title: 'API Design Review',
    category: 'Engineering',
    difficulty: 'advanced',
    duration: '25-35 min',
    status: 'queued',
  },
  {
    id: 'okr-setting',
    title: 'OKR Goal Setting Workshop',
    category: 'Strategy',
    difficulty: 'beginner',
    duration: '10-15 min',
    status: 'queued',
  },
]

const MOCK_COMPLETED_LONG: Scenario[] = [
  ...MOCK_COMPLETED,
  {
    id: 'hiring-debrief',
    title: 'Hiring Panel Debrief',
    category: 'Leadership',
    difficulty: 'intermediate',
    duration: '20-30 min',
    status: 'completed',
  },
  {
    id: 'incident-postmortem',
    title: 'Incident Postmortem Facilitation',
    category: 'Engineering',
    difficulty: 'advanced',
    duration: '30-40 min',
    status: 'completed',
  },
  {
    id: 'roadmap-prioritization',
    title: 'Roadmap Prioritization',
    category: 'Product',
    difficulty: 'intermediate',
    duration: '15-25 min',
    status: 'repeat',
  },
]

// ── Panel wrapper matching the actual sidebar width in the app ─────────────────

const panelClass = css({
  width: '280px',
  height: '720px',
  overflow: 'hidden',
})

// ── Stories ───────────────────────────────────────────────────────────────────

/**
 * Default view: 3 scenarios in the queue, 2 completed.
 * Try dragging cards to reorder the queue.
 */
export const Default: Story = {
  render: () => {
    const [scenarios, setScenarios] = useState<Scenario[]>([
      ...MOCK_QUEUE,
      ...MOCK_COMPLETED,
    ])

    const handleReorder = (newIds: string[]) => {
      setScenarios((prev) => {
        const queueMap = Object.fromEntries(
          prev
            .filter((s) => s.status === 'queued' || s.status === 'repeat')
            .map((s) => [s.id, s]),
        )
        const reordered = newIds.map((id) => queueMap[id]).filter(Boolean)
        const rest = prev.filter(
          (s) => s.status !== 'queued' && s.status !== 'repeat',
        )
        return [...reordered, ...rest]
      })
    }

    const handleRequeue = (scenarioId: string) => {
      setScenarios((prev) =>
        prev.map((s) =>
          s.id === scenarioId ? { ...s, status: 'repeat' as const } : s,
        ),
      )
    }

    return (
      <div className={panelClass}>
        <ScenarioQueue
          scenarios={scenarios}
          onReorder={handleReorder}
          onRequeue={handleRequeue}
          onBrowseMore={() => console.log('Browse more clicked')}
          onBuildCustom={() => console.log('Build custom clicked')}
          renderAddScenarioContent={({ onClose }) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '16px 0',
              }}
            >
              <p style={{ color: 'var(--colors-fg-muted)', fontSize: '14px' }}>
                Select a scenario to add to your queue:
              </p>
              {['Design Thinking Workshop', 'Customer Interview', 'Team Retrospective'].map(
                (title) => (
                  <button
                    key={title}
                    type="button"
                    onClick={onClose}
                    style={{
                      textAlign: 'left',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid var(--colors-border-default)',
                      background: 'var(--colors-neutral-surface-bg)',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    {title}
                  </button>
                ),
              )}
            </div>
          )}
        />
      </div>
    )
  },
}

/**
 * Queue only — no completed scenarios. Useful for verifying the empty
 * completed state message and the queue card ordering.
 */
export const QueueOnly: Story = {
  render: () => (
    <div className={panelClass}>
      <ScenarioQueue
        scenarios={MOCK_QUEUE}
        onReorder={(ids) => console.log('Reordered:', ids)}
      />
    </div>
  ),
}

/**
 * Completed tab — all scenarios are in the completed state.
 * The queue tab shows the empty state and the completed tab shows
 * re-queue toggles, including a "Repeat" badge on re-queued items.
 */
export const CompletedTab: Story = {
  render: () => (
    <div className={panelClass}>
      <ScenarioQueue
        scenarios={MOCK_COMPLETED}
        onRequeue={(id) => console.log('Re-queue:', id)}
      />
    </div>
  ),
}

/**
 * Empty state — no scenarios at all.
 */
export const Empty: Story = {
  render: () => (
    <div className={panelClass}>
      <ScenarioQueue scenarios={[]} />
    </div>
  ),
}

/**
 * With Add Scenario Dialog — shows the dialog placeholder slot.
 * Click "+ Add Scenario" to open the modal.
 */
export const WithAddDialog: Story = {
  render: () => (
    <div className={panelClass}>
      <ScenarioQueue
        scenarios={MOCK_QUEUE.slice(0, 2)}
        onBrowseMore={() => console.log('Browse more')}
        onBuildCustom={() => console.log('Build custom')}
      />
    </div>
  ),
}

/**
 * Scroll test — 8 queued + 5 completed scenarios.
 * Verify: card list scrolls independently while the "+ Add Scenario"
 * button stays pinned at the bottom. Switch tabs to confirm both
 * scroll areas are independent.
 */
export const Scrollable: Story = {
  render: () => {
    const [scenarios, setScenarios] = useState<Scenario[]>([
      ...MOCK_QUEUE_LONG,
      ...MOCK_COMPLETED_LONG,
    ])

    const handleReorder = (newIds: string[]) => {
      setScenarios((prev) => {
        const queueMap = Object.fromEntries(
          prev
            .filter((s) => s.status === 'queued' || s.status === 'repeat')
            .map((s) => [s.id, s]),
        )
        const reordered = newIds.map((id) => queueMap[id]).filter(Boolean)
        const rest = prev.filter(
          (s) => s.status !== 'queued' && s.status !== 'repeat',
        )
        return [...reordered, ...rest]
      })
    }

    return (
      <div className={panelClass}>
        <ScenarioQueue
          scenarios={scenarios}
          onReorder={handleReorder}
          onRequeue={(id) => console.log('Re-queue:', id)}
        />
      </div>
    )
  },
}