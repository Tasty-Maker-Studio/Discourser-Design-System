import { defineSlotRecipe } from '@pandacss/dev'

export const scenarioCard = defineSlotRecipe({
  className: 'scenario-card',
  // Slots cover only scenario-specific styling.
  // Base card appearance (bg, border, borderRadius, overflow) comes from
  // Card.Root variant="outline" via the card slot recipe.
  // Layout structure (flex, gap, alignment) comes from Panda CSS JSX primitives.
  slots: ['root', 'positionBadge', 'dragHandle', 'title', 'switchRow', 'switchLabel', 'difficultyBadge', 'durationBadge'],
  base: {
    root: {
      // Left accent border — inactive cards use transparent to preserve card width.
      borderLeftWidth: '3px',
      borderLeftStyle: 'solid',
      borderLeftColor: 'transparent',
      // Custom purple-tinted shadow from Figma spec (0px 2px 8px 0px rgba(167,139,250,0.15)).
      // This overrides Card.Root variant="elevated" (M3 level4) which is too heavy.
      // Raw value intentional: this non-standard shadow has no M3 elevation equivalent.
      boxShadow: '0px 2px 8px 0px rgba(167, 139, 250, 0.15)',
      // Figma cards use neutral/99 (#FDFCF5) — a warm off-white.
      // neutral.surface.bg resolves to white (#FFFFFF) in light mode, so we override.
      bg: 'neutral.1',
      transition: 'border-color',
      transitionDuration: 'normal',
    },

    // Circle primitive handles: w/h (size="12"), borderRadius:full, flex centering.
    // Recipe handles: visual appearance (border, color, font).
    positionBadge: {
      fontSize: 'md',
      fontWeight: 'semibold',
      flexShrink: 0,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'neutral.6',
      color: 'fg.default',
      bg: 'transparent',
      transition: 'all',
      transitionDuration: 'normal',
    },

    dragHandle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // TODO: Create semantic token (e.g. colors.icon.subdued) that maps to secondary.6
      // Using palette bridge value directly until semantic token is defined
      color: 'secondary.6',
      cursor: 'grab',
      flexShrink: 0,
      width: '9',
      height: '10',
      _active: { cursor: 'grabbing' },
    },

    title: {
      width: 'full',
      fontSize: 'sm',
      fontWeight: 'semibold',
      lineHeight: '1.4',
      color: 'fg.default',
    },

    // HStack handles: display:flex, alignItems:center, justifyContent:space-between.
    switchRow: {
      width: 'full',
      pt: '1',
      mt: '1',
    },

    switchLabel: {
      fontSize: 'sm',
      color: 'fg.muted',
      fontWeight: 'medium',
    },

    // Difficulty pill: M3 container tokens selected by data-difficulty attribute.
    // Default (beginner) = primaryContainer; overridden for intermediate/advanced.
    difficultyBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: 'l2',
      px: '2',
      h: '5',
      fontSize: 'xs',
      fontWeight: 'medium',
      bg: 'm3Primary.container',
      color: 'onM3Primary.container',
      '&[data-difficulty="intermediate"]': {
        bg: 'm3Secondary.container',
        color: 'onM3Secondary.container',
      },
      '&[data-difficulty="advanced"]': {
        bg: 'm3Tertiary.container',
        color: 'onM3Tertiary.container',
      },
    },

    // Duration pill: per-difficulty inverse palette colors.
    // Default (beginner): inversePrimary  → semanticDark.primary   (#B1D18A light, #4C662B dark)
    // Intermediate:       inverseSecondary → semanticDark.secondary (#BFCBAD light, #586249 dark)
    // Advanced:           inverseTertiary  → semanticDark.tertiary  (#A0D0CB light, #386663 dark)
    durationBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '1',
      borderRadius: 'l2',
      px: '2',
      h: '5',
      fontSize: 'xs',
      fontWeight: 'medium',
      bg: 'inversePrimary',
      color: 'onSurface',
      '&[data-difficulty="intermediate"]': {
        bg: 'inverseSecondary',
      },
      '&[data-difficulty="advanced"]': {
        bg: 'inverseTertiary',
      },
    },
  },

  variants: {
    isActive: {
      true: {
        root: {
          borderLeftColor: 'primary.6',
        },
        positionBadge: {
          bg: 'primary.6',
          color: 'white',
          borderColor: 'primary.6',
        },
      },
      false: {},
    },
    isDragging: {
      true: {
        root: {
          opacity: '0.4',
        },
      },
      false: {},
    },
  },

  defaultVariants: {
    isActive: false,
    isDragging: false,
  },
})
