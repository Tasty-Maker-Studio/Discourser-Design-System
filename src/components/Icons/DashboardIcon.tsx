import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type DashboardIconProps = ComponentProps<typeof StyledSvg>;

export const DashboardIcon = (props: DashboardIconProps) => (
  <StyledSvg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M9.5 4.5H5.33333C4.8731 4.5 4.5 4.8731 4.5 5.33333V11.1667C4.5 11.6269 4.8731 12 5.33333 12H9.5C9.96024 12 10.3333 11.6269 10.3333 11.1667V5.33333C10.3333 4.8731 9.96024 4.5 9.5 4.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.6667 4.5H14.5C14.0398 4.5 13.6667 4.8731 13.6667 5.33333V7.83333C13.6667 8.29357 14.0398 8.66667 14.5 8.66667H18.6667C19.1269 8.66667 19.5 8.29357 19.5 7.83333V5.33333C19.5 4.8731 19.1269 4.5 18.6667 4.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.6667 12H14.5C14.0398 12 13.6667 12.3731 13.6667 12.8333V18.6667C13.6667 19.1269 14.0398 19.5 14.5 19.5H18.6667C19.1269 19.5 19.5 19.1269 19.5 18.6667V12.8333C19.5 12.3731 19.1269 12 18.6667 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 15.3333H5.33333C4.8731 15.3333 4.5 15.7064 4.5 16.1667V18.6667C4.5 19.1269 4.8731 19.5 5.33333 19.5H9.5C9.96024 19.5 10.3333 19.1269 10.3333 18.6667V16.1667C10.3333 15.7064 9.96024 15.3333 9.5 15.3333Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </StyledSvg>
);
