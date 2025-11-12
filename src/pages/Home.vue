<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen">
    <!-- 精选文章区域（大卡片） -->
    <section class="pt-20 pb-16" v-if="featuredPost">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <router-link 
          :to="{ name: 'PostDetail', params: { slug: featuredPost.slug } }"
          class="block group"
        >
          <article class="card overflow-hidden">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <!-- 图片区域 - 占 7/12 (约58%) -->
              <div class="relative overflow-hidden h-64 lg:h-auto lg:col-span-7">
                <img 
                  :src="normalizeUrl(featuredPost.heroImage) || '/images/placeholder.jpg'" 
                  :alt="featuredPost.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <!-- 内容区域 - 占 5/12 (约42%) -->
              <div class="p-8 lg:p-12 flex flex-col justify-center lg:col-span-5">
                <div class="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-3">
                  {{ formatDate(featuredPost.date) }}
                </div>
                
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-brand transition-colors duration-200">
                  {{ featuredPost.title }}
                </h2>
                
                <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 line-clamp-3">
                  {{ featuredPost.excerpt }}
                </p>
                
                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-6">
                  <span 
                    v-for="tag in featuredPost.tags" 
                    :key="tag"
                    class="tag hover:scale-105 transition-transform duration-200 cursor-pointer"
                    :class="getTagColor(tag)"
                  >
                    {{ tag }}
                  </span>
                </div>
                
                <!-- 阅读更多 -->
                <div class="inline-flex items-center text-brand hover:text-brand-dark transition-colors duration-200 font-medium">
                  <span>阅读全文</span>
                  <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </article>
        </router-link>
      </div>
    </section>

    <!-- 所有文章区域 -->
    <section class="pb-20" :class="featuredPost ? 'pt-8' : 'pt-20'">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 标题（如果有精选文章才显示） -->
        <div v-if="featuredPost" class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            更多文章
          </h2>
          <p class="text-gray-500 dark:text-gray-400">
            探索更多内容
          </p>
        </div>
        
        <!-- 统一卡片流 - 2-3列布局，优化间距 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <PostCard 
            v-for="post in paginatedPosts" 
            :key="post.slug" 
            :post="post" 
          />
        </div>

        <!-- 分页区域 -->
        <div v-if="totalPages > 1" class="flex flex-col items-center space-y-4 border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
          <div class="flex items-center space-x-2">
            <button 
              @click="goToPrevPage"
              class="flex items-center space-x-2 px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              :disabled="currentPage === 1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>上一页</span>
            </button>
            
            <div class="flex space-x-1">
              <button 
                v-for="(page, index) in getPageNumbers()" 
                :key="`page-${index}`"
                @click="page !== '...' && goToPage(page)"
                class="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 font-medium"
                :class="page === currentPage 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105' 
                  : page === '...'
                  ? 'text-gray-400 cursor-default'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105'"
                :disabled="page === '...'"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              @click="goToNextPage"
              class="flex items-center space-x-2 px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              :disabled="currentPage === totalPages"
            >
              <span>下一页</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <!-- 分页信息 -->
          <div class="text-sm text-gray-500 dark:text-gray-400">
            第 {{ currentPage }} 页，共 {{ totalPages }} 页
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PostCard from '../components/PostCard.vue'
import { loadPosts } from '../utils/posts'

const allPosts = ref([])
const featuredPost = ref(null)
const currentPage = ref(1)
const postsPerPage = 6 // 3列布局，每页显示6篇（2行）
const totalPages = ref(1)

const paginatedPosts = computed(() => {
  // 排除精选文章，从第二篇开始
  const postsToShow = featuredPost.value 
    ? allPosts.value.filter(p => p.slug !== featuredPost.value.slug)
    : allPosts.value
  
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return postsToShow.slice(start, end)
})

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 标签颜色
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

// URL 规范化
function normalizeUrl(url) {
  if (!url) return url
  const isDev = import.meta.env.DEV
  const PROJECT_BASE = '/smy-blog.github.io/'
  if (isDev && typeof url === 'string' && url.startsWith(PROJECT_BASE)) {
    return url.replace(PROJECT_BASE, '/')
  }
  return url
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const goToPrevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1)
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1)
  }
}

const getPageNumbers = () => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    // 如果总页数少于等于7，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 显示逻辑：始终显示第一页和最后一页
    pages.push(1)
    
    if (current <= 3) {
      // 当前页在前3页
      for (let i = 2; i <= 4; i++) {
        pages.push(i)
      }
      pages.push('...')
    } else if (current >= total - 2) {
      // 当前页在后3页
      pages.push('...')
      for (let i = total - 3; i <= total - 1; i++) {
        pages.push(i)
      }
    } else {
      // 当前页在中间
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
    }
    
    pages.push(total)
  }
  
  return pages
}

onMounted(async () => {
  const posts = await loadPosts()
  allPosts.value = posts
  
  // 设置精选文章（最新的一篇）
  if (posts.length > 0) {
    featuredPost.value = posts[0]
  }
  
  // 计算总页数（排除精选文章）
  const postsToShow = featuredPost.value 
    ? posts.filter(p => p.slug !== featuredPost.value.slug)
    : posts
  totalPages.value = Math.ceil(postsToShow.length / postsPerPage)
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>