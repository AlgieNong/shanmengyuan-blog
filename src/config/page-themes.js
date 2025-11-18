/**
 * 页面整体样式主题配置
 * 控制页面背景、目录样式、整体配色等
 * 
 * 支持的主题：
 * - vue: Vue.js 官方文档风格（默认）
 * - gitbook: GitBook 淡蓝色渐变风格
 */

// 当前使用的页面主题
export const CURRENT_PAGE_THEME = 'gitbook'

// 页面主题配置
export const PAGE_THEMES = {
  // Vue.js 风格（默认）
  vue: {
    displayName: 'Vue 风格',
    description: 'Vue.js 官方文档风格，简洁专业',
    styles: {
      // 页面背景
      pageBackground: {
        light: '#ffffff',
        dark: '#1a1b26'
      },
      pageBackgroundGradient: null, // 无渐变
      
      // 目录容器样式
      toc: {
        container: {
          background: {
            light: 'rgba(255, 255, 255, 0.8)',
            dark: 'rgba(26, 27, 38, 0.8)'
          },
          backdropFilter: 'blur(10px)',
          border: {
            light: '1px solid rgba(0, 0, 0, 0.1)',
            dark: '1px solid rgba(255, 255, 255, 0.1)'
          },
          borderRadius: '0.75rem',
          boxShadow: {
            light: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            dark: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
          }
        },
        header: {
          borderBottom: {
            light: '1px solid rgba(0, 0, 0, 0.1)',
            dark: '1px solid rgba(255, 255, 255, 0.1)'
          }
        },
        title: {
          color: {
            light: '#213547',
            dark: '#aac8e4'
          }
        },
        link: {
          color: {
            light: '#6b7280',
            dark: '#9ca3af'
          },
          hover: {
            color: {
              light: '#213547',
              dark: '#aac8e4'
            },
            background: {
              light: 'rgba(0, 0, 0, 0.05)',
              dark: 'rgba(255, 255, 255, 0.05)'
            }
          },
          active: {
            color: {
              light: '#8b5cf6',
              dark: '#a78bfa'
            },
            background: {
              light: 'rgba(139, 92, 246, 0.1)',
              dark: 'rgba(139, 92, 246, 0.2)'
            },
            fontWeight: '600'
          }
        }
      }
    }
  },

  // GitBook 风格（基于实际 GitBook CSS 变量提取）
  // 主色：RGB(53, 154, 186) = #359aba
  gitbook: {
    displayName: 'GitBook 风格',
    description: 'GitBook 淡蓝色渐变风格，清新优雅（基于实际 GitBook 样式）',
    styles: {
      // 页面背景 - 淡蓝色渐变
      // 基于 GitBook 的实际背景色，使用主色 #359aba 的淡色变体
      pageBackground: {
        light: '#f5f9fb', // 基于 #359aba 的极淡色
        dark: '#1a1b26'
      },
      pageBackgroundGradient: {
        light: 'linear-gradient(135deg, #e8f2f7 0%, #f0f6f9 25%, #f5f9fb 50%, #f0f6f9 75%, #e8f2f7 100%)',
        dark: 'linear-gradient(135deg, #1a1b26 0%, #1e1f2e 50%, #1a1b26 100%)'
      },
      
      // 目录容器样式
      toc: {
        container: {
          background: {
            light: 'rgba(255, 255, 255, 0.95)',
            dark: 'rgba(26, 27, 38, 0.95)'
          },
          backdropFilter: 'blur(12px)',
          border: {
            light: '1px solid rgba(53, 154, 186, 0.2)', // 使用 GitBook 主色
            dark: '1px solid rgba(53, 154, 186, 0.3)'
          },
          borderRadius: '0.75rem',
          boxShadow: {
            light: '0 4px 12px rgba(53, 154, 186, 0.1), 0 2px 4px rgba(53, 154, 186, 0.05)',
            dark: '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)'
          }
        },
        header: {
          borderBottom: {
            light: '1px solid rgba(53, 154, 186, 0.15)',
            dark: '1px solid rgba(53, 154, 186, 0.25)'
          }
        },
        title: {
          color: {
            light: '#359aba', // GitBook 主色
            dark: '#5db3d1' // 稍亮的变体用于暗色模式
          },
          fontWeight: '600'
        },
        link: {
          color: {
            light: '#546e7a',
            dark: '#90a4ae'
          },
          hover: {
            color: {
              light: '#359aba', // GitBook 主色
              dark: '#5db3d1'
            },
            background: {
              light: 'rgba(53, 154, 186, 0.08)', // 使用 GitBook 主色
              dark: 'rgba(53, 154, 186, 0.15)'
            }
          },
          active: {
            color: {
              light: '#359aba', // GitBook 主色
              dark: '#5db3d1'
            },
            background: {
              light: 'rgba(53, 154, 186, 0.12)', // 使用 GitBook 主色
              dark: 'rgba(53, 154, 186, 0.2)'
            },
            fontWeight: '600',
            paddingLeft: {
              light: '0.75rem',
              dark: '0.75rem'
            },
            borderLeft: {
              light: '3px solid #359aba', // GitBook 主色
              dark: '3px solid #5db3d1'
            }
          }
        }
      }
    }
  }
}

/**
 * 获取当前页面主题配置
 * @returns {object|null} 主题配置对象
 */
export function getCurrentPageThemeConfig() {
  return PAGE_THEMES[CURRENT_PAGE_THEME] || PAGE_THEMES.vue
}

/**
 * 获取所有可用页面主题列表
 * @returns {array} 主题列表
 */
export function getAvailablePageThemes() {
  return Object.keys(PAGE_THEMES).map(key => ({
    key,
    displayName: PAGE_THEMES[key].displayName,
    description: PAGE_THEMES[key].description
  }))
}

