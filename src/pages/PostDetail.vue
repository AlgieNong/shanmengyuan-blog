<template>
  <div class="page-theme-container min-h-screen">
    <!-- 内容区域 - GitBook 风格布局 -->
    <main class="page-main-content">
      <div class="page-content-wrapper">
        <div class="page-content-container">
          <!-- 主题选择器 -->
          <div class="mb-6 flex justify-end">
            <ThemeSelector />
          </div>
          
          <!-- Post Meta -->
          <div class="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-4">
            {{ formatDate(post.date) }}
          </div>
          
          <!-- 主体内容 - GitBook 风格：decoration-primary/6 -->
          <div class="vue-markdown max-w-none decoration-primary/6" ref="contentRef">
                <!-- Hero Image -->
                <div v-if="post.heroImage" class="mb-8">
                  <img 
                    :src="normalizeUrl(post.heroImage)" 
                    :alt="post.title"
                    class="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                    loading="lazy"
                  />
                </div>
                
                <!-- 正文内容 -->
                <div v-html="postContent"></div>
              </div>
              
              <!-- 上下篇导航 -->
              <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-between gap-4">
                <button 
                  v-if="prevPost"
                  @click="$router.push({ name: 'PostDetail', params: { slug: prevPost.slug } })"
                  class="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 group"
                >
                  <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span class="font-medium">上一篇</span>
                </button>
                
                <div v-else class="flex-1"></div>
                
                <button 
                  v-if="nextPost"
                  @click="$router.push({ name: 'PostDetail', params: { slug: nextPost.slug } })"
                  class="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 group ml-auto"
                >
                  <span class="font-medium">下一篇</span>
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
        </div>

        <!-- 目录侧边栏 - GitBook 风格 -->
        <aside 
          v-if="tocItems.length > 0"
          class="page-toc-sidebar"
        >
          <div class="toc-container">
            <div class="toc-header">
              <h3 class="toc-title">目录</h3>
            </div>
            <nav class="toc-nav">
              <ul class="toc-list">
                <TocItem 
                  v-for="item in tocItems" 
                  :key="item.id"
                  :item="item"
                  :active-id="activeId"
                  @scroll-to="scrollToHeading"
                />
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch, defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import hljs from 'highlight.js'
import mermaid from 'mermaid'
import { useThemeStore } from '../stores/theme'
import { usePageThemeStore } from '../stores/pageTheme'
import { useMarkdownThemeStore } from '../stores/markdownTheme'
import ThemeSelector from '../components/ThemeSelector.vue'

// 递归目录项组件
const TocItem = defineComponent({
  name: 'TocItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    activeId: {
      type: String,
      default: ''
    }
  },
  emits: ['scroll-to'],
  setup(props, { emit }) {
    return () => {
      const { item, activeId } = props
      const isActive = activeId === item.id
      
      return h('li', {
        class: ['toc-item', `toc-item-${item.level}`, { 'toc-item-active': isActive }]
      }, [
        h('a', {
          href: `#${item.id}`,
          class: 'toc-link',
          onClick: (e) => {
            e.preventDefault()
            emit('scroll-to', item.id)
          }
        }, item.text),
        item.children && item.children.length > 0
          ? h('ul', { class: 'toc-sublist' }, 
              item.children.map(child => 
                h(TocItem, {
                  key: child.id,
                  item: child,
                  activeId: activeId,
                  onScrollTo: (id) => emit('scroll-to', id)
                })
              )
            )
          : null
      ])
    }
  }
})

marked.setOptions({
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  langPrefix: 'language-'
})

// 自定义标题渲染器：为标题添加 id 锚点
const renderer = new marked.Renderer()

// 为标题添加 id 锚点
renderer.heading = (text, level) => {
  const id = generateHeadingId(text)
  return `<h${level} id="${id}">${text}</h${level}>`
}

renderer.code = (code, infostring, escaped) => {
  // 提取语言标识
  const lang = (infostring || '').trim().split(/[\s:]/)[0].toLowerCase()
  
  // 调试：检查所有代码块
  if (lang === 'mermaid' || lang === 'mmd' || code.includes('graph TD') || code.includes('sequenceDiagram')) {
    console.log('🔍 代码块:', { lang, infostring, codeLength: code.length, codePreview: code.substring(0, 50) })
  }
  
  // 处理 Mermaid 图表
  if (lang === 'mermaid' || lang === 'mmd') {
    try {
      const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const encoded = btoa(unescape(encodeURIComponent(code.trim())))
      console.log('✅ 创建 Mermaid 容器:', id)
      return `<div class="mermaid-container" data-mermaid-id="${id}" data-mermaid-code="${encoded}"></div>`
    } catch (e) {
      console.error('Mermaid 编码错误:', e)
      return `<pre><code class="language-mermaid">${code}</code></pre>`
    }
  }
  
  // 处理普通代码块（使用 highlight.js）
  const valid = lang && hljs.getLanguage(lang)
  const highlighted = valid ? hljs.highlight(code, { language: lang }).value : hljs.highlightAuto(code).value
  const className = valid ? `hljs language-${lang}` : 'hljs'
  return `<pre><code class="${className}">${highlighted}</code></pre>`
}
marked.use({ renderer })

/**
 * 生成标题 ID（用于锚点）
 */
function generateHeadingId(text) {
  // 移除 HTML 标签
  const cleanText = text.replace(/<[^>]*>/g, '')
  // 转换为小写，替换空格和特殊字符为连字符
  return cleanText
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * 从 HTML 内容中提取标题并生成目录结构
 */
function generateTOC(html) {
  if (!html) return []
  
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
  
  if (headings.length === 0) return []
  
  const toc = []
  const stack = [] // 用于构建层级结构
  
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.substring(1))
    const id = heading.id || generateHeadingId(heading.textContent)
    const text = heading.textContent.trim()
    
    // 确保标题有 id
    if (!heading.id) {
      heading.id = id
    }
    
    const item = {
      id,
      text,
      level,
      children: []
    }
    
    // 构建层级结构
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop()
    }
    
    if (stack.length === 0) {
      toc.push(item)
    } else {
      stack[stack.length - 1].children.push(item)
    }
    
    stack.push(item)
  })
  
  return toc
}

/**
 * 更新渲染后的 HTML，确保所有标题都有 id
 */
function updateHeadingIds(html) {
  if (!html) return html
  
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
  
  headings.forEach((heading) => {
    if (!heading.id) {
      heading.id = generateHeadingId(heading.textContent)
    }
  })
  
  return doc.body.innerHTML
}

/**
 * 滚动到指定标题
 */
function scrollToHeading(id) {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80 // 考虑固定头部的高度
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    
    // 更新 URL hash（不触发滚动）
    history.pushState(null, '', `#${id}`)
  }
}

/**
 * 监听滚动，更新当前激活的目录项
 */
function setupScrollSpy() {
  // 清理之前的观察器
  if (scrollObserver) {
    scrollObserver.disconnect()
    scrollObserver = null
  }
  
  const headings = document.querySelectorAll('.vue-markdown h1, .vue-markdown h2, .vue-markdown h3, .vue-markdown h4, .vue-markdown h5, .vue-markdown h6')
  
  if (headings.length === 0) return
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  }
  
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id
      }
    })
  }, observerOptions)
  
  headings.forEach((heading) => {
    scrollObserver.observe(heading)
  })
}

/**
 * 初始化并渲染 Mermaid 图表
 */
function renderMermaidDiagrams() {
  const containers = document.querySelectorAll('.vue-markdown .mermaid-container')
  if (containers.length === 0) return

  // 获取当前主题
  const isDark = document.documentElement.classList.contains('dark')
  
  // 初始化 Mermaid（如果还未初始化或主题变化）
  const currentTheme = isDark ? 'dark' : 'default'
  const needsReinit = !mermaid.initialized || (mermaid.initialConfig?.theme !== currentTheme)
  
  if (needsReinit) {
    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme,
      themeVariables: {
        fontFamily: 'inherit',
        fontSize: '16px'
      },
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      }
    })
    mermaid.initialized = true
  }

  containers.forEach((container) => {
    // 如果已经渲染过，先清除
    const existingSvg = container.querySelector('svg.mermaid')
    if (existingSvg) {
      container.innerHTML = ''
    }

    const mermaidId = container.getAttribute('data-mermaid-id')
    const encodedCode = container.getAttribute('data-mermaid-code')
    
    if (!encodedCode) return

    try {
      // 解码 base64
      const code = decodeURIComponent(escape(atob(encodedCode)))
      
      // 创建 mermaid 元素
      const mermaidElement = document.createElement('div')
      mermaidElement.className = 'mermaid'
      mermaidElement.id = mermaidId || `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      mermaidElement.textContent = code
      
      // 清空容器内容，添加 mermaid 元素
      container.innerHTML = ''
      container.appendChild(mermaidElement)
      
      // 渲染 Mermaid 图表
      mermaid.run({
        nodes: [mermaidElement],
        suppressErrors: true
      }).catch(err => {
        console.error('Mermaid 渲染错误:', err)
        container.innerHTML = `<div class="mermaid-error" style="padding: 1em; background: #fee; border: 1px solid #fcc; border-radius: 4px; color: #c33;">
          <strong>Mermaid 图表渲染失败</strong><br>
          <code style="font-size: 0.85em;">${err.message || '未知错误'}</code>
        </div>`
      })
    } catch (e) {
      console.error('Mermaid 解码错误:', e)
      container.innerHTML = `<div class="mermaid-error" style="padding: 1em; background: #fee; border: 1px solid #fcc; border-radius: 4px; color: #c33;">
        <strong>Mermaid 代码解析失败</strong>
      </div>`
    }
  })
}

function applyCodeEnhancements() {
  // 包装代码块，添加头部工具栏与复制按钮
  const blocks = document.querySelectorAll('.vue-markdown pre')
  blocks.forEach(pre => {
    if (pre.closest('.code-wrapper')) return
    const code = pre.querySelector('code')
    const langClass = Array.from(code.classList).find(c => c.startsWith('language-')) || ''
    const lang = langClass.replace('language-', '') || 'text'

    const wrapper = document.createElement('div')
    wrapper.className = 'code-wrapper'
    const header = document.createElement('div')
    header.className = 'code-header'

    const controls = document.createElement('div')
    controls.className = 'code-controls'
    controls.innerHTML = '<span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span>'

    const label = document.createElement('div')
    label.className = 'code-lang'
    label.textContent = lang.toUpperCase()

    const copyBtn = document.createElement('button')
    copyBtn.type = 'button'
    copyBtn.className = 'code-copy'
    copyBtn.setAttribute('aria-label', '复制代码')
    const iconCopy = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>'
    const iconCheck = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    copyBtn.innerHTML = iconCopy
    copyBtn.addEventListener('click', () => {
      const text = code.innerText
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.innerHTML = iconCheck
        setTimeout(() => (copyBtn.innerHTML = iconCopy), 1500)
      })
    })

    header.appendChild(controls)
    header.appendChild(label)
    header.appendChild(copyBtn)

    pre.parentNode.insertBefore(wrapper, pre)
    wrapper.appendChild(header)
    wrapper.appendChild(pre)
  })
}

function normalizeUrl(url) {
  if (!url) return url
  const isDev = import.meta.env.DEV
  const PROJECT_BASE = '/smy-blog.github.io/'
  // 本地开发：去掉项目页前缀
  if (isDev && typeof url === 'string' && url.startsWith(PROJECT_BASE)) {
    return url.replace(PROJECT_BASE, '/')
  }
  return url
}
import Sidebar from '../components/Sidebar.vue'
import { loadPosts, getPostBySlug } from '../utils/posts'

function isDevNormalizeHtml(html) {
  if (!html) return html
  const isDev = import.meta.env.DEV
  const PROJECT_BASE = '/smy-blog.github.io/'
  if (!isDev) return html
  // 把 <img src="/smy-blog.github.io/..."> 重写为 <img src="/...">
  return html.replace(new RegExp(`(<img[^>]+src=\\")${PROJECT_BASE}`, 'g'), '$1/')
}

const route = useRoute()
const post = ref({})
const postContent = ref('')
const recentPosts = ref([])
const allTags = ref([])
const allPosts = ref([])
const contentRef = ref(null)
const tocItems = ref([])
const activeId = ref('')
let scrollObserver = null


const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getTagColor = (tag) => {
  const colors = [
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  ]
  
  const index = tag.charCodeAt(0) % colors.length
  return colors[index]
}

const currentPostIndex = computed(() => {
  return allPosts.value.findIndex(p => p.slug === route.params.slug)
})

const prevPost = computed(() => {
  if (currentPostIndex.value > 0) {
    return allPosts.value[currentPostIndex.value - 1]
  }
  return null
})

const nextPost = computed(() => {
  if (currentPostIndex.value < allPosts.value.length - 1) {
    return allPosts.value[currentPostIndex.value + 1]
  }
  return null
})

const handleTagClick = (tag) => {
  // 在实际项目中，这里可以跳转到标签过滤页面
  console.log('Tag clicked:', tag)
}

// 加载文章内容的函数
const loadPostContent = async (slug) => {
  const posts = await loadPosts()
  allPosts.value = posts
  
  const currentPost = getPostBySlug(posts, slug)
  if (currentPost) {
    post.value = currentPost
    const html = marked(currentPost.body || '')
    // 正文里的 <img src> 同样做路径规范化（开发环境重写）
    const normalizedHtml = isDevNormalizeHtml(html)
    // 更新标题 ID
    postContent.value = updateHeadingIds(normalizedHtml)
    
    await nextTick()
    
    // 生成目录
    tocItems.value = generateTOC(postContent.value)
    
    // 应用代码增强
    applyCodeEnhancements()
    
    // 渲染 Mermaid 图表
    renderMermaidDiagrams()
    
    // 设置滚动监听
    await nextTick()
    setupScrollSpy()
    
    // 如果有 hash，滚动到对应位置
    if (route.hash) {
      const id = route.hash.substring(1)
      await nextTick()
      setTimeout(() => {
        scrollToHeading(id)
      }, 100)
    }
  }
  
  recentPosts.value = posts.slice(0, 5)
  
  // 获取所有标签
  const tags = new Set()
  posts.forEach(p => {
    if (p.tags) {
      p.tags.forEach(tag => tags.add(tag))
    }
  })
  allTags.value = Array.from(tags)
}

// 初始化主题 stores
const pageThemeStore = usePageThemeStore()
const markdownThemeStore = useMarkdownThemeStore()

onMounted(async () => {
  // 初始化页面主题和 Markdown 主题
  pageThemeStore.initTheme()
  markdownThemeStore.initTheme()
  await loadPostContent(route.params.slug)
})

// 监听路由参数变化，当 slug 改变时重新加载内容
watch(() => route.params.slug, async (newSlug) => {
  if (newSlug) {
    // 清理之前的观察器
    if (scrollObserver) {
      scrollObserver.disconnect()
      scrollObserver = null
    }
    activeId.value = ''
    await loadPostContent(newSlug)
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

// 监听暗色模式变化，重新渲染 Mermaid 图表以应用新主题
const themeStore = useThemeStore()
watch(() => themeStore.isDark, () => {
  // 重置 Mermaid 初始化状态，以便重新应用主题
  if (mermaid.initialized) {
    mermaid.initialized = false
  }
  nextTick(() => {
    renderMermaidDiagrams()
  })
})
</script>

<style>
/* Vue 官方文档风格的 Markdown 样式 */
@import '/vue-markdown-styles/vue-docs-style.css';

/* Mermaid 图表样式 */
.vue-markdown .mermaid-container {
  margin: 1.5em 0;
  padding: 1em;
  background-color: #f6f8fa;
  border-radius: 6px;
  overflow-x: auto;
  text-align: center;
}

.dark .vue-markdown .mermaid-container {
  background-color: #161b22;
}

.vue-markdown .mermaid-container .mermaid {
  display: inline-block;
  max-width: 100%;
}

.vue-markdown .mermaid-container svg {
  max-width: 100%;
  height: auto;
}

/* 目录样式 */
.toc-container {
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dark .toc-container {
  background: rgba(26, 27, 38, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.toc-header {
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.dark .toc-header {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.toc-title {
  font-size: 1rem;
  font-weight: 600;
  color: #213547;
  margin: 0;
}

.dark .toc-title {
  color: #aac8e4;
}

.toc-nav {
  font-size: 0.875rem;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin: 0;
  padding: 0;
}

.toc-link {
  display: block;
  padding: 0.375rem 0.5rem;
  color: #6b7280;
  text-decoration: none;
  border-radius: 0.375rem;
  transition: all 0.2s;
  line-height: 1.5;
  word-break: break-word;
}

.dark .toc-link {
  color: #9ca3af;
}

.toc-link:hover {
  color: #213547;
  background: rgba(0, 0, 0, 0.05);
}

.dark .toc-link:hover {
  color: #aac8e4;
  background: rgba(255, 255, 255, 0.05);
}

.toc-item-active > .toc-link {
  color: #8b5cf6;
  font-weight: 600;
  background: rgba(139, 92, 246, 0.1);
}

.dark .toc-item-active > .toc-link {
  color: #a78bfa;
  background: rgba(139, 92, 246, 0.2);
}

/* 不同层级的缩进 */
.toc-item-1 > .toc-link {
  padding-left: 0.5rem;
  font-weight: 600;
}

.toc-item-2 > .toc-link {
  padding-left: 1rem;
}

.toc-item-3 > .toc-link {
  padding-left: 1.5rem;
  font-size: 0.8125rem;
}

.toc-item-4 > .toc-link {
  padding-left: 2rem;
  font-size: 0.8125rem;
}

.toc-item-5 > .toc-link {
  padding-left: 2.5rem;
  font-size: 0.75rem;
}

.toc-item-6 > .toc-link {
  padding-left: 3rem;
  font-size: 0.75rem;
}

.toc-sublist {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 0.25rem;
}

/* 滚动条样式 */
.toc-container::-webkit-scrollbar {
  width: 6px;
}

.toc-container::-webkit-scrollbar-track {
  background: transparent;
}

.toc-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.dark .toc-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.toc-container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

.dark .toc-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>

<style scoped>
/* 代码块容器与工具栏样式 */
.vue-markdown :deep(.code-wrapper) {
  margin: 1.5rem 0;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background: #f6f8fa;
}
.dark .vue-markdown :deep(.code-wrapper) {
  border-color: rgba(255,255,255,0.15);
  background: #161b22;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

/* 确保代码块内的代码样式正确 */
.vue-markdown :deep(.code-wrapper pre) {
  margin: 0;
  border-radius: 0;
  background: transparent;
}

.vue-markdown :deep(.code-wrapper pre code) {
  padding: 1em;
}

.vue-markdown :deep(.code-header) {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #f1f3f5;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.dark .vue-markdown :deep(.code-header) {
  background: #252526;
  border-bottom-color: rgba(255,255,255,0.1);
}

.vue-markdown :deep(.code-controls) { display: flex; gap: 0.4rem; }
.vue-markdown :deep(.dot) { width: 0.75rem; height: 0.75rem; border-radius: 50%; display: inline-block; }
.vue-markdown :deep(.dot-red) { background: #ff5f56; }
.vue-markdown :deep(.dot-yellow) { background: #ffbd2e; }
.vue-markdown :deep(.dot-green) { background: #27c93f; }

.vue-markdown :deep(.code-lang) {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.dark .vue-markdown :deep(.code-lang) {
  color: #9ca3af;
}

.vue-markdown :deep(.code-copy) {
  background: transparent;
  border: 1px solid rgba(0,0,0,0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}
.vue-markdown :deep(.code-copy):hover {
  background: rgba(0,0,0,0.05);
  border-color: rgba(0,0,0,0.2);
}
.dark .vue-markdown :deep(.code-copy) {
  color: #9ca3af;
  border-color: rgba(255,255,255,0.2);
}
.dark .vue-markdown :deep(.code-copy):hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.3);
}
</style>