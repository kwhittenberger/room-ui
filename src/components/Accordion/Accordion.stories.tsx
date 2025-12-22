import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './index';
import { Stack } from '../Stack';
import { Text } from '../Text';
import {
  HelpCircle,
  CreditCard,
  Truck,
  RotateCcw,
  Settings,
  User,
  Bell,
  Plus,
  Minus
} from 'lucide-react';

const meta: Meta<typeof Accordion> = {
  title: 'Navigation/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Accordion component for showing collapsible content sections.

## Features
- Single or multiple item expansion
- Custom expand/collapse icons
- Step numbers mode for wizard-like UIs
- Keyboard accessible
- Animated open/close transitions

## Usage
\`\`\`tsx
import { Accordion } from 'room-ui';

<Accordion
  items={[
    { id: 'faq-1', title: 'Question 1', content: 'Answer 1' },
    { id: 'faq-2', title: 'Question 2', content: 'Answer 2' },
  ]}
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const faqItems: AccordionItem[] = [
  {
    id: 'shipping',
    title: 'How long does shipping take?',
    content: (
      <Text className="text-room-text-secondary">
        Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 day delivery at an additional cost.
      </Text>
    ),
  },
  {
    id: 'returns',
    title: 'What is your return policy?',
    content: (
      <Text className="text-room-text-secondary">
        We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Refunds are processed within 5-7 business days.
      </Text>
    ),
  },
  {
    id: 'payment',
    title: 'What payment methods do you accept?',
    content: (
      <Text className="text-room-text-secondary">
        We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.
      </Text>
    ),
  },
  {
    id: 'support',
    title: 'How can I contact customer support?',
    content: (
      <Text className="text-room-text-secondary">
        You can reach our support team via email at support@example.com or call us at 1-800-123-4567. We're available Monday through Friday, 9am to 5pm EST.
      </Text>
    ),
  },
];

/**
 * Basic accordion (single expansion)
 */
export const Basic: Story = {
  render: () => (
    <Accordion items={faqItems} />
  ),
};

/**
 * Allow multiple items open
 */
export const AllowMultiple: Story = {
  render: () => (
    <Accordion items={faqItems} allowMultiple />
  ),
};

/**
 * With default open item
 */
export const DefaultOpen: Story = {
  render: () => (
    <Accordion items={faqItems} defaultOpen={['shipping']} />
  ),
};

/**
 * With icons
 */
export const WithIcons: Story = {
  render: () => {
    const itemsWithIcons: AccordionItem[] = [
      {
        id: 'shipping',
        title: 'Shipping Information',
        icon: <Truck className="h-5 w-5" />,
        content: <Text className="text-room-text-secondary">Details about shipping options and delivery times.</Text>,
      },
      {
        id: 'payment',
        title: 'Payment Methods',
        icon: <CreditCard className="h-5 w-5" />,
        content: <Text className="text-room-text-secondary">Accepted payment methods and billing information.</Text>,
      },
      {
        id: 'returns',
        title: 'Returns & Refunds',
        icon: <RotateCcw className="h-5 w-5" />,
        content: <Text className="text-room-text-secondary">Our return policy and refund process.</Text>,
      },
      {
        id: 'help',
        title: 'Help & Support',
        icon: <HelpCircle className="h-5 w-5" />,
        content: <Text className="text-room-text-secondary">Contact our support team for assistance.</Text>,
      },
    ];

    return <Accordion items={itemsWithIcons} />;
  },
};

/**
 * Step numbers mode
 */
export const StepNumbers: Story = {
  render: () => {
    const stepItems: AccordionItem[] = [
      {
        id: 'step-1',
        title: 'Create your account',
        content: (
          <Stack gap="sm">
            <Text className="text-room-text-secondary">
              Enter your email address and create a secure password to get started.
            </Text>
          </Stack>
        ),
      },
      {
        id: 'step-2',
        title: 'Verify your email',
        content: (
          <Text className="text-room-text-secondary">
            Check your inbox for a verification link and click it to confirm your email address.
          </Text>
        ),
      },
      {
        id: 'step-3',
        title: 'Complete your profile',
        content: (
          <Text className="text-room-text-secondary">
            Add your name, photo, and other details to personalize your account.
          </Text>
        ),
      },
      {
        id: 'step-4',
        title: 'Start exploring',
        content: (
          <Text className="text-room-text-secondary">
            You're all set! Explore features and customize your experience.
          </Text>
        ),
      },
    ];

    return <Accordion items={stepItems} showStepNumbers defaultOpen={['step-1']} />;
  },
};

/**
 * Custom expand/collapse icons
 */
export const CustomIcons: Story = {
  render: () => (
    <Accordion
      items={faqItems.slice(0, 3)}
      expandIcon={<Plus className="h-5 w-5" />}
      collapseIcon={<Minus className="h-5 w-5" />}
    />
  ),
};

/**
 * Disabled item
 */
export const WithDisabled: Story = {
  render: () => {
    const itemsWithDisabled: AccordionItem[] = [
      {
        id: 'item-1',
        title: 'Available Section',
        content: <Text className="text-room-text-secondary">This section is available.</Text>,
      },
      {
        id: 'item-2',
        title: 'Disabled Section (Premium Feature)',
        disabled: true,
        content: <Text className="text-room-text-secondary">This content is locked.</Text>,
      },
      {
        id: 'item-3',
        title: 'Another Available Section',
        content: <Text className="text-room-text-secondary">This section is also available.</Text>,
      },
    ];

    return <Accordion items={itemsWithDisabled} />;
  },
};

/**
 * Controlled accordion
 */
export const Controlled: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<string[]>(['shipping']);

    return (
      <Stack gap="md">
        <div className="flex gap-2">
          <button
            onClick={() => setOpenItems(['shipping'])}
            className="px-3 py-1.5 text-sm bg-room-bg-surface border border-room-border rounded-room-sm hover:bg-room-bg-hover"
          >
            Open Shipping
          </button>
          <button
            onClick={() => setOpenItems(['returns'])}
            className="px-3 py-1.5 text-sm bg-room-bg-surface border border-room-border rounded-room-sm hover:bg-room-bg-hover"
          >
            Open Returns
          </button>
          <button
            onClick={() => setOpenItems([])}
            className="px-3 py-1.5 text-sm bg-room-bg-surface border border-room-border rounded-room-sm hover:bg-room-bg-hover"
          >
            Close All
          </button>
        </div>
        <Text size="sm" className="text-room-text-muted">
          Open items: {openItems.length > 0 ? openItems.join(', ') : 'none'}
        </Text>
        <Accordion
          items={faqItems}
          value={openItems}
          onChange={setOpenItems}
        />
      </Stack>
    );
  },
};

/**
 * Settings panel example
 */
export const SettingsPanel: Story = {
  render: () => {
    const settingsItems: AccordionItem[] = [
      {
        id: 'account',
        title: 'Account Settings',
        icon: <User className="h-5 w-5" />,
        content: (
          <Stack gap="sm">
            <Text className="text-room-text-secondary">
              Manage your account information, password, and security settings.
            </Text>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-room-accent text-white rounded-room-sm hover:bg-room-accent-hover">
                Edit Profile
              </button>
              <button className="px-3 py-1.5 text-sm bg-room-bg-surface border border-room-border rounded-room-sm hover:bg-room-bg-hover">
                Change Password
              </button>
            </div>
          </Stack>
        ),
      },
      {
        id: 'notifications',
        title: 'Notification Preferences',
        icon: <Bell className="h-5 w-5" />,
        content: (
          <Text className="text-room-text-secondary">
            Configure how and when you receive notifications via email, SMS, or push notifications.
          </Text>
        ),
      },
      {
        id: 'app-settings',
        title: 'Application Settings',
        icon: <Settings className="h-5 w-5" />,
        content: (
          <Text className="text-room-text-secondary">
            Customize app appearance, language preferences, and accessibility options.
          </Text>
        ),
      },
    ];

    return (
      <div className="max-w-xl">
        <Text weight="semibold" size="lg" className="mb-4">Settings</Text>
        <Accordion items={settingsItems} defaultOpen={['account']} />
      </div>
    );
  },
};
