import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Folder, FileText, Image, Code, Settings, Database, Globe, Package, Coffee, Music, Video, FileCode, FileCog, FileJson, FileArchive } from 'lucide-react';
import { TreeView, TreeNode } from './TreeView';

const meta: Meta<typeof TreeView> = {
  title: 'Data Display/TreeView',
  component: TreeView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TreeView>;

// Basic file tree data
const basicData: TreeNode[] = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1-1', label: 'Resume.pdf' },
      { id: '1-2', label: 'Cover Letter.docx' },
      {
        id: '1-3',
        label: 'Projects',
        children: [
          { id: '1-3-1', label: 'Project A.pdf' },
          { id: '1-3-2', label: 'Project B.pdf' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Images',
    children: [
      { id: '2-1', label: 'photo1.jpg' },
      { id: '2-2', label: 'photo2.png' },
    ],
  },
  { id: '3', label: 'Notes.txt' },
];

// Basic examples
export const Default: Story = {
  args: {
    data: basicData,
  },
};

export const WithDefaultExpanded: Story = {
  args: {
    data: basicData,
    defaultExpandedIds: ['1', '1-3'],
  },
};

// With custom icons
const projectData: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: <Folder className="h-4 w-4 text-room-warning" />,
    children: [
      {
        id: 'components',
        label: 'components',
        icon: <Folder className="h-4 w-4 text-room-warning" />,
        children: [
          {
            id: 'button',
            label: 'Button.tsx',
            icon: <FileCode className="h-4 w-4 text-room-accent" />,
          },
          {
            id: 'card',
            label: 'Card.tsx',
            icon: <FileCode className="h-4 w-4 text-room-accent" />,
          },
          {
            id: 'index',
            label: 'index.ts',
            icon: <FileCode className="h-4 w-4 text-room-accent" />,
          },
        ],
      },
      {
        id: 'utils',
        label: 'utils',
        icon: <Folder className="h-4 w-4 text-room-warning" />,
        children: [
          {
            id: 'cn',
            label: 'cn.ts',
            icon: <FileCode className="h-4 w-4 text-room-accent" />,
          },
        ],
      },
      {
        id: 'app',
        label: 'App.tsx',
        icon: <FileCode className="h-4 w-4 text-room-accent" />,
      },
    ],
  },
  {
    id: 'package',
    label: 'package.json',
    icon: <FileJson className="h-4 w-4 text-room-success" />,
  },
  {
    id: 'tsconfig',
    label: 'tsconfig.json',
    icon: <FileCog className="h-4 w-4 text-room-text-muted" />,
  },
];

export const WithCustomIcons: Story = {
  args: {
    data: projectData,
    defaultExpandedIds: ['src', 'components'],
  },
};

// Single selection
export const SingleSelection: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | undefined>();

    return (
      <div>
        <p className="text-sm text-room-text-muted mb-4">
          Selected: {selectedId || 'None'}
        </p>
        <TreeView
          data={basicData}
          defaultExpandedIds={['1']}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
    );
  },
};

// Multi selection
export const MultiSelection: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <div>
        <p className="text-sm text-room-text-muted mb-4">
          Selected: {selectedIds.length > 0 ? selectedIds.join(', ') : 'None'}
        </p>
        <TreeView
          data={basicData}
          defaultExpandedIds={['1', '2']}
          multiSelect
          selectedIds={selectedIds}
          onSelectedChange={setSelectedIds}
        />
      </div>
    );
  },
};

// Controlled expansion
export const ControlledExpansion: Story = {
  render: () => {
    const [expandedIds, setExpandedIds] = useState<string[]>(['1']);

    const expandAll = () => {
      setExpandedIds(['1', '1-3', '2']);
    };

    const collapseAll = () => {
      setExpandedIds([]);
    };

    return (
      <div>
        <div className="flex gap-2 mb-4">
          <button
            onClick={expandAll}
            className="px-3 py-1 text-sm bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1 text-sm bg-room-bg-surface text-room-text-primary rounded-room-sm hover:bg-room-bg-hover border border-room-border"
          >
            Collapse All
          </button>
        </div>
        <TreeView
          data={basicData}
          expandedIds={expandedIds}
          onExpandedChange={setExpandedIds}
        />
      </div>
    );
  },
};

// With disabled nodes
const dataWithDisabled: TreeNode[] = [
  {
    id: '1',
    label: 'Available Folder',
    children: [
      { id: '1-1', label: 'File 1.txt' },
      { id: '1-2', label: 'Locked File.txt', disabled: true },
      { id: '1-3', label: 'File 3.txt' },
    ],
  },
  {
    id: '2',
    label: 'Restricted Folder',
    disabled: true,
    children: [
      { id: '2-1', label: 'Secret.txt' },
    ],
  },
  { id: '3', label: 'Public File.txt' },
];

export const WithDisabledNodes: Story = {
  args: {
    data: dataWithDisabled,
    defaultExpandedIds: ['1'],
  },
};

// Custom node renderer
export const CustomNodeRenderer: Story = {
  render: () => {
    const dataWithSize: (TreeNode & { data?: { size?: string } })[] = [
      {
        id: '1',
        label: 'Documents',
        data: { size: '15 MB' },
        children: [
          { id: '1-1', label: 'Report.pdf', data: { size: '2.5 MB' } },
          { id: '1-2', label: 'Presentation.pptx', data: { size: '8 MB' } },
          { id: '1-3', label: 'Notes.txt', data: { size: '12 KB' } },
        ],
      },
      {
        id: '2',
        label: 'Downloads',
        data: { size: '120 MB' },
        children: [
          { id: '2-1', label: 'installer.exe', data: { size: '85 MB' } },
          { id: '2-2', label: 'archive.zip', data: { size: '35 MB' } },
        ],
      },
    ];

    return (
      <TreeView
        data={dataWithSize}
        defaultExpandedIds={['1']}
        renderNode={(node) => (
          <div className="flex items-center justify-between flex-1 mr-2">
            <span className="text-sm truncate">{node.label}</span>
            {(node as typeof dataWithSize[0]).data?.size && (
              <span className="text-xs text-room-text-muted ml-2">
                {(node as typeof dataWithSize[0]).data?.size}
              </span>
            )}
          </div>
        )}
      />
    );
  },
};

// Media library
const mediaData: TreeNode[] = [
  {
    id: 'music',
    label: 'Music',
    icon: <Music className="h-4 w-4 text-room-success" />,
    children: [
      {
        id: 'rock',
        label: 'Rock',
        icon: <Folder className="h-4 w-4 text-room-warning" />,
        children: [
          { id: 'rock-1', label: 'song1.mp3' },
          { id: 'rock-2', label: 'song2.mp3' },
        ],
      },
      {
        id: 'jazz',
        label: 'Jazz',
        icon: <Folder className="h-4 w-4 text-room-warning" />,
        children: [
          { id: 'jazz-1', label: 'track1.flac' },
        ],
      },
    ],
  },
  {
    id: 'videos',
    label: 'Videos',
    icon: <Video className="h-4 w-4 text-room-error" />,
    children: [
      { id: 'vid-1', label: 'vacation.mp4' },
      { id: 'vid-2', label: 'birthday.mov' },
    ],
  },
  {
    id: 'photos',
    label: 'Photos',
    icon: <Image className="h-4 w-4 text-room-accent" />,
    children: [
      {
        id: 'photos-2024',
        label: '2024',
        icon: <Folder className="h-4 w-4 text-room-warning" />,
        children: [
          { id: 'photo-1', label: 'IMG_001.jpg' },
          { id: 'photo-2', label: 'IMG_002.jpg' },
          { id: 'photo-3', label: 'IMG_003.jpg' },
        ],
      },
    ],
  },
];

export const MediaLibrary: Story = {
  args: {
    data: mediaData,
    defaultExpandedIds: ['music', 'rock'],
  },
};

// Database schema
const schemaData: TreeNode[] = [
  {
    id: 'public',
    label: 'public',
    icon: <Database className="h-4 w-4 text-room-accent" />,
    children: [
      {
        id: 'users',
        label: 'users',
        icon: <FileText className="h-4 w-4 text-room-text-secondary" />,
        children: [
          { id: 'users-id', label: 'id (uuid, PK)' },
          { id: 'users-email', label: 'email (varchar)' },
          { id: 'users-name', label: 'name (varchar)' },
          { id: 'users-created', label: 'created_at (timestamp)' },
        ],
      },
      {
        id: 'orders',
        label: 'orders',
        icon: <FileText className="h-4 w-4 text-room-text-secondary" />,
        children: [
          { id: 'orders-id', label: 'id (uuid, PK)' },
          { id: 'orders-user', label: 'user_id (uuid, FK)' },
          { id: 'orders-total', label: 'total (decimal)' },
          { id: 'orders-status', label: 'status (enum)' },
        ],
      },
      {
        id: 'products',
        label: 'products',
        icon: <FileText className="h-4 w-4 text-room-text-secondary" />,
      },
    ],
  },
];

export const DatabaseSchema: Story = {
  args: {
    data: schemaData,
    defaultExpandedIds: ['public', 'users'],
  },
};

// Settings menu
const settingsData: TreeNode[] = [
  {
    id: 'general',
    label: 'General',
    icon: <Settings className="h-4 w-4 text-room-text-muted" />,
    children: [
      { id: 'appearance', label: 'Appearance' },
      { id: 'language', label: 'Language' },
      { id: 'timezone', label: 'Time Zone' },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    icon: <Globe className="h-4 w-4 text-room-text-muted" />,
    children: [
      { id: 'profile', label: 'Profile' },
      { id: 'security', label: 'Security' },
      { id: 'privacy', label: 'Privacy' },
    ],
  },
  {
    id: 'advanced',
    label: 'Advanced',
    icon: <Code className="h-4 w-4 text-room-text-muted" />,
    children: [
      { id: 'developer', label: 'Developer Options' },
      { id: 'experimental', label: 'Experimental Features', disabled: true },
    ],
  },
];

export const SettingsMenu: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState('appearance');

    return (
      <div className="w-64 bg-room-bg-elevated rounded-room border border-room-border p-2">
        <TreeView
          data={settingsData}
          defaultExpandedIds={['general', 'account', 'advanced']}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
    );
  },
};

// Package dependencies
const dependencyData: TreeNode[] = [
  {
    id: 'deps',
    label: 'dependencies',
    icon: <Package className="h-4 w-4 text-room-accent" />,
    children: [
      { id: 'react', label: 'react@18.3.0' },
      { id: 'react-dom', label: 'react-dom@18.3.0' },
      {
        id: 'lucide',
        label: 'lucide-react@0.460.0',
        children: [
          { id: 'lucide-dep-1', label: 'lucide@0.460.0' },
        ],
      },
      { id: 'tailwind', label: 'tailwindcss@3.4.0' },
    ],
  },
  {
    id: 'devDeps',
    label: 'devDependencies',
    icon: <Coffee className="h-4 w-4 text-room-warning" />,
    children: [
      { id: 'typescript', label: 'typescript@5.6.0' },
      { id: 'vite', label: 'vite@6.0.0' },
      { id: 'storybook', label: '@storybook/react@8.4.0' },
    ],
  },
];

export const PackageDependencies: Story = {
  args: {
    data: dependencyData,
    defaultExpandedIds: ['deps'],
  },
};

// File explorer with selection
export const FileExplorer: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [expandedIds, setExpandedIds] = useState<string[]>(['src', 'components']);

    const explorerData: TreeNode[] = [
      {
        id: 'src',
        label: 'src',
        icon: <Folder className="h-4 w-4 text-room-warning" />,
        children: [
          {
            id: 'components',
            label: 'components',
            icon: <Folder className="h-4 w-4 text-room-warning" />,
            children: [
              { id: 'button-tsx', label: 'Button.tsx', icon: <FileCode className="h-4 w-4 text-room-accent" /> },
              { id: 'card-tsx', label: 'Card.tsx', icon: <FileCode className="h-4 w-4 text-room-accent" /> },
              { id: 'input-tsx', label: 'Input.tsx', icon: <FileCode className="h-4 w-4 text-room-accent" /> },
            ],
          },
          {
            id: 'assets',
            label: 'assets',
            icon: <Folder className="h-4 w-4 text-room-warning" />,
            children: [
              { id: 'logo-png', label: 'logo.png', icon: <Image className="h-4 w-4 text-room-success" /> },
              { id: 'icon-svg', label: 'icon.svg', icon: <Image className="h-4 w-4 text-room-success" /> },
            ],
          },
          { id: 'main-tsx', label: 'main.tsx', icon: <FileCode className="h-4 w-4 text-room-accent" /> },
        ],
      },
      { id: 'package-json', label: 'package.json', icon: <FileJson className="h-4 w-4 text-room-success" /> },
      { id: 'readme', label: 'README.md', icon: <FileText className="h-4 w-4 text-room-text-muted" /> },
      { id: 'archive', label: 'backup.zip', icon: <FileArchive className="h-4 w-4 text-room-text-muted" /> },
    ];

    return (
      <div className="w-72">
        <div className="bg-room-bg-elevated rounded-room border border-room-border">
          <div className="px-3 py-2 border-b border-room-border">
            <span className="text-sm font-medium text-room-text-primary">Explorer</span>
          </div>
          <div className="p-1">
            <TreeView
              data={explorerData}
              expandedIds={expandedIds}
              onExpandedChange={setExpandedIds}
              multiSelect
              selectedIds={selectedIds}
              onSelectedChange={setSelectedIds}
            />
          </div>
        </div>
        {selectedIds.length > 0 && (
          <div className="mt-2 px-3 py-2 bg-room-bg-surface rounded-room border border-room-border">
            <p className="text-xs text-room-text-muted">
              {selectedIds.length} item(s) selected
            </p>
          </div>
        )}
      </div>
    );
  },
};
