import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from './Button';

describe('Button accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when disabled', async () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations for all variants', async () => {
    const variants = ['filled', 'outlined', 'text', 'elevated', 'tonal'] as const;

    for (const variant of variants) {
      const { container } = render(<Button variant={variant}>Test</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('has no violations for all sizes', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const { container } = render(<Button size={size}>Test</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('has no violations with left icon', async () => {
    const { container } = render(
      <Button leftIcon={<span>←</span>}>With Left Icon</Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with right icon', async () => {
    const { container } = render(
      <Button rightIcon={<span>→</span>}>With Right Icon</Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with both icons', async () => {
    const { container } = render(
      <Button leftIcon={<span>←</span>} rightIcon={<span>→</span>}>
        With Both Icons
      </Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations for all variant and size combinations', async () => {
    const variants = ['filled', 'outlined', 'text'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const variant of variants) {
      for (const size of sizes) {
        const { container } = render(
          <Button variant={variant} size={size}>
            Test
          </Button>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    }
  });
});
