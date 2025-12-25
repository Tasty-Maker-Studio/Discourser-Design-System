import { css } from 'styled-system/css';
import { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
}

export const Card = ({ title, children, className, ...props }: CardProps) => {
  const cardStyles = css({
    backgroundColor: 'white',
    borderRadius: 'lg',
    padding: 'lg',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s',
    _hover: {
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
  });

  const titleStyles = css({
    fontSize: 'xl',
    fontWeight: 'bold',
    marginBottom: 'md',
    color: 'gray.800',
  });

  return (
    <div className={`${cardStyles} ${className || ''}`} {...props}>
      {title && <h3 className={titleStyles}>{title}</h3>}
      {children}
    </div>
  );
};
