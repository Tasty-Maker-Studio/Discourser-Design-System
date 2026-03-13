---
'@discourser/design-system': patch
---

Fix textStyle font-family token reference in transform.ts — fontFamily now emits {fonts.display} reference instead of bare string, ensuring correct CSS variable resolution in generated stylesheets
