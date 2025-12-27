import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Switch } from './Switch';

describe('Switch accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Switch label="Enable feature" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when checked', async () => {
    const { container } = render(<Switch label="Enabled feature" defaultChecked />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when disabled', async () => {
    const { container } = render(<Switch label="Disabled switch" disabled />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations for all sizes', async () => {
    const sizes = ['sm', 'md'] as const;

    for (const size of sizes) {
      const { container } = render(<Switch size={size} label={`${size} switch`} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  // Note: Switch without a label fails accessibility - this is expected behavior
  // Always provide a label for switches in production
});
