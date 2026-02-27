import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface FigmaCodexConfig {
  include: string[];
  outputPath: string;
  packageName: string;
  tsconfig: string;
}

const DEFAULTS: FigmaCodexConfig = {
  include: ['src/components/**/*.figma.tsx'],
  outputPath: 'dist/figma-codex.json',
  packageName: '',
  tsconfig: 'tsconfig.json',
};

export function loadConfig(
  projectRoot: string = process.cwd(),
): FigmaCodexConfig {
  let userConfig: Partial<FigmaCodexConfig> = {};

  const configPath = join(projectRoot, 'figma-codex.config.json');
  if (existsSync(configPath)) {
    userConfig = JSON.parse(readFileSync(configPath, 'utf-8'));
  }

  let packageName = userConfig.packageName ?? '';
  if (!packageName) {
    const pkgPath = join(projectRoot, 'package.json');
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      packageName = pkg.name ?? '';
    }
  }

  return {
    ...DEFAULTS,
    ...userConfig,
    packageName,
  };
}
