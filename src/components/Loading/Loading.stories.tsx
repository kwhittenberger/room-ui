import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from './Loading';
import { Skeleton } from './Skeleton';
import { SkeletonCard } from './SkeletonCard';
import { SkeletonTable } from './SkeletonTable';

// Loading Stories
const loadingMeta: Meta<typeof Loading> = {
  title: 'Data Display/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default loadingMeta;
type LoadingStory = StoryObj<typeof Loading>;

export const Default: LoadingStory = {
  args: {},
};

export const WithLabel: LoadingStory = {
  args: {
    label: 'Loading data...',
  },
};

export const Sizes: LoadingStory = {
  render: () => (
    <div className="flex items-end gap-8">
      <Loading size="sm" label="Small" />
      <Loading size="md" label="Medium" />
      <Loading size="lg" label="Large" />
    </div>
  ),
};

export const FullScreen: LoadingStory = {
  args: {
    fullScreen: true,
    label: 'Loading application...',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Overlay: LoadingStory = {
  render: () => (
    <div className="relative w-80 h-48 bg-room-bg-elevated rounded-room border border-room-border p-4">
      <h3 className="text-lg font-semibold text-room-text-primary">Card Content</h3>
      <p className="text-room-text-secondary mt-2">
        This content is behind the loading overlay.
      </p>
      <Loading overlay label="Saving..." />
    </div>
  ),
};

// Skeleton Stories
export const SkeletonBasic: StoryObj<typeof Skeleton> = {
  name: 'Skeleton - Basic',
  render: () => (
    <div className="space-y-4 w-64">
      <Skeleton height={20} width="100%" />
      <Skeleton height={20} width="80%" />
      <Skeleton height={20} width="60%" />
    </div>
  ),
};

export const SkeletonVariants: StoryObj<typeof Skeleton> = {
  name: 'Skeleton - Variants',
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" height={16} width="40%" />
        <Skeleton variant="text" height={14} width="70%" />
      </div>
      <Skeleton variant="rectangular" width={80} height={40} />
    </div>
  ),
};

export const SkeletonAnimations: StoryObj<typeof Skeleton> = {
  name: 'Skeleton - Animations',
  render: () => (
    <div className="space-y-6 w-64">
      <div>
        <p className="text-sm text-room-text-muted mb-2">Pulse (default)</p>
        <Skeleton animation="pulse" height={40} width="100%" />
      </div>
      <div>
        <p className="text-sm text-room-text-muted mb-2">Wave</p>
        <Skeleton animation="wave" height={40} width="100%" />
      </div>
      <div>
        <p className="text-sm text-room-text-muted mb-2">None</p>
        <Skeleton animation="none" height={40} width="100%" />
      </div>
    </div>
  ),
};

// SkeletonCard Stories
export const SkeletonCardDefault: StoryObj<typeof SkeletonCard> = {
  name: 'SkeletonCard - Default',
  render: () => (
    <div className="w-80">
      <SkeletonCard />
    </div>
  ),
};

export const SkeletonCardVariations: StoryObj<typeof SkeletonCard> = {
  name: 'SkeletonCard - Variations',
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="w-64">
        <p className="text-sm text-room-text-muted mb-2">Full card</p>
        <SkeletonCard />
      </div>
      <div className="w-64">
        <p className="text-sm text-room-text-muted mb-2">No image</p>
        <SkeletonCard showImage={false} />
      </div>
      <div className="w-64">
        <p className="text-sm text-room-text-muted mb-2">Title only</p>
        <SkeletonCard showImage={false} showDescription={false} />
      </div>
    </div>
  ),
};

export const SkeletonCardGrid: StoryObj<typeof SkeletonCard> = {
  name: 'SkeletonCard - Grid',
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[800px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} lines={2} />
      ))}
    </div>
  ),
};

// SkeletonTable Stories
export const SkeletonTableDefault: StoryObj<typeof SkeletonTable> = {
  name: 'SkeletonTable - Default',
  render: () => (
    <div className="w-[600px]">
      <SkeletonTable />
    </div>
  ),
};

export const SkeletonTableCustom: StoryObj<typeof SkeletonTable> = {
  name: 'SkeletonTable - Custom',
  render: () => (
    <div className="w-[800px]">
      <SkeletonTable rows={8} columns={6} />
    </div>
  ),
};

export const SkeletonTableNoHeader: StoryObj<typeof SkeletonTable> = {
  name: 'SkeletonTable - No Header',
  render: () => (
    <div className="w-[600px]">
      <SkeletonTable showHeader={false} rows={4} columns={3} />
    </div>
  ),
};

// Real-world example: Loading states
export const RealWorldExample: LoadingStory = {
  name: 'Real World - Dashboard Loading',
  render: () => (
    <div className="w-[900px] space-y-6 p-4 bg-room-bg-base">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width={200} height={32} />
        <div className="flex gap-2">
          <Skeleton variant="rectangular" width={100} height={36} />
          <Skeleton variant="rectangular" width={100} height={36} />
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 bg-room-bg-elevated rounded-room border border-room-border">
            <Skeleton variant="text" width="60%" height={14} />
            <Skeleton variant="text" width="40%" height={28} className="mt-2" />
          </div>
        ))}
      </div>

      {/* Table and sidebar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <SkeletonTable rows={6} columns={5} />
        </div>
        <div className="space-y-4">
          <SkeletonCard showImage={false} lines={4} />
          <SkeletonCard showImage={false} lines={3} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
