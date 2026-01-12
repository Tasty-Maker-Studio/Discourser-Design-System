#!/usr/bin/env tsx
/**
 * Generate Storybook MDX files from markdown documentation
 *
 * This script converts:
 * - guidelines/*.md → stories/documentation/guidelines/*.mdx
 * - docs/figma-make-docs/*.md → stories/documentation/figma-make/*.mdx
 * - .claude/skills/*.md → stories/documentation/skills/*.mdx
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

interface DocConfig {
  sourceDir: string;
  targetDir: string;
  titlePrefix: string;
  description: string;
}

const configs: DocConfig[] = [
  {
    sourceDir: 'guidelines',
    targetDir: 'stories/documentation/guidelines',
    titlePrefix: 'Documentation/Guidelines',
    description: 'Design system guidelines for components and tokens',
  },
  {
    sourceDir: 'docs/figma-make-docs',
    targetDir: 'stories/documentation/figma-make',
    titlePrefix: 'Documentation/Figma Make',
    description: 'Complete guide for creating Figma Make templates',
  },
  {
    sourceDir: '.claude/skills',
    targetDir: 'stories/documentation/skills',
    titlePrefix: 'Documentation/Claude Skills',
    description: 'Context engineering for Claude Code',
  },
];

/**
 * Convert a markdown file to Storybook MDX format
 */
function convertToMDX(
  mdContent: string,
  title: string,
  _description: string,
): string {
  // Remove any existing frontmatter
  const contentWithoutFrontmatter = mdContent.replace(/^---[\s\S]*?---\n/, '');

  return `import { Meta } from '@storybook/blocks';

<Meta title="${title}" />

${contentWithoutFrontmatter}
`;
}

/**
 * Get a clean title from filename
 */
function getTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.mdx?$/, '')
    .replace(/^\d+-/, '') // Remove number prefix
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Process a single markdown file
 */
function processFile(
  sourcePath: string,
  targetPath: string,
  titlePrefix: string,
  description: string,
  _sourceBaseDir: string,
): void {
  const mdContent = fs.readFileSync(sourcePath, 'utf-8');
  const filename = path.basename(sourcePath);
  let title = getTitleFromFilename(filename);

  // For nested files named "SKILL.md", use parent directory name instead
  if (
    filename.toLowerCase() === 'skill.md' ||
    filename.toLowerCase() === 'skill.mdx'
  ) {
    const parentDir = path.basename(path.dirname(sourcePath));
    title = getTitleFromFilename(parentDir);
  }

  // Determine order prefix for consistent sorting
  const orderMatch = filename.match(/^(\d+)-/);
  const order = orderMatch ? orderMatch[1] : '99';

  const fullTitle = `${titlePrefix}/${order}-${title}`;
  const mdxContent = convertToMDX(mdContent, fullTitle, description);

  // Ensure target directory exists
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Write MDX file
  const mdxPath = targetPath.replace(/\.md$/, '.mdx');
  fs.writeFileSync(mdxPath, mdxContent, 'utf-8');

  console.log(`✓ Generated: ${mdxPath}`);
}

/**
 * Process all markdown files in a directory
 */
function processDirectory(config: DocConfig): void {
  const sourceDir = path.resolve(rootDir, config.sourceDir);
  const targetDir = path.resolve(rootDir, config.targetDir);

  console.log(`\nProcessing: ${config.sourceDir}`);
  console.log(`Target: ${config.targetDir}`);

  if (!fs.existsSync(sourceDir)) {
    console.warn(`⚠ Source directory not found: ${sourceDir}`);
    return;
  }

  // Clear target directory
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true });
  }
  fs.mkdirSync(targetDir, { recursive: true });

  // Process all markdown files
  function processDir(dir: string, relativePrefix = ''): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(dir, entry.name);
      const relativePath = path.join(relativePrefix, entry.name);
      const targetPath = path.join(targetDir, relativePath);

      if (entry.isDirectory()) {
        // Create subdirectory and process recursively
        const subTargetDir = targetPath;
        if (!fs.existsSync(subTargetDir)) {
          fs.mkdirSync(subTargetDir, { recursive: true });
        }
        processDir(sourcePath, relativePath);
      } else if (entry.name.endsWith('.md')) {
        processFile(
          sourcePath,
          targetPath,
          config.titlePrefix,
          config.description,
          sourceDir,
        );
      }
    }
  }

  processDir(sourceDir);
}

/**
 * Main execution
 */
function main(): void {
  console.log('🚀 Generating Storybook documentation...\n');

  for (const config of configs) {
    processDirectory(config);
  }

  console.log('\n✅ Documentation generation complete!');
  console.log('\nRun `pnpm dev` to see the documentation in Storybook.');
}

main();
