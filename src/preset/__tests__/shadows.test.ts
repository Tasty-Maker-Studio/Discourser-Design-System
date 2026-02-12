import { describe, it, expect } from 'vitest';
import { shadows } from '../shadows';

describe('Shadow Token Architecture', () => {
  describe('Semantic tokens chain to M3 base tokens', () => {
    it('xs should reference shadows.level1', () => {
      expect(shadows.xs.value).toBe('{shadows.level1}');
    });

    it('sm should reference shadows.level2', () => {
      expect(shadows.sm.value).toBe('{shadows.level2}');
    });

    it('md should reference shadows.level3', () => {
      expect(shadows.md.value).toBe('{shadows.level3}');
    });

    it('lg should reference shadows.level4', () => {
      expect(shadows.lg.value).toBe('{shadows.level4}');
    });

    it('xl should reference shadows.level5', () => {
      expect(shadows.xl.value).toBe('{shadows.level5}');
    });

    it('2xl should reference shadows.level5', () => {
      expect(shadows['2xl'].value).toBe('{shadows.level5}');
    });
  });

  describe('Utility tokens remain independent', () => {
    it('inset should have base and _dark values (not reference base tokens)', () => {
      expect(shadows.inset.value).toHaveProperty('base');
      expect(shadows.inset.value).toHaveProperty('_dark');
      expect(typeof shadows.inset.value.base).toBe('string');
      expect(shadows.inset.value.base).toContain('inset');
    });

    it('inset should not reference a level token', () => {
      expect(shadows.inset.value.base).not.toMatch(/\{shadows\.level\d\}/);
    });
  });

  describe('Token coverage', () => {
    it('should have all required semantic shadow tokens', () => {
      const requiredTokens = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'inset'];
      const definedTokens = Object.keys(shadows);

      requiredTokens.forEach(token => {
        expect(definedTokens).toContain(token);
      });
    });

    it('should not have unexpected tokens', () => {
      const allowedTokens = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'inset', 'focus-underline', 'inset-border'];
      const definedTokens = Object.keys(shadows);

      definedTokens.forEach(token => {
        expect(allowedTokens).toContain(token);
      });
    });
  });

  describe('No hardcoded Park UI values', () => {
    it('semantic elevation tokens should not contain hardcoded color references', () => {
      const elevationTokens = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

      elevationTokens.forEach(token => {
        const value = shadows[token as keyof typeof shadows].value;

        // Should be a string reference, not an object with base/_dark
        expect(typeof value).toBe('string');

        // Should reference a level token
        expect(value).toMatch(/^\{shadows\.level\d\}$/);

        // Should NOT contain color references
        expect(value).not.toContain('{colors.');
        expect(value).not.toContain('rgba');
      });
    });
  });
});
