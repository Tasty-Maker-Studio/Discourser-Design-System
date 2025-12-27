---
"@discourser/design-system": patch
---

Fix: Remove dist/ from git tracking to ensure fresh builds in CI

Previously, stale dist/ files were committed causing published packages to have old builds. Now dist/ is generated fresh during each CI build, ensuring the packaging fix (rewritten styled-system imports) is actually published.
