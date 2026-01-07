import { forwardRef } from 'react'
import { IconButton, type IconButtonProps } from './IconButton'

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
)

export type CloseButtonProps = IconButtonProps

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton(props, ref) {
    return (
      <IconButton variant="plain" colorPalette="gray" aria-label="Close" ref={ref} {...props}>
        {props.children ?? <XIcon />}
      </IconButton>
    )
  },
)
