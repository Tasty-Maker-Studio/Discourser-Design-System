import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, isAbsolute } from 'node:path';
import { execSync } from 'node:child_process';
import type { ComponentEntry, FigmaCodex } from './schema';

interface WriteOptions {
  packageName: string;
  outputPath: string;
}

function getGitHash(cwd: string): string | undefined {
  try {
    return execSync('git rev-parse --short HEAD', {
      cwd,
      stdio: ['pipe', 'pipe', 'pipe'],
    })
      .toString()
      .trim();
  } catch {
    return undefined;
  }
}

export function writeManifest(
  components: Record<string, ComponentEntry>,
  options: WriteOptions,
  projectRoot: string,
): void {
  const figmaFiles: FigmaCodex['figmaFiles'] = {};
  for (const entry of Object.values(components)) {
    const { fileKey } = entry.figma;
    if (fileKey && !figmaFiles[fileKey]) {
      figmaFiles[fileKey] = { fileKey };
    }
  }

  const manifest: FigmaCodex = {
    version: '1.0.0',
    packageName: options.packageName,
    generatedAt: new Date().toISOString(),
    gitHash: getGitHash(projectRoot),
    figmaFiles,
    components,
  };

  const outPath = isAbsolute(options.outputPath)
    ? options.outputPath
    : join(projectRoot, options.outputPath);

  const outDir = dirname(outPath);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
}
