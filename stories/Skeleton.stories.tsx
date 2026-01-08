import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Skeleton } from '../src';

const meta: Meta = {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Skeleton.Root>
      <Skeleton.Skeleton style={{ width: '200px', height: '20px' }} />
    </Skeleton.Root>
  ),
};

export const Circle: Story = {
  render: () => (
    <Skeleton.Root>
      <Skeleton.Skeleton
        style={{ width: '60px', height: '60px', borderRadius: '50%' }}
      />
    </Skeleton.Root>
  ),
};

export const Card: Story = {
  render: () => (
    <div
      style={{
        width: '300px',
        padding: '1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}
    >
      <Skeleton.Root>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Skeleton.Skeleton
            style={{ width: '60px', height: '60px', borderRadius: '50%' }}
          />
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <Skeleton.Skeleton style={{ width: '60%', height: '16px' }} />
            <Skeleton.Skeleton style={{ width: '40%', height: '14px' }} />
          </div>
        </div>
        <Skeleton.Skeleton
          style={{ width: '100%', height: '14px', marginBottom: '0.5rem' }}
        />
        <Skeleton.Skeleton
          style={{ width: '100%', height: '14px', marginBottom: '0.5rem' }}
        />
        <Skeleton.Skeleton style={{ width: '80%', height: '14px' }} />
      </Skeleton.Root>
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {[1, 2, 3, 4].map((i) => (
        <Skeleton.Root key={i}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Skeleton.Skeleton
              style={{ width: '40px', height: '40px', borderRadius: '4px' }}
            />
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <Skeleton.Skeleton style={{ width: '70%', height: '14px' }} />
              <Skeleton.Skeleton style={{ width: '50%', height: '12px' }} />
            </div>
          </div>
        </Skeleton.Root>
      ))}
    </div>
  ),
};

export const WithContent: Story = {
  render: () => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <div style={{ width: '300px' }}>
        <button
          onClick={() => setIsLoaded(!isLoaded)}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
          }}
        >
          Toggle Loading
        </button>
        <Skeleton.Root isLoaded={isLoaded}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Skeleton.Skeleton
              style={{ width: '60px', height: '60px', borderRadius: '50%' }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              />
            </Skeleton.Skeleton>
            <div style={{ flex: 1 }}>
              <Skeleton.Skeleton
                style={{ width: '70%', height: '16px', marginBottom: '0.5rem' }}
              >
                <h3 style={{ margin: 0 }}>John Doe</h3>
              </Skeleton.Skeleton>
              <Skeleton.Skeleton style={{ width: '50%', height: '14px' }}>
                <p style={{ margin: 0, color: '#666' }}>Software Engineer</p>
              </Skeleton.Skeleton>
            </div>
          </div>
        </Skeleton.Root>
      </div>
    );
  },
};
