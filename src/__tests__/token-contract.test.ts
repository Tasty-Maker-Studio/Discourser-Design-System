/**
 * Token Contract Tests
 *
 * Permanent regression guard. Prevents semantic-tokens.ts from drifting out of sync
 * with material3.language.ts. Run in CI on every PR.
 *
 * If any test here fails, a semantic role is missing or broken. Fix the gap in
 * semantic-tokens.ts — do not adjust these tests.
 */

import { describe, test, expect } from 'vitest';
import { material3Language } from '../languages/material3.language';
import { semanticColorTokens } from '../preset/semantic-tokens';
import { discourserPandaPreset } from '../preset/index';

// ---------------------------------------------------------------------------
// Check 1: Coverage — every language semantic role is represented in the preset
// ---------------------------------------------------------------------------

describe('Semantic token coverage', () => {
  const languageRoles = Object.keys(material3Language.semantic);
  const presetKeys = flattenTokenKeys(semanticColorTokens);

  test.each(languageRoles)(
    '"%s" from language contract is represented in semanticColorTokens',
    (role) => {
      // Normalize: strip `.DEFAULT` suffix, remove all dots, lowercase.
      // This lets `primaryContainer` match `primary.container`, etc.
      const normalize = (k: string) =>
        k
          .toLowerCase()
          .replace(/\.default$/i, '')
          .replace(/\./g, '');
      const normalizedRole = normalize(role);
      const found = presetKeys.some((k) => normalize(k) === normalizedRole);
      expect(found).toBe(true);
    },
  );
});

// ---------------------------------------------------------------------------
// Check 2: No undefined or empty values in any token definition
// ---------------------------------------------------------------------------

describe('Semantic token values', () => {
  test('no token has an undefined or empty light value', () => {
    walkTokens(semanticColorTokens, (_path, token) => {
      if (
        token.value &&
        typeof token.value === 'object' &&
        'base' in token.value
      ) {
        expect(token.value.base).toBeDefined();
        expect(token.value.base).not.toBe('');
        expect(token.value.base).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }
    });
  });

  test('no token has an undefined or empty dark value', () => {
    walkTokens(semanticColorTokens, (_path, token) => {
      if (
        token.value &&
        typeof token.value === 'object' &&
        '_dark' in token.value
      ) {
        expect(token.value._dark).toBeDefined();
        expect(token.value._dark).not.toBe('');
        expect(token.value._dark).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }
    });
  });
});

// ---------------------------------------------------------------------------
// Check 3: Language contract symmetry — semantic and semanticDark have identical keys
// ---------------------------------------------------------------------------

describe('Language contract symmetry', () => {
  test('semanticDark has the same keys as semantic', () => {
    const lightKeys = Object.keys(material3Language.semantic).sort();
    const darkKeys = Object.keys(material3Language.semanticDark!).sort();
    expect(darkKeys).toEqual(lightKeys);
  });
});

// ---------------------------------------------------------------------------
// Check 4: Preset assembly — Radix bridge keys AND semantic keys coexist after deep-merge
// ---------------------------------------------------------------------------

describe('Preset color assembly', () => {
  const colors = discourserPandaPreset.theme?.extend?.semanticTokens
    ?.colors as Record<string, Record<string, unknown>>;

  test.each(['primary', 'secondary', 'tertiary', 'error'])(
    '%s has both Radix bridge keys (1, 12) and semantic keys (DEFAULT, container)',
    (palette) => {
      expect(colors[palette]['1']).toBeDefined();
      expect(colors[palette]['12']).toBeDefined();
      expect(colors[palette]['DEFAULT']).toBeDefined();
      expect(colors[palette]['container']).toBeDefined();
    },
  );

  test('surface has full nested container structure', () => {
    const surface = colors['surface'] as Record<string, unknown>;
    expect(surface['DEFAULT']).toBeDefined();
    expect(
      (surface['container'] as Record<string, unknown>)?.['DEFAULT'],
    ).toBeDefined();
    expect(
      (surface['container'] as Record<string, unknown>)?.['low'],
    ).toBeDefined();
    expect(
      (surface['container'] as Record<string, unknown>)?.['highest'],
    ).toBeDefined();
  });

  test('onSurface has variant subkey', () => {
    const onSurface = colors['onSurface'] as Record<string, unknown>;
    expect(onSurface['DEFAULT']).toBeDefined();
    expect(onSurface['variant']).toBeDefined();
  });

  test('previously missing tokens are now present', () => {
    expect(colors['background']).toBeDefined();
    expect(colors['onBackground']).toBeDefined();
    expect(colors['shadow']).toBeDefined();
    expect(colors['surfaceVariant']).toBeDefined();
    expect(
      (colors['onError'] as Record<string, unknown>)?.['DEFAULT'],
    ).toBeDefined();
    expect(
      (colors['error'] as Record<string, unknown>)?.['container'],
    ).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Flatten nested token object to dot-notation key array */
function flattenTokenKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, val]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && !('value' in (val as object))) {
      return flattenTokenKeys(val as Record<string, unknown>, fullKey);
    }
    return [fullKey];
  });
}

/** Walk all leaf token nodes and call callback */
function walkTokens(
  obj: Record<string, unknown>,
  callback: (path: string, token: { value: unknown }) => void,
  prefix = '',
) {
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && 'value' in (val as object)) {
      callback(path, val as { value: unknown });
    } else if (val && typeof val === 'object') {
      walkTokens(val as Record<string, unknown>, callback, path);
    }
  }
}
