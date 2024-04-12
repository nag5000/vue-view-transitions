import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@nag5000/vue-view-transitions',
  description: 'View Transitions API primitives for Vue.js',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/getting-started' },
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'useViewTransition()', link: '/use-view-transition' },
          { text: '&lt;ViewTransition&gt;', link: '/view-transition' },
        ],
      },
      {
        text: 'Examples',
        items: [
          {
            text: '<b>useViewTransition()</b>',
            items: [
              {
                text: 'Basic',
                link: '/examples/use-view-transition/basic',
              },
              {
                text: 'List Shuffle',
                link: '/examples/use-view-transition/list-shuffle',
              },
              {
                text: 'Shop',
                link: '/examples/use-view-transition/shop',
              },
              {
                text: 'Image Gallery',
                link: '/examples/use-view-transition/image-gallery',
              },
            ],
          },
          {
            text: '<b>&lt;ViewTransition&gt;</b>',
            items: [
              {
                text: 'Basic',
                link: '/examples/view-transition/basic',
              },
              {
                text: 'List Shuffle',
                link: '/examples/view-transition/list-shuffle',
              },
              {
                text: 'Two Lists',
                link: '/examples/view-transition/two-lists',
              },
              {
                text: 'Switch Components',
                link: '/examples/view-transition/switch-components',
              },
              {
                text: 'Switch Async Components & Suspense',
                link: '/examples/view-transition/switch-async-components-suspense',
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/nag5000/vue-view-transitions',
      },
    ],
  },

  vite: {
    resolve: {
      alias: {
        '@nag5000/vue-view-transitions': fileURLToPath(
          new URL('../../src/lib/index.ts', import.meta.url)
        ),
        '@demo': fileURLToPath(new URL('../../src/demo', import.meta.url)),
      },
    },
  },
})
