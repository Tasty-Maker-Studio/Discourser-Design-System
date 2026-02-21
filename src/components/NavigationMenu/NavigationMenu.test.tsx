/* global describe, it, expect, vi */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { NavigationMenu } from './NavigationMenu';
import type { NavSection } from './types';

// ── Mock icon ─────────────────────────────────────────────────────────────────
// Avoids importing real DS icon SVGs — keeps tests free of styled-system deps.

const MockIcon = () =>
  React.createElement('svg', { 'data-testid': 'section-icon' });

// ── Fixtures ──────────────────────────────────────────────────────────────────
// Mirrors the mock data in NavigationMenu.stories.tsx

const MOCK_SECTIONS: NavSection[] = [
  {
    value: 'dashboard',
    title: 'Dashboard',
    icon: React.createElement(MockIcon),
    items: [
      { label: 'Quick Start', href: '/dashboard/quick-start' },
      { label: 'Resume Session', href: '/dashboard/resume-session' },
      { label: 'Progress', href: '/dashboard/progress' },
    ],
  },
  {
    value: 'scenarios',
    title: 'Scenarios',
    icon: React.createElement(MockIcon),
    items: [
      { label: 'MyQueue', href: '/scenarios/my-queue' },
      { label: 'Conversation Studio', href: '/scenarios/conversation-studio' },
    ],
  },
  {
    value: 'help',
    title: 'Help',
    icon: React.createElement(MockIcon),
    items: [
      { label: 'How it Works', href: '/help/how-it-works' },
      { label: 'Contact Support', href: '/help/contact-support' },
    ],
  },
];

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('NavigationMenu', () => {
  // ── Rendering ───────────────────────────────────────────────────────────────

  describe('Rendering', () => {
    it('renders a <nav> with the provided aria-label', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          ariaLabel="Dashboard navigation"
        />,
      );

      expect(
        screen.getByRole('navigation', { name: 'Dashboard navigation' }),
      ).toBeInTheDocument();
    });

    it('defaults ariaLabel to "Navigation" when not provided', () => {
      render(<NavigationMenu sections={MOCK_SECTIONS} />);

      expect(
        screen.getByRole('navigation', { name: 'Navigation' }),
      ).toBeInTheDocument();
    });

    it('renders one trigger button per section', () => {
      render(<NavigationMenu sections={MOCK_SECTIONS} />);

      expect(
        screen.getByRole('button', { name: /Dashboard/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Scenarios/i }),
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Help/i })).toBeInTheDocument();
    });

    it('renders icons for each section', () => {
      render(<NavigationMenu sections={MOCK_SECTIONS} />);

      expect(screen.getAllByTestId('section-icon')).toHaveLength(
        MOCK_SECTIONS.length,
      );
    });

    it('renders nav items for sections that are open by default', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
        />,
      );

      expect(
        screen.getByRole('link', { name: 'Quick Start' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'Resume Session' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'Progress' }),
      ).toBeInTheDocument();
    });

    it('does not render items for sections that are closed by default', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
        />,
      );

      // Scenarios section is closed — its items are not in the DOM
      expect(
        screen.queryByRole('link', { name: 'MyQueue' }),
      ).not.toBeInTheDocument();
    });
  });

  // ── Expand / Collapse ───────────────────────────────────────────────────────

  describe('Expand / Collapse', () => {
    it('closed section trigger has aria-expanded="false"', () => {
      render(
        <NavigationMenu sections={MOCK_SECTIONS} defaultOpenSections={[]} />,
      );

      const trigger = screen.getByRole('button', { name: /Dashboard/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('open section trigger has aria-expanded="true"', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
        />,
      );

      const trigger = screen.getByRole('button', { name: /Dashboard/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('clicking a closed section opens it and shows its items', async () => {
      const user = userEvent.setup();
      render(
        <NavigationMenu sections={MOCK_SECTIONS} defaultOpenSections={[]} />,
      );

      const dashboardTrigger = screen.getByRole('button', {
        name: /Dashboard/i,
      });
      await user.click(dashboardTrigger);

      expect(dashboardTrigger).toHaveAttribute('aria-expanded', 'true');
      expect(
        screen.getByRole('link', { name: 'Quick Start' }),
      ).toBeInTheDocument();
    });

    it('clicking an open section closes it', async () => {
      const user = userEvent.setup();
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
        />,
      );

      const dashboardTrigger = screen.getByRole('button', {
        name: /Dashboard/i,
      });
      await user.click(dashboardTrigger);

      expect(dashboardTrigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('multiple sections can be open simultaneously', async () => {
      const user = userEvent.setup();
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
        />,
      );

      // Open Scenarios section too
      await user.click(screen.getByRole('button', { name: /Scenarios/i }));

      expect(
        screen.getByRole('button', { name: /Dashboard/i }),
      ).toHaveAttribute('aria-expanded', 'true');
      expect(
        screen.getByRole('button', { name: /Scenarios/i }),
      ).toHaveAttribute('aria-expanded', 'true');
      expect(
        screen.getByRole('link', { name: 'Quick Start' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'MyQueue' })).toBeInTheDocument();
    });

    it('all sections expand correctly when defaultOpenSections covers all values', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard', 'scenarios', 'help']}
        />,
      );

      expect(
        screen.getByRole('link', { name: 'Quick Start' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'MyQueue' })).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'How it Works' }),
      ).toBeInTheDocument();
    });
  });

  // ── Active Item ─────────────────────────────────────────────────────────────

  describe('Active Item', () => {
    it('active link has aria-current="page"', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
          activeHref="/dashboard/quick-start"
        />,
      );

      const activeLink = screen.getByRole('link', { name: 'Quick Start' });
      expect(activeLink).toHaveAttribute('aria-current', 'page');
    });

    it('active link has data-active="true"', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
          activeHref="/dashboard/quick-start"
        />,
      );

      const activeLink = screen.getByRole('link', { name: 'Quick Start' });
      expect(activeLink).toHaveAttribute('data-active', 'true');
    });

    it('non-active links do not have aria-current', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
          activeHref="/dashboard/quick-start"
        />,
      );

      const inactiveLink = screen.getByRole('link', { name: 'Resume Session' });
      expect(inactiveLink).not.toHaveAttribute('aria-current');
    });

    it('non-active links do not have data-active', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
          activeHref="/dashboard/quick-start"
        />,
      );

      const inactiveLink = screen.getByRole('link', { name: 'Resume Session' });
      expect(inactiveLink).not.toHaveAttribute('data-active');
    });

    it('only the matching href is marked active', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard', 'scenarios']}
          activeHref="/dashboard/progress"
        />,
      );

      const links = screen.getAllByRole('link');
      const activeLinks = links.filter((l) => l.hasAttribute('aria-current'));
      expect(activeLinks).toHaveLength(1);
      expect(activeLinks[0]).toHaveAccessibleName('Progress');
    });

    it('no link is marked active when activeHref does not match any item', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
          activeHref="/unmatched/path"
        />,
      );

      const links = screen.getAllByRole('link');
      for (const link of links) {
        expect(link).not.toHaveAttribute('aria-current');
      }
    });
  });

  // ── Navigation (onNavigate) ─────────────────────────────────────────────────

  describe('Navigation', () => {
    it('clicking a nav item calls onNavigate with the correct href', async () => {
      const user = userEvent.setup();
      const onNavigate = vi.fn();

      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
          onNavigate={onNavigate}
        />,
      );

      await user.click(screen.getByRole('link', { name: 'Quick Start' }));

      expect(onNavigate).toHaveBeenCalledWith('/dashboard/quick-start');
      expect(onNavigate).toHaveBeenCalledTimes(1);
    });

    it("clicking different items calls onNavigate with each item's href", async () => {
      const user = userEvent.setup();
      const onNavigate = vi.fn();

      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
          onNavigate={onNavigate}
        />,
      );

      await user.click(screen.getByRole('link', { name: 'Quick Start' }));
      await user.click(screen.getByRole('link', { name: 'Resume Session' }));

      expect(onNavigate).toHaveBeenNthCalledWith(1, '/dashboard/quick-start');
      expect(onNavigate).toHaveBeenNthCalledWith(
        2,
        '/dashboard/resume-session',
      );
    });

    it('default link href attribute matches the nav item href', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
        />,
      );

      const link = screen.getByRole('link', { name: 'Quick Start' });
      expect(link).toHaveAttribute('href', '/dashboard/quick-start');
    });
  });

  // ── Custom Link Renderer ────────────────────────────────────────────────────

  describe('Custom Link Renderer', () => {
    it('renders the element returned by renderLink', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
          renderLink={({ href, children, className }) =>
            React.createElement(
              'a',
              { href, className, 'data-custom': 'true' },
              children,
            )
          }
        />,
      );

      const link = screen.getByRole('link', { name: 'Quick Start' });
      expect(link).toHaveAttribute('data-custom', 'true');
    });

    it('passes isActive=true to renderLink for the matching href', () => {
      const renderLink = vi.fn(
        ({
          href,
          children,
        }: {
          href: string;
          children: React.ReactNode;
          isActive: boolean;
          className: string;
        }) => React.createElement('a', { href }, children),
      );

      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
          activeHref="/dashboard/quick-start"
          renderLink={renderLink}
        />,
      );

      const quickStartCall = renderLink.mock.calls.find(
        ([props]) => props.href === '/dashboard/quick-start',
      );
      expect(quickStartCall?.[0].isActive).toBe(true);
    });

    it('passes isActive=false to renderLink for non-matching hrefs', () => {
      const renderLink = vi.fn(
        ({
          href,
          children,
        }: {
          href: string;
          children: React.ReactNode;
          isActive: boolean;
          className: string;
        }) => React.createElement('a', { href }, children),
      );

      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
          activeHref="/dashboard/quick-start"
          renderLink={renderLink}
        />,
      );

      const resumeCall = renderLink.mock.calls.find(
        ([props]) => props.href === '/dashboard/resume-session',
      );
      expect(resumeCall?.[0].isActive).toBe(false);
    });

    it('passes the recipe className string to renderLink', () => {
      let receivedClassName = '';

      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
          renderLink={({ href, children, className }) => {
            receivedClassName = className;
            return React.createElement('a', { href }, children);
          }}
        />,
      );

      expect(typeof receivedClassName).toBe('string');
      expect(receivedClassName.length).toBeGreaterThan(0);
    });
  });

  // ── Accessibility ───────────────────────────────────────────────────────────

  describe('Accessibility', () => {
    it('passes axe audit with all sections open', async () => {
      const { container } = render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard', 'scenarios', 'help']}
          activeHref="/dashboard/quick-start"
          ariaLabel="Dashboard navigation"
        />,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe audit with all sections closed', async () => {
      const { container } = render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={[]}
          ariaLabel="Dashboard navigation"
        />,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('section triggers are keyboard-focusable buttons', () => {
      render(<NavigationMenu sections={MOCK_SECTIONS} />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(MOCK_SECTIONS.length);
      for (const btn of buttons) {
        expect(btn.tagName).toBe('BUTTON');
      }
    });

    it('nav items are rendered as links', () => {
      render(
        <NavigationMenu
          sections={MOCK_SECTIONS}
          defaultOpenSections={['dashboard']}
        />,
      );

      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link.tagName).toBe('A');
      }
    });
  });
});
