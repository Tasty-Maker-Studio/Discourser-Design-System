// Type declarations for jest-axe with Vitest
declare module 'jest-axe' {
  import type { AxeResults, RunOptions, Spec } from 'axe-core';

  export function axe(
    html: Element | string,
    options?: RunOptions & { globalOptions?: Spec }
  ): Promise<AxeResults>;

  export const toHaveNoViolations: {
    toHaveNoViolations(results: AxeResults): { pass: boolean; message(): string };
  };

  export function configureAxe(
    options?: RunOptions & { globalOptions?: Spec }
  ): typeof axe;
}
