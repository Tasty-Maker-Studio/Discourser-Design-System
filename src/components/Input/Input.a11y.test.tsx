import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Input } from './Input';

describe('Input accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Input placeholder="Enter text" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with label', async () => {
    const { container } = render(<Input label="Username" placeholder="Enter username" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with helper text', async () => {
    const { container } = render(
      <Input
        label="Email"
        placeholder="email@example.com"
        helperText="We'll never share your email"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with error text', async () => {
    const { container } = render(
      <Input
        label="Email"
        placeholder="email@example.com"
        errorText="Please enter a valid email address"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when disabled', async () => {
    const { container } = render(
      <Input label="Disabled Field" disabled placeholder="Cannot edit" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when required', async () => {
    const { container } = render(
      <Input label="Required Field" required placeholder="This field is required" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations for all variants', async () => {
    const variants = ['filled', 'outlined'] as const;

    for (const variant of variants) {
      const { container } = render(
        <Input variant={variant} label={`${variant} input`} placeholder="Enter text" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('has no violations for all sizes', async () => {
    const sizes = ['sm', 'md'] as const;

    for (const size of sizes) {
      const { container } = render(
        <Input size={size} label={`${size} input`} placeholder="Enter text" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('has no violations for different input types', async () => {
    const types = ['text', 'email', 'password', 'number', 'tel', 'url'] as const;

    for (const type of types) {
      const { container } = render(
        <Input type={type} label={`${type} input`} placeholder={`Enter ${type}`} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('has no violations with error state and helper text', async () => {
    const { container } = render(
      <Input
        label="Password"
        type="password"
        helperText="Must be at least 8 characters"
        errorText="Password is too short"
        defaultValue="short"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations in complete form context', async () => {
    const { container } = render(
      <form>
        <Input
          label="Full Name"
          placeholder="John Doe"
          required
          helperText="Enter your full legal name"
        />
        <Input
          label="Email"
          type="email"
          placeholder="email@example.com"
          required
          helperText="We'll never share your email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          required
          helperText="Must be at least 8 characters"
        />
      </form>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
