import { defineRecipe } from '@pandacss/dev'

export const textarea = defineRecipe({
  className: 'textarea',
  base: {
    appearance: 'none',
    borderRadius: 'l2',
    minWidth: '0',
    outline: '0',
    position: 'relative',
    transition: 'colors',
    transitionProperty: 'box-shadow, border-color',
    width: '100%',
    _disabled: {
      layerStyle: 'disabled',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
  variants: {
    variant: {
      outline: {
        borderWidth: 'thin',
        borderColor: 'gray.outline.border',
        focusVisibleRing: 'inside',
        _invalid: {
          borderColor: 'error',
          focusRingColor: 'error',
        },
      },
      surface: {
        bg: 'gray.surface.bg',
        borderWidth: 'thin',
        borderColor: 'gray.surface.border',
        focusVisibleRing: 'inside',
        _invalid: {
          borderColor: 'error',
          focusRingColor: 'error',
        },
      },
      subtle: {
        borderWidth: 'thin',
        borderColor: 'transparent',
        bg: 'gray.subtle.bg',
        color: 'gray.subtle.fg',
        focusVisibleRing: 'inside',
        _invalid: {
          borderColor: 'error',
          focusRingColor: 'error',
        },
      },
      flushed: {
        borderBottomWidth: 'thin',
        borderBottomColor: 'gray.outline.border',
        borderRadius: '0',
        color: 'fg.default',
        px: '0',
        _invalid: {
          borderColor: 'error',
        },
        _focus: {
          borderColor: 'colorPalette.solid.bg',
          boxShadowColor: 'colorPalette.solid.bg',
          boxShadow: '0 1px 0 0 var(--shadow-color)',
          _invalid: {
            borderColor: 'error',
            boxShadowColor: 'error',
          },
        },
      },
    },
    size: {
      xs: { textStyle: 'sm', px: '2', py: 'sm', scrollPaddingBottom: 'sm' },
      sm: { textStyle: 'sm', px: '2.5', py: 'sm', scrollPaddingBottom: 'sm' },
      md: { textStyle: 'md', px: '3', py: 'sm', scrollPaddingBottom: 'sm' },
      lg: { textStyle: 'md', px: '3.5', py: 'sm', scrollPaddingBottom: 'sm' },
      xl: { textStyle: 'lg', px: '4', py: 'sm', scrollPaddingBottom: 'sm' },
    },
  },
})
