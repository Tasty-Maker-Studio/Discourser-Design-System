import { type CSSProperties } from 'react';

interface SpacingBoxProps {
  name: string;
  value: string;
}

export const SpacingBox = ({ name, value }: SpacingBoxProps) => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '16px',
  };

  const labelContainerStyle: CSSProperties = {
    minWidth: '120px',
    display: 'flex',
    flexDirection: 'column',
  };

  const nameStyle: CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '4px',
  };

  const valueStyle: CSSProperties = {
    fontSize: '12px',
    fontFamily: 'monospace',
    color: '#666',
  };

  const boxContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  };

  const boxStyle: CSSProperties = {
    width: value,
    height: '40px',
    backgroundColor: '#4C662B',
    borderRadius: '4px',
    position: 'relative',
  };

  const dimensionStyle: CSSProperties = {
    position: 'absolute',
    top: '-20px',
    left: '0',
    right: '0',
    fontSize: '10px',
    fontFamily: 'monospace',
    color: '#999',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={labelContainerStyle}>
        <div style={nameStyle}>{name}</div>
        <div style={valueStyle}>{value}</div>
      </div>
      <div style={boxContainerStyle}>
        <div style={boxStyle}>
          <div style={dimensionStyle}>{value}</div>
        </div>
      </div>
    </div>
  );
};

interface SpacingGridProps {
  spacings: Record<string, string>;
}

export const SpacingGrid = ({ spacings }: SpacingGridProps) => {
  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '32px',
    marginTop: '24px',
  };

  return (
    <div style={gridStyle}>
      {Object.entries(spacings).map(([name, value]) => (
        <SpacingBox key={name} name={name} value={value} />
      ))}
    </div>
  );
};
