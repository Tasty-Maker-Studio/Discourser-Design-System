import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(
  Button,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-7993',
  {
    props: {
      variant: figma.enum('Type', {
        Default: 'solid',
        Secondary: 'outline',
        Tertiary: 'plain',
        Neutral: 'surface',
      }),
    },
    example: ({ variant }) => <Button variant={variant}>Label</Button>,
  },
);
