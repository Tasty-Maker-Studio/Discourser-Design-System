import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from 'styled-system/jsx';

const StyledSvg = styled(ark.svg);

export type BookmarkPlusIconProps = ComponentProps<typeof StyledSvg>;

export const BookmarkPlusIcon = (props: BookmarkPlusIconProps) => (
  <StyledSvg
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M21 12.25V22.75M26.25 17.5H15.75M33.25 36.75L21 29.75L8.75 36.75V8.75C8.75 7.82174 9.11875 6.9315 9.77513 6.27513C10.4315 5.61875 11.3217 5.25 12.25 5.25H29.75C30.6783 5.25 31.5685 5.61875 32.2249 6.27513C32.8813 6.9315 33.25 7.82174 33.25 8.75V36.75Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </StyledSvg>
);
