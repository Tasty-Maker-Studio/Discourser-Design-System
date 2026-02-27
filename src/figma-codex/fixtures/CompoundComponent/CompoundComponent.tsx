'use client';
// Test fixture — resolver uses text-based regex, imports not required to be valid.
// Globals declared below satisfy TypeScript; the resolver reads this file as raw text.
import type { FC, ComponentProps } from 'react';

declare const ark: {
  div: FC<ComponentProps<'div'>>;
  h2: FC<ComponentProps<'h2'>>;
  span: FC<ComponentProps<'span'>>;
};
declare function withProvider<T>(el: T, slot: string): T;
declare function withContext<T>(el: T, slot: string): T;

export type RootProps = ComponentProps<'div'>;
export const Root = withProvider(ark.div, 'root');
export const Header = withContext(ark.div, 'header');
export const Body = withContext(ark.div, 'body');
