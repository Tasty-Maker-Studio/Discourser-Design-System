import figma from '@figma/code-connect';
import { Header } from './Header';

// Figma size values → DDS heading recipe sizes
figma.connect(
  Header,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=485-4697',
  {
    props: {
      size: figma.enum('size', {
        xSm: 'xs',
        Mdm: 'md',
        Lg: 'lg',
        xLg: 'xl',
        '2xLg': '2xl',
        '3xLg': '3xl',
        '4xLg': '4xl',
        '5xLg': '5xl',
        '6xLg': '6xl',
        '7xlg': '7xl',
      }),
    },
    example: ({ size }) => <Header size={size}>Heading Text</Header>,
  },
);
