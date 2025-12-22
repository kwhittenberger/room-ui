import type { Meta, StoryObj } from '@storybook/react';
import { TwoColumnContent } from './TwoColumnContent';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

const meta: Meta<typeof TwoColumnContent> = {
  title: 'Layout/TwoColumnContent',
  component: TwoColumnContent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TwoColumnContent>;

const LeftPanel = () => (
  <Card>
    <CardHeader>
      <CardTitle>Left Column</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-room-text-secondary">
        This is the left column content. It can contain forms, navigation,
        or any other content you need.
      </p>
    </CardContent>
  </Card>
);

const RightPanel = () => (
  <Card>
    <CardHeader>
      <CardTitle>Right Column</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-room-text-secondary">
        This is the right column content. Great for previews, details panels,
        or supplementary information.
      </p>
    </CardContent>
  </Card>
);

// Default 1:1 ratio
export const Default: Story = {
  args: {
    left: <LeftPanel />,
    right: <RightPanel />,
  },
};

// 1:2 ratio
export const Ratio1To2: Story = {
  args: {
    left: <LeftPanel />,
    right: <RightPanel />,
    ratio: '1:2',
  },
};

// 2:1 ratio
export const Ratio2To1: Story = {
  args: {
    left: <LeftPanel />,
    right: <RightPanel />,
    ratio: '2:1',
  },
};

// 1:3 ratio
export const Ratio1To3: Story = {
  args: {
    left: (
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-room-text-muted">Narrow sidebar</p>
        </CardContent>
      </Card>
    ),
    right: (
      <Card>
        <CardHeader>
          <CardTitle>Main Content</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-room-text-secondary">
            This is the main content area taking up 3/4 of the space.
          </p>
        </CardContent>
      </Card>
    ),
    ratio: '1:3',
  },
};

// 3:1 ratio
export const Ratio3To1: Story = {
  args: {
    left: (
      <Card>
        <CardHeader>
          <CardTitle>Main Content</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-room-text-secondary">
            This is the main content area taking up 3/4 of the space.
          </p>
        </CardContent>
      </Card>
    ),
    right: (
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-room-text-muted">Narrow sidebar</p>
        </CardContent>
      </Card>
    ),
    ratio: '3:1',
  },
};

// Small gap
export const SmallGap: Story = {
  args: {
    left: <LeftPanel />,
    right: <RightPanel />,
    gap: 'sm',
  },
};

// Large gap
export const LargeGap: Story = {
  args: {
    left: <LeftPanel />,
    right: <RightPanel />,
    gap: 'lg',
  },
};

// Not stacked on mobile
export const NotStackedOnMobile: Story = {
  args: {
    left: <LeftPanel />,
    right: <RightPanel />,
    stackOnMobile: false,
  },
};

// Reverse on mobile
export const ReverseOnMobile: Story = {
  args: {
    left: (
      <Card>
        <CardHeader>
          <CardTitle>Secondary (shows second on mobile)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-room-text-secondary">
            This appears second on mobile but first on desktop.
          </p>
        </CardContent>
      </Card>
    ),
    right: (
      <Card>
        <CardHeader>
          <CardTitle>Primary (shows first on mobile)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-room-text-secondary">
            This appears first on mobile but second on desktop.
          </p>
        </CardContent>
      </Card>
    ),
    reverseOnMobile: true,
  },
};

// Master-detail pattern
export const MasterDetail: Story = {
  render: () => (
    <TwoColumnContent
      ratio="1:2"
      gap="md"
      left={
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((item, i) => (
                <button
                  key={item}
                  className={`w-full text-left px-3 py-2 rounded-room-sm ${
                    i === 0
                      ? 'bg-room-accent text-white'
                      : 'text-room-text-secondary hover:bg-room-bg-hover'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      }
      right={
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Item 1 Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-room-text-muted">Name</p>
                <p className="text-room-text-primary">Item 1</p>
              </div>
              <div>
                <p className="text-sm text-room-text-muted">Description</p>
                <p className="text-room-text-secondary">
                  Detailed information about the selected item goes here.
                </p>
              </div>
              <div>
                <p className="text-sm text-room-text-muted">Status</p>
                <p className="text-room-success">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      }
    />
  ),
};
