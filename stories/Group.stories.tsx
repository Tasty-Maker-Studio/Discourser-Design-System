import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group } from '../src/components/Group';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Group> = {
  title: 'Components/Layout/Group',
  component: Group,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Group>;

export const Default: Story = {
  render: () => (
    <Group>
      <Button variant="outline" colorPalette="primary">
        First
      </Button>
      <Button variant="outline" colorPalette="primary">
        Second
      </Button>
      <Button variant="outline" colorPalette="primary">
        Third
      </Button>
    </Group>
  ),
};

export const Attached: Story = {
  render: () => (
    <Group attached>
      <Button variant="solid" colorPalette="primary">
        Left
      </Button>
      <Button variant="solid" colorPalette="primary">
        Center
      </Button>
      <Button variant="solid" colorPalette="primary">
        Right
      </Button>
    </Group>
  ),
};
