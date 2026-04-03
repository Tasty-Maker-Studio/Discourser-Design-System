/* global describe, it, expect */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Divider } from '../divider';

describe('Divider', () => {
  it('renders a div with role="separator" by default', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeDefined();
  });

  it('has aria-orientation="horizontal" by default', () => {
    render(<Divider />);
    const el = screen.getByRole('separator');
    expect(el.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('renders label text when label prop is provided', () => {
    render(<Divider label="OR" />);
    expect(screen.getByText('OR')).toBeDefined();
  });

  it('renders aria-orientation="vertical" when orientation="vertical"', () => {
    render(<Divider orientation="vertical" />);
    const el = screen.getByRole('separator');
    expect(el.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('renders without label when no label prop provided', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('span')).toBeNull();
  });

  it('accepts className passthrough', () => {
    const { container } = render(<Divider className="my-divider" />);
    expect(container.querySelector('.my-divider')).toBeDefined();
  });
});
