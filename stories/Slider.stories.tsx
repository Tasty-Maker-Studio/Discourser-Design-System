import type { Meta, StoryObj } from '@storybook/react';
import * as Slider from '../src/components/Slider';
import { VStack, HStack, Box } from '../styled-system/jsx';

const meta: Meta<typeof Slider.Root> = {
  title: 'Components / Slider',
  component: Slider.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider.Root>;

export const Default: Story = {
  render: () => (
    <Slider.Root colorPalette="primary" defaultValue={[50]} min={0} max={100}>
      <Slider.Label>Volume</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  ),
};

export const Range: Story = {
  render: () => (
    <Slider.Root colorPalette="primary" defaultValue={[25, 75]} min={0} max={100}>
      <Slider.Label>Price Range</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb index={1}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  ),
};

export const WithMarks: Story = {
  render: () => (
    <Slider.Root colorPalette="primary" defaultValue={[50]} min={0} max={100}>
      <Slider.Label>Temperature</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Marks
          marks={[
            { value: 0, label: '0°C' },
            { value: 25, label: '25°C' },
            { value: 50, label: '50°C' },
            { value: 75, label: '75°C' },
            { value: 100, label: '100°C' },
          ]}
        />
      </Slider.Control>
    </Slider.Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap="8" alignItems="start" width="300px">
      <Slider.Root colorPalette="primary" defaultValue={[50]} size="sm">
        <Slider.Label>Small</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>

      <Slider.Root colorPalette="primary" defaultValue={[50]} size="md">
        <Slider.Label>Medium (Default)</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>

      <Slider.Root colorPalette="primary" defaultValue={[50]} size="lg">
        <Slider.Label>Large</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>
    </VStack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Slider.Root colorPalette="primary" defaultValue={[50]} disabled>
      <Slider.Label>Disabled Slider</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  ),
};

export const Step: Story = {
  render: () => (
    <Slider.Root colorPalette="primary" defaultValue={[0]} min={0} max={100} step={10}>
      <Slider.Label>Increment by 10</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Marks marks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
      </Slider.Control>
    </Slider.Root>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Box height="300px">
      <Slider.Root colorPalette="primary" defaultValue={[50]} min={0} max={100} orientation="vertical" style={{ height: '100%' }}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.Control style={{ height: '100%' }}>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
        <Slider.ValueText />
      </Slider.Root>
    </Box>
  ),
};
