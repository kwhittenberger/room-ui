# Getting Started

This guide will help you get started with room-ui in your React project.

## Installation

::: code-group

```bash [npm]
npm install room-ui
```

```bash [yarn]
yarn add room-ui
```

```bash [pnpm]
pnpm add room-ui
```

:::

## Peer Dependencies

room-ui requires the following peer dependencies:

```bash
npm install react react-dom lucide-react
```

For styling, you'll also need Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
```

## Setup

### 1. Import Styles

Add the room-ui styles to your app's entry point:

```tsx
// In your main.tsx or App.tsx
import 'room-ui/styles';
```

### 2. Configure Tailwind CSS

Extend your `tailwind.config.js` to include room-ui's design tokens:

```js
// tailwind.config.js
import roomConfig from 'room-ui/tailwind-config';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/room-ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [roomConfig],
  // Your custom configuration...
}
```

### 3. Start Using Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Stack } from 'room-ui';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Stack gap="md">
          <p>Your content here</p>
          <Button variant="primary">Click Me</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
```

## Dark Theme

room-ui is designed as a dark-themed library. The components use a slate/cyan color palette that works best on dark backgrounds.

To ensure proper styling, wrap your app content in a container with a dark background:

```tsx
function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Your app content */}
    </div>
  );
}
```

## TypeScript Support

room-ui is written in TypeScript and provides full type definitions. No additional setup is required.

```tsx
import type { ButtonProps, CardProps } from 'room-ui';

// Types are automatically available
const handleClick: ButtonProps['onClick'] = (e) => {
  console.log('Button clicked');
};
```

## Icons

room-ui uses [Lucide React](https://lucide.dev/guide/packages/lucide-react) for icons. Components accept icon props as Lucide icon components:

```tsx
import { Button } from 'room-ui';
import { Plus, Save } from 'lucide-react';

function MyComponent() {
  return (
    <>
      <Button icon={Plus}>Add Item</Button>
      <Button icon={Save} iconPosition="right">Save</Button>
    </>
  );
}
```

## Next Steps

- Browse the [Components](/components/) to see what's available
- Check out the [Design System](/design-system) for colors and tokens
- View the [Live Storybook](https://main--6949986ceb769ed38d88c5ee.chromatic.com/) for interactive examples
- See the [Deal Room Example](/examples/deal-room) for a real-world usage example
