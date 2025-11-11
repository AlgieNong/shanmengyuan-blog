#!/bin/zsh

set -euo pipefail

# 预加载 shell 配置，确保 PNPM 等命令可用
if [ -f "$HOME/.zshrc" ]; then
  source "$HOME/.zshrc"
fi

PROJECT_DIR="/Users/gustave/Public/workdata/JavaProject/myBlog"
cd "$PROJECT_DIR"

echo "当前目录：$PROJECT_DIR"

# 确保 pnpm 可用；若未检测到尝试通过 corepack 启用
if ! command -v pnpm >/dev/null 2>&1; then
  if command -v corepack >/dev/null 2>&1; then
    echo "检测到 corepack，尝试启用 pnpm..."
    corepack enable pnpm || true
  fi
fi

if ! command -v pnpm >/dev/null 2>&1; then
  echo "未检测到 pnpm，请先安装 pnpm 再运行脚本。" >&2
  read -n 1 -s -r -p "按任意键退出..."
  exit 1
fi

cleanup() {
  echo ""
  echo "捕获到退出信号，正在停止本地服务..."
  if [ -n "${DECAP_PID:-}" ] && ps -p "$DECAP_PID" >/dev/null 2>&1; then
    kill "$DECAP_PID" || true
  fi
  if [ -n "${VITE_PID:-}" ] && ps -p "$VITE_PID" >/dev/null 2>&1; then
    kill "$VITE_PID" || true
  fi
  wait || true
  echo "服务已停止，再见 👋"
}

trap cleanup INT TERM

echo "启动 Decap CMS 本地代理（pnpm dlx decap-server）..."
pnpm dlx decap-server &
DECAP_PID=$!

sleep 2

echo "启动 Vite 开发服务器（pnpm dev）..."
pnpm dev &
VITE_PID=$!

echo "全部服务已启动。"
echo "访问 http://localhost:5173/admin 进入 CMS，或 http://localhost:5173 查看前端页面。"
echo "按 Ctrl+C 可同时停止两个服务。"

wait

