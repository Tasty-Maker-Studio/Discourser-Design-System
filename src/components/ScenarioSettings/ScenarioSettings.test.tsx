/* global describe, it, expect, vi */
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ScenarioSettings } from './ScenarioSettings'

// ── Helpers ────────────────────────────────────────────────────────────────────

function renderSettings(props: Record<string, unknown> = {}) {
  return render(<ScenarioSettings {...props} />)
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('ScenarioSettings', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('Rendering', () => {
    it('renders all 6 section triggers', () => {
      renderSettings()
      // Use exact name matching to avoid matching Dialog.Trigger aria-labels
      // (e.g. "Open Conversation Flow adjustments" also contains "Conversation Flow")
      expect(screen.getByRole('button', { name: 'Conversation Flow' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Question Complexity' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Discourse Tone' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Response Pacing' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Duration' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Number of Questions' })).toBeInTheDocument()
    })

    it('all 6 sections are expanded by default', () => {
      renderSettings()
      expect(screen.getAllByText('What this means:')).toHaveLength(4)
      expect(screen.getByText('Expected time to complete')).toBeVisible()
      expect(screen.getByText('Follow up Questions in this session')).toBeVisible()
    })

    it('renders the correct explanation text for Conversation Flow', () => {
      renderSettings()
      expect(screen.getByText('Topic transitions are explicit and signposted')).toBeInTheDocument()
      expect(
        screen.getByText('Conversation flows organically with realistic tangents'),
      ).toBeInTheDocument()
      expect(screen.getByText('Topic shifts are sudden and unpredictable')).toBeInTheDocument()
    })

    it('renders Beginner / Intermediate / Advanced level labels for all info sections', () => {
      renderSettings()
      expect(screen.getAllByText('Beginner:')).toHaveLength(4)
      expect(screen.getAllByText('Intermediate:')).toHaveLength(4)
      expect(screen.getAllByText('Advanced:')).toHaveLength(4)
    })

    it('renders Adjustments buttons for the 4 info sections', () => {
      renderSettings()
      expect(screen.getAllByText('Adjustments')).toHaveLength(4)
    })

    it('renders Duration radio options', () => {
      renderSettings()
      expect(screen.getByText('Quick (10 - 15 min)')).toBeInTheDocument()
      expect(screen.getByText('Standard (15 - 25 min)')).toBeInTheDocument()
      expect(screen.getByText('Extended (25 - 35 min)')).toBeInTheDocument()
    })

    it('renders Number of Questions radio options', () => {
      renderSettings()
      expect(screen.getByText('Brief (2-4)')).toBeInTheDocument()
      expect(screen.getByText('Standard (5-8)')).toBeInTheDocument()
      expect(screen.getByText('Extended (9-12)')).toBeInTheDocument()
    })
  })

  // ── Accordion Expand / Collapse ────────────────────────────────────────────

  describe('Accordion', () => {
    it('starts with all sections expanded by default', () => {
      renderSettings()
      expect(screen.getAllByText('What this means:')).toHaveLength(4)
    })

    it('collapses a section when its trigger is clicked', async () => {
      const user = userEvent.setup()
      renderSettings()

      // Use exact name to avoid matching Dialog.Trigger aria-label
      const trigger = screen.getByRole('button', { name: 'Conversation Flow' })
      expect(trigger).toHaveAttribute('aria-expanded', 'true')

      await user.click(trigger)

      // In JSDOM, Ark UI updates aria-expanded without relying on CSS
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('expands a collapsed section when clicked', async () => {
      const user = userEvent.setup()
      renderSettings({ defaultValue: [] })

      const trigger = screen.getByRole('button', { name: 'Discourse Tone' })
      expect(trigger).toHaveAttribute('aria-expanded', 'false')

      await user.click(trigger)

      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })

    it('respects defaultValue to start specific sections open', () => {
      renderSettings({ defaultValue: ['duration'] })
      // Duration section should be open, info sections should be closed
      expect(screen.getByRole('button', { name: 'Duration' })).toHaveAttribute(
        'aria-expanded',
        'true',
      )
      expect(screen.getByRole('button', { name: 'Conversation Flow' })).toHaveAttribute(
        'aria-expanded',
        'false',
      )
      expect(screen.getByRole('button', { name: 'Question Complexity' })).toHaveAttribute(
        'aria-expanded',
        'false',
      )
    })

    it('opening a second section closes the first (always single-open)', async () => {
      const user = userEvent.setup()
      renderSettings({ defaultValue: [] })

      const cfTrigger = screen.getByRole('button', { name: 'Conversation Flow' })
      const qcTrigger = screen.getByRole('button', { name: 'Question Complexity' })

      await user.click(cfTrigger)
      expect(cfTrigger).toHaveAttribute('aria-expanded', 'true')
      expect(qcTrigger).toHaveAttribute('aria-expanded', 'false')

      await user.click(qcTrigger)
      expect(cfTrigger).toHaveAttribute('aria-expanded', 'false')
      expect(qcTrigger).toHaveAttribute('aria-expanded', 'true')
    })
  })

  // ── Single Open Mode ───────────────────────────────────────────────────────

  describe('Single Open Mode', () => {
    it('only one section can be open at a time when singleOpen is true', async () => {
      const user = userEvent.setup()
      renderSettings({ singleOpen: true, defaultValue: ['conversation-flow'] })

      const cfTrigger = screen.getByRole('button', { name: 'Conversation Flow' })
      const qcTrigger = screen.getByRole('button', { name: 'Question Complexity' })

      expect(cfTrigger).toHaveAttribute('aria-expanded', 'true')
      expect(qcTrigger).toHaveAttribute('aria-expanded', 'false')

      // Open Question Complexity — should close Conversation Flow
      await user.click(qcTrigger)

      expect(qcTrigger).toHaveAttribute('aria-expanded', 'true')
      expect(cfTrigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('allows collapsing all sections when singleOpen is true (collapsible)', async () => {
      const user = userEvent.setup()
      renderSettings({ singleOpen: true, defaultValue: ['conversation-flow'] })

      const cfTrigger = screen.getByRole('button', { name: 'Conversation Flow' })
      expect(cfTrigger).toHaveAttribute('aria-expanded', 'true')

      // Click again to collapse
      await user.click(cfTrigger)
      expect(cfTrigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('defaults to first section when singleOpen is true and no defaultValue provided', () => {
      renderSettings({ singleOpen: true })
      expect(screen.getByRole('button', { name: 'Conversation Flow' })).toHaveAttribute(
        'aria-expanded',
        'true',
      )
    })
  })

  // ── Radio Group ────────────────────────────────────────────────────────────

  describe('Radio Group', () => {
    it('Duration defaults to quick and shows the correct badge', () => {
      renderSettings({ defaultValue: ['duration'] })
      expect(screen.getByText('~ (10-15 min)')).toBeInTheDocument()
    })

    it('Number of Questions defaults to brief and shows the correct badge', () => {
      renderSettings({ defaultValue: ['number-of-questions'] })
      expect(screen.getByText('2-4 questions')).toBeInTheDocument()
    })

    it('selecting a Duration radio updates the Currently badge', async () => {
      const user = userEvent.setup()
      renderSettings({ defaultValue: ['duration'] })

      await user.click(screen.getByText('Standard (15 - 25 min)'))

      expect(screen.getByText('~ (15-25 min)')).toBeInTheDocument()
    })

    it('selecting a Question Count radio updates the Currently badge', async () => {
      const user = userEvent.setup()
      renderSettings({ defaultValue: ['number-of-questions'] })

      await user.click(screen.getByText('Extended (9-12)'))

      expect(screen.getByText('9-12 questions')).toBeInTheDocument()
    })

    it('calls onSelectionChange with correct sectionId and value on Duration change', async () => {
      const user = userEvent.setup()
      const onSelectionChange = vi.fn()
      renderSettings({ defaultValue: ['duration'], onSelectionChange })

      await user.click(screen.getByText('Extended (25 - 35 min)'))

      expect(onSelectionChange).toHaveBeenCalledWith('duration', 'extended')
    })

    it('calls onSelectionChange with correct sectionId and value on Questions change', async () => {
      const user = userEvent.setup()
      const onSelectionChange = vi.fn()
      renderSettings({ defaultValue: ['number-of-questions'], onSelectionChange })

      await user.click(screen.getByText('Standard (5-8)'))

      expect(onSelectionChange).toHaveBeenCalledWith('number-of-questions', 'standard')
    })

    it('accepts custom defaultDuration', () => {
      renderSettings({ defaultValue: ['duration'], defaultDuration: 'extended' })
      expect(screen.getByText('~ (25-35 min)')).toBeInTheDocument()
    })

    it('accepts custom defaultQuestionCount', () => {
      renderSettings({
        defaultValue: ['number-of-questions'],
        defaultQuestionCount: 'extended',
      })
      expect(screen.getByText('9-12 questions')).toBeInTheDocument()
    })
  })

  // ── Adjustments Dialog ─────────────────────────────────────────────────────

  describe('Adjustments Dialog', () => {
    it('dialog is not visible initially', () => {
      renderSettings({ defaultValue: ['conversation-flow'] })
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('clicking Adjustments opens the dialog', async () => {
      const user = userEvent.setup()
      renderSettings({ defaultValue: ['conversation-flow'] })

      await user.click(screen.getAllByText('Adjustments')[0])

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('dialog title shows the correct section name', async () => {
      const user = userEvent.setup()
      renderSettings({ defaultValue: ['conversation-flow'] })

      await user.click(screen.getAllByText('Adjustments')[0])

      expect(
        screen.getByRole('heading', { name: /Adjust Conversation Flow/i }),
      ).toBeInTheDocument()
    })

    it('shows placeholder content when no custom content provided', async () => {
      const user = userEvent.setup()
      renderSettings({ defaultValue: ['conversation-flow'] })

      await user.click(screen.getAllByText('Adjustments')[0])

      expect(
        screen.getByText(/Adjustment controls for Conversation Flow will appear here/i),
      ).toBeInTheDocument()
    })

    it('renders custom adjustmentDialogContent when provided', async () => {
      const user = userEvent.setup()
      renderSettings({
        defaultValue: ['conversation-flow'],
        adjustmentDialogContent: {
          'conversation-flow': <div>Custom Conversation Flow Content</div>,
        },
      })

      await user.click(screen.getAllByText('Adjustments')[0])

      expect(screen.getByText('Custom Conversation Flow Content')).toBeInTheDocument()
    })

    it('renders content from renderAdjustmentDialog when provided', async () => {
      const user = userEvent.setup()
      const renderFn = vi.fn((sectionId: string) => <div>Rendered for {sectionId}</div>)
      renderSettings({
        defaultValue: ['question-complexity'],
        renderAdjustmentDialog: renderFn,
      })

      await user.click(screen.getAllByText('Adjustments')[1])

      expect(screen.getByText('Rendered for question-complexity')).toBeInTheDocument()
    })

    it('renderAdjustmentDialog takes precedence over adjustmentDialogContent', async () => {
      const user = userEvent.setup()
      renderSettings({
        defaultValue: ['conversation-flow'],
        adjustmentDialogContent: {
          'conversation-flow': <div>Record content</div>,
        },
        renderAdjustmentDialog: () => <div>Render prop content</div>,
      })

      await user.click(screen.getAllByText('Adjustments')[0])

      expect(screen.getByText('Render prop content')).toBeInTheDocument()
      expect(screen.queryByText('Record content')).not.toBeInTheDocument()
    })

    it('dialog can be closed via the close button', async () => {
      const user = userEvent.setup()
      renderSettings({ defaultValue: ['conversation-flow'] })

      await user.click(screen.getAllByText('Adjustments')[0])
      expect(screen.getByRole('dialog')).toBeInTheDocument()

      await user.click(screen.getByLabelText('Close dialog'))

      // unmountOnExit unmounts asynchronously; waitFor polls until the dialog leaves the DOM
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    })
  })

  // ── Accessibility ──────────────────────────────────────────────────────────

  describe('Accessibility', () => {
    it('has no axe violations with default settings', async () => {
      const { container } = renderSettings()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has no axe violations with all sections collapsed', async () => {
      const { container } = renderSettings({ defaultValue: [] })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
