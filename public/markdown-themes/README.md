# Markdown 主题 CSS 文件目录

将你下载或编写的 Markdown 内容样式主题 CSS 文件放在这个目录下。

## 使用方法

1. **放置 CSS 文件**：将 CSS 文件放到此目录
2. **配置主题**：在 `src/config/markdown-themes.js` 中添加配置
3. **切换主题**：修改 `CURRENT_THEME` 或使用主题选择器

## 示例配置

```javascript
// src/config/markdown-themes.js
export const THEMES = {
  myTheme: {
    type: 'css',
    displayName: '我的主题',
    description: '使用外部 CSS 文件',
    cssFile: 'my-theme.css'  // 文件名（相对于此目录）
  }
}
```

## CSS 文件要求

- 选择器需要使用 `.prose` 前缀
- 支持暗色模式（使用 `.dark` 类）
- 参考 `example-theme.css` 了解格式

## 更多信息

查看 `docs/Markdown内容样式主题-外部CSS使用指南.md` 了解详细使用方法。

