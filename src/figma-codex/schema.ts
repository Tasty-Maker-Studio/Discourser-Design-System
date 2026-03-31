// src/figma-codex/schema.ts

export interface FigmaCodex {
  /** Schema version for forward compatibility */
  version: '1.0.0';

  /** Package name of the design system */
  packageName: string;

  /** ISO timestamp of generation */
  generatedAt: string;

  /** Git commit hash (if available) */
  gitHash?: string;

  /** Source Figma file(s) referenced */
  figmaFiles: Record<
    string,
    {
      fileKey: string;
      fileName?: string;
    }
  >;

  /** The component registry */
  components: Record<string, ComponentEntry>;
}

export interface ComponentTokens {
  recipe?: string;
  variantProps?: string[];
  figmaPropToRecipeProp?: Record<string, string>;
}

export interface ComponentEntry {
  /** Human-readable component name */
  name: string;

  /** Component type classification */
  type: 'simple' | 'compound' | 'composite';

  /** Figma reference */
  figma: {
    fileKey: string;
    nodeId: string;
    nodeName?: string;
    url: string;
  };

  /** Import information */
  imports: {
    /** Primary import statement */
    primary: string;
    /** Named exports available */
    namedExports: string[];
    /** Package subpath, e.g. '@discourser/design-system/Breadcrumb' */
    subpath?: string;
  };

  /** Prop interface (extracted from TypeScript source) */
  props: PropDefinition[];

  /** Sub-components for compound components */
  subComponents?: SubComponentEntry[];

  /** Example JSX from .figma.tsx */
  example: string;

  /** Source file path relative to project root */
  sourcePath: string;

  /** Token mappings parsed from @dds-tokens JSDoc block */
  tokens?: ComponentTokens;
}

export interface PropDefinition {
  name: string;
  type: string; // TypeScript type as string
  required: boolean;
  description?: string; // JSDoc comment if available
  defaultValue?: string;
}

export interface SubComponentEntry {
  name: string; // e.g. 'Root', 'Header', 'Title'
  element: string; // underlying HTML element, e.g. 'div', 'h2', 'nav'
  description?: string;
}
