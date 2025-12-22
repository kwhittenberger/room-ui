import type { Meta, StoryObj } from '@storybook/react';
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { StatsCardGrid } from './StatsCardGrid';
import { StatCard } from '../StatCard';

const meta: Meta<typeof StatsCardGrid> = {
  title: 'Components/StatsCardGrid',
  component: StatsCardGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatsCardGrid>;

export const Default: Story = {
  args: {
    columns: 4,
    children: (
      <>
        <StatCard
          icon={<Users className="h-5 w-5 text-cyan-400" />}
          label="Total Users"
          value="12,345"
          change={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          icon={<DollarSign className="h-5 w-5 text-emerald-400" />}
          label="Revenue"
          value="$48,250"
          change={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          icon={<ShoppingCart className="h-5 w-5 text-amber-400" />}
          label="Orders"
          value="1,234"
          change={{ value: 3.1, isPositive: false }}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-purple-400" />}
          label="Conversion"
          value="3.24%"
          change={{ value: 0.8, isPositive: true }}
        />
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    children: (
      <>
        <StatCard
          icon={<Users className="h-5 w-5 text-cyan-400" />}
          label="Active Users"
          value="8,234"
          subtitle="Last 30 days"
        />
        <StatCard
          icon={<DollarSign className="h-5 w-5 text-emerald-400" />}
          label="Monthly Revenue"
          value="$125,000"
          subtitle="Current month"
        />
        <StatCard
          icon={<ShoppingCart className="h-5 w-5 text-amber-400" />}
          label="Pending Orders"
          value="42"
          subtitle="Requires attention"
        />
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    children: (
      <>
        <StatCard
          icon={<Users className="h-5 w-5 text-cyan-400" />}
          label="Total Customers"
          value="5,678"
          change={{ value: 15, isPositive: true }}
        />
        <StatCard
          icon={<DollarSign className="h-5 w-5 text-emerald-400" />}
          label="Total Revenue"
          value="$250,000"
          change={{ value: 22, isPositive: true }}
        />
      </>
    ),
  },
};

export const SmallGap: Story = {
  args: {
    columns: 4,
    gap: 'sm',
    children: (
      <>
        <StatCard
          icon={<Users className="h-5 w-5 text-cyan-400" />}
          label="Users"
          value="1,234"
        />
        <StatCard
          icon={<DollarSign className="h-5 w-5 text-emerald-400" />}
          label="Revenue"
          value="$5,678"
        />
        <StatCard
          icon={<ShoppingCart className="h-5 w-5 text-amber-400" />}
          label="Orders"
          value="910"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-purple-400" />}
          label="Growth"
          value="12%"
        />
      </>
    ),
  },
};

export const LargeGap: Story = {
  args: {
    columns: 3,
    gap: 'lg',
    children: (
      <>
        <StatCard
          icon={<Users className="h-5 w-5 text-cyan-400" />}
          label="Team Members"
          value="25"
          subtitle="Across 4 departments"
        />
        <StatCard
          icon={<DollarSign className="h-5 w-5 text-emerald-400" />}
          label="Budget"
          value="$100,000"
          subtitle="Q4 2024"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-purple-400" />}
          label="Projects"
          value="12"
          subtitle="8 active"
        />
      </>
    ),
  },
};

export const SixColumns: Story = {
  args: {
    columns: 6,
    children: (
      <>
        <StatCard icon={<Users className="h-5 w-5 text-cyan-400" />} label="Users" value="1.2K" />
        <StatCard icon={<TrendingUp className="h-5 w-5 text-emerald-400" />} label="Sessions" value="5.4K" />
        <StatCard icon={<TrendingUp className="h-5 w-5 text-amber-400" />} label="Bounce" value="32%" />
        <StatCard icon={<TrendingUp className="h-5 w-5 text-purple-400" />} label="Duration" value="3:45" />
        <StatCard icon={<TrendingUp className="h-5 w-5 text-blue-400" />} label="Pages" value="4.2" />
        <StatCard icon={<TrendingUp className="h-5 w-5 text-pink-400" />} label="Goals" value="156" />
      </>
    ),
  },
};
