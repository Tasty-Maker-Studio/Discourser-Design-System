'use client'
import { ark } from '@ark-ui/react/factory'
import { Slider, useSliderContext } from '@ark-ui/react/slider'
import type React from 'react'
import { type ComponentProps, forwardRef, createContext, useContext } from 'react'
import { slider } from 'styled-system/recipes'
import type { RecipeVariantProps } from 'styled-system/types/recipe'

// Create StyleContext for child components
type SliderVariantProps = RecipeVariantProps<typeof slider>
const StyleContextInternal = createContext<ReturnType<typeof slider> | null>(null)

// Custom Root component that applies Panda styles while passing all props to Ark UI
export const Root = forwardRef<HTMLDivElement, ComponentProps<typeof Slider.Root> & SliderVariantProps & { colorPalette?: string }>(
  function SliderRoot(props, ref) {
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

// Create typed wrapper for each component
const createStyledComponent = (
  Component: typeof Slider.Control,
  slot: keyof ReturnType<typeof slider>,
  displayName: string
) => {
  const StyledComponent = forwardRef<HTMLDivElement, ComponentProps<typeof Component>>((props, ref) => {
    const styles = useContext(StyleContextInternal)
    const slotClass = styles?.[slot]
    const { className, ...rest } = props
    return <Component ref={ref} className={`${slotClass} ${className || ''}`.trim()} {...rest} />
  })
  StyledComponent.displayName = displayName
  return StyledComponent
}

export const Control = createStyledComponent(Slider.Control, 'control', 'Control')
export const Track = createStyledComponent(Slider.Track, 'track', 'Track')
export const Range = createStyledComponent(Slider.Range, 'range', 'Range')

export const Thumb = forwardRef<HTMLDivElement, ComponentProps<typeof Slider.Thumb>>((props, ref) => {
  const styles = useContext(StyleContextInternal)
  const slotClass = styles?.thumb
  const { className, ...rest } = props
  return <Slider.Thumb ref={ref} className={`${slotClass} ${className || ''}`.trim()} {...rest} />
})
Thumb.displayName = 'Thumb'

// eslint-disable-next-line no-undef
export const Label = forwardRef<HTMLLabelElement, ComponentProps<typeof Slider.Label>>((props, ref) => {
  const styles = useContext(StyleContextInternal)
  const slotClass = styles?.label
  const { className, ...rest } = props
  return <Slider.Label ref={ref} className={`${slotClass} ${className || ''}`.trim()} {...rest} />
})
Label.displayName = 'Label'

export const ValueText = forwardRef<HTMLDivElement, ComponentProps<typeof Slider.ValueText>>((props, ref) => {
  const styles = useContext(StyleContextInternal)
  const slotClass = styles?.valueText
  const { className, ...rest } = props
  return <Slider.ValueText ref={ref} className={`${slotClass} ${className || ''}`.trim()} {...rest} />
})
ValueText.displayName = 'ValueText'

// eslint-disable-next-line no-undef
export const Marker = forwardRef<HTMLSpanElement, ComponentProps<typeof Slider.Marker>>((props, ref) => {
  const styles = useContext(StyleContextInternal)
  const slotClass = styles?.marker
  const { className, ...rest } = props
  return <Slider.Marker ref={ref} className={`${slotClass} ${className || ''}`.trim()} {...rest} />
})
Marker.displayName = 'Marker'

export const MarkerGroup = forwardRef<HTMLDivElement, ComponentProps<typeof Slider.MarkerGroup>>((props, ref) => {
  const styles = useContext(StyleContextInternal)
  const slotClass = styles?.markerGroup
  const { className, ...rest } = props
  return <Slider.MarkerGroup ref={ref} className={`${slotClass} ${className || ''}`.trim()} {...rest} />
})
MarkerGroup.displayName = 'MarkerGroup'

export const MarkerIndicator = forwardRef<HTMLDivElement, ComponentProps<typeof ark.div>>((props, ref) => {
  const styles = useContext(StyleContextInternal)
  const slotClass = styles?.markerIndicator
  const { className, ...rest } = props
  return <ark.div ref={ref} className={`${slotClass} ${className || ''}`.trim()} {...rest} />
})
MarkerIndicator.displayName = 'MarkerIndicator'

export const DraggingIndicator = forwardRef<HTMLDivElement, ComponentProps<typeof Slider.DraggingIndicator>>((props, ref) => {
  const styles = useContext(StyleContextInternal)
  const slotClass = styles?.draggingIndicator
  const { className, ...rest } = props
  return <Slider.DraggingIndicator ref={ref} className={`${slotClass} ${className || ''}`.trim()} {...rest} />
})
DraggingIndicator.displayName = 'DraggingIndicator'

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
