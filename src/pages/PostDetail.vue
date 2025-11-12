<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen">


    <!-- 内容区域 -->
    <section class="py-12">


      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Post Meta -->
        <div class="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-4">
          {{ formatDate(post.date) }}
        </div>
        <!-- 主体内容 -->
        <div class="prose prose-lg dark:prose-invert max-w-none">
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
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  langPrefix: 'language-'
})

// 强制为代码块添加 hljs 类，确保主题样式生效
const renderer = new marked.Renderer()
renderer.code = (code, infostring) => {
  const lang = (infostring || '').match(/^\S+/)?.[0]
  const valid = lang && hljs.getLanguage(lang)
  const highlighted = valid ? hljs.highlight(code, { language: lang }).value : hljs.highlightAuto(code).value
  const className = valid ? `hljs language-${lang}` : 'hljs'
  return `<pre><code class="${className}">${highlighted}</code></pre>`
}
marked.use({ renderer })

function applyCodeEnhancements() {
  // 包装代码块，添加头部工具栏与复制按钮
  const blocks = document.querySelectorAll('.prose pre')
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
    postContent.value = isDevNormalizeHtml(html)
    await nextTick()
    applyCodeEnhancements()
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

onMounted(async () => {
  await loadPostContent(route.params.slug)
})

// 监听路由参数变化，当 slug 改变时重新加载内容
watch(() => route.params.slug, async (newSlug) => {
  if (newSlug) {
    await loadPostContent(newSlug)
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})
</script>

<style scoped>
.prose {
  color: inherit;
}

.prose :deep(h1) {
  color: inherit;
  font-size: 2.25rem;
  line-height: 1.3;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.prose :deep(h2) {
  color: inherit;
  font-size: 1.875rem;
  line-height: 1.4;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.prose :deep(h3) {
  color: inherit;
  font-size: 1.5rem;
  line-height: 1.5;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.prose :deep(h4),
.prose :deep(h5),
.prose :deep(h6) {
  color: inherit;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.prose :deep(p) {
  margin-bottom: 1.25rem;
  line-height: 1.7;
  font-size: 1rem;
}

@media (min-width: 768px) {
  .prose :deep(p) {
    font-size: 1.0625rem;
  }
}

.prose :deep(ul),
.prose :deep(ol) {
  margin-bottom: 1.25rem;
  padding-left: 1.625rem;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
}

.prose :deep(blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
}

.prose :deep(code) {
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background: transparent;
}

.prose :deep(pre) {
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 0;
  background: transparent;
  border: none;
  box-shadow: none;
}

/* 代码块容器与工具栏样式 */
.prose :deep(.code-wrapper) {
  margin: 1.5rem 0;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background: #f8f9fa;
}
.dark .prose :deep(.code-wrapper) {
  border-color: rgba(255,255,255,0.15);
  background: #1e1e1e;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.prose :deep(.code-header) {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #f1f3f5;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.dark .prose :deep(.code-header) {
  background: #252526;
  border-bottom-color: rgba(255,255,255,0.1);
}

.prose :deep(.code-controls) { display: flex; gap: 0.4rem; }
.prose :deep(.dot) { width: 0.75rem; height: 0.75rem; border-radius: 50%; display: inline-block; }
.prose :deep(.dot-red) { background: #ff5f56; }
.prose :deep(.dot-yellow) { background: #ffbd2e; }
.prose :deep(.dot-green) { background: #27c93f; }

.prose :deep(.code-lang) {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.dark .prose :deep(.code-lang) {
  color: #9ca3af;
}

.prose :deep(.code-copy) {
  background: transparent;
  border: 1px solid rgba(0,0,0,0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}
.prose :deep(.code-copy):hover {
  background: rgba(0,0,0,0.05);
  border-color: rgba(0,0,0,0.2);
}
.dark .prose :deep(.code-copy) {
  color: #9ca3af;
  border-color: rgba(255,255,255,0.2);
}
.dark .prose :deep(.code-copy):hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.3);
}

.prose :deep(a) {
  color: #3b82f6;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  position: relative;
}

.prose :deep(a):hover {
  color: #1d4ed8;
  border-bottom-color: #3b82f6;
}

.dark .prose :deep(a) {
  color: #60a5fa;
}

.dark .prose :deep(a):hover {
  color: #93c5fd;
  border-bottom-color: #60a5fa;
}

/* 暗色下不覆盖代码颜色，交由 highlight.js 主题控制 */
.dark .prose :deep(code) {}
.dark .prose :deep(pre) {}

.dark .prose :deep(blockquote) {
  border-left-color: #4b5563;
}
</style>