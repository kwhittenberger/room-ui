# Advanced Components

Complex interactive components for sophisticated use cases.

## Accordion

Collapsible panels with custom icons.

```tsx
import { Accordion } from 'room-ui';

<Accordion
  items={[
    { id: '1', title: 'Section 1', content: <div>Content 1</div> },
    { id: '2', title: 'Section 2', content: <div>Content 2</div> },
    { id: '3', title: 'Section 3', content: <div>Content 3</div> },
  ]}
  allowMultiple
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/navigation-accordion)

## Transfer

Dual-list item transfer with search.

```tsx
import { Transfer } from 'room-ui';

<Transfer
  sourceItems={availableItems}
  targetItems={selectedItems}
  onChange={(source, target) => {
    setAvailableItems(source);
    setSelectedItems(target);
  }}
  sourceTitle="Available"
  targetTitle="Selected"
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-transfer)

## Stepper

Multi-step wizard with validation.

```tsx
import { Stepper } from 'room-ui';

<Stepper
  steps={[
    { id: 'info', label: 'Basic Info', content: <BasicInfoForm /> },
    { id: 'details', label: 'Details', content: <DetailsForm /> },
    { id: 'review', label: 'Review', content: <ReviewStep /> },
  ]}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/navigation-stepper)

## Autocomplete

Auto-suggest input with async support.

```tsx
import { Autocomplete } from 'room-ui';

<Autocomplete
  label="Search users"
  options={users}
  onSearch={async (query) => {
    const results = await searchUsers(query);
    return results;
  }}
  getOptionLabel={(option) => option.name}
  onChange={setSelectedUser}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-autocomplete)

## Combobox

Searchable select with custom options.

```tsx
import { Combobox } from 'room-ui';

<Combobox
  label="Select or create"
  options={options}
  creatable
  onCreate={(value) => createOption(value)}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-combobox)

## DateRangePicker

Date range selection with presets.

```tsx
import { DateRangePicker } from 'room-ui';

<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
  presets={[
    { label: 'Last 7 days', getValue: () => getLast7Days() },
    { label: 'Last 30 days', getValue: () => getLast30Days() },
    { label: 'This month', getValue: () => getThisMonth() },
  ]}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-daterangepicker)

## Carousel

Image/content carousel with auto-play.

```tsx
import { Carousel } from 'room-ui';

<Carousel
  items={images}
  autoPlay
  autoPlayInterval={5000}
  showDots
  showArrows
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/data-display-carousel)

## InfiniteScroll

Infinite scroll loading for large lists.

```tsx
import { InfiniteScroll } from 'room-ui';

<InfiniteScroll
  items={items}
  hasMore={hasMore}
  loadMore={loadMoreItems}
  loader={<Spinner />}
  renderItem={(item) => <ItemCard item={item} />}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/advanced-infinitescroll)

## KanbanBoard

Drag-and-drop kanban board.

```tsx
import { KanbanBoard } from 'room-ui';

<KanbanBoard
  columns={[
    { id: 'todo', title: 'To Do', items: todoItems },
    { id: 'inprogress', title: 'In Progress', items: inProgressItems },
    { id: 'done', title: 'Done', items: doneItems },
  ]}
  onDragEnd={handleDragEnd}
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/data-display-kanbanboard)

## RichTextEditor

WYSIWYG rich text editor.

```tsx
import { RichTextEditor } from 'room-ui';

<RichTextEditor
  value={content}
  onChange={setContent}
  placeholder="Start writing..."
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-richtexteditor)

## MarkdownEditor

Markdown editing with preview.

```tsx
import { MarkdownEditor } from 'room-ui';

<MarkdownEditor
  value={markdown}
  onChange={setMarkdown}
  preview
/>
```

[View in Storybook →](https://main--6949986ceb769ed38d88c5ee.chromatic.com/?path=/story/forms-markdowneditor)
