'use client'
import type { ReactNode } from 'react'
import { css } from 'styled-system/css'
import * as Dialog from '../Dialog'

interface AddScenarioDialogProps {
  open: boolean
  onClose: () => void
  /** Render prop slot — consumer injects their scenario collection here. */
  renderContent?: (props: { onClose: () => void }) => ReactNode
  /** Called when user clicks "Browse More Scenarios" in the footer */
  onBrowseMore?: () => void
  /** Called when user clicks "Build Custom Scenario" in the footer */
  onBuildCustom?: () => void
}

const dialogContentClass = css({
  width: 'full',
  maxWidth: '560px',
  maxHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
})

const dialogBodyClass = css({
  flex: '1',
  overflowY: 'auto',
  py: '0',
  px: '6',
})

const footerLinkClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1',
  fontSize: 'sm',
  color: 'primary.solid.bg',
  fontWeight: 'medium',
  textDecoration: 'none',
  cursor: 'pointer',
  bg: 'transparent',
  border: 'none',
  p: '0',
  _hover: { textDecoration: 'underline' },
  _focusVisible: { focusVisibleRing: 'outside' },
})

export function AddScenarioDialog({
  open,
  onClose,
  renderContent,
  onBrowseMore,
  onBuildCustom,
}: AddScenarioDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={({ open: isOpen }) => !isOpen && onClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content className={dialogContentClass}>
          <Dialog.Header>
            <Dialog.Title>Add Scenario</Dialog.Title>
            <Dialog.CloseTrigger asChild>
              <button
                aria-label="Close"
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'l1',
                  w: '6',
                  h: '6',
                  color: 'fg.muted',
                  bg: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'lg',
                  _hover: { bg: 'neutral.subtle.bg', color: 'fg.default' },
                })}
              >
                ✕
              </button>
            </Dialog.CloseTrigger>
          </Dialog.Header>

          {/* Scrollable body — consumer owns this content */}
          <Dialog.Body className={dialogBodyClass}>
            {renderContent ? (
              renderContent({ onClose })
            ) : (
              // Storybook placeholder
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minH: '48',
                  borderRadius: 'l2',
                  bg: 'neutral.subtle.bg',
                  color: 'fg.muted',
                  fontSize: 'sm',
                  borderWidth: '1px',
                  borderStyle: 'dashed',
                  borderColor: 'border.default',
                })}
              >
                Scenario collection renders here
              </div>
            )}
          </Dialog.Body>

          <Dialog.Footer>
            <button
              type="button"
              className={footerLinkClass}
              onClick={() => {
                onBrowseMore?.()
                onClose()
              }}
            >
              Browse More Scenarios →
            </button>
            <button
              type="button"
              className={footerLinkClass}
              onClick={() => {
                onBuildCustom?.()
                onClose()
              }}
            >
              Build Custom Scenario →
            </button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}