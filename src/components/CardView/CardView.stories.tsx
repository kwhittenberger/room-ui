import type { Meta, StoryObj } from '@storybook/react';
import { CardView } from './CardView';
import { Badge } from '../Badge';
import { Button } from '../Button';

const meta: Meta<typeof CardView> = {
  title: 'Components/CardView',
  component: CardView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CardView>;

const sampleItems = [
  {
    data: { id: 1 },
    title: 'Project Alpha',
    subtitle: 'Web Development',
    description: 'A comprehensive web application for managing customer relationships.',
    badge: <Badge variant="success">Active</Badge>,
    metadata: [
      { label: 'Team Size', value: '5 members' },
      { label: 'Progress', value: '75%' },
    ],
  },
  {
    data: { id: 2 },
    title: 'Project Beta',
    subtitle: 'Mobile App',
    description: 'Cross-platform mobile application for iOS and Android.',
    badge: <Badge variant="primary">In Progress</Badge>,
    metadata: [
      { label: 'Team Size', value: '3 members' },
      { label: 'Progress', value: '40%' },
    ],
  },
  {
    data: { id: 3 },
    title: 'Project Gamma',
    subtitle: 'Data Analytics',
    description: 'Business intelligence dashboard with real-time analytics.',
    badge: <Badge variant="warning">On Hold</Badge>,
    metadata: [
      { label: 'Team Size', value: '4 members' },
      { label: 'Progress', value: '20%' },
    ],
  },
  {
    data: { id: 4 },
    title: 'Project Delta',
    subtitle: 'Infrastructure',
    description: 'Cloud infrastructure migration and optimization.',
    badge: <Badge variant="default">Planning</Badge>,
    metadata: [
      { label: 'Team Size', value: '2 members' },
      { label: 'Progress', value: '5%' },
    ],
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    onItemClick: (item) => alert(`Clicked item ${(item as { id: number }).id}`),
  },
};

export const TwoColumns: Story = {
  args: {
    items: sampleItems,
    columns: 2,
    onItemClick: (item) => alert(`Clicked item ${(item as { id: number }).id}`),
  },
};

export const FourColumns: Story = {
  args: {
    items: sampleItems,
    columns: 4,
  },
};

export const CompactVariant: Story = {
  args: {
    items: sampleItems.map((item) => ({
      ...item,
      description: undefined,
      metadata: undefined,
    })),
    variant: 'compact',
    columns: 4,
  },
};

export const WithImages: Story = {
  args: {
    items: [
      {
        data: { id: 1 },
        title: 'Mountain View',
        subtitle: 'Nature Photography',
        image: 'https://picsum.photos/seed/1/400/200',
        badge: <Badge variant="primary">Featured</Badge>,
      },
      {
        data: { id: 2 },
        title: 'City Skyline',
        subtitle: 'Urban Photography',
        image: 'https://picsum.photos/seed/2/400/200',
      },
      {
        data: { id: 3 },
        title: 'Ocean Sunset',
        subtitle: 'Landscape',
        image: 'https://picsum.photos/seed/3/400/200',
      },
    ],
    columns: 3,
  },
};

export const WithFooter: Story = {
  args: {
    items: sampleItems.slice(0, 2).map((item) => ({
      ...item,
      footer: (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost">
            View
          </Button>
          <Button size="sm" variant="primary">
            Edit
          </Button>
        </div>
      ),
    })),
    columns: 2,
  },
};

export const EmptyState: Story = {
  args: {
    items: [],
    emptyState: (
      <div className="text-center py-12">
        <p className="text-slate-400">No items to display</p>
        <Button className="mt-4" variant="primary">
          Add New Item
        </Button>
      </div>
    ),
  },
};
