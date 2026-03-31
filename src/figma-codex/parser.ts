import type { ComponentTokens } from './schema';

export class ParseError extends Error {
  constructor(
    message: string,
    public readonly filePath: string,
  ) {
    super(`ParseError: ${message} (${filePath})`);
    this.name = 'ParseError';
  }
}

export interface ParsedFigmaFile {
  filePath: string;
  importStyle: 'named' | 'namespace';
  componentName: string;
  importSource: string;
  connectSubComponent?: string;
  figmaUrl: string;
  figmaFileKey: string;
  figmaNodeId: string;
  example: string;
  propsMapping: Record<string, string>;
  tokens?: ComponentTokens;
}

function parseNodeId(url: string): string {
  const match = url.match(/node-id=([^&'"]+)/);
  if (!match) return '';
  return match[1].replace(/-/g, ':');
}

function parseFileKey(url: string): string {
  const match = url.match(/figma\.com\/design\/([^/?]+)/);
  return match?.[1] ?? '';
}

function extractExample(content: string): string {
  const exampleIdx = content.indexOf('example:');
  if (exampleIdx === -1) return '';

  const arrowIdx = content.indexOf('=>', exampleIdx);
  if (arrowIdx === -1) return '';

  const afterArrow = content.slice(arrowIdx + 2).trimStart();

  if (afterArrow.startsWith('(')) {
    // Multi-line: track balanced parens
    let depth = 0;
    let i = 0;
    for (; i < afterArrow.length; i++) {
      if (afterArrow[i] === '(') depth++;
      else if (afterArrow[i] === ')') {
        depth--;
        if (depth === 0) break;
      }
    }
    const inner = afterArrow.slice(1, i).trim();
    return inner;
  } else {
    // Single-line: grab to end of line, strip trailing comma
    const lineEnd = afterArrow.indexOf('\n');
    const line = lineEnd === -1 ? afterArrow : afterArrow.slice(0, lineEnd);
    return line.replace(/,\s*$/, '').trim();
  }
}

function extractPropsMapping(content: string): Record<string, string> {
  const result: Record<string, string> = {};
  const propsBlockMatch = content.match(/props:\s*\{([^}]+)\}/);
  if (!propsBlockMatch) return result;

  const block = propsBlockMatch[1];
  const propNames = block.match(/(\w+)\s*:/g);
  if (propNames) {
    for (const p of propNames) {
      result[p.replace(':', '').trim()] = 'figma.enum';
    }
  }
  return result;
}

/**
 * Parse a @dds-tokens JSDoc block that appears before figma.connect().
 * Format:
 *   @dds-tokens
 *   recipe: badge
 *   variantProps: variant, size, colorPalette
 *   figmaPropToRecipeProp:
 *     Variant: variant
 *     Size: size
 *     Color: colorPalette
 */
function parseDdsTokens(content: string): ComponentTokens | undefined {
  const blockMatch = content.match(/\/\*\*[\s\S]*?@dds-tokens([\s\S]*?)\*\//);
  if (!blockMatch) return undefined;

  const block = blockMatch[1]
    .replace(/^\s*\*\s?/gm, '') // strip leading * from each line
    .trim();

  const tokens: ComponentTokens = {};

  const recipeMatch = block.match(/^recipe:\s*(.+)$/m);
  if (recipeMatch) tokens.recipe = recipeMatch[1].trim();

  const variantPropsMatch = block.match(/^variantProps:\s*(.+)$/m);
  if (variantPropsMatch) {
    tokens.variantProps = variantPropsMatch[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const mapHeaderIdx = block.indexOf('figmaPropToRecipeProp:');
  if (mapHeaderIdx !== -1) {
    const mapBlock = block.slice(
      mapHeaderIdx + 'figmaPropToRecipeProp:'.length,
    );
    const mapping: Record<string, string> = {};
    for (const line of mapBlock.split('\n')) {
      const m = line.match(/^\s+(\w+):\s*(\w+)/);
      if (m) mapping[m[1]] = m[2];
    }
    if (Object.keys(mapping).length > 0) tokens.figmaPropToRecipeProp = mapping;
  }

  return Object.keys(tokens).length > 0 ? tokens : undefined;
}

export function parseFigmaFile(
  content: string,
  filePath: string,
): ParsedFigmaFile {
  // Try namespace import: import * as X from './path'
  const nsMatch = content.match(
    /import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"]/,
  );
  // Try named import: import { X } from './path'  (skip figma import itself)
  const namedMatches = [
    ...content.matchAll(/import\s+\{\s*(\w+)\s*\}\s+from\s+['"]([^'"]+)['"]/g),
  ];
  // Filter out the figma import itself
  const namedMatch = namedMatches.find(
    (m) => !m[2].includes('figma') && !m[2].includes('@figma'),
  );

  if (!nsMatch && !namedMatch) {
    throw new ParseError('No component import found', filePath);
  }

  const connectMatch = content.match(
    /figma\.connect\(\s*(\w+)(?:\.(\w+))?\s*,\s*['"]([^'"]+)['"]/,
  );
  if (!connectMatch) {
    throw new ParseError('No figma.connect() call found', filePath);
  }

  const figmaUrl = connectMatch[3];
  const connectSubComponent = connectMatch[2];

  const tokens = parseDdsTokens(content);

  if (nsMatch) {
    return {
      filePath,
      importStyle: 'namespace',
      componentName: nsMatch[1],
      importSource: nsMatch[2],
      connectSubComponent,
      figmaUrl,
      figmaFileKey: parseFileKey(figmaUrl),
      figmaNodeId: parseNodeId(figmaUrl),
      example: extractExample(content),
      propsMapping: extractPropsMapping(content),
      tokens,
    };
  }

  return {
    filePath,
    importStyle: 'named',
    componentName: namedMatch![1],
    importSource: namedMatch![2],
    connectSubComponent,
    figmaUrl,
    figmaFileKey: parseFileKey(figmaUrl),
    figmaNodeId: parseNodeId(figmaUrl),
    example: extractExample(content),
    propsMapping: extractPropsMapping(content),
    tokens,
  };
}
