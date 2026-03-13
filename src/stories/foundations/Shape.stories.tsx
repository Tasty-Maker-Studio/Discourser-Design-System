import type { Meta, StoryObj } from '@storybook/react-vite';
import { css } from 'styled-system/css';

const meta = {
  title: 'Foundations/Shape',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Pre-declared css() calls — Panda CSS statically extracts these ─────────────
// (dynamic template literals cannot be extracted; explicit literals are required)

const radiusBox: Record<string, string> = {
  none: css({
    borderRadius: 'none',
    bg: 'primary.subtle.bg',
    borderColor: 'primary.outline.border',
  }),
  extraSmall: css({
    borderRadius: 'extraSmall',
    bg: 'primary.subtle.bg',
    borderColor: 'primary.outline.border',
  }),
  small: css({
    borderRadius: 'small',
    bg: 'primary.subtle.bg',
    borderColor: 'primary.outline.border',
  }),
  medium: css({
    borderRadius: 'medium',
    bg: 'primary.subtle.bg',
    borderColor: 'primary.outline.border',
  }),
  large: css({
    borderRadius: 'large',
    bg: 'primary.subtle.bg',
    borderColor: 'primary.outline.border',
  }),
  extraLarge: css({
    borderRadius: 'extraLarge',
    bg: 'primary.subtle.bg',
    borderColor: 'primary.outline.border',
  }),
  full: css({
    borderRadius: 'full',
    bg: 'primary.subtle.bg',
    borderColor: 'primary.outline.border',
  }),
};

// ── Data ────────────────────────────────────────────────────────────────────────

const RADII: { token: string; value: string; wide?: boolean }[] = [
  { token: 'none', value: '0px' },
  { token: 'extraSmall', value: '4px' },
  { token: 'small', value: '8px' },
  { token: 'medium', value: '12px' },
  { token: 'large', value: '16px' },
  { token: 'extraLarge', value: '28px' },
  { token: 'full', value: '9999px', wide: true },
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

// ── Story 1: Radii Tokens ──────────────────────────────────────────────────────

export const RadiiTokens: Story = {
  name: '1 · Border Radius Tokens',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <SectionHeading
        title="Border Radius Tokens"
        description="Seven radii tokens from sharp corners to fully circular. Use these in recipes via borderRadius token names — never raw pixel values."
      />
      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        {RADII.map(({ token, value, wide }) => (
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
              className={radiusBox[token]}
              style={{
                width: wide ? '120px' : '72px',
                height: wide ? '52px' : '72px',
                border: '1px solid',
                flexShrink: 0,
              }}
              title={`borderRadius: ${token}`}
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
    </div>
  ),
};
