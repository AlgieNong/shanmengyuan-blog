<template>
  <aside class="w-full lg:w-80">
    <!-- Recent Posts -->
    <div class="card p-6 mb-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        最近内容
      </h3>
      
      <div class="space-y-6">
        <div 
          v-for="post in recentPosts" 
          :key="post.slug"
          class="group cursor-pointer"
          @click="$router.push({ name: 'PostDetail', params: { slug: post.slug } })"
        >
          <div class="flex items-start space-x-4">
            <!-- 缩略图 -->
            <div class="flex-shrink-0">
              <img 
                :src="normalizeUrl(post.heroImage) || '/images/placeholder-thumb.jpg'" 
                :alt="post.title"
                class="w-16 h-16 object-cover rounded-lg"
              />
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <h4 class="text-base font-medium text-gray-900 dark:text-white group-hover:text-brand transition-colors duration-200 line-clamp-2">
                {{ post.title }}
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {{ formatDate(post.date) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 标签云 -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        标签云
      </h3>
      
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="tag in allTags" 
          :key="tag"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity duration-200"
          :class="getTagColor(tag)"
          @click="$emit('tagClick', tag)"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineEmits(['tagClick'])

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
  recentPosts: {
    type: Array,
    default: () => []
  },
  allTags: {
    type: Array,
    default: () => []
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
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
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>