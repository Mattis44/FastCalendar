import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/fast-react-calendar/',
  lang: 'en-US',
  title: "Fast React Calendar",
  description: "Fast React Calendar is a fast, accessible, and customizable calendar component built with React and MUI. Easily manage events, localize your interface, and integrate into any React application with full TypeScript support.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "./FastCalendarIcon.png",
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/get-started' },
      { text: 'v1.0.0-alpha', 
      items: [
            { text: 'Changelog', link: 'https://github.com/Mattis44/fast-react-calendar/blob/main/changelog.md' },
        ]
      }
    ],
    search: {
      provider: 'local'
    },

    sidebar: [
      { text: 'Introduction', items: [
        {
          text: 'Get Started',
          link: '/guide/get-started',
        },
        {
          text: 'Events',
          link: '/guide/events',
        },
      ]},
      {
        text: 'Advanced',
        items: [
          {
            text: 'Props',
            link: '/guide/props',
          },
          {
            text: 'Api',
            link: '/guide/api',
          },
          {
            text: 'Translations',
            link: '/guide/translations',
          },
          {
            text: 'Customize',
            link: '/guide/customize',
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Mattis44/fast-react-calendar' }
    ]
  }
})
