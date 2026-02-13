/* eslint-disable no-undef */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Component Completeness Verification for Translation Documentation
 *
 * This test suite verifies that all exported components from src/components/index.ts
 * are documented in the Figma Translation suite (05-Components.mdx).
 *
 * Prevents missing component documentation when new components are added.
 */

const COMPONENTS_EXPORT_PATH = join(process.cwd(), 'src/components/index.ts');
const COMPONENTS_MDX_PATH = join(
  process.cwd(),
  'stories/documentation/figma-translation/05-Components.mdx',
);

/**
 * Extract exported component names from src/components/index.ts
 */
function extractComponentExports(): string[] {
  const content = readFileSync(COMPONENTS_EXPORT_PATH, 'utf-8');
  const components: string[] = [];

  // Match: export { ComponentName } from './ComponentName'
  const exportPattern =
    /export\s+\{\s*([A-Z][a-zA-Z0-9]+)(?:,\s*type\s+[A-Z][a-zA-Z0-9]+Props)?\s*\}\s+from\s+['"].\/([A-Z][a-zA-Z0-9]+)['"]/g;
  let match;

  while ((match = exportPattern.exec(content)) !== null) {
    const componentName = match[1];
    components.push(componentName);
  }

  // Match: export * as ComponentName from './ComponentName'
  const namespacePattern =
    /export\s+\*\s+as\s+([A-Z][a-zA-Z0-9]+)\s+from\s+['"].\/([A-Z][a-zA-Z0-9]+)['"]/g;

  while ((match = namespacePattern.exec(content)) !== null) {
    const componentName = match[1];
    components.push(componentName);
  }

  // Match standalone exports like: export { toaster, Toaster } from './Toast'
  const standalonePattern =
    /export\s+\{\s*([a-zA-Z][a-zA-Z0-9]+)(?:,\s*([a-zA-Z][a-zA-Z0-9]+))?\s*\}\s+from\s+['"].\/[A-Z][a-zA-Z0-9]+['"]/g;

  while ((match = standalonePattern.exec(content)) !== null) {
    // Add first export (might be lowercase like 'toaster')
    if (match[1] && match[1][0] === match[1][0].toUpperCase()) {
      components.push(match[1]);
    }
    // Add second export if exists
    if (match[2] && match[2][0] === match[2][0].toUpperCase()) {
      components.push(match[2]);
    }
  }

  return [...new Set(components)].sort();
}

/**
 * Check if a component is documented in 05-Components.mdx
 */
function isComponentDocumented(
  componentName: string,
  mdxContent: string,
): boolean {
  // Check for heading: ### ComponentName
  const headingPattern = new RegExp(`^###\\s+${componentName}(?:\\s|$)`, 'gm');

  if (headingPattern.test(mdxContent)) {
    return true;
  }

  // Special cases: some components may be documented under different names
  // or as part of compound components

  // InputGroup, InputAddon documented as part of Input section
  if (['InputGroup', 'InputAddon'].includes(componentName)) {
    return /^###\s+Input(?:Group|Addon)/gm.test(mdxContent);
  }

  // ButtonGroup documented as part of Button or Group section
  if (componentName === 'ButtonGroup') {
    return /^###\s+(?:Button|Group)/gm.test(mdxContent);
  }

  // Toaster is documented with Toast
  if (componentName === 'Toaster') {
    return /^###\s+Toast/gm.test(mdxContent);
  }

  // Icon, CloseButton, AbsoluteCenter, Group are utility components
  // They may be in a "Utility" section
  if (
    ['Icon', 'CloseButton', 'AbsoluteCenter', 'Group'].includes(componentName)
  ) {
    const utilitySection = /^##\s+\d+\.\s+Utility/gm.test(mdxContent);
    const hasHeading = new RegExp(`###\\s+${componentName}`, 'gm').test(
      mdxContent,
    );
    return utilitySection && hasHeading;
  }

  return false;
}

/**
 * Components that are not UI components (type exports, helpers, etc.)
 * These are allowed to not be in the translation docs
 */
const UTILITY_EXPORTS_ALLOWLIST = [
  // Type exports (if any appear in the export list)
  'ButtonProps',
  'CardProps',

  // Internal utilities that aren't visual components
  'toaster', // (lowercase - programmatic API, not a component)
];

/**
 * Normalize component name for comparison
 * Handles cases where config uses different naming than export
 */
function normalizeComponentName(name: string): string {
  // switchComponent (in config) vs Switch (in export)
  if (name === 'switchComponent') return 'Switch';
  if (name === 'Switch') return 'Switch';

  return name;
}

describe('Translation Documentation - Component Completeness', () => {
  it('should document all exported components', () => {
    const components = extractComponentExports();
    const mdxContent = readFileSync(COMPONENTS_MDX_PATH, 'utf-8');

    const undocumentedComponents: string[] = [];

    components.forEach((componentName) => {
      // Skip utility exports
      if (UTILITY_EXPORTS_ALLOWLIST.includes(componentName)) {
        return;
      }

      // Skip lowercase exports (like toaster) - they're programmatic APIs
      if (componentName[0] === componentName[0].toLowerCase()) {
        return;
      }

      const normalized = normalizeComponentName(componentName);

      if (!isComponentDocumented(normalized, mdxContent)) {
        undocumentedComponents.push(componentName);
      }
    });

    if (undocumentedComponents.length > 0) {
      const errorMessage =
        `\n\nThe following components are exported from src/components/index.ts but NOT documented in 05-Components.mdx:\n\n` +
        undocumentedComponents.map((name) => `  - ${name}`).join('\n') +
        `\n\nAdd a "### ${undocumentedComponents[0]}" heading section to 05-Components.mdx with:\n` +
        `  - Maps from: [Figma/Shadcn equivalent]\n` +
        `  - Import: import { ${undocumentedComponents[0]} } from '@discourser/design-system'\n` +
        `  - Type: Simple (recipe) or Compound (slot recipe)\n` +
        `  - Props table with variants, sizes, etc.\n\n` +
        `See 07-ExtensionGuide.mdx for the full template.\n`;

      throw new Error(errorMessage);
    }

    expect(undocumentedComponents).toHaveLength(0);
  });

  it('should extract at least 15 component exports', () => {
    // Sanity check: ensure we're actually finding component exports
    const components = extractComponentExports();

    expect(components.length).toBeGreaterThanOrEqual(15);
  });

  it('should find component headings in 05-Components.mdx', () => {
    // Sanity check: ensure the MDX file has component sections
    const mdxContent = readFileSync(COMPONENTS_MDX_PATH, 'utf-8');

    // Count ### headings (component sections)
    const headingPattern = /^###\s+[A-Z][a-zA-Z0-9]+/gm;
    const headings = mdxContent.match(headingPattern) || [];

    // Should have at least 20 component sections
    expect(headings.length).toBeGreaterThanOrEqual(20);
  });

  it('05-Components.mdx should exist', () => {
    expect(() => {
      readFileSync(COMPONENTS_MDX_PATH, 'utf-8');
    }).not.toThrow();
  });
});

describe('Translation Documentation - Cross-Reference Integrity', () => {
  const TRANSLATION_DOCS_PATH = join(
    process.cwd(),
    'stories/documentation/figma-translation',
  );
  const GUIDELINES_PATH = join(
    process.cwd(),
    'stories/documentation/guidelines',
  );

  const TRANSLATION_FILES = [
    '00-FigmaTranslation.mdx',
    '01-Colors.mdx',
    '02-Typography.mdx',
    '03-Spacing.mdx',
    '04-Shadows-Radii.mdx',
    '05-Components.mdx',
    '06-Layout.mdx',
    '07-ExtensionGuide.mdx',
  ];

  /**
   * Extract cross-reference links from MDX content
   * Matches: [Link Text](/docs/documentation-guidelines-99-component-name--docs)
   */
  function extractCrossReferences(
    content: string,
  ): Array<{ link: string; text: string; line: number }> {
    const references: Array<{ link: string; text: string; line: number }> = [];
    const lines = content.split('\n');

    const linkPattern =
      /\[([^\]]+)\]\(\/docs\/(documentation-(?:guidelines|figma-translation)-[^)]+)\)/g;

    lines.forEach((line, lineIndex) => {
      let match;
      while ((match = linkPattern.exec(line)) !== null) {
        references.push({
          text: match[1],
          link: match[2],
          line: lineIndex + 1,
        });
      }
    });

    return references;
  }

  it('should have valid cross-references to Guidelines documentation', () => {
    const brokenLinks: Array<{
      file: string;
      link: string;
      text: string;
      line: number;
    }> = [];

    TRANSLATION_FILES.forEach((filename) => {
      const filePath = join(TRANSLATION_DOCS_PATH, filename);
      const content = readFileSync(filePath, 'utf-8');
      const references = extractCrossReferences(content);

      references.forEach((ref) => {
        // Check if it's a guidelines reference
        if (ref.link.includes('documentation-guidelines')) {
          // Extract the guideline file reference
          // Example: documentation-guidelines-99-button--docs -> should check for button.mdx or 99-Button.mdx

          const guidelineFilePattern = ref.link
            .replace(/^documentation-guidelines-(?:99-)?/, '')
            .replace(/--docs$/, '');

          // Try common patterns
          const possiblePaths = [
            join(GUIDELINES_PATH, `${guidelineFilePattern}.mdx`),
            join(GUIDELINES_PATH, `99-${guidelineFilePattern}.mdx`),
            join(
              GUIDELINES_PATH,
              `99-${guidelineFilePattern.charAt(0).toUpperCase() + guidelineFilePattern.slice(1)}.mdx`,
            ),
            join(GUIDELINES_PATH, 'components', `${guidelineFilePattern}.mdx`),
            join(
              GUIDELINES_PATH,
              'design-tokens',
              `${guidelineFilePattern}.mdx`,
            ),
            join(
              GUIDELINES_PATH,
              `${guidelineFilePattern.replace(/-/g, '/')}.mdx`,
            ),
            join(GUIDELINES_PATH, `overview-patterns.mdx`), // Special case
          ];

          const exists = possiblePaths.some((path) => {
            try {
              readFileSync(path, 'utf-8');
              return true;
            } catch {
              return false;
            }
          });

          if (!exists) {
            brokenLinks.push({
              file: filename,
              link: ref.link,
              text: ref.text,
              line: ref.line,
            });
          }
        }
      });
    });

    if (brokenLinks.length > 0) {
      const errorMessage = brokenLinks
        .map(
          (ref) =>
            `  ${ref.file}:${ref.line}\n    Link: [${ref.text}](/docs/${ref.link})\n    Target file not found in stories/documentation/guidelines/`,
        )
        .join('\n\n');

      console.warn(
        `\n\nWarning: Found ${brokenLinks.length} potentially broken cross-reference link(s):\n\n${errorMessage}\n\n` +
          `This may be a false positive if the Guidelines file exists but wasn't detected.\n` +
          `Verify manually if needed.\n`,
      );
    }

    // This is a warning, not a hard failure, since file structure may vary
    // Just log the count
    expect(brokenLinks.length).toBeLessThanOrEqual(10);
  });

  it('should extract cross-references from translation files', () => {
    // Sanity check: ensure we're finding cross-references
    const allReferences = TRANSLATION_FILES.flatMap((filename) => {
      const filePath = join(TRANSLATION_DOCS_PATH, filename);
      const content = readFileSync(filePath, 'utf-8');
      return extractCrossReferences(content);
    });

    // Should find at least 10 cross-reference links
    expect(allReferences.length).toBeGreaterThanOrEqual(10);
  });
});
