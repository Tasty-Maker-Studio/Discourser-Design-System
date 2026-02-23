import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClockIcon } from '../src/components/Icons/ClockIcon';
import { GripDotsVerticalIcon } from '../src/components/Icons/GripDotsVerticalIcon';
import { DashboardIcon } from '../src/components/Icons/DashboardIcon';
import { NotebookIcon } from '../src/components/Icons/NotebookIcon';
import { ScenarioIcon } from '../src/components/Icons/ScenarioIcon';
import { HelpIcon } from '../src/components/Icons/HelpIcon';
import { AccountIcon } from '../src/components/Icons/AccountIcon';
import { RightArrowIcon } from '../src/components/Icons/RightArrowIcon';
import { ChevronUpIcon } from '../src/components/Icons/ChevronUpIcon';
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
          <RightArrowIcon w="6" h="6" color="fg.default" />
          <span className={label}>RightArrowIcon</span>
        </VStack>
        <VStack gap="2" alignItems="center">
          <ChevronUpIcon w="6" h="6" color="fg.default" />
          <span className={label}>ChevronUpIcon</span>
        </VStack>
      </HStack>
    </VStack>
  ),
};
