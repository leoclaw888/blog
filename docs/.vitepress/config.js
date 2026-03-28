export default {
  title: "Leo's Blog",
  description: "个人博客 | 算法研发工程师",
  base: '/blog/',
  themeConfig: {
    lastUpdated: true,
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
    ],
    sidebar: {
      '/blog/ml/': [
        { text: '🧠 机器学习', link: '/blog/ml/' },
        { text: '📝 所有文章', link: '/blog/' },
      ],
      '/blog/data/': [
        { text: '📈 数据分析', link: '/blog/data/' },
        { text: '📝 所有文章', link: '/blog/' },
      ],
      '/blog/python/': [
        { text: '🐍 编程技能', link: '/blog/python/' },
        { text: '📝 所有文章', link: '/blog/' },
      ],
      '/blog/papers/': [
        { text: '📝 论文阅读', link: '/blog/papers/' },
        { text: '📝 所有文章', link: '/blog/' },
      ],
      '/blog/tools/': [
        { text: '🛠️ 工具技巧', link: '/blog/tools/' },
        { text: '📝 所有文章', link: '/blog/' },
      ],
      '/blog/projects/': [
        { text: '💡 项目实战', link: '/blog/projects/' },
        { text: '📝 所有文章', link: '/blog/' },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/leoclaw888' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Leo',
    },
  },
}
