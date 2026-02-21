import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type NotebookIconProps = ComponentProps<typeof StyledSvg>;

export const NotebookIcon = (props: NotebookIconProps) => (
  <StyledSvg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M12 7.83333C12 6.94928 11.6488 6.10143 11.0236 5.47631C10.3985 4.85119 9.55068 4.5 8.66663 4.5H3.66663V17H9.49996C10.163 17 10.7989 17.2634 11.2677 17.7322C11.7366 18.2011 12 18.837 12 19.5M12 7.83333V19.5M12 7.83333C12 6.94928 12.3511 6.10143 12.9763 5.47631C13.6014 4.85119 14.4492 4.5 15.3333 4.5H20.3333V17H14.5C13.8369 17 13.201 17.2634 12.7322 17.7322C12.2634 18.2011 12 18.837 12 19.5M6.99996 8.66667H8.66663M6.99996 12H8.66663M15.3333 8.66667H17M15.3333 12H17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </StyledSvg>
);
