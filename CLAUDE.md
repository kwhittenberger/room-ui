# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Room UI is a dark-themed React component library for Deal Room applications. It provides a comprehensive set of UI primitives and components built with TypeScript, Tailwind CSS, and React 18/19.

## Commands

```bash
# Build the library (TypeScript compilation + Vite bundling)
npm run build

# Watch mode for development
npm run dev

# Type checking without emitting
npm run type-check

# Linting
npm run lint

# Run Storybook for component development
npm run storybook

# Build Storybook
npm run build-storybook
```

## Architecture

### Build System
- **Vite** builds the library with ES modules and CommonJS outputs
- **vite-plugin-dts** generates TypeScript declarations
- Output: `dist/index.js` (ESM), `dist/index.cjs` (CJS), `dist/index.d.ts` (types), `dist/styles.css`
- React and React DOM are external peer dependencies (not bundled)

### Component Structure
Components live in `src/components/` with each component in its own directory:
```
src/components/ComponentName/
  ComponentName.tsx  # Implementation
  index.ts           # Re-export
```

All components are re-exported from `src/components/index.ts` and ultimately from `src/index.ts`.

### Component Categories
- **Core Primitives**: Box, Stack, Grid, Text, Heading, Icon
- **Buttons**: Button, IconButton, ActionButton, ButtonGroup
- **Form Controls**: Input, Select, TextArea, Checkbox, Radio, RadioGroup, SearchInput, FormField, FormGroup
- **Feedback**: Badge, StatusBadge, Spinner, ProgressBar
- **Cards**: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

### Theme System
The theme is defined in `src/theme/` with tokens for:
- **Colors** (`colors.ts`): Dark slate/cyan palette with background layers, text hierarchy, accent, and semantic colors
- **Spacing** (`spacing.ts`): Spacing scale tokens
- **Typography** (`typography.ts`): Font families (Geist Sans/Mono), sizes, weights
- **Borders** (`borders.ts`): Border radius and width tokens

Tailwind configuration (`tailwind.config.ts`) extends these as custom `room-*` utilities:
- Backgrounds: `bg-room-bg-base`, `bg-room-bg-elevated`, `bg-room-bg-surface`, `bg-room-bg-hover`
- Text: `text-room-text-primary`, `text-room-text-secondary`, `text-room-text-muted`, `text-room-text-disabled`
- Accent: `bg-room-accent`, `hover:bg-room-accent-hover`
- Semantic: `bg-room-success`, `bg-room-error`, `bg-room-warning`, `bg-room-info`
- Border: `border-room-border`, `focus:border-room-accent`
- Radius: `rounded-room-sm` (8px), `rounded-room` (12px), `rounded-room-lg` (16px)

### Styling Patterns
- All components use the `cn()` utility from `src/utils/cn.ts` which combines `clsx` and `tailwind-merge`
- Components accept `className` prop for customization
- Base styles are defined in `src/styles.css` with `@layer` directives
- CSS variables are defined in `:root` for runtime theme access

### Key Design Decisions
- Dark mode only (no light theme toggle)
- Components use `forwardRef` for ref forwarding
- Icons via `lucide-react` passed as `icon` prop (type: `LucideIcon`)
- Button `icon` prop with `iconPosition` (not leftIcon/rightIcon)
- Box component provides semantic layout with typed props instead of raw Tailwind classes

## Consumer Usage

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Stack, Text } from 'room-ui';
import 'room-ui/styles.css';
```

Consumers must include `room-ui/styles.css` for Tailwind CSS styles to work.
