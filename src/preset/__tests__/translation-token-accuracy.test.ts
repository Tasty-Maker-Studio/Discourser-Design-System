/* eslint-disable no-undef */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { discourserPandaPreset as preset } from '../index';

/**
 * Token Accuracy Verification for Translation Documentation
 *
 * This test suite verifies that all tokens referenced in the Figma Translation
 * documentation (files 01-04) actually exist in the design system configuration.
 *
 * Prevents documentation drift where docs reference non-existent tokens.
 */

const TRANSLATION_DOCS_PATH = join(
  process.cwd(),
  'stories/documentation/figma-translation',
);

const TRANSLATION_FILES = [
  '01-Colors.mdx',
  '02-Typography.mdx',
  '03-Spacing.mdx',
  '04-Shadows-Radii.mdx',
];

/**
 * Build a comprehensive list of valid tokens from the Panda preset
 */
function buildKnownTokenList(): Set<string> {
  const tokens = new Set<string>();

  // Semantic tokens from preset
  const semanticColors = preset.theme?.extend?.semanticTokens?.colors || {};
  const semanticShadows = preset.theme?.extend?.semanticTokens?.shadows || {};

  // Add semantic color tokens (with nested structure)
  Object.keys(semanticColors).forEach((key) => {
    tokens.add(key);
    // Handle nested tokens like fg.default, fg.muted, surface.container, etc.
    const value = semanticColors[key];
    if (typeof value === 'object' && value !== null && 'value' in value) {
      tokens.add(key);
    }
  });

  // Add semantic shadow tokens
  Object.keys(semanticShadows).forEach((key) => {
    tokens.add(key);
  });

  // Add semantic radii tokens
  const semanticRadii = preset.theme?.extend?.semanticTokens?.radii || {};
  Object.keys(semanticRadii).forEach((key) => {
    tokens.add(key);
  });

  // Add textStyle tokens
  const textStyles = preset.theme?.extend?.textStyles || {};
  Object.keys(textStyles).forEach((key) => {
    tokens.add(key);
  });

  // Add common Radix color scale patterns (primary.1-12, secondary.1-12, etc.)
  const colorPalettes = [
    'primary',
    'secondary',
    'tertiary',
    'error',
    'neutral',
    'gray',
    'red',
  ];
  colorPalettes.forEach((palette) => {
    for (let i = 1; i <= 12; i++) {
      tokens.add(`${palette}.${i}`);
      tokens.add(`${palette}.a${i}`); // Alpha variants
    }
    tokens.add(`${palette}.contrast`); // Contrast token (if it exists)
  });

  // Add M3 explicit tokens
  const m3Tokens = [
    'm3Primary',
    'm3Secondary',
    'm3Tertiary',
    'm3Primary.container',
    'm3Secondary.container',
    'm3Tertiary.container',
    'onM3Primary',
    'onM3Secondary',
    'onM3Tertiary',
    'onM3Primary.container',
    'onM3Secondary.container',
    'onM3Tertiary.container',
  ];
  m3Tokens.forEach((token) => tokens.add(token));

  // Add surface tokens
  const surfaceTokens = [
    'surface',
    'surface.dim',
    'surface.bright',
    'surface.container',
    'surface.container.low',
    'surface.container.lowest',
    'surface.container.high',
    'surface.container.highest',
    'onSurface',
    'onSurface.variant',
    'outline',
    'outline.variant',
  ];
  surfaceTokens.forEach((token) => tokens.add(token));

  // Add common semantic tokens
  const commonTokens = [
    'canvas',
    'border',
    'fg.default',
    'fg.muted',
    'fg.subtle',
  ];
  commonTokens.forEach((token) => tokens.add(token));

  // Add spacing tokens (numeric values are always valid in Panda)
  // We'll handle these separately in validation

  // Add font families
  const fontFamilies = ['body', 'display', 'mono'];
  fontFamilies.forEach((token) => tokens.add(token));

  // Add font weights
  const fontWeights = ['light', 'normal', 'medium', 'semibold', 'bold'];
  fontWeights.forEach((token) => tokens.add(token));

  // Add common border radius values
  const radiiTokens = [
    'l1',
    'l2',
    'l3',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    'full',
    'none',
  ];
  radiiTokens.forEach((token) => tokens.add(token));

  return tokens;
}

/**
 * Extract token references from MDX content
 * Matches patterns like: bg="token", color="token", shadow="token", etc.
 */
function extractTokenReferences(
  content: string,
  _filename: string,
): Array<{ token: string; line: number; context: string }> {
  const references: Array<{ token: string; line: number; context: string }> =
    [];
  const lines = content.split('\n');

  // Regex patterns for different token types
  const patterns = [
    // CSS props: bg="...", color="...", borderColor="...", etc.
    /(?:bg|color|borderColor|shadow|rounded|textStyle|fontFamily|fontWeight|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|rowGap|columnGap|maxW|minH|h|w|display|flexDir|alignItems|justifyContent|gridTemplateColumns|borderRadius|borderTopRadius|borderBottomRadius|borderLeftRadius|borderRightRadius|borderTopLeftRadius|borderTopRightRadius|borderBottomLeftRadius|borderBottomRightRadius)="([^"]+)"/g,

    // Semantic tokens in prose: `canvas`, `fg.default`, etc. (backtick wrapped)
    /`((?:fg|bg|surface|outline|canvas|border|onSurface|onM3Primary|onM3Secondary|onM3Tertiary|m3Primary|m3Secondary|m3Tertiary)(?:\.[a-zA-Z0-9]+)*)`/g,

    // Color palette references: primary.9, error.11, etc. (backtick wrapped)
    /`((?:primary|secondary|tertiary|error|neutral|gray|red)\.(?:\d+|a\d+|contrast))`/g,
  ];

  lines.forEach((line, lineIndex) => {
    patterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const token = match[1];

        // Skip empty matches, URLs, and obvious non-tokens
        if (
          !token ||
          token.includes('http') ||
          token.includes('//') ||
          token.includes('.com') ||
          token.includes('.mdx')
        ) {
          continue;
        }

        references.push({
          token,
          line: lineIndex + 1,
          context: line.trim().substring(0, 80), // First 80 chars for context
        });
      }
    });
  });

  return references;
}

/**
 * Check if a token is valid
 */
function isValidToken(token: string, knownTokens: Set<string>): boolean {
  // Direct match
  if (knownTokens.has(token)) {
    return true;
  }

  // Numeric spacing values are always valid (4, 6, 8, 16, etc.)
  if (/^\d+(?:\.\d+)?$/.test(token)) {
    return true;
  }

  // Percentage values
  if (/^\d+%$/.test(token)) {
    return true;
  }

  // Viewport units
  if (/^(?:100vh|100vw|dvh|full|auto)$/.test(token)) {
    return true;
  }

  // CSS keywords
  const cssKeywords = [
    'flex',
    'grid',
    'block',
    'inline-block',
    'none',
    'inline',
    'inline-flex',
    'inline-grid',
    'column',
    'row',
    'wrap',
    'nowrap',
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
    'stretch',
    'baseline',
    'transparent',
    'white',
    'black',
    'inherit',
    'currentColor',
    'auto',
    'hidden',
    'visible',
    'scroll',
    'unset',
    'initial',
  ];
  if (cssKeywords.includes(token)) {
    return true;
  }

  // Breakpoint tokens (base, sm, md, lg, xl, 2xl)
  if (/^(?:base|sm|md|lg|xl|2xl)$/.test(token)) {
    return true;
  }

  // Grid template patterns: "1fr", "repeat(2, 1fr)", "200px 1fr"
  if (/^(?:\d+fr|repeat\(|auto|minmax\(|\d+px)/.test(token)) {
    return true;
  }

  // Specific max-width tokens
  if (
    /^breakpoint-/.test(token) ||
    /^(?:xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|full)$/.test(token)
  ) {
    return true;
  }

  return false;
}

describe('Translation Documentation - Token Accuracy', () => {
  const knownTokens = buildKnownTokenList();

  TRANSLATION_FILES.forEach((filename) => {
    describe(`${filename}`, () => {
      it('should only reference valid tokens', () => {
        const filePath = join(TRANSLATION_DOCS_PATH, filename);
        let content: string;

        try {
          content = readFileSync(filePath, 'utf-8');
        } catch (error) {
          throw new Error(`Failed to read ${filename}: ${error}`);
        }

        const references = extractTokenReferences(content, filename);
        const invalidReferences: typeof references = [];

        references.forEach((ref) => {
          if (!isValidToken(ref.token, knownTokens)) {
            invalidReferences.push(ref);
          }
        });

        if (invalidReferences.length > 0) {
          const errorMessage = invalidReferences
            .map(
              (ref) =>
                `  Line ${ref.line}: Token "${ref.token}" does not exist\n    Context: ${ref.context}`,
            )
            .join('\n\n');

          throw new Error(
            `\n\nFound ${invalidReferences.length} invalid token(s) in ${filename}:\n\n${errorMessage}\n\n` +
              `Tokens must exist in panda.config.ts, preset files, or be valid CSS values.`,
          );
        }

        // If we get here, all tokens are valid
        expect(invalidReferences).toHaveLength(0);
      });
    });
  });

  it('should have extracted tokens from all files', () => {
    // Sanity check: ensure we're actually finding tokens
    const allReferences = TRANSLATION_FILES.flatMap((filename) => {
      const filePath = join(TRANSLATION_DOCS_PATH, filename);
      const content = readFileSync(filePath, 'utf-8');
      return extractTokenReferences(content, filename);
    });

    // We should find at least 50 token references across all files
    expect(allReferences.length).toBeGreaterThan(50);
  });
});
