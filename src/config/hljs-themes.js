/**
 * Highlight.js 主题配置
 * 支持 CDN 和本地文件两种方式
 * 
 * 使用方法：
 * 1. 快速切换主题：修改 CURRENT_THEME 常量
 * 2. 添加新主题：在 THEMES 对象中添加配置
 * 3. 切换 CDN/本地：修改 USE_CDN 常量
 */

// Highlight.js 版本（与 package.json 保持一致）
export const HLJS_VERSION = '11.9.0'

// CDN 基础路径
export const CDN_BASE = `https://cdn.jsdelivr.net/npm/highlight.js@${HLJS_VERSION}/styles`

// 本地文件基础路径（如果使用本地文件）
export const LOCAL_BASE = '/hljs'

// 主题列表配置
// 每个主题包含亮色和暗色两个变体
export const THEMES = {
  // GitHub 系列（当前默认）
  github: {
    light: 'github',
    dark: 'github-dark',
    displayName: 'GitHub',
    description: 'GitHub 官方风格，简洁清晰'
  },
  // Atom 系列
  atom: {
    light: 'atom-one-light',
    dark: 'atom-one-dark',
    displayName: 'Atom One',
    description: 'Atom 编辑器风格，现代美观'
  },
  // Monokai 系列
  monokai: {
    light: 'stackoverflow-light',
    dark: 'monokai',
    displayName: 'Monokai',
    description: 'Monokai 经典暗色主题'
  },
  // Dracula 系列
  dracula: {
    light: 'vs',
    dark: 'dracula',
    displayName: 'Dracula',
    description: 'Dracula 暗色主题，护眼舒适'
  },
  // Visual Studio 系列
  vs: {
    light: 'vs',
    dark: 'vs2015',
    displayName: 'Visual Studio',
    description: 'Visual Studio 编辑器风格'
  },
  // Xcode 系列
  xcode: {
    light: 'xcode',
    dark: 'github-dark',
    displayName: 'Xcode',
    description: 'Xcode 编辑器风格'
  },
  // Stack Overflow 系列
  stackoverflow: {
    light: 'stackoverflow-light',
    dark: 'stackoverflow-dark',
    displayName: 'Stack Overflow',
    description: 'Stack Overflow 风格'
  },
  // Nord 系列
  nord: {
    light: 'github',
    dark: 'nord',
    displayName: 'Nord',
    description: 'Nord 北极风格，冷色调'
  },
  // Tokyo Night 系列
  tokyoNight: {
    light: 'github',
    dark: 'tokyo-night-dark',
    displayName: 'Tokyo Night',
    description: 'Tokyo Night 暗色主题，现代美观'
  },
  // A11y 无障碍系列
  a11y: {
    light: 'a11y-light',
    dark: 'a11y-dark',
    displayName: 'A11y',
    description: '无障碍主题，高对比度，易于阅读'
  },
  // Material 系列
  material: {
    light: 'github',
    dark: 'material-darker',
    displayName: 'Material',
    description: 'Material Design 风格主题'
  }
}

// 当前使用的主题（可在此快速切换）
// 可选值：github, atom, monokai, dracula, vs, xcode, stackoverflow, nord, tokyoNight, a11y, material
// 你也可以添加自定义主题，详见 docs/主题列表与自定义主题指南.md
export const CURRENT_THEME = 'github'

// 使用 CDN 还是本地文件（true: CDN, false: 本地文件）
// 生产环境建议使用本地文件以提高加载速度
export const USE_CDN = true

/**
 * 获取主题 CSS 路径
 * @param {string} themeName - 主题名称（如 'github', 'monokai'）
 * @param {boolean} useCdn - 是否使用 CDN（默认使用 USE_CDN 常量）
 * @returns {string} CSS 文件路径
 */
export function getThemePath(themeName, useCdn = USE_CDN) {
  if (!themeName) {
    console.warn('主题名称不能为空')
    return ''
  }
  
  const base = useCdn ? CDN_BASE : LOCAL_BASE
  return `${base}/${themeName}.min.css`
}

/**
 * 获取当前主题配置
 * @returns {object|null} 主题配置对象
 */
export function getCurrentThemeConfig() {
  return THEMES[CURRENT_THEME] || null
}

/**
 * 获取所有可用主题列表
 * @returns {array} 主题列表
 */
export function getAvailableThemes() {
  return Object.keys(THEMES).map(key => ({
    key,
    ...THEMES[key]
  }))
}

