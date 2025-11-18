#!/bin/bash

# Markdown 主题下载脚本
# 使用方法：bash scripts/download-markdown-themes.sh

echo "开始下载 Markdown 主题..."

# 创建主题目录
mkdir -p public/markdown-themes

# 下载 GitHub Markdown 主题（亮色）
echo "下载 GitHub Markdown 主题（亮色）..."
curl -L -o public/markdown-themes/github-markdown.css \
  https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@main/github-markdown.css

if [ $? -eq 0 ]; then
  echo "✓ GitHub Markdown 主题下载成功"
  # 替换选择器
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' 's/\.markdown-body/\.prose/g' public/markdown-themes/github-markdown.css
  else
    # Linux
    sed -i 's/\.markdown-body/\.prose/g' public/markdown-themes/github-markdown.css
  fi
  echo "✓ 选择器已替换为 .prose"
else
  echo "✗ GitHub Markdown 主题下载失败，请手动下载"
  echo "  下载地址：https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@main/github-markdown.css"
  echo "  保存到：public/markdown-themes/github-markdown.css"
  echo "  然后运行：sed -i '' 's/\.markdown-body/\.prose/g' public/markdown-themes/github-markdown.css"
fi

# 下载 GitHub Markdown 主题（暗色）
echo ""
echo "下载 GitHub Markdown 主题（暗色）..."
curl -L -o public/markdown-themes/github-markdown-dark.css \
  https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@main/github-markdown-dark.css

if [ $? -eq 0 ]; then
  echo "✓ GitHub Markdown Dark 主题下载成功"
  # 替换选择器
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' 's/\.markdown-body/\.prose/g' public/markdown-themes/github-markdown-dark.css
  else
    # Linux
    sed -i 's/\.markdown-body/\.prose/g' public/markdown-themes/github-markdown-dark.css
  fi
  echo "✓ 选择器已替换为 .prose"
else
  echo "✗ GitHub Markdown Dark 主题下载失败，请手动下载"
  echo "  下载地址：https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@main/github-markdown-dark.css"
  echo "  保存到：public/markdown-themes/github-markdown-dark.css"
  echo "  然后运行：sed -i '' 's/\.markdown-body/\.prose/g' public/markdown-themes/github-markdown-dark.css"
fi

echo ""
echo "完成！"
echo ""
echo "已下载的主题："
ls -lh public/markdown-themes/*.css 2>/dev/null || echo "  暂无主题文件"
echo ""
echo "下一步："
echo "1. 在 src/config/markdown-themes.js 中取消注释对应的主题配置"
echo "2. 修改 CURRENT_THEME 或使用主题选择器切换主题"

