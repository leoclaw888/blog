export default {
  title: "Leo's Notes",
  description: "个人学习笔记",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/notes/' },
    ],
    sidebar: [
      {
        text: '学习笔记',
        items: [
          { text: '笔记目录', link: '/notes/' },
          { text: '示例笔记', link: '/notes/example' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/leoclaw888' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Leo',
    },
  },
}
