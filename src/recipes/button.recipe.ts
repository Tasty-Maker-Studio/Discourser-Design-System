import { defineRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
  className: 'button',
  description: 'Material Design 3 button component',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'sm',
    fontFamily: 'body',
    fontWeight: '500',
    borderRadius: 'full',
    cursor: 'pointer',
    transition: 'all',
    transitionDuration: 'fast',
    transitionTimingFunction: 'standard',
    outline: 'none',
    border: 'none',
    textDecoration: 'none',
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
      filled: {
        bg: 'primary',
        color: 'onPrimary',
        _hover: {
          opacity: 0.92,
          shadow: 'level1'
        },
        _active: {
          opacity: 0.88
        }
      },
      outlined: {
        bg: 'transparent',
        color: 'primary',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'outline',
        _hover: {
          bg: 'primary',
          bgOpacity: 0.08
        },
        _active: {
          bg: 'primary',
          bgOpacity: 0.12
        }
      },
      text: {
        bg: 'transparent',
        color: 'primary',
        _hover: {
          bg: 'primary',
          bgOpacity: 0.08
        },
        _active: {
          bg: 'primary',
          bgOpacity: 0.12
        }
      },
      elevated: {
        bg: 'surfaceContainerLow',
        color: 'primary',
        shadow: 'level1',
        _hover: {
          shadow: 'level2',
          bg: 'surfaceContainerLow'
        },
        _active: {
          shadow: 'level1'
        }
      },
      tonal: {
        bg: 'secondaryContainer',
        color: 'onSecondaryContainer',
        _hover: {
          shadow: 'level1'
        },
        _active: {
          shadow: 'none'
        }
      }
    },
    size: {
      sm: {
        height: '32px',
        px: 'md',
        fontSize: 'labelMedium',
        lineHeight: 'labelMedium'
      },
      md: {
        height: '40px',
        px: 'lg',
        fontSize: 'labelLarge',
        lineHeight: 'labelLarge'
      },
      lg: {
        height: '48px',
        px: 'xl',
        fontSize: 'labelLarge',
        lineHeight: 'labelLarge'
      }
    }
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md'
  }
});