import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type RecordIconProps = ComponentProps<typeof StyledSvg>;

export const RecordIcon = (props: RecordIconProps) => (
  <StyledSvg
    viewBox="0 0 36 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M27.0624 19.4998C27.0624 21.5134 25.4301 23.1457 23.4166 23.1457C21.4031 23.1457 19.7708 21.5134 19.7708 19.4998C19.7708 17.4863 21.4031 15.854 23.4166 15.854C25.4301 15.854 27.0624 17.4863 27.0624 19.4998Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M15.3959 19.4998C15.3959 21.5134 13.7636 23.1457 11.7501 23.1457C9.73655 23.1457 8.10425 21.5134 8.10425 19.4998C8.10425 17.4863 9.73655 15.854 11.7501 15.854C13.7636 15.854 15.3959 17.4863 15.3959 19.4998Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M11.75 23.1455H23.4167"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M32.1667 19.4998C32.1667 26.3744 32.1667 29.8119 30.0309 31.9474C27.8954 34.0832 24.4579 34.0832 17.5833 34.0832C10.7087 34.0832 7.27136 34.0832 5.13569 31.9474C3 29.8119 3 26.3744 3 19.4998C3 12.6252 3 9.18786 5.13569 7.05219C7.27136 4.9165 10.7087 4.9165 17.5833 4.9165C24.4579 4.9165 27.8954 4.9165 30.0309 7.05219C31.4511 8.47223 31.9269 10.4677 32.0863 13.6665"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </StyledSvg>
);
