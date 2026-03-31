---
'@discourser/design-system': patch
---

Fix figma-codex resolver: populate props and subComponents for RadioGroup, Switch, and Slider

- extractSubComponents: add patterns for withContext(Namespace.Sub, 'slot') and createStyledComponent(Namespace.Sub, 'slot') alongside existing ark factory pattern; also handle forwardRef<HTMLXxxElement> exports
- extractProps: when no interface block is found, fall back to parsing the Key props section from the .figma.tsx JSDoc comment block
