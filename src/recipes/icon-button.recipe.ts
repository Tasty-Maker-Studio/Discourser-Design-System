import { defineRecipe } from '@pandacss/dev';

export const iconButtonRecipe = defineRecipe({
  className: 'icon-button',
  description: 'Material Design 3 icon button component',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'full',
    cursor: 'pointer',
    transition: 'all',
    transitionDuration: 'fast',
    transitionTimingFunction: 'standard',
    outline: 'none',
    border: 'none',
    p: '0',
    _disabled: {
      opacity: 0.38,
      cursor: 'not-allowed',
      pointerEvents: 'none'
    },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'primary',
      outlineOffset: '2px'
    }
  },
  variants: {
    variant: {
      standard: {
        bg: 'transparent',
        color: 'onSurfaceVariant',
        _hover: {
          bg: 'onSurfaceVariant',
          bgOpacity: 0.08
        }
      },
      filled: {
        bg: 'primary',
        color: 'onPrimary',
        _hover: {
          opacity: 0.92
        }
      },
      tonal: {
        bg: 'secondaryContainer',
        color: 'onSecondaryContainer',
        _hover: {
          opacity: 0.92
        }
      },
      outlined: {
        bg: 'transparent',
        color: 'onSurfaceVariant',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'outline',
        _hover: {
          bg: 'onSurfaceVariant',
          bgOpacity: 0.08
        }
      }
    },
    size: {
      sm: {
        width: '32px',
        height: '32px',
        '& svg': {
          width: '18px',
          height: '18px'
        }
      },
      md: {
        width: '40px',
        height: '40px',
        '& svg': {
          width: '24px',
          height: '24px'
        }
      },
      lg: {
        width: '48px',
        height: '48px',
        '& svg': {
          width: '24px',
          height: '24px'
        }
      }
    }
  },
  defaultVariants: {
    variant: 'standard',
    size: 'md'
  }
});