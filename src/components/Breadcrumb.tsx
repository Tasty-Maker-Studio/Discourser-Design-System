'use client';
import { ark } from '@ark-ui/react/factory';
import type { ComponentProps, ReactNode } from 'react';
import { createStyleContext } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { breadcrumb } from 'styled-system/recipes';

const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);

const { withProvider, withContext } = createStyleContext(breadcrumb);

export type RootProps = ComponentProps<typeof Root>;

export const Root = withProvider(ark.nav, 'root', {
  defaultProps: { 'aria-label': 'breadcrumb' },
});
export const List = withContext(ark.ol, 'list');
export const Item = withContext(ark.li, 'item');
export interface LinkProps extends ComponentProps<typeof ark.a> {
  disabled?: boolean;
}

const LinkBase = withContext(ark.a, 'link');
const LinkDisabled = withContext(ark.span, 'link');

export const Link = ({ disabled, href, ...props }: LinkProps) => {
  if (disabled) {
    return <LinkDisabled data-disabled {...props} />;
  }
  return <LinkBase href={href} {...props} />;
};
export const Ellipsis = withContext(ark.li, 'ellipsis', {
  defaultProps: {
    role: 'presentation',
    'aria-hidden': true,
    children: '...',
  },
});

export const Separator = withContext(ark.li, 'separator', {
  defaultProps: {
    'aria-hidden': true,
    children: <ChevronRightIcon />,
  },
});

/** The current/active page crumb — renders as a span (not a link) with aria-current="page" */
export const CurrentLink = withContext(ark.span, 'link', {
  defaultProps: {
    'aria-current': 'page',
  },
});

// --- Two-row layout support ---

export interface TwoRowRootProps {
  children: ReactNode;
  /** aria-label for the nav wrapper (default: 'breadcrumb') */
  'aria-label'?: string;
  className?: string;
}

/** Wrapper nav that stacks the ParentRow above the dynamic breadcrumb */
export const TwoRowRoot = ({
  children,
  'aria-label': ariaLabel = 'breadcrumb',
  className,
}: TwoRowRootProps) => (
  <nav aria-label={ariaLabel} className={className}>
    {children}
  </nav>
);

export interface ParentRowProps {
  children: ReactNode;
  /**
   * Control visibility of the static parent row.
   * Defaults to true. Pass false to hide entirely (renders null — no DOM node).
   */
  show?: boolean;
}

/** Static parent breadcrumb row rendered above the dynamic row. Hidden when show={false}. */
export const ParentRow = ({ children, show = true }: ParentRowProps) => {
  if (!show) return null;
  return (
    <div
      aria-hidden="true"
      className={css({
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1',
        mb: '1',
      })}
    >
      {children}
    </div>
  );
};

/** A single item in the static parent row. Renders as an anchor when href is provided. */
export const ParentItem = ({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) => {
  const styles = css({
    color: 'fg.subtle',
    textStyle: 'sm',
    fontWeight: 'normal',
    textDecoration: 'none',
    _hover: href
      ? { color: 'fg.default', textDecoration: 'underline' }
      : undefined,
  });
  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }
  return <span className={styles}>{children}</span>;
};

/** Slash separator for the static parent row */
export const ParentSeparator = () => (
  <span
    aria-hidden="true"
    className={css({
      color: 'fg.subtle',
      textStyle: 'sm',
      mx: '0.5',
    })}
  >
    /
  </span>
);
