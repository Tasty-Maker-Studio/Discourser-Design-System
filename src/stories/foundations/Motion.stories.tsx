import type { Meta, StoryObj } from '@storybook/react-vite';
import { css } from 'styled-system/css';

const meta = {
  title: 'Foundations/Motion',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Pre-declared css() calls — Panda CSS statically extracts these ─────────────
// (dynamic template literals cannot be extracted; explicit literals are required)

const durationBox: Record<string, string> = {
  instant: css({
    transitionDuration: 'instant',
    transitionProperty: 'background',
    transitionTimingFunction: 'standard',
    bg: 'neutral.3',
  }),
  fast: css({
    transitionDuration: 'fast',
    transitionProperty: 'background',
    transitionTimingFunction: 'standard',
    bg: 'neutral.3',
  }),
  normal: css({
    transitionDuration: 'normal',
    transitionProperty: 'background',
    transitionTimingFunction: 'standard',
    bg: 'neutral.3',
  }),
  slow: css({
    transitionDuration: 'slow',
    transitionProperty: 'background',
    transitionTimingFunction: 'standard',
    bg: 'neutral.3',
  }),
  slower: css({
    transitionDuration: 'slower',
    transitionProperty: 'background',
    transitionTimingFunction: 'standard',
    bg: 'neutral.3',
  }),
};

const durationBoxHover: Record<string, string> = {
  instant: css({ _hover: { bg: 'primary.9' } }),
  fast: css({ _hover: { bg: 'primary.9' } }),
  normal: css({ _hover: { bg: 'primary.9' } }),
  slow: css({ _hover: { bg: 'primary.9' } }),
  slower: css({ _hover: { bg: 'primary.9' } }),
};

const easingBox: Record<string, string> = {
  standard: css({
    transitionTimingFunction: 'standard',
    transitionDuration: 'normal',
    transitionProperty: 'transform',
    bg: 'primary.subtle.bg',
    borderColor: 'primary.outline.border',
  }),
  standardDecelerate: css({
    transitionTimingFunction: 'standardDecelerate',
    transitionDuration: 'normal',
    transitionProperty: 'transform',
    bg: 'primary.subtle.bg',
    borderColor: 'primary.outline.border',
  }),
  standardAccelerate: css({
    transitionTimingFunction: 'standardAccelerate',
    transitionDuration: 'normal',
    transitionProperty: 'transform',
    bg: 'primary.subtle.bg',
    borderColor: 'primary.outline.border',
  }),
  emphasized: css({
    transitionTimingFunction: 'emphasized',
    transitionDuration: 'normal',
    transitionProperty: 'transform',
    bg: 'primary.subtle.bg',
    borderColor: 'primary.outline.border',
  }),
  emphasizedDecelerate: css({
    transitionTimingFunction: 'emphasizedDecelerate',
    transitionDuration: 'normal',
    transitionProperty: 'transform',
    bg: 'primary.subtle.bg',
    borderColor: 'primary.outline.border',
  }),
  emphasizedAccelerate: css({
    transitionTimingFunction: 'emphasizedAccelerate',
    transitionDuration: 'normal',
    transitionProperty: 'transform',
    bg: 'primary.subtle.bg',
    borderColor: 'primary.outline.border',
  }),
};

const easingBoxHover: Record<string, string> = {
  standard: css({ _hover: { transform: 'translateX(40px)' } }),
  standardDecelerate: css({ _hover: { transform: 'translateX(40px)' } }),
  standardAccelerate: css({ _hover: { transform: 'translateX(40px)' } }),
  emphasized: css({ _hover: { transform: 'translateX(40px)' } }),
  emphasizedDecelerate: css({ _hover: { transform: 'translateX(40px)' } }),
  emphasizedAccelerate: css({ _hover: { transform: 'translateX(40px)' } }),
};

// ── Data ────────────────────────────────────────────────────────────────────────

const DURATIONS: { token: string; value: string }[] = [
  { token: 'instant', value: '0ms' },
  { token: 'fast', value: '100ms' },
  { token: 'normal', value: '200ms' },
  { token: 'slow', value: '300ms' },
  { token: 'slower', value: '500ms' },
];

const EASINGS: { token: string }[] = [
  { token: 'standard' },
  { token: 'standardDecelerate' },
  { token: 'standardAccelerate' },
  { token: 'emphasized' },
  { token: 'emphasizedDecelerate' },
  { token: 'emphasizedAccelerate' },
];

// ── Shared helpers ──────────────────────────────────────────────────────────────

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h2
        style={{
          fontSize: '18px',
          fontWeight: '600',
          margin: '0 0 8px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {title}
      </h2>
      <p
        style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: 1.5 }}
      >
        {description}
      </p>
    </div>
  );
}

// ── Story 1: Duration Tokens ───────────────────────────────────────────────────

export const DurationTokens: Story = {
  name: '1 · Duration Tokens',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <SectionHeading
        title="Duration Tokens"
        description="Controls how long a transition takes. Hover each box to see the background transition from neutral to primary. All boxes use the same standard easing — only the duration changes."
      />
      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        {DURATIONS.map(({ token, value }) => (
          <div
            key={token}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              className={`${durationBox[token]} ${durationBoxHover[token]}`}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.08)',
                flexShrink: 0,
              }}
              title={`transitionDuration: ${token}`}
            />
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'monospace',
                color: '#444',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              {token}
            </span>
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                color: '#888',
                textAlign: 'center',
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
      <p
        style={{
          fontSize: '12px',
          color: '#999',
          fontFamily: 'Inter, system-ui, sans-serif',
          margin: 0,
        }}
      >
        Note: <code style={{ fontFamily: 'monospace' }}>instant (0ms)</code>{' '}
        produces no visible transition.
      </p>
    </div>
  ),
};

// ── Story 2: Easing Tokens ─────────────────────────────────────────────────────

export const EasingTokens: Story = {
  name: '2 · Easing Tokens',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <SectionHeading
        title="Easing Tokens"
        description="Controls the acceleration curve of a transition. All demos use normal (200ms) duration. Hover each box to see it translate — the same distance in the same time, but with a different feel."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 200px)',
          gap: '20px 32px',
        }}
      >
        {EASINGS.map(({ token }) => (
          <div
            key={token}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <div
              style={{
                overflow: 'hidden',
                borderRadius: '8px',
                padding: '8px',
                background: 'rgba(0,0,0,0.03)',
              }}
            >
              <div
                className={`${easingBox[token]} ${easingBoxHover[token]}`}
                style={{
                  width: '72px',
                  height: '52px',
                  borderRadius: '6px',
                  border: '1px solid',
                  flexShrink: 0,
                }}
                title={`transitionTimingFunction: ${token}`}
              />
            </div>
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'monospace',
                color: '#444',
                lineHeight: 1.3,
              }}
            >
              {token}
            </span>
          </div>
        ))}
      </div>
      <p
        style={{
          fontSize: '12px',
          color: '#888',
          fontFamily: 'Inter, system-ui, sans-serif',
          margin: 0,
        }}
      >
        All demos use{' '}
        <code style={{ fontFamily: 'monospace' }}>normal (200ms)</code>. Hover
        each box to compare easing curves.
      </p>
    </div>
  ),
};
