'use client'
import { Portal } from '@ark-ui/react/portal'
import { Toaster as ArkToaster, createToaster, Toast, useToastContext } from '@ark-ui/react/toast'
import type React from 'react'
import { type ComponentPropsWithRef, forwardRef } from 'react'
import { createStyleContext, Stack, styled } from 'styled-system/jsx'
import { toast } from 'styled-system/recipes'
import { CloseButton } from './CloseButton'
import { Icon, type IconProps } from './Icon'
import { Spinner } from './Spinner'

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <path d="m9 11 3 3L22 4"></path>
  </svg>
)

const CircleAlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" x2="12" y1="8" y2="12"></line>
    <line x1="12" x2="12.01" y1="16" y2="16"></line>
  </svg>
)

const CircleXIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="m15 9-6 6"></path>
    <path d="m9 9 6 6"></path>
  </svg>
)

const { withProvider, withContext } = createStyleContext(toast)

const Root = withProvider(Toast.Root, 'root')
const Title = withContext(Toast.Title, 'title')
const Description = withContext(Toast.Description, 'description')
const ActionTrigger = withContext(Toast.ActionTrigger, 'actionTrigger')
const CloseTrigger = withContext(Toast.CloseTrigger, 'closeTrigger')
const StyledToaster = styled(ArkToaster)

const iconMap: Record<string, React.ElementType> = {
  warning: CircleAlertIcon,
  success: CheckCircleIcon,
  error: CircleXIcon,
}

const Indicator = forwardRef<HTMLElement, IconProps & ComponentPropsWithRef<'svg'>>(function ToastIndicator(props, ref) {
  const toast = useToastContext()

  const StatusIcon = iconMap[toast.type]
  if (!StatusIcon) return null

  return (
    <Icon ref={ref} data-type={toast.type} {...props}>
      <StatusIcon />
    </Icon>
  )
})

export const toaster: ReturnType<typeof createToaster> = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
  overlap: true,
  max: 5,
})

export const Toaster = () => {
  return (
    <Portal>
      <StyledToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Root>
            {toast.type === 'loading' ? <Spinner color="colorPalette.plain.fg" /> : <Indicator />}

            <Stack gap="3" alignItems="start">
              <Stack gap="1">
                {toast.title && <Title>{toast.title}</Title>}
                {toast.description && <Description>{toast.description}</Description>}
              </Stack>
              {toast.action && <ActionTrigger>{toast.action.label}</ActionTrigger>}
            </Stack>
            {toast.closable && (
              <CloseTrigger asChild>
                <CloseButton size="sm" />
              </CloseTrigger>
            )}
          </Root>
        )}
      </StyledToaster>
    </Portal>
  )
}
