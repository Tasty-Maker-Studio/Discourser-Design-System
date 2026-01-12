# TASK-DS-005: Cleanup Token Directory Structure

**Status:** ✅ COMPLETED
**Completed:** January 11, 2026
**Date:** January 10, 2026
**Estimated Time:** 30 minutes
**Actual Time:** ~30 minutes
**Priority:** P2 - Housekeeping
**Depends On:** TASK-DS-004 (Token organization script)

---

## ✅ Completion Summary

**Completed January 11, 2026**

All objectives achieved:

1. ✅ **Created `.archive/` directory** for backup storage
2. ✅ **Moved 5 backup directories** to `.archive/`
3. ✅ **Created `.gitignore`** to exclude generated files
4. ✅ **Created documentation** - `.archive/README.md` and `tokens/README.md`
5. ✅ **Created cleanup script** - `scripts/clean-old-backups.sh`
6. ✅ **Added npm script** - `pnpm clean:old-backups`

**Results:**
- Clean token directory with only source files visible
- Automated backup retention policy (keep last 5)
- Clear documentation for workflow
- Generated files properly ignored by git

---

## Objective

Clean up the `tokens/` directory after implementing the token organization workflow, removing obsolete files and organizing backups.

---

## Context

### Current State

After the round-trip testing and workflow implementation, the `tokens/` directory has accumulated various backup and temporary directories:

```
tokens/
├── backup-20260110-094159/        ← Old backup from testing
├── CLEAN-BASELINE-JAN9/            ← Round-trip test baseline
├── STAGING-BEFORE-EXPORT/          ← Pre-export staging
├── primitives/                     ← Old subdirectory structure
│   └── colors.json
├── semantic/                       ← Old subdirectory structure
│   ├── colors.light.json
│   └── colors.dark.json
├── primitives-generated.json       ← Current working files
├── semantic-light-generated.json   ← Current working files
├── semantic-dark-generated.json    ← Current working files
└── tokens.json                     ← Combined file
```

### Target State

Clean, organized structure:

```
tokens/
├── .archive/                       ← Move old test directories here
│   ├── backup-20260110-094159/
│   ├── CLEAN-BASELINE-JAN9/
│   └── STAGING-BEFORE-EXPORT/
├── primitives/                     ← Keep for reference (read-only)
│   └── colors.json
├── semantic/                       ← Keep for reference (read-only)
│   ├── colors.light.json
│   └── colors.dark.json
├── primitives-generated.json       ← Working files
├── semantic-light-generated.json   ← Working files
├── semantic-dark-generated.json    ← Working files
├── tokens.json                     ← Combined working file
└── .gitignore                      ← Ignore generated files
```

---

## Tasks

### 1. Create Archive Directory

```bash
mkdir -p tokens/.archive
```

### 2. Move Test Directories to Archive

```bash
# Move round-trip test artifacts
mv tokens/backup-20260110-094159 tokens/.archive/
mv tokens/CLEAN-BASELINE-JAN9 tokens/.archive/
mv tokens/STAGING-BEFORE-EXPORT tokens/.archive/
```

### 3. Add README to Archive

Create `tokens/.archive/README.md`:

```markdown
# Token Archive

This directory contains historical token files from testing and development.

## Contents

- `backup-*` - Automated backups from organize-tokens script
- `CLEAN-BASELINE-*` - Round-trip test baselines
- `STAGING-*` - Pre-export staging directories

These files are kept for reference but are not used in the build process.

## Cleanup Policy

- Keep last 5 backups
- Delete backups older than 30 days
- Archive significant test baselines indefinitely

To clean old backups:
```bash
npm run clean:old-backups
```
```

### 4. Update .gitignore

Create/update `tokens/.gitignore`:

```gitignore
# Ignore generated files (these come from Figma exports)
*-generated.json
tokens.json

# Ignore test artifacts
backup-*/
STAGING-*/
CLEAN-BASELINE-*/

# Keep reference files
!primitives/colors.json
!semantic/colors.light.json
!semantic/colors.dark.json

# Keep archive directory structure
.archive/*
!.archive/README.md
```

### 5. Add Reference README

Create `tokens/README.md`:

```markdown
# Design Tokens

This directory contains the design token files for Discourser-Design-System.

## File Structure

### Working Files (Generated - Not in Git)
These files are generated from Figma exports and should not be manually edited:

- `primitives-generated.json` - Primitive color tokens from Figma
- `semantic-light-generated.json` - Light mode semantic tokens
- `semantic-dark-generated.json` - Dark mode semantic tokens
- `tokens.json` - Combined token file for import back to Figma

### Reference Files (In Git)
These are the source files managed in subdirectories:

- `primitives/colors.json` - Material 3 tonal palettes (read-only reference)
- `semantic/colors.light.json` - Light mode semantic mappings (read-only reference)
- `semantic/colors.dark.json` - Dark mode semantic mappings (read-only reference)

## Workflow

### After Figma Export

1. **Organize exported files**
   ```bash
   npm run organize-tokens
   ```

2. **Review changes**
   ```bash
   git diff tokens/primitives-generated.json
   ```

3. **Rebuild design system**
   ```bash
   npm run build:panda
   ```

### Backup Management

The organize-tokens script automatically creates backups in `.archive/backup-[timestamp]/`.

To clean old backups:
```bash
npm run clean:old-backups
```

## Important Notes

⚠️ **Do not edit `-generated.json` files manually** - they will be overwritten on next export

✅ **Reference files in subdirectories** are for documentation purposes

📁 **`.archive/`** contains historical files from testing - safe to delete if needed
```

### 6. Create Cleanup Script

Create `scripts/clean-old-backups.sh`:

```bash
#!/bin/bash
# Clean old token backups (keep last 5, or older than 30 days)

ARCHIVE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../tokens/.archive" && pwd)"

echo "🧹 Cleaning old token backups..."
echo ""
echo "Archive directory: $ARCHIVE_DIR"
echo ""

# Find backup directories
BACKUPS=$(find "$ARCHIVE_DIR" -maxdepth 1 -type d -name "backup-*" | sort -r)
BACKUP_COUNT=$(echo "$BACKUPS" | wc -l | tr -d ' ')

echo "Found $BACKUP_COUNT backup(s)"
echo ""

if [ "$BACKUP_COUNT" -le 5 ]; then
  echo "✓ Keeping all backups (5 or fewer exist)"
  exit 0
fi

# Keep newest 5, delete rest
echo "$BACKUPS" | tail -n +6 | while read backup; do
  echo "🗑️  Removing: $(basename "$backup")"
  rm -rf "$backup"
done

echo ""
echo "✅ Cleanup complete!"
echo ""

# Show remaining backups
echo "Remaining backups:"
find "$ARCHIVE_DIR" -maxdepth 1 -type d -name "backup-*" | sort -r | while read backup; do
  SIZE=$(du -sh "$backup" | cut -f1)
  echo "  • $(basename "$backup") ($SIZE)"
done
```

Make executable:
```bash
chmod +x scripts/clean-old-backups.sh
```

### 7. Add Package.json Script

```json
{
  "scripts": {
    "clean:old-backups": "bash scripts/clean-old-backups.sh"
  }
}
```

---

## Verification Steps

After cleanup:

1. **Check directory structure**
   ```bash
   tree tokens/ -L 2
   ```
   Should show clean organization

2. **Verify .gitignore**
   ```bash
   git status tokens/
   ```
   Should only show reference files and READMEs

3. **Test backup cleanup**
   ```bash
   npm run clean:old-backups
   ```
   Should keep 5 most recent

4. **Verify build still works**
   ```bash
   npm run build:panda
   ```
   Should build without errors

---

## Git Commit Plan

After cleanup, commit in organized way:

```bash
# 1. Add archive structure
git add tokens/.archive/README.md
git add tokens/.gitignore
git add tokens/README.md
git commit -m "docs: add token directory documentation and archive structure"

# 2. Remove old test artifacts (if they were tracked)
git rm -r tokens/backup-20260110-094159
git rm -r tokens/CLEAN-BASELINE-JAN9
git rm -r tokens/STAGING-BEFORE-EXPORT
git commit -m "chore: clean up token test artifacts"

# 3. Add cleanup script
git add scripts/clean-old-backups.sh
git add package.json
git commit -m "feat: add token backup cleanup script"
```

---

## Success Criteria

**Cleanup is complete when:**

1. ✅ Test directories moved to `.archive/`
2. ✅ `.gitignore` properly excludes generated files
3. ✅ Reference files clearly documented as read-only
4. ✅ READMEs explain directory structure
5. ✅ Cleanup script removes old backups
6. ✅ Git only tracks reference files + docs
7. ✅ Build still works after cleanup
8. ✅ Team understands new structure

---

## Related Tasks

- **TASK-DS-004:** Creates the organize-tokens workflow (must complete first)
- **Future:** V2 will add more token types to this structure
- **Future:** V3 will add language-specific subdirectories

---

**Ready to implement when:** TASK-DS-004 is complete and user prompts "work on TASK-DS-005"