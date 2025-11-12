<template>
  <router-link 
    :to="{ name: 'PostDetail', params: { slug: post.slug } }"
    class="block group"
  >
    <article class="card flex flex-col h-full overflow-hidden">
      <!-- Image - 更宽的图片比例，参考 Medium/Vercel -->
      <div class="relative overflow-hidden aspect-[4/3] rounded-t-lg">
        <img 
          :src="normalizeUrl(post.heroImage) || '/images/placeholder.jpg'" 
          :alt="post.title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <!-- 渐变遮罩 -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <!-- 内容区域 - 紧凑设计，确保按钮始终可见 -->
      <div class="p-5 flex flex-col flex-1 min-h-0">
        <!-- 日期和标签 - 顶部信息 -->
        <div class="flex items-center justify-between mb-3 flex-shrink-0">
          <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {{ formatDate(post.date) }}
          </div>
          <!-- 只显示第一个标签，保持简洁 -->
          <span 
            v-if="post.tags && post.tags.length > 0"
            class="text-xs px-2 py-0.5 rounded-md font-medium"
            :class="getTagColor(post.tags[0])"
          >
            {{ post.tags[0] }}
          </span>
        </div>
        
        <!-- Title - 更紧凑的标题 -->
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-brand transition-colors duration-200 flex-shrink-0">
          {{ post.title }}
        </h3>
        
        <!-- 摘要 - 最多2行，更紧凑 -->
        <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-2 flex-shrink-0">
          {{ post.excerpt }}
        </p>
        
        <!-- 阅读更多按钮 - 始终在底部可见 -->
        <div class="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ post.tags && post.tags.length > 1 ? `${post.tags.length - 1} 个标签` : '' }}
          </span>
          <span class="inline-flex items-center text-sm font-medium text-brand group-hover:text-brand-dark transition-colors duration-200">
            阅读更多
            <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'

function normalizeUrl(url) {
  if (!url) return url
  const isDev = import.meta.env.DEV
  const PROJECT_BASE = '/smy-blog.github.io/'
  if (isDev && typeof url === 'string' && url.startsWith(PROJECT_BASE)) {
    return url.replace(PROJECT_BASE, '/')
  }
  return url
}

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

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
    'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
    'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800',
    'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800',
    'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 border border-pink-200 dark:border-pink-800'
  ]
  
  const index = tag.charCodeAt(0) % colors.length
  return colors[index]
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>