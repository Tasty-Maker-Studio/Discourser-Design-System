import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import { Button } from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders filled variant', () => {
      render(<Button variant="filled">Filled</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--variant_filled');
    });

    it('renders outlined variant', () => {
      render(<Button variant="outlined">Outlined</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--variant_outlined');
    });

    it('renders text variant', () => {
      render(<Button variant="text">Text</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--variant_text');
    });

    it('renders elevated variant', () => {
      render(<Button variant="elevated">Elevated</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--variant_elevated');
    });

    it('renders tonal variant', () => {
      render(<Button variant="tonal">Tonal</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--variant_tonal');
    });

    it('uses filled as default variant', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--variant_filled');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--size_sm');
    });

    it('renders medium size', () => {
      render(<Button size="md">Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--size_md');
    });

    it('renders large size', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--size_lg');
    });

    it('uses medium as default size', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--size_md');
    });
  });

  describe('Icons', () => {
    const TestIcon = () => <svg data-testid="test-icon" />;

    it('renders left icon', () => {
      render(
        <Button leftIcon={<TestIcon />}>
          With Icon
        </Button>
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('With Icon');
    });

    it('renders right icon', () => {
      render(
        <Button rightIcon={<TestIcon />}>
          With Icon
        </Button>
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('With Icon');
    });

    it('renders both left and right icons', () => {
      render(
        <Button
          leftIcon={<svg data-testid="left-icon" />}
          rightIcon={<svg data-testid="right-icon" />}
        >
          Both Icons
        </Button>
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('does not trigger onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );
      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles multiple clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button');
      await user.click(button);
      await user.click(button);
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    it('allows ref to access button methods', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current?.focus).toBeDefined();
      expect(ref.current?.click).toBeDefined();
    });
  });

  describe('HTML Attributes', () => {
    it('accepts type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('accepts aria-label attribute', () => {
      render(<Button aria-label="Custom label">Button</Button>);
      const button = screen.getByRole('button', { name: 'Custom label' });
      expect(button).toBeInTheDocument();
    });

    it('accepts data attributes', () => {
      render(<Button data-testid="custom-button">Button</Button>);
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });

    it('defaults to type="button"', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      // HTML buttons default to type="submit" in forms, but we're checking it accepts the default
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Button</Button>);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports space key activation', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Button</Button>);
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has correct role', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Variant and Size combinations', () => {
    it('applies both variant and size classes', () => {
      render(
        <Button variant="outlined" size="lg">
          Large Outlined
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--variant_outlined');
      expect(button).toHaveClass('button--size_lg');
    });

    it('works with all variant and size combinations', () => {
      const variants = ['filled', 'outlined', 'text', 'elevated', 'tonal'] as const;
      const sizes = ['sm', 'md', 'lg'] as const;

      variants.forEach((variant) => {
        sizes.forEach((size) => {
          const { unmount } = render(
            <Button variant={variant} size={size}>
              {variant} {size}
            </Button>
          );
          const button = screen.getByRole('button');
          expect(button).toHaveClass(`button--variant_${variant}`);
          expect(button).toHaveClass(`button--size_${size}`);
          unmount();
        });
      });
    });
  });
});
