import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type UserProfileIconProps = ComponentProps<typeof StyledSvg>;

export const UserProfileIcon = (props: UserProfileIconProps) => (
  <StyledSvg
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M21 22.75C25.8325 22.75 29.75 18.8325 29.75 14C29.75 9.16751 25.8325 5.25 21 5.25C16.1675 5.25 12.25 9.16751 12.25 14C12.25 18.8325 16.1675 22.75 21 22.75ZM21 22.75C24.713 22.75 28.274 24.225 30.8995 26.8505C33.525 29.476 35 33.037 35 36.75M21 22.75C17.287 22.75 13.726 24.225 11.1005 26.8505C8.475 29.476 7 33.037 7 36.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </StyledSvg>
);
