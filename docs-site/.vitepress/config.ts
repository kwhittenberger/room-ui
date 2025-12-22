import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'room-ui',
  description: 'A modern React component library with a dark professional aesthetic',
  base: '/room-ui/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/room-ui/favicon.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'Components', link: '/components/' },
      { text: 'Storybook', link: 'https://main--6949986ceb769ed38d88c5ee.chromatic.com/' },
      { text: 'npm', link: 'https://www.npmjs.com/package/room-ui' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is room-ui?', link: '/' },
            { text: 'Getting Started', link: '/getting-started' },
            { text: 'Design System', link: '/design-system' },
          ]
        },
        {
          text: 'Components',
          items: [
            { text: 'Overview', link: '/components/' },
            { text: 'Form Components', link: '/components/form-components' },
            { text: 'Layout Components', link: '/components/layout-components' },
            { text: 'Data Display', link: '/components/data-display' },
            { text: 'Navigation', link: '/components/navigation' },
            { text: 'Feedback', link: '/components/feedback' },
            { text: 'Advanced', link: '/components/advanced' },
          ]
        },
        {
          text: 'Examples',
          items: [
            { text: 'Deal Room Dashboard', link: '/examples/deal-room' },
          ]
        },
        {
          text: 'Development',
          items: [
            { text: 'Developer Guide', link: '/development/developer-guide' },
            { text: 'Contributing', link: '/development/contributing' },
          ]
        },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kwhittenberger/room-ui' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/room-ui' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 kwhittenberger'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/kwhittenberger/room-ui/edit/main/docs-site/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
