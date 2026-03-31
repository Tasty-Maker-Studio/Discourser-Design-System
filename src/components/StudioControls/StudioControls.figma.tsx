import figma from '@figma/code-connect';
import { StudioControls } from './index';

figma.connect(
  StudioControls,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-8232',
  {
    props: {
      scenarioName: figma.string('Scenario Name'),
      scenarioFocus: figma.string('Scenario Focus'),
      scenarioLevel: figma.enum('Level', {
        Beginner: 'beginner',
        Intermediate: 'intermediate',
        Advanced: 'advanced',
      }),
    },
    example: ({ scenarioName, scenarioFocus, scenarioLevel }) => (
      <StudioControls
        scenarioName={scenarioName}
        scenarioFocus={scenarioFocus}
        scenarioLevel={scenarioLevel}
      />
    ),
  },
);
