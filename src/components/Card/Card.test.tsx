import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import { Card } from './Card';

describe('Card', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Card>
          <h2>Card Title</h2>
          <p>Card content</p>
        </Card>
      );
      expect(screen.getByRole('heading', { name: 'Card Title' })).toBeInTheDocument();
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <Card className="custom-class" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders elevated variant', () => {
      render(
        <Card variant="elevated" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--variant_elevated');
    });

    it('renders filled variant', () => {
      render(
        <Card variant="filled" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--variant_filled');
    });

    it('renders outlined variant', () => {
      render(
        <Card variant="outlined" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--variant_outlined');
    });

    it('uses elevated as default variant', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--variant_elevated');
    });
  });

  describe('Interactive state', () => {
    it('renders non-interactive card by default', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--interactive_false');
    });

    it('renders interactive card when interactive is true', () => {
      render(
        <Card interactive data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--interactive_true');
    });
  });

  describe('Interactions', () => {
    it('handles click events when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Card interactive onClick={handleClick} data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles click events when not interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Card onClick={handleClick} data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles multiple clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Card interactive onClick={handleClick} data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      await user.click(card);
      await user.click(card);
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to div element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Card ref={ref}>Content</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.tagName).toBe('DIV');
    });

    it('allows ref to access div properties', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Card ref={ref}>Content</Card>);
      expect(ref.current?.click).toBeDefined();
      expect(ref.current?.getAttribute).toBeDefined();
    });
  });

  describe('HTML Attributes', () => {
    it('accepts role attribute', () => {
      render(
        <Card role="article" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('role', 'article');
    });

    it('accepts aria-label attribute', () => {
      render(
        <Card aria-label="Product card" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('aria-label', 'Product card');
    });

    it('accepts data attributes', () => {
      render(<Card data-testid="custom-card">Content</Card>);
      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });

    it('accepts style prop', () => {
      render(
        <Card style={{ width: '300px' }} data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveStyle({ width: '300px' });
    });
  });

  describe('Variant and Interactive combinations', () => {
    it('applies both variant and interactive classes', () => {
      render(
        <Card variant="filled" interactive data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('card--variant_filled');
      expect(card).toHaveClass('card--interactive_true');
    });

    it('works with all variant and interactive combinations', () => {
      const variants = ['elevated', 'filled', 'outlined'] as const;
      const interactiveStates = [true, false];

      variants.forEach((variant) => {
        interactiveStates.forEach((interactive) => {
          const { unmount } = render(
            <Card variant={variant} interactive={interactive} data-testid="card">
              {variant} {interactive ? 'interactive' : 'static'}
            </Card>
          );
          const card = screen.getByTestId('card');
          expect(card).toHaveClass(`card--variant_${variant}`);
          expect(card).toHaveClass(`card--interactive_${interactive}`);
          unmount();
        });
      });
    });
  });

  describe('Content flexibility', () => {
    it('renders complex nested content', () => {
      render(
        <Card>
          <header>
            <h1>Title</h1>
          </header>
          <main>
            <p>Body content</p>
          </main>
          <footer>
            <button>Action</button>
          </footer>
        </Card>
      );
      expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
      expect(screen.getByText('Body content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('renders with images', () => {
      render(
        <Card>
          <img src="/test.jpg" alt="Test" />
          <p>Caption</p>
        </Card>
      );
      expect(screen.getByAltText('Test')).toBeInTheDocument();
      expect(screen.getByText('Caption')).toBeInTheDocument();
    });

    it('renders with multiple children', () => {
      render(
        <Card>
          <div>First</div>
          <div>Second</div>
          <div>Third</div>
        </Card>
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.getByText('Third')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Card
          interactive
          onClick={handleClick}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
          data-testid="card"
        >
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      card.focus();
      expect(card).toHaveFocus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('accepts tabIndex attribute', () => {
      render(
        <Card tabIndex={0} data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('tabIndex', '0');
    });
  });
});
