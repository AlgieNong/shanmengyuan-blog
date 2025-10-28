# 从 Markdown 接入真实数据

本文说明如何从 `content/posts/*.md` 读取真实文章并渲染到页面，替换掉原先的 mock 方案。

## 已完成的代码改动

- `src/utils/posts.js`
  - 使用 `import.meta.glob('../../content/posts/*.md', { as: 'raw', eager: true })` 读取 Markdown 源文件
  - 通过 `gray-matter` 解析 Front Matter，得到 `title/date/tags/excerpt/heroImage/draft` 与 `body`
  - 过滤 `draft: true`，并按 `date` 倒序排序

## 文章命名建议

- 采用 `YYYY-MM-DD-slug.md` 形式，便于按时间管理，如：
  - `2025-01-10-vite-and-vue3.md`
  - `2025-01-15-markdown-best-practices.md`

## Front Matter 样例

```markdown
---
title: "文章标题"
date: 2025-01-01
tags: [tag1, tag2]
excerpt: "用于列表页摘要展示"
heroImage: "/images/cover.jpg"
draft: false
---

# 正文标题

正文内容...
```

## 在页面中的使用

- `Home.vue` / `PostDetail.vue` 已调用 `loadPosts()`；改动后逻辑无需变更。
- 详情页继续用 `marked` 将 `post.body` 渲染为 HTML。

## 常见问题

- 新增 Markdown 后未生效：Vite 使用静态分析读取 glob，需重启 dev 服务器或确保文件路径匹配。
- 图片路径：存放在 `public/images` 并用 `/images/xxx` 引用，或使用外链/CDN。
