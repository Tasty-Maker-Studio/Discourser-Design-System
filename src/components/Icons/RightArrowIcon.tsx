import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type RightArrowIconProps = ComponentProps<typeof StyledSvg>;

export const RightArrowIcon = (props: RightArrowIconProps) => (
  <StyledSvg
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M15.9172 13.2266H3.74219V11.2266H15.9172L10.3172 5.62656L11.7422 4.22656L19.7422 12.2266L11.7422 20.2266L10.3172 18.8266L15.9172 13.2266Z"
      fill="currentColor"
    />
  </StyledSvg>
);
