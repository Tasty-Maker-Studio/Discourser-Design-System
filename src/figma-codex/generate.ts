import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFigmaFile, ParseError } from './parser';
import { resolveComponent } from './resolver';
import { writeManifest } from './writer';
import { loadConfig, type FigmaCodexConfig } from './config';
import type { ComponentEntry } from './schema';

/** Recursively find all .figma.tsx files under a directory */
function findFigmaFiles(rootDir: string): string[] {
  const files: string[] = [];

  function walk(dir: string) {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.figma.tsx')) files.push(full);
    }
  }

  walk(rootDir);
  return files;
}

export interface GenerateOptions extends FigmaCodexConfig {
  projectRoot?: string;
}

export function generate(options: GenerateOptions): void {
  const projectRoot = options.projectRoot ?? process.cwd();

  // Resolve include patterns to base directories then scan recursively
  const figmaFiles: string[] = [];
  for (const pattern of options.include) {
    // Extract the literal prefix before the first '*' as the base directory to walk.
    // Patterns starting with '*' (e.g. '**/*.figma.tsx') fall back to projectRoot.
    // Patterns like 'src/components/**/*.figma.tsx' correctly resolve to 'src/components/'.
    const starIdx = pattern.indexOf('*');
    const baseDir =
      starIdx > 0
        ? isAbsolute(pattern.slice(0, starIdx))
          ? pattern.slice(0, starIdx).replace(/\/$/, '')
          : join(projectRoot, pattern.slice(0, starIdx).replace(/\/$/, ''))
        : projectRoot;
    const found = findFigmaFiles(baseDir);
    figmaFiles.push(...found);
  }

  if (figmaFiles.length === 0) {
    console.warn(
      '[figma-codex] No .figma.tsx files found. Check your include patterns.',
    );
    return;
  }

  const components: Record<string, ComponentEntry> = {};

  for (const filePath of figmaFiles) {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const parsed = parseFigmaFile(content, filePath);
      const entry = resolveComponent(parsed, options);
      components[entry.name] = entry;
      console.log(`[figma-codex] ✓ ${entry.name} (${entry.type})`);
    } catch (err) {
      if (err instanceof ParseError) {
        console.warn(`[figma-codex] ⚠ Skipping ${filePath}: ${err.message}`);
      } else {
        console.warn(`[figma-codex] ⚠ Skipping ${filePath}: ${String(err)}`);
      }
    }
  }

  if (Object.keys(components).length === 0) {
    throw new Error('[figma-codex] No components successfully parsed.');
  }

  writeManifest(
    components,
    { packageName: options.packageName, outputPath: options.outputPath },
    projectRoot,
  );
  console.log(
    `[figma-codex] Generated ${Object.keys(components).length} components → ${options.outputPath}`,
  );
}

// CLI entry point
const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === resolve(currentFile)) {
  try {
    const config = loadConfig();
    generate({ ...config, projectRoot: process.cwd() });
  } catch (err) {
    console.error(String(err));
    process.exit(1);
  }
}
