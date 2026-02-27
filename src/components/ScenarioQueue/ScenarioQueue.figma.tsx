import figma from '@figma/code-connect';
import { ScenarioQueue } from './ScenarioQueue';

const scenarios = [
  {
    id: '1',
    title: 'UX Research & Design Interview',
    category: 'UX Design',
    difficulty: 'beginner' as const,
    duration: '10-15 min',
    status: 'queued' as const,
  },
  {
    id: '2',
    title: 'Business Analysis ROI Design Presentation',
    category: 'Business',
    difficulty: 'intermediate' as const,
    duration: '15-25 min',
    status: 'queued' as const,
  },
  {
    id: '3',
    title: 'Product Redesign Challenge',
    category: 'Product',
    difficulty: 'advanced' as const,
    duration: '25-35 min',
    status: 'queued' as const,
  },
];

figma.connect(
  ScenarioQueue,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=478-5757',
  {
    example: () => <ScenarioQueue scenarios={scenarios} />,
  },
);
