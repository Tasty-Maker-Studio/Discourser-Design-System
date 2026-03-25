import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppleLoginIcon } from '../src/components/Icons/AppleLoginIcon';
import { GoogleLoginIcon } from '../src/components/Icons/GoogleLoginIcon';
import { css } from '../styled-system/css';

const meta: Meta = {
  title: 'Icons/Social Login',
};
export default meta;

export const Apple: StoryObj = {
  render: () => (
    <div className={css({ display: 'flex', gap: 'lg', alignItems: 'center' })}>
      {/* On light bg — renders dark (currentColor) */}
      <AppleLoginIcon style={{ fontSize: '24px', color: '#1b1c18' }} />
      {/* On dark bg — renders white (currentColor) */}
      <div
        className={css({
          bg: 'inverseSurface',
          p: 'sm',
          borderRadius: 'small',
        })}
      >
        <AppleLoginIcon style={{ fontSize: '24px', color: 'white' }} />
      </div>
    </div>
  ),
};

export const Google: StoryObj = {
  render: () => <GoogleLoginIcon style={{ fontSize: '24px' }} />,
};

export const InButtons: StoryObj = {
  render: () => (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'md',
        maxW: '320px',
      })}
    >
      {/* Google button pattern */}
      <button
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'sm',
          h: '52px',
          w: 'full',
          px: 'md',
          bg: 'surfaceContainerLow',
          borderWidth: 'thin',
          borderColor: 'outlineVariant',
          borderRadius: 'small',
          cursor: 'pointer',
        })}
      >
        <GoogleLoginIcon style={{ fontSize: '20px' }} />
        <span className={css({ textStyle: 'titleMedium', color: 'onSurface' })}>
          Continue with Google
        </span>
      </button>
      {/* Apple button pattern */}
      <button
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'sm',
          h: '52px',
          w: 'full',
          px: 'md',
          bg: 'inverseSurface',
          borderWidth: 'thin',
          borderColor: 'outlineVariant',
          borderRadius: 'small',
          cursor: 'pointer',
          color: 'inverseOnSurface',
        })}
      >
        <AppleLoginIcon style={{ fontSize: '20px' }} />
        <span
          className={css({
            textStyle: 'titleMedium',
            color: 'inverseOnSurface',
          })}
        >
          Continue with Apple
        </span>
      </button>
    </div>
  ),
};
