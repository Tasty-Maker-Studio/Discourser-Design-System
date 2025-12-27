import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { card } from 'styled-system/recipes';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /**
   * Visual style variant
   * @default "filled"
   */
  variant?: 'filled' | 'outlined' | 'elevated';
  /**
   * When true, the card becomes clickable with hover/active states
   */
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant, interactive, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(card({ variant, interactive }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
