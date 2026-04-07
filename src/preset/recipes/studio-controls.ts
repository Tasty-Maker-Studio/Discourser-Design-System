import { defineSlotRecipe } from '@pandacss/dev';

export const studioControls = defineSlotRecipe({
  className: 'studio-controls',
  // ── Token mappings for Conversation Studio right-panel accordion ──
  // Figma file: GaHmFfmvO4loUzuZS4TgEz  node 38:8232
  // Root/panel bg: neutral.1 (#FDFCF5) — Figma var(--neutral/99) — NOT surface.container.highest
  slots: [
    'root',
    'section',
    'sectionTrigger',
    'triggerIcon',
    'triggerLabel',
    'sectionIndicator',
    'sectionContent',
    // Scenario info panel (section 1)
    'infoPanel',
    'scenarioMeta',
    'scenarioName',
    'scenarioFocus',
    'settingsCard',
    'settingsCardHeading',
    'settingsList',
    'settingsRow',
    'settingsRowLabel',
    'settingsBadge',
    'levelButtonRow',
    'levelButton',
    // Slider panels (sections 2-3)
    'sliderPanel',
    'sliderLabel',
    'sliderLabelText',
    'levelBadge',
    'sliderTrack',
    // Radio panel (section 4)
    'radioPanel',
    // Toggle panels (sections 5-6)
    'togglePanel',
    'toggleDescription',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: 'full',
      cursor: 'default',
      bg: 'neutral.1',
    },
    section: {
      borderBottom: 'none',
      width: 'full',
    },
    sectionTrigger: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '4',
      width: 'full',
      pl: '1',
      pr: '5',
      cursor: 'pointer',
    },
    triggerIcon: {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '10', // 40px container — matches Figma 40×40 icon area
      height: '10',
      color: 'primary.40', // M3 tonal 40 — darker/bolder than 50, higher contrast
      fontSize: '32px', // SVGs use width/height: 1em → renders at 32×32px
    },
    triggerLabel: {
      flex: 1,
      textAlign: 'start',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    sectionIndicator: {
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

    // ── Scenario Info Panel (section 1) ─────────────────────────────────────
    infoPanel: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
      px: '15px',
      py: '5',
      bg: 'neutral.1',
      width: 'full',
    },
    scenarioMeta: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
    },
    scenarioName: {
      textStyle: 'bodyMedium',
      fontWeight: 'semibold',
      color: 'onSurface',
    },
    scenarioFocus: {
      textStyle: 'bodyMedium',
      fontWeight: 'medium',
      color: 'onSurface',
    },
    // Stone-bg inner card — Figma: #F5F1EB ≈ surface.container
    settingsCard: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3',
      bg: 'surface.container',
      borderRadius: 'sm',
      px: '5',
      py: '2.5',
    },
    settingsCardHeading: {
      textStyle: 'bodyMedium',
      fontWeight: 'medium',
      color: 'onSurface',
    },
    settingsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5',
    },
    settingsRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'full',
    },
    settingsRowLabel: {
      textStyle: 'bodyMedium',
      fontWeight: 'medium',
      color: 'onSurface',
      flex: 1,
    },
    // Badge: Figma rgba(192,209,92,0.4) ≈ inversePrimary
    settingsBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      px: '2.5',
      py: '1',
      bg: 'inversePrimary',
      color: 'fg.default',
      borderRadius: 'sm',
      fontSize: 'xs',
      fontWeight: 'normal',
      whiteSpace: 'nowrap',
    },
    levelButtonRow: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: 'full',
    },
    // Figma: bg secondary/50 (#6C7D56) ≈ secondary.7
    levelButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2',
      px: '4',
      py: '2',
      bg: 'secondary.7',
      color: 'white',
      borderRadius: 'sm',
      fontSize: 'sm',
      fontWeight: 'medium',
      cursor: 'pointer',
    },

    // ── Slider Panels (sections 2-3) ──────────────────────────────────────────
    sliderPanel: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
      px: '15px',
      py: '5',
      bg: 'neutral.1',
      width: 'full',
    },
    sliderLabel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'full',
    },
    sliderLabelText: {
      textStyle: 'bodyMedium',
      fontWeight: 'medium',
      color: 'onSurface',
    },
    levelBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      px: '3',
      py: '1',
      bg: 'inversePrimary',
      color: 'fg.default',
      borderRadius: 'full',
      fontSize: 'xs',
      fontWeight: 'normal',
      lineHeight: '1',
      whiteSpace: 'nowrap',
    },
    sliderTrack: {
      width: 'full',
    },

    // ── Radio Panel (section 4) ───────────────────────────────────────────────
    radioPanel: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
      px: '15px',
      py: '5',
      bg: 'neutral.1',
      width: 'full',
    },

    // ── Toggle Panels (sections 5-6) ──────────────────────────────────────────
    togglePanel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '4',
      px: '15px',
      py: '5',
      bg: 'neutral.1',
      width: 'full',
    },
    toggleDescription: {
      textStyle: 'bodyMedium',
      fontWeight: 'medium',
      color: 'onSurface',
      flex: 1,
    },
  },
});
