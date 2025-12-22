# @room-ui: Full @papernote/ui Parity Implementation

This directory contains session prompts for achieving 100% API parity between `@room-ui` and `@papernote/ui`.

## Goal

Create `@room-ui` as a **drop-in replacement** for `@papernote/ui` with:
- Identical API (same component names, same props, same exports)
- Dark theme (slate/cyan) instead of light theme (paper/ink)
- Tailwind CSS 4

## Current Status

| Metric | Target | Current | Gap |
|--------|--------|---------|-----|
| Components | 117 | 44 | 73 |
| Hooks | 19 | 2 | 17 |
| Utilities | 18 | 1 | 17 |
| Context Providers | 7 | 1 | 6 |

## Phase Overview

| Phase | Focus | Components | Priority | Status |
|-------|-------|------------|----------|--------|
| A | Infrastructure & Tailwind 4 | - | LOW | [ ] (deferred) |
| B | Core Feedback | 6 | CRITICAL | [x] COMPLETE |
| C | Navigation | 7 | HIGH | [x] COMPLETE |
| D | Advanced Form Controls | 10 | HIGH | [x] COMPLETE |
| E | Data Display | 8 | HIGH | [ ] |
| F | Data Tables | 8 | HIGH | [ ] |
| G | Layout | 10 | HIGH | [ ] |
| H | Mobile | 11 + hooks | MEDIUM | [ ] |
| I | Advanced | 12 | MEDIUM | [ ] |
| J | Remaining + Polish | 39+ | MEDIUM | [ ] |

## Quick Start

1. Read the master plan: `D:\repos\dewart-deal-room\docs\active-work\phase-7-room-ui-extraction.md`
2. Start with Phase A (infrastructure must be done first)
3. Open the corresponding `phase-X-*.md` file
4. Follow the session prompt and checklist

## Phase Documents

| File | Description |
|------|-------------|
| `phase-A-infrastructure.md` | Tailwind CSS 4 upgrade, theme system |
| `phase-E-data-display.md` | Loading/Skeleton, Avatar, EmptyState, Chip, Timeline, TreeView, Calendar |
| `phase-F-data-tables.md` | DataTable, DataGrid, Spreadsheet, FilterBar, ExportButton |
| `phase-G-layout.md` | Layout, AppLayout, Page, Dashboard, ActionBar, StatusBar |
| `phase-H-mobile.md` | BottomSheet, BottomNavigation, SwipeActions, PullToRefresh, MobileProvider |
| `phase-I-advanced.md` | Form system, KanbanBoard, RichTextEditor, Slider, ColorPicker |
| `phase-J-remaining.md` | All remaining components, utilities, Storybook stories |

### Archived Phases
- `archive/phase-B-core-feedback.md` - Toast, Modal, Alert, ConfirmDialog, Tooltip, Popover
- `archive/phase-C-navigation.md` - Tabs, Breadcrumbs, Sidebar, Menu, Dropdown, Pagination, Accordion
- `archive/phase-D-form-controls.md` - MultiSelect, Switch, DatePicker, TimePicker, Combobox, NumberInput, etc.

## Theme Mapping Quick Reference

```
@papernote/ui (light)     →  @room-ui (dark)
──────────────────────────────────────────────
bg-white                  →  bg-slate-900
bg-paper-50               →  bg-slate-800
bg-paper-100              →  bg-slate-700
text-ink-900              →  text-slate-100
text-ink-600              →  text-slate-300
border-paper-200          →  border-slate-700
accent-500                →  cyan-500
```

## Commands

```bash
# Development
npm run dev          # Watch mode build
npm run type-check   # TypeScript check
npm run storybook    # Run Storybook

# Build
npm run build        # Production build

# Verify parity
grep -E "^export" d:/repos/notebook-ui/src/components/index.ts | wc -l
grep -E "^export" d:/repos/@room-ui/src/components/index.ts | wc -l
```

## Session Workflow

1. Start a fresh Claude Code session
2. Paste the session prompt from the phase document
3. Work through the component list
4. Mark checklist items as completed
5. Run build and type-check
6. When done:
   - Create `docs/archive/phase-X-summary.md`
   - Move phase doc to `docs/archive/`
   - Update this README with completion status
   - Start next phase

## Reference Repositories

- **@papernote/ui source**: `D:\repos\notebook-ui\`
- **@room-ui destination**: `D:\repos\@room-ui\`
- **Master plan**: `D:\repos\dewart-deal-room\docs\active-work\phase-7-room-ui-extraction.md`

## Archived Work

Previous implementation plans (before parity requirement) are in `archive/`.
