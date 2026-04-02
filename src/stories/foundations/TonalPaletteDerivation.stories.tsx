/**
 * Tonal Palette Derivation Map
 *
 * Shows every M3 tonal primitive — its Figma name, hex value,
 * the CSS variable it would generate IF exposed as a Panda token,
 * and which semantic role(s) it derives into.
 *
 * Key insight: tonal steps have NO direct Panda CSS tokens.
 * They exist only as Figma Primitives variables and as the raw
 * values behind semantic tokens. Use semantic tokens in code.
 *
 * Data sourced from src/languages/material3.language.ts
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';

// ── Raw data sourced directly from material3.language.ts ─────────────────────

const PALETTES = {
  primary: {
    label: 'Primary',
    description: 'TastyMakers green — brand identity, CTAs, active states',
    steps: {
      0: '#000000',
      10: '#102000',
      20: '#1F3700',
      30: '#2F4F00',
      40: '#3F6900',
      50: '#518500',
      60: '#64A104',
      70: '#7DBD2A',
      80: '#97D945',
      90: '#B2F65F',
      95: '#D2FF9B',
      99: '#F9FFE9',
      100: '#FFFFFF',
    },
  },
  secondary: {
    label: 'Secondary',
    description:
      'Muted olive green — supporting actions, less prominent elements',
    steps: {
      0: '#000000',
      10: '#121F04',
      20: '#263515',
      30: '#3C4C2A',
      40: '#54643F',
      50: '#6C7D56',
      60: '#85976E',
      70: '#A0B187',
      80: '#BBCDA1',
      90: '#D7E9BB',
      95: '#E5F7C9',
      99: '#F9FFE9',
      100: '#FFFFFF',
    },
  },
  tertiary: {
    label: 'Tertiary',
    description:
      'Teal / cyan — accent color, visual contrast, complementary interest',
    steps: {
      0: '#000000',
      10: '#00201E',
      20: '#003735',
      30: '#00504C',
      40: '#046A66',
      50: '#30837F',
      60: '#4D9D98',
      70: '#69B8B3',
      80: '#85D4CF',
      90: '#A1F1EB',
      95: '#B0FFF9',
      99: '#F2FFFD',
      100: '#FFFFFF',
    },
  },
  neutral: {
    label: 'Neutral',
    description: 'Warm gray — all surface, background, and primary text tokens',
    steps: {
      0: '#000000',
      10: '#1B1C18',
      20: '#30312C',
      30: '#464742',
      40: '#5E5F59',
      50: '#777771',
      60: '#91918B',
      70: '#ABACA5',
      80: '#C7C7C0',
      90: '#E3E3DB',
      95: '#F2F1E9',
      99: '#FDFCF5',
      100: '#FFFFFF',
    },
  },
  neutralVariant: {
    label: 'Neutral Variant',
    description:
      'Slightly warmer gray — chip backgrounds, secondary borders, muted text',
    steps: {
      0: '#000000',
      10: '#191D14',
      20: '#2E3228',
      30: '#44483D',
      40: '#5C6054',
      50: '#75796C',
      60: '#8F9285',
      70: '#A9AD9F',
      80: '#C5C8BA',
      90: '#E1E4D5',
      95: '#EFF2E3',
      99: '#FBFEEE',
      100: '#FFFFFF',
    },
  },
  error: {
    label: 'Error',
    description:
      'Red — destructive actions, validation failures, danger states',
    steps: {
      0: '#000000',
      10: '#410E0B',
      20: '#601410',
      30: '#8C1D18',
      40: '#B3261E',
      50: '#DC362E',
      60: '#E46962',
      70: '#EC928E',
      80: '#F2B8B5',
      90: '#F9DEDC',
      95: '#FCEEEE',
      99: '#FFFBF9',
      100: '#FFFFFF',
    },
  },
} as const;

// ── Derivation map: (palette, step) → semantic Panda CSS token(s) ─────────────
// Sourced from src/preset/semantic-tokens.ts + M3 spec derivation

const DERIVATION: Record<string, string[]> = {
  // Primary
  'primary/10': ['onPrimary.container'],
  'primary/40': ['primary'],
  'primary/80': ['inversePrimary'],
  'primary/90': ['primary.container'],
  'primary/100': ['onPrimary'],
  // Secondary
  'secondary/10': ['onSecondary.container'],
  'secondary/40': ['secondary'],
  'secondary/90': ['secondary.container'],
  'secondary/100': ['onSecondary'],
  // Tertiary
  'tertiary/10': ['onTertiary.container'],
  'tertiary/40': ['tertiary'],
  'tertiary/90': ['tertiary.container'],
  'tertiary/100': ['onTertiary'],
  // Error
  'error/10': ['onError.container'],
  'error/40': ['error'],
  'error/90': ['error.container'],
  'error/100': ['onError'],
  // Neutral → surface system
  'neutral/0': ['scrim', 'shadow'],
  'neutral/10': ['onSurface', 'onBackground'],
  'neutral/20': ['inverseSurface'],
  'neutral/90': ['surface.container'],
  'neutral/95': ['surface.container.low', 'inverseOnSurface'],
  'neutral/99': ['surface', 'background'],
  'neutral/100': ['surface.container.lowest'],
  // NeutralVariant → surface variant + outline
  'neutralVariant/30': ['onSurface.variant'],
  'neutralVariant/50': ['outline'],
  'neutralVariant/80': ['outline.variant'],
  'neutralVariant/90': ['surfaceVariant'],
};

// ── Helper: luminance for readable text color over swatch ───────────────────

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 128;
}

// ── Shared styles ─────────────────────────────────────────────────────────────

const S: Record<string, CSSProperties> = {
  page: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '13px',
    color: '#1a1a1a',
    maxWidth: '1200px',
  },
  header: {
    marginBottom: '40px',
  },
  h1: {
    fontSize: '22px',
    fontWeight: '700',
    margin: '0 0 8px',
    color: '#111',
  },
  subtitle: {
    fontSize: '13px',
    color: '#666',
    margin: '0 0 24px',
    lineHeight: 1.6,
    maxWidth: '700px',
  },
  sectionBlock: {
    marginBottom: '48px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
    marginBottom: '4px',
  },
  h2: {
    fontSize: '17px',
    fontWeight: '700',
    margin: '0',
    color: '#111',
  },
  description: {
    fontSize: '12px',
    color: '#777',
    margin: '0 0 12px',
    lineHeight: 1.5,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '12px',
    tableLayout: 'fixed' as const,
  },
  th: {
    textAlign: 'left' as const,
    padding: '7px 10px',
    background: '#f3f3f3',
    borderBottom: '2px solid #ddd',
    fontWeight: '600',
    fontSize: '11px',
    color: '#444',
    whiteSpace: 'nowrap' as const,
  },
  td: {
    padding: '0',
    borderBottom: '1px solid #eee',
    verticalAlign: 'middle' as const,
  },
  mono: {
    fontFamily: 'monospace',
    fontSize: '11px',
  },
  pill: {
    display: 'inline-flex' as const,
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: '600',
    padding: '2px 7px',
    borderRadius: '10px',
    whiteSpace: 'nowrap' as const,
  },
};

function cellPad(extra?: CSSProperties): CSSProperties {
  return { padding: '6px 10px', ...extra };
}

// Semantic token pill — green if it has a semantic role
function SemanticPill({ token }: { token: string }) {
  const isContainer = token.includes('container');
  const isInverse = token.includes('inverse') || token.includes('Inverse');
  const isOutline = token.includes('outline') || token.includes('Outline');
  const isSurface = token.includes('surface') || token.includes('Surface');

  let bg = '#e8f4e8';
  let color = '#2a6a2a';

  if (isInverse) {
    bg = '#f3e8ff';
    color = '#6a2a8a';
  } else if (isContainer) {
    bg = '#e8f0ff';
    color = '#2a4a8a';
  } else if (isOutline) {
    bg = '#fff3e0';
    color = '#8a5a00';
  } else if (isSurface) {
    bg = '#f0f0f0';
    color = '#444444';
  }

  return (
    <span
      style={{
        ...S.pill,
        background: bg,
        color,
        marginRight: '3px',
        marginBottom: '2px',
      }}
    >
      {token}
    </span>
  );
}

// Color swatch cell
function SwatchCell({ hex, step }: { hex: string; step: number }) {
  const light = isLight(hex);
  return (
    <td style={{ ...S.td, width: '72px' }}>
      <div
        style={{
          background: hex,
          width: '100%',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            ...S.mono,
            fontSize: '10px',
            color: light ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.7)',
            fontWeight: '600',
          }}
        >
          {step}
        </span>
      </div>
    </td>
  );
}

// ── Main story component ──────────────────────────────────────────────────────

function DerivationTable({
  paletteKey,
}: {
  paletteKey: keyof typeof PALETTES;
}) {
  const palette = PALETTES[paletteKey];
  const steps = Object.entries(palette.steps) as [string, string][];

  return (
    <div style={S.sectionBlock}>
      <div style={S.sectionHeader}>
        <h2 style={S.h2}>{palette.label}</h2>
        <span style={{ ...S.mono, fontSize: '11px', color: '#999' }}>
          {paletteKey}
        </span>
      </div>
      <p style={S.description}>{palette.description}</p>

      <table style={S.table}>
        <colgroup>
          <col style={{ width: '72px' }} /> {/* swatch */}
          <col style={{ width: '160px' }} /> {/* figma */}
          <col style={{ width: '90px' }} /> {/* step */}
          <col style={{ width: '90px' }} /> {/* hex */}
          <col style={{ width: '240px' }} /> {/* css var */}
          <col /> {/* semantic */}
        </colgroup>
        <thead>
          <tr>
            <th style={{ ...S.th, width: '72px' }}></th>
            <th style={S.th}>Figma Variable</th>
            <th style={S.th}>Step</th>
            <th style={S.th}>Hex</th>
            <th style={S.th}>Panda CSS Note</th>
            <th style={S.th}>Semantic Role(s)</th>
          </tr>
        </thead>
        <tbody>
          {steps.map(([stepStr, hex]) => {
            const step = parseInt(stepStr);
            const figmaName = `${paletteKey}/${step}`;
            const semanticRoles = DERIVATION[figmaName] ?? [];
            const hasRole = semanticRoles.length > 0;

            // Highlight rows that have semantic roles
            const rowBg = hasRole ? 'rgba(76,102,43,0.04)' : undefined;

            return (
              <tr key={step} style={{ background: rowBg }}>
                <SwatchCell hex={hex} step={step} />

                {/* Figma variable name */}
                <td style={S.td}>
                  <span style={{ ...cellPad(), ...S.mono, display: 'block' }}>
                    {figmaName}
                  </span>
                </td>

                {/* Step number */}
                <td style={S.td}>
                  <span style={{ ...cellPad(), ...S.mono, display: 'block' }}>
                    {step}
                  </span>
                </td>

                {/* Hex */}
                <td style={S.td}>
                  <div
                    style={{
                      ...cellPad(),
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '2px',
                        background: hex,
                        border: '1px solid rgba(0,0,0,0.15)',
                        flexShrink: 0,
                      }}
                    />
                    <span style={S.mono}>{hex}</span>
                  </div>
                </td>

                {/* Panda CSS note */}
                <td style={S.td}>
                  <span
                    style={{
                      ...cellPad(),
                      display: 'block',
                      fontSize: '11px',
                      color: '#999',
                      fontStyle: 'italic',
                    }}
                  >
                    No direct Panda token —{' '}
                    <span style={{ ...S.mono, fontStyle: 'normal' }}>
                      --colors-{paletteKey}-{step}
                    </span>{' '}
                    (Figma Primitives only)
                  </span>
                </td>

                {/* Semantic roles */}
                <td style={S.td}>
                  <div
                    style={{
                      ...cellPad(),
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '2px',
                    }}
                  >
                    {hasRole ? (
                      semanticRoles.map((role) => (
                        <SemanticPill key={role} token={role} />
                      ))
                    ) : (
                      <span style={{ color: '#ccc', fontSize: '11px' }}>
                        — no semantic mapping
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Storybook meta ────────────────────────────────────────────────────────────

const meta = {
  title: 'Foundations/Tonal Palette Derivation',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Story 1: Full derivation map ─────────────────────────────────────────────

export const FullDerivationMap: Story = {
  name: '1 · Full Derivation Map',
  render: () => (
    <div style={S.page}>
      <div style={S.header}>
        <h1 style={S.h1}>Tonal Palette → Semantic Token Derivation Map</h1>
        <p style={S.subtitle}>
          Every M3 tonal primitive across all six palettes, showing which
          semantic Panda CSS token each step derives into.{' '}
          <strong>
            Highlighted rows have a semantic equivalent — use that token
            instead.
          </strong>
          <br />
          Tonal steps have no direct Panda CSS tokens — they exist only as Figma
          Primitives variables. The CSS variable column shows what they{' '}
          <em>would</em> be named if exposed, for reference when auditing
          existing code that uses them.
        </p>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            padding: '12px 16px',
            background: '#f8f8f8',
            borderRadius: '6px',
            fontSize: '12px',
            marginBottom: '8px',
          }}
        >
          <span style={{ fontWeight: '600', color: '#444' }}>
            Semantic role colours:
          </span>
          <span>
            <span
              style={{ ...S.pill, background: '#e8f4e8', color: '#2a6a2a' }}
            >
              primary role
            </span>
          </span>
          <span>
            <span
              style={{ ...S.pill, background: '#e8f0ff', color: '#2a4a8a' }}
            >
              container role
            </span>
          </span>
          <span>
            <span
              style={{ ...S.pill, background: '#f3e8ff', color: '#6a2a8a' }}
            >
              inverse role
            </span>
          </span>
          <span>
            <span
              style={{ ...S.pill, background: '#fff3e0', color: '#8a5a00' }}
            >
              outline role
            </span>
          </span>
          <span>
            <span
              style={{ ...S.pill, background: '#f0f0f0', color: '#444444' }}
            >
              surface role
            </span>
          </span>
          <span style={{ color: '#ccc' }}>
            — no semantic mapping (raw primitive only)
          </span>
        </div>
      </div>

      {(Object.keys(PALETTES) as (keyof typeof PALETTES)[]).map((key) => (
        <DerivationTable key={key} paletteKey={key} />
      ))}
    </div>
  ),
};

// ── Story 2: Migration guide — which primitives have semantic equivalents ─────

export const MigrationGuide: Story = {
  name: '2 · Migration Guide',
  render: () => {
    // Flatten all steps that have semantic roles
    const mapped: Array<{
      figmaName: string;
      hex: string;
      semanticTokens: string[];
      migrate: string;
      note?: string;
    }> = [];

    for (const [paletteKey, palette] of Object.entries(PALETTES)) {
      for (const [stepStr, hex] of Object.entries(palette.steps)) {
        const step = parseInt(stepStr);
        const figmaName = `${paletteKey}/${step}`;
        const semanticRoles = DERIVATION[figmaName];
        if (semanticRoles && semanticRoles.length > 0) {
          // Pick the most useful token for migration guidance
          const primary = semanticRoles[0];
          mapped.push({
            figmaName,
            hex,
            semanticTokens: semanticRoles,
            migrate: primary,
          });
        }
      }
    }

    // Special case: neutral/20 gets a note
    const neutral20 = mapped.find((r) => r.figmaName === 'neutral/20');
    if (neutral20) {
      neutral20.note =
        'inverseSurface is its semantic role, but its intent is tooltip/snackbar bg. ' +
        'For dark text use: consider adding fg.strong (onSurface is darker at neutral/10).';
    }

    return (
      <div style={S.page}>
        <div style={S.header}>
          <h1 style={S.h1}>
            Migration Guide — Primitives with Semantic Equivalents
          </h1>
          <p style={S.subtitle}>
            If you are using any of these tonal step values directly in Figma or
            in code, switch to the semantic token in the third column. Semantic
            tokens are theme-aware and switch automatically in dark mode.
            <br />
            Steps with <em>no semantic mapping</em> are not listed — those have
            no current equivalent and require a custom token or can remain
            as-is.
          </p>
        </div>

        <table style={{ ...S.table, tableLayout: 'auto' as const }}>
          <thead>
            <tr>
              <th style={S.th}>Swatch</th>
              <th style={S.th}>Figma Primitive</th>
              <th style={S.th}>Hex</th>
              <th style={S.th}>→ Use This Semantic Token</th>
              <th style={S.th}>In Code</th>
              <th style={S.th}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {mapped.map((row, i) => (
              <tr
                key={row.figmaName}
                style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}
              >
                {/* Swatch */}
                <td style={{ ...S.td, width: '40px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      background: row.hex,
                      margin: '4px 6px',
                      borderRadius: '4px',
                      border: '1px solid rgba(0,0,0,0.1)',
                    }}
                  />
                </td>

                {/* Figma name */}
                <td style={S.td}>
                  <span style={{ ...cellPad(), ...S.mono, display: 'block' }}>
                    {row.figmaName}
                  </span>
                </td>

                {/* Hex */}
                <td style={S.td}>
                  <span style={{ ...cellPad(), ...S.mono, display: 'block' }}>
                    {row.hex}
                  </span>
                </td>

                {/* Semantic token(s) */}
                <td style={S.td}>
                  <div
                    style={{
                      ...cellPad(),
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '3px',
                    }}
                  >
                    {row.semanticTokens.map((t) => (
                      <SemanticPill key={t} token={t} />
                    ))}
                  </div>
                </td>

                {/* Code example */}
                <td style={S.td}>
                  <span
                    style={{
                      ...cellPad(),
                      ...S.mono,
                      display: 'block',
                      background: '#eef4e8',
                      borderRadius: '3px',
                      fontSize: '11px',
                      color: '#2a6a2a',
                    }}
                  >
                    {/* Guess the right prop based on token name */}
                    {row.migrate.startsWith('on') ||
                    row.migrate.includes('fg') ||
                    row.migrate.includes('text')
                      ? `color="${row.migrate}"`
                      : row.migrate.includes('border') ||
                          row.migrate.includes('outline')
                        ? `borderColor="${row.migrate}"`
                        : `bg="${row.migrate}"`}
                  </span>
                </td>

                {/* Notes */}
                <td
                  style={{
                    ...S.td,
                    fontSize: '11px',
                    color: '#888',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={cellPad()}>
                    {row.note ? (
                      <span style={{ color: '#c07000' }}>⚠ {row.note}</span>
                    ) : row.semanticTokens.length > 1 ? (
                      `Also used for: ${row.semanticTokens.slice(1).join(', ')}`
                    ) : (
                      ''
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Unmapped steps summary */}
        <div
          style={{
            marginTop: '40px',
            padding: '16px 20px',
            background: '#f8f8f8',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#555',
            lineHeight: 1.7,
          }}
        >
          <strong>Steps with no semantic mapping</strong> — these have no
          current DDS semantic equivalent. If you are using them, either keep
          them as tonal step values (accepting no dark mode support) or add a
          custom semantic token to <code>src/preset/semantic-tokens.ts</code>.
          <br />
          <br />
          <strong>neutral/20</strong> (<code>#30312C</code>) — your most-used
          unmapped step. Its M3 semantic role is <code>inverseSurface</code>{' '}
          (tooltip bg) which is not the right intent for text. Closest available
          alternatives:
          <br />
          &nbsp;&nbsp;• <code>onSurface</code> (<code>#1A1C16</code>,
          neutral/10) — slightly darker, primary text intent ✓<br />
          &nbsp;&nbsp;• <code>onSurface.variant</code> (<code>#44483D</code>,
          neutralVariant/30) — slightly lighter, secondary text intent ✓<br />
          &nbsp;&nbsp;• Add <code>fg.strong</code> to semantic-tokens.ts mapping
          neutral/20 → neutral/80 for dark mode — recommended if you need this
          exact shade with dark mode support
        </div>
      </div>
    );
  },
};
