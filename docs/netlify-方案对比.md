# Netlify 方案对比：完全托管 vs 只用 OAuth

## 方案一：完全托管在 Netlify

### 步骤 1：注册 Netlify 账号
1. 访问 https://netlify.com
2. 点击 "Sign up"
3. 选择 "GitHub" 登录（推荐）
4. 授权 Netlify 访问你的 GitHub

### 步骤 2：导入项目
1. 点击 "Add new site" → "Import an existing project"
2. 选择 "Deploy with GitHub"
3. 授权 Netlify 访问仓库
4. 选择仓库：`AlgieNong/smy-blog.github.io`
5. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
   - 点击 "Deploy site"

### 步骤 3：启用 Netlify Identity
1. 进入站点设置：Site settings → Identity
2. 点击 "Enable Identity"
3. 配置注册方式：
   - Registration → "Invite only"（仅邀请）
4. 启用 Git Gateway：
   - Services → Git Gateway → "Enable Git Gateway"
5. 邀请自己：
   - Identity → "Invite users"
   - 输入你的邮箱
   - 收到邮件后设置密码

### 步骤 4：修改配置文件
```yaml
# public/admin/config.yml
backend:
  name: git-gateway
  branch: main

# 移除 local_backend
# local_backend: true

media_folder: "public/images"
public_folder: "/images"  # 注意：Netlify 托管时不需要项目前缀
```

### 步骤 5：使用 CMS
1. 访问 `https://your-site.netlify.app/admin`
2. 用邮箱+密码登录
3. 编辑文章
4. 自动提交到 GitHub
5. Netlify 自动重新构建和部署

### 优点
- ✅ 零配置 OAuth
- ✅ 自动部署
- ✅ 更快的 CDN
- ✅ 自动 HTTPS

### 缺点
- ❌ 网站托管迁移到 Netlify（不再用 GitHub Pages）
- ❌ 依赖 Netlify 服务

---

## 方案三：只用 Netlify OAuth 服务器（推荐）

### 步骤 1：注册 Netlify 账号
1. 访问 https://netlify.com
2. 点击 "Sign up"
3. 选择 "GitHub" 登录
4. 授权 Netlify 访问你的 GitHub

### 步骤 2：创建 GitHub OAuth App
1. 访问 https://github.com/settings/developers
2. 点击 "OAuth Apps" → "New OAuth App"
3. 填写信息：
   - Application name: `My Blog CMS`
   - Homepage URL: `https://algienong.github.io/smy-blog.github.io`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
4. 点击 "Register application"
5. 记录：
   - Client ID: `Iv1.xxxxxxxx`
   - 点击 "Generate a new client secret"
   - Client Secret: `ghp_xxxxxxxx`（只显示一次，务必保存！）

### 步骤 3：在 Netlify 创建空站点
1. 点击 "Add new site" → "Import an existing project"
2. 选择 "Deploy with GitHub"
3. 选择任意仓库（或创建一个空仓库）
4. 构建设置随便填（反正不会真的部署）
5. 点击 "Deploy site"

### 步骤 4：配置 Netlify OAuth
1. 进入站点设置：Site settings → Access control
2. 滚动到 "OAuth" 部分
3. 点击 "Install provider"
4. 选择 "GitHub"
5. 填入你的 GitHub OAuth App 信息：
   - Client ID: `Iv1.xxxxxxxx`
   - Client Secret: `ghp_xxxxxxxx`
6. 点击 "Install"

### 步骤 5：修改配置文件
```yaml
# public/admin/config.yml
backend:
  name: github
  repo: AlgieNong/smy-blog.github.io
  branch: main
  base_url: https://api.netlify.com  # Netlify OAuth 服务器
  auth_endpoint: auth

# 移除 local_backend
# local_backend: true

media_folder: "public/images"
public_folder: "/smy-blog.github.io/images"  # GitHub Pages 需要项目前缀
```

### 步骤 6：部署到 GitHub Pages
```bash
# 提交修改
git add .
git commit -m "配置 Netlify OAuth"
git push

# GitHub Actions 会自动构建并部署到 GitHub Pages
```

### 步骤 7：使用 CMS
1. 访问 `https://algienong.github.io/smy-blog.github.io/admin`
2. 点击 "Login with GitHub"
3. 跳转到 GitHub 授权页面
4. 点击 "授权"
5. 自动跳回你的网站，登录成功
6. 编辑文章
7. 自动提交到 GitHub
8. GitHub Actions 自动构建并部署

### 优点
- ✅ 继续用 GitHub Pages（免费）
- ✅ 不需要自己搭建 OAuth 服务器
- ✅ 浏览器直接操作 GitHub
- ✅ 完全免费

### 缺点
- ❌ 需要创建 GitHub OAuth App
- ❌ 需要在 Netlify 配置 OAuth（但很简单）

---

## 关键区别总结

| 项目 | 方案一 | 方案三 |
|------|--------|--------|
| **Netlify 账号** | ✅ 需要 | ✅ 需要 |
| **GitHub OAuth App** | ❌ 不需要 | ✅ 需要创建 |
| **Netlify 站点** | ✅ 真实部署 | ✅ 创建空站点（不部署） |
| **Netlify Identity** | ✅ 需要启用 | ❌ 不需要 |
| **Git Gateway** | ✅ 需要启用 | ❌ 不需要 |
| **网站托管** | Netlify | GitHub Pages |
| **登录方式** | 邮箱+密码 | GitHub 账号 |
| **费用** | 免费（个人博客够用） | 完全免费 |

---

## 推荐：方案三

### 为什么推荐方案三？

1. **继续用 GitHub Pages**
   - 你已经配置好了 GitHub Actions
   - 不需要迁移

2. **完全免费**
   - GitHub Pages：免费
   - Netlify OAuth：免费
   - 无任何限制

3. **更灵活**
   - 浏览器直接操作 GitHub
   - 不依赖 Netlify 的 Git Gateway
   - 可以随时切换到其他 OAuth 服务器

4. **配置简单**
   - 只需要创建 OAuth App（5 分钟）
   - 在 Netlify 配置一次（2 分钟）
   - 修改 config.yml（1 分钟）

### 总耗时：约 10 分钟

---

## 下一步

你想要我帮你：
1. ✅ 实施方案三（推荐）
2. 提供详细的截图教程
3. 帮你修改配置文件
4. 测试整个流程

选择 1，我立即开始！
