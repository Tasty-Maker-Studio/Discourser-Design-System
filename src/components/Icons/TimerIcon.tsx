import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type TimerIconProps = ComponentProps<typeof StyledSvg>;

export const TimerIcon = (props: TimerIconProps) => (
  <StyledSvg
    viewBox="0 0 35 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M6.27333 12C4.83741 14.1451 4 16.7248 4 19.5C4 26.9559 10.0442 33 17.5 33C24.9559 33 31 26.9559 31 19.5C31 12.0442 24.9559 6 17.5 6V10.5M17.5 19.5L11.5 13.5"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </StyledSvg>
);
