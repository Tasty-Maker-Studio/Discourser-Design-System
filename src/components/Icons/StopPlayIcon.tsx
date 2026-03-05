import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type StopPlayIconProps = ComponentProps<typeof StyledSvg>;

export const StopPlayIcon = (props: StopPlayIconProps) => (
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
    <rect
      x="15.231"
      y="15.231"
      width="33.0254"
      height="33.0254"
      rx="8"
      fill="currentColor"
    />
  </StyledSvg>
);
