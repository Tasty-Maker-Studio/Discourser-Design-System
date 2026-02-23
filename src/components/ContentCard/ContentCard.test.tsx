/* global describe, it, expect */
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as ContentCard from './ContentCard'
import { Badge } from '../Badge'

function renderDefault() {
  return render(
    <ContentCard.Root>
      <ContentCard.Header>
        <ContentCard.Title>UX Research &amp; Design Interview</ContentCard.Title>
        <ContentCard.BadgeBar>
          <Badge colorPalette="primary" variant="subtle">Beginner</Badge>
          <Badge colorPalette="neutral" variant="subtle">Professional</Badge>
        </ContentCard.BadgeBar>
      </ContentCard.Header>
      <ContentCard.Body>
        <p>Practice explaining your UX research process.</p>
      </ContentCard.Body>
      <ContentCard.Separator />
      <ContentCard.Section>
        <ContentCard.SectionTitle>Sample Questions:</ContentCard.SectionTitle>
        <ContentCard.List>
          <ContentCard.ListItem>Walk me through your research methodology.</ContentCard.ListItem>
          <ContentCard.ListItem>Describe a challenging project you worked on.</ContentCard.ListItem>
        </ContentCard.List>
      </ContentCard.Section>
      <ContentCard.Section>
        <ContentCard.SectionTitle>Topics Covered:</ContentCard.SectionTitle>
      </ContentCard.Section>
    </ContentCard.Root>,
  )
}

describe('ContentCard', () => {
  describe('Rendering', () => {
    it('renders root container', () => {
      const { container } = renderDefault()
      expect(container.firstChild).toBeDefined()
    })

    it('renders title as h2 element', () => {
      renderDefault()
      const title = screen.getByRole('heading', { level: 2 })
      expect(title.textContent).toBe('UX Research & Design Interview')
    })

    it('renders badge bar with children', () => {
      renderDefault()
      expect(screen.getByText('Beginner')).toBeDefined()
      expect(screen.getByText('Professional')).toBeDefined()
    })

    it('renders body content', () => {
      renderDefault()
      expect(screen.getByText('Practice explaining your UX research process.')).toBeDefined()
    })

    it('renders sections with section titles as h3', () => {
      renderDefault()
      const sectionTitles = screen.getAllByRole('heading', { level: 3 })
      expect(sectionTitles.length).toBe(2)
      expect(sectionTitles[0].textContent).toBe('Sample Questions:')
      expect(sectionTitles[1].textContent).toBe('Topics Covered:')
    })

    it('renders separator as hr element', () => {
      const { container } = renderDefault()
      expect(container.querySelector('hr')).toBeDefined()
    })

    it('renders list with list items', () => {
      renderDefault()
      const items = screen.getAllByRole('listitem')
      expect(items.length).toBeGreaterThanOrEqual(2)
      expect(screen.getByText('Walk me through your research methodology.')).toBeDefined()
    })
  })

  describe('Variants', () => {
    it('applies outline variant by default', () => {
      const { container } = renderDefault()
      const root = container.firstChild as HTMLElement
      expect(root.className).toContain('content-card')
    })

    it('applies elevated variant when specified', () => {
      const { container } = render(
        <ContentCard.Root variant="elevated">
          <ContentCard.Title>Elevated</ContentCard.Title>
        </ContentCard.Root>,
      )
      expect(container.firstChild).toBeDefined()
    })

    it('applies flat variant when specified', () => {
      const { container } = render(
        <ContentCard.Root variant="flat">
          <ContentCard.Title>Flat</ContentCard.Title>
        </ContentCard.Root>,
      )
      expect(container.firstChild).toBeDefined()
    })

    it('applies size md by default', () => {
      const { container } = renderDefault()
      expect(container.firstChild).toBeDefined()
    })

    it('applies size sm when specified', () => {
      const { container } = render(
        <ContentCard.Root size="sm">
          <ContentCard.Title>Small</ContentCard.Title>
        </ContentCard.Root>,
      )
      expect(container.firstChild).toBeDefined()
    })
  })

  describe('Composition', () => {
    it('renders Badge components inside BadgeBar', () => {
      render(
        <ContentCard.Root>
          <ContentCard.BadgeBar>
            <Badge colorPalette="primary" variant="subtle">Tag 1</Badge>
            <Badge colorPalette="neutral" variant="subtle">Tag 2</Badge>
          </ContentCard.BadgeBar>
        </ContentCard.Root>,
      )
      expect(screen.getByText('Tag 1')).toBeDefined()
      expect(screen.getByText('Tag 2')).toBeDefined()
    })

    it('renders arbitrary content in Body slot', () => {
      render(
        <ContentCard.Root>
          <ContentCard.Body>
            <p data-testid="custom-content">Custom paragraph</p>
          </ContentCard.Body>
        </ContentCard.Root>,
      )
      expect(screen.getByTestId('custom-content')).toBeDefined()
    })

    it('renders multiple Sections', () => {
      render(
        <ContentCard.Root>
          <ContentCard.Section>
            <ContentCard.SectionTitle>Section 1</ContentCard.SectionTitle>
          </ContentCard.Section>
          <ContentCard.Section>
            <ContentCard.SectionTitle>Section 2</ContentCard.SectionTitle>
          </ContentCard.Section>
        </ContentCard.Root>,
      )
      const headings = screen.getAllByRole('heading', { level: 3 })
      expect(headings.length).toBe(2)
    })

    it('renders Separator between sections', () => {
      const { container } = render(
        <ContentCard.Root>
          <ContentCard.Body><p>Body</p></ContentCard.Body>
          <ContentCard.Separator />
          <ContentCard.Section>
            <ContentCard.SectionTitle>Section</ContentCard.SectionTitle>
          </ContentCard.Section>
        </ContentCard.Root>,
      )
      expect(container.querySelector('hr')).toBeDefined()
    })
  })

  describe('Accessibility', () => {
    it('Title renders as h2 for proper heading hierarchy', () => {
      renderDefault()
      expect(screen.getByRole('heading', { level: 2 })).toBeDefined()
    })

    it('SectionTitle renders as h3 for proper heading hierarchy', () => {
      renderDefault()
      const h3s = screen.getAllByRole('heading', { level: 3 })
      expect(h3s.length).toBeGreaterThan(0)
    })

    it('List renders as ul with li children', () => {
      const { container } = renderDefault()
      expect(container.querySelector('ul')).toBeDefined()
      expect(container.querySelector('li')).toBeDefined()
    })

    it('Separator renders as hr', () => {
      const { container } = renderDefault()
      expect(container.querySelector('hr')).toBeDefined()
    })
  })
})
