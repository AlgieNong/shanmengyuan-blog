<template>
  <article class="card hover:shadow-xl transition-shadow duration-300">
    <!-- Image -->
    <div class="relative overflow-hidden">
      <img 
        :src="post.heroImage || '/images/placeholder.jpg'" 
        :alt="post.title"
        class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
    
    <!-- Content -->
    <div class="p-6">
      <!-- Date -->
      <div class="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-2">
        {{ formatDate(post.date) }}
      </div>
      
      <!-- Title -->
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
        {{ post.title }}
      </h3>
      
      <!-- Excerpt -->
      <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
        {{ post.excerpt }}
      </p>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="tag in post.tags" 
          :key="tag"
          class="tag"
          :class="getTagColor(tag)"
        >
          {{ tag }}
        </span>
      </div>
      
      <!-- Read More -->
      <div class="mt-4 flex justify-end">
        <router-link 
          :to="{ name: 'PostDetail', params: { slug: post.slug } }"
          class="inline-flex items-center text-brand hover:text-brand-dark transition-colors duration-200"
        >
          <span class="text-sm font-medium">阅读更多</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup>
import { defineProps } from 'vue'

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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>