import { defineLayerStyles } from '@pandacss/dev';

/**
 * Layer styles from Park UI
 * These provide reusable style combinations for common UI patterns
 */
export const layerStyles = defineLayerStyles({
  disabled: {
    value: {
      cursor: 'not-allowed',
      opacity: '0.67',
      filter: 'grayscale(100%)',
    },
  },
});
