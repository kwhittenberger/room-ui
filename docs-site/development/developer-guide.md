# Developer Guide

This guide covers how to develop and contribute to room-ui.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/kwhittenberger/room-ui.git
cd room-ui

# Install dependencies
npm install

# Start Storybook for development
npm run storybook
```

## Project Structure

```
room-ui/
├── src/
│   ├── components/       # Component implementations
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.stories.tsx
│   │       └── index.ts
│   ├── hooks/            # Custom hooks
│   ├── theme/            # Design tokens
│   ├── utils/            # Utility functions
│   ├── styles.css        # Global styles
│   └── index.ts          # Main export
├── docs-site/            # VitePress documentation
├── .storybook/           # Storybook config
├── dist/                 # Build output
└── package.json
```

## Development Workflow

### Running Storybook

```bash
npm run storybook
```

Opens Storybook at `http://localhost:6006` with hot reloading.

### Building the Library

```bash
npm run build
```

Outputs to `dist/`:
- `index.js` - ES module
- `index.cjs` - CommonJS module
- `index.d.ts` - TypeScript declarations
- `styles.css` - Compiled styles

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Creating Components

### Component Structure

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx       # Implementation
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts                # Re-export
```

### Component Template

```tsx
// ComponentName.tsx
import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Prop description */
  variant?: 'default' | 'primary';
  /** Children content */
  children: React.ReactNode;
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'base-styles',
          variant === 'primary' && 'primary-styles',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### Story Template

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    children: 'Content',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Content',
  },
};
```

### Export the Component

Add to `src/components/index.ts`:

```ts
export * from './ComponentName';
```

## Design Tokens

Use design tokens from `src/theme/`:

```tsx
// Use Tailwind classes with room- prefix
<div className="bg-room-bg-surface text-room-text-primary">
  Content
</div>

// Or use the cn utility
import { cn } from '../../utils/cn';

const classes = cn(
  'bg-room-bg-surface',
  'text-room-text-primary',
  'rounded-room',
  className
);
```

## Best Practices

1. **Use forwardRef** for DOM components
2. **Spread props** to allow customization
3. **Accept className** for styling overrides
4. **Use cn utility** for conditional classes
5. **Add JSDoc comments** for props
6. **Write comprehensive stories** for all states
7. **Follow dark theme** design patterns
