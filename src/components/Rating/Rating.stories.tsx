import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './index';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Heart, ThumbsUp } from 'lucide-react';

const meta: Meta<typeof Rating> = {
  title: 'Form Controls/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Rating component for star ratings or reviews.

## Features
- Configurable max stars
- Half-star support
- Custom icons
- Read-only mode
- Hover preview

## Usage
\`\`\`tsx
import { Rating } from 'room-ui';

<Rating
  value={rating}
  onChange={setRating}
  max={5}
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

/**
 * Basic rating
 */
export const Basic: Story = {
  render: () => <Rating defaultValue={3} />,
};

/**
 * With label
 */
export const WithLabel: Story = {
  render: () => <Rating label="Rate your experience" defaultValue={4} />,
};

/**
 * Different max values
 */
export const MaxValues: Story = {
  render: () => (
    <Stack gap="lg">
      <Rating label="3 stars max" max={3} defaultValue={2} />
      <Rating label="5 stars max (default)" max={5} defaultValue={3} />
      <Rating label="10 stars max" max={10} defaultValue={7} />
    </Stack>
  ),
};

/**
 * Allow half stars
 */
export const HalfStars: Story = {
  render: () => (
    <Stack gap="lg">
      <Rating label="Half stars enabled" allowHalf defaultValue={3.5} />
      <Rating label="Without half stars" defaultValue={3} />
    </Stack>
  ),
};

/**
 * Sizes
 */
export const Sizes: Story = {
  render: () => (
    <Stack gap="lg">
      <Rating label="Small" size="sm" defaultValue={4} />
      <Rating label="Medium" size="md" defaultValue={4} />
      <Rating label="Large" size="lg" defaultValue={4} />
    </Stack>
  ),
};

/**
 * Read-only rating
 */
export const ReadOnly: Story = {
  render: () => (
    <Stack gap="lg">
      <Rating label="Read-only (4.5 stars)" value={4.5} readOnly allowHalf />
      <Rating label="Read-only (3 stars)" value={3} readOnly />
    </Stack>
  ),
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => <Rating label="Disabled" defaultValue={3} disabled />,
};

/**
 * Custom icons
 */
export const CustomIcons: Story = {
  render: () => (
    <Stack gap="lg">
      <Rating
        label="Hearts"
        defaultValue={3}
        icon={<Heart className="h-5 w-5 fill-current" />}
        emptyIcon={<Heart className="h-5 w-5" />}
      />
      <Rating
        label="Thumbs up"
        defaultValue={4}
        icon={<ThumbsUp className="h-5 w-5 fill-current" />}
        emptyIcon={<ThumbsUp className="h-5 w-5" />}
      />
    </Stack>
  ),
};

/**
 * Controlled rating
 */
export const Controlled: Story = {
  render: () => {
    const [rating, setRating] = useState(3);

    return (
      <Stack gap="md">
        <Rating
          label="Your rating"
          value={rating}
          onChange={setRating}
        />
        <Text size="sm" className="text-room-text-muted">
          You rated: {rating} star{rating !== 1 ? 's' : ''}
        </Text>
        <button
          onClick={() => setRating(0)}
          className="px-3 py-1.5 text-sm bg-room-bg-surface border border-room-border rounded-room-sm hover:bg-room-bg-hover"
        >
          Clear rating
        </button>
      </Stack>
    );
  },
};

/**
 * Product review example
 */
export const ProductReview: Story = {
  render: () => {
    const [ratings, setRatings] = useState({
      overall: 4,
      quality: 5,
      value: 3,
      shipping: 4,
    });

    return (
      <div className="w-80 p-4 bg-room-bg-surface border border-room-border rounded-room">
        <Text weight="semibold" className="mb-4">Rate your purchase</Text>
        <Stack gap="md">
          <div className="flex justify-between items-center">
            <Text size="sm">Overall</Text>
            <Rating
              size="sm"
              value={ratings.overall}
              onChange={(v) => setRatings({ ...ratings, overall: v })}
            />
          </div>
          <div className="flex justify-between items-center">
            <Text size="sm">Quality</Text>
            <Rating
              size="sm"
              value={ratings.quality}
              onChange={(v) => setRatings({ ...ratings, quality: v })}
            />
          </div>
          <div className="flex justify-between items-center">
            <Text size="sm">Value</Text>
            <Rating
              size="sm"
              value={ratings.value}
              onChange={(v) => setRatings({ ...ratings, value: v })}
            />
          </div>
          <div className="flex justify-between items-center">
            <Text size="sm">Shipping</Text>
            <Rating
              size="sm"
              value={ratings.shipping}
              onChange={(v) => setRatings({ ...ratings, shipping: v })}
            />
          </div>
        </Stack>
        <button className="mt-4 w-full px-4 py-2 bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover">
          Submit Review
        </button>
      </div>
    );
  },
};

/**
 * Rating display with count
 */
export const RatingWithCount: Story = {
  render: () => (
    <Stack gap="lg">
      <div className="flex items-center gap-2">
        <Rating value={4.5} readOnly allowHalf size="sm" />
        <Text size="sm" weight="medium">4.5</Text>
        <Text size="sm" className="text-room-text-muted">(128 reviews)</Text>
      </div>
      <div className="flex items-center gap-2">
        <Rating value={3.8} readOnly allowHalf size="sm" />
        <Text size="sm" weight="medium">3.8</Text>
        <Text size="sm" className="text-room-text-muted">(42 reviews)</Text>
      </div>
    </Stack>
  ),
};
