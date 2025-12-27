import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('Rendering', () => {
    it('renders switch correctly', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Switch label="Enable notifications" />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });

    it('renders without label', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const { container } = render(<Switch size="sm" />);
      const root = container.querySelector('.switchControl__root--size_sm');
      expect(root).toBeInTheDocument();
    });

    it('renders medium size', () => {
      const { container } = render(<Switch size="md" />);
      const root = container.querySelector('.switchControl__root--size_md');
      expect(root).toBeInTheDocument();
    });

    it('uses medium as default size', () => {
      const { container } = render(<Switch />);
      const root = container.querySelector('.switchControl__root--size_md');
      expect(root).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles checked state', () => {
      render(<Switch defaultChecked />);
      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).toBeChecked();
    });

    it('handles unchecked state', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).not.toBeChecked();
    });

    it('handles disabled state', () => {
      render(<Switch disabled />);
      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).toBeDisabled();
    });

    it('can be disabled while checked', () => {
      render(<Switch defaultChecked disabled />);
      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).toBeChecked();
      expect(switchElement).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('handles toggle on click', async () => {
      const user = userEvent.setup();
      render(<Switch label="Toggle me" />);

      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).not.toBeChecked();

      await user.click(switchElement);
      expect(switchElement).toBeChecked();

      await user.click(switchElement);
      expect(switchElement).not.toBeChecked();
    });

    it('calls onCheckedChange when toggled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch onCheckedChange={handleChange} />);

      const switchElement = screen.getByRole('checkbox');
      await user.click(switchElement);

      expect(handleChange).toHaveBeenCalledWith({ checked: true });
    });

    it('handles keyboard interaction (Space)', async () => {
      const user = userEvent.setup();
      render(<Switch label="Keyboard switch" />);

      const switchElement = screen.getByRole('checkbox');
      switchElement.focus();
      expect(switchElement).toHaveFocus();

      await user.keyboard(' ');
      expect(switchElement).toBeChecked();

      await user.keyboard(' ');
      expect(switchElement).not.toBeChecked();
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch disabled onCheckedChange={handleChange} />);

      const switchElement = screen.getByRole('checkbox');
      await user.click(switchElement);

      expect(handleChange).not.toHaveBeenCalled();
      expect(switchElement).not.toBeChecked();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to hidden input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Switch ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });
  });

  describe('Form integration', () => {
    it('accepts name attribute', () => {
      render(<Switch name="notifications" />);
      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).toHaveAttribute('name', 'notifications');
    });

    it('accepts value attribute', () => {
      render(<Switch value="enabled" />);
      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).toHaveAttribute('value', 'enabled');
    });

    it('accepts required attribute', () => {
      render(<Switch required />);
      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).toBeRequired();
    });

    it('works in form context', () => {
      render(
        <form data-testid="form">
          <Switch name="agree" value="yes" />
        </form>
      );

      const form = screen.getByTestId('form');
      const switchElement = screen.getByRole('checkbox');

      expect(form).toContainElement(switchElement);
      expect(switchElement).toHaveAttribute('name', 'agree');
    });
  });

  describe('Controlled mode', () => {
    it('works as controlled component', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { rerender } = render(
        <Switch checked={false} onCheckedChange={handleChange} />
      );

      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).not.toBeChecked();

      await user.click(switchElement);
      expect(handleChange).toHaveBeenCalledWith({ checked: true });

      // Simulate parent component updating the checked prop
      rerender(<Switch checked={true} onCheckedChange={handleChange} />);
      expect(switchElement).toBeChecked();
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Switch />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('is keyboard accessible', () => {
      render(<Switch label="Accessible switch" />);
      const switchElement = screen.getByRole('checkbox');
      switchElement.focus();
      expect(switchElement).toHaveFocus();
    });

    it('associates label with switch', () => {
      render(<Switch label="Notification Settings" />);
      const label = screen.getByText('Notification Settings');
      const switchElement = screen.getByRole('checkbox');

      expect(label).toBeInTheDocument();
      expect(switchElement).toBeInTheDocument();
    });
  });
});
