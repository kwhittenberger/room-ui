# Phase A: Infrastructure & Tailwind CSS 4 Upgrade

## Session Prompt
```
I'm starting Phase A of @room-ui: Infrastructure and Tailwind CSS 4 upgrade.

Context: D:\repos\@room-ui\docs\active-work\phase-A-infrastructure.md
Master Plan: D:\repos\dewart-deal-room\docs\active-work\phase-7-room-ui-extraction.md

Goals:
1. Upgrade from Tailwind CSS 3.x to Tailwind CSS 4
2. Set up dark theme CSS variables matching @papernote/ui structure
3. Create theme mapping layer (papernote light → room dark)
4. Verify build produces ESM/CJS bundles correctly
5. Ensure all existing 21 components still work after upgrade

Reference:
- @papernote/ui tailwind config: D:\repos\notebook-ui\tailwind.config.js
- @room-ui current config: D:\repos\@room-ui\tailwind.config.ts
- @room-ui package.json: D:\repos\@room-ui\package.json
```

## Priority: CRITICAL
This phase must be completed before any other phases can proceed.

## Prerequisites
- Node.js 18+
- Access to both repositories

## Deliverables

### 1. Tailwind CSS 4 Upgrade
- [ ] Update `tailwindcss` dependency to v4
- [ ] Update `postcss` configuration for Tailwind v4
- [ ] Update `autoprefixer` if needed
- [ ] Migrate `tailwind.config.ts` to Tailwind v4 format
- [ ] Update any deprecated utility classes

### 2. Theme System Alignment
- [ ] Review @papernote/ui color tokens and CSS variables
- [ ] Create matching CSS variable structure in @room-ui
- [ ] Implement dark theme equivalents for all papernote colors

### 3. CSS Variable Structure
Create CSS variables that allow theme switching:

```css
/* src/styles/variables.css */
:root {
  /* Background colors */
  --room-bg-base: theme('colors.slate.900');
  --room-bg-elevated: theme('colors.slate.800');
  --room-bg-surface: theme('colors.slate.700');
  --room-bg-hover: theme('colors.slate.600');

  /* Text colors */
  --room-text-primary: theme('colors.slate.100');
  --room-text-secondary: theme('colors.slate.300');
  --room-text-muted: theme('colors.slate.400');
  --room-text-disabled: theme('colors.slate.500');

  /* Border colors */
  --room-border: theme('colors.slate.700');
  --room-border-hover: theme('colors.slate.600');
  --room-border-focus: theme('colors.cyan.500');

  /* Accent colors */
  --room-accent: theme('colors.cyan.500');
  --room-accent-hover: theme('colors.cyan.400');
  --room-accent-muted: theme('colors.cyan.900');

  /* Status colors */
  --room-success: theme('colors.emerald.500');
  --room-success-muted: theme('colors.emerald.900');
  --room-warning: theme('colors.amber.500');
  --room-warning-muted: theme('colors.amber.900');
  --room-error: theme('colors.red.500');
  --room-error-muted: theme('colors.red.900');
  --room-info: theme('colors.blue.500');
  --room-info-muted: theme('colors.blue.900');
}
```

### 4. Theme Mapping Reference

| @papernote/ui Token | @room-ui Token | Value |
|---------------------|----------------|-------|
| `bg-white` | `bg-room-bg-base` | slate-900 |
| `bg-paper-50` | `bg-room-bg-elevated` | slate-800 |
| `bg-paper-100` | `bg-room-bg-surface` | slate-700 |
| `bg-paper-200` | `bg-room-bg-hover` | slate-600 |
| `text-ink-900` | `text-room-text-primary` | slate-100 |
| `text-ink-700` | `text-room-text-secondary` | slate-300 |
| `text-ink-500` | `text-room-text-muted` | slate-400 |
| `border-paper-200` | `border-room-border` | slate-700 |
| `accent-500` | `room-accent` | cyan-500 |
| `accent-600` | `room-accent-hover` | cyan-400 |

### 5. Build Verification
- [ ] Run `npm run build` successfully
- [ ] Verify `dist/index.js` (ESM) is generated
- [ ] Verify `dist/index.cjs` (CJS) is generated
- [ ] Verify `dist/index.d.ts` (types) is generated
- [ ] Verify `dist/styles.css` includes new CSS variables
- [ ] Run `npm run type-check` with no errors

### 6. Component Smoke Test
After upgrade, verify all 21 existing components still render:
- [ ] Box
- [ ] Stack
- [ ] Grid + GridItem
- [ ] Text + Heading
- [ ] Icon
- [ ] Button
- [ ] IconButton
- [ ] ActionButton
- [ ] ButtonGroup
- [ ] Input
- [ ] Select
- [ ] TextArea
- [ ] Checkbox
- [ ] Radio + RadioGroup
- [ ] SearchInput
- [ ] FormField
- [ ] FormGroup
- [ ] Badge + StatusBadge
- [ ] Spinner
- [ ] ProgressBar
- [ ] Card (+ CardHeader, etc.)

## Tailwind v4 Migration Notes

Key changes in Tailwind CSS 4:
1. New CSS-first configuration (optional JS config)
2. Native CSS cascade layers
3. New `@theme` directive
4. Simplified color palette
5. Container queries built-in
6. New variant syntax

Refer to: https://tailwindcss.com/docs/v4-beta

## Completion Criteria

1. Tailwind CSS 4 is installed and configured
2. All CSS variables are defined and working
3. Build produces all expected outputs
4. All 21 existing components render correctly
5. No TypeScript errors
6. Storybook still runs (if configured)

## Post-Completion

After completing this phase:
1. Create summary: `docs/archive/phase-A-summary.md`
2. Move this file to `docs/archive/`
3. Proceed to Phase B: Core Feedback Components
