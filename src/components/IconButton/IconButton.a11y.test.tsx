import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IconButton } from './IconButton';

describe('IconButton accessibility', () => {
  it('has no accessibility violations with aria-label', async () => {
    const { container } = render(
      <IconButton aria-label="Close dialog">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </IconButton>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when disabled', async () => {
    const { container } = render(
      <IconButton disabled aria-label="Disabled button">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </IconButton>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations for all variants', async () => {
    const variants = ['standard', 'filled', 'tonal', 'outlined'] as const;

    for (const variant of variants) {
      const { container } = render(
        <IconButton variant={variant} aria-label={`${variant} button`}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </IconButton>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('has no violations for all sizes', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const { container } = render(
        <IconButton size={size} aria-label={`${size} button`}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </IconButton>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('has no violations with different icon types', async () => {
    const icons = [
      {
        label: 'Menu icon',
        svg: (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        ),
      },
      {
        label: 'Search icon',
        svg: (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        ),
      },
      {
        label: 'Heart icon',
        svg: (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 21C12 21 5 15 5 9C5 5 8 3 12 7C16 3 19 5 19 9C19 15 12 21 12 21Z" />
          </svg>
        ),
      },
    ];

    for (const icon of icons) {
      const { container } = render(
        <IconButton aria-label={icon.label}>{icon.svg}</IconButton>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('has no violations for all variant and size combinations', async () => {
    const variants = ['standard', 'filled'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const variant of variants) {
      for (const size of sizes) {
        const { container } = render(
          <IconButton
            variant={variant}
            size={size}
            aria-label={`${variant} ${size} button`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </IconButton>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    }
  });
});
