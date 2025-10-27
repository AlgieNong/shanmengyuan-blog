<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen">


    <!-- Content Section -->
    <section class="py-12">


      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                          <!-- Post Meta -->
          <div class="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-4">
            {{ formatDate(post.date) }}
          </div>
        <!-- Main Content -->
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <!-- Hero Image -->
          <div v-if="post.heroImage" class="mb-8">
            <img 
              :src="post.heroImage" 
              :alt="post.title"
              class="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
          
          <!-- Content -->
          <div v-html="postContent"></div>
        </div>
        
        <!-- Navigation -->
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <button 
            v-if="prevPost"
            @click="$router.push({ name: 'PostDetail', params: { slug: prevPost.slug } })"
            class="flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>上一篇</span>
          </button>
          
          <button 
            v-if="nextPost"
            @click="$router.push({ name: 'PostDetail', params: { slug: nextPost.slug } })"
            class="flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 ml-auto"
          >
            <span>下一篇</span>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import Sidebar from '../components/Sidebar.vue'
import { loadPosts, getPostBySlug } from '../utils/posts'

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

onMounted(async () => {
  const posts = await loadPosts()
  allPosts.value = posts
  
  const currentPost = getPostBySlug(posts, route.params.slug)
  if (currentPost) {
    post.value = currentPost
    postContent.value = marked(currentPost.body || '')
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
})
</script>

<style scoped>
.prose {
  color: inherit;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4),
.prose :deep(h5),
.prose :deep(h6) {
  color: inherit;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose :deep(p) {
  margin-bottom: 1.25rem;
  line-height: 1.75;
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
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.prose :deep(pre) {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose :deep(a) {
  color: #3b82f6;
  text-decoration: underline;
}

.prose :deep(a:hover) {
  color: #1d4ed8;
}

.dark .prose :deep(code) {
  background-color: #374151;
}

.dark .prose :deep(pre) {
  background-color: #111827;
}

.dark .prose :deep(blockquote) {
  border-left-color: #4b5563;
}
</style>