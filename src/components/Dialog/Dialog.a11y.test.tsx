import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Dialog } from './Dialog';

describe('Dialog accessibility', () => {
  it('has no accessibility violations when open', async () => {
    const { container } = render(
      <Dialog open={true} title="Accessible Dialog" description="This dialog should be accessible." />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper aria attributes', () => {
    render(
      <Dialog open={true} title="Test Title" description="Test Description" />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName('Test Title');
  });

  it('has no violations with custom content', async () => {
    const { container } = render(
      <Dialog open={true} title="Custom Dialog">
        <div>
          <p>This is custom dialog content.</p>
          <button type="button">Action Button</button>
        </div>
      </Dialog>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations for all sizes', async () => {
    const sizes = ['sm', 'md', 'lg', 'fullscreen'] as const;

    for (const size of sizes) {
      const { container } = render(
        <Dialog
          open={true}
          size={size}
          title={`${size} dialog`}
          description={`This is a ${size} dialog`}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('has no violations without close button', async () => {
    const { container } = render(
      <Dialog
        open={true}
        title="No Close Button"
        description="This dialog has no close button"
        showCloseButton={false}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with form content', async () => {
    const { container } = render(
      <Dialog open={true} title="Form Dialog">
        <form>
          <label htmlFor="name">
            Name
            <input id="name" type="text" placeholder="Enter your name" />
          </label>
          <label htmlFor="email">
            Email
            <input id="email" type="email" placeholder="email@example.com" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </Dialog>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has accessible close button', () => {
    render(<Dialog open={true} title="Test" closeLabel="Dismiss dialog" />);
    const closeButton = screen.getByRole('button', { name: /dismiss dialog/i });
    expect(closeButton).toHaveAccessibleName('Dismiss dialog');
  });

  it('has no violations with long content', async () => {
    const { container } = render(
      <Dialog open={true} title="Long Content Dialog">
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
        </div>
      </Dialog>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with interactive elements', async () => {
    const { container } = render(
      <Dialog open={true} title="Interactive Dialog">
        <div>
          <p>This dialog contains interactive elements:</p>
          <button type="button">Button 1</button>
          <button type="button">Button 2</button>
          <a href="#test">Link</a>
          <input type="text" placeholder="Input field" aria-label="Text input" />
        </div>
      </Dialog>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
