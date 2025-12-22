import type { Meta, StoryObj } from '@storybook/react';
import {
  MobileProvider,
  useMobileContext,
  MobileOnly,
  DesktopOnly,
  Responsive,
} from './MobileContext';
import { useResponsive, useIsMobile, useBreakpoint } from './useResponsive';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';
import { Badge } from '../Badge';

const meta: Meta = {
  title: 'Mobile/MobileContext',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const ResponsiveInfo = () => {
  const responsive = useResponsive();
  const isMobile = useIsMobile();
  const breakpoint = useBreakpoint();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Responsive Info</CardTitle>
      </CardHeader>
      <CardContent>
        <Stack gap="sm">
          <div className="flex justify-between">
            <Text color="muted">Breakpoint:</Text>
            <Badge>{breakpoint}</Badge>
          </div>
          <div className="flex justify-between">
            <Text color="muted">Width:</Text>
            <Text>{responsive.width}px</Text>
          </div>
          <div className="flex justify-between">
            <Text color="muted">Height:</Text>
            <Text>{responsive.height}px</Text>
          </div>
          <div className="flex justify-between">
            <Text color="muted">Is Mobile:</Text>
            <Badge variant={isMobile ? 'success' : 'default'}>
              {isMobile ? 'Yes' : 'No'}
            </Badge>
          </div>
          <div className="flex justify-between">
            <Text color="muted">Is Desktop:</Text>
            <Badge variant={responsive.isDesktop ? 'success' : 'default'}>
              {responsive.isDesktop ? 'Yes' : 'No'}
            </Badge>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const UseResponsiveHook: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">useResponsive Hook</Text>
        <Text color="muted">
          Resize the browser window to see the values change.
        </Text>
        <ResponsiveInfo />
      </Stack>
    </div>
  ),
};

export const MobileOnlyComponent: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">MobileOnly Component</Text>
        <Text color="muted">
          The card below only appears on mobile screens (below md breakpoint).
        </Text>
        <MobileOnly
          fallback={
            <Card className="border-dashed">
              <CardContent>
                <Text className="text-center" color="muted">
                  Switch to mobile view to see the mobile content
                </Text>
              </CardContent>
            </Card>
          }
        >
          <Card className="border-room-accent border-2">
            <CardContent>
              <Text className="text-center" weight="semibold" color="accent">
                This is mobile-only content!
              </Text>
            </CardContent>
          </Card>
        </MobileOnly>
      </Stack>
    </div>
  ),
};

export const DesktopOnlyComponent: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">DesktopOnly Component</Text>
        <Text color="muted">
          The card below only appears on desktop screens (lg breakpoint and above).
        </Text>
        <DesktopOnly
          fallback={
            <Card className="border-dashed">
              <CardContent>
                <Text className="text-center" color="muted">
                  Switch to desktop view to see the desktop content
                </Text>
              </CardContent>
            </Card>
          }
        >
          <Card className="border-room-success border-2">
            <CardContent>
              <Text className="text-center" weight="semibold" color="success">
                This is desktop-only content!
              </Text>
            </CardContent>
          </Card>
        </DesktopOnly>
      </Stack>
    </div>
  ),
};

export const ResponsiveComponent: Story = {
  render: () => (
    <div className="min-h-screen bg-room-bg-base p-4">
      <Stack gap="lg">
        <Text weight="semibold" size="lg">Responsive Component</Text>
        <Text color="muted">
          Shows different content for mobile, tablet, and desktop.
        </Text>
        <Responsive
          mobile={
            <Card className="border-room-accent border-2">
              <CardContent>
                <Stack gap="sm" className="items-center">
                  <Text size="4xl">📱</Text>
                  <Text weight="semibold" color="accent">Mobile View</Text>
                  <Text color="muted" size="sm">Single column layout</Text>
                </Stack>
              </CardContent>
            </Card>
          }
          tablet={
            <Card className="border-room-warning border-2">
              <CardContent>
                <Stack gap="sm" className="items-center">
                  <Text size="4xl">📲</Text>
                  <Text weight="semibold" color="warning">Tablet View</Text>
                  <Text color="muted" size="sm">Two column layout</Text>
                </Stack>
              </CardContent>
            </Card>
          }
          desktop={
            <Card className="border-room-success border-2">
              <CardContent>
                <Stack gap="sm" className="items-center">
                  <Text size="4xl">🖥️</Text>
                  <Text weight="semibold" color="success">Desktop View</Text>
                  <Text color="muted" size="sm">Full three column layout</Text>
                </Stack>
              </CardContent>
            </Card>
          }
        />
      </Stack>
    </div>
  ),
};

const MobileContextConsumer = () => {
  const context = useMobileContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mobile Context</CardTitle>
      </CardHeader>
      <CardContent>
        <Stack gap="sm">
          <div className="flex justify-between">
            <Text color="muted">Has Touch:</Text>
            <Badge variant={context.hasTouch ? 'success' : 'default'}>
              {context.hasTouch ? 'Yes' : 'No'}
            </Badge>
          </div>
          <div className="flex justify-between">
            <Text color="muted">Prefer Touch:</Text>
            <Badge variant={context.preferTouch ? 'success' : 'default'}>
              {context.preferTouch ? 'Yes' : 'No'}
            </Badge>
          </div>
          <div className="flex justify-between">
            <Text color="muted">Is Mobile:</Text>
            <Badge variant={context.isMobile ? 'success' : 'default'}>
              {context.isMobile ? 'Yes' : 'No'}
            </Badge>
          </div>
          <div className="flex justify-between">
            <Text color="muted">Is Tablet:</Text>
            <Badge variant={context.isTablet ? 'success' : 'default'}>
              {context.isTablet ? 'Yes' : 'No'}
            </Badge>
          </div>
          <div className="flex justify-between">
            <Text color="muted">Is Desktop:</Text>
            <Badge variant={context.isDesktop ? 'success' : 'default'}>
              {context.isDesktop ? 'Yes' : 'No'}
            </Badge>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const WithMobileProvider: Story = {
  render: () => (
    <MobileProvider>
      <div className="min-h-screen bg-room-bg-base p-4">
        <Stack gap="lg">
          <Text weight="semibold" size="lg">MobileProvider</Text>
          <Text color="muted">
            Provides mobile context to child components.
          </Text>
          <MobileContextConsumer />
        </Stack>
      </div>
    </MobileProvider>
  ),
};

export const ForcedMobile: Story = {
  render: () => (
    <MobileProvider forceMobile>
      <div className="min-h-screen bg-room-bg-base p-4">
        <Stack gap="lg">
          <Text weight="semibold" size="lg">Forced Mobile Mode</Text>
          <Text color="muted">
            Even on desktop, the context reports mobile mode.
          </Text>
          <MobileContextConsumer />
          <MobileOnly>
            <Card className="border-room-accent border-2">
              <CardContent>
                <Text className="text-center" color="accent">
                  This appears because mobile mode is forced!
                </Text>
              </CardContent>
            </Card>
          </MobileOnly>
        </Stack>
      </div>
    </MobileProvider>
  ),
};

export const ForcedDesktop: Story = {
  render: () => (
    <MobileProvider forceDesktop>
      <div className="min-h-screen bg-room-bg-base p-4">
        <Stack gap="lg">
          <Text weight="semibold" size="lg">Forced Desktop Mode</Text>
          <Text color="muted">
            Even on mobile, the context reports desktop mode.
          </Text>
          <MobileContextConsumer />
          <DesktopOnly>
            <Card className="border-room-success border-2">
              <CardContent>
                <Text className="text-center" color="success">
                  This appears because desktop mode is forced!
                </Text>
              </CardContent>
            </Card>
          </DesktopOnly>
        </Stack>
      </div>
    </MobileProvider>
  ),
};
