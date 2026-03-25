# Leo's Notes

个人学习笔记博客，基于 VitePress + GitHub Pages 构建。

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173 预览。

## 📝 添加笔记

在 `docs/notes/` 目录下创建新的 `.md` 文件：

```bash
docs/notes/
├── index.md        # 目录页
└── my-note.md      # 你的新笔记
```

## 🌐 部署到 GitHub Pages

```bash
# 构建并部署
npm run deploy
```

或者使用 GitHub Actions 自动部署（推荐）：

1. 在 GitHub 仓库设置中启用 GitHub Pages
2. 选择 GitHub Actions 作为部署源
3. 推送代码后自动部署

## 📦 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Vue 3](https://vuejs.org/) - 前端框架
- [GitHub Pages](https://pages.github.com/) - 免费托管

---

Made with 🦐 by Leo
