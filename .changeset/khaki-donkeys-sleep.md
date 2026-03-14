---
'@discourser/design-system': patch
---

Fix token pipeline round-trip: normalize semantic key casing (onPrimary not onprimary)
and alias palette references (neutralVariant not neutralvariant) in organize-figma-exports.ts.
Fix FTS plugin handleImport() to unwrap collection wrappers and $value objects for correct
Figma variable creation. Add token name mapping docs to published package files.
