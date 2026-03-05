import figma from '@figma/code-connect';
import { TimerIcon } from './TimerIcon';

figma.connect(
  TimerIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-9817',
  {
    example: () => <TimerIcon />,
  },
);
