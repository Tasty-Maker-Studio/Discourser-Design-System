'use client'
import { DragDropProvider } from '@dnd-kit/react'
import { useState, useEffect, type ComponentProps } from 'react'
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
  const queuedRaw = scenarios.filter((s) => s.status === 'queued')
  const completed = scenarios.filter((s) => s.status === 'completed')

  // Local ordering state — mirrors queuedRaw but supports optimistic drag reorder
  const [localQueue, setLocalQueue] = useState<Scenario[]>(queuedRaw)

  // Sync when the canonical scenarios list changes externally
  useEffect(() => {
    setLocalQueue(queuedRaw)
  }, [scenarios])

  const [dialogOpen, setDialogOpen] = useState(false)
  const totalCount = localQueue.length + completed.length

  // useSortable adds index + initialIndex to the draggable at runtime; cast here
  // since @dnd-kit/react's static Draggable<Data> type doesn't declare them.
  type SortableSource = { index: number; initialIndex: number } & Record<string, unknown>

  const handleDragEnd: NonNullable<ComponentProps<typeof DragDropProvider>['onDragEnd']> = (event) => {
    if (event.canceled) return
    const source = event.operation?.source as SortableSource | null
    if (!source) return

    const oldIndex = source.initialIndex
    const newIndex = source.index

    if (oldIndex === newIndex) return

    const next = arrayMove(localQueue, oldIndex, newIndex)
    setLocalQueue(next)
    onReorder?.(next.map((s) => s.id))
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
                    isRepeat={scenario.wasRequeued ?? false}
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
