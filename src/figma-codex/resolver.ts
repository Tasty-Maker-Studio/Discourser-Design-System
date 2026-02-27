import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { ParsedFigmaFile } from './parser';
import type { FigmaCodexConfig } from './config';
import type {
  ComponentEntry,
  PropDefinition,
  SubComponentEntry,
} from './schema';

function resolveSourceFile(
  importSource: string,
  figmaFilePath: string,
): string | null {
  const baseDir = dirname(figmaFilePath);
  const candidates = [
    join(baseDir, importSource + '.tsx'),
    join(baseDir, importSource + '.ts'),
    join(baseDir, importSource, 'index.ts'),
    join(baseDir, importSource, 'index.tsx'),
    join(baseDir, importSource),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return null;
}

function resolveImplementationFile(sourceFile: string): string {
  const content = readFileSync(sourceFile, 'utf-8');
  // If this is an index that re-exports from a single file, resolve to that file
  // Use a simple match without end-of-string anchor to handle trailing newlines
  const reExportMatch = content.match(/from\s+['"]\.\/(\w+)['"]/);
  if (reExportMatch) {
    const implFile = join(dirname(sourceFile), reExportMatch[1] + '.tsx');
    if (existsSync(implFile)) return implFile;
  }
  return sourceFile;
}

function extractProps(sourceContent: string): PropDefinition[] {
  const props: PropDefinition[] = [];

  // Step 1: Find the Props interface and extract its full body using balanced-brace tracking
  const ifaceRe = /interface\s+\w+Props\s*\{/g;
  const startMatch = ifaceRe.exec(sourceContent);
  if (!startMatch) return props;

  // Find the opening { of the interface body
  const openBrace = sourceContent.indexOf(
    '{',
    startMatch.index + startMatch[0].length - 1,
  );
  let depth = 0;
  let closeBrace = openBrace;
  for (let i = openBrace; i < sourceContent.length; i++) {
    if (sourceContent[i] === '{') depth++;
    else if (sourceContent[i] === '}') {
      depth--;
      if (depth === 0) {
        closeBrace = i;
        break;
      }
    }
  }

  const body = sourceContent.slice(openBrace + 1, closeBrace);

  // Step 2: Parse each prop using a position-based scanner
  let pos = 0;

  while (pos < body.length) {
    // Skip whitespace
    while (pos < body.length && /\s/.test(body[pos])) pos++;
    if (pos >= body.length) break;

    // Try to match JSDoc comment /** ... */
    let jsdoc: string | undefined;
    if (body.startsWith('/**', pos)) {
      const endDoc = body.indexOf('*/', pos);
      if (endDoc !== -1) {
        jsdoc = body
          .slice(pos + 3, endDoc)
          .trim()
          .replace(/\n\s*\*\s*/g, ' ');
        pos = endDoc + 2;
        while (pos < body.length && /\s/.test(body[pos])) pos++;
      }
    }

    // Match prop name followed by optional `?` and `:`
    const nameMatch = /^(\w+)(\?)?:/.exec(body.slice(pos));
    if (!nameMatch) {
      // Not a prop — skip to next semicolon or newline
      const next = body.indexOf('\n', pos);
      pos = next === -1 ? body.length : next + 1;
      continue;
    }

    const [fullMatch, name, optional] = nameMatch;
    pos += fullMatch.length;

    if (name === 'children') {
      // Skip children — find the next semicolon at depth 0
      let bracketDepth = 0;
      while (pos < body.length) {
        const ch = body[pos];
        if (ch === '(' || ch === '{') bracketDepth++;
        else if ((ch === ')' || ch === '}') && bracketDepth > 0) bracketDepth--;
        else if (ch === ';' && bracketDepth === 0) {
          pos++;
          break;
        }
        pos++;
      }
      continue;
    }

    // Skip whitespace after the colon
    while (pos < body.length && body[pos] === ' ') pos++;

    // Read the type: track () and {} depth, stop at ; when depth === 0
    const typeStart = pos;
    let bracketDepth = 0;
    while (pos < body.length) {
      const ch = body[pos];
      if (ch === '(' || ch === '{') {
        bracketDepth++;
      } else if ((ch === ')' || ch === '}') && bracketDepth > 0) {
        bracketDepth--;
      } else if (ch === ';' && bracketDepth === 0) {
        break;
      } else if (ch === '\n' && bracketDepth === 0) {
        break;
      }
      pos++;
    }

    const typeRaw = body.slice(typeStart, pos).trim();
    // Normalize multi-line types: collapse internal whitespace sequences
    const typeNormalized = typeRaw.replace(/\s+/g, ' ');

    // Skip the terminating ; or newline
    if (pos < body.length && (body[pos] === ';' || body[pos] === '\n')) pos++;

    if (!name || !typeNormalized) continue;

    props.push({
      name,
      type: typeNormalized,
      required: !optional,
      description: jsdoc?.trim(),
    });
  }

  return props;
}

function extractSubComponents(sourceContent: string): SubComponentEntry[] {
  const subs: SubComponentEntry[] = [];
  const re =
    /export\s+const\s+(\w+)\s+=\s+with(?:Provider|Context)\(ark\.(\w+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(sourceContent)) !== null) {
    const [, name, element] = m;
    subs.push({ name, element });
  }
  return subs;
}

function classifyComponent(
  parsed: ParsedFigmaFile,
  sourceContent: string,
): 'simple' | 'compound' | 'composite' {
  if (parsed.importStyle === 'namespace') return 'compound';
  // Composite: imports from sibling DDS components (e.g., '../Accordion')
  if (/from\s+['"]\.\.\//g.test(sourceContent)) return 'composite';
  return 'simple';
}

function resolveSubpath(
  parsed: ParsedFigmaFile,
  config: FigmaCodexConfig,
  projectRoot: string,
): string | undefined {
  try {
    const pkgPath = join(projectRoot, 'package.json');
    if (!existsSync(pkgPath)) return undefined;
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    const exports = pkg.exports as Record<string, unknown>;
    if (!exports) return undefined;

    const name = parsed.componentName;
    for (const key of Object.keys(exports)) {
      if (key === `./${name}` || key.endsWith(`/${name}`)) {
        return `${config.packageName}${key.slice(1)}`;
      }
    }
  } catch {
    // ignore
  }
  return undefined;
}

export function resolveComponent(
  parsed: ParsedFigmaFile,
  config: FigmaCodexConfig,
): ComponentEntry {
  // Determine project root: walk up from figma file until we find package.json
  let projectRoot = dirname(parsed.filePath);
  for (let i = 0; i < 8; i++) {
    if (existsSync(join(projectRoot, 'package.json'))) break;
    projectRoot = dirname(projectRoot);
  }

  const sourceFile = resolveSourceFile(parsed.importSource, parsed.filePath);

  let sourceContent = '';
  if (sourceFile && existsSync(sourceFile)) {
    sourceContent = readFileSync(sourceFile, 'utf-8');
    // For index files, look for the actual implementation
    if (sourceFile.endsWith('index.ts') || sourceFile.endsWith('index.tsx')) {
      const implFile = resolveImplementationFile(sourceFile);
      if (implFile !== sourceFile && existsSync(implFile)) {
        sourceContent = readFileSync(implFile, 'utf-8');
      }
    }
  }

  // For composite components, types may be in a separate types.ts file
  let typesContent = sourceContent;
  if (sourceFile) {
    const typesFile = join(dirname(sourceFile), 'types.ts');
    if (existsSync(typesFile)) {
      typesContent = readFileSync(typesFile, 'utf-8');
    }
  }

  const componentType = classifyComponent(parsed, sourceContent);
  const props = extractProps(typesContent);
  const subComponents =
    componentType === 'compound'
      ? extractSubComponents(sourceContent)
      : undefined;

  const subpath = resolveSubpath(parsed, config, projectRoot);
  const isNamespace = parsed.importStyle === 'namespace';
  const importName = isNamespace
    ? `* as ${parsed.componentName}`
    : `{ ${parsed.componentName} }`;
  const importFrom = subpath ?? `${config.packageName}/${parsed.componentName}`;
  const primaryImport = `import ${importName} from '${importFrom}'`;

  const namedExports = isNamespace
    ? (subComponents?.map((s) => `${parsed.componentName}.${s.name}`) ?? [])
    : [parsed.componentName];

  const sourcePath = sourceFile
    ? sourceFile.replace(projectRoot + '/', '')
    : parsed.importSource;

  return {
    name: parsed.componentName,
    type: componentType,
    figma: {
      fileKey: parsed.figmaFileKey,
      nodeId: parsed.figmaNodeId,
      url: parsed.figmaUrl,
    },
    imports: {
      primary: primaryImport,
      namedExports,
      subpath,
    },
    props,
    subComponents,
    example: parsed.example,
    sourcePath,
  };
}
