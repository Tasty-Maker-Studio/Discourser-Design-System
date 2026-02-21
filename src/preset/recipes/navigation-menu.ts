import { defineSlotRecipe } from '@pandacss/dev';

export const navigationMenu = defineSlotRecipe({
  className: 'navigation-menu',
  slots: [
    'root',
    'section',
    'sectionTrigger',
    'sectionIcon',
    'sectionTitle',
    'sectionIndicator',
    'sectionContent',
    'itemList',
    'item',
    'itemLink',
  ],
  base: {
    // ── Token mappings verified against Figma MCP output (node 38:4046) ──
    // Figma file: GaHmFfmvO4loUzuZS4TgEz
    root: {
      bg: 'surface.dim', // Figma: #f5f1eb warm sage sidebar bg
      width: 'full',
      py: '2',
    },
    section: {
      borderBottom: 'none',
    },
    sectionTrigger: {
      // Layout-only props — no conflicts with accordion recipe here
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'full',
      cursor: 'pointer',
      // NOTE: fontSize, fontWeight, borderRadius, p, bg, color are applied via
      // css={{}} on Accordion.ItemTrigger in the component (utilities layer > recipes layer).
      // See ScenarioCard.tsx for the same pattern.
      _hover: {
        bg: 'surface.container.high',
      },
    },
    sectionIcon: {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '6', // 24px container
      height: '6',
      color: 'primary.50', // olive green icons — Figma: #518500
      fontSize: '20px', // icon SVGs use width/height: 1em → sets 20×20px
    },
    sectionTitle: {
      flex: 1,
      textAlign: 'start',
      // Font styles inherited from trigger's css={{}} utility overrides
    },
    sectionIndicator: {
      // color set via css={{}} on Accordion.ItemIndicator (utilities > recipes)
      _open: {
        rotate: '180deg',
      },
    },
    sectionContent: {
      overflow: 'hidden',
      borderRadius: '0', // override accordion's default border-radius
    },
    itemList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5',
      pt: '1',
      pb: '2',
    },
    item: {},
    itemLink: {
      display: 'block',
      py: '2', // Figma: 5px top/bottom
      pl: '8', // Figma: 30px left indent → spacing.8 = 32px
      pr: '2', // Figma: 5px right padding
      borderRadius: 'l3', // Figma: 8px
      textDecoration: 'none',
      fontSize: 'md', // Figma: 16px
      fontWeight: 'norma', // Figma: Inter Medium 500
      lineHeight: '1',
      color: 'onSurface', // Figma: #363636
      cursor: 'pointer',
      _hover: {
        bg: 'surface.container.high', // Figma: #ebe7e1
      },
      // Figma active state: surface.container.low (NOT primary.container)
      '&[data-active="true"]': {
        bg: 'surface.container.low', // Figma: #f3f4e9 → surfaceContainerLow
        color: 'onSurface',
      },
    },
  },
});
