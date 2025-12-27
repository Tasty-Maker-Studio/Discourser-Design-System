import { defineSlotRecipe } from '@pandacss/dev';

export const dialogRecipe = defineSlotRecipe({
  className: 'dialog',
  description: 'Material Design 3 dialog component',
  slots: ['backdrop', 'positioner', 'content', 'title', 'description', 'closeTrigger'],
  base: {
    backdrop: {
      position: 'fixed',
      inset: '0',
      bg: 'scrim',
      opacity: 0.4,
      zIndex: 'modal',
      animation: 'fadeIn',
      _open: {
        animation: 'fadeIn',
      },
      _closed: {
        animation: 'fadeOut',
      },
    },
    positioner: {
      position: 'fixed',
      inset: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 'modal',
      p: 'lg',
    },
    content: {
      position: 'relative',
      bg: 'surfaceContainerHigh',
      color: 'onSurface',
      borderRadius: 'extraLarge',
      boxShadow: 'level3',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '90vw',
      maxHeight: '90vh',
      overflow: 'hidden',
      animation: 'scaleIn',
      _open: {
        animation: 'scaleIn',
      },
      _closed: {
        animation: 'scaleOut',
      },
    },
    title: {
      fontFamily: 'headline',
      fontSize: 'headlineSmall',
      fontWeight: 'regular',
      color: 'onSurface',
      px: 'xl',
      pt: 'xl',
      pb: 'md',
    },
    description: {
      fontFamily: 'body',
      fontSize: 'bodyMedium',
      color: 'onSurfaceVariant',
      px: 'xl',
      pb: 'xl',
      flex: '1',
      overflow: 'auto',
    },
    closeTrigger: {
      position: 'absolute',
      top: 'md',
      right: 'md',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: 'full',
      cursor: 'pointer',
      color: 'onSurfaceVariant',
      bg: 'transparent',
      border: 'none',
      transition: 'all',
      transitionDuration: 'fast',
      _hover: {
        bg: 'surfaceContainerHighest',
      },
      _focus: {
        outline: 'none',
        bg: 'surfaceContainerHighest',
      },
    },
  },
  variants: {
    size: {
      sm: {
        content: {
          width: '280px',
          minHeight: '140px',
        },
      },
      md: {
        content: {
          width: '560px',
          minHeight: '200px',
        },
      },
      lg: {
        content: {
          width: '800px',
          minHeight: '300px',
        },
      },
      fullscreen: {
        content: {
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          borderRadius: 'none',
        },
        positioner: {
          p: '0',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
