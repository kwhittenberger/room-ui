import type { Meta, StoryObj } from '@storybook/react';
import { Edit, Trash2, Eye, Heart } from 'lucide-react';
import { DataTableCardView, CardViewConfig } from './DataTableCardView';
import { Badge } from '../Badge';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
  image: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling headphones',
    price: 299.99,
    category: 'Electronics',
    stock: 45,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    status: 'in-stock',
  },
  {
    id: '2',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit gaming keyboard',
    price: 149.99,
    category: 'Electronics',
    stock: 12,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400',
    status: 'low-stock',
  },
  {
    id: '3',
    name: 'Ergonomic Mouse',
    description: 'Vertical design for comfort',
    price: 79.99,
    category: 'Electronics',
    stock: 0,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    status: 'out-of-stock',
  },
  {
    id: '4',
    name: 'USB-C Hub',
    description: '7-in-1 multiport adapter',
    price: 59.99,
    category: 'Accessories',
    stock: 89,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400',
    status: 'in-stock',
  },
  {
    id: '5',
    name: 'Monitor Stand',
    description: 'Adjustable desk riser',
    price: 89.99,
    category: 'Accessories',
    stock: 34,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    status: 'in-stock',
  },
  {
    id: '6',
    name: 'Webcam HD',
    description: '1080p streaming camera',
    price: 129.99,
    category: 'Electronics',
    stock: 5,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400',
    status: 'low-stock',
  },
];

const productConfig: CardViewConfig<Product> = {
  title: (product) => product.name,
  subtitle: (product) => product.description,
  image: (product) => product.image,
  badge: (product) => {
    const variant =
      product.status === 'in-stock'
        ? 'success'
        : product.status === 'low-stock'
        ? 'warning'
        : 'default';
    const label =
      product.status === 'in-stock'
        ? 'In Stock'
        : product.status === 'low-stock'
        ? 'Low Stock'
        : 'Out of Stock';
    return <Badge variant={variant} size="sm">{label}</Badge>;
  },
  fields: [
    { label: 'Price', value: (p) => `$${p.price.toFixed(2)}` },
    { label: 'Category', value: (p) => p.category },
    { label: 'Rating', value: (p) => `${p.rating} ⭐` },
  ],
};

const meta: Meta<typeof DataTableCardView<Product>> = {
  title: 'Data Display/DataTableCardView',
  component: DataTableCardView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTableCardView<Product>>;

// Basic example
export const Default: Story = {
  args: {
    data: sampleProducts,
    config: productConfig,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    data: [],
    config: productConfig,
    loading: true,
    loadingCards: 6,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    data: [],
    config: productConfig,
    emptyMessage: 'No products found. Try adjusting your filters.',
  },
};

// With actions
export const WithActions: Story = {
  args: {
    data: sampleProducts,
    config: productConfig,
    actions: [
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
        id: 'favorite',
        label: 'Add to Favorites',
        icon: <Heart className="h-4 w-4" />,
        onClick: (rows) => alert(`Favorite: ${rows[0].name}`),
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

// Different column counts
export const TwoColumns: Story = {
  args: {
    data: sampleProducts.slice(0, 4),
    config: productConfig,
    columns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    data: sampleProducts,
    config: productConfig,
    columns: 4,
  },
};

export const SingleColumn: Story = {
  args: {
    data: sampleProducts.slice(0, 3),
    config: productConfig,
    columns: 1,
  },
};

// With card click
export const WithCardClick: Story = {
  args: {
    data: sampleProducts,
    config: productConfig,
    onCardClick: (product) => alert(`Clicked: ${product.name}`),
  },
};

// Without images
interface SimpleItem {
  id: string;
  title: string;
  status: 'active' | 'inactive';
  count: number;
  lastUpdated: string;
}

const simpleItems: SimpleItem[] = [
  { id: '1', title: 'Project Alpha', status: 'active', count: 24, lastUpdated: '2024-12-20' },
  { id: '2', title: 'Project Beta', status: 'active', count: 18, lastUpdated: '2024-12-19' },
  { id: '3', title: 'Project Gamma', status: 'inactive', count: 5, lastUpdated: '2024-12-15' },
  { id: '4', title: 'Project Delta', status: 'active', count: 42, lastUpdated: '2024-12-21' },
];

const simpleConfig: CardViewConfig<SimpleItem> = {
  title: (item) => item.title,
  badge: (item) => (
    <Badge variant={item.status === 'active' ? 'success' : 'default'} size="sm">
      {item.status}
    </Badge>
  ),
  fields: [
    { label: 'Items', value: (item) => item.count.toString() },
    { label: 'Updated', value: (item) => item.lastUpdated },
  ],
};

export const WithoutImages: Story = {
  args: {
    data: simpleItems,
    config: simpleConfig,
    columns: 2,
  } as any,
};

// Team members example
interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  department: string;
  avatar: string;
}

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Sarah Chen', role: 'Engineering Lead', email: 'sarah@example.com', department: 'Engineering', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Michael Park', role: 'Product Manager', email: 'michael@example.com', department: 'Product', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Emily Johnson', role: 'UX Designer', email: 'emily@example.com', department: 'Design', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'David Kim', role: 'Backend Developer', email: 'david@example.com', department: 'Engineering', avatar: 'https://i.pravatar.cc/150?img=4' },
];

const teamConfig: CardViewConfig<TeamMember> = {
  title: (member) => member.name,
  subtitle: (member) => member.role,
  image: (member) => member.avatar,
  fields: [
    { label: 'Email', value: (m) => m.email },
    { label: 'Department', value: (m) => m.department },
  ],
};

export const TeamMembers: Story = {
  args: {
    data: teamMembers,
    config: teamConfig,
    columns: 4,
    onCardClick: (member: TeamMember) => alert(`View profile: ${member.name}`),
  } as any,
};
