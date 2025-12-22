# Design System

room-ui uses a carefully crafted dark theme design system optimized for Deal Room and data-intensive applications.

## Color Palette

### Background Colors

| Token | CSS Variable | Tailwind Class | Usage |
|-------|--------------|----------------|-------|
| Base | `--room-bg-base` | `bg-room-bg-base` | Page backgrounds |
| Elevated | `--room-bg-elevated` | `bg-room-bg-elevated` | Cards, modals |
| Surface | `--room-bg-surface` | `bg-room-bg-surface` | Interactive surfaces |
| Hover | `--room-bg-hover` | `bg-room-bg-hover` | Hover states |

### Text Colors

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| Primary | `text-room-text-primary` | Main content |
| Secondary | `text-room-text-secondary` | Supporting text |
| Muted | `text-room-text-muted` | Subtle text |
| Disabled | `text-room-text-disabled` | Disabled states |

### Accent Colors

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| Accent | `bg-room-accent` | Primary actions, links |
| Accent Hover | `hover:bg-room-accent-hover` | Hover states |
| Accent Muted | `bg-room-accent-muted` | Subtle accent backgrounds |

### Semantic Colors

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| Success | `bg-room-success` | Success states |
| Error | `bg-room-error` | Error states |
| Warning | `bg-room-warning` | Warning states |
| Info | `bg-room-info` | Informational states |

## Typography

### Font Families

- **Sans**: Geist Sans - Primary font for UI text
- **Mono**: Geist Mono - Code and data display

### Font Sizes

| Size | Class | Usage |
|------|-------|-------|
| xs | `text-xs` | Labels, badges |
| sm | `text-sm` | Secondary text, descriptions |
| base | `text-base` | Body text |
| lg | `text-lg` | Subheadings |
| xl | `text-xl` | Section titles |
| 2xl | `text-2xl` | Page titles |

## Spacing

room-ui uses a consistent spacing scale:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Compact spacing |
| md | 16px | Default spacing |
| lg | 24px | Comfortable spacing |
| xl | 32px | Section spacing |
| 2xl | 48px | Large gaps |

## Border Radius

| Token | Class | Value |
|-------|-------|-------|
| sm | `rounded-room-sm` | 8px |
| default | `rounded-room` | 12px |
| lg | `rounded-room-lg` | 16px |

## Shadows

Components use subtle shadows for elevation:

```css
/* Card shadow */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

/* Modal shadow */
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
```

## Using Design Tokens

### In Components

```tsx
import { Box, Text, Card } from 'room-ui';

function Example() {
  return (
    <Card>
      <Box padding="md" background="elevated">
        <Text color="primary">Primary text</Text>
        <Text color="secondary">Secondary text</Text>
      </Box>
    </Card>
  );
}
```

### In Custom CSS

```css
.custom-element {
  background: var(--room-bg-surface);
  color: var(--room-text-primary);
  border: 1px solid var(--room-border);
  border-radius: var(--room-radius);
}
```

### With Tailwind

```tsx
<div className="bg-room-bg-surface text-room-text-primary border border-room-border rounded-room">
  Custom styled content
</div>
```

## Accessibility

All colors meet WCAG AA contrast requirements:

- Text on backgrounds: 4.5:1 minimum
- Large text on backgrounds: 3:1 minimum
- Interactive elements: 3:1 minimum

## Best Practices

1. **Use semantic colors** for feedback states (success, error, warning)
2. **Maintain hierarchy** with text color tokens (primary > secondary > muted)
3. **Use consistent spacing** from the spacing scale
4. **Prefer components** over custom styling when possible
5. **Test in dark mode** - room-ui is designed for dark themes
