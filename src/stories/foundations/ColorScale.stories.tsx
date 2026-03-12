import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { css } from 'styled-system/css';

const meta = {
  title: 'Foundations/Color Scale',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type Palette = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'error';
const PALETTES: Palette[] = [
  'primary',
  'secondary',
  'tertiary',
  'neutral',
  'error',
];
const SCALE_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
const ALPHA_STEPS = [
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
  'a7',
  'a8',
  'a9',
  'a10',
  'a11',
  'a12',
] as const;

// ── Pre-declared css() calls — Panda CSS statically extracts these ─────────────
// (dynamic template literals cannot be extracted; explicit literals are required)

const scaleBg: Record<Palette, Record<number, string>> = {
  primary: {
    1: css({ bg: 'primary.1' }),
    2: css({ bg: 'primary.2' }),
    3: css({ bg: 'primary.3' }),
    4: css({ bg: 'primary.4' }),
    5: css({ bg: 'primary.5' }),
    6: css({ bg: 'primary.6' }),
    7: css({ bg: 'primary.7' }),
    8: css({ bg: 'primary.8' }),
    9: css({ bg: 'primary.9' }),
    10: css({ bg: 'primary.10' }),
    11: css({ bg: 'primary.11' }),
    12: css({ bg: 'primary.12' }),
  },
  secondary: {
    1: css({ bg: 'secondary.1' }),
    2: css({ bg: 'secondary.2' }),
    3: css({ bg: 'secondary.3' }),
    4: css({ bg: 'secondary.4' }),
    5: css({ bg: 'secondary.5' }),
    6: css({ bg: 'secondary.6' }),
    7: css({ bg: 'secondary.7' }),
    8: css({ bg: 'secondary.8' }),
    9: css({ bg: 'secondary.9' }),
    10: css({ bg: 'secondary.10' }),
    11: css({ bg: 'secondary.11' }),
    12: css({ bg: 'secondary.12' }),
  },
  tertiary: {
    1: css({ bg: 'tertiary.1' }),
    2: css({ bg: 'tertiary.2' }),
    3: css({ bg: 'tertiary.3' }),
    4: css({ bg: 'tertiary.4' }),
    5: css({ bg: 'tertiary.5' }),
    6: css({ bg: 'tertiary.6' }),
    7: css({ bg: 'tertiary.7' }),
    8: css({ bg: 'tertiary.8' }),
    9: css({ bg: 'tertiary.9' }),
    10: css({ bg: 'tertiary.10' }),
    11: css({ bg: 'tertiary.11' }),
    12: css({ bg: 'tertiary.12' }),
  },
  neutral: {
    1: css({ bg: 'neutral.1' }),
    2: css({ bg: 'neutral.2' }),
    3: css({ bg: 'neutral.3' }),
    4: css({ bg: 'neutral.4' }),
    5: css({ bg: 'neutral.5' }),
    6: css({ bg: 'neutral.6' }),
    7: css({ bg: 'neutral.7' }),
    8: css({ bg: 'neutral.8' }),
    9: css({ bg: 'neutral.9' }),
    10: css({ bg: 'neutral.10' }),
    11: css({ bg: 'neutral.11' }),
    12: css({ bg: 'neutral.12' }),
  },
  error: {
    1: css({ bg: 'error.1' }),
    2: css({ bg: 'error.2' }),
    3: css({ bg: 'error.3' }),
    4: css({ bg: 'error.4' }),
    5: css({ bg: 'error.5' }),
    6: css({ bg: 'error.6' }),
    7: css({ bg: 'error.7' }),
    8: css({ bg: 'error.8' }),
    9: css({ bg: 'error.9' }),
    10: css({ bg: 'error.10' }),
    11: css({ bg: 'error.11' }),
    12: css({ bg: 'error.12' }),
  },
};

const alphaBg: Record<Palette, Record<string, string>> = {
  primary: {
    a1: css({ bg: 'primary.a1' }),
    a2: css({ bg: 'primary.a2' }),
    a3: css({ bg: 'primary.a3' }),
    a4: css({ bg: 'primary.a4' }),
    a5: css({ bg: 'primary.a5' }),
    a6: css({ bg: 'primary.a6' }),
    a7: css({ bg: 'primary.a7' }),
    a8: css({ bg: 'primary.a8' }),
    a9: css({ bg: 'primary.a9' }),
    a10: css({ bg: 'primary.a10' }),
    a11: css({ bg: 'primary.a11' }),
    a12: css({ bg: 'primary.a12' }),
  },
  secondary: {
    a1: css({ bg: 'secondary.a1' }),
    a2: css({ bg: 'secondary.a2' }),
    a3: css({ bg: 'secondary.a3' }),
    a4: css({ bg: 'secondary.a4' }),
    a5: css({ bg: 'secondary.a5' }),
    a6: css({ bg: 'secondary.a6' }),
    a7: css({ bg: 'secondary.a7' }),
    a8: css({ bg: 'secondary.a8' }),
    a9: css({ bg: 'secondary.a9' }),
    a10: css({ bg: 'secondary.a10' }),
    a11: css({ bg: 'secondary.a11' }),
    a12: css({ bg: 'secondary.a12' }),
  },
  tertiary: {
    a1: css({ bg: 'tertiary.a1' }),
    a2: css({ bg: 'tertiary.a2' }),
    a3: css({ bg: 'tertiary.a3' }),
    a4: css({ bg: 'tertiary.a4' }),
    a5: css({ bg: 'tertiary.a5' }),
    a6: css({ bg: 'tertiary.a6' }),
    a7: css({ bg: 'tertiary.a7' }),
    a8: css({ bg: 'tertiary.a8' }),
    a9: css({ bg: 'tertiary.a9' }),
    a10: css({ bg: 'tertiary.a10' }),
    a11: css({ bg: 'tertiary.a11' }),
    a12: css({ bg: 'tertiary.a12' }),
  },
  neutral: {
    a1: css({ bg: 'neutral.a1' }),
    a2: css({ bg: 'neutral.a2' }),
    a3: css({ bg: 'neutral.a3' }),
    a4: css({ bg: 'neutral.a4' }),
    a5: css({ bg: 'neutral.a5' }),
    a6: css({ bg: 'neutral.a6' }),
    a7: css({ bg: 'neutral.a7' }),
    a8: css({ bg: 'neutral.a8' }),
    a9: css({ bg: 'neutral.a9' }),
    a10: css({ bg: 'neutral.a10' }),
    a11: css({ bg: 'neutral.a11' }),
    a12: css({ bg: 'neutral.a12' }),
  },
  error: {
    a1: css({ bg: 'error.a1' }),
    a2: css({ bg: 'error.a2' }),
    a3: css({ bg: 'error.a3' }),
    a4: css({ bg: 'error.a4' }),
    a5: css({ bg: 'error.a5' }),
    a6: css({ bg: 'error.a6' }),
    a7: css({ bg: 'error.a7' }),
    a8: css({ bg: 'error.a8' }),
    a9: css({ bg: 'error.a9' }),
    a10: css({ bg: 'error.a10' }),
    a11: css({ bg: 'error.a11' }),
    a12: css({ bg: 'error.a12' }),
  },
};

const semanticClasses: Record<
  Palette,
  {
    solidBg: string;
    subtleBg: string;
    surfaceBg: string;
    outlineBorderColor: string;
    plainFg: string;
  }
> = {
  primary: {
    solidBg: css({ bg: 'primary.solid.bg' }),
    subtleBg: css({ bg: 'primary.subtle.bg' }),
    surfaceBg: css({ bg: 'primary.surface.bg' }),
    outlineBorderColor: css({ borderColor: 'primary.outline.border' }),
    plainFg: css({ color: 'primary.plain.fg' }),
  },
  secondary: {
    solidBg: css({ bg: 'secondary.solid.bg' }),
    subtleBg: css({ bg: 'secondary.subtle.bg' }),
    surfaceBg: css({ bg: 'secondary.surface.bg' }),
    outlineBorderColor: css({ borderColor: 'secondary.outline.border' }),
    plainFg: css({ color: 'secondary.plain.fg' }),
  },
  tertiary: {
    solidBg: css({ bg: 'tertiary.solid.bg' }),
    subtleBg: css({ bg: 'tertiary.subtle.bg' }),
    surfaceBg: css({ bg: 'tertiary.surface.bg' }),
    outlineBorderColor: css({ borderColor: 'tertiary.outline.border' }),
    plainFg: css({ color: 'tertiary.plain.fg' }),
  },
  neutral: {
    solidBg: css({ bg: 'neutral.solid.bg' }),
    subtleBg: css({ bg: 'neutral.subtle.bg' }),
    surfaceBg: css({ bg: 'neutral.surface.bg' }),
    outlineBorderColor: css({ borderColor: 'neutral.outline.border' }),
    plainFg: css({ color: 'neutral.plain.fg' }),
  },
  error: {
    solidBg: css({ bg: 'error.solid.bg' }),
    subtleBg: css({ bg: 'error.subtle.bg' }),
    surfaceBg: css({ bg: 'error.surface.bg' }),
    outlineBorderColor: css({ borderColor: 'error.outline.border' }),
    plainFg: css({ color: 'error.plain.fg' }),
  },
};

// ── Swatch components ──────────────────────────────────────────────────────────

const swatchBase: React.CSSProperties = {
  width: '52px',
  height: '52px',
  borderRadius: '6px',
  flexShrink: 0,
};

function ScaleStepSwatch({
  palette,
  step,
}: {
  palette: Palette;
  step: number;
}) {
  const isSolidAction = step === 9;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      <div
        className={scaleBg[palette][step]}
        style={{
          ...swatchBase,
          border: '1px solid rgba(0,0,0,0.08)',
          outline: isSolidAction ? '2px solid rgba(0,0,0,0.35)' : undefined,
          outlineOffset: isSolidAction ? '2px' : undefined,
        }}
        title={`${palette}.${step}`}
      />
      <span
        style={{
          fontSize: '10px',
          fontFamily: 'monospace',
          color: '#666',
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        {step}
      </span>
      {isSolidAction && (
        <span
          style={{
            fontSize: '9px',
            color: '#888',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          solid
          <br />
          action
        </span>
      )}
    </div>
  );
}

function AlphaStepSwatch({
  palette,
  step,
}: {
  palette: Palette;
  step: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      <div
        className={alphaBg[palette][step]}
        style={{
          ...swatchBase,
          border: '1px solid rgba(255,255,255,0.2)',
        }}
        title={`${palette}.${step}`}
      />
      <span
        style={{
          fontSize: '10px',
          fontFamily: 'monospace',
          color: '#ddd',
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        {step}
      </span>
    </div>
  );
}

function SemanticRow({ palette }: { palette: Palette }) {
  const classes = semanticClasses[palette];
  const label = (text: string) => (
    <span
      style={{
        fontSize: '9px',
        fontFamily: 'monospace',
        color: '#666',
        textAlign: 'center',
        marginTop: '4px',
        lineHeight: 1.2,
      }}
    >
      {text}
    </span>
  );

  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          className={classes.solidBg}
          style={{ ...swatchBase, border: '1px solid rgba(0,0,0,0.08)' }}
        />
        {label('solid.bg')}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          className={classes.subtleBg}
          style={{ ...swatchBase, border: '1px solid rgba(0,0,0,0.08)' }}
        />
        {label('subtle.bg')}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          className={classes.surfaceBg}
          style={{ ...swatchBase, border: '1px solid rgba(0,0,0,0.08)' }}
        />
        {label('surface.bg')}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          className={classes.outlineBorderColor}
          style={{ ...swatchBase, borderWidth: '2px', borderStyle: 'solid' }}
        />
        {label('outline.border')}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            ...swatchBase,
            border: '1px dashed rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className={classes.plainFg}
            style={{ fontSize: '18px', fontWeight: '700' }}
          >
            Aa
          </span>
        </div>
        {label('plain.fg')}
      </div>
    </div>
  );
}

function PaletteLabel({ palette }: { palette: Palette }) {
  return (
    <span
      style={{
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'capitalize',
        color: '#444',
        fontFamily: 'Inter, system-ui, sans-serif',
        minWidth: '72px',
        display: 'inline-block',
      }}
    >
      {palette}
    </span>
  );
}

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

// ── Section 1: Scale steps (1–12) ─────────────────────────────────────────────

export const ScaleSteps: Story = {
  name: '1 · Scale Steps (1–12)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <SectionHeading
        title="Scale Steps (1–12)"
        description="12-step Radix-style scale mapped from the M3 tonal palette. Steps increase from lightest background (1) to highest-contrast text (12). Step 9 is the primary action color — e.g. the fill for a solid button."
      />
      {PALETTES.map((palette) => (
        <div key={palette}>
          <PaletteLabel palette={palette} />
          <div
            style={{
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap',
              marginTop: '8px',
            }}
          >
            {SCALE_STEPS.map((step) => (
              <ScaleStepSwatch key={step} palette={palette} step={step} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── Section 2: Alpha steps (a1–a12) ───────────────────────────────────────────

export const AlphaSteps: Story = {
  name: '2 · Alpha Steps (a1–a12)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <SectionHeading
        title="Alpha Steps (a1–a12)"
        description="Transparent variants for overlays, tinted surfaces, and layered UI. Rendered on a mid-tone background here so transparency is visible. a1 is near-invisible; a12 is ~94% opaque."
      />
      {PALETTES.map((palette) => (
        <div
          key={palette}
          style={{
            padding: '16px 20px',
            borderRadius: '8px',
            background: '#777',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'capitalize',
              color: '#eee',
              fontFamily: 'Inter, system-ui, sans-serif',
              display: 'block',
              marginBottom: '10px',
            }}
          >
            {palette}
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {ALPHA_STEPS.map((step) => (
              <AlphaStepSwatch key={step} palette={palette} step={step} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── Section 3: Semantic variants ──────────────────────────────────────────────

export const SemanticVariants: Story = {
  name: '3 · Semantic Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <SectionHeading
        title="Semantic Variants"
        description="Pre-composed token paths for common component patterns. Use these in recipes instead of raw scale steps — they adapt correctly to light and dark mode."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '16px 24px',
          alignItems: 'start',
        }}
      >
        {PALETTES.map((palette) => (
          <>
            <div key={`${palette}-label`} style={{ paddingTop: '6px' }}>
              <PaletteLabel palette={palette} />
            </div>
            <SemanticRow key={`${palette}-row`} palette={palette} />
          </>
        ))}
      </div>
    </div>
  ),
};

// ── Section 4: Usage guidance ─────────────────────────────────────────────────

export const UsageGuidance: Story = {
  name: '4 · Usage Guidance',
  render: () => (
    <div
      style={{ maxWidth: '680px', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 20px' }}>
        Usage Guidance
      </h2>

      <table
        style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}
      >
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e5e5' }}>
            <th
              style={{
                textAlign: 'left',
                padding: '8px 12px',
                fontWeight: '600',
                color: '#333',
                width: '160px',
              }}
            >
              Token
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: '8px 12px',
                fontWeight: '600',
                color: '#333',
              }}
            >
              Use for
            </th>
          </tr>
        </thead>
        <tbody>
          {(
            [
              ['1–2', 'App and page backgrounds'],
              ['3–4', 'Subtle hover and interactive backgrounds'],
              ['5–6', 'UI element fills (progress bars, indicators)'],
              ['7–8', 'Borders and separators'],
              ['9', 'Solid interactive fill — primary button background'],
              ['10', 'Hovered solid fill'],
              ['11–12', 'High-contrast text and icons'],
              [
                'a1–a12',
                'Transparent overlays — render on a background to see them',
              ],
              ['solid.bg', 'Filled/solid variant buttons and badges'],
              ['subtle.bg', 'Subtle/soft variant buttons and badges'],
              [
                'surface.bg',
                'Card and surface backgrounds within a color context',
              ],
              [
                'outline.*',
                'Outline/ghost variant buttons (border color + optional hover bg)',
              ],
              [
                'plain.*',
                'Plain/text variant buttons and links (fg color only, bg transparent)',
              ],
            ] as [string, string][]
          ).map(([token, use], i) => (
            <tr
              key={token}
              style={{
                borderBottom: '1px solid #f0f0f0',
                background: i % 2 === 0 ? undefined : '#fafafa',
              }}
            >
              <td
                style={{
                  padding: '8px 12px',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  color: '#444',
                }}
              >
                {token}
              </td>
              <td
                style={{ padding: '8px 12px', color: '#555', lineHeight: 1.5 }}
              >
                {use}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3
        style={{ fontSize: '15px', fontWeight: '600', margin: '32px 0 12px' }}
      >
        Example Usage
      </h3>
      <pre
        style={{
          background: '#f5f5f5',
          padding: '16px',
          borderRadius: '8px',
          fontSize: '13px',
          lineHeight: 1.6,
          overflow: 'auto',
          margin: 0,
        }}
      >
        {`import { css } from 'styled-system/css';

// Solid action button background
css({ bg: 'primary.solid.bg', color: 'primary.solid.fg' })

// Subtle tinted button
css({ bg: 'primary.subtle.bg', color: 'primary.subtle.fg' })

// Outline/ghost button
css({
  bg: 'primary.outline.bg',
  borderColor: 'primary.outline.border',
  color: 'primary.outline.fg',
})

// Plain/text link
css({ color: 'primary.plain.fg' })

// Step-based (for custom components)
css({ bg: 'primary.1' })    // page background
css({ bg: 'primary.9' })    // solid action color
css({ color: 'primary.11' }) // readable body text`}
      </pre>
    </div>
  ),
};
