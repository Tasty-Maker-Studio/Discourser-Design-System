import { defineSlotRecipe } from '@pandacss/dev'

export const scenarioQueue = defineSlotRecipe({
  className: 'scenario-queue',
  description: 'Panel component with tabs and draggable scenario cards',

  slots: [
    'root',
    'header',
    'title',
    'count',
    'tabsInner',
    'tabList',
    'tabsContent',
    'scrollArea',
    'emptyState',
    'addButtonArea',
    'addButton',
  ],

  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      h: 'full',
      minH: '320px',
      minW: '250px',
      maxW: '300px',
      overflow: 'hidden',
      bg: 'surface',
    },

    header: {
      px: '4',
      pt: '4',
      pb: '2',
      flexShrink: 0,
    },

    title: {
      fontWeight: 'semibold',
      fontSize: 'md',
      color: 'fg.default',
    },

    count: {
      fontSize: 'xs',
      color: 'fg.muted',
      mt: '0.5',
    },

    // Applied directly to Tabs.Root className — handles the flex column growth
    // and scroll containment without a redundant wrapper div.
    tabsInner: {
      flex: '1',
      minHeight: '0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },

    tabList: {
      px: '4',
      flexShrink: 0,
    },

    // Applied to each Tabs.Content — allows independent scrolling per tab.
    tabsContent: {
      flex: '1',
      minHeight: '0',
      overflowY: 'auto',
    },

    // Block layout so cards size to natural height and the container scrolls.
    scrollArea: {
      px: '4',
      py: '3',
      '& > * + *': { marginTop: '6' },
    },

    // Center primitive handles the flex centering; recipe provides spacing/text.
    emptyState: {
      py: '12',
      fontSize: 'sm',
      color: 'fg.muted',
    },

    addButtonArea: {
      px: '4',
      pb: '4',
      pt: '2',
      flexShrink: 0,
    },

    addButton: {
      width: 'full',
    },
  },
})
