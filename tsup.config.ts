import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'preset/index': 'src/preset/index.ts',
    'components/index': 'src/components/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: false, // Disable tsup's DTS generation - use tsc instead
  splitting: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    /^styled-system/, // Keep Panda CSS generated imports as external
  ],
  treeshake: true,
  minify: false,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
});
