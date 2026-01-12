# @discourser/design-system

## 0.3.1

### Patch Changes

- [#33](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/33) [`2e89d11`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/2e89d11712b2895b2554ed185c19f17394b0b241) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Add guidelines folder to published npm package for Figma Make integration
  - Include comprehensive design system guidelines in npm package
  - Enable Figma Make to access component and token documentation
  - Support AI-powered design generation with embedded guidelines

## 0.3.0

### Minor Changes

- [#31](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/31) [`63c8c95`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/63c8c95904fe5194dc694051462148dd8f75fdf6) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Add comprehensive token management and transformation scripts
  - Add design language transformation scripts (DTCG to/from contract)
  - Add Figma token export and organization scripts
  - Add token backup, comparison, and round-trip testing utilities
  - Update and complete task documentation (DS-003, DS-004, DS-004.5, DS-005)
  - Fix multiple component styling issues (Drawer, Dialog, Popover, Tooltip, etc.)
  - Add token directory structure with primitives and semantic tokens
  - Improve Material Design 3 integration and type safety in scripts

## 0.2.2

### Patch Changes

- [#25](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/25) [`693dbda`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/693dbda4ed0239d88d03a6e89b4a33c677bf1e1a) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Add Badge component stories and development workflow protections
  - Add comprehensive Badge.stories.tsx with all variants, sizes, and color palettes
  - Add CODEOWNERS to require approval for critical files (.github/workflows/, package.json, etc.)
  - Add pre-commit hooks with husky and lint-staged for automatic linting, formatting, and type checking
  - Add RELEASE_PROCESS.md documentation
  - Add warning comments to release.yml to prevent accidental modifications

  These protections ensure developers working on components won't accidentally modify the carefully debugged release workflow.

## 0.2.1

### Patch Changes

- [#16](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/16) [`3abcfbd`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/3abcfbdd3e798e51baa41ab860329a1ba890250f) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Add comprehensive design system documentation and Storybook integration
  - Add complete design system guidelines (12 files) for Figma Make AI
  - Add Figma Make template creation documentation (9 guides)
  - Add auto-generation script to sync markdown docs to Storybook
  - Add Storybook documentation pages and configuration
  - Fix MDX2 syntax errors in documentation (self-closing br tags)
  - Remove duplicate story files
  - Update npm OIDC publishing skill documentation

## 0.1.7

### Patch Changes

- [#13](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/13) [`d610805`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/d6108055ddb43acc2f42e9ddce308caac3e6bc68) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Republish to ensure packaging fix reaches npm (0.1.4 was published before fix was merged)

## 0.1.6

### Patch Changes

- [#11](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/11) [`75de3a1`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/75de3a12a21ed5bc63608103d24311a8a8eb6c7b) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Fix: Remove dist/ from git tracking to ensure fresh builds in CI

  Previously, stale dist/ files were committed causing published packages to have old builds. Now dist/ is generated fresh during each CI build, ensuring the packaging fix (rewritten styled-system imports) is actually published.

## 0.1.5

### Patch Changes

- [#8](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/8) [`a738842`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/a7388423ac2975af1afc8f67b53e9ce858e4b442) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Republish to ensure packaging fix reaches npm (0.1.4 was published before fix was merged)

## 0.1.4

### Patch Changes

- [#6](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/6) [`710a420`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/710a420499dd4d8a7e5800830d40e2c31df287dc) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Fix critical packaging issue: Rewrite styled-system imports to package-relative paths

  Components were importing from 'styled-system/recipes' which couldn't be resolved by consuming applications. Added esbuild plugin to tsup that rewrites these to '@discourser/design-system/styled-system/recipes' during build, ensuring compatibility with all bundlers (Vite, Webpack, etc.) without requiring special configuration.

## 0.1.3

### Patch Changes

- [#4](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/pull/4) [`35dcc99`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/35dcc99cf8b5d613807fa18806da9f8ddb80822a) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - Test: Validate complete release pipeline with automated versioning and npm publishing via OIDC

## 0.1.1

### Patch Changes

- [`006455d`](https://github.com/Tasty-Maker-Studio/Discourser-Design-System/commit/006455d78c7d663459564f7bc937873024cff90c) Thanks [@willTastyMakers](https://github.com/willTastyMakers)! - updating CI/CD workflow

## Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
