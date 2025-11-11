# 本地启动命令速查

> 复制以下命令到终端即可运行，不依赖任何额外脚本。

## 1. 进入项目目录

```bash
cd /Users/gustave/Public/workdata/JavaProject/myBlog
```

若终端中尚未启用 `pnpm`，可执行：

```bash
corepack enable pnpm
```

## 2. 启动 Decap CMS 本地代理

在一个终端窗口中运行：

```bash
pnpm dlx decap-server
```

保持该终端不关闭。

## 3. 启动 Vite 开发服务器

另开一个终端窗口（或新建标签页）执行：

```bash
pnpm dev
```

## 4. 访问地址

- CMS 管理后台（开发环境）：<http://localhost:5173/admin/index.html>
- CMS 管理后台（生产部署预期路径）：<https://你的域名/admin>
- 前端页面预览：<http://localhost:5173>

## 5. 停止服务

分别在两个终端窗口中按下 `Ctrl + C` 即可结束对应服务。

