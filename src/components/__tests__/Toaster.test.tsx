/* global describe, it, expect */
import React from 'react';
import { render } from '@testing-library/react';
import { Toaster, toaster } from '../Toast';

describe('Toaster', () => {
  it('toaster imperative API exists and is not null', () => {
    expect(toaster).toBeDefined();
    expect(toaster).not.toBeNull();
  });

  it('toaster has a create method', () => {
    expect(typeof toaster.create).toBe('function');
  });

  it('Toaster is a function (renderable component)', () => {
    expect(typeof Toaster).toBe('function');
  });

  it('renders without crashing', () => {
    const { container } = render(<Toaster />);
    expect(container).toBeDefined();
  });
});
