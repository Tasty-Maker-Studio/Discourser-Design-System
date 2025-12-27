/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';

// jest-axe types for Vitest
interface AxeMatchers<R = void> {
  toHaveNoViolations(): R;
}

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends AxeMatchers<T> {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

// Declare jest-axe module since it doesn't have proper TS types for Vitest
declare module 'jest-axe' {
  import type { AxeResults, RunOptions, Spec } from 'axe-core';
  
  export function axe(
    html: Element | string,
    options?: RunOptions & { globalOptions?: Spec }
  ): Promise<AxeResults>;
  
  export const toHaveNoViolations: {
    toHaveNoViolations(results: AxeResults): { pass: boolean; message(): string };
  };
  
  export function configureAxe(options?: RunOptions & { globalOptions?: Spec }): typeof axe;
}
