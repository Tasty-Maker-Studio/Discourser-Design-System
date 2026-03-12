import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type TrashIconProps = ComponentProps<typeof StyledSvg>;

export const TrashIcon = (props: TrashIconProps) => (
  <StyledSvg
    viewBox="0 0 44 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M15.24 17.7998H17.8V38.2798H15.24V17.7998Z" fill="currentColor" />
    <path
      d="M20.3601 17.7998H22.9201V38.2798H20.3601V17.7998Z"
      fill="currentColor"
    />
    <path d="M25.48 17.7998H28.04V38.2798H25.48V17.7998Z" fill="currentColor" />
    <path d="M5 10.1201H38.28V12.6801H5V10.1201Z" fill="currentColor" />
    <path
      d="M28.04 10.12H25.48V8.84C25.48 8.072 24.968 7.56 24.2 7.56H19.08C18.312 7.56 17.8 8.072 17.8 8.84V10.12H15.24V8.84C15.24 6.664 16.904 5 19.08 5H24.2C26.376 5 28.04 6.664 28.04 8.84V10.12Z"
      fill="currentColor"
    />
    <path
      d="M29.3201 45.96H13.9601C11.9121 45.96 10.1201 44.296 9.86406 42.248L7.56006 11.528L10.1201 11.272L12.4241 41.992C12.4241 42.76 13.1921 43.4 13.9601 43.4H29.3201C30.0881 43.4 30.7281 42.76 30.8561 41.992L33.1601 11.272L35.7201 11.528L33.4161 42.248C33.1601 44.296 31.3681 45.96 29.3201 45.96Z"
      fill="currentColor"
    />
  </StyledSvg>
);
