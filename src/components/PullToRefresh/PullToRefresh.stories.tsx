import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PullToRefresh } from './PullToRefresh';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Card, CardContent } from '../Card';
import { Spinner } from '../Spinner';

const meta: Meta<typeof PullToRefresh> = {
  title: 'Mobile/PullToRefresh',
  component: PullToRefresh,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PullToRefresh>;

export const Default: Story = {
  render: function DefaultStory() {
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
    const [refreshCount, setRefreshCount] = useState(0);

    const handleRefresh = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setRefreshCount((prev) => prev + 1);
      setItems((prev) => [`New Item ${refreshCount + 1}`, ...prev.slice(0, 4)]);
    };

    return (
      <div className="min-h-screen bg-room-bg-base">
        <div className="sticky top-0 bg-room-bg-elevated p-4 border-b border-room-border z-10">
          <Text weight="medium">Pull to Refresh Demo</Text>
          <Text color="muted" size="sm">Pull down on the content to refresh</Text>
        </div>
        <PullToRefresh onRefresh={handleRefresh} className="h-[calc(100vh-80px)]">
          <Stack gap="md" className="p-4">
            {items.map((item, i) => (
              <Card key={`${item}-${i}`}>
                <CardContent>
                  <Text>{item}</Text>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </PullToRefresh>
      </div>
    );
  },
};

export const CustomThreshold: Story = {
  render: function CustomThresholdStory() {
    const handleRefresh = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    return (
      <div className="min-h-screen bg-room-bg-base">
        <div className="sticky top-0 bg-room-bg-elevated p-4 border-b border-room-border z-10">
          <Text weight="medium">Custom Threshold (120px)</Text>
          <Text color="muted" size="sm">Requires a longer pull to trigger refresh</Text>
        </div>
        <PullToRefresh
          onRefresh={handleRefresh}
          threshold={120}
          maxPull={200}
          className="h-[calc(100vh-80px)]"
        >
          <Stack gap="md" className="p-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Card key={i}>
                <CardContent>
                  <Text>Item {i + 1}</Text>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </PullToRefresh>
      </div>
    );
  },
};

export const CustomIndicator: Story = {
  render: function CustomIndicatorStory() {
    const handleRefresh = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    const CustomLoader = () => (
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <Text color="muted" size="sm">Loading...</Text>
      </div>
    );

    return (
      <div className="min-h-screen bg-room-bg-base">
        <div className="sticky top-0 bg-room-bg-elevated p-4 border-b border-room-border z-10">
          <Text weight="medium">Custom Loading Indicator</Text>
        </div>
        <PullToRefresh
          onRefresh={handleRefresh}
          loadingIndicator={<CustomLoader />}
          className="h-[calc(100vh-80px)]"
        >
          <Stack gap="md" className="p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i}>
                <CardContent>
                  <Text>Content item {i + 1}</Text>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </PullToRefresh>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: function DisabledStory() {
    const handleRefresh = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    return (
      <div className="min-h-screen bg-room-bg-base">
        <div className="sticky top-0 bg-room-bg-elevated p-4 border-b border-room-border z-10">
          <Text weight="medium">Pull to Refresh Disabled</Text>
          <Text color="muted" size="sm">Pulling down will not trigger refresh</Text>
        </div>
        <PullToRefresh
          onRefresh={handleRefresh}
          disabled
          className="h-[calc(100vh-80px)]"
        >
          <Stack gap="md" className="p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardContent>
                  <Text>Item {i + 1}</Text>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </PullToRefresh>
      </div>
    );
  },
};

export const Feed: Story = {
  render: function FeedStory() {
    const [posts, setPosts] = useState([
      { id: 1, author: 'Alice', content: 'Just launched a new feature!' },
      { id: 2, author: 'Bob', content: 'Working on something exciting...' },
      { id: 3, author: 'Carol', content: 'Check out this cool project!' },
    ]);

    const handleRefresh = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newPost = {
        id: Date.now(),
        author: ['Alice', 'Bob', 'Carol', 'Dave'][Math.floor(Math.random() * 4)],
        content: ['Great news!', 'New update!', 'Amazing work!'][Math.floor(Math.random() * 3)],
      };
      setPosts((prev) => [newPost, ...prev]);
    };

    return (
      <div className="min-h-screen bg-room-bg-base">
        <div className="sticky top-0 bg-room-bg-elevated p-4 border-b border-room-border z-10">
          <Text weight="semibold" size="lg">Feed</Text>
        </div>
        <PullToRefresh onRefresh={handleRefresh} className="h-[calc(100vh-60px)]">
          <Stack gap="md" className="p-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent>
                  <Text weight="medium">{post.author}</Text>
                  <Text color="muted" size="sm">{post.content}</Text>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </PullToRefresh>
      </div>
    );
  },
};
