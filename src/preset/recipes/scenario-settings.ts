import { defineSlotRecipe } from '@pandacss/dev'

export const scenarioSettings = defineSlotRecipe({
  className: 'scenario-settings',
  // ── Token mappings verified against Figma MCP output (node 38:4186) ──
  // Figma file: GaHmFfmvO4loUzuZS4TgEz — "Discourser Queue Right Accordion"
  slots: [
    'root',
    'section',
    'sectionTrigger',
    'triggerLabel',
    'sectionIndicator',
    'sectionContent',
    // Info panels (sections 1-4): surfacevariant bg, explanation card, adjustments
    'infoPanel',
    'explanationCard',
    'explanationTitle',
    'explanationList',
    'explanationItem',
    'levelLabel',
    'adjustmentsRow',
    // Radio panels (sections 5-6): neutral.1 bg, radio group, badge
    'radioPanel',
    'radioPanelTitle',
    'radioCurrentRow',
    'radioCurrentLabel',
    'currentlyBadge',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: 'full',
      cursor: 'default',
    },
    section: {
      // Remove the accordion's default borderBottom
      borderBottom: 'none',
      width: 'full',
    },
    sectionTrigger: {
      // Layout — non-conflicting props only.
      // fontSize, fontWeight, borderRadius, bg, color, py applied via css={{}} in component.
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '4',
      width: 'full',
      px: '5', // 20px — Figma spec
      cursor: 'pointer',
    },
    triggerLabel: {
      flex: 1,
      textAlign: 'start',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    sectionIndicator: {
      // color applied via css={{}} on ItemIndicator
      flexShrink: 0,
      _open: {
        rotate: '180deg',
      },
    },
    sectionContent: {
      overflow: 'hidden',
      borderRadius: '0',
      width: 'full',
    },

    // ── Info Panel (sections 1-4) ─────────────────────────────────────────────
    // Figma: bg = surfacevariant (#E1E4D5) — closest token: surface.container.highest (#E2E3D8)
    infoPanel: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5', // 20px — Figma spec
      p: '5', // 20px — Figma spec
      bg: 'surface.container.highest',
      width: 'full',
    },

    // Figma: bg = neutral/99 (#FDFCF5), border = surfacevariant, rounded-8, p-20
    explanationCard: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4', // 16px
      p: '5', // 20px
      bg: 'neutral.1', // neutral[99] = #FDFCF5 ✓
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'surface.container.highest',
      borderRadius: 'l3', // 8px
    },

    // Figma: Inter Medium 20px, --dark-surfacecontainerhigh (#282b24 ≈ onSurface)
    explanationTitle: {
      fontSize: 'lg',
      fontWeight: 'semibold',
      color: 'onSurface',
      lineHeight: '1',
    },

    explanationList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3', // 12px between items
      listStyleType: 'disc',
      pl: '5', // indent for disc markers
    },

    explanationItem: {
      fontSize: 'sm', // 16px — Figma spec
      lineHeight: '1.4',
      color: 'fg.default',
    },

    // Figma: Inter Bold — the "Beginner:", "Intermediate:", "Advanced:" labels
    levelLabel: {
      fontWeight: 'bold',
      color: 'fg.default',
    },

    adjustmentsRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'full',
    },

    // ── Radio Panel (sections 5-6) ────────────────────────────────────────────
    // Figma: bg = neutral/99 (#FDFCF5)
    radioPanel: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6', // 24px
      p: '5', // 20px
      bg: 'neutral.1', // neutral[99] = #FDFCF5 ✓
      width: 'full',
    },

    // Figma: Inter Medium 20px, #363636 ≈ onSurface
    radioPanelTitle: {
      fontSize: 'lg',
      fontWeight: 'semibold',
      color: 'onSurface',
      lineHeight: '1',
    },

    radioCurrentRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '2.5', // 10px — Figma spec
      mt: '2.5',  // space below panel title
    },

    // Figma: Inter SemiBold 18px, #363636
    radioCurrentLabel: {
      fontSize: 'md',
      fontWeight: 'semibold',
      color: 'onSurface',
      whiteSpace: 'nowrap',
    },

    // Figma: bg = dark-primary (#B1D18A) = inversePrimary, fully rounded pill
    // px-16, py-6, font: Geist/12px, color: #2c2a27 ≈ fg.default
    currentlyBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '1.5',
      px: '4', // 16px
      py: '1.5', // 6px
      bg: 'inversePrimary', // #B1D18A light mode ✓
      color: 'fg.default',
      borderRadius: 'full',
      fontSize: 'xs', // 12px
      fontWeight: 'normal',
      lineHeight: '1',
      whiteSpace: 'nowrap',
    },
  },
})
