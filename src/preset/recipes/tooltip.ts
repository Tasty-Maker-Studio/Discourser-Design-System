import { defineSlotRecipe } from '@pandacss/dev'

export const tooltip = defineSlotRecipe({
  className: 'tooltip',
  slots: ['trigger', 'arrow', 'arrowTip', 'positioner', 'content'],
  base: {
    content: {
      '--tooltip-bg': 'colors.gray.solid.bg',
      bg: 'var(--tooltip-bg)',
      color: 'gray.solid.fg',
      borderRadius: 'l2',
      boxShadow: 'sm',
      fontWeight: 'semibold',
      px: '2',
      py: '1.5',
      textStyle: 'xs',
      maxWidth: 'xs',
      _open: {
        animationStyle: 'scale-fade-in',
        animationDuration: 'fast',
      },
      _closed: {
        animationStyle: 'scale-fade-out',
        animationDuration: 'faster',
      },
    },
    arrow: {
      '--arrow-size': 'sizes.2',
      '--arrow-background': 'var(--tooltip-bg)',
    },
    arrowTip: {
      borderTopWidth: 'thin',
      borderInlineStartWidth: 'thin',
      borderColor: 'var(--tooltip-bg)',
    },
  },
})
