/**
 * @dds-tokens
 * recipe: card
 * variantProps: variant
 * figmaPropToRecipeProp:
 *   Variant: variant
 */
import figma from '@figma/code-connect';
import * as Card from './Card';

figma.connect(
  Card.Root,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=950-1681',
  {
    props: {
      variant: figma.enum('Variant', {
        Elevated: 'elevated',
        Outline: 'outline',
        Subtle: 'subtle',
      }),
    },
    example: ({ variant }) => (
      <Card.Root variant={variant}>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
          <Card.Description>Card description</Card.Description>
        </Card.Header>
        <Card.Body>Content goes here</Card.Body>
        <Card.Footer>{/* Footer actions */}</Card.Footer>
      </Card.Root>
    ),
  },
);
