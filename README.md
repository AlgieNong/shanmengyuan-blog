# 个人博客系统

基于 Vue 3 + Vite + Tailwind CSS + Decap CMS 构建的现代化个人博客系统。

## 功能特性

- 📱 响应式设计，支持移动端和桌面端
- 🌙 暗色/亮色模式切换
- 📝 Markdown 文章支持
- 🔍 标签系统和文章分类
- 🎨 现代化 UI 设计，符合设计稿要求
- 📊 项目展示页面
- 👤 关于我和联系我页面
- 🔧 Decap CMS 内容管理
- 🚀 GitHub Actions 自动部署

## 项目结构

```
myBlog/
├── public/                 # 静态资源
│   ├── admin/             # Decap CMS 管理界面
│   └── images/            # 图片资源
├── src/
│   ├── assets/            # 样式和资源文件
│   ├── components/        # Vue 组件
│   │   ├── Header.vue     # 导航栏组件
│   │   ├── Footer.vue     # 页脚组件
│   │   ├── ThemeToggle.vue # 主题切换组件
│   │   ├── PostCard.vue   # 文章卡片组件
│   │   └── Sidebar.vue    # 侧边栏组件
│   ├── layouts/           # 页面布局
│   │   └── DefaultLayout.vue
│   ├── pages/             # 页面组件
│   │   ├── Home.vue       # 首页
│   │   ├── Projects.vue   # 项目页面
│   │   ├── About.vue      # 关于我页面
│   │   ├── Contact.vue    # 联系我页面
│   │   └── PostDetail.vue # 文章详情页
│   ├── router/            # 路由配置
│   ├── stores/            # 状态管理
│   ├── utils/             # 工具函数
│   └── main.js            # 应用入口
├── content/               # Markdown 文章内容
│   └── posts/
├── .github/workflows/     # GitHub Actions 配置
└── 配置文件
```

## 技术栈

- **前端框架**: Vue 3 + Composition API
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **路由管理**: Vue Router 4
- **状态管理**: Pinia
- **内容管理**: Decap CMS
- **Markdown 解析**: marked + gray-matter
- **部署平台**: GitHub Pages
- **CI/CD**: GitHub Actions

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看网站。

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产版本

```bash
npm run preview
```

## 内容管理

### 使用 Decap CMS

1. 启动开发服务器后，访问 `/admin` 路径
2. 使用本地模式进行内容编辑
3. 创建和管理文章内容

### 文章格式

文章使用 Markdown 格式，包含 Front Matter：

```markdown
---
title: "文章标题"
date: 2025-01-01
tags: [标签1, 标签2]
excerpt: "文章摘要"
heroImage: "/images/图片路径.jpg"
draft: false
---

# 正文内容

使用 Markdown 语法编写文章内容。
```

## 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

在 GitHub 上创建新的仓库，名称建议为 `blog`。

### 2. 推送代码到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/blog.git
git push -u origin main
```

### 3. 配置 GitHub Pages

1. 进入仓库 Settings → Pages
2. Source 选择 "Deploy from a branch"
3. Branch 选择 "gh-pages" 分支
4. 保存设置

### 4. 自动部署

每次推送到 `main` 分支时，GitHub Actions 会自动构建并部署到 GitHub Pages。

## 页面说明

### 首页 (/)
- 展示最新文章
- 文章网格布局
- 分页功能
- 响应式设计

### 项目页面 (/projects)
- 项目分类展示
- 项目卡片布局
- 技术栈标签
- 项目链接

### 关于我页面 (/about)
- 个人简介
- 技能展示
- 工作经历
- 联系方式

### 联系我页面 (/contact)
- 联系表单
- 联系信息
- 社交媒体链接

### 文章详情页 (/post/:slug)
- Markdown 内容渲染
- 侧边栏显示最近文章
- 标签云
- 文章导航

## 自定义配置

### 修改主题颜色

在 `tailwind.config.js` 中修改品牌色：

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        DEFAULT: '#你的主色',
        dark: '#你的暗色',
      }
    }
  }
}
```

### 添加新的页面

1. 在 `src/pages/` 创建新的 Vue 组件
2. 在 `src/router/index.js` 中添加路由
3. 在导航栏中添加链接

## 开发说明

### 组件设计原则

- 使用 Composition API
- 响应式设计优先
- 暗色模式支持
- 无障碍访问
- 性能优化

### 样式规范

- 使用 Tailwind CSS 原子类
- 保持一致的间距和颜色
- 移动端优先设计
- 暗色模式适配

## 许可证

MIT License

## 支持

如有问题或建议，请提交 Issue 或联系开发者。