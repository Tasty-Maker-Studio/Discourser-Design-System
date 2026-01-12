#!/bin/bash
# Clean old token backups (keep last 5, or older than 30 days)

ARCHIVE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../tokens/.archive" && pwd)"

echo "🧹 Cleaning old token backups..."
echo ""
echo "Archive directory: $ARCHIVE_DIR"
echo ""

# Find backup directories
BACKUPS=$(find "$ARCHIVE_DIR" -maxdepth 1 -type d -name "backup-*" | sort -r)
BACKUP_COUNT=$(echo "$BACKUPS" | grep -c "backup-")

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
  SIZE=$(du -sh "$backup" 2>/dev/null | cut -f1)
  echo "  • $(basename "$backup") ($SIZE)"
done