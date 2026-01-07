'use client'
import { ark } from '@ark-ui/react/factory'
import { Slider, useSliderContext } from '@ark-ui/react/slider'
import type React from 'react'
import { type ComponentProps, forwardRef, createContext, useContext } from 'react'
import { createStyleContext } from 'styled-system/jsx'
import { slider } from 'styled-system/recipes'
import type { RecipeVariantProps } from 'styled-system/types/recipe'

const { withProvider, withContext } = createStyleContext(slider)

// Create StyleContext for child components
type SliderVariantProps = RecipeVariantProps<typeof slider>
const StyleContextInternal = createContext<ReturnType<typeof slider> | null>(null)

// Custom Root component that applies Panda styles while passing all props to Ark UI
export const Root = forwardRef<HTMLDivElement, ComponentProps<typeof Slider.Root> & SliderVariantProps & { colorPalette?: string }>(
  (props, ref) => {
    const { orientation, size, variant, colorPalette, className, ...arkProps } = props

    // Generate Panda CSS classes using the recipe
    const styles = slider({ orientation, size, variant })

    // Build className with color palette and custom classes
    const colorPaletteClass = colorPalette ? `color-palette_${colorPalette}` : ''
    const combinedClassName = [styles.root, colorPaletteClass, className].filter(Boolean).join(' ')

    // Pass ALL props including orientation to Ark UI, and add Panda CSS classes
    return (
      <StyleContextInternal.Provider value={styles}>
        <Slider.Root
          ref={ref}
          orientation={orientation}
          className={combinedClassName}
          {...arkProps}
        />
      </StyleContextInternal.Provider>
    )
  }
)
// Helper to create styled child components that use our custom context
const withCustomContext = <T extends React.ElementType>(
  Component: T,
  slot: keyof ReturnType<typeof slider>
) => {
  return forwardRef<any, ComponentProps<T>>((props, ref) => {
    const styles = useContext(StyleContextInternal)
    const slotClass = styles?.[slot]
    return <Component ref={ref} {...props} className={`${slotClass} ${props.className || ''}`.trim()} />
  })
}

export const Control = withCustomContext(Slider.Control, 'control')
export const DraggingIndicator = withCustomContext(Slider.DraggingIndicator, 'draggingIndicator')
export const Label = withCustomContext(Slider.Label, 'label')
export const Marker = withCustomContext(Slider.Marker, 'marker')
export const MarkerIndicator = withCustomContext(ark.div, 'markerIndicator')
export const MarkerGroup = withCustomContext(Slider.MarkerGroup, 'markerGroup')
export const Range = withCustomContext(Slider.Range, 'range')
export const Thumb = withCustomContext(Slider.Thumb, 'thumb')
export const Track = withCustomContext(Slider.Track, 'track')
export const ValueText = withCustomContext(Slider.ValueText, 'valueText')
export const HiddenInput = Slider.HiddenInput

export { SliderContext as Context } from '@ark-ui/react/slider'

export type RootProps = ComponentProps<typeof Root>
export type MarkerGroupProps = ComponentProps<typeof MarkerGroup>
export type ThumbProps = ComponentProps<typeof Thumb>

export interface MarksProps extends MarkerGroupProps {
  marks?: Array<number | { value: number; label: React.ReactNode }> | undefined
}

export const Marks = forwardRef<HTMLDivElement, MarksProps>(function Marks(props, ref) {
  const { marks, ...rest } = props
  if (!marks?.length) return null

  return (
    <MarkerGroup ref={ref} {...rest}>
      {marks.map((mark, index) => {
        const value = typeof mark === 'number' ? mark : mark.value
        const label = typeof mark === 'number' ? undefined : mark.label
        return (
          <Marker key={index} value={value}>
            <MarkerIndicator />
            {label != null && <span>{label}</span>}
          </Marker>
        )
      })}
    </MarkerGroup>
  )
})

export const Thumbs = (props: Omit<ThumbProps, 'index'>) => {
  const slider = useSliderContext()
  return slider.value.map((_, index) => (
    <Thumb key={index} index={index} {...props}>
      <HiddenInput />
    </Thumb>
  ))
}
