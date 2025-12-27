import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Card } from './Card';

describe('Card accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Card>
        <h2>Card Title</h2>
        <p>Card content goes here</p>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations for all variants', async () => {
    const variants = ['elevated', 'filled', 'outlined'] as const;

    for (const variant of variants) {
      const { container } = render(
        <Card variant={variant}>
          <h2>Card Title</h2>
          <p>Card content</p>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('has no violations for interactive cards', async () => {
    const { container} = render(
      <Card interactive>
        <h2>Interactive Card</h2>
        <p>Clickable card content</p>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with onClick handler', async () => {
    const { container } = render(
      <Card onClick={() => {}}>
        <h2>Clickable Card</h2>
        <p>Card with onClick</p>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with proper semantic structure', async () => {
    const { container } = render(
      <Card>
        <article>
          <header>
            <h2>Article Title</h2>
          </header>
          <section>
            <p>Article content with proper semantic HTML structure</p>
          </section>
          <footer>
            <small>Published on Jan 1, 2025</small>
          </footer>
        </article>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with images and alt text', async () => {
    const { container } = render(
      <Card>
        <img src="/test.jpg" alt="Descriptive alt text" />
        <h2>Card with Image</h2>
        <p>Image has proper alt text for accessibility</p>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with links', async () => {
    const { container } = render(
      <Card>
        <h2>Card Title</h2>
        <p>
          This card contains a <a href="/test">link to another page</a>.
        </p>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
