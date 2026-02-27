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

  // Match interface declarations ending with 'Props'
  const interfaceMatch = sourceContent.match(
    /interface\s+\w+Props\s*\{([^}]+)\}/s,
  );
  if (!interfaceMatch) return props;

  const body = interfaceMatch[1];
  // Match lines like: /** JSDoc */ propName?: type
  const propRe = /(?:\/\*\*\s*([\s\S]*?)\s*\*\/\s*)?(\w+)(\?)?:\s*([^;\n]+)/g;
  let m: RegExpExecArray | null;
  while ((m = propRe.exec(body)) !== null) {
    const [, jsdoc, name, optional, typeRaw] = m;
    if (!name || name === 'children') continue;
    props.push({
      name,
      type: typeRaw.trim().replace(/;$/, ''),
      required: !optional,
      description: jsdoc?.trim().replace(/\n\s*\*\s*/g, ' '),
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
