import type { Meta, StoryObj } from '@storybook/react-vite';
import { StudioControls } from '../src/components/StudioControls';
import { Box } from 'styled-system/jsx';

const meta: Meta<typeof StudioControls> = {
  title: 'Components/Studio Controls',
  component: StudioControls,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Box w="350px" bg="surface.container.highest" minH="600px">
        <Story />
      </Box>
    ),
  ],
  args: {
    scenarioName: 'UX Interview Practice',
    scenarioFocus: 'Technical Communication',
    scenarioLevel: 'beginner',
  },
};

export default meta;
type Story = StoryObj<typeof StudioControls>;

export const Default: Story = {
  name: 'Default (all expanded, beginner)',
};

export const IntermediateLevel: Story = {
  name: 'Intermediate level',
  args: {
    scenarioLevel: 'intermediate',
  },
};

export const AdvancedLevel: Story = {
  name: 'Advanced level',
  args: {
    scenarioLevel: 'advanced',
  },
};

export const VideoRecordingMode: Story = {
  name: 'Video & audio recording selected',
  args: {
    defaultRecordingMode: 'video-audio',
  },
};

export const TimerHidden: Story = {
  name: 'Show Timer — off by default',
  args: {
    defaultShowTimer: false,
  },
};

export const InterviewersHidden: Story = {
  name: 'Hide Interviewers — on by default',
  args: {
    defaultHideInterviewers: true,
  },
};

export const AllCustomized: Story = {
  name: 'All customized (advanced, video, no timer, no interviewers)',
  args: {
    scenarioLevel: 'advanced',
    defaultAudioLevel: 50,
    defaultMicLevel: 90,
    defaultRecordingMode: 'video-audio',
    defaultShowTimer: false,
    defaultHideInterviewers: true,
  },
};
