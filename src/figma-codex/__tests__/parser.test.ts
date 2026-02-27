// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFigmaFile } from '../parser';
import type { ParsedFigmaFile } from '../parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FIXTURES = join(__dirname, '../fixtures');

describe('parseFigmaFile', () => {
  describe('named import (simple/composite pattern)', () => {
    let result: ParsedFigmaFile;

    beforeEach(() => {
      const content = readFileSync(
        join(FIXTURES, 'SimpleComponent.figma.tsx'),
        'utf-8',
      );
      result = parseFigmaFile(
        content,
        join(FIXTURES, 'SimpleComponent.figma.tsx'),
      );
    });

    it('detects named import style', () => {
      expect(result.importStyle).toBe('named');
    });

    it('extracts component name', () => {
      expect(result.componentName).toBe('SimpleComponent');
    });

    it('extracts import source path', () => {
      expect(result.importSource).toBe('./SimpleComponent');
    });

    it('extracts figma URL', () => {
      expect(result.figmaUrl).toBe(
        'https://www.figma.com/design/ABC123/TestFile?node-id=1-2',
      );
    });

    it('extracts file key from URL', () => {
      expect(result.figmaFileKey).toBe('ABC123');
    });

    it('extracts node ID from URL (converting dash to colon)', () => {
      expect(result.figmaNodeId).toBe('1:2');
    });

    it('extracts example JSX as string', () => {
      expect(result.example).toContain('SimpleComponent');
      expect(result.example).toContain('label="Hello"');
    });

    it('returns empty props mapping when no props block', () => {
      expect(result.propsMapping).toEqual({});
    });
  });

  describe('namespace import (compound pattern)', () => {
    let result: ParsedFigmaFile;

    beforeEach(() => {
      const content = readFileSync(
        join(FIXTURES, 'CompoundComponent.figma.tsx'),
        'utf-8',
      );
      result = parseFigmaFile(
        content,
        join(FIXTURES, 'CompoundComponent.figma.tsx'),
      );
    });

    it('detects namespace import style', () => {
      expect(result.importStyle).toBe('namespace');
    });

    it('extracts namespace identifier', () => {
      expect(result.componentName).toBe('CompoundComponent');
    });

    it('extracts import source', () => {
      expect(result.importSource).toBe('./CompoundComponent/index');
    });

    it('extracts sub-component name from connect call (e.g., Root)', () => {
      expect(result.connectSubComponent).toBe('Root');
    });

    it('extracts node ID correctly', () => {
      expect(result.figmaNodeId).toBe('5:10');
    });

    it('extracts multiline example JSX', () => {
      expect(result.example).toContain('CompoundComponent.Root');
      expect(result.example).toContain('CompoundComponent.Header');
    });
  });

  describe('props mapping extraction', () => {
    it('extracts prop names from figma.enum props block', () => {
      const content = `
import figma from '@figma/code-connect'
import { Header } from './Header'
figma.connect(Header, 'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/File?node-id=485-4697', {
  props: {
    size: figma.enum('size', { xSm: 'xs', Mdm: 'md' }),
  },
  example: ({ size }) => <Header size={size}>Text</Header>,
})
      `.trim();
      const result = parseFigmaFile(content, '/fake/Header.figma.tsx');
      expect(result.propsMapping).toHaveProperty('size');
    });
  });

  describe('error handling', () => {
    it('throws ParseError for file with no figma.connect call', () => {
      expect(() =>
        parseFigmaFile('import React from "react"', '/fake/empty.figma.tsx'),
      ).toThrow();
    });

    it('throws ParseError for file with no import', () => {
      expect(() =>
        parseFigmaFile(
          `figma.connect(X, 'https://figma.com/design/A/F?node-id=1-2', { example: () => <X /> })`,
          '/fake/noimport.figma.tsx',
        ),
      ).toThrow();
    });
  });
});
