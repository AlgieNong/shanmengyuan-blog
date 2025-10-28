---
title: "Decap CMS 入门：用 Git 做内容源"
date: 2025-02-01
tags: [decap, cms]
excerpt: "在无需自建后端的前提下，借助 Decap CMS 直接让内容改动进入 Git 流程。"
heroImage: "/images/decap.jpg"
draft: false
---

# Decap CMS 入门

Decap CMS 是一个基于 Git 工作流的无头 CMS。你可以通过 `/admin` 页面编辑内容，提交后直接推送到 Git 仓库。

## 重要概念

- backend：内容提交方式（GitHub、git-gateway 等）
- collections：内容集合（如 posts）
- fields：每篇内容的字段定义

## 工作流

1. 访问 `/admin`
2. 登录（依据 backend 配置）
3. 新建/编辑文章
4. 发布，生成 PR 或直接提交到分支
