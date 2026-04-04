/* global describe, it, expect */
import React from 'react';
import { render } from '@testing-library/react';
import { Icon } from '../Icon';

describe('Icon', () => {
  it('renders as an svg element', () => {
    const { container } = render(<Icon />);
    expect(container.querySelector('svg')).toBeDefined();
  });

  it('renders children (inner SVG content)', () => {
    const { container } = render(
      <Icon>
        <circle cx="12" cy="12" r="10" />
      </Icon>,
    );
    expect(container.querySelector('circle')).toBeDefined();
  });

  it('accepts className passthrough', () => {
    const { container } = render(<Icon className="custom-icon" />);
    expect(container.querySelector('.custom-icon')).toBeDefined();
  });

  it('accepts aria-label for accessibility', () => {
    const { container } = render(<Icon aria-label="circle icon" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-label')).toBe('circle icon');
  });
});
