import type { Meta, StoryObj } from '@storybook/react';
import { QueryTransparency } from './QueryTransparency';

const meta: Meta<typeof QueryTransparency> = {
  title: 'Components/QueryTransparency',
  component: QueryTransparency,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof QueryTransparency>;

export const Default: Story = {
  args: {
    query: {
      sql: 'SELECT * FROM users WHERE status = $1 ORDER BY created_at DESC LIMIT 10',
      params: { status: 'active' },
      duration: 45,
      database: 'production',
      timestamp: new Date(),
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Expanded: Story = {
  args: {
    query: {
      sql: `SELECT 
  u.id,
  u.name,
  u.email,
  COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at > $1
GROUP BY u.id
HAVING COUNT(o.id) > $2
ORDER BY order_count DESC`,
      params: {
        '$1': '2024-01-01',
        '$2': 5,
      },
      duration: 234,
      database: 'analytics',
      timestamp: new Date(),
    },
    defaultExpanded: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const SlowQuery: Story = {
  args: {
    query: {
      sql: 'SELECT * FROM large_table WHERE complex_condition = true',
      duration: 5432,
      database: 'warehouse',
    },
    title: 'Slow Query Alert',
    defaultExpanded: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const SimpleQuery: Story = {
  args: {
    query: {
      sql: 'SELECT COUNT(*) FROM users',
      duration: 12,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};
