import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type PlayIconProps = ComponentProps<typeof StyledSvg>;

export const PlayIcon = (props: PlayIconProps) => (
  <StyledSvg
    viewBox="0 0 63 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M31.5 57.75C45.9975 57.75 57.75 45.9975 57.75 31.5C57.75 17.0025 45.9975 5.25 31.5 5.25C17.0025 5.25 5.25 17.0025 5.25 31.5C5.25 45.9975 17.0025 57.75 31.5 57.75Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.25 21L42 31.5L26.25 42V21Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </StyledSvg>
);
