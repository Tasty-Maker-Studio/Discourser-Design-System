import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type PausePlayIconProps = ComponentProps<typeof StyledSvg>;

export const PausePlayIcon = (props: PausePlayIconProps) => (
  <StyledSvg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <circle
      cx="31.7438"
      cy="31.7438"
      r="30.7438"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M27.7438 21.7437H25.7438C24.6392 21.7437 23.7438 22.6391 23.7438 23.7437V39.7437C23.7438 40.8482 24.6392 41.7437 25.7438 41.7437H27.7438C28.8483 41.7437 29.7438 40.8482 29.7438 39.7437V23.7437C29.7438 22.6391 28.8483 21.7437 27.7438 21.7437Z"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M37.7438 21.7437H35.7438C34.6392 21.7437 33.7438 22.6391 33.7438 23.7437V39.7437C33.7438 40.8482 34.6392 41.7437 35.7438 41.7437H37.7438C38.8483 41.7437 39.7438 40.8482 39.7438 39.7437V23.7437C39.7438 22.6391 38.8483 21.7437 37.7438 21.7437Z"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </StyledSvg>
);
