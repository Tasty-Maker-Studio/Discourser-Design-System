import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type HelpIconProps = ComponentProps<typeof StyledSvg>;

export const HelpIcon = (props: HelpIconProps) => (
  <StyledSvg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M9.16663 10H10.8333C11.2753 10 11.6992 9.82443 12.0118 9.51186C12.3244 9.1993 12.5 8.77538 12.5 8.33335C12.5 7.89133 12.3244 7.4674 12.0118 7.15484C11.6992 6.84228 11.2753 6.66669 10.8333 6.66669H8.33329C7.83329 6.66669 7.41663 6.83335 7.16663 7.16669L2.49996 11.6667M5.83329 15L7.16663 13.8334C7.41663 13.5 7.83329 13.3334 8.33329 13.3334H11.6666C12.5833 13.3334 13.4166 13 14 12.3334L17.8333 8.66671C18.1549 8.36282 18.3426 7.94362 18.3551 7.50135C18.3676 7.05908 18.2039 6.62995 17.9 6.30838C17.5961 5.9868 17.1769 5.79912 16.7346 5.78662C16.2923 5.77411 15.8632 5.93782 15.5416 6.24171L12.0416 9.49171M1.66663 10.8334L6.66663 15.8334"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </StyledSvg>
);
