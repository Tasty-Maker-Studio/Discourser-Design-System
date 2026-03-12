import { type CSSProperties } from 'react';
import { css } from 'styled-system/css';

// ── Pre-declared css() lookups — Panda CSS statically extracts these ─────────
// Keys match the `name` prop passed from Colors.mdx (M3 semantic role names).
// Values use the Panda semantic token path from src/preset/semantic-tokens.ts.
const semanticBg: Record<string, string> = {
  // Primary
  primary: css({ bg: 'primary' }),
  onPrimary: css({ bg: 'onPrimary' }),
  primaryContainer: css({ bg: 'primary.container' }),
  onPrimaryContainer: css({ bg: 'onPrimary.container' }),
  // Secondary
  secondary: css({ bg: 'secondary' }),
  onSecondary: css({ bg: 'onSecondary' }),
  secondaryContainer: css({ bg: 'secondary.container' }),
  onSecondaryContainer: css({ bg: 'onSecondary.container' }),
  // Tertiary
  tertiary: css({ bg: 'tertiary' }),
  onTertiary: css({ bg: 'onTertiary' }),
  tertiaryContainer: css({ bg: 'tertiary.container' }),
  onTertiaryContainer: css({ bg: 'onTertiary.container' }),
  // Error
  error: css({ bg: 'error' }),
  onError: css({ bg: 'onError' }),
  errorContainer: css({ bg: 'error.container' }),
  onErrorContainer: css({ bg: 'onError.container' }),
  // Surface
  surface: css({ bg: 'surface' }),
  onSurface: css({ bg: 'onSurface' }),
  surfaceVariant: css({ bg: 'surfaceVariant' }),
  onSurfaceVariant: css({ bg: 'onSurface.variant' }),
  // Surface containers
  surfaceContainerLowest: css({ bg: 'surface.container.lowest' }),
  surfaceContainerLow: css({ bg: 'surface.container.low' }),
  surfaceContainer: css({ bg: 'surface.container' }),
  surfaceContainerHigh: css({ bg: 'surface.container.high' }),
  surfaceContainerHighest: css({ bg: 'surface.container.highest' }),
  // Outline
  outline: css({ bg: 'outline' }),
  outlineVariant: css({ bg: 'outline.variant' }),
  // Inverse
  inverseSurface: css({ bg: 'inverseSurface' }),
  inverseOnSurface: css({ bg: 'inverseOnSurface' }),
  inversePrimary: css({ bg: 'inversePrimary' }),
  // Utility
  background: css({ bg: 'background' }),
  onBackground: css({ bg: 'onBackground' }),
  scrim: css({ bg: 'scrim' }),
  shadow: css({ bg: 'shadow' }),
};

interface ColorSwatchProps {
  name: string;
  value: string;
  description?: string;
}

export const ColorSwatch = ({ name, value, description }: ColorSwatchProps) => {
  const swatchStyle: CSSProperties = {
    backgroundColor: value,
    width: '100%',
    height: '80px',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    marginBottom: '8px',
  };

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
  };

  const labelStyle: CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '4px',
    fontFamily: 'Inter, sans-serif',
  };

  const valueStyle: CSSProperties = {
    fontSize: '12px',
    fontFamily: 'monospace',
    color: '#666',
  };

  const descStyle: CSSProperties = {
    fontSize: '12px',
    color: '#666',
    marginTop: '4px',
  };

  return (
    <div style={containerStyle}>
      <div style={swatchStyle} />
      <div style={labelStyle}>{name}</div>
      <div style={valueStyle}>{value}</div>
      {description && <div style={descStyle}>{description}</div>}
    </div>
  );
};

interface TonalSwatchProps {
  paletteName: string;
  tone: number;
  value: string;
}

export const TonalSwatch = ({ paletteName, tone, value }: TonalSwatchProps) => {
  const swatchStyle: CSSProperties = {
    backgroundColor: value,
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    position: 'relative',
  };

  const labelStyle: CSSProperties = {
    fontSize: '11px',
    fontWeight: '500',
    fontFamily: 'monospace',
    color: tone >= 50 ? '#000' : '#fff',
    mixBlendMode: 'difference',
  };

  return (
    <div style={swatchStyle} title={`${paletteName}.${tone}: ${value}`}>
      <span style={labelStyle}>{tone}</span>
    </div>
  );
};

interface SemanticSwatchProps {
  name: string;
  description?: string;
}

export const SemanticSwatch = ({ name, description }: SemanticSwatchProps) => {
  const bgClass = semanticBg[name] ?? '';

  const containerStyle: CSSProperties = {
    marginBottom: '16px',
  };

  const labelStyle: CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px',
    fontFamily: 'Inter, sans-serif',
  };

  const swatchRowStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  };

  const swatchContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  const swatchStyle: CSSProperties = {
    height: '80px',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  };

  const modeStyle: CSSProperties = {
    fontSize: '10px',
    textTransform: 'uppercase',
    color: '#999',
    fontWeight: '600',
  };

  const tokenStyle: CSSProperties = {
    fontSize: '11px',
    fontFamily: 'monospace',
    color: '#666',
  };

  const descStyle: CSSProperties = {
    fontSize: '12px',
    color: '#666',
    marginTop: '8px',
  };

  return (
    <div style={containerStyle}>
      <div style={labelStyle}>{name}</div>
      <div style={swatchRowStyle}>
        {/* Light mode swatch — inherits default theme */}
        <div style={swatchContainerStyle}>
          <div style={modeStyle}>Light</div>
          <div className={bgClass} style={swatchStyle} />
          <div style={tokenStyle}>{name}</div>
        </div>
        {/* Dark mode swatch — forced via data-theme="dark" */}
        <div style={swatchContainerStyle} data-theme="dark">
          <div style={modeStyle}>Dark</div>
          <div className={bgClass} style={swatchStyle} />
          <div style={tokenStyle}>{name} [dark]</div>
        </div>
      </div>
      {description && <div style={descStyle}>{description}</div>}
    </div>
  );
};
