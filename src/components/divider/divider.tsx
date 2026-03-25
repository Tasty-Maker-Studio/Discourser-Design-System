import { forwardRef, type HTMLAttributes } from 'react';
import { css, cx } from 'styled-system/css';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional center label text (e.g. "OR") */
  label?: string;
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  function Divider(
    { label, orientation = 'horizontal', className, ...props },
    ref,
  ) {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cx(
            css({
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'sm',
              alignSelf: 'stretch',
            }),
            className,
          )}
          {...props}
        >
          <div
            className={css({
              flex: 1,
              width: '1px',
              bg: 'outlineVariant',
            })}
          />
          {label && (
            <span
              className={css({
                textStyle: 'labelMedium',
                color: 'onSurfaceVariant',
                userSelect: 'none',
              })}
            >
              {label}
            </span>
          )}
          {label && (
            <div
              className={css({
                flex: 1,
                width: '1px',
                bg: 'outlineVariant',
              })}
            />
          )}
        </div>
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          className={cx(
            css({
              display: 'flex',
              alignItems: 'center',
              gap: 'sm',
              width: 'full',
            }),
            className,
          )}
          {...props}
        >
          <div
            className={css({
              flex: 1,
              height: '1px',
              bg: 'outlineVariant',
            })}
          />
          <span
            className={css({
              textStyle: 'labelMedium',
              color: 'onSurfaceVariant',
              userSelect: 'none',
            })}
          >
            {label}
          </span>
          <div
            className={css({
              flex: 1,
              height: '1px',
              bg: 'outlineVariant',
            })}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cx(
          css({
            width: 'full',
            height: '1px',
            bg: 'outlineVariant',
          }),
          className,
        )}
        {...props}
      />
    );
  },
);
