/**
 * Markdown 内容样式主题配置
 * 控制标题、段落、列表、表格等 Markdown 内容的样式
 * 
 * 支持两种主题类型：
 * 1. config 类型：使用 JavaScript 对象配置（适合简单自定义）
 * 2. css 类型：使用外部 CSS 文件（适合使用现成的主题）
 * 
 * 使用方法：
 * 1. 快速切换主题：修改 CURRENT_THEME 常量
 * 2. 添加新主题：在 THEMES 对象中添加配置
 * 3. 使用外部 CSS：将 CSS 文件放到 public/markdown-themes/ 目录，然后在配置中引用
 */

// 当前使用的主题
export const CURRENT_THEME = 'gitbook'

// 主题文件基础路径
export const THEME_BASE_PATH = '/markdown-themes'

// 主题列表配置
export const THEMES = {
  // 默认主题（当前使用）
  default: {
    displayName: '默认主题',
    description: '简洁清晰的默认样式',
    config: {
      // 标题样式
      h1: {
        fontSize: '2.25rem',
        fontWeight: '700',
        lineHeight: '1.3',
        marginTop: '2rem',
        marginBottom: '1rem',
        color: 'inherit'
      },
      h2: {
        fontSize: '1.875rem',
        fontWeight: '600',
        lineHeight: '1.4',
        marginTop: '1.75rem',
        marginBottom: '0.75rem',
        color: 'inherit'
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: '600',
        lineHeight: '1.5',
        marginTop: '1.5rem',
        marginBottom: '0.75rem',
        color: 'inherit'
      },
      // 段落样式
      p: {
        fontSize: '1rem',
        lineHeight: '1.7',
        marginBottom: '1.25rem',
        color: 'inherit'
      },
      // 列表样式
      ul: {
        marginBottom: '1.25rem',
        paddingLeft: '1.625rem'
      },
      li: {
        marginBottom: '0.5rem'
      },
      // 引用块样式
      blockquote: {
        borderLeft: '4px solid #e5e7eb',
        paddingLeft: '1rem',
        margin: '1.5rem 0',
        fontStyle: 'italic',
        color: 'inherit'
      },
      // 链接样式
      a: {
        color: '#3b82f6',
        textDecoration: 'none',
        borderBottom: '2px solid transparent',
        transition: 'all 0.2s'
      },
      aHover: {
        color: '#1d4ed8',
        borderBottomColor: '#3b82f6'
      }
    }
  },
  
  // 优雅主题（更大字体、更宽松间距）
  elegant: {
    displayName: '优雅主题',
    description: '更大字体、更宽松间距，适合长文阅读',
    config: {
      h1: {
        fontSize: '2.5rem',
        fontWeight: '700',
        lineHeight: '1.2',
        marginTop: '2.5rem',
        marginBottom: '1.5rem',
        color: 'inherit',
        letterSpacing: '-0.02em'
      },
      h2: {
        fontSize: '2rem',
        fontWeight: '600',
        lineHeight: '1.3',
        marginTop: '2rem',
        marginBottom: '1rem',
        color: 'inherit',
        letterSpacing: '-0.01em'
      },
      h3: {
        fontSize: '1.625rem',
        fontWeight: '600',
        lineHeight: '1.4',
        marginTop: '1.75rem',
        marginBottom: '0.875rem',
        color: 'inherit'
      },
      p: {
        fontSize: '1.125rem',
        lineHeight: '1.8',
        marginBottom: '1.5rem',
        color: 'inherit'
      },
      ul: {
        marginBottom: '1.5rem',
        paddingLeft: '1.75rem'
      },
      li: {
        marginBottom: '0.75rem',
        lineHeight: '1.7'
      },
      blockquote: {
        borderLeft: '4px solid #6366f1',
        paddingLeft: '1.25rem',
        margin: '2rem 0',
        fontStyle: 'italic',
        color: 'inherit',
        fontSize: '1.0625rem',
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
        padding: '1rem 1.25rem',
        borderRadius: '0.5rem'
      },
      a: {
        color: '#6366f1',
        textDecoration: 'none',
        borderBottom: '2px solid #6366f1',
        transition: 'all 0.2s'
      },
      aHover: {
        color: '#4f46e5',
        borderBottomColor: '#4f46e5'
      }
    }
  },
  
  // 紧凑主题（更小字体、更紧凑间距）
  compact: {
    displayName: '紧凑主题',
    description: '更小字体、更紧凑间距，适合技术文档',
    config: {
      h1: {
        fontSize: '2rem',
        fontWeight: '700',
        lineHeight: '1.3',
        marginTop: '1.75rem',
        marginBottom: '0.875rem',
        color: 'inherit'
      },
      h2: {
        fontSize: '1.625rem',
        fontWeight: '600',
        lineHeight: '1.4',
        marginTop: '1.5rem',
        marginBottom: '0.625rem',
        color: 'inherit'
      },
      h3: {
        fontSize: '1.375rem',
        fontWeight: '600',
        lineHeight: '1.5',
        marginTop: '1.25rem',
        marginBottom: '0.625rem',
        color: 'inherit'
      },
      p: {
        fontSize: '0.9375rem',
        lineHeight: '1.6',
        marginBottom: '1rem',
        color: 'inherit'
      },
      ul: {
        marginBottom: '1rem',
        paddingLeft: '1.5rem'
      },
      li: {
        marginBottom: '0.375rem',
        lineHeight: '1.6'
      },
      blockquote: {
        borderLeft: '3px solid #d1d5db',
        paddingLeft: '0.875rem',
        margin: '1.25rem 0',
        fontStyle: 'italic',
        color: 'inherit',
        fontSize: '0.9375rem'
      },
      a: {
        color: '#2563eb',
        textDecoration: 'none',
        borderBottom: '1px solid transparent',
        transition: 'all 0.2s'
      },
      aHover: {
        color: '#1d4ed8',
        borderBottomColor: '#2563eb'
      }
    }
  },
  
  // 现代主题（圆角、渐变、阴影）
  modern: {
    displayName: '现代主题',
    description: '圆角、渐变、阴影，现代感设计',
    config: {
      h1: {
        fontSize: '2.5rem',
        fontWeight: '800',
        lineHeight: '1.2',
        marginTop: '2.5rem',
        marginBottom: '1.5rem',
        color: 'inherit',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      },
      h2: {
        fontSize: '2rem',
        fontWeight: '700',
        lineHeight: '1.3',
        marginTop: '2rem',
        marginBottom: '1rem',
        color: 'inherit',
        position: 'relative',
        paddingBottom: '0.5rem'
      },
      h3: {
        fontSize: '1.625rem',
        fontWeight: '600',
        lineHeight: '1.4',
        marginTop: '1.75rem',
        marginBottom: '0.875rem',
        color: 'inherit'
      },
      p: {
        fontSize: '1.0625rem',
        lineHeight: '1.75',
        marginBottom: '1.5rem',
        color: 'inherit'
      },
      ul: {
        marginBottom: '1.5rem',
        paddingLeft: '1.75rem'
      },
      li: {
        marginBottom: '0.625rem',
        lineHeight: '1.7'
      },
      blockquote: {
        borderLeft: '4px solid #667eea',
        paddingLeft: '1.25rem',
        margin: '2rem 0',
        fontStyle: 'italic',
        color: 'inherit',
        backgroundColor: 'rgba(102, 126, 234, 0.05)',
        padding: '1.25rem',
        borderRadius: '0.75rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      },
      a: {
        color: '#667eea',
        textDecoration: 'none',
        borderBottom: '2px solid #667eea',
        transition: 'all 0.2s',
        fontWeight: '500'
      },
      aHover: {
        color: '#5568d3',
        borderBottomColor: '#5568d3',
        transform: 'translateY(-1px)'
      }
    }
  },
  
  // 极简主题（最小化样式）
  minimal: {
    displayName: '极简主题',
    description: '最小化样式，专注内容',
    config: {
      h1: {
        fontSize: '2rem',
        fontWeight: '600',
        lineHeight: '1.4',
        marginTop: '2rem',
        marginBottom: '1rem',
        color: 'inherit'
      },
      h2: {
        fontSize: '1.625rem',
        fontWeight: '600',
        lineHeight: '1.4',
        marginTop: '1.75rem',
        marginBottom: '0.75rem',
        color: 'inherit'
      },
      h3: {
        fontSize: '1.375rem',
        fontWeight: '500',
        lineHeight: '1.5',
        marginTop: '1.5rem',
        marginBottom: '0.625rem',
        color: 'inherit'
      },
      p: {
        fontSize: '1rem',
        lineHeight: '1.7',
        marginBottom: '1.25rem',
        color: 'inherit'
      },
      ul: {
        marginBottom: '1.25rem',
        paddingLeft: '1.5rem',
        listStyleType: 'none'
      },
      li: {
        marginBottom: '0.5rem',
        position: 'relative',
        paddingLeft: '1.25rem'
      },
      blockquote: {
        borderLeft: '2px solid #d1d5db',
        paddingLeft: '1rem',
        margin: '1.5rem 0',
        color: 'inherit'
      },
      a: {
        color: 'inherit',
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
        transition: 'all 0.2s'
      },
      aHover: {
        opacity: '0.7'
      }
    }
  },
  
  // ========== 外部 CSS 文件主题 ==========
  // 以下主题使用外部 CSS 文件，CSS 文件已下载到 public/markdown-themes/ 目录
  
  // GitBook 风格主题（基于实际 GitBook 样式提取）
  // 主色：RGB(53, 154, 186) = #359aba
  gitbook: {
    displayName: 'GitBook 风格',
    description: 'GitBook 淡蓝色风格，优雅清新（基于实际 GitBook 样式）',
    config: {
      // 标题样式 - 使用 GitBook 主色和优雅的字体大小
      h1: {
        fontSize: '2.5rem',
        fontWeight: '700',
        lineHeight: '1.2',
        marginTop: '2.5rem',
        marginBottom: '1.5rem',
        color: '#213547', // 深色文字
        letterSpacing: '-0.02em'
      },
      h2: {
        fontSize: '2rem',
        fontWeight: '600',
        lineHeight: '1.3',
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#213547',
        letterSpacing: '-0.01em',
        borderBottom: '1px solid rgba(53, 154, 186, 0.2)', // GitBook 主色边框
        paddingBottom: '0.5rem'
      },
      h3: {
        fontSize: '1.625rem',
        fontWeight: '600',
        lineHeight: '1.4',
        marginTop: '1.75rem',
        marginBottom: '0.875rem',
        color: '#213547'
      },
      h4: {
        fontSize: '1.375rem',
        fontWeight: '600',
        lineHeight: '1.5',
        marginTop: '1.5rem',
        marginBottom: '0.75rem',
        color: '#213547'
      },
      // 段落样式 - GitBook 使用较大的字体和宽松的行高
      p: {
        fontSize: '1.0625rem', // 17px，比标准稍大
        lineHeight: '1.75', // 宽松的行高，适合阅读
        marginBottom: '1.5rem',
        color: '#374151' // 柔和的灰色文字
      },
      // 列表样式
      ul: {
        marginBottom: '1.5rem',
        paddingLeft: '1.75rem'
      },
      ol: {
        marginBottom: '1.5rem',
        paddingLeft: '1.75rem'
      },
      li: {
        marginBottom: '0.75rem',
        lineHeight: '1.7',
        color: '#374151'
      },
      // 引用块样式 - GitBook 使用淡蓝色边框和背景
      blockquote: {
        borderLeft: '4px solid #359aba', // GitBook 主色
        paddingLeft: '1.25rem',
        margin: '2rem 0',
        fontStyle: 'normal',
        color: '#4b5563',
        fontSize: '1.0625rem',
        backgroundColor: 'rgba(53, 154, 186, 0.05)', // 极淡的蓝色背景
        padding: '1.25rem',
        borderRadius: '0.5rem',
        borderColor: 'rgba(53, 154, 186, 0.2)'
      },
      // 链接样式 - GitBook 使用主色，无下划线
      a: {
        color: '#359aba', // GitBook 主色
        textDecoration: 'none',
        borderBottom: '1px solid rgba(53, 154, 186, 0.3)',
        transition: 'all 0.2s',
        fontWeight: '500'
      },
      aHover: {
        color: '#2a7a96', // 稍深的蓝色
        borderBottomColor: '#359aba'
      },
      // 代码样式
      code: {
        backgroundColor: 'rgba(53, 154, 186, 0.1)',
        color: '#359aba',
        padding: '0.125rem 0.375rem',
        borderRadius: '0.25rem',
        fontSize: '0.9375rem',
        fontWeight: '500'
      },
      // 表格样式
      table: {
        marginBottom: '1.5rem',
        borderCollapse: 'collapse',
        width: '100%'
      },
      th: {
        backgroundColor: 'rgba(53, 154, 186, 0.1)',
        color: '#213547',
        fontWeight: '600',
        padding: '0.75rem',
        border: '1px solid rgba(53, 154, 186, 0.2)',
        textAlign: 'left'
      },
      td: {
        padding: '0.75rem',
        border: '1px solid rgba(53, 154, 186, 0.1)',
        color: '#374151'
      }
    }
  },
  
  // GitHub 风格主题（推荐，已配置）
  githubMarkdown: {
    type: 'css',
    displayName: 'GitHub Markdown',
    description: 'GitHub 官方 Markdown 样式，简洁专业',
    cssFile: 'github-markdown.css'
  },
  
  // 如果你下载了其他主题，可以在这里添加：
  /*
  // GitHub 暗色风格主题
  // 下载命令：curl -o public/markdown-themes/github-markdown-dark.css https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@main/github-markdown-dark.css
  // 然后运行：sed -i '' 's/\.markdown-body/\.prose/g' public/markdown-themes/github-markdown-dark.css
  githubMarkdownDark: {
    type: 'css',
    displayName: 'GitHub Dark',
    description: 'GitHub 暗色 Markdown 样式',
    cssFile: 'github-markdown-dark.css'
  },
  
  // 如果你有 CDN 上的主题，可以直接使用 URL
  cdnTheme: {
    type: 'css',
    displayName: 'CDN 主题',
    description: '从 CDN 加载的主题',
    cssUrl: 'https://cdn.example.com/themes/my-theme.css'
  }
  */
}

/**
 * 获取当前主题配置
 * @returns {object|null} 主题配置对象
 */
export function getCurrentThemeConfig() {
  return THEMES[CURRENT_THEME] || THEMES.default
}

/**
 * 获取所有可用主题列表
 * @returns {array} 主题列表
 */
export function getAvailableThemes() {
  return Object.keys(THEMES).map(key => ({
    key,
    displayName: THEMES[key].displayName,
    description: THEMES[key].description
  }))
}

