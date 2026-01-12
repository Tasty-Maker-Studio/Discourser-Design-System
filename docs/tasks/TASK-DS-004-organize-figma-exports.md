# TASK-DS-004: Create Token Organization Script

**Date:** January 10, 2026
**Completed:** January 10, 2026
**Estimated Time:** 1-2 hours
**Actual Time:** ~2 hours
**Priority:** P1 - Required for clean token workflow
**Status:** ✅ Complete

---

## Objective

Create a manual script to organize exported tokens from figma-token-sync into the proper file structure for Discourser-Design-System, eliminating the need for auto-watching mechanisms.

---

## Context

### Current State (After Round-Trip Test)

**figma-token-sync exports:**
```
Downloads/
├── primitives-colors.json    (78 tokens)
└── semantic-colors.json      (68 tokens)
```

**Discourser-Design-System has:**
```
tokens/
├── tokens.json                     (combined - 146 tokens)
├── primitives-generated.json       (reference)
├── semantic-light-generated.json   (reference)
└── semantic-dark-generated.json    (reference)
```

### Problem

No automated way to:
1. Move downloaded files into project
2. Split semantic-colors.json into light/dark
3. Organize into proper directory structure
4. Update material3.language.ts

### Solution

Manual script (NOT auto-watch):
```bash
npm run organize-tokens
```

---

## Requirements

### Script: `scripts/organize-figma-exports.ts`

**Input:** User provides path to downloaded files
**Output:** Organized tokens in proper structure
**Execution:** Manual - user runs after Figma export

### Functionality

1. **Prompt for file locations**
   ```bash
   $ npm run organize-tokens

   📥 Figma Token Organizer

   Where are your exported files?
   Primitives file: [Browse or paste path]
   Semantic file: [Browse or paste path]
   ```

2. **Validate files**
   - Check files exist
   - Parse JSON (ensure valid)
   - Count tokens
   - Show preview

3. **Split semantic by mode**
   - Extract light mode values → semantic-light-generated.json
   - Extract dark mode values → semantic-dark-generated.json
   - Handle missing modes gracefully

4. **Move files to correct locations**
   ```
   tokens/
   ├── primitives-generated.json      ← from primitives-colors.json
   ├── semantic-light-generated.json  ← from semantic-colors (light mode)
   └── semantic-dark-generated.json   ← from semantic-colors (dark mode)
   ```

5. **Create backup**
   - Backup existing files to `tokens/backup-[timestamp]/`
   - Keep last 5 backups, delete older

6. **Generate combined tokens.json**
   - Merge primitives + semantic-light + semantic-dark
   - Use format expected by current scripts
   - Preserve Figma metadata ($extensions)

7. **Summary report**
   ```bash
   ✅ Organization complete!

   📊 Summary:
   • Primitives: 78 tokens
   • Semantic (light): 31 tokens
   • Semantic (dark): 31 tokens
   • Total: 146 tokens

   📂 Files updated:
   ✓ tokens/primitives-generated.json
   ✓ tokens/semantic-light-generated.json
   ✓ tokens/semantic-dark-generated.json
   ✓ tokens/tokens.json

   💾 Backup saved: tokens/backup-20260110-143022/

   Next steps:
   1. Review changes: git diff tokens/
   2. Test build: npm run build:panda
   3. Commit changes: git add tokens/ && git commit
   ```

---

## Implementation Details

### File Structure

```typescript
// scripts/organize-figma-exports.ts

interface FigmaExportConfig {
  primitivesPath: string;
  semanticPath: string;
  outputDir: string;
}

async function organizeFigmaExports() {
  // 1. Prompt for file paths
  const config = await promptForFiles();

  // 2. Validate and parse
  const primitives = await validateAndParse(config.primitivesPath);
  const semantic = await validateAndParse(config.semanticPath);

  // 3. Backup existing
  await createBackup(config.outputDir);

  // 4. Split semantic by mode
  const { light, dark } = splitSemanticModes(semantic);

  // 5. Write organized files
  await writeTokenFiles({
    primitives,
    semanticLight: light,
    semanticDark: dark
  }, config.outputDir);

  // 6. Generate combined tokens.json
  await generateCombinedTokens(config.outputDir);

  // 7. Show summary
  showSummary(primitives, light, dark);
}
```

### Semantic Mode Splitting

```typescript
// Handle both formats:
// 1. Figma plugin format (separate files already)
// 2. Combined format with mode data

function splitSemanticModes(semantic: any): { light: any, dark: any } {
  const light: any = {};
  const dark: any = {};

  for (const [tokenName, tokenData] of Object.entries(semantic)) {
    // Check if token has mode data in $extensions
    if (tokenData.$extensions?.['com.figma']?.modes) {
      // Has explicit mode data
      const modes = tokenData.$extensions['com.figma'].modes;
      light[tokenName] = { ...tokenData, $value: modes.light };
      dark[tokenName] = { ...tokenData, $value: modes.dark };
    } else if (tokenName.startsWith('dark-')) {
      // Dark mode token (prefixed)
      const baseName = tokenName.replace('dark-', '');
      dark[baseName] = tokenData;
    } else {
      // Assume light mode
      light[tokenName] = tokenData;
    }
  }

  return { light, dark };
}
```

### Interactive Prompts

```typescript
import inquirer from 'inquirer';

async function promptForFiles(): Promise<FigmaExportConfig> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'primitivesPath',
      message: 'Path to primitives-colors.json:',
      default: '~/Downloads/primitives-colors.json',
      validate: (path: string) => {
        if (fs.existsSync(expandPath(path))) return true;
        return 'File not found. Please check the path.';
      }
    },
    {
      type: 'input',
      name: 'semanticPath',
      message: 'Path to semantic-colors.json:',
      default: '~/Downloads/semantic-colors.json',
      validate: (path: string) => {
        if (fs.existsSync(expandPath(path))) return true;
        return 'File not found. Please check the path.';
      }
    }
  ]);

  return {
    primitivesPath: expandPath(answers.primitivesPath),
    semanticPath: expandPath(answers.semanticPath),
    outputDir: path.join(__dirname, '..', 'tokens')
  };
}
```

---

## Package.json Scripts

```json
{
  "scripts": {
    "organize-tokens": "tsx scripts/organize-figma-exports.ts",
    "organize-tokens:help": "tsx scripts/organize-figma-exports.ts --help"
  }
}
```

---

## Dependencies to Add

```json
{
  "devDependencies": {
    "inquirer": "^9.2.12",
    "@types/inquirer": "^9.0.7"
  }
}
```

---

## Testing Plan

### Test Case 1: Basic Organization
```bash
# Given: Downloaded files in ~/Downloads
# When: npm run organize-tokens
# Then: Files moved to tokens/ with proper naming
```

### Test Case 2: Backup Creation
```bash
# Given: Existing token files
# When: npm run organize-tokens
# Then: Old files backed up before overwrite
```

### Test Case 3: Mode Splitting
```bash
# Given: semantic-colors.json with dark- prefixed tokens
# When: Split is performed
# Then: Separate light/dark files created correctly
```

### Test Case 4: Invalid Path
```bash
# Given: Wrong file path provided
# When: Validation runs
# Then: Clear error message, prompt again
```

### Test Case 5: Missing Dark Mode
```bash
# Given: Only light mode tokens in semantic
# When: Split is performed
# Then: Empty dark file created (or skipped with warning)
```

---

## Documentation Updates

### Add to README.md

```markdown
## Token Workflow

### After Exporting from Figma

1. **Export from Figma**
   - Run figma-token-sync plugin → Export
   - Save files to Downloads (or remember location)

2. **Organize tokens**
   ```bash
   npm run organize-tokens
   ```
   - Provide paths when prompted
   - Review summary

3. **Rebuild design system**
   ```bash
   npm run build:panda
   ```

4. **Test in Storybook**
   ```bash
   npm run dev
   ```

5. **Commit changes**
   ```bash
   git add tokens/
   git commit -m "chore: update tokens from Figma"
   ```
```

---

## Success Criteria

**Script is complete when:**

1. ✅ User can run `npm run organize-tokens` from command line
2. ✅ Interactive prompts guide user through process
3. ✅ Files are validated before processing
4. ✅ Semantic tokens split into light/dark correctly
5. ✅ Backups created automatically
6. ✅ Combined tokens.json generated
7. ✅ Clear summary report shown
8. ✅ Error handling for common issues
9. ✅ Documentation updated in README
10. ✅ Tested with real Figma export files

---

## Non-Goals (Out of Scope)

❌ **Auto-watch/file watching** - Manual execution only
❌ **Git automation** - User commits manually
❌ **Figma API integration** - Works with downloaded files only
❌ **Cloud sync** - Local files only
❌ **Multi-language support** - Material 3 only (V3 handles this)

---

## Follow-Up Tasks

After this task:
1. Update round-trip test to use new script
2. Document in ARCHITECTURE.md
3. Add to CI/CD if needed
4. Create video tutorial for team

---

## Notes

- **Why not auto-watch?** Too resource-intensive, would slow down dev environment
- **Why manual?** Token updates are infrequent, manual is fine
- **Future:** V3 will enhance this with multi-language support

---

## Completion Summary

**Completed:** January 10, 2026

### What Was Delivered

✅ **Script:** `scripts/organize-figma-exports.ts` (11,834 bytes)
- Interactive prompts using inquirer
- File validation and parsing
- Semantic mode splitting (light/dark)
- Automatic backup creation (keeps last 5)
- Combined tokens.json generation with slash notation
- Summary report with token counts

✅ **Package Script:** `pnpm organize-tokens`

✅ **Documentation:** Updated README.md with token workflow section

✅ **Metadata Support:**
- Script reads package.json name/version
- Adds `$metadata` to tokens.json
- figma-token-sync plugin reads metadata for collection naming

### Verification Results

✅ **Export Test:** 146 tokens exported from Figma
- 78 primitives (primary/0, primary/10, etc.)
- 34 light mode semantics (primary, onprimary, etc.)
- 34 dark mode semantics (dark-primary, dark-onprimary, etc.)

✅ **organize-tokens Script:**
- Successfully organized exported files
- Generated all 4 token files correctly
- Created backup automatically

✅ **Build Test:** `pnpm build:panda` completed successfully
- Generated styled-system/ directory
- No errors or warnings

✅ **Round-Trip Verified:**
- Code → Figma: Import successful (146 tokens)
- Figma → Code: Export successful (146 tokens)
- Token counts match exactly
- Aliases preserved (`{primary.100}`)
- No data loss

### Collection Naming

✅ Figma collection name now reads from `package.json`:
- Collection name: `@discourser/design-system` (not hardcoded "Material3 Tokens")
- Version tracked in metadata
- Timestamp recorded

### Files Modified

- `scripts/organize-figma-exports.ts` (created)
- `scripts/export-figma-tokens.ts` (updated to read package.json)
- `figma-token-sync/packages/figma-plugin/src/code.ts` (updated metadata reading)
- `package.json` (added organize-tokens script)
- `README.md` (added token workflow documentation)

### Known Issues

None. All success criteria met.

### Next Steps

- TASK-DS-005: Cleanup token directories (move old test artifacts to .archive/)
- TASK-DS-004.5: Fix broken components in Storybook (separate from tokens)

---

**Status:** ✅ Complete and verified with full round-trip test