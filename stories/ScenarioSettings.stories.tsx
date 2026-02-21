import type { Meta, StoryObj } from '@storybook/react'
import { ScenarioSettings } from '../src/components/ScenarioSettings'
import { Box } from 'styled-system/jsx'

const meta: Meta<typeof ScenarioSettings> = {
  title: 'Components/ScenarioSettings',
  component: ScenarioSettings,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Box w="343px" bg="surface" minH="400px">
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ScenarioSettings>

export const Default: Story = {
  name: 'Default (all expanded)',
  args: {},
}

export const FirstSectionExpanded: Story = {
  name: 'Only Conversation Flow expanded',
  args: {
    defaultValue: ['conversation-flow'],
  },
}

export const AllCollapsed: Story = {
  name: 'All collapsed',
  args: {
    defaultValue: [],
  },
}

export const RadioGroupInteraction: Story = {
  name: 'Radio Groups — Standard Duration selected',
  args: {
    defaultValue: ['duration', 'number-of-questions'],
    defaultDuration: 'standard',
    defaultQuestionCount: 'standard',
  },
}

export const WithCustomDialogContent: Story = {
  name: 'With custom dialog content (slot API)',
  args: {
    defaultValue: ['conversation-flow'],
    adjustmentDialogContent: {
      'conversation-flow': (
        <Box p="4" bg="surface.container.low" borderRadius="l3">
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>Conversation Flow Settings</p>
          <p style={{ color: '#5E5F59', fontSize: '14px' }}>
            Custom adjustment controls for Conversation Flow will be injected here from the
            application layer. This demonstrates the injectable content API.
          </p>
        </Box>
      ),
      'question-complexity': (
        <Box p="4">
          <p>Question Complexity custom controls</p>
        </Box>
      ),
    },
  },
}

export const SingleOpen: Story = {
  name: 'Single open (one at a time)',
  args: {
    singleOpen: true,
    defaultValue: ['conversation-flow'],
  },
}

export const WithRenderPropAPI: Story = {
  name: 'With renderAdjustmentDialog render-prop API',
  args: {
    defaultValue: ['discourse-tone'],
    renderAdjustmentDialog: (sectionId) => (
      <Box p="4" bg="surface.container.low" borderRadius="l3">
        <p style={{ fontWeight: 600, marginBottom: '4px' }}>
          Dynamic content for: {sectionId}
        </p>
        <p style={{ fontSize: '14px', color: '#5E5F59' }}>
          Rendered via the renderAdjustmentDialog render-prop. Section ID: {sectionId}
        </p>
      </Box>
    ),
  },
}
