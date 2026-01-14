---
"@discourser/design-system": patch
---

fix: add missing package exports for styled-system/jsx and styled-system/patterns

The package's compiled code imports from these paths internally, but they were not
exposed in the exports field of package.json. This caused build errors in consuming
projects:

```
Missing "./styled-system/jsx" specifier in "@discourser/design-system" package
```

Added exports for:
- `./styled-system/jsx`
- `./styled-system/patterns`

These exports enable consumers to import from these paths and resolve the build errors
when using the package in projects with strict module resolution.
