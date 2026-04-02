import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClockIcon } from '../src/components/Icons/ClockIcon';
import { GripDotsVerticalIcon } from '../src/components/Icons/GripDotsVerticalIcon';
import { DashboardIcon } from '../src/components/Icons/DashboardIcon';
import { NotebookIcon } from '../src/components/Icons/NotebookIcon';
import { ScenarioIcon } from '../src/components/Icons/ScenarioIcon';
import { HelpIcon } from '../src/components/Icons/HelpIcon';
import { AccountIcon } from '../src/components/Icons/AccountIcon';
import { RightArrowIcon } from '../src/components/Icons/RightArrowIcon';
import { LeftArrowIcon } from '../src/components/Icons/LeftArrowIcon';
import { ChevronUpIcon } from '../src/components/Icons/ChevronUpIcon';
import { TimerIcon } from '../src/components/Icons/TimerIcon';
import { ClipBoardIcon } from '../src/components/Icons/ClipBoardIcon';
import { MicrophoneIcon } from '../src/components/Icons/MicrophoneIcon';
import { AudienceIcon } from '../src/components/Icons/AudienceIcon';
import { RecordIcon } from '../src/components/Icons/RecordIcon';
import { NotebookPenIcon } from '../src/components/Icons/NotebookPenIcon';
import { SparklesIcon } from '../src/components/Icons/SparklesIcon';
import { ScrollTextIcon } from '../src/components/Icons/ScrollTextIcon';
import { RepeatQuestionIcon } from '../src/components/Icons/RepeatQuestionIcon';
import { ExitStudioIcon } from '../src/components/Icons/ExitStudioIcon';
import { PausePlayIcon } from '../src/components/Icons/PausePlayIcon';
import { StopPlayIcon } from '../src/components/Icons/StopPlayIcon';
import { BookmarkPlusIcon } from '../src/components/Icons/BookmarkPlusIcon';
import { AudioSpeakerIcon } from '../src/components/Icons/AudioSpeakerIcon';
import { UserProfileIcon } from '../src/components/Icons/UserProfileIcon';
import { PlayIcon } from '../src/components/Icons/PlayIcon';
import { SpeechIcon } from '../src/components/Icons/SpeechIcon';
import { AppleLoginIcon } from '../src/components/Icons/AppleLoginIcon';
import { GoogleLoginIcon } from '../src/components/Icons/GoogleLoginIcon';
import { ChevronUpDownIcon } from '../src/components/Icons/ChevronUpDownIcon';
import { LogoutIcon } from '../src/components/Icons/LogoutIcon';
import { LoginIcon } from '../src/components/Icons/LoginIcon';
import { HStack, VStack } from '../styled-system/jsx';
import { css } from '../styled-system/css';

const meta = {
  title: 'Components/Icons',
  component: GripDotsVerticalIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GripDotsVerticalIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

const label = css({
  fontSize: 'xs',
  color: 'fg.muted',
  mt: '1',
  textAlign: 'center',
});

/**
 * Default icon at 1em (inherits font-size from parent)
 */
export const Default: Story = {
  args: {
    color: 'fg.default',
    w: '6',
    h: '6',
  },
};

/**
 * Icons scale with the `w` / `h` Panda CSS props (or font-size via 1em default)
 */
export const Sizes: Story = {
  render: () => (
    <HStack gap="8" alignItems="flex-end">
      <VStack gap="1" alignItems="center">
        <GripDotsVerticalIcon w="4" h="4" color="fg.default" />
        <span className={label}>16px</span>
      </VStack>
      <VStack gap="1" alignItems="center">
        <GripDotsVerticalIcon w="5" h="5" color="fg.default" />
        <span className={label}>20px</span>
      </VStack>
      <VStack gap="1" alignItems="center">
        <GripDotsVerticalIcon w="6" h="6" color="fg.default" />
        <span className={label}>24px</span>
      </VStack>
      <VStack gap="1" alignItems="center">
        <GripDotsVerticalIcon w="8" h="8" color="fg.default" />
        <span className={label}>32px</span>
      </VStack>
    </HStack>
  ),
};

/**
 * Icons inherit `color` via `stroke="currentColor"` — pass any Panda token
 */
export const Colors: Story = {
  render: () => (
    <HStack gap="8" alignItems="flex-end">
      <VStack gap="1" alignItems="center">
        <GripDotsVerticalIcon w="6" h="6" color="fg.default" />
        <span className={label}>fg.default</span>
      </VStack>
      <VStack gap="1" alignItems="center">
        <GripDotsVerticalIcon w="6" h="6" color="fg.muted" />
        <span className={label}>fg.muted</span>
      </VStack>
      <VStack gap="1" alignItems="center">
        <GripDotsVerticalIcon w="6" h="6" color="fg.subtle" />
        <span className={label}>fg.subtle</span>
      </VStack>
      <VStack gap="1" alignItems="center">
        <GripDotsVerticalIcon w="6" h="6" color="primary.solid.bg" />
        <span className={label}>primary</span>
      </VStack>
    </HStack>
  ),
};

/**
 * All icons in the library
 */
export const Gallery: Story = {
  render: () => (
    <VStack gap="8" alignItems="flex-start">
      <HStack gap="8" flexWrap="wrap" alignItems="flex-end">
        <VStack gap="2" alignItems="center">
          <GripDotsVerticalIcon w="6" h="6" color="fg.default" />
          <span className={label}>GripDotsVerticalIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <ClockIcon w="6" h="6" color="fg.default" />
          <span className={label}>ClockIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <DashboardIcon w="6" h="6" color="fg.default" />
          <span className={label}>DashboardIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <NotebookIcon w="6" h="6" color="fg.default" />
          <span className={label}>NotebookIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <ScenarioIcon w="6" h="6" color="fg.default" />
          <span className={label}>ScenarioIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <HelpIcon w="6" h="6" color="fg.default" />
          <span className={label}>HelpIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <AccountIcon w="6" h="6" color="fg.default" />
          <span className={label}>AccountIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <LeftArrowIcon w="6" h="6" color="fg.default" />
          <span className={label}>LeftArrowIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <RightArrowIcon w="6" h="6" color="fg.default" />
          <span className={label}>RightArrowIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <ChevronUpIcon w="6" h="6" color="fg.default" />
          <span className={label}>ChevronUpIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <TimerIcon w="6" h="6" color="fg.default" />
          <span className={label}>TimerIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <ClipBoardIcon w="6" h="6" color="fg.default" />
          <span className={label}>ClipBoardIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <MicrophoneIcon w="6" h="6" color="fg.default" />
          <span className={label}>MicrophoneIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <AudienceIcon w="6" h="6" color="fg.default" />
          <span className={label}>AudienceIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <RecordIcon w="6" h="6" color="fg.default" />
          <span className={label}>RecordIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <NotebookPenIcon w="6" h="6" color="fg.default" />
          <span className={label}>NotebookPenIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <SparklesIcon w="6" h="6" color="fg.default" />
          <span className={label}>SparklesIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <ScrollTextIcon w="6" h="6" color="fg.default" />
          <span className={label}>ScrollTextIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <RepeatQuestionIcon w="6" h="6" color="fg.default" />
          <span className={label}>RepeatQuestionIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <ExitStudioIcon w="6" h="6" color="fg.default" />
          <span className={label}>ExitStudioIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <PausePlayIcon w="6" h="6" color="fg.default" />
          <span className={label}>PausePlayIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <StopPlayIcon w="6" h="6" color="fg.default" />
          <span className={label}>StopPlayIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <BookmarkPlusIcon w="6" h="6" color="fg.default" />
          <span className={label}>BookmarkPlusIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <AudioSpeakerIcon w="6" h="6" color="fg.default" />
          <span className={label}>AudioSpeakerIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <UserProfileIcon w="6" h="6" color="fg.default" />
          <span className={label}>UserProfileIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <PlayIcon w="6" h="6" color="fg.default" />
          <span className={label}>PlayIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <SpeechIcon w="6" h="6" color="fg.default" />
          <span className={label}>SpeechIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <AppleLoginIcon w="6" h="6" color="fg.default" />
          <span className={label}>AppleLoginIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <GoogleLoginIcon w="6" h="6" />
          <span className={label}>GoogleLoginIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <ChevronUpDownIcon w="6" h="6" color="fg.default" />
          <span className={label}>ChevronUpDownIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <LogoutIcon w="6" h="6" color="fg.default" />
          <span className={label}>LogoutIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <LoginIcon w="10" h="10" />
          <span className={label}>LoginIcon</span>
        </VStack>
      </HStack>
    </VStack>
  ),
};
