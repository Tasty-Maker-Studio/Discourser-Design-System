/* global describe, it, expect */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AbsoluteCenter } from '../AbsoluteCenter';

describe('AbsoluteCenter', () => {
  it('renders children', () => {
    render(<AbsoluteCenter>Centered content</AbsoluteCenter>);
    expect(screen.getByText('Centered content')).toBeDefined();
  });

  it('renders as a div element', () => {
    const { container } = render(<AbsoluteCenter>Content</AbsoluteCenter>);
    expect(container.querySelector('div')).toBeDefined();
  });

  it('accepts and passes through className', () => {
    const { container } = render(
      <AbsoluteCenter className="custom-class">Content</AbsoluteCenter>,
    );
    const el = container.querySelector('.custom-class');
    expect(el).toBeDefined();
  });

  it('accepts and forwards arbitrary HTML attributes', () => {
    render(
      <AbsoluteCenter data-testid="absolute-center">Content</AbsoluteCenter>,
    );
    expect(screen.getByTestId('absolute-center')).toBeDefined();
  });
});
