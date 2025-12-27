import { type CSSProperties } from 'react';

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
  lightValue: string;
  darkValue: string;
  description?: string;
}

export const SemanticSwatch = ({
  name,
  lightValue,
  darkValue,
  description,
}: SemanticSwatchProps) => {
  const containerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginBottom: '16px',
  };

  const swatchContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const swatchStyle = (color: string): CSSProperties => ({
    backgroundColor: color,
    height: '80px',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    marginBottom: '8px',
  });

  const labelStyle: CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '4px',
    fontFamily: 'Inter, sans-serif',
  };

  const valueStyle: CSSProperties = {
    fontSize: '11px',
    fontFamily: 'monospace',
    color: '#666',
  };

  const modeStyle: CSSProperties = {
    fontSize: '10px',
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: '4px',
    fontWeight: '600',
  };

  const descStyle: CSSProperties = {
    fontSize: '12px',
    color: '#666',
    marginTop: '8px',
    gridColumn: '1 / -1',
  };

  return (
    <div>
      <div style={labelStyle}>{name}</div>
      <div style={containerStyle}>
        <div style={swatchContainerStyle}>
          <div style={modeStyle}>Light</div>
          <div style={swatchStyle(lightValue)} />
          <div style={valueStyle}>{lightValue}</div>
        </div>
        <div style={swatchContainerStyle}>
          <div style={modeStyle}>Dark</div>
          <div style={swatchStyle(darkValue)} />
          <div style={valueStyle}>{darkValue}</div>
        </div>
      </div>
      {description && <div style={descStyle}>{description}</div>}
    </div>
  );
};
