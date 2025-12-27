import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
  },
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', /^styled-system/],
  treeshake: true,
  minify: false,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
});
