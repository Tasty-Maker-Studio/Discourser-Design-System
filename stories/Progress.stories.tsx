import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Progress from '../src/components/Progress';
import { VStack, HStack, Box } from '../styled-system/jsx';
import { useState, useEffect } from 'react';

const meta: Meta<typeof Progress.Root> = {
  title: 'Components / Progress',
  component: Progress.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Progress.Root>;

export const Default: Story = {
  render: () => (
    <Progress.Root colorPalette="primary" value={60}>
      <Progress.Label>Upload Progress</Progress.Label>
      <Progress.ValueText />
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap="6" alignItems="start" width="300px">
      <Progress.Root colorPalette="primary" value={50} size="sm">
        <Progress.Label>Small</Progress.Label>
        <Progress.ValueText />
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>

      <Progress.Root colorPalette="primary" value={60} size="md">
        <Progress.Label>Medium (Default)</Progress.Label>
        <Progress.ValueText />
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>

      <Progress.Root colorPalette="primary" value={70} size="lg">
        <Progress.Label>Large</Progress.Label>
        <Progress.ValueText />
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </VStack>
  ),
};

export const ColorPalettes: Story = {
  render: () => (
    <VStack gap="6" alignItems="start" width="300px">
      <Progress.Root colorPalette="primary" value={60}>
        <Progress.Label>Primary (Green)</Progress.Label>
        <Progress.ValueText />
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>

      <Progress.Root colorPalette="neutral" value={60}>
        <Progress.Label>Neutral (Gray)</Progress.Label>
        <Progress.ValueText />
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>

      <Progress.Root colorPalette="error" value={60}>
        <Progress.Label>Error (Red)</Progress.Label>
        <Progress.ValueText />
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </VStack>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <Progress.Root colorPalette="primary" value={null}>
      <Progress.Label>Loading...</Progress.Label>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  ),
};

export const Circular: Story = {
  render: () => (
    <HStack gap="8">
      <Progress.Root colorPalette="primary" value={25} type="circular">
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
        <Progress.ValueText />
      </Progress.Root>

      <Progress.Root colorPalette="primary" value={50} type="circular">
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
        <Progress.ValueText />
      </Progress.Root>

      <Progress.Root colorPalette="primary" value={75} type="circular">
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
        <Progress.ValueText />
      </Progress.Root>

      <Progress.Root colorPalette="primary" value={100} type="circular">
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
        <Progress.ValueText />
      </Progress.Root>
    </HStack>
  ),
};

export const CircularSizes: Story = {
  render: () => (
    <HStack gap="8" alignItems="center">
      <Progress.Root colorPalette="primary" value={60} type="circular" size="sm">
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
        <Progress.ValueText />
      </Progress.Root>

      <Progress.Root colorPalette="primary" value={60} type="circular" size="md">
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
        <Progress.ValueText />
      </Progress.Root>

      <Progress.Root colorPalette="primary" value={60} type="circular" size="lg">
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
        <Progress.ValueText />
      </Progress.Root>
    </HStack>
  ),
};

export const Animated: Story = {
  render: function AnimatedProgress() {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(interval);
    }, []);

    return (
      <VStack gap="6" alignItems="start" width="300px">
        <Progress.Root colorPalette="primary" value={value}>
          <Progress.Label>Linear Animation</Progress.Label>
          <Progress.ValueText />
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>

        <Box>
          <Progress.Root colorPalette="primary" value={value} type="circular">
            <Progress.Circle>
              <Progress.CircleTrack />
              <Progress.CircleRange />
            </Progress.Circle>
            <Progress.ValueText />
          </Progress.Root>
        </Box>
      </VStack>
    );
  },
};
