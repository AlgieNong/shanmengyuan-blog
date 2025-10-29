<template>
  <div class="bg-white dark:bg-dark-bg min-h-screen">
    <!-- 顶部横幅（Hero）区域 -->
    <section class="relative border-t border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8">
            我的项目
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            这里展示了我参与的各种项目和作品，涵盖了前端开发、UI设计、开源贡献等多个领域。
          </p>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 分类筛选标签 -->
        <div class="flex space-x-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="activeCategory = category"
            class="px-4 py-2 text-sm font-medium transition-colors duration-200"
            :class="activeCategory === category ? 'text-brand border-b-2 border-brand' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
          >
            {{ category }}
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="card hover:shadow-xl transition-all duration-300"
          >
            <!-- Project Image -->
            <div class="relative overflow-hidden">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            
            <!-- Project Content -->
            <div class="p-6">
              <!-- Category -->
              <div class="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-2">
                {{ project.category }}
              </div>
              
              <!-- Title -->
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {{ project.title }}
              </h3>
              
              <!-- Description -->
              <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                {{ project.description }}
              </p>
              
              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                >
                  {{ tech }}
                </span>
              </div>
              
              <!-- Links -->
              <div class="flex space-x-3">
                <a 
                  v-if="project.demoUrl" 
                  :href="project.demoUrl" 
                  target="_blank"
                  class="btn-primary text-sm"
                >
                  查看演示
                </a>
                <a 
                  v-if="project.githubUrl" 
                  :href="project.githubUrl" 
                  target="_blank"
                  class="btn-secondary text-sm"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态展示 -->
        <div v-if="filteredProjects.length === 0" class="text-center py-12">
          <div class="text-gray-400 dark:text-gray-500">
            <svg class="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p class="text-lg">暂无{{ activeCategory }}项目</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

function normalizeUrl(url) {
  if (!url) return url
  const isDev = import.meta.env.DEV
  const PROJECT_BASE = '/smy-blog.github.io/'
  if (isDev && typeof url === 'string' && url.startsWith(PROJECT_BASE)) {
    return url.replace(PROJECT_BASE, '/')
  }
  return url
}

const activeCategory = ref('全部')

const categories = ['全部', '前端开发', 'UI设计', '开源项目', '个人作品']

// Mock data - 在实际项目中这些数据应该从API或CMS获取
const projects = ref([
  {
    id: 1,
    title: 'Vue 3 博客系统',
    category: '前端开发',
    description: '基于 Vue 3 + Vite + Tailwind CSS 构建的现代化博客系统，支持暗色模式和多语言。',
    image: 'https://picsum.photos/seed/vue-blog/600/400',
    technologies: ['Vue 3', 'Vite', 'Tailwind CSS', 'TypeScript'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 2,
    title: '响应式设计系统',
    category: 'UI设计',
    description: '一套完整的响应式设计系统，包含组件库、设计规范和开发文档。',
    image: '/images/project-design-system.jpg',
    technologies: ['Figma', 'React', 'Storybook', 'CSS-in-JS'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 3,
    title: '开源工具库',
    category: '开源项目',
    description: '为开发者提供的实用工具函数库，包含常用的数据处理和验证方法。',
    image: 'https://picsum.photos/seed/utils-lib/600/400',
    technologies: ['JavaScript', 'TypeScript', 'Jest', 'Rollup'],
    demoUrl: '#',
    githubUrl: '#'
  }
])

const filteredProjects = computed(() => {
  if (activeCategory.value === '全部') {
    return projects.value
  }
  return projects.value.filter(project => project.category === activeCategory.value)
})
</script>