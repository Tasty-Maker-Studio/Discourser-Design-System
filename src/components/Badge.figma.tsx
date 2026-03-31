/**
 * @dds-tokens
 * recipe: badge
 * variantProps: variant, size, colorPalette
 * figmaPropToRecipeProp:
 *   Variant: variant
 *   Size: size
 *   Color: colorPalette
 */
import figma from '@figma/code-connect';
import { Badge } from './Badge';

figma.connect(
  Badge,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=930-1972',
  {
    props: {
      variant: figma.enum('Variant', {
        Solid: 'solid',
        Surface: 'surface',
        Subtle: 'subtle',
        Outline: 'outline',
        Rating: 'rating',
      }),
      colorPalette: figma.enum('Color', {
        Primary: 'primary',
        Secondary: 'secondary',
        Tertiary: 'tertiary',
        Neutral: 'neutral',
        Error: 'error',
      }),
    },
    example: ({ variant, colorPalette }) => (
      <Badge variant={variant} colorPalette={colorPalette}>
        Label
      </Badge>
    ),
  },
);
