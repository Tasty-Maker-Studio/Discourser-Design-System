import { defineRecipe } from '@pandacss/dev';

export const cardRecipe = defineRecipe({
  className: 'card',
  description: 'Material Design 3 card component',
  base: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 'medium',
    overflow: 'hidden',
    transition: 'all',
    transitionDuration: 'fast',
    transitionTimingFunction: 'standard'
  },
  variants: {
    variant: {
      elevated: {
        bg: 'surfaceContainerLow',
        shadow: 'level1',
        _hover: {
          shadow: 'level2'
        }
      },
      filled: {
        bg: 'surfaceContainerHighest'
      },
      outlined: {
        bg: 'surface',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'outlineVariant'
      }
    },
    interactive: {
      true: {
        cursor: 'pointer',
        _hover: {
          opacity: 0.96
        },
        _active: {
          opacity: 0.92
        }
      }
    }
  },
  defaultVariants: {
    variant: 'elevated',
    interactive: false
  }
});