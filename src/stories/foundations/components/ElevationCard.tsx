import { type CSSProperties } from 'react';

interface ElevationCardProps {
  level: string;
  shadow: string;
}

export const ElevationCard = ({ level, shadow }: ElevationCardProps) => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '32px',
  };

  const cardStyle: CSSProperties = {
    width: '200px',
    height: '120px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    boxShadow: shadow === 'none' ? 'none' : shadow,
  };

  const labelStyle: CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '8px',
    color: '#333',
  };

  const shadowValueStyle: CSSProperties = {
    fontSize: '11px',
    fontFamily: 'monospace',
    color: '#666',
    maxWidth: '300px',
    textAlign: 'center',
    wordBreak: 'break-word',
    lineHeight: '1.5',
  };

  return (
    <div style={containerStyle}>
      <div style={labelStyle}>{level}</div>
      <div style={cardStyle}>
        <span style={{ color: '#999', fontSize: '14px' }}>
          {level === 'level0' ? 'No shadow' : 'Elevation'}
        </span>
      </div>
      <div style={shadowValueStyle}>{shadow === 'none' ? 'none' : shadow}</div>
    </div>
  );
};

interface ElevationGridProps {
  elevations: Record<string, string>;
}

export const ElevationGrid = ({ elevations }: ElevationGridProps) => {
  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '48px',
    marginTop: '32px',
    padding: '32px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  };

  return (
    <div style={gridStyle}>
      {Object.entries(elevations).map(([level, shadow]) => (
        <ElevationCard key={level} level={level} shadow={shadow} />
      ))}
    </div>
  );
};
