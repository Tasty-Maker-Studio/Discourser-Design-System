import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type RepeatQuestionIconProps = ComponentProps<typeof StyledSvg>;

export const RepeatQuestionIcon = (props: RepeatQuestionIconProps) => (
  <StyledSvg
    viewBox="0 0 64 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M11 36.5C11 48.05 20.45 57.5 32 57.5C43.55 57.5 53 48.05 53 36.5C53 24.95 43.55 15.5 32 15.5H11M11 15.5L21.5 26M11 15.5L21.5 5"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </StyledSvg>
);
