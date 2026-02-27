// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdirSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { generate } from '../generate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FIXTURES = join(__dirname, '../fixtures');

describe('generate (integration)', () => {
  let tmpOut: string;
  let outputPath: string;
  let manifest: Record<string, unknown>;

  beforeAll(() => {
    tmpOut = join(tmpdir(), `figma-codex-integration-${Date.now()}`);
    mkdirSync(tmpOut, { recursive: true });
    outputPath = join(tmpOut, 'figma-codex.json');

    generate({
      include: [`${FIXTURES}/*.figma.tsx`],
      outputPath,
      packageName: '@test/design-system',
      tsconfig: 'tsconfig.json',
      projectRoot: FIXTURES,
    });

    manifest = JSON.parse(readFileSync(outputPath, 'utf-8')) as Record<
      string,
      unknown
    >;
  });

  afterAll(() => {
    rmSync(tmpOut, { recursive: true, force: true });
  });

  it('creates the output file', () => {
    expect(existsSync(outputPath)).toBe(true);
  });

  it('includes SimpleComponent', () => {
    const components = manifest.components as Record<string, unknown>;
    expect(components).toHaveProperty('SimpleComponent');
  });

  it('includes CompoundComponent', () => {
    const components = manifest.components as Record<string, unknown>;
    expect(components).toHaveProperty('CompoundComponent');
  });

  it('SimpleComponent is type simple', () => {
    const components = manifest.components as Record<string, { type: string }>;
    expect(components.SimpleComponent.type).toBe('simple');
  });

  it('CompoundComponent is type compound', () => {
    const components = manifest.components as Record<string, { type: string }>;
    expect(components.CompoundComponent.type).toBe('compound');
  });

  it('has valid schema version', () => {
    expect(manifest.version).toBe('1.0.0');
  });

  it('has generatedAt timestamp', () => {
    expect(typeof manifest.generatedAt).toBe('string');
  });

  it('has non-empty components map', () => {
    const components = manifest.components as Record<string, unknown>;
    expect(Object.keys(components).length).toBeGreaterThan(0);
  });
});
