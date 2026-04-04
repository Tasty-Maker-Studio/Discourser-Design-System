/* global describe, it, expect */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SettingsPopover } from '../SettingsPopover';

const defaultProps = {
  userName: 'Jane Doe',
  userTier: 'Pro',
  userEmail: 'jane@example.com',
  actions: [{ key: 'logout', label: 'Logout', onClick: () => {} }],
};

describe('SettingsPopover', () => {
  it('renders the trigger button with userName', () => {
    render(<SettingsPopover {...defaultProps} />);
    expect(screen.getByText('Jane Doe')).toBeDefined();
  });

  it('renders userTier in the trigger', () => {
    render(<SettingsPopover {...defaultProps} />);
    expect(screen.getByText('Pro')).toBeDefined();
  });

  it('trigger button has correct aria-label (default: "User settings")', () => {
    render(<SettingsPopover {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'User settings' })).toBeDefined();
  });

  it('accepts custom ariaLabel prop', () => {
    render(<SettingsPopover {...defaultProps} ariaLabel="Account menu" />);
    expect(screen.getByRole('button', { name: 'Account menu' })).toBeDefined();
  });

  it('renders the trigger as a button element', () => {
    render(<SettingsPopover {...defaultProps} />);
    const btn = screen.getByRole('button', { name: 'User settings' });
    expect(btn.tagName.toLowerCase()).toBe('button');
  });
});
