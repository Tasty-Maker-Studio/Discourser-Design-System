import { defineSlotRecipe } from '@pandacss/dev';

/**
 * Stepper component recipe based on Ark UI Steps primitive
 *
 * Visual states derived from Figma:
 * - Current: Green filled indicator (primary color)
 * - Completed: Secondary filled indicator
 * - Upcoming: Light outlined indicator
 * - Separator: Connects step indicators, styled based on completion state
 *
 * Uses Park UI token patterns:
 * - colorPalette.solid.* for primary/current state
 * - colorPalette.subtle.* for secondary/completed state
 * - neutral.subtle.* and fg.muted for default/upcoming state
 */
export const stepperRecipe = defineSlotRecipe({
  className: 'stepper',
  description: 'Multi-step progress indicator for guided workflows',

  slots: [
    'root',
    'list',
    'item',
    'trigger',
    'indicator',
    'separator',
    'content',
    'progress',
    'prevTrigger',
    'nextTrigger',
  ],

  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'lg',
      colorPalette: 'primary',
    },

    list: {
      display: 'flex',
      alignItems: 'center',
      gap: '0',
      position: 'relative',
    },

    item: {
      display: 'flex',
      alignItems: 'center',
      flex: '1',
      position: 'relative',

      '&:last-child': {
        flex: '0',
      },
    },

    trigger: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'xs',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '0',
      position: 'relative',
      zIndex: '2',

      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },

    indicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      borderRadius: 'full',
      fontWeight: 'medium',
      fontSize: 'lg',
      transition: 'all',
      transitionDuration: 'normal',
      position: 'relative',
      zIndex: '3',

      // Upcoming state (default)
      bg: 'neutral.subtle.bg',
      color: 'fg.muted',
      borderWidth: '2px',
      borderColor: 'border',

      // Current state
      _current: {
        bg: 'colorPalette.solid.bg',
        color: 'colorPalette.solid.fg',
        borderColor: 'colorPalette.solid.bg',
        shadow: 'sm',
      },

      // Completed state
      _complete: {
        bg: 'colorPalette.subtle.bg',
        color: 'colorPalette.subtle.fg',
        borderColor: 'colorPalette.subtle.bg',
      },

      _focusVisible: {
        outline: '2px solid',
        outlineColor: 'colorPalette.solid.bg',
        outlineOffset: '2px',
      },
    },

    separator: {
      flex: '1',
      height: '2px',
      bg: 'border',
      transition: 'background',
      transitionDuration: 'normal',
      marginInline: '4',
      position: 'relative',
      zIndex: '1',

      // Completed separator
      _complete: {
        bg: 'colorPalette.solid.bg',
      },
    },

    content: {
      display: 'none',

      _current: {
        display: 'block',
      },
    },

    progress: {
      display: 'none',

      _complete: {
        display: 'block',
      },
    },

    prevTrigger: {},

    nextTrigger: {},
  },

  variants: {
    size: {
      sm: {
        indicator: {
          width: '32px',
          height: '32px',
          fontSize: 'sm',
        },
        separator: {
          height: '1px',
        },
      },
      md: {
        indicator: {
          width: '48px',
          height: '48px',
          fontSize: 'lg',
        },
        separator: {
          height: '2px',
        },
      },
      lg: {
        indicator: {
          width: '56px',
          height: '56px',
          fontSize: 'xl',
        },
        separator: {
          height: '3px',
        },
      },
    },

    orientation: {
      horizontal: {
        root: {
          flexDirection: 'column',
        },
        list: {
          flexDirection: 'row',
        },
      },
      vertical: {
        root: {
          flexDirection: 'row',
        },
        list: {
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
        item: {
          flexDirection: 'column',
        },
        separator: {
          width: '2px',
          height: '32px',
          marginBlock: '4',
        },
      },
    },

    colorPalette: {
      primary: {},
      secondary: {},
      tertiary: {},
      error: {},
      neutral: {},
    },
  },

  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
    colorPalette: 'primary',
  },
});
