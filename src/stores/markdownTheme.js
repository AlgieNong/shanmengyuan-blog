import { defineStore } from 'pinia'
import { ref } from 'vue'
import { 
  CURRENT_THEME, 
  THEMES, 
  THEME_BASE_PATH,
  getAvailableThemes
} from '../config/markdown-themes.js'
import { generateMarkdownThemeCss } from '../utils/cssGenerator.js'

export const useMarkdownThemeStore = defineStore('markdownTheme', () => {
  // 当前 Markdown 内容样式主题
  const currentTheme = ref(CURRENT_THEME)

  /**
   * 初始化主题
   */
  const initTheme = () => {
    // 尝试从 localStorage 恢复主题
    const savedTheme = localStorage.getItem('markdown-theme')
    if (savedTheme && THEMES[savedTheme]) {
      currentTheme.value = savedTheme
    } else {
      // 如果没有保存的主题，使用配置文件中的默认主题
      currentTheme.value = CURRENT_THEME
    }
    applyTheme()
  }

  /**
   * 切换 Markdown 内容样式主题
   * @param {string} themeKey - 主题键名（如 'default', 'elegant', 'compact'）
   */
  const setTheme = (themeKey) => {
    console.log(`🔄 切换主题：${themeKey}`)
    if (THEMES[themeKey]) {
      currentTheme.value = themeKey
      localStorage.setItem('markdown-theme', themeKey)
      applyTheme()
      console.log(`✅ 主题切换成功：${themeKey}`)
    } else {
      console.warn(`❌ 主题 "${themeKey}" 不存在，可用主题：`, Object.keys(THEMES))
    }
  }

  /**
   * 应用主题样式
   */
  const applyTheme = () => {
    // 直接使用当前主题，而不是配置文件中的常量
    const themeConfig = THEMES[currentTheme.value]
    if (!themeConfig) {
      console.warn(`主题配置不存在：${currentTheme.value}`)
      return
    }

    // 先清理之前的 CSS link 标签（如果存在）
    const oldLink = document.getElementById('markdown-theme-css')
    if (oldLink) {
      oldLink.remove()
    }

    // 如果是 CSS 文件类型，加载外部 CSS
    if (themeConfig.type === 'css') {
      loadCssTheme(themeConfig)
      return
    }

    // 如果是配置类型，使用通用 CSS 生成器
    if (!themeConfig.config) {
      console.warn('主题配置不存在')
      return
    }

    const styleId = 'markdown-theme-styles'
    let styleElement = document.getElementById(styleId)

    // 如果样式元素不存在，创建它
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    // 使用通用 CSS 生成器生成样式
    // 使用 .vue-markdown 选择器，因为 PostDetail.vue 中使用的是这个类名
    const css = `/* Markdown 内容样式主题：${themeConfig.displayName} */\n${generateMarkdownThemeCss(themeConfig, '.vue-markdown')}`

    // 更新样式内容
    styleElement.textContent = css
    
    // 调试信息
    console.log(`✅ 主题样式已应用：${themeConfig.displayName}`, {
      themeKey: currentTheme.value,
      styleId,
      cssLength: css.length,
      styleElement: styleElement.id
    })
  }

  /**
   * 加载外部 CSS 主题文件
   * @param {object} themeConfig - 主题配置对象
   */
  const loadCssTheme = (themeConfig) => {
    const linkId = 'markdown-theme-css'
    let linkElement = document.getElementById(linkId)

    // 如果链接元素已存在，先移除
    if (linkElement) {
      linkElement.remove()
    }

    // 创建新的 link 元素
    linkElement = document.createElement('link')
    linkElement.id = linkId
    linkElement.rel = 'stylesheet'
    linkElement.type = 'text/css'

    // 确定 CSS 文件路径
    if (themeConfig.cssUrl) {
      // 使用 CDN URL
      linkElement.href = themeConfig.cssUrl
    } else if (themeConfig.cssFile) {
      // 使用本地文件（相对于 public/markdown-themes/ 目录）
      linkElement.href = `${THEME_BASE_PATH}/${themeConfig.cssFile}`
    } else {
      console.error('CSS 主题配置错误：必须提供 cssFile 或 cssUrl')
      return
    }

    // 添加到 head
    document.head.appendChild(linkElement)

    // 处理加载错误
    linkElement.onerror = () => {
      console.error(`无法加载 CSS 主题文件：${linkElement.href}`)
      console.warn('请确保 CSS 文件存在于 public/markdown-themes/ 目录')
    }

    // 处理加载成功
    linkElement.onload = () => {
      console.log(`CSS 主题文件加载成功：${linkElement.href}`)
    }
  }

  return {
    currentTheme,
    initTheme,
    setTheme,
    availableThemes: getAvailableThemes()
  }
})

