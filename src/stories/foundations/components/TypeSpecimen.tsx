import { type CSSProperties } from 'react';
import { css } from 'styled-system/css';

// ── Pre-declared css() calls — Panda CSS statically extracts these ─────────
const textStyleClasses: Record<string, string> = {
  displayLarge: css({ textStyle: 'displayLarge' }),
  displayMedium: css({ textStyle: 'displayMedium' }),
  displaySmall: css({ textStyle: 'displaySmall' }),
  headlineLarge: css({ textStyle: 'headlineLarge' }),
  headlineMedium: css({ textStyle: 'headlineMedium' }),
  headlineSmall: css({ textStyle: 'headlineSmall' }),
  titleLarge: css({ textStyle: 'titleLarge' }),
  titleMedium: css({ textStyle: 'titleMedium' }),
  titleSmall: css({ textStyle: 'titleSmall' }),
  bodyLarge: css({ textStyle: 'bodyLarge' }),
  bodyMedium: css({ textStyle: 'bodyMedium' }),
  bodySmall: css({ textStyle: 'bodySmall' }),
  labelLarge: css({ textStyle: 'labelLarge' }),
  labelMedium: css({ textStyle: 'labelMedium' }),
  labelSmall: css({ textStyle: 'labelSmall' }),
};

interface TypeSpecimenProps {
  styleName: string;
  name: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
  fontFamily: string;
  sampleText?: string;
}

export const TypeSpecimen = ({
  styleName,
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
      <div
        className={textStyleClasses[styleName]}
        style={{ color: '#000', marginBottom: '16px' }}
      >
        {sampleText}
      </div>
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
