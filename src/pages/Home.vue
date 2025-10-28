<template>
  <div class="bg-white dark:bg-dark-bg">
    <!-- Hero Section -->
    <section class="relative border-t border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8">
            THE BLOG
          </h1>
        </div>
      </div>
    </section>

    <!-- 最近文章区域 -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
          最近
        </h2>
        
        <!-- Featured Posts Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <PostCard 
            v-for="post in featuredPosts" 
            :key="post.slug" 
            :post="post" 
          />
        </div>

        <!-- 全部文章区域 -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            所有
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PostCard 
              v-for="post in allPosts" 
              :key="post.slug" 
              :post="post" 
            />
          </div>
        </div>

        <!-- 分页区域 -->
        <div class="flex justify-center items-center space-x-2 border-t border-gray-200 dark:border-gray-700 pt-8">
          <button class="flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>上一页</span>
          </button>
          
          <div class="flex space-x-1">
            <button 
              v-for="page in 10" 
              :key="page"
              class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200"
              :class="page === 1 ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'">
              {{ page === 10 ? '...' : page }}
            </button>
          </div>
          
          <button class="flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <span>下一页</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PostCard from '../components/PostCard.vue'
import { loadPosts } from '../utils/posts'

const featuredPosts = ref([])
const allPosts = ref([])

onMounted(async () => {
  const posts = await loadPosts()
  featuredPosts.value = posts.slice(0, 2)
  allPosts.value = posts
})
</script>