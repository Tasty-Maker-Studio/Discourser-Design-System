import { type CSSProperties } from 'react';

interface TypeSpecimenProps {
  name: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
  fontFamily: string;
  sampleText?: string;
}

export const TypeSpecimen = ({
  name,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  fontFamily,
  sampleText = 'The quick brown fox jumps over the lazy dog',
}: TypeSpecimenProps) => {
  const containerStyle: CSSProperties = {
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid #e0e0e0',
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '12px',
  };

  const nameStyle: CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'Inter, sans-serif',
    color: '#333',
  };

  const specimenStyle: CSSProperties = {
    fontSize,
    lineHeight,
    fontWeight,
    letterSpacing,
    fontFamily: getFontFamilyString(fontFamily),
    marginBottom: '16px',
    color: '#000',
  };

  const propertiesStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
    fontSize: '12px',
    fontFamily: 'monospace',
    color: '#666',
    backgroundColor: '#f5f5f5',
    padding: '12px',
    borderRadius: '4px',
  };

  const propertyStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const propertyLabelStyle: CSSProperties = {
    fontSize: '10px',
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: '4px',
    fontWeight: '600',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={nameStyle}>{name}</div>
      </div>
      <div style={specimenStyle}>{sampleText}</div>
      <div style={propertiesStyle}>
        <div style={propertyStyle}>
          <div style={propertyLabelStyle}>Font Size</div>
          <div>{fontSize}</div>
        </div>
        <div style={propertyStyle}>
          <div style={propertyLabelStyle}>Line Height</div>
          <div>{lineHeight}</div>
        </div>
        <div style={propertyStyle}>
          <div style={propertyLabelStyle}>Font Weight</div>
          <div>{fontWeight}</div>
        </div>
        <div style={propertyStyle}>
          <div style={propertyLabelStyle}>Letter Spacing</div>
          <div>{letterSpacing}</div>
        </div>
        <div style={propertyStyle}>
          <div style={propertyLabelStyle}>Font Family</div>
          <div>{fontFamily}</div>
        </div>
      </div>
    </div>
  );
};

function getFontFamilyString(family: string): string {
  const fontFamilies = {
    display: 'Georgia, "Times New Roman", serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", Consolas, monospace',
  };

  return fontFamilies[family as keyof typeof fontFamilies] || family;
}
