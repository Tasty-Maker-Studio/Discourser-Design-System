'use client'
import { Switch } from '@ark-ui/react/switch'
import type { ComponentProps } from 'react'
import { createStyleContext } from 'styled-system/jsx'
import { switchComponent } from 'styled-system/recipes'

const { withProvider, withContext } = createStyleContext(switchComponent)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(Switch.Root, 'root')
export const Label = withContext(Switch.Label, 'label')
export const Thumb = withContext(Switch.Thumb, 'thumb')
export const HiddenInput = Switch.HiddenInput

export const Control = withContext(Switch.Control, 'control', {
  defaultProps: { children: <Thumb /> },
})

export { SwitchContext as Context } from '@ark-ui/react/switch'
