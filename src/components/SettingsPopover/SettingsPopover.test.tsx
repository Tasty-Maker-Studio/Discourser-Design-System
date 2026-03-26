/* global describe, it, expect, vi */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { SettingsPopover } from './SettingsPopover';
import type { SettingsPopoverAction } from './types';

// ── Mock icon ─────────────────────────────────────────────────────────────────
const MockIcon = () =>
  React.createElement('svg', { 'data-testid': 'action-icon' });

// ── Fixtures ──────────────────────────────────────────────────────────────────
const MOCK_ACTIONS: SettingsPopoverAction[] = [
  {
    key: 'logout',
    label: 'Logout',
    icon: React.createElement(MockIcon),
    onClick: vi.fn(),
  },
];

const defaultProps = {
  userName: 'Will Streeter',
  userTier: 'Free Trial',
  userEmail: 'w.streeter+002@tastymakers.io',
  actions: MOCK_ACTIONS,
};

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('SettingsPopover', () => {
  // ── Trigger Rendering ────────────────────────────────────────────────────
  describe('Trigger', () => {
    it('renders a trigger button with the provided aria-label', () => {
      render(
        <SettingsPopover {...defaultProps} ariaLabel="Account settings" />,
      );
      expect(
        screen.getByRole('button', { name: 'Account settings' }),
      ).toBeInTheDocument();
    });

    it('defaults aria-label to "User settings"', () => {
      render(<SettingsPopover {...defaultProps} />);
      expect(
        screen.getByRole('button', { name: 'User settings' }),
      ).toBeInTheDocument();
    });

    it('displays the user name on the trigger', () => {
      render(<SettingsPopover {...defaultProps} />);
      expect(screen.getByText('Will Streeter')).toBeInTheDocument();
    });

    it('displays the user tier on the trigger', () => {
      render(<SettingsPopover {...defaultProps} />);
      expect(screen.getByText('Free Trial')).toBeInTheDocument();
    });
  });

  // ── Popover Open / Close ─────────────────────────────────────────────────
  describe('Popover Toggle', () => {
    it('popover content is not visible initially', () => {
      render(<SettingsPopover {...defaultProps} />);
      expect(
        screen.queryByText(defaultProps.userEmail),
      ).not.toBeInTheDocument();
    });

    it('clicking the trigger opens the popover and shows the email', async () => {
      const user = userEvent.setup();
      render(<SettingsPopover {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: 'User settings' }));

      await waitFor(() => {
        expect(screen.getByText(defaultProps.userEmail)).toBeInTheDocument();
      });
    });

    it('clicking the trigger again closes the popover', async () => {
      const user = userEvent.setup();
      render(<SettingsPopover {...defaultProps} />);

      const trigger = screen.getByRole('button', { name: 'User settings' });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText(defaultProps.userEmail)).toBeInTheDocument();
      });

      await user.click(trigger);

      await waitFor(() => {
        expect(
          screen.queryByText(defaultProps.userEmail),
        ).not.toBeInTheDocument();
      });
    });
  });

  // ── Popover Content ──────────────────────────────────────────────────────
  describe('Popover Content', () => {
    it('displays the user email in the popover card', async () => {
      const user = userEvent.setup();
      render(<SettingsPopover {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: 'User settings' }));

      await waitFor(() => {
        expect(screen.getByText(defaultProps.userEmail)).toBeInTheDocument();
      });
    });

    it('renders all action items', async () => {
      const user = userEvent.setup();
      render(<SettingsPopover {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: 'User settings' }));

      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument();
      });
    });

    it('renders action icons when provided', async () => {
      const user = userEvent.setup();
      render(<SettingsPopover {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: 'User settings' }));

      await waitFor(() => {
        expect(screen.getByTestId('action-icon')).toBeInTheDocument();
      });
    });

    it('renders actions without icons when icon is not provided', async () => {
      const user = userEvent.setup();
      const actionsNoIcon: SettingsPopoverAction[] = [
        { key: 'logout', label: 'Logout', onClick: vi.fn() },
      ];
      render(<SettingsPopover {...defaultProps} actions={actionsNoIcon} />);

      await user.click(screen.getByRole('button', { name: 'User settings' }));

      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument();
      });
    });
  });

  // ── Actions ──────────────────────────────────────────────────────────────
  describe('Actions', () => {
    it('clicking an action calls its onClick handler', async () => {
      const user = userEvent.setup();
      const onLogout = vi.fn();
      const actions: SettingsPopoverAction[] = [
        { key: 'logout', label: 'Logout', onClick: onLogout },
      ];
      render(<SettingsPopover {...defaultProps} actions={actions} />);

      await user.click(screen.getByRole('button', { name: 'User settings' }));

      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Logout'));
      expect(onLogout).toHaveBeenCalledTimes(1);
    });

    it('renders multiple actions', async () => {
      const user = userEvent.setup();
      const actions: SettingsPopoverAction[] = [
        { key: 'logout', label: 'Logout', onClick: vi.fn() },
        { key: 'settings', label: 'Settings', onClick: vi.fn() },
      ];
      render(<SettingsPopover {...defaultProps} actions={actions} />);

      await user.click(screen.getByRole('button', { name: 'User settings' }));

      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
      });
    });
  });

  // ── Avatar ───────────────────────────────────────────────────────────────
  describe('Avatar', () => {
    it('renders an avatar element in the trigger', () => {
      const { container } = render(<SettingsPopover {...defaultProps} />);
      // Avatar.Root renders a span with data-scope="avatar"
      expect(
        container.querySelector('[data-scope="avatar"]'),
      ).toBeInTheDocument();
    });

    it('uses custom avatarFallback when provided', () => {
      render(
        <SettingsPopover
          {...defaultProps}
          avatarFallback={React.createElement(
            'span',
            { 'data-testid': 'custom-fallback' },
            'WS',
          )}
        />,
      );
      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    });
  });

  // ── Accessibility ────────────────────────────────────────────────────────
  describe('Accessibility', () => {
    it('passes axe audit in closed state', async () => {
      const { container } = render(<SettingsPopover {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes axe audit in open state', async () => {
      const user = userEvent.setup();
      const { container } = render(<SettingsPopover {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: 'User settings' }));

      await waitFor(() => {
        expect(screen.getByText(defaultProps.userEmail)).toBeInTheDocument();
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('trigger is keyboard-focusable', () => {
      render(<SettingsPopover {...defaultProps} />);
      const trigger = screen.getByRole('button', { name: 'User settings' });
      expect(trigger.tagName).toBe('BUTTON');
    });

    it('action buttons inside the popover are keyboard-focusable', async () => {
      const user = userEvent.setup();
      render(<SettingsPopover {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: 'User settings' }));

      await waitFor(() => {
        const logoutButton = screen.getByText('Logout').closest('button');
        expect(logoutButton).toBeInTheDocument();
        expect(logoutButton?.tagName).toBe('BUTTON');
      });
    });
  });
});
