import figma from '@figma/code-connect';
import { Input } from './Input';

figma.connect(
  Input,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-8909',
  {
    props: {
      type: figma.enum('Type', {
        Text: 'text',
        File: 'file',
        Password: 'password',
      }),
    },
    example: ({ type }) => <Input type={type} placeholder="Enter value" />,
  },
);
