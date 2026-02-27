import { defineSlotRecipe } from '@pandacss/dev';

export const contentCard = defineSlotRecipe({
  className: 'content-card',
  slots: [
    'root',
    'header',
    'title',
    'badgeBar',
    'body',
    'section',
    'sectionTitle',
    'separator',
    'list',
    'listItem',
  ],
  base: {
    root: {
      bg: 'neutral.1',
      borderRadius: 'xl',
      borderWidth: '2px',
      borderColor: 'border.default',
      display: 'flex',
      flexDirection: 'column',
      w: 'full',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
    },
    title: {
      fontFamily: 'heading',
      fontWeight: 'semibold',
      fontSize: '2xl',
      color: 'fg.default',
      fontVariationSettings: "'SOFT' 0, 'WONK' 1",
    },
    badgeBar: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2.5',
      px: '2.5',
      py: '1',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      gap: '9',
      fontSize: 'xl',
      lineHeight: '1.4',
      color: 'fg.default',
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5',
    },
    sectionTitle: {
      fontFamily: 'heading',
      fontWeight: 'semibold',
      fontSize: '2xl',
      color: 'fg.default',
      fontVariationSettings: "'SOFT' 0, 'WONK' 1",
      px: '2.5',
      py: '2.5',
    },
    separator: {
      borderTopWidth: '1px',
      borderColor: 'border.default',
      w: 'full',
      my: '4',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5',
      listStyleType: 'disc',
      ps: '8',
    },
    listItem: {
      fontSize: 'xl',
      lineHeight: '1.4',
      color: 'fg.default',
    },
  },
  variants: {
    size: {
      sm: {
        root: { maxW: 'xl', pt: '6', px: '6', pb: '6' },
        title: { fontSize: 'xl' },
        body: { fontSize: 'lg' },
        listItem: { fontSize: 'lg' },
      },
      md: {
        root: { maxW: '2xl', pt: '10', px: '10', pb: '10', gap: '6' },
        title: { fontSize: '2xl' },
        body: { fontSize: 'xl' },
        listItem: { fontSize: 'xl' },
      },
      lg: {
        root: { maxW: '4xl', pt: '12', px: '12', pb: '12', gap: '8' },
        title: { fontSize: '3xl' },
        body: { fontSize: 'xl' },
        listItem: { fontSize: 'xl' },
      },
    },
    variant: {
      elevated: {
        root: { boxShadow: 'lg', borderWidth: '0' },
      },
      outline: {
        root: { borderWidth: '2px', borderColor: 'border.default' },
      },
      flat: {
        root: { borderWidth: '0', bg: 'transparent' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
});
