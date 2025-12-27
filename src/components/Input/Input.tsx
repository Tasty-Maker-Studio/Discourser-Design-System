import { forwardRef, type InputHTMLAttributes } from 'react';
import { Field } from '@ark-ui/react/field';
import { input } from 'styled-system/recipes';
import { cn } from '../../utils/cn';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Label text for the input
   */
  label?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Error message to display (also sets error state)
   */
  errorText?: string;
  /**
   * Visual style variant
   * @default "outlined"
   */
  variant?: 'outlined' | 'filled';
  /**
   * Size variant
   * @default "md"
   */
  size?: 'sm' | 'md';
  /**
   * Visual state
   */
  state?: 'error';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, helperText, errorText, variant, size, state, className, ...props },
    ref
  ) => {
    const hasError = !!errorText || state === 'error';

    return (
      <Field.Root invalid={hasError}>
        {label && <Field.Label>{label}</Field.Label>}
        <Field.Input
          ref={ref}
          className={cn(
            input({ variant, size, state: hasError ? 'error' : state }),
            className
          )}
          {...props}
        />
        {helperText && !hasError && (
          <Field.HelperText>{helperText}</Field.HelperText>
        )}
        {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
      </Field.Root>
    );
  }
);

Input.displayName = 'Input';
