# Navigation Menu — Figma Metadata

**Source:** https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-4046&m=dev
**Node ID:** `38:4046`
**Retrieved:** 2026-02-20

## Node Tree

```xml
<instance id="38:4046" name="Navigation Menu" x="0" y="92" width="283" height="1091" />
```

## Summary

| Property       | Value                         |
| -------------- | ----------------------------- |
| Component name | Navigation Menu               |
| Type           | Instance (component)          |
| Width          | 283px                         |
| Height         | 1091px                        |
| Position       | x=0, y=92 (relative to frame) |

## Structure Overview

The component is a vertical stack of 5 `ListItem` sections:

| Node ID             | Section              |
| ------------------- | -------------------- |
| `I38:4046;810:4220` | Dashboard (5 items)  |
| `I38:4046;810:4221` | MyNotebook (4 items) |
| `I38:4046;810:4222` | Scenarios (5 items)  |
| `I38:4046;810:4223` | Help (5 items)       |
| `I38:4046;810:4224` | Account (2 items)    |

Each `ListItem` contains:

- An `Expandable List Item` trigger row (icon + section title + chevron indicator)
- One or more `Expandable List Item` nav rows (indented, label only)
