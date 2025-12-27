import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import { IconButton } from './IconButton';

const TestIcon = () => <svg data-testid="test-icon" />;

describe('IconButton', () => {
  describe('Rendering', () => {
    it('renders icon correctly', () => {
      render(
        <IconButton aria-label="Test button">
          <TestIcon />
        </IconButton>
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <IconButton aria-label="Test button" className="custom-class">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('requires aria-label prop', () => {
      render(
        <IconButton aria-label="Required label">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button', { name: 'Required label' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders standard variant', () => {
      render(
        <IconButton variant="standard" aria-label="Standard">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('icon-button--variant_standard');
    });

    it('renders filled variant', () => {
      render(
        <IconButton variant="filled" aria-label="Filled">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('icon-button--variant_filled');
    });

    it('renders tonal variant', () => {
      render(
        <IconButton variant="tonal" aria-label="Tonal">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('icon-button--variant_tonal');
    });

    it('renders outlined variant', () => {
      render(
        <IconButton variant="outlined" aria-label="Outlined">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('icon-button--variant_outlined');
    });

    it('uses standard as default variant', () => {
      render(
        <IconButton aria-label="Default">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('icon-button--variant_standard');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(
        <IconButton size="sm" aria-label="Small">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('icon-button--size_sm');
    });

    it('renders medium size', () => {
      render(
        <IconButton size="md" aria-label="Medium">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('icon-button--size_md');
    });

    it('renders large size', () => {
      render(
        <IconButton size="lg" aria-label="Large">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('icon-button--size_lg');
    });

    it('uses medium as default size', () => {
      render(
        <IconButton aria-label="Default">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('icon-button--size_md');
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(
        <IconButton disabled aria-label="Disabled">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('does not trigger onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton disabled onClick={handleClick} aria-label="Disabled">
          <TestIcon />
        </IconButton>
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
      render(
        <IconButton onClick={handleClick} aria-label="Clickable">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles multiple clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton onClick={handleClick} aria-label="Clickable">
          <TestIcon />
        </IconButton>
      );
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
      render(
        <IconButton ref={ref} aria-label="Button">
          <TestIcon />
        </IconButton>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    it('allows ref to access button methods', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <IconButton ref={ref} aria-label="Button">
          <TestIcon />
        </IconButton>
      );
      expect(ref.current?.focus).toBeDefined();
      expect(ref.current?.click).toBeDefined();
    });
  });

  describe('HTML Attributes', () => {
    it('accepts type attribute', () => {
      render(
        <IconButton type="submit" aria-label="Submit">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('accepts aria-label attribute', () => {
      render(
        <IconButton aria-label="Custom label">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button', { name: 'Custom label' });
      expect(button).toBeInTheDocument();
    });

    it('accepts data attributes', () => {
      render(
        <IconButton data-testid="custom-icon-button" aria-label="Button">
          <TestIcon />
        </IconButton>
      );
      expect(screen.getByTestId('custom-icon-button')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton onClick={handleClick} aria-label="Button">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports space key activation', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton onClick={handleClick} aria-label="Button">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has correct role', () => {
      render(
        <IconButton aria-label="Button">
          <TestIcon />
        </IconButton>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('provides accessible name via aria-label', () => {
      render(
        <IconButton aria-label="Settings">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button', { name: 'Settings' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAccessibleName('Settings');
    });
  });

  describe('Variant and Size combinations', () => {
    it('applies both variant and size classes', () => {
      render(
        <IconButton variant="outlined" size="lg" aria-label="Large Outlined">
          <TestIcon />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('icon-button--variant_outlined');
      expect(button).toHaveClass('icon-button--size_lg');
    });

    it('works with all variant and size combinations', () => {
      const variants = ['standard', 'filled', 'tonal', 'outlined'] as const;
      const sizes = ['sm', 'md', 'lg'] as const;

      variants.forEach((variant) => {
        sizes.forEach((size) => {
          const { unmount } = render(
            <IconButton variant={variant} size={size} aria-label={`${variant} ${size}`}>
              <TestIcon />
            </IconButton>
          );
          const button = screen.getByRole('button');
          expect(button).toHaveClass(`icon-button--variant_${variant}`);
          expect(button).toHaveClass(`icon-button--size_${size}`);
          unmount();
        });
      });
    });
  });

  describe('Icon rendering', () => {
    it('renders SVG icon', () => {
      render(
        <IconButton aria-label="Icon">
          <svg data-testid="svg-icon" />
        </IconButton>
      );
      expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
    });

    it('renders multiple elements as icon', () => {
      render(
        <IconButton aria-label="Complex icon">
          <div data-testid="icon-wrapper">
            <svg data-testid="svg-part" />
            <span data-testid="text-part">+1</span>
          </div>
        </IconButton>
      );
      expect(screen.getByTestId('icon-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('svg-part')).toBeInTheDocument();
      expect(screen.getByTestId('text-part')).toBeInTheDocument();
    });
  });
});
