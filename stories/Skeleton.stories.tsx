import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Skeleton, SkeletonCircle, SkeletonText } from '../src/components/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <Skeleton style={{ width: '200px', height: '20px' }} />
    </div>
  ),
};

export const Circle: Story = {
  render: () => (
    <div>
      <Skeleton
        style={{ width: '60px', height: '60px', borderRadius: '50%' }}
      />
    </div>
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
      <div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Skeleton
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
            <Skeleton style={{ width: '60%', height: '16px' }} />
            <Skeleton style={{ width: '40%', height: '14px' }} />
          </div>
        </div>
        <Skeleton
          style={{ width: '100%', height: '14px', marginBottom: '0.5rem' }}
        />
        <Skeleton
          style={{ width: '100%', height: '14px', marginBottom: '0.5rem' }}
        />
        <Skeleton style={{ width: '80%', height: '14px' }} />
      </div>
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
        <div key={i}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Skeleton
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
              <Skeleton style={{ width: '70%', height: '14px' }} />
              <Skeleton style={{ width: '50%', height: '12px' }} />
            </div>
          </div>
        </div>
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
        <div isLoaded={isLoaded}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Skeleton
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
            </Skeleton>
            <div style={{ flex: 1 }}>
              <Skeleton
                style={{ width: '70%', height: '16px', marginBottom: '0.5rem' }}
              >
                <h3 style={{ margin: 0 }}>John Doe</h3>
              </Skeleton>
              <Skeleton style={{ width: '50%', height: '14px' }}>
                <p style={{ margin: 0, color: '#666' }}>Software Engineer</p>
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
