import { css } from 'styled-system/css';
import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className, ...props }: InputProps) => {
  const containerStyles = css({
    display: 'flex',
    flexDirection: 'column',
    gap: 'xs',
  });

  const labelStyles = css({
    fontSize: 'sm',
    fontWeight: 'medium',
    color: 'gray.700',
  });

  const inputStyles = css({
    padding: 'sm md',
    border: '1px solid',
    borderColor: 'gray.300',
    borderRadius: 'md',
    fontSize: 'md',
    transition: 'all 0.2s',
    _focus: {
      outline: 'none',
      borderColor: 'primary.500',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
    _disabled: {
      backgroundColor: 'gray.100',
      cursor: 'not-allowed',
    },
  });

  const errorStyles = css({
    fontSize: 'sm',
    color: 'red.600',
  });

  const errorInputStyles = css({
    borderColor: 'red.500',
    _focus: {
      borderColor: 'red.500',
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    },
  });

  return (
    <div className={containerStyles}>
      {label && <label className={labelStyles}>{label}</label>}
      <input
        className={`${inputStyles} ${error ? errorInputStyles : ''} ${className || ''}`}
        {...props}
      />
      {error && <span className={errorStyles}>{error}</span>}
    </div>
  );
};
