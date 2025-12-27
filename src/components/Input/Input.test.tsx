import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import { Input } from './Input';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders input correctly', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Username" />);
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Input helperText="Enter your username" />);
      expect(screen.getByText('Enter your username')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      render(<Input errorText="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders outlined variant', () => {
      render(<Input variant="outlined" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('input--variant_outlined');
    });

    it('renders filled variant', () => {
      render(<Input variant="filled" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('input--variant_filled');
    });

    it('uses outlined as default variant', () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('input--variant_outlined');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Input size="sm" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('input--size_sm');
    });

    it('renders medium size', () => {
      render(<Input size="md" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('input--size_md');
    });

    it('uses medium as default size', () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('input--size_md');
    });
  });

  describe('States', () => {
    it('handles error state', () => {
      render(<Input state="error" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('input--state_error');
    });

    it('handles disabled state', () => {
      render(<Input disabled data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toBeDisabled();
    });

    it('shows error text when provided', () => {
      render(<Input errorText="Error message" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('hides helper text when error text is shown', () => {
      render(<Input helperText="Helper" errorText="Error" />);
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('handles onChange events', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      await user.type(input, 'test');
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles onFocus events', async () => {
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);
      const input = screen.getByRole('textbox');
      input.focus();
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('handles onBlur events', async () => {
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);
      const input = screen.getByRole('textbox');
      input.focus();
      input.blur();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('updates value on user input', async () => {
      const user = userEvent.setup();
      render(<Input data-testid="input" />);
      const input = screen.getByTestId('input') as HTMLInputElement;
      await user.type(input, 'Hello');
      expect(input.value).toBe('Hello');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe('INPUT');
    });

    it('allows ref to access input methods', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current?.focus).toBeDefined();
      expect(ref.current?.select).toBeDefined();
    });
  });

  describe('HTML Attributes', () => {
    it('accepts type attribute', () => {
      render(<Input type="email" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('accepts placeholder attribute', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('accepts required attribute', () => {
      render(<Input required data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toBeRequired();
    });

    it('accepts value and defaultValue', () => {
      render(<Input defaultValue="Initial" data-testid="input" />);
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.value).toBe('Initial');
    });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Input data-testid="input" />);
      const input = screen.getByTestId('input');
      await user.tab();
      expect(input).toHaveFocus();
    });

    it('associates label with input', () => {
      render(<Input label="Email" />);
      const label = screen.getByText('Email');
      const input = screen.getByLabelText('Email');
      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });

    it('has correct role', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('Variant and Size combinations', () => {
    it('applies both variant and size classes', () => {
      render(<Input variant="filled" size="sm" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('input--variant_filled');
      expect(input).toHaveClass('input--size_sm');
    });
  });
});
