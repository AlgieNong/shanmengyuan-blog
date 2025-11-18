/**
 * 通用 CSS 生成器
 * 用于将配置对象转换为 CSS 样式
 * 
 * 设计原则：
 * 1. 配置驱动：通过配置对象定义样式，无需修改代码
 * 2. 自动映射：CSS 属性自动从配置对象映射
 * 3. 可扩展：添加新样式属性只需在配置中添加，无需修改生成器
 */

/**
 * 将 CSS 属性名从 camelCase 转换为 kebab-case
 * @param {string} str - camelCase 字符串
 * @returns {string} kebab-case 字符串
 */
function camelToKebab(str) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * 生成单个 CSS 规则
 * @param {string} selector - CSS 选择器
 * @param {object} config - 样式配置对象
 * @param {object} defaults - 默认值对象
 * @param {object} options - 选项
 * @returns {string} CSS 规则字符串
 */
export function generateCssRule(selector, config, defaults = {}, options = {}) {
  const {
    prefix = '',           // CSS 属性前缀（如 'border-'）
    suffix = '',           // CSS 属性后缀
    exclude = [],          // 排除的属性
    customMappings = {},   // 自定义属性映射 { configKey: 'css-property' }
    specialHandlers = {}  // 特殊处理函数 { configKey: (value) => cssString }
  } = options

  let css = `${selector} {\n`

  // 合并默认值和配置值
  const merged = { ...defaults, ...config }

  // 遍历所有配置项
  for (const [key, value] of Object.entries(merged)) {
    // 跳过排除的属性
    if (exclude.includes(key) || value === undefined || value === null) {
      continue
    }

    // 特殊处理
    if (specialHandlers[key]) {
      const result = specialHandlers[key](value, merged)
      if (result) {
        css += `    ${result}\n`
      }
      continue
    }

    // 自定义映射
    if (customMappings[key]) {
      const cssProp = customMappings[key]
      css += `    ${cssProp}: ${value} !important;\n`
      continue
    }

    // 自动映射：camelCase -> kebab-case
    const cssProp = prefix + camelToKebab(key) + suffix
    css += `    ${cssProp}: ${value} !important;\n`
  }

  css += '  }'
  return css
}

/**
 * 生成多个 CSS 规则
 * @param {object} rules - 规则配置对象 { selector: { config, defaults, options } }
 * @returns {string} 完整的 CSS 字符串
 */
export function generateCss(rules) {
  let css = ''
  for (const [selector, ruleConfig] of Object.entries(rules)) {
    const { config = {}, defaults = {}, options = {} } = ruleConfig
    css += generateCssRule(selector, config, defaults, options) + '\n\n'
  }
  return css
}

/**
 * 生成 Markdown 主题 CSS
 * @param {object} themeConfig - 主题配置对象
 * @param {string} baseSelector - 基础选择器（如 '.vue-markdown'）
 * @returns {string} 完整的 CSS 字符串
 */
export function generateMarkdownThemeCss(themeConfig, baseSelector = '.vue-markdown') {
  const { config = {} } = themeConfig
  const rules = {}

  // 标题样式
  const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  headings.forEach(tag => {
    if (config[tag]) {
      const defaults = {
        h1: { fontSize: '2.25rem', fontWeight: '700', lineHeight: '1.3', marginTop: '2rem', marginBottom: '1rem' },
        h2: { fontSize: '1.875rem', fontWeight: '600', lineHeight: '1.4', marginTop: '1.75rem', marginBottom: '0.75rem' },
        h3: { fontSize: '1.5rem', fontWeight: '600', lineHeight: '1.5', marginTop: '1.5rem', marginBottom: '0.75rem' },
        h4: { fontSize: '1.375rem', fontWeight: '600', lineHeight: '1.5', marginTop: '1.5rem', marginBottom: '0.75rem' },
        h5: { fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.5', marginTop: '1.25rem', marginBottom: '0.625rem' },
        h6: { fontSize: '1.125rem', fontWeight: '600', lineHeight: '1.5', marginTop: '1.25rem', marginBottom: '0.625rem' }
      }[tag] || {}

      rules[`${baseSelector} ${tag}`] = {
        config: config[tag],
        defaults: defaults,
        options: {
          exclude: ['displayName', 'description'], // 排除非 CSS 属性
          customMappings: {
            // 处理 Webkit 前缀属性
            WebkitBackgroundClip: '-webkit-background-clip',
            WebkitTextFillColor: '-webkit-text-fill-color',
            backgroundClip: 'background-clip'
          }
        }
      }
    }
  })

  // 段落样式
  if (config.p) {
    rules[`${baseSelector} p`] = {
      config: config.p,
      defaults: { fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.25rem' }
    }
  }

  // 列表样式
  if (config.ul) {
    rules[`${baseSelector} ul`] = {
      config: config.ul,
      defaults: { marginBottom: '1.25rem', paddingLeft: '1.625rem' }
    }
  }
  if (config.ol) {
    rules[`${baseSelector} ol`] = {
      config: config.ol,
      defaults: { marginBottom: '1.25rem', paddingLeft: '1.625rem' }
    }
  }
  if (config.li) {
    rules[`${baseSelector} li`] = {
      config: config.li,
      defaults: { marginBottom: '0.5rem' }
    }
  }

  // 引用块样式
  if (config.blockquote) {
    rules[`${baseSelector} blockquote`] = {
      config: config.blockquote,
      defaults: { 
        borderLeft: '4px solid #e5e7eb', 
        paddingLeft: '1rem', 
        margin: '1.5rem 0', 
        fontStyle: 'italic' 
      },
      options: {
        specialHandlers: {
          // 如果设置了 padding，就不使用 paddingLeft
          padding: (value) => value ? `padding: ${value} !important;` : null,
          paddingLeft: (value, merged) => merged.padding ? null : `padding-left: ${value} !important;`
        }
      }
    }
  }

  // 链接样式
  if (config.a) {
    rules[`${baseSelector} a`] = {
      config: config.a,
      defaults: { 
        color: '#3b82f6', 
        textDecoration: 'none', 
        borderBottom: '2px solid transparent', 
        transition: 'all 0.2s' 
      }
    }
  }
  if (config.aHover) {
    rules[`${baseSelector} a:hover`] = {
      config: config.aHover,
      defaults: { color: '#1d4ed8' }
    }
  }

  // 行内代码样式
  if (config.code) {
    rules[`${baseSelector} code:not(pre code)`] = {
      config: config.code,
      defaults: {}
    }
  }

  // 表格样式
  if (config.table) {
    rules[`${baseSelector} table`] = {
      config: config.table,
      defaults: {}
    }
  }
  if (config.th) {
    rules[`${baseSelector} th`] = {
      config: config.th,
      defaults: {}
    }
  }
  if (config.td) {
    rules[`${baseSelector} td`] = {
      config: config.td,
      defaults: {}
    }
  }

  let css = generateCss(rules)

  // 添加媒体查询（段落在桌面端使用更大字体）
  if (config.p?.fontSize) {
    css += `
      @media (min-width: 768px) {
        ${baseSelector} p {
          font-size: ${config.p.fontSize} !important;
        }
      }
    `
  }

  // 添加暗色模式样式
  if (config.blockquote?.darkBackgroundColor) {
    css += `
      .dark ${baseSelector} blockquote {
        background-color: ${config.blockquote.darkBackgroundColor} !important;
      }
    `
  }

  return css
}

