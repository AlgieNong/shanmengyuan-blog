---
title: "使用 Vite 与 Vue 3 构建现代前端"
date: 2025-01-10
tags: [vite, vue3, 前端工程化]
excerpt: "从零开始，用 Vite 与 Vue 3 快速搭建现代化前端项目，包含路由、状态、样式与部署。"
heroImage: "/images/vite-vue3.jpg"
draft: false
---

# 使用 Vite 与 Vue 3 构建现代前端

Vite 通过原生 ES 模块与按需编译，提供极快的冷启动速度；Vue 3 通过组合式 API 带来更好的可组合性与类型支持。

## 快速开始

```bash
npm create vite@latest my-app -- --template vue
cd my-app
npm install
npm run dev
```

## 必备能力

- 路由管理：Vue Router 4
- 状态管理：Pinia
- 样式方案：Tailwind CSS

## 部署

推荐使用 GitHub Actions + GitHub Pages 进行静态部署。
