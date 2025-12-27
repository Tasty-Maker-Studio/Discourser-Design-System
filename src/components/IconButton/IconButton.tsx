import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { iconButton } from 'styled-system/recipes';
import { cn } from '../../utils/cn';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Icon to display in the button
   */
  children: ReactNode;
  /**
   * Accessible label for the button (required for screen readers)
   */
  'aria-label': string;
  /**
   * Visual style variant
   * @default "standard"
   */
  variant?: 'standard' | 'filled' | 'outlined' | 'tonal';
  /**
   * Size variant
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, variant, size, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(iconButton({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
