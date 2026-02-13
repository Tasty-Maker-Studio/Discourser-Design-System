---
'@discourser/design-system': patch
---

Fix Figma Translation documentation and cross-references

- Fixed 16 incorrect cross-reference URLs in translation documentation files
  - Removed incorrect "design-tokens" path segment from Guidelines links
  - URLs now correctly match Storybook Meta title format
- Added 37 missing Guidelines documentation files to repository
  - Updated .gitignore to include stories/documentation/guidelines/
  - Files were previously ignored, causing cross-reference integrity test failures
- All cross-reference integrity tests now pass (57 broken links → 0)
