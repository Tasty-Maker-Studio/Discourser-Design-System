/* global describe, it, expect */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Group } from '../Group';

describe('Group', () => {
  it('renders children', () => {
    render(<Group>Child content</Group>);
    expect(screen.getByText('Child content')).toBeDefined();
  });

  it('renders as a div', () => {
    const { container } = render(<Group>Content</Group>);
    expect(container.querySelector('div')).toBeDefined();
  });

  it('accepts data-testid', () => {
    render(<Group data-testid="my-group">Content</Group>);
    expect(screen.getByTestId('my-group')).toBeDefined();
  });

  it('renders all children', () => {
    render(
      <Group>
        <span>First</span>
        <span>Second</span>
        <span>Third</span>
      </Group>,
    );
    expect(screen.getByText('First')).toBeDefined();
    expect(screen.getByText('Second')).toBeDefined();
    expect(screen.getByText('Third')).toBeDefined();
  });
});
