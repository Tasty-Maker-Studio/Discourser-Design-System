import { describe, it, expect } from 'vitest';
import { transformToPandaTheme } from '../transform';
import { material3Language } from '../material3.language';

describe('Design Language Transform', () => {
  const pandaTheme = transformToPandaTheme(material3Language);

  describe('Shadow base tokens', () => {
    it('should transform elevation.levels to shadow tokens', () => {
      expect(pandaTheme.tokens.shadows).toBeDefined();
      expect(pandaTheme.tokens.shadows).toHaveProperty('level0');
      expect(pandaTheme.tokens.shadows).toHaveProperty('level1');
      expect(pandaTheme.tokens.shadows).toHaveProperty('level2');
      expect(pandaTheme.tokens.shadows).toHaveProperty('level3');
      expect(pandaTheme.tokens.shadows).toHaveProperty('level4');
      expect(pandaTheme.tokens.shadows).toHaveProperty('level5');
    });

    it('should preserve M3 shadow values exactly', () => {
      const expected = material3Language.elevation.levels;

      expect(pandaTheme.tokens.shadows.level0.value).toBe(expected.level0);
      expect(pandaTheme.tokens.shadows.level1.value).toBe(expected.level1);
      expect(pandaTheme.tokens.shadows.level2.value).toBe(expected.level2);
      expect(pandaTheme.tokens.shadows.level3.value).toBe(expected.level3);
      expect(pandaTheme.tokens.shadows.level4.value).toBe(expected.level4);
      expect(pandaTheme.tokens.shadows.level5.value).toBe(expected.level5);
    });

    it('level0 should be none (no shadow)', () => {
      expect(pandaTheme.tokens.shadows.level0.value).toBe('none');
    });

    it('level1-5 should contain rgba shadow values', () => {
      expect(pandaTheme.tokens.shadows.level1.value).toContain('rgba');
      expect(pandaTheme.tokens.shadows.level2.value).toContain('rgba');
      expect(pandaTheme.tokens.shadows.level3.value).toContain('rgba');
      expect(pandaTheme.tokens.shadows.level4.value).toContain('rgba');
      expect(pandaTheme.tokens.shadows.level5.value).toContain('rgba');
    });

    it('shadow values should follow M3 pattern (two shadows)', () => {
      // M3 shadows typically have two parts: ambient and directional
      const shadowLevels = [1, 2, 3, 4, 5];

      shadowLevels.forEach(level => {
        const shadowValue = pandaTheme.tokens.shadows[`level${level}`].value;
        const shadowParts = shadowValue.split(',').length;

        // Should have 2 parts (ambient + directional)
        expect(shadowParts).toBeGreaterThanOrEqual(2);
      });
    });
  });

  describe('Elevation progression', () => {
    it('should have increasing shadow complexity from level1 to level5', () => {
      // Extract shadow strings and check they increase in complexity
      // This is a heuristic test - higher levels should have larger offsets/blur

      const levels = [1, 2, 3, 4, 5].map(
        level => pandaTheme.tokens.shadows[`level${level}`].value
      );

      // Check that each level is different
      const uniqueLevels = new Set(levels);
      expect(uniqueLevels.size).toBe(5);

      // Check that level1 is simpler than level5 (by string length as proxy)
      expect(levels[0].length).toBeLessThan(levels[4].length);
    });
  });

  describe('Transform function integrity', () => {
    it('should not modify the original language object', () => {
      const original = JSON.stringify(material3Language);
      transformToPandaTheme(material3Language);
      const after = JSON.stringify(material3Language);

      expect(after).toBe(original);
    });

    it('should return theme with expected structure', () => {
      expect(pandaTheme).toHaveProperty('tokens');
      expect(pandaTheme).toHaveProperty('semanticTokens');
      expect(pandaTheme).toHaveProperty('textStyles');
    });

    it('should transform all token categories', () => {
      expect(pandaTheme.tokens).toHaveProperty('colors');
      expect(pandaTheme.tokens).toHaveProperty('fonts');
      expect(pandaTheme.tokens).toHaveProperty('fontSizes');
      expect(pandaTheme.tokens).toHaveProperty('spacing');
      expect(pandaTheme.tokens).toHaveProperty('radii');
      expect(pandaTheme.tokens).toHaveProperty('shadows');
      expect(pandaTheme.tokens).toHaveProperty('durations');
      expect(pandaTheme.tokens).toHaveProperty('easings');
    });
  });
});
