import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Edit, Send, Mic, Camera, MessageSquare } from 'lucide-react';
import { FloatingActionButton } from './FloatingActionButton';
import { useFABScroll } from './useFABScroll';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Card, CardContent } from '../Card';

const meta: Meta<typeof FloatingActionButton> = {
  title: 'Mobile/FloatingActionButton',
  component: FloatingActionButton,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

const SampleContent = () => (
  <Stack gap="md" className="p-4 pb-20">
    {Array.from({ length: 15 }).map((_, i) => (
      <Card key={i}>
        <CardContent>
          <Text>Sample card content {i + 1}</Text>
        </CardContent>
      </Card>
    ))}
  </Stack>
);

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base">
      <SampleContent />
      <FloatingActionButton
        icon={Plus}
        aria-label="Add new item"
        onClick={() => console.log('FAB clicked')}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">FAB Sizes</Text>
        <div className="relative h-40">
          <FloatingActionButton
            icon={Plus}
            size="sm"
            position="bottom-left"
            aria-label="Small FAB"
            onClick={() => console.log('Small')}
          />
          <FloatingActionButton
            icon={Plus}
            size="md"
            position="bottom-center"
            aria-label="Medium FAB"
            onClick={() => console.log('Medium')}
          />
          <FloatingActionButton
            icon={Plus}
            size="lg"
            position="bottom-right"
            aria-label="Large FAB"
            onClick={() => console.log('Large')}
          />
        </div>
      </Stack>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">FAB Positions</Text>
        <Text color="muted">
          FABs can be positioned at bottom-left, bottom-center, or bottom-right.
        </Text>
      </Stack>
      <FloatingActionButton
        icon={MessageSquare}
        position="bottom-left"
        aria-label="Bottom left"
        onClick={() => console.log('Left')}
      />
      <FloatingActionButton
        icon={Plus}
        position="bottom-center"
        aria-label="Bottom center"
        onClick={() => console.log('Center')}
      />
      <FloatingActionButton
        icon={Edit}
        position="bottom-right"
        aria-label="Bottom right"
        onClick={() => console.log('Right')}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">FAB Variants</Text>
        <Text color="muted">Primary (accent color) and Secondary (elevated)</Text>
      </Stack>
      <FloatingActionButton
        icon={Plus}
        variant="primary"
        position="bottom-left"
        aria-label="Primary FAB"
        onClick={() => console.log('Primary')}
      />
      <FloatingActionButton
        icon={Edit}
        variant="secondary"
        position="bottom-right"
        aria-label="Secondary FAB"
        onClick={() => console.log('Secondary')}
      />
    </div>
  ),
};

export const Extended: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">Extended FAB</Text>
        <Text color="muted">FAB with a label for better clarity.</Text>
      </Stack>
      <FloatingActionButton
        icon={Plus}
        label="Create New"
        aria-label="Create new item"
        onClick={() => console.log('Extended FAB')}
      />
    </div>
  ),
};

export const WithScrollHide: Story = {
  render: function ScrollHideStory() {
    const { visible } = useFABScroll({ threshold: 20 });

    return (
      <div className="min-h-screen bg-room-bg-base">
        <div className="sticky top-0 bg-room-bg-elevated p-4 border-b border-room-border z-10">
          <Text>Scroll down to hide the FAB, scroll up to show it.</Text>
        </div>
        <SampleContent />
        <FloatingActionButton
          icon={Plus}
          visible={visible}
          aria-label="Add new item"
          onClick={() => console.log('FAB clicked')}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">Disabled FAB</Text>
        <Text color="muted">FAB can be disabled to prevent interaction.</Text>
      </Stack>
      <FloatingActionButton
        icon={Plus}
        disabled
        aria-label="Disabled FAB"
        onClick={() => console.log('Should not fire')}
      />
    </div>
  ),
};

export const DifferentIcons: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">Different Icons</Text>
        <Text color="muted">FABs with various icons for different actions.</Text>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative h-24">
            <FloatingActionButton
              icon={Plus}
              size="sm"
              className="!relative !bottom-auto !right-auto"
              aria-label="Add"
            />
          </div>
          <div className="relative h-24">
            <FloatingActionButton
              icon={Edit}
              size="sm"
              className="!relative !bottom-auto !right-auto"
              aria-label="Edit"
            />
          </div>
          <div className="relative h-24">
            <FloatingActionButton
              icon={Send}
              size="sm"
              className="!relative !bottom-auto !right-auto"
              aria-label="Send"
            />
          </div>
          <div className="relative h-24">
            <FloatingActionButton
              icon={Mic}
              size="sm"
              className="!relative !bottom-auto !right-auto"
              aria-label="Record"
            />
          </div>
          <div className="relative h-24">
            <FloatingActionButton
              icon={Camera}
              size="sm"
              className="!relative !bottom-auto !right-auto"
              aria-label="Camera"
            />
          </div>
          <div className="relative h-24">
            <FloatingActionButton
              icon={MessageSquare}
              size="sm"
              className="!relative !bottom-auto !right-auto"
              aria-label="Message"
            />
          </div>
        </div>
      </Stack>
    </div>
  ),
};
