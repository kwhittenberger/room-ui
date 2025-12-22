import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Edit, Trash2, Eye, Download, Mail } from 'lucide-react';
import { DataTable, DataTableColumn, DataTableAction } from './DataTable';
import { Badge } from '../Badge';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  department: string;
}

const sampleUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', createdAt: '2024-01-15', department: 'Engineering' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', createdAt: '2024-02-20', department: 'Marketing' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive', createdAt: '2024-03-10', department: 'Sales' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'pending', createdAt: '2024-04-05', department: 'Engineering' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active', createdAt: '2024-05-12', department: 'HR' },
  { id: '6', name: 'Diana Ross', email: 'diana@example.com', role: 'Viewer', status: 'active', createdAt: '2024-06-18', department: 'Finance' },
  { id: '7', name: 'Edward Lee', email: 'edward@example.com', role: 'Editor', status: 'inactive', createdAt: '2024-07-22', department: 'Engineering' },
  { id: '8', name: 'Fiona Green', email: 'fiona@example.com', role: 'Admin', status: 'active', createdAt: '2024-08-30', department: 'Marketing' },
];

const columns: DataTableColumn<User>[] = [
  { id: 'name', header: 'Name', accessor: 'name', sortable: true },
  { id: 'email', header: 'Email', accessor: 'email', sortable: true },
  { id: 'role', header: 'Role', accessor: 'role', sortable: true },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    sortable: true,
    cell: (value) => {
      const status = value as User['status'];
      const variant = status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'default';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  { id: 'department', header: 'Department', accessor: 'department', sortable: true },
  { id: 'createdAt', header: 'Created', accessor: 'createdAt', sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Data Display/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

// Basic example
export const Default: Story = {
  args: {
    data: sampleUsers,
    columns,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
    loadingRows: 5,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    data: [],
    columns,
    emptyMessage: 'No users found. Try adjusting your filters.',
  },
};

// Error state
export const WithError: Story = {
  args: {
    data: [],
    columns,
    error: 'Failed to load users. Please try again later.',
  },
};

// With sorting
export const WithSorting: Story = {
  render: () => {
    const [sortColumn, setSortColumn] = useState<string | undefined>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const sortedData = [...sampleUsers].sort((a, b) => {
      if (!sortColumn) return 0;
      const aVal = a[sortColumn as keyof User];
      const bVal = b[sortColumn as keyof User];
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return (
      <DataTable
        data={sortedData}
        columns={columns}
        sortable
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={(column, direction) => {
          setSortColumn(column);
          setSortDirection(direction);
        }}
      />
    );
  },
};

// With selection
export const WithSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);

    const bulkActions: DataTableAction<User>[] = [
      {
        id: 'delete',
        label: 'Delete',
        icon: <Trash2 className="h-4 w-4" />,
        onClick: (rows) => alert(`Delete ${rows.length} users`),
        variant: 'danger',
      },
      {
        id: 'export',
        label: 'Export',
        icon: <Download className="h-4 w-4" />,
        onClick: (rows) => alert(`Export ${rows.length} users`),
      },
    ];

    return (
      <div>
        <DataTable
          data={sampleUsers}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          actions={bulkActions}
        />
        <p className="mt-4 text-sm text-room-text-muted">
          Selected: {selectedRows.map((u) => u.name).join(', ') || 'None'}
        </p>
      </div>
    );
  },
};

// With pagination
export const WithPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = sampleUsers.slice(startIndex, startIndex + pageSize);

    return (
      <DataTable
        data={paginatedData}
        columns={columns}
        pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={sampleUsers.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        pageSizeOptions={[3, 5, 10]}
      />
    );
  },
};

// With row expansion
export const WithRowExpansion: Story = {
  render: () => {
    const [expandedRows, setExpandedRows] = useState<string[]>([]);

    return (
      <DataTable
        data={sampleUsers}
        columns={columns.slice(0, 4)}
        expandable
        expandedRows={expandedRows}
        onExpandedRowsChange={setExpandedRows}
        expandedRowConfig={{
          render: (user) => (
            <div className="grid grid-cols-2 gap-4 p-2">
              <div>
                <p className="text-sm font-medium text-room-text-primary">Contact Info</p>
                <p className="text-sm text-room-text-secondary">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-room-text-primary">Department</p>
                <p className="text-sm text-room-text-secondary">{user.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-room-text-primary">Role</p>
                <p className="text-sm text-room-text-secondary">{user.role}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-room-text-primary">Member Since</p>
                <p className="text-sm text-room-text-secondary">{user.createdAt}</p>
              </div>
            </div>
          ),
        }}
      />
    );
  },
};

// With row actions
export const WithRowActions: Story = {
  args: {
    data: sampleUsers,
    columns,
    rowActions: [
      {
        id: 'view',
        label: 'View Details',
        icon: <Eye className="h-4 w-4" />,
        onClick: (rows) => alert(`View: ${rows[0].name}`),
      },
      {
        id: 'edit',
        label: 'Edit',
        icon: <Edit className="h-4 w-4" />,
        onClick: (rows) => alert(`Edit: ${rows[0].name}`),
      },
      {
        id: 'email',
        label: 'Send Email',
        icon: <Mail className="h-4 w-4" />,
        onClick: (rows) => alert(`Email: ${rows[0].email}`),
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: <Trash2 className="h-4 w-4" />,
        onClick: (rows) => alert(`Delete: ${rows[0].name}`),
        variant: 'danger',
      },
    ],
  },
};

// Compact mode
export const Compact: Story = {
  args: {
    data: sampleUsers,
    columns,
    compact: true,
    striped: true,
  },
};

// Striped rows
export const Striped: Story = {
  args: {
    data: sampleUsers,
    columns,
    striped: true,
  },
};

// With sticky header
export const StickyHeader: Story = {
  render: () => (
    <div className="h-64 overflow-auto">
      <DataTable
        data={[...sampleUsers, ...sampleUsers, ...sampleUsers]}
        columns={columns}
        stickyHeader
      />
    </div>
  ),
};

// With row click
export const WithRowClick: Story = {
  render: () => (
    <DataTable
      data={sampleUsers}
      columns={columns}
      onRowClick={(user) => alert(`Clicked: ${user.name}`)}
    />
  ),
};

// Full featured
export const FullFeatured: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    const [expandedRows, setExpandedRows] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortColumn, setSortColumn] = useState<string | undefined>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const sortedData = [...sampleUsers].sort((a, b) => {
      if (!sortColumn) return 0;
      const aVal = a[sortColumn as keyof User];
      const bVal = b[sortColumn as keyof User];
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

    return (
      <DataTable
        data={paginatedData}
        columns={columns}
        // Selection
        selectable
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        actions={[
          {
            id: 'delete',
            label: 'Delete Selected',
            icon: <Trash2 className="h-4 w-4" />,
            onClick: (rows) => alert(`Delete ${rows.length} users`),
            variant: 'danger',
          },
        ]}
        // Sorting
        sortable
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={(column, direction) => {
          setSortColumn(column);
          setSortDirection(direction);
        }}
        // Pagination
        pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={sampleUsers.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        // Expansion
        expandable
        expandedRows={expandedRows}
        onExpandedRowsChange={setExpandedRows}
        expandedRowConfig={{
          render: (user) => (
            <div className="p-2">
              <p className="text-sm text-room-text-secondary">
                Additional details for {user.name}
              </p>
            </div>
          ),
        }}
        // Row actions
        rowActions={[
          {
            id: 'view',
            label: 'View',
            icon: <Eye className="h-4 w-4" />,
            onClick: (rows) => alert(`View: ${rows[0].name}`),
          },
          {
            id: 'edit',
            label: 'Edit',
            icon: <Edit className="h-4 w-4" />,
            onClick: (rows) => alert(`Edit: ${rows[0].name}`),
          },
          {
            id: 'delete',
            label: 'Delete',
            icon: <Trash2 className="h-4 w-4" />,
            onClick: (rows) => alert(`Delete: ${rows[0].name}`),
            variant: 'danger',
          },
        ]}
        // Styling
        striped
        hoverable
      />
    );
  },
};

// Custom cell rendering
export const CustomCells: Story = {
  args: {
    data: sampleUsers,
    columns: [
      {
        id: 'name',
        header: 'User',
        accessor: 'name',
        cell: (_, user) => (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-room-accent/20 flex items-center justify-center">
              <span className="text-sm font-medium text-room-accent">
                {(user as User).name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-room-text-primary">{(user as User).name}</p>
              <p className="text-xs text-room-text-muted">{(user as User).email}</p>
            </div>
          </div>
        ),
      },
      { id: 'role', header: 'Role', accessor: 'role' },
      {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        cell: (value) => {
          const status = value as User['status'];
          const variant = status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'default';
          return <Badge variant={variant}>{status}</Badge>;
        },
      },
      { id: 'department', header: 'Department', accessor: 'department' },
    ],
  },
};
