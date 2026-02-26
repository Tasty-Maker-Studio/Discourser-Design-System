import type { Meta, StoryObj } from '@storybook/react-vite';
import { DiscourserLogo } from '../src/components/Icons/DiscourserLogo';

const meta: Meta<typeof DiscourserLogo> = {
  title: 'Components/DiscourserLogo',
  component: DiscourserLogo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DiscourserLogo>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', opacity: 0.5 }}>Small (height: 1em)</p>
        <DiscourserLogo height="1em" />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', opacity: 0.5 }}>Default (height: 1.5em)</p>
        <DiscourserLogo />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', opacity: 0.5 }}>Medium (height: 2em)</p>
        <DiscourserLogo height="2em" />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', opacity: 0.5 }}>Large (height: 3em)</p>
        <DiscourserLogo height="3em" />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', opacity: 0.5 }}>XL (height: 4em)</p>
        <DiscourserLogo height="4em" />
      </div>
    </div>
  ),
};

export const OnDarkBackground: Story = {
  name: 'On Dark Background',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div
        style={{
          background: '#1a1a2e',
          padding: '2rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        data-theme="dark"
      >
        <DiscourserLogo height="2em" color="white" />
      </div>
      <div
        style={{
          background: '#0f0f0f',
          padding: '2rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DiscourserLogo height="2em" color="white" />
      </div>
      <div
        style={{
          background: '#2d1b69',
          padding: '2rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DiscourserLogo height="2em" color="white" />
      </div>
    </div>
  ),
};

export const WithPandaStyleProps: Story = {
  name: 'Panda CSS Style Props',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', opacity: 0.5 }}>Default (currentColor = black)</p>
        <DiscourserLogo height="2em" />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', opacity: 0.5 }}>Gray letterforms</p>
        <DiscourserLogo height="2em" color="gray" />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', opacity: 0.5 }}>With opacity</p>
        <DiscourserLogo height="2em" opacity="0.5" />
      </div>
    </div>
  ),
};
