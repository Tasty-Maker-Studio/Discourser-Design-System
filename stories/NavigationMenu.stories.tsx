import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { css } from '../styled-system/css';
import { NavigationMenu } from '../src/components/NavigationMenu';
import type { NavSection } from '../src/components/NavigationMenu';
import {
  DashboardIcon,
  NotebookIcon,
  ScenarioIcon,
  HelpIcon,
  AccountIcon,
} from '../src/components/Icons';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

// ── Mock data ──────────────────────────────────────────────────────────────────

const ALL_SECTIONS: NavSection[] = [
  {
    value: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    items: [
      { label: 'Quick Start', href: '/dashboard/quick-start' },
      { label: 'Resume Session', href: '/dashboard/resume-session' },
      { label: 'Progress', href: '/dashboard/progress' },
      { label: 'Momentum', href: '/dashboard/momentum' },
      { label: 'Recent Session', href: '/dashboard/recent-session' },
    ],
  },
  {
    value: 'my-notebook',
    title: 'MyNotebook',
    icon: <NotebookIcon />,
    items: [
      { label: 'Knowledge Base', href: '/notebook/knowledge-base' },
      { label: 'Session Library', href: '/notebook/session-library' },
      { label: 'Decision Patterns', href: '/notebook/decision-patterns' },
      { label: 'Personal Insights', href: '/notebook/personal-insights' },
    ],
  },
  {
    value: 'scenarios',
    title: 'Scenarios',
    icon: <ScenarioIcon />,
    items: [
      { label: 'MyQueue', href: '/scenarios/my-queue' },
      { label: 'Conversation Studio', href: '/scenarios/conversation-studio' },
      { label: 'Studio Setup', href: '/scenarios/studio-setup' },
      { label: 'By Level', href: '/scenarios/by-level' },
      { label: 'By Skill', href: '/scenarios/by-skill' },
    ],
  },
  {
    value: 'help',
    title: 'Help',
    icon: <HelpIcon />,
    items: [
      { label: 'How it Works', href: '/help/how-it-works' },
      { label: 'Practice Tips', href: '/help/practice-tips' },
      { label: 'Technical Support', href: '/help/technical-support' },
      { label: 'Context', href: '/help/context' },
      { label: 'Contact Support', href: '/help/contact-support' },
    ],
  },
  {
    value: 'account',
    title: 'Account',
    icon: <AccountIcon />,
    items: [
      { label: 'Profile', href: '/account/profile' },
      { label: 'User Preferences', href: '/account/preferences' },
    ],
  },
];

// ── Panel wrapper matching a typical sidebar width ─────────────────────────────

const panelClass = css({
  width: '240px',
  overflow: 'auto',
});

// ── Stories ───────────────────────────────────────────────────────────────────

/**
 * All sections expanded — full view for design review.
 */
export const AllSectionsOpen: Story = {
  render: () => (
    <div className={panelClass}>
      <NavigationMenu
        sections={ALL_SECTIONS}
        defaultOpenSections={[
          'dashboard',
          'my-notebook',
          'scenarios',
          'help',
          'account',
        ]}
        activeHref="/scenarios/my-queue"
        ariaLabel="Dashboard navigation"
      />
    </div>
  ),
};

/**
 * Default view: all sections, Dashboard open, no active item.
 */
export const Default: Story = {
  render: () => (
    <div className={panelClass}>
      <NavigationMenu
        sections={ALL_SECTIONS}
        defaultOpenSections={['dashboard']}
        ariaLabel="Dashboard navigation"
      />
    </div>
  ),
};

/**
 * Active item highlighted — Scenarios open with MyQueue marked active.
 */
export const WithActiveItem: Story = {
  render: () => (
    <div className={panelClass}>
      <NavigationMenu
        sections={ALL_SECTIONS}
        defaultOpenSections={['scenarios']}
        activeHref="/scenarios/my-queue"
        ariaLabel="Dashboard navigation"
      />
    </div>
  ),
};

/**
 * Multiple sections open simultaneously — Dashboard and Scenarios expanded.
 */
export const MultipleOpen: Story = {
  render: () => (
    <div className={panelClass}>
      <NavigationMenu
        sections={ALL_SECTIONS}
        defaultOpenSections={['dashboard', 'scenarios']}
        activeHref="/dashboard/progress"
        ariaLabel="Dashboard navigation"
      />
    </div>
  ),
};

/**
 * Custom link renderer — simulates how a Next.js consumer would provide
 * their own Link component. Clicks are logged to the console.
 */
export const WithCustomLinkRenderer: Story = {
  render: () => {
    const [lastClicked, setLastClicked] = useState<string | null>(null);

    return (
      <div className={panelClass}>
        <div
          className={css({
            fontSize: 'xs',
            color: 'onSurface.variant',
            p: 'xs',
            mb: 'xs',
            borderRadius: 'sm',
            bg: 'surface.container',
            fontFamily: 'mono',
          })}
        >
          {lastClicked ? `navigated → ${lastClicked}` : 'click a nav item'}
        </div>
        <NavigationMenu
          sections={ALL_SECTIONS}
          defaultOpenSections={['dashboard']}
          activeHref={lastClicked ?? undefined}
          ariaLabel="Dashboard navigation"
          renderLink={({ href, children, isActive, className }) => (
            // Simulates a Next.js <Link> — consumer owns the anchor element
            <a
              href={href}
              aria-current={isActive ? 'page' : undefined}
              data-active={isActive || undefined}
              className={className}
              onClick={(e) => {
                e.preventDefault();
                console.log('navigate to:', href);
                setLastClicked(href);
              }}
            >
              {children}
            </a>
          )}
        />
      </div>
    );
  },
};

/**
 * Single section — minimal data to verify the component works with one section.
 */
export const SingleSection: Story = {
  render: () => (
    <div className={panelClass}>
      <NavigationMenu
        sections={[ALL_SECTIONS[2]]}
        defaultOpenSections={['scenarios']}
        activeHref="/scenarios/by-level"
        ariaLabel="Scenarios navigation"
      />
    </div>
  ),
};
