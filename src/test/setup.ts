import '@testing-library/jest-dom/vitest';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

// Extend Vitest's expect with jest-axe matchers
expect.extend(toHaveNoViolations);

// Mock ResizeObserver — JSDOM does not implement it, but @zag-js components
// (tabs, accordion, etc.) require it to measure content dimensions.
// The mock calls back immediately on observe() so that accordion content panels
// receive their height measurement and remove their `hidden` attribute, making
// links/content accessible to RTL after a click interaction.
// Guard for Node.js environment (e.g. figma-codex tests with @vitest-environment node)
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: class ResizeObserver {
      private callback: (entries: object[], observer: object) => void;
      constructor(callback: (entries: object[], observer: object) => void) {
        this.callback = callback;
      }
      observe(target: Element) {
        // Call back synchronously with a mock entry so zag-js state machines
        // receive content dimensions and proceed to unhide animated content.
        this.callback(
          [{ contentRect: target.getBoundingClientRect(), target }],
          this,
        );
      }
      unobserve() {}
      disconnect() {}
    },
  });
}

// Cleanup after each test
afterEach(() => {
  cleanup();
});
