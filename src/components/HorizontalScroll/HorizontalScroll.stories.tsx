import type { Meta, StoryObj } from '@storybook/react';
import { HorizontalScroll } from './HorizontalScroll';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Card, CardContent } from '../Card';

const meta: Meta<typeof HorizontalScroll> = {
  title: 'Mobile/HorizontalScroll',
  component: HorizontalScroll,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HorizontalScroll>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">Horizontal Scroll</Text>
        <HorizontalScroll>
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="flex-shrink-0 w-48">
              <CardContent>
                <Text weight="medium">Card {i + 1}</Text>
                <Text color="muted" size="sm">Scroll horizontally</Text>
              </CardContent>
            </Card>
          ))}
        </HorizontalScroll>
      </Stack>
    </div>
  ),
};

export const WithIndicators: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">With Scroll Indicators</Text>
        <HorizontalScroll showIndicators>
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="flex-shrink-0 w-64">
              <CardContent>
                <div className="h-32 flex items-center justify-center bg-room-bg-elevated rounded-room">
                  <Text weight="semibold" size="xl">Slide {i + 1}</Text>
                </div>
              </CardContent>
            </Card>
          ))}
        </HorizontalScroll>
      </Stack>
    </div>
  ),
};

export const SnapCenter: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">Center Snap</Text>
        <Text color="muted">Cards snap to the center when scrolling.</Text>
        <HorizontalScroll snap="center" showIndicators>
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="flex-shrink-0 w-72">
              <CardContent>
                <div className="h-40 flex items-center justify-center bg-gradient-to-br from-room-accent/20 to-room-accent/5 rounded-room">
                  <Text weight="semibold" size="2xl">Featured {i + 1}</Text>
                </div>
              </CardContent>
            </Card>
          ))}
        </HorizontalScroll>
      </Stack>
    </div>
  ),
};

export const NoSnap: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">Free Scroll (No Snap)</Text>
        <HorizontalScroll snap="none">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="flex-shrink-0 w-40">
              <CardContent>
                <Text weight="medium">Item {i + 1}</Text>
              </CardContent>
            </Card>
          ))}
        </HorizontalScroll>
      </Stack>
    </div>
  ),
};

export const DifferentGaps: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="xl">
        <div>
          <Text weight="semibold" size="lg" className="mb-2">Small Gap</Text>
          <HorizontalScroll gap="sm">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="flex-shrink-0 w-32">
                <CardContent className="p-3">
                  <Text size="sm">Card {i + 1}</Text>
                </CardContent>
              </Card>
            ))}
          </HorizontalScroll>
        </div>

        <div>
          <Text weight="semibold" size="lg" className="mb-2">Medium Gap</Text>
          <HorizontalScroll gap="md">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="flex-shrink-0 w-32">
                <CardContent className="p-3">
                  <Text size="sm">Card {i + 1}</Text>
                </CardContent>
              </Card>
            ))}
          </HorizontalScroll>
        </div>

        <div>
          <Text weight="semibold" size="lg" className="mb-2">Large Gap</Text>
          <HorizontalScroll gap="lg">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="flex-shrink-0 w-32">
                <CardContent className="p-3">
                  <Text size="sm">Card {i + 1}</Text>
                </CardContent>
              </Card>
            ))}
          </HorizontalScroll>
        </div>
      </Stack>
    </div>
  ),
};

export const ProductCarousel: Story = {
  render: () => {
    const products = [
      { name: 'Headphones', price: '$299', color: 'from-blue-500/20' },
      { name: 'Keyboard', price: '$149', color: 'from-purple-500/20' },
      { name: 'Mouse', price: '$79', color: 'from-green-500/20' },
      { name: 'Monitor', price: '$499', color: 'from-orange-500/20' },
      { name: 'Webcam', price: '$129', color: 'from-pink-500/20' },
    ];

    return (
      <div className="min-h-screen bg-room-bg-base p-4">
        <Stack gap="lg">
          <Text weight="semibold" size="lg">Featured Products</Text>
          <HorizontalScroll showIndicators>
            {products.map((product, i) => (
              <Card key={i} className="flex-shrink-0 w-56">
                <div className={`h-32 bg-gradient-to-br ${product.color} to-transparent`} />
                <CardContent>
                  <Text weight="medium">{product.name}</Text>
                  <Text color="muted">{product.price}</Text>
                </CardContent>
              </Card>
            ))}
          </HorizontalScroll>
        </Stack>
      </div>
    );
  },
};

export const ChipFilters: Story = {
  render: () => {
    const categories = [
      'All', 'Electronics', 'Clothing', 'Home & Garden', 'Sports',
      'Books', 'Toys', 'Automotive', 'Beauty', 'Health',
    ];

    return (
      <div className="min-h-screen bg-room-bg-base p-4">
        <Stack gap="lg">
          <Text weight="semibold" size="lg">Filter Categories</Text>
          <HorizontalScroll gap="sm" snap="none" showArrows={false}>
            {categories.map((category, i) => (
              <button
                key={category}
                className={`flex-shrink-0 px-4 py-2 rounded-full transition-colors ${
                  i === 0
                    ? 'bg-room-accent text-room-text-on-accent'
                    : 'bg-room-bg-elevated text-room-text-primary hover:bg-room-bg-hover'
                }`}
              >
                <Text size="sm">{category}</Text>
              </button>
            ))}
          </HorizontalScroll>
        </Stack>
      </div>
    );
  },
};
