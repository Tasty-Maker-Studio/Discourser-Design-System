import figma from '@figma/code-connect';
import { Stepper } from './Stepper';

figma.connect(
  Stepper,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-8520',
  {
    example: () => (
      <Stepper
        steps={[
          { value: 'step1', title: 'Step 1' },
          { value: 'step2', title: 'Step 2' },
          { value: 'step3', title: 'Step 3' },
        ]}
        defaultStep={0}
      />
    ),
  },
);
