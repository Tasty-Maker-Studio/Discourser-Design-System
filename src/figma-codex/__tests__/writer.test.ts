// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, rmSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { writeManifest } from '../writer';
import type { ComponentEntry } from '../schema';

const sampleEntry: ComponentEntry = {
  name: 'Button',
  type: 'simple',
  figma: {
    fileKey: 'ABC123',
    nodeId: '1:2',
    url: 'https://www.figma.com/design/ABC123/F?node-id=1-2',
  },
  imports: {
    primary: "import { Button } from '@discourser/design-system/Button'",
    namedExports: ['Button'],
    subpath: '@discourser/design-system/Button',
  },
  props: [{ name: 'label', type: 'string', required: true }],
  example: '<Button label="Click me" />',
  sourcePath: 'src/components/Button.tsx',
};

describe('writeManifest', () => {
  let tmpDir: string;
  let outputPath: string;

  beforeEach(() => {
    tmpDir = join(tmpdir(), `figma-codex-writer-${Date.now()}`);
    mkdirSync(tmpDir, { recursive: true });
    outputPath = join(tmpDir, 'figma-codex.json');
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('writes valid JSON to the output path', () => {
    writeManifest(
      { Button: sampleEntry },
      { packageName: '@discourser/design-system', outputPath },
      tmpDir,
    );
    const raw = readFileSync(outputPath, 'utf-8');
    expect(() => JSON.parse(raw)).not.toThrow();
  });

  it('includes schema version 1.0.0', () => {
    writeManifest(
      { Button: sampleEntry },
      { packageName: '@discourser/design-system', outputPath },
      tmpDir,
    );
    const manifest = JSON.parse(readFileSync(outputPath, 'utf-8'));
    expect(manifest.version).toBe('1.0.0');
  });

  it('includes generatedAt ISO timestamp', () => {
    writeManifest(
      { Button: sampleEntry },
      { packageName: '@discourser/design-system', outputPath },
      tmpDir,
    );
    const manifest = JSON.parse(readFileSync(outputPath, 'utf-8'));
    expect(manifest.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('includes all provided components', () => {
    writeManifest(
      { Button: sampleEntry },
      { packageName: '@discourser/design-system', outputPath },
      tmpDir,
    );
    const manifest = JSON.parse(readFileSync(outputPath, 'utf-8'));
    expect(manifest.components).toHaveProperty('Button');
    expect(manifest.components.Button.name).toBe('Button');
  });

  it('uses 2-space indentation', () => {
    writeManifest(
      { Button: sampleEntry },
      { packageName: '@discourser/design-system', outputPath },
      tmpDir,
    );
    const raw = readFileSync(outputPath, 'utf-8');
    expect(raw).toContain('  "version"');
  });

  it('collects figmaFiles from all components', () => {
    writeManifest(
      { Button: sampleEntry },
      { packageName: '@discourser/design-system', outputPath },
      tmpDir,
    );
    const manifest = JSON.parse(readFileSync(outputPath, 'utf-8'));
    expect(manifest.figmaFiles).toHaveProperty('ABC123');
  });

  it('handles empty component list without throwing', () => {
    expect(() =>
      writeManifest(
        {},
        { packageName: '@discourser/design-system', outputPath },
        tmpDir,
      ),
    ).not.toThrow();
  });
});
