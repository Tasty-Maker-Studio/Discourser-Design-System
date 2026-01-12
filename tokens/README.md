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
   pnpm organize-tokens
   ```

2. **Review changes**
   ```bash
   git diff tokens/primitives-generated.json
   ```

3. **Rebuild design system**
   ```bash
   pnpm build:panda
   ```

### Backup Management

The organize-tokens script automatically creates backups in `.archive/backup-[timestamp]/`.

To clean old backups:
```bash
pnpm clean:old-backups
```

## Important Notes

⚠️ **Do not edit `-generated.json` files manually** - they will be overwritten on next export

✅ **Reference files in subdirectories** are for documentation purposes

📁 **`.archive/`** contains historical files from testing - safe to delete if needed