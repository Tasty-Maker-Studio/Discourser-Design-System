'use client'
import { type ComponentProps, forwardRef } from 'react'
import { Box, Circle, HStack, VStack } from 'styled-system/jsx'
import { scenarioCard } from 'styled-system/recipes'
import * as Card from '../Card'
import { ClockIcon } from '../Icons/ClockIcon'
import { GripDotsVerticalIcon } from '../Icons/GripDotsVerticalIcon'
import * as Switch from '../Switch'
import {
  type ScenarioCardProps,
  difficultyLabel,
} from './types'

export interface ScenarioCardElementProps
  extends ScenarioCardProps,
    Omit<ComponentProps<'div'>, 'children'> {
  /** Callback ref for the root element (used by ScenarioCardDraggable) */
  rootRef?: (el: HTMLDivElement | null) => void
  /** Callback ref for the drag handle (used by ScenarioCardDraggable) */
  handleRef?: (el: HTMLDivElement | null) => void
}

export const ScenarioCard = forwardRef<HTMLDivElement, ScenarioCardElementProps>(
  function ScenarioCard(
    {
      scenario,
      position,
      isActive,
      showRequeueSwitch = false,
      onRequeue,
      isRepeat = false,
      isDragging = false,
      rootRef,
      handleRef,
      className: _className,
      ...rest
    },
    _ref,
  ) {
    const styles = scenarioCard({ isActive, isDragging })

    return (
      <Card.Root
        ref={rootRef}
        className={styles.root}
        variant="elevated"
        css={{
          boxShadow: '0px 2px 8px 0px rgba(167, 139, 250, 0.15)',
          // neutral.surface.bg resolves to white in light mode; Figma uses neutral/99 (#FDFCF5)
          bg: 'neutral.1',
        }}
        {...rest}
      >
        <VStack gap="2.5" pl="5" pr="3" py="2.5" alignItems="flex-start">
          {/* Top row: drag handle (left) + position badge (right) — queue tab only */}
          {!showRequeueSwitch && (
            <HStack justify="space-between" alignItems="flex-start" w="full" py="2" pr="2.5">
              <Box
                ref={handleRef}
                className={styles.dragHandle}
                aria-label="Drag to reorder"
              >
                <GripDotsVerticalIcon w="9" h="10" aria-hidden="true" />
              </Box>
              <Circle
                size={isActive ? "12" : "11"}
                className={styles.positionBadge}
                aria-label={`Position ${position}`}
              >
                {position}
              </Circle>
            </HStack>
          )}

          {/* Title */}
          <Box px="1" py="1.5" w="full">
            <p className={styles.title}>{scenario.title}</p>
          </Box>

          {/* Badge column: difficulty stacked above duration, matching Figma flex-col layout */}
          <VStack gap="3" alignItems="flex-start" py="2.5">
            <Box
              className={styles.difficultyBadge}
              data-difficulty={scenario.difficulty}
            >
              {difficultyLabel[scenario.difficulty]}
            </Box>

            <Box className={styles.durationBadge} data-difficulty={scenario.difficulty}>
              <ClockIcon w="3" h="3" aria-hidden="true" />
              {scenario.duration}
            </Box>

            {isRepeat && (
              <Box className={styles.durationBadge} data-difficulty={scenario.difficulty}>Repeat</Box>
            )}
          </VStack>

          {/* Re-queue switch row (completed tab only) */}
          {showRequeueSwitch && (
            <HStack className={styles.switchRow} justify="space-between">
              <span className={styles.switchLabel}>Re-queue</span>
              <Switch.Root
                size="sm"
                defaultChecked
                onCheckedChange={(details) => {
                  if (!details.checked) onRequeue?.(scenario.id)
                }}
                aria-label={`Re-queue ${scenario.title}`}
              >
                <Switch.HiddenInput />
                <Switch.Control css={{ _checked: { bg: 'secondary.6' } }} />
              </Switch.Root>
            </HStack>
          )}
        </VStack>
      </Card.Root>
    )
  },
)
