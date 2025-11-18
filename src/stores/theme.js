import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { 
  CURRENT_THEME, 
  THEMES, 
  getThemePath, 
  USE_CDN,
  getAvailableThemes
} from '../config/hljs-themes.js'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  // 当前代码高亮主题（从配置文件读取，支持运行时切换）
  const currentHljsTheme = ref(CURRENT_THEME)

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    // 尝试从 localStorage 恢复代码高亮主题
    const savedHljsTheme = localStorage.getItem('hljs-theme')
    if (savedHljsTheme && THEMES[savedHljsTheme]) {
      currentHljsTheme.value = savedHljsTheme
    } else {
      // 确保使用配置文件中的默认主题
      currentHljsTheme.value = CURRENT_THEME
    }
    
    applyTheme()
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  /**
   * 切换代码高亮主题
   * @param {string} themeKey - 主题键名（如 'github', 'monokai', 'dracula'）
   */
  const setHljsTheme = (themeKey) => {
    if (THEMES[themeKey]) {
      currentHljsTheme.value = themeKey
      localStorage.setItem('hljs-theme', themeKey)
      applyTheme()
    } else {
      console.warn(`主题 "${themeKey}" 不存在，可用主题：`, Object.keys(THEMES))
    }
  }

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      // 启用暗色主题，关闭亮色主题
      ensureHljsTheme(false, true)  // isLight=false, enable=true -> 启用暗色主题
      ensureHljsTheme(true, false) // isLight=true, enable=false -> 关闭亮色主题
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      // 启用亮色主题，关闭暗色主题
      ensureHljsTheme(true, true)   // isLight=true, enable=true -> 启用亮色主题
      ensureHljsTheme(false, false) // isLight=false, enable=false -> 关闭暗色主题
    }
  }

  /**
   * 确保 highlight.js 主题已加载
   * @param {boolean} isLight - 是否为亮色主题
   * @param {boolean} enable - 是否启用
   */
  function ensureHljsTheme(isLight, enable) {
    const themeConfig = THEMES[currentHljsTheme.value]
    if (!themeConfig) {
      console.warn(`主题配置 "${currentHljsTheme.value}" 不存在`)
      return
    }

    const themeName = isLight ? themeConfig.light : themeConfig.dark
    const id = `hljs-${isLight ? 'light' : 'dark'}-theme`
    const existing = document.getElementById(id)

    if (enable) {
      const newHref = getThemePath(themeName, USE_CDN)
      
      // 如果已存在且链接相同，不需要更新
      if (existing && existing.href === newHref) {
        return
      }
      
      // 如果已存在但链接不同，先移除
      if (existing) {
        existing.remove()
      }
      
      // 创建新的 link 元素
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = newHref
      
      // 注意：Tracking Prevention 警告通常不影响 CSS 加载
      // 如果遇到样式不生效的问题，建议在配置中设置 USE_CDN = false 使用本地文件
      
      // 添加加载成功/失败的回调，用于调试
      link.onload = () => {
        console.log(`✅ Highlight.js 主题加载成功: ${themeName} (${isLight ? 'light' : 'dark'})`)
      }
      link.onerror = () => {
        console.error(`❌ Highlight.js 主题加载失败: ${newHref}`)
      }
      
      document.head.appendChild(link)
    } else {
      if (existing) existing.remove()
    }
  }

  watch(isDark, applyTheme)

  return {
    isDark,
    currentHljsTheme,
    initTheme,
    toggleTheme,
    setHljsTheme,
    // 导出主题列表供外部使用（如主题选择器组件）
    availableThemes: getAvailableThemes()
  }
})