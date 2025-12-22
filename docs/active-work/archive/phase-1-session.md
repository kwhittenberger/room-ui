# Phase 1: Core Missing Primitives

## Session Goal
Add foundational primitive components that other components depend on.

## Components to Implement

### 1. Switch
A toggle switch control for boolean values.

**Source**: `D:\repos\notebook-ui\src\components\Switch.tsx`

**Props**:
- `checked`: boolean
- `onChange`: (checked: boolean) => void
- `disabled`: boolean
- `size`: 'sm' | 'md' | 'lg'
- `label`: string (optional)
- `description`: string (optional)

**Styling Adaptations**:
- Track off: `bg-room-bg-surface`
- Track on: `bg-room-accent`
- Thumb: `bg-white`
- Focus ring: `ring-room-accent`

### 2. Separator
A horizontal or vertical divider line.

**Source**: `D:\repos\notebook-ui\src\components\Separator.tsx`

**Props**:
- `orientation`: 'horizontal' | 'vertical'
- `className`: string

**Styling Adaptations**:
- Border color: `border-room-border`

### 3. Avatar
User avatar with image, initials fallback, or icon.

**Source**: `D:\repos\notebook-ui\src\components\Avatar.tsx`

**Props**:
- `src`: string (image URL)
- `alt`: string
- `name`: string (for initials)
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `variant`: 'circle' | 'rounded'
- `status`: 'online' | 'offline' | 'busy' | 'away'

**Styling Adaptations**:
- Fallback bg: `bg-room-bg-surface`
- Fallback text: `text-room-text-muted`
- Status colors: semantic room colors

### 4. Skeleton / Loading
Animated placeholder for loading states.

**Source**: `D:\repos\notebook-ui\src\components\Loading.tsx`

**Components**:
- `Skeleton`: Base skeleton element
- `SkeletonCard`: Card placeholder
- `SkeletonTable`: Table placeholder
- `Loading`: Spinner with text

**Styling Adaptations**:
- Skeleton bg: `bg-room-bg-surface`
- Shimmer: slate gradient animation
- Spinner: `text-room-accent`

### 5. EmptyState
Display when no data is available.

**Source**: `D:\repos\notebook-ui\src\components\EmptyState.tsx`

**Props**:
- `icon`: LucideIcon
- `title`: string
- `description`: string
- `action`: { label, onClick } (optional)

**Styling Adaptations**:
- Icon: `text-room-text-muted`
- Title: `text-room-text-primary`
- Description: `text-room-text-secondary`

## Implementation Steps

1. Create component files in `src/components/`:
   - `Switch/Switch.tsx`
   - `Separator/Separator.tsx`
   - `Avatar/Avatar.tsx`
   - `Loading/Loading.tsx` (includes Skeleton variants)
   - `EmptyState/EmptyState.tsx`

2. Each component should:
   - Use `forwardRef`
   - Use `cn()` utility
   - Export types
   - Have index.ts barrel export

3. Update `src/components/index.ts` with new exports

4. Add Storybook stories for each component

## File Structure

```
src/components/
├── Switch/
│   ├── Switch.tsx
│   └── index.ts
├── Separator/
│   ├── Separator.tsx
│   └── index.ts
├── Avatar/
│   ├── Avatar.tsx
│   └── index.ts
├── Loading/
│   ├── Loading.tsx       (Spinner/Loading)
│   ├── Skeleton.tsx      (Skeleton base)
│   ├── SkeletonCard.tsx
│   ├── SkeletonTable.tsx
│   └── index.ts
├── EmptyState/
│   ├── EmptyState.tsx
│   └── index.ts
```

## Testing Checklist

- [ ] Switch toggles correctly
- [ ] Switch respects disabled state
- [ ] Switch shows focus ring on keyboard focus
- [ ] Separator renders in both orientations
- [ ] Avatar shows image when src provided
- [ ] Avatar falls back to initials when no image
- [ ] Avatar shows status indicator
- [ ] Skeleton animates smoothly
- [ ] SkeletonCard matches Card dimensions
- [ ] SkeletonTable matches DataTable structure
- [ ] EmptyState displays all props correctly
- [ ] EmptyState action button works

## Commands

```bash
# Build and watch
npm run dev

# Type check
npm run type-check

# Run Storybook
npm run storybook
```
