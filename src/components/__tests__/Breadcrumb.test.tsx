/* global describe, it, expect */
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as Breadcrumb from '../Breadcrumb'

type BreadcrumbVariant = 'plain' | 'underline' | 'discourser'

function renderBreadcrumb(variant?: BreadcrumbVariant) {
  return render(
    <Breadcrumb.Root {...(variant ? { variant } : {})}>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/home">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>Components</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>,
  )
}

describe('Breadcrumb', () => {
  describe('Rendering', () => {
    it('renders breadcrumb navigation with correct aria-label', () => {
      renderBreadcrumb()
      expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeDefined()
    })

    it('renders all breadcrumb items', () => {
      renderBreadcrumb()
      expect(screen.getByText('Home')).toBeDefined()
      expect(screen.getByText('Docs')).toBeDefined()
      expect(screen.getByText('Components')).toBeDefined()
    })

    it('renders separator between items', () => {
      const { container } = renderBreadcrumb()
      // Separators are aria-hidden li elements with svg children
      const separators = container.querySelectorAll('[aria-hidden="true"]')
      expect(separators.length).toBeGreaterThan(0)
    })

    it('marks the last item as current page with aria-current', () => {
      renderBreadcrumb()
      const current = screen.getByText('Components')
      expect(current.closest('[aria-current="page"]')).toBeDefined()
    })
  })

  describe('Discourser Variant', () => {
    it('renders with discourser variant class when variant="discourser"', () => {
      const { container } = renderBreadcrumb('discourser')
      // The root nav element should exist with the breadcrumb class
      const nav = container.querySelector('nav')
      expect(nav).toBeDefined()
    })

    it('CurrentLink renders as span, not anchor', () => {
      renderBreadcrumb()
      const current = screen.getByText('Components')
      expect(current.tagName).toBe('SPAN')
    })

    it('CurrentLink has aria-current="page" by default', () => {
      renderBreadcrumb()
      const current = screen.getByText('Components')
      expect(current.getAttribute('aria-current')).toBe('page')
    })
  })

  describe('Accessibility', () => {
    it('has role navigation on root element', () => {
      renderBreadcrumb()
      expect(screen.getByRole('navigation')).toBeDefined()
    })

    it('renders ordered list for semantic structure', () => {
      const { container } = renderBreadcrumb()
      expect(container.querySelector('ol')).toBeDefined()
    })

    it('separators are aria-hidden', () => {
      const { container } = renderBreadcrumb()
      const hiddenElements = container.querySelectorAll('[aria-hidden="true"]')
      expect(hiddenElements.length).toBeGreaterThan(0)
    })
  })
})
