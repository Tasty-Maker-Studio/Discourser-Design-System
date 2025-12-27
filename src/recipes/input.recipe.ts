import { defineRecipe } from '@pandacss/dev';

export const inputRecipe = defineRecipe({
  className: 'input',
  description: 'Material Design 3 text field component',
  base: {
    width: '100%',
    fontFamily: 'body',
    fontSize: 'bodyLarge',
    lineHeight: 'bodyLarge',
    color: 'onSurface',
    bg: 'transparent',
    borderRadius: 'extraSmall',
    px: 'md',
    transition: 'all',
    transitionDuration: 'fast',
    outline: 'none',
    _placeholder: {
      color: 'onSurfaceVariant',
      opacity: 0.6,
    },
    _focus: {
      outline: 'none',
    },
    _disabled: {
      opacity: 0.38,
      cursor: 'not-allowed',
    },
  },
  variants: {
    variant: {
      filled: {
        bg: 'surfaceContainerHighest',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'onSurfaceVariant',
        borderTopLeftRadius: 'extraSmall',
        borderTopRightRadius: 'extraSmall',
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
        _hover: {
          bg: 'surfaceContainerHigh',
        },
        _focus: {
          borderBottomWidth: '2px',
          borderBottomColor: 'primary',
        },
      },
      outlined: {
        bg: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'outline',
        _hover: {
          borderColor: 'onSurface',
        },
        _focus: {
          borderWidth: '2px',
          borderColor: 'primary',
        },
      },
    },
    size: {
      sm: {
        height: '40px',
        fontSize: 'bodySmall',
        lineHeight: 'bodySmall',
      },
      md: {
        height: '56px',
        fontSize: 'bodyLarge',
        lineHeight: 'bodyLarge',
      },
    },
    state: {
      error: {
        borderColor: 'error',
        _focus: {
          borderColor: 'error',
        },
      },
      disabled: {
        opacity: 0.38,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
  defaultVariants: {
    variant: 'outlined',
    size: 'md',
  },
});
