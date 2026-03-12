import { type CSSProperties } from 'react';
import { css } from 'styled-system/css';

// ── Pre-declared css() calls — Panda CSS statically extracts these ─────────
export const elevationClasses: Record<string, string> = {
  level0: css({ boxShadow: 'level0' }),
  level1: css({ boxShadow: 'level1' }),
  level2: css({ boxShadow: 'level2' }),
  level3: css({ boxShadow: 'level3' }),
  level4: css({ boxShadow: 'level4' }),
  level5: css({ boxShadow: 'level5' }),
};

interface ElevationCardProps {
  level: string;
}

export const ElevationCard = ({ level }: ElevationCardProps) => {
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
    // boxShadow applied via className — reads from Panda CSS variable
  };

  const labelStyle: CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '8px',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      <div style={labelStyle}>{level}</div>
      <div style={cardStyle} className={elevationClasses[level]}>
        <span style={{ color: '#999', fontSize: '14px' }}>
          {level === 'level0' ? 'No shadow' : 'Elevation'}
        </span>
      </div>
    </div>
  );
};

export const ElevationGrid = () => {
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
      {(
        ['level0', 'level1', 'level2', 'level3', 'level4', 'level5'] as const
      ).map((level) => (
        <ElevationCard key={level} level={level} />
      ))}
    </div>
  );
};
