# Token Archive

This directory contains historical token files from testing and development.

## Contents

- `backup-*` - Automated backups from organize-tokens script

These files are kept for reference but are not used in the build process.

## Cleanup Policy

- Keep last 5 backups
- Delete backups older than 30 days
- Archive significant test baselines indefinitely

To clean old backups:
```bash
pnpm clean:old-backups
```