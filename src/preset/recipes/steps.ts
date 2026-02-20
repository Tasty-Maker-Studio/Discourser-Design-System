import { defineSlotRecipe } from '@pandacss/dev';

export const steps = defineSlotRecipe({
  className: 'steps',
  slots: ['root', 'list', 'item', 'trigger', 'indicator', 'separator', 'content', 'nextTrigger', 'prevTrigger', 'progress'],
  base: {},
});
