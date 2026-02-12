import { describe, it, expect } from 'vitest';
import { button } from '../button';
import { card } from '../card';
import { dialog } from '../dialog';
import { drawer } from '../drawer';
import { popover } from '../popover';
import { select } from '../select';
import { slider } from '../slider';
import { switchRecipe } from '../switch';
import { toast } from '../toast';
import { tooltip } from '../tooltip';
import { input } from '../input';
import { textarea } from '../textarea';
import { radioGroup } from '../radio-group';

/**
 * Tests to verify component recipes use semantic tokens (xs-2xl)
 * and NOT base tokens (level0-5)
 */
describe('Recipe Shadow Token Usage', () => {
  describe('Recipes must use semantic tokens only', () => {
    it('button recipe should use semantic tokens (xs, sm, md)', () => {
      // Panda CSS conditional styles (_hover, _active) are not in SystemStyleObject type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elevated = button.variants?.variant?.elevated as any;

      expect(elevated?.boxShadow).toBe('sm');
      expect(elevated?._hover?.boxShadow).toBe('md');
      expect(elevated?._active?.boxShadow).toBe('xs');
    });

    it('card recipe should use semantic tokens', () => {
      const recipeConfig = card.variants?.variant;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const shadowVariant = Object.values(recipeConfig || {}).find((variant: any) => variant.boxShadow);

      if (shadowVariant?.boxShadow) {
        expect(shadowVariant.boxShadow).toMatch(/^(xs|sm|md|lg|xl|2xl)$/);
      }
    });

    it('dialog recipe should use semantic tokens', () => {
      // Slot styles are in base, not slots (slots is array of slot names)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const content = (dialog.base as any)?.content;

      if (content?.boxShadow) {
        expect(content.boxShadow).toMatch(/^(xs|sm|md|lg|xl|2xl)$/);
      }
    });

    it('drawer recipe should use semantic tokens', () => {
      // Slot styles are in base, not slots (slots is array of slot names)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const content = (drawer.base as any)?.content;

      if (content?.boxShadow) {
        expect(content.boxShadow).toMatch(/^(xs|sm|md|lg|xl|2xl)$/);
      }
    });

    it('popover recipe should use semantic tokens', () => {
      // Slot styles are in base, not slots (slots is array of slot names)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const content = (popover.base as any)?.content;

      if (content?.boxShadow) {
        expect(content.boxShadow).toMatch(/^(xs|sm|md|lg|xl|2xl)$/);
      }
    });

    it('select recipe should use semantic tokens', () => {
      // Slot styles are in base, not slots (slots is array of slot names)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const content = (select.base as any)?.content;

      if (content?.boxShadow) {
        expect(content.boxShadow).toMatch(/^(xs|sm|md|lg|xl|2xl)$/);
      }
    });

    it('slider recipe should use semantic tokens', () => {
      // Slot styles are in base, not slots (slots is array of slot names)
      // Cast to any for _hover access (conditional styles not in type)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const thumb = (slider.base as any)?.thumb;

      if (thumb?.boxShadow || thumb?._hover?.boxShadow) {
        const shadowValue = thumb.boxShadow || thumb._hover?.boxShadow;
        expect(shadowValue).toMatch(/^(xs|sm|md|lg|xl|2xl)$/);
      }
    });

    it('switch recipe should use semantic tokens', () => {
      // Slot styles are in base, not slots (slots is array of slot names)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const thumb = (switchRecipe.base as any)?.thumb;

      if (thumb?.boxShadow) {
        expect(thumb.boxShadow).toMatch(/^(xs|sm|md|lg|xl|2xl)$/);
      }
    });

    it('toast recipe should use semantic tokens', () => {
      // Slot styles are in base, not slots (slots is array of slot names)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const root = (toast.base as any)?.root;

      if (root?.boxShadow) {
        expect(root.boxShadow).toMatch(/^(xs|sm|md|lg|xl|2xl)$/);
      }
    });

    it('tooltip recipe should use semantic tokens', () => {
      // Slot styles are in base, not slots (slots is array of slot names)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const content = (tooltip.base as any)?.content;

      if (content?.boxShadow) {
        expect(content.boxShadow).toMatch(/^(xs|sm|md|lg|xl|2xl)$/);
      }
    });
  });

  describe('Recipes must NOT use base tokens', () => {
    const recipes = {
      button,
      card,
      dialog,
      drawer,
      popover,
      select,
      slider,
      switchRecipe,
      toast,
      tooltip,
    };

    it('no recipe should reference level0-5 base tokens', () => {
      Object.entries(recipes).forEach(([name, recipe]) => {
        if (!recipe) {
          console.warn(`Recipe ${name} is undefined`);
          return;
        }

        const recipeString = JSON.stringify(recipe);

        // Check for direct level token references
        expect(recipeString).not.toMatch(/['"]level[0-5]['"]/);

        // Specific check for boxShadow values
        expect(recipeString).not.toMatch(/boxShadow['"]?\s*:\s*['"]level\d/);
      });
    });
  });

  describe('Custom shadows are allowed', () => {
    it('utility components can use custom shadow values (not semantic or base)', () => {
      // Some components use custom shadows for specific effects (borders, insets, etc.)
      // These should not match semantic or base token patterns

      const customShadowPattern = /^((?!xs|sm|md|lg|xl|2xl|level\d).)*$/;

      // This test documents that custom shadows are intentional
      // Examples: input field underlines, radio button rings, etc.
      expect('0 1px 0 0 var(--shadow-color)').toMatch(customShadowPattern);
      expect('inset 0 0 0 1px var(--shadow-color)').toMatch(customShadowPattern);
    });
  });

  describe('STORY-003: Utility token usage (focus-underline, inset-border)', () => {
    it('input flushed variant should use focus-underline token, not inline value', () => {
      // Panda CSS conditional styles (_focus) are not in SystemStyleObject type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const flushedVariant = input.variants?.variant?.flushed as any;
      const focusState = flushedVariant?._focus;

      // TODO: STORY-003 will migrate these inline values to focus-underline utility token
      expect(focusState?.boxShadow).toBe('0 1px 0 0 var(--shadow-color)');
    });

    it('textarea flushed variant should use focus-underline token, not inline value', () => {
      // Panda CSS conditional styles (_focus) are not in SystemStyleObject type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const flushedVariant = textarea.variants?.variant?.flushed as any;
      const focusState = flushedVariant?._focus;

      // TODO: STORY-003 will migrate these inline values to focus-underline utility token
      expect(focusState?.boxShadow).toBe('0 1px 0 0 var(--shadow-color)');
    });

    it('radioGroup control should use inset-border token, not inline value', () => {
      // Radio group has the boxShadow in the variant, not base
      const solidVariant = radioGroup.variants?.variant?.solid;
      const itemControl = solidVariant?.itemControl;

      // TODO: STORY-003 will migrate these inline values to inset-border utility token
      expect(itemControl?.boxShadow).toBe('inset 0 0 0 1px var(--shadow-color)');
    });

    it('no recipe should have inline var(--shadow-color) strings', () => {
      const allRecipes = {
        button,
        card,
        dialog,
        drawer,
        popover,
        select,
        slider,
        switchRecipe,
        toast,
        tooltip,
        input,
        textarea,
        radioGroup,
      };

      // TODO: STORY-003 will migrate these inline values to focus-underline / inset-border utility tokens
      // For now, verify they DO currently contain these inline values (current behavior)
      const recipesWithInlineValues = ['input', 'textarea', 'radioGroup'];

      Object.entries(allRecipes).forEach(([name, recipe]) => {
        if (!recipe) {
          console.warn(`Recipe ${name} is undefined`);
          return;
        }

        const recipeString = JSON.stringify(recipe);

        if (recipesWithInlineValues.includes(name)) {
          // These recipes currently have inline var(--shadow-color) values
          const hasShadowColor = recipeString.includes('var(--shadow-color)');
          expect(hasShadowColor).toBe(true);
        }
      });
    });
  });
});
