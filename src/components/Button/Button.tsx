import { css } from 'styled-system/css';
import { HTMLAttributes } from 'react';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className,
  ...props 
}: ButtonProps) => {
  const baseStyles = css({
    borderRadius: 'md',
    fontWeight: 'semibold',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  });

  const sizeStyles = {
    sm: css({
      padding: 'xs sm',
      fontSize: 'sm',
    }),
    md: css({
      padding: 'sm md',
      fontSize: 'md',
    }),
    lg: css({
      padding: 'md lg',
      fontSize: 'lg',
    }),
  };

  const variantStyles = {
    primary: css({
      backgroundColor: 'primary.600',
      color: 'white',
      _hover: {
        backgroundColor: 'primary.700',
      },
      _active: {
        backgroundColor: 'primary.800',
      },
    }),
    secondary: css({
      backgroundColor: 'secondary.600',
      color: 'white',
      _hover: {
        backgroundColor: 'secondary.700',
      },
      _active: {
        backgroundColor: 'secondary.800',
      },
    }),
    outline: css({
      backgroundColor: 'transparent',
      border: '2px solid',
      borderColor: 'primary.600',
      color: 'primary.600',
      _hover: {
        backgroundColor: 'primary.50',
      },
      _active: {
        backgroundColor: 'primary.100',
      },
    }),
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className || ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
