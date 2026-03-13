import type { Meta, StoryObj } from '@storybook/react-vite';
import { css } from 'styled-system/css';

const meta = {
  title: 'Foundations/Borders',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Pre-declared css() calls — Panda CSS statically extracts these ─────────────
// (dynamic template literals cannot be extracted; explicit literals are required)

const borderBox: Record<string, string> = {
  thin: css({
    borderWidth: 'thin',
    borderStyle: 'solid',
    borderColor: 'neutral.outline.border',
    bg: 'neutral.1',
  }),
  medium: css({
    borderWidth: 'medium',
    borderStyle: 'solid',
    borderColor: 'neutral.outline.border',
    bg: 'neutral.1',
  }),
  thick: css({
    borderWidth: 'thick',
    borderStyle: 'solid',
    borderColor: 'neutral.outline.border',
    bg: 'neutral.1',
  }),
};

// ── Data ────────────────────────────────────────────────────────────────────────

const BORDER_WIDTHS: { token: string; value: string }[] = [
  { token: 'thin', value: '1px' },
  { token: 'medium', value: '2px' },
  { token: 'thick', value: '4px' },
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

// ── Story 1: Border Width Tokens ───────────────────────────────────────────────

export const BorderWidthTokens: Story = {
  name: '1 · Border Width Tokens',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <SectionHeading
        title="Border Width Tokens"
        description="Three border width tokens for consistent stroke weight across components. Use borderWidth token names in recipes — never raw pixel values."
      />
      <div
        style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        {BORDER_WIDTHS.map(({ token, value }) => (
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
              className={borderBox[token]}
              style={{
                width: '120px',
                height: '72px',
                borderRadius: '6px',
                flexShrink: 0,
              }}
              title={`borderWidth: ${token}`}
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
