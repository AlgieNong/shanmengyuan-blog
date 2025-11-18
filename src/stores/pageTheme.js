import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { 
  CURRENT_PAGE_THEME, 
  PAGE_THEMES, 
  getCurrentPageThemeConfig
} from '../config/page-themes.js'
import { useThemeStore } from './theme'

export const usePageThemeStore = defineStore('pageTheme', () => {
  // 当前页面主题
  const currentTheme = ref(CURRENT_PAGE_THEME)

  // 获取主题 store（用于判断暗色模式）
  const themeStore = useThemeStore()

  /**
   * 初始化页面主题
   */
  const initTheme = () => {
    // 尝试从 localStorage 恢复主题
    const savedTheme = localStorage.getItem('page-theme')
    if (savedTheme && PAGE_THEMES[savedTheme]) {
      currentTheme.value = savedTheme
    } else {
      // 如果没有保存的主题，使用配置文件中的默认主题
      currentTheme.value = CURRENT_PAGE_THEME
    }
    applyTheme()
  }

  /**
   * 切换页面主题
   * @param {string} themeKey - 主题键名（如 'vue', 'gitbook'）
   */
  const setTheme = (themeKey) => {
    console.log(`🔄 切换页面主题：${themeKey}`)
    if (PAGE_THEMES[themeKey]) {
      currentTheme.value = themeKey
      localStorage.setItem('page-theme', themeKey)
      applyTheme()
      console.log(`✅ 页面主题切换成功：${themeKey}`)
    } else {
      console.warn(`❌ 页面主题 "${themeKey}" 不存在，可用主题：`, Object.keys(PAGE_THEMES))
    }
  }

  /**
   * 应用页面主题样式
   */
  const applyTheme = () => {
    const themeConfig = PAGE_THEMES[currentTheme.value]
    if (!themeConfig) {
      console.warn(`页面主题配置不存在：${currentTheme.value}`)
      return
    }

    const styles = themeConfig.styles
    const isDark = themeStore.isDark
    const styleId = 'page-theme-styles'
    let styleElement = document.getElementById(styleId)

    // 如果样式元素不存在，创建它
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    // 生成 CSS 样式
    let css = `
      /* 页面主题样式：${themeConfig.displayName} */
      
      /* 页面背景 */
      .page-theme-container {
        ${styles.pageBackgroundGradient 
          ? `background: ${isDark ? styles.pageBackgroundGradient.dark : styles.pageBackgroundGradient.light};`
          : `background: ${isDark ? styles.pageBackground.dark : styles.pageBackground.light};`
        }
        transition: background 0.3s ease;
      }

      /* GitBook 风格布局 */
      .page-main-content {
        position: relative;
        min-width: 0;
        flex: 1;
        max-width: 1536px; /* max-w-screen-2xl */
        padding-top: 2rem; /* py-8 */
        padding-bottom: 2rem;
        margin: 0 auto;
        width: 100%;
      }

      .page-content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      @media (min-width: 1024px) {
        .page-content-wrapper {
          flex-direction: row;
          gap: 3rem;
        }
      }

      /* 主内容容器 - GitBook 风格：max-w-3xl (768px) 居中 */
      .page-content-container {
        flex: 1;
        min-width: 0;
        max-width: 48rem; /* max-w-3xl = 768px */
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        padding-left: 1rem; /* px-4 */
        padding-right: 1rem;
      }

      @media (min-width: 640px) {
        .page-content-container {
          padding-left: 1.5rem; /* sm:px-6 */
          padding-right: 1.5rem;
        }
      }

      @media (min-width: 1024px) {
        .page-content-container {
          margin-left: 0; /* lg:mx-0 - 在大屏时左对齐 */
          margin-right: auto;
        }
      }

      /* 目录侧边栏 - GitBook 风格：14rem (224px) */
      .page-toc-sidebar {
        display: none;
        width: 14rem; /* 224px */
        flex-shrink: 0;
      }

      @media (min-width: 1024px) {
        .page-toc-sidebar {
          display: block;
        }
      }

      /* 目录容器样式 */
      .toc-container {
        background: ${isDark ? styles.toc.container.background.dark : styles.toc.container.background.light} !important;
        backdrop-filter: ${styles.toc.container.backdropFilter} !important;
        border: ${isDark ? styles.toc.container.border.dark : styles.toc.container.border.light} !important;
        border-radius: ${styles.toc.container.borderRadius} !important;
        box-shadow: ${isDark ? styles.toc.container.boxShadow.dark : styles.toc.container.boxShadow.light} !important;
      }

      /* 目录头部 */
      .toc-header {
        border-bottom: ${isDark ? styles.toc.header.borderBottom.dark : styles.toc.header.borderBottom.light} !important;
      }

      /* 目录标题 */
      .toc-title {
        color: ${isDark ? styles.toc.title.color.dark : styles.toc.title.color.light} !important;
        ${styles.toc.title.fontWeight ? `font-weight: ${styles.toc.title.fontWeight} !important;` : ''}
      }

      /* 目录链接 */
      .toc-link {
        color: ${isDark ? styles.toc.link.color.dark : styles.toc.link.color.light} !important;
      }

      .toc-link:hover {
        color: ${isDark ? styles.toc.link.hover.color.dark : styles.toc.link.hover.color.light} !important;
        background: ${isDark ? styles.toc.link.hover.background.dark : styles.toc.link.hover.background.light} !important;
      }

      /* 目录激活项 */
      .toc-item-active > .toc-link {
        color: ${isDark ? styles.toc.link.active.color.dark : styles.toc.link.active.color.light} !important;
        background: ${isDark ? styles.toc.link.active.background.dark : styles.toc.link.active.background.light} !important;
        font-weight: ${styles.toc.link.active.fontWeight} !important;
        ${styles.toc.link.active.paddingLeft 
          ? `padding-left: ${isDark ? styles.toc.link.active.paddingLeft.dark : styles.toc.link.active.paddingLeft.light} !important;`
          : ''
        }
        ${styles.toc.link.active.borderLeft 
          ? `border-left: ${isDark ? styles.toc.link.active.borderLeft.dark : styles.toc.link.active.borderLeft.light} !important;`
          : ''
        }
      }
    `

    // 更新样式内容
    styleElement.textContent = css
    
    // 调试信息
    console.log(`✅ 页面主题样式已应用：${themeConfig.displayName}`, {
      themeKey: currentTheme.value,
      isDark,
      styleId
    })
  }

  // 监听暗色模式变化，重新应用主题
  watch(() => themeStore.isDark, () => {
    applyTheme()
  })

  return {
    currentTheme,
    initTheme,
    setTheme,
    availableThemes: Object.keys(PAGE_THEMES).map(key => ({
      key,
      displayName: PAGE_THEMES[key].displayName,
      description: PAGE_THEMES[key].description
    }))
  }
})

