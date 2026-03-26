import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type LogoutIconProps = ComponentProps<typeof StyledSvg>;

export const LogoutIcon = (props: LogoutIconProps) => (
  <StyledSvg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M29.0664 24.3673L33.3331 20.1007L29.0664 15.834"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.2666 20.1006H33.2166"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.5999 33.3337C12.2333 33.3337 6.2666 28.3337 6.2666 20.0003C6.2666 11.667 12.2333 6.66699 19.5999 6.66699"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </StyledSvg>
);
