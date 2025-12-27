import { defineSlotRecipe } from '@pandacss/dev';

export const switchRecipe = defineSlotRecipe({
  className: 'switchControl',
  description: 'Material Design 3 switch component',
  slots: ['root', 'control', 'thumb', 'label'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'sm',
      cursor: 'pointer',
      userSelect: 'none',
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.38,
      },
    },
    control: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: '52px',
      height: '32px',
      borderRadius: 'full',
      bg: 'surfaceContainerHighest',
      border: '2px solid',
      borderColor: 'outline',
      transition: 'all',
      transitionDuration: 'fast',
      flexShrink: 0,
      _checked: {
        bg: 'primary',
        borderColor: 'primary',
      },
      _disabled: {
        bg: 'surfaceVariant',
        borderColor: 'onSurface',
        opacity: 0.12,
      },
    },
    thumb: {
      position: 'absolute',
      left: '4px',
      width: '16px',
      height: '16px',
      borderRadius: 'full',
      bg: 'outline',
      transition: 'all',
      transitionDuration: 'fast',
      _checked: {
        left: '28px',
        width: '24px',
        height: '24px',
        bg: 'onPrimary',
      },
      _disabled: {
        bg: 'onSurface',
        opacity: 0.38,
      },
    },
    label: {
      fontFamily: 'body',
      fontSize: 'bodyMedium',
      color: 'onSurface',
      userSelect: 'none',
      _disabled: {
        opacity: 0.38,
      },
    },
  },
  variants: {
    size: {
      sm: {
        control: {
          width: '44px',
          height: '24px',
        },
        thumb: {
          width: '12px',
          height: '12px',
          left: '4px',
          _checked: {
            left: '24px',
            width: '16px',
            height: '16px',
          },
        },
        label: {
          fontSize: 'bodySmall',
        },
      },
      md: {
        control: {
          width: '52px',
          height: '32px',
        },
        thumb: {
          width: '16px',
          height: '16px',
          left: '4px',
          _checked: {
            left: '28px',
            width: '24px',
            height: '24px',
          },
        },
        label: {
          fontSize: 'bodyMedium',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
