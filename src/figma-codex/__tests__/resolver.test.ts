// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveComponent } from '../resolver';
import type { ParsedFigmaFile } from '../parser';
import type { FigmaCodexConfig } from '../config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FIXTURES = join(__dirname, '../fixtures');
const DDS_ROOT = join(__dirname, '../../..');

const baseConfig: FigmaCodexConfig = {
  include: [],
  outputPath: 'dist/figma-codex.json',
  packageName: '@discourser/design-system',
  tsconfig: 'tsconfig.json',
};

describe('resolveComponent', () => {
  describe('simple component', () => {
    const parsed: ParsedFigmaFile = {
      filePath: join(FIXTURES, 'SimpleComponent.figma.tsx'),
      importStyle: 'named',
      componentName: 'SimpleComponent',
      importSource: './SimpleComponent',
      figmaUrl: 'https://www.figma.com/design/ABC123/TestFile?node-id=1-2',
      figmaFileKey: 'ABC123',
      figmaNodeId: '1:2',
      example: '<SimpleComponent label="Hello" />',
      propsMapping: {},
    };

    it('classifies as simple', () => {
      const entry = resolveComponent(parsed, baseConfig);
      expect(entry.type).toBe('simple');
    });

    it('extracts named exports from source', () => {
      const entry = resolveComponent(parsed, baseConfig);
      expect(entry.imports.namedExports).toContain('SimpleComponent');
    });

    it('extracts prop definitions', () => {
      const entry = resolveComponent(parsed, baseConfig);
      expect(entry.props.length).toBeGreaterThan(0);
      const labelProp = entry.props.find((p) => p.name === 'label');
      expect(labelProp).toBeDefined();
      expect(labelProp?.required).toBe(true);
    });

    it('extracts optional props', () => {
      const entry = resolveComponent(parsed, baseConfig);
      const sizeProp = entry.props.find((p) => p.name === 'size');
      expect(sizeProp).toBeDefined();
      expect(sizeProp?.required).toBe(false);
    });

    it('builds correct figma metadata', () => {
      const entry = resolveComponent(parsed, baseConfig);
      expect(entry.figma.fileKey).toBe('ABC123');
      expect(entry.figma.nodeId).toBe('1:2');
      expect(entry.figma.url).toBe(parsed.figmaUrl);
    });

    it('builds primary import statement', () => {
      const entry = resolveComponent(parsed, baseConfig);
      expect(entry.imports.primary).toContain('SimpleComponent');
      expect(entry.imports.primary).toContain('@discourser/design-system');
    });
  });

  describe('compound component', () => {
    const parsed: ParsedFigmaFile = {
      filePath: join(FIXTURES, 'CompoundComponent.figma.tsx'),
      importStyle: 'namespace',
      componentName: 'CompoundComponent',
      importSource: './CompoundComponent/index',
      connectSubComponent: 'Root',
      figmaUrl: 'https://www.figma.com/design/ABC123/TestFile?node-id=5-10',
      figmaFileKey: 'ABC123',
      figmaNodeId: '5:10',
      example: '<CompoundComponent.Root>...</CompoundComponent.Root>',
      propsMapping: {},
    };

    it('classifies as compound', () => {
      const entry = resolveComponent(parsed, baseConfig);
      expect(entry.type).toBe('compound');
    });

    it('extracts sub-components from withContext/withProvider calls', () => {
      const entry = resolveComponent(parsed, baseConfig);
      expect(entry.subComponents).toBeDefined();
      const names = entry.subComponents?.map((s) => s.name) ?? [];
      expect(names).toContain('Root');
      expect(names).toContain('Header');
      expect(names).toContain('Body');
    });

    it('extracts HTML element for sub-components', () => {
      const entry = resolveComponent(parsed, baseConfig);
      const rootSub = entry.subComponents?.find((s) => s.name === 'Root');
      expect(rootSub?.element).toBeTruthy();
    });

    it('builds namespace import statement', () => {
      const entry = resolveComponent(parsed, baseConfig);
      expect(entry.imports.primary).toContain('* as CompoundComponent');
    });
  });

  describe('composite component detection', () => {
    it('classifies NavigationMenu as composite (imports other DDS components)', () => {
      const parsed: ParsedFigmaFile = {
        filePath: join(
          DDS_ROOT,
          'src/components/NavigationMenu/NavigationMenu.figma.tsx',
        ),
        importStyle: 'named',
        componentName: 'NavigationMenu',
        importSource: './NavigationMenu',
        figmaUrl:
          'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-8485',
        figmaFileKey: 'GaHmFfmvO4loUzuZS4TgEz',
        figmaNodeId: '38:8485',
        example: '<NavigationMenu sections={[]} />',
        propsMapping: {},
      };
      const entry = resolveComponent(parsed, {
        ...baseConfig,
        packageName: '@discourser/design-system',
      });
      expect(entry.type).toBe('composite');
    });
  });

  describe('missing source file', () => {
    it('returns empty props array when source file not found', () => {
      const parsed: ParsedFigmaFile = {
        filePath: '/nonexistent/dir/Missing.figma.tsx',
        importStyle: 'named',
        componentName: 'Missing',
        importSource: './Missing',
        figmaUrl: 'https://www.figma.com/design/X/F?node-id=1-1',
        figmaFileKey: 'X',
        figmaNodeId: '1:1',
        example: '<Missing />',
        propsMapping: {},
      };
      const entry = resolveComponent(parsed, baseConfig);
      expect(entry.props).toEqual([]);
    });
  });
});
