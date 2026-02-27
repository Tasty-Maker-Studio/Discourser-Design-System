// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { loadConfig } from '../config';

describe('loadConfig', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = join(tmpdir(), `figma-codex-test-${Date.now()}`);
    mkdirSync(tmpDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('returns defaults when no config file exists', () => {
    const config = loadConfig(tmpDir);
    expect(config.include).toEqual(['src/components/**/*.figma.tsx']);
    expect(config.outputPath).toBe('dist/figma-codex.json');
    expect(config.tsconfig).toBe('tsconfig.json');
  });

  it('merges user config over defaults', () => {
    const userConfig = {
      include: ['src/custom/**/*.figma.tsx'],
      outputPath: 'out/codex.json',
    };
    writeFileSync(
      join(tmpDir, 'figma-codex.config.json'),
      JSON.stringify(userConfig),
    );
    const config = loadConfig(tmpDir);
    expect(config.include).toEqual(['src/custom/**/*.figma.tsx']);
    expect(config.outputPath).toBe('out/codex.json');
    expect(config.tsconfig).toBe('tsconfig.json'); // default preserved
  });

  it('reads packageName from package.json when not set in config', () => {
    writeFileSync(
      join(tmpDir, 'package.json'),
      JSON.stringify({ name: '@my/design-system' }),
    );
    const config = loadConfig(tmpDir);
    expect(config.packageName).toBe('@my/design-system');
  });

  it('prefers packageName from config over package.json', () => {
    writeFileSync(
      join(tmpDir, 'package.json'),
      JSON.stringify({ name: '@my/design-system' }),
    );
    writeFileSync(
      join(tmpDir, 'figma-codex.config.json'),
      JSON.stringify({ packageName: 'override-name' }),
    );
    const config = loadConfig(tmpDir);
    expect(config.packageName).toBe('override-name');
  });
});
