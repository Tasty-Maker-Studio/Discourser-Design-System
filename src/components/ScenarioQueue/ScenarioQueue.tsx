'use client'
import { DragDropProvider } from '@dnd-kit/react'
import { useState, useEffect } from 'react'
import { css } from 'styled-system/css'
import { Box, Center } from 'styled-system/jsx'
import { scenarioQueue } from 'styled-system/recipes'
import { Button } from '../Button'
import * as Tabs from '../Tabs'
import { AddScenarioDialog } from './AddScenarioDialog'
import { ScenarioCard } from './ScenarioCard'
import { ScenarioCardDraggable } from './ScenarioCardDraggable'
import type { ScenarioQueueProps, Scenario } from './types'

// ── Helpers ──────────────────────────────────────────────────────────────────

function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const next = [...array]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ScenarioQueue({
  scenarios,
  onReorder,
  onRequeue,
  onRemove: _onRemove,
  renderAddScenarioContent,
  onBrowseMore,
  onBuildCustom,
}: ScenarioQueueProps) {
  const queuedRaw = scenarios.filter(
    (s) => s.status === 'queued' || s.status === 'repeat',
  )
  const completed = scenarios.filter((s) => s.status === 'completed')

  // Local ordering state — mirrors queuedRaw but supports optimistic drag reorder
  const [localQueue, setLocalQueue] = useState<Scenario[]>(queuedRaw)

  // Sync when the canonical scenarios list changes externally
  useEffect(() => {
    setLocalQueue(queuedRaw)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarios])

  const [dialogOpen, setDialogOpen] = useState(false)
  const totalCount = localQueue.length + completed.length

  const handleDragEnd = (event: {
    operation: { source: { id: unknown } | null; target: { id: unknown } | null }
    canceled: boolean
  }) => {
    if (event.canceled) return
    const { source, target } = event.operation
    if (!source || !target || source.id === target.id) return

    const sourceId = String(source.id)
    const targetId = String(target.id)

    setLocalQueue((prev) => {
      const oldIndex = prev.findIndex((s) => s.id === sourceId)
      const newIndex = prev.findIndex((s) => s.id === targetId)
      if (oldIndex === -1 || newIndex === -1) return prev
      const next = arrayMove(prev, oldIndex, newIndex)
      onReorder?.(next.map((s) => s.id))
      return next
    })
  }

  const styles = scenarioQueue()

  return (
    <Box className={styles.root}>
      {/* Header */}
      <Box className={styles.header}>
        <Box className={styles.title}>Scenario Queue</Box>
        <Box className={styles.count}>
          {totalCount} scenario{totalCount !== 1 ? 's' : ''}
        </Box>
      </Box>

      {/* Tabs.Root gets tabsInner directly — no wrapper div needed.
          flex:1 + minHeight:0 allows content panels to scroll independently
          without the panel expanding indefinitely. */}
      <Tabs.Root
        defaultValue="queue"
        variant="line"
        size="md"
        colorPalette="primary"
        className={styles.tabsInner}
      >
        <Box className={styles.tabList}>
          <Tabs.List className={css({ borderBottomWidth: '0' })}>
            <Tabs.Trigger value="queue">In Queue</Tabs.Trigger>
            <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
        </Box>

        {/* In Queue tab */}
        <Tabs.Content value="queue" className={styles.tabsContent}>
          {localQueue.length === 0 ? (
            <Center className={styles.emptyState}>No scenarios in queue</Center>
          ) : (
            <DragDropProvider onDragEnd={handleDragEnd}>
              <Box className={styles.scrollArea}>
                {localQueue.map((scenario, index) => (
                  <ScenarioCardDraggable
                    key={scenario.id}
                    scenario={scenario}
                    index={index}
                    position={index + 1}
                    isActive={index === 0}
                    isRepeat={scenario.status === 'repeat'}
                  />
                ))}
              </Box>
            </DragDropProvider>
          )}
        </Tabs.Content>

        {/* Completed tab */}
        <Tabs.Content value="completed" className={styles.tabsContent}>
          {completed.length === 0 ? (
            <Center className={styles.emptyState}>No completed scenarios</Center>
          ) : (
            <Box className={styles.scrollArea}>
              {completed.map((scenario, index) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  position={index + 1}
                  isActive={false}
                  showRequeueSwitch
                  onRequeue={onRequeue}
                />
              ))}
            </Box>
          )}
        </Tabs.Content>
      </Tabs.Root>

      {/* Pinned "Add Scenario" button — always visible, never scrolls */}
      <Box className={styles.addButtonArea}>
        <Button
          variant="outline"
          colorPalette="primary"
          size="md"
          className={styles.addButton}
          onClick={() => setDialogOpen(true)}
        >
          + Add Scenario
        </Button>
      </Box>

      <AddScenarioDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        renderContent={renderAddScenarioContent}
        onBrowseMore={onBrowseMore}
        onBuildCustom={onBuildCustom}
      />
    </Box>
  )
}
