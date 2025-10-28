# 部署与平台、CMS 说明

本文补充 GitHub Actions 与 GitHub Pages 的区别与用法，并给出 Decap CMS 的接入要点。

## GitHub Actions vs GitHub Pages

- GitHub Pages：
  - 定义：GitHub 提供的静态站点托管服务。
  - 职责：托管 `dist` 这类构建产物，最终对外服务的网站。
  - 配置：仓库 Settings → Pages，选择部署来源（建议“GitHub Actions”）。

- GitHub Actions：
  - 定义：GitHub 的 CI/CD 工作流平台。
  - 职责：自动执行构建、测试、发布步骤；本项目负责 `npm ci && npm run build` 并上传 `dist`。
  - 配置：工作流文件位于 `.github/workflows/deploy.yml`。

关系：Actions 产出静态文件→Pages 托管。两者相辅相成，Actions 是“生产线”，Pages 是“仓库展示区”。

## 本项目 Actions 工作流

- 触发：push 到 `main` 或手动 `workflow_dispatch`
- 步骤：
  1. checkout 代码
  2. setup-node 并缓存 npm
  3. `npm ci` 安装依赖
  4. `npm run build` 产出 `dist/`
  5. `actions/upload-pages-artifact` 上传产物
  6. `actions/deploy-pages` 发布到 Pages

注意：
- `vite.config.js` 的 `base` 为生产 `/blog/`，需与你的 Pages 路径一致（通常是 `https://<user>.github.io/blog/`）。

## Decap CMS 接入说明

- 管理端：`/public/admin/index.html` + `config.yml`
- 媒体目录：`public/images`（对应前端访问 `/images`）
- 内容目录：`content/posts`
- 集合定义：`config.yml` 中的 `collections.posts`

### backend 选择

- GitHub 仓库托管方案（推荐）：
  ```yaml
  backend:
    name: github
    repo: <your-user>/<your-repo>
    branch: main
  ```
  - 需创建一个 GitHub OAuth 应用或使用 GitHub App（参见 Decap 文档）
  - 也可用 `app_id` + `api_root` 方式

- Netlify/git-gateway 方案（当前文件示例）：
  ```yaml
  backend:
    name: git-gateway
    branch: main
  local_backend: true
  ```
  - 适合托管在 Netlify（无需自建认证），本地可用 `local_backend` 模式调试

根据你的部署平台二选一，并补足必要的 OAuth/身份配置。

### 本地开发 CMS

- 运行前端：`npm run dev`
- 访问 `http://localhost:5173/admin`
- 若使用 `local_backend: true`，可直接在本地新建/编辑文章，生成变更到 `content/posts`

### 文章字段

- `title`、`date`、`tags`、`excerpt`、`heroImage`、`draft`、`body`
- `draft: true` 的文章不会在生产中展示（你可在渲染逻辑中过滤）。

## Pages 域名与路由 Base

- 用户页：`<user>.github.io` 的根仓库（`<user>.github.io`）对应根路径 `/`
- 项目页：普通仓库（例如 `blog`）对应路径 `/blog/`
- 因此：
  - `vite.config.js` 与 `router/index.js` 中 base/history 需要对齐 `/blog/`

## 常见问题

- 页面刷新 404：多因 history base 不正确或缺少 404.html 路由回退文件；建议用 `actions/deploy-pages`（自动处理），或添加 SPA fallback。
- 资源路径错位：检查 `base` 与静态资源路径（建议用绝对 `/images/...` 或 import 资源）。
