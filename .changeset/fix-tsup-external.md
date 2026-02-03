---
'@discourser/design-system': patch
---

Fix build configuration for npm package consumption by adding styled-system to external array in tsup config. This prevents bundling of Panda CSS generated imports and resolves "Could not resolve styled-system/\*" errors.
