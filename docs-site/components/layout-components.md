# Layout Components

Structure and organize your application.

## Stack

Vertical or horizontal flex layout with consistent spacing.

```tsx
import { Stack } from 'room-ui';

// Vertical stack (default)
<Stack gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Horizontal stack
<Stack direction="horizontal" gap="lg">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Stack>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/layout-stack)

## Grid

CSS Grid layout with responsive columns.

```tsx
import { Grid, GridItem } from 'room-ui';

<Grid columns={3} gap="md">
  <GridItem>Column 1</GridItem>
  <GridItem>Column 2</GridItem>
  <GridItem>Column 3</GridItem>
</Grid>

// Responsive columns
<Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
  {items.map(item => <GridItem key={item.id}>{item}</GridItem>)}
</Grid>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/layout-grid)

## Box

Generic container with spacing and styling utilities.

```tsx
import { Box } from 'room-ui';

<Box padding="md" background="elevated" rounded>
  Content with padding and elevated background
</Box>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/core-box)

## Card

Content container with header, body, and footer sections.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'room-ui';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/layout-card)

## Modal

Dialog overlay for focused content.

```tsx
import { Modal } from 'room-ui';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  Modal content
</Modal>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/feedback-modal)

## Drawer

Side panel that slides in from edges.

```tsx
import { Drawer } from 'room-ui';

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="right"
  title="Drawer Title"
>
  Drawer content
</Drawer>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/feedback-drawer)

## Layout

Complete app layout with sidebar navigation.

```tsx
import { Layout, Sidebar } from 'room-ui';

<Layout
  sidebar={<Sidebar>{/* Navigation items */}</Sidebar>}
>
  <main>Main content</main>
</Layout>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/layout-layout)

## Page

Standard page container with consistent padding.

```tsx
import { Page, PageLayout } from 'room-ui';

<PageLayout
  title="Page Title"
  description="Optional description"
  actions={<Button>Action</Button>}
>
  <Page>
    Page content
  </Page>
</PageLayout>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/layout-page)

## TwoColumnContent

Sidebar + main content layout.

```tsx
import { TwoColumnContent } from 'room-ui';

<TwoColumnContent
  sidebar={<nav>Sidebar navigation</nav>}
  sidebarWidth="250px"
>
  Main content area
</TwoColumnContent>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/layout-twocolumncontent)
