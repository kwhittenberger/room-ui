# Feedback Components

Communicate with users through notifications, alerts, and loading states.

## Toast

Notification messages with auto-dismiss.

```tsx
import { Toast, useToast } from 'room-ui';

function MyComponent() {
  const { addToast } = useToast();

  const showSuccess = () => {
    addToast({
      type: 'success',
      title: 'Success',
      message: 'Item saved successfully',
    });
  };

  return <Button onClick={showSuccess}>Save</Button>;
}
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/feedback-toast)

## Alert

Alert banners with action buttons.

```tsx
import { Alert } from 'room-ui';

<Alert variant="info" title="Information">
  This is an informational message.
</Alert>

<Alert variant="warning" title="Warning" dismissible>
  This action cannot be undone.
</Alert>

<Alert
  variant="error"
  title="Error"
  action={<Button size="sm">Retry</Button>}
>
  Something went wrong.
</Alert>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/feedback-alert)

## Tooltip

Hover tooltips with positioning.

```tsx
import { Tooltip } from 'room-ui';

<Tooltip content="Helpful information">
  <Button>Hover me</Button>
</Tooltip>

<Tooltip content="Right side" position="right">
  <span>Info</span>
</Tooltip>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/feedback-tooltip)

## EmptyState

Empty state display with call-to-action.

```tsx
import { EmptyState } from 'room-ui';
import { FileText } from 'lucide-react';

<EmptyState
  icon={<FileText />}
  title="No documents"
  description="Get started by creating your first document."
  action={<Button>Create Document</Button>}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/feedback-emptystate)

## Loading

Loading spinners and indicators.

```tsx
import { Loading, Spinner } from 'room-ui';

<Spinner />
<Spinner size="lg" />
<Loading text="Loading data..." />
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/data-display-loading)

## Skeleton

Loading placeholders.

```tsx
import { Skeleton, SkeletonCard, SkeletonTable } from 'room-ui';

<Skeleton width="200px" height="20px" />
<SkeletonCard />
<SkeletonTable rows={5} columns={4} />
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/data-display-loading--skeleton)

## ConfirmDialog

Confirmation dialogs for destructive actions.

```tsx
import { ConfirmDialog, useConfirmDialog } from 'room-ui';

function MyComponent() {
  const { confirm } = useConfirmDialog();

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete item?',
      message: 'This action cannot be undone.',
      confirmLabel: 'Delete',
      variant: 'danger',
    });

    if (confirmed) {
      deleteItem();
    }
  };

  return <Button onClick={handleDelete}>Delete</Button>;
}
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/feedback-confirmdialog)

## HoverCard

Rich content hover cards.

```tsx
import { HoverCard } from 'room-ui';

<HoverCard
  trigger={<span>Hover for details</span>}
>
  <div>
    <h4>Card Title</h4>
    <p>Detailed information shown on hover.</p>
  </div>
</HoverCard>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/feedback-hovercard)

## Popover

Rich content popovers.

```tsx
import { Popover } from 'room-ui';

<Popover
  trigger={<Button>Open Popover</Button>}
>
  <div className="p-4">
    <h4>Popover Content</h4>
    <p>Interactive content goes here.</p>
  </div>
</Popover>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/feedback-popover)
