import { dialogAnatomy } from '@ark-ui/react/anatomy';
import { defineSlotRecipe } from '@pandacss/dev';

export const dialog = defineSlotRecipe({
  className: 'dialog',
  slots: dialogAnatomy.extendWith('header', 'body', 'footer').keys(),
  base: {
    backdrop: {
      background: 'neutral.a7',
      height: '100dvh',
      left: '0',
      position: 'fixed',
      top: '0',
      width: '100dvw',
      zIndex: 'overlay',
      _open: {
        animationDuration: 'normal',
      },
      _closed: {
        animationDuration: 'fast',
      },
    },
    positioner: {
      display: 'flex',
      height: '100dvh',
      justifyContent: 'center',
      left: 0,
      overscrollBehaviorY: 'none',
      position: 'fixed',
      top: 0,
      width: '100dvw',
      zIndex: 'modal',
    },
    title: {
      fontWeight: 'semibold',
      textStyle: 'lg',
    },
    description: {
      color: 'fg.muted',
      textStyle: 'sm',
    },
    closeTrigger: {
      pos: 'absolute',
      top: '3',
      insetEnd: '3',
    },
    content: {
      bg: 'neutral.surface.bg',
      borderRadius: 'l3',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      my: 'auto',
      outline: 0,
      position: 'relative',
      textStyle: 'sm',
      width: '100%',
      zIndex: 'modal',
      py: { base: '4', md: '6' },
      gap: { base: '4', md: '6' },
      _open: {
        animationDuration: 'slowest',
      },
      _closed: {
        animationDuration: 'normal',
      },
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5',
      px: { base: '4', md: '6' },
      flex: '0',
    },
    body: {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      alignItems: 'flex-start',
      px: { base: '4', md: '6' },
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: '0',
      gap: '3',
      px: { base: '4', md: '6' },
    },
  },
  defaultVariants: {
    size: 'md',
    scrollBehavior: 'outside',
    placement: 'center',
  },
  variants: {
    size: {
      xs: { content: { maxW: 'xs' } },
      sm: { content: { maxW: 'sm' } },
      md: { content: { maxW: 'md' } },
      lg: { content: { maxW: 'lg' } },
      xl: { content: { maxW: 'xl' } },
      full: {
        content: {
          maxW: '100dvw',
          minH: '100dvh',
          borderRadius: '0',
        },
      },
    },
    placement: {
      center: {
        positioner: {
          alignItems: 'center',
        },
        content: {
          mx: 'auto',
        },
      },
      top: {
        positioner: {
          alignItems: 'flex-start',
        },
        content: {
          mt: '16',
          mx: 'auto',
        },
      },
      bottom: {
        positioner: {
          alignItems: 'flex-end',
        },
        content: {
          mb: '16',
          mx: 'auto',
        },
      },
    },
    scrollBehavior: {
      inside: {
        positioner: {
          overflow: 'hidden',
        },
        content: {
          maxH: 'calc(100% - 7.5rem)',
        },
        body: {
          overflow: 'auto',
        },
      },
      outside: {
        positioner: {
          overflow: 'auto',
          pointerEvents: 'auto',
        },
      },
    },
  },
});
