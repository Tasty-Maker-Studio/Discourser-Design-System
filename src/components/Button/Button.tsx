import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { button } from 'styled-system/recipes';
import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /**
   * Visual style variant
   * @default "filled"
   */
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
  /**
   * Size variant
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant, size, leftIcon, rightIcon, className, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(button({ variant, size }), className)}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
