import { describe, it, expect } from 'vitest';
import { discourserPandaPreset as preset } from '../index';

/**
 * Integration tests for token resolution
 * These tests verify that the full Panda config resolves tokens correctly
 */
describe('Token Resolution Integration', () => {

  describe('Shadow token resolution', () => {
    it('preset should include semantic shadow tokens', () => {
      expect(preset.theme?.extend?.semanticTokens?.shadows).toBeDefined();

      const shadows = preset.theme?.extend?.semanticTokens?.shadows;
      expect(shadows).toHaveProperty('xs');
      expect(shadows).toHaveProperty('sm');
      expect(shadows).toHaveProperty('md');
      expect(shadows).toHaveProperty('lg');
      expect(shadows).toHaveProperty('xl');
      expect(shadows).toHaveProperty('2xl');
      expect(shadows).toHaveProperty('inset');
    });

    it('preset should include base shadow tokens from M3', () => {
      expect(preset.theme?.extend?.tokens?.shadows).toBeDefined();

      const shadows = preset.theme?.extend?.tokens?.shadows;
      expect(shadows).toHaveProperty('level0');
      expect(shadows).toHaveProperty('level1');
      expect(shadows).toHaveProperty('level2');
      expect(shadows).toHaveProperty('level3');
      expect(shadows).toHaveProperty('level4');
      expect(shadows).toHaveProperty('level5');
    });

    it('semantic tokens should reference base tokens using token syntax', () => {
      const semanticShadows = preset.theme?.extend?.semanticTokens?.shadows;

      expect(semanticShadows?.xs?.value).toBe('{shadows.level1}');
      expect(semanticShadows?.sm?.value).toBe('{shadows.level2}');
      expect(semanticShadows?.md?.value).toBe('{shadows.level3}');
      expect(semanticShadows?.lg?.value).toBe('{shadows.level4}');
      expect(semanticShadows?.xl?.value).toBe('{shadows.level5}');
      expect(semanticShadows?.['2xl']?.value).toBe('{shadows.level5}');
    });
  });

  describe('Recipe shadow usage', () => {
    it('button recipe should be included in preset', () => {
      const recipes = preset.theme?.extend?.recipes;
      expect(recipes).toHaveProperty('button');
    });

    it('button recipe should use semantic shadow tokens', () => {
      const button = preset.theme?.extend?.recipes?.button;
      // Panda CSS conditional styles (_hover, _active) are not in SystemStyleObject type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elevated = button?.variants?.variant?.elevated as any;

      expect(elevated?.boxShadow).toBe('sm');
      expect(elevated?._hover?.boxShadow).toBe('md');
      expect(elevated?._active?.boxShadow).toBe('xs');
    });
  });

  describe('Preset structure', () => {
    it('should have required theme extensions', () => {
      expect(preset.theme?.extend).toBeDefined();
      expect(preset.theme?.extend?.tokens).toBeDefined();
      expect(preset.theme?.extend?.semanticTokens).toBeDefined();
      expect(preset.theme?.extend?.recipes).toBeDefined();
    });

    it('should include color palette transformations', () => {
      const colors = preset.theme?.extend?.tokens?.colors;

      // M3 uses tonal palettes
      expect(colors).toHaveProperty('primary');
      expect(colors).toHaveProperty('secondary');
      expect(colors).toHaveProperty('tertiary');
      expect(colors).toHaveProperty('neutral');
      expect(colors).toHaveProperty('error');
    });
  });

  describe('Token reference integrity', () => {
    it('semantic tokens should only reference existing base tokens', () => {
      const baseShadows = preset.theme?.extend?.tokens?.shadows;
      const semanticShadows = preset.theme?.extend?.semanticTokens?.shadows;

      const baseTokenNames = Object.keys(baseShadows || {});

      Object.entries(semanticShadows || {}).forEach(([_name, config]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = (config as any)?.value;

        // If it's a token reference, verify the referenced token exists
        if (typeof value === 'string' && value.match(/^\{shadows\./)) {
          const referencedToken = value.replace(/^\{shadows\./, '').replace(/\}$/, '');

          if (referencedToken.startsWith('level')) {
            expect(baseTokenNames).toContain(referencedToken);
          }
        }
      });
    });

    it('should not have circular token references', () => {
      const semanticShadows = preset.theme?.extend?.semanticTokens?.shadows;

      // Semantic tokens should reference base tokens, not each other
      Object.entries(semanticShadows || {}).forEach(([_name, config]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = (config as any)?.value;

        if (typeof value === 'string' && value.match(/^\{shadows\./)) {
          const referencedToken = value.replace(/^\{shadows\./, '').replace(/\}$/, '');

          // Should reference level tokens, not other semantic tokens
          expect(referencedToken).toMatch(/^level\d$/);
        }
      });
    });

    it('inset token should remain independent (not chained to level tokens)', () => {
      const semanticShadows = preset.theme?.extend?.semanticTokens?.shadows;
      const insetToken = semanticShadows?.inset;

      // STORY-002 acceptance criterion: inset must NOT reference base tokens
      expect(insetToken?.value).toBeDefined();

      // Should be an object with base/_dark, not a string reference
      expect(typeof insetToken?.value).toBe('object');
      expect(insetToken?.value).toHaveProperty('base');
      expect(insetToken?.value).toHaveProperty('_dark');

      // Should NOT contain token references
      const insetString = JSON.stringify(insetToken);
      expect(insetString).not.toMatch(/\{shadows\.level\d\}/);
    });

    it('utility tokens (focus-underline, inset-border) should remain independent', () => {
      const semanticShadows = preset.theme?.extend?.semanticTokens?.shadows;

      const focusUnderline = semanticShadows?.['focus-underline'];
      const insetBorder = semanticShadows?.['inset-border'];

      // TODO: STORY-003 will add these utility tokens
      // For now, they should NOT be defined (current behavior)
      expect(focusUnderline).toBeUndefined();
      expect(insetBorder).toBeUndefined();
    });
  });

  describe('Design system consistency', () => {
    it('all shadow-using recipes should use semantic or custom values', () => {
      const recipes = preset.theme?.extend?.recipes || {};
      const slotRecipes = preset.theme?.extend?.slotRecipes || {};

      // Name mapping for recipes registered under different names
      const nameMapping: Record<string, string> = {
        'switch': 'switchComponent',
      };

      const recipesWithShadows = [
        'button',
        'card',
        'dialog',
        'drawer',
        'popover',
        'select',
        'slider',
        'switch',
        'toast',
        'tooltip',
      ];

      recipesWithShadows.forEach(recipeName => {
        // Try to find in recipes first, then slotRecipes, accounting for name mapping
        const mappedName = nameMapping[recipeName] || recipeName;
        const recipe = recipes[recipeName as keyof typeof recipes] ||
                      slotRecipes[mappedName as keyof typeof slotRecipes];

        if (!recipe) {
          throw new Error(`Recipe ${recipeName} (mapped to ${mappedName}) not found in recipes or slotRecipes`);
        }

        const recipeString = JSON.stringify(recipe);

        // Should NOT use base level tokens directly
        expect(recipeString).not.toMatch(/['"]level[0-5]['"]/);
      });
    });

    it('ALL recipes in preset should avoid direct base token usage (system-wide check)', () => {
      const recipes = preset.theme?.extend?.recipes || {};
      const slotRecipes = preset.theme?.extend?.slotRecipes || {};

      // Check EVERY recipe in the preset (both simple recipes and slot recipes)
      const allRecipes = { ...recipes, ...slotRecipes };

      Object.entries(allRecipes).forEach(([recipeName, recipe]) => {
        if (!recipe) return;

        const recipeString = JSON.stringify(recipe);

        // No recipe should use level0-5 directly
        const hasBaseTokens = recipeString.match(/['"]level[0-5]['"]/);

        if (hasBaseTokens) {
          // Fail with clear message showing which recipe broke the rule
          throw new Error(`Recipe ${recipeName} contains base token reference: ${hasBaseTokens[0]}`);
        }

        expect(recipeString).not.toMatch(/boxShadow['"]?\s*:\s*['"]level\d/);
      });
    });

    it('utility shadow tokens should be used in appropriate recipes', () => {
      const recipes = preset.theme?.extend?.recipes || {};

      // TODO: STORY-003 will migrate to utility tokens (focus-underline, inset-border)
      // For now, recipes use inline values (current behavior)

      // Input currently uses inline '0 1px 0 0 var(--shadow-color)'
      const input = recipes.input;
      if (input) {
        const inputString = JSON.stringify(input);
        expect(inputString).toContain('0 1px 0 0 var(--shadow-color)');
      }

      // Textarea currently uses inline '0 1px 0 0 var(--shadow-color)'
      const textarea = recipes.textarea;
      if (textarea) {
        const textareaString = JSON.stringify(textarea);
        expect(textareaString).toContain('0 1px 0 0 var(--shadow-color)');
      }

      // RadioGroup currently uses inline 'inset 0 0 0 1px var(--shadow-color)'
      const radioGroup = recipes.radioGroup || recipes['radio-group'];
      if (radioGroup) {
        const radioString = JSON.stringify(radioGroup);
        expect(radioString).toContain('inset 0 0 0 1px var(--shadow-color)');
      }
    });
  });
});
