import type { Preview } from '@storybook/react';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0f172a' },
        { name: 'elevated', value: '#1e293b' },
        { name: 'surface', value: '#334155' },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="min-h-[200px] p-8">
        <Story />
      </div>
    ),
  ],
};

export default preview;
