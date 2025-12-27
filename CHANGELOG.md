# @discourser/design-system

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
