<template>
  <header class="bg-white dark:bg-dark-bg border-b border-gray-200 dark:border-gray-700">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- 标识（Logo） -->
        <div class="flex-shrink-0">
          <router-link to="/" class="text-2xl font-bold text-gray-900 dark:text-white">
            我的博客
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <router-link 
              to="/" 
              class="px-3 py-2 text-sm font-medium transition-colors duration-200"
              :class="[$route.name === 'Home' ? 'text-brand border-b-2 border-brand' : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white']"
            >
              首页
            </router-link>
            <router-link 
              to="/projects" 
              class="px-3 py-2 text-sm font-medium transition-colors duration-200"
              :class="[$route.name === 'Projects' ? 'text-brand border-b-2 border-brand' : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white']"
            >
              我的项目
            </router-link>
            <router-link 
              to="/about" 
              class="px-3 py-2 text-sm font-medium transition-colors duration-200"
              :class="[$route.name === 'About' ? 'text-brand border-b-2 border-brand' : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white']"
            >
              关于我
            </router-link>
            <router-link 
              to="/contact" 
              class="px-3 py-2 text-sm font-medium transition-colors duration-200"
              :class="[$route.name === 'Contact' ? 'text-brand border-b-2 border-brand' : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white']"
            >
              联系我
            </router-link>
          </div>
        </div>

        <!-- 主题切换 -->
        <div class="flex items-center space-x-4">
          <ThemeToggle />
          
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path 
                  :class="{'hidden': isMobileMenuOpen, 'block': !isMobileMenuOpen}" 
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" 
                />
                <path 
                  :class="{'hidden': !isMobileMenuOpen, 'block': isMobileMenuOpen}" 
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div v-show="isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
          <router-link 
            to="/" 
            class="block px-3 py-2 text-base font-medium transition-colors duration-200"
            :class="[$route.name === 'Home' ? 'text-brand bg-gray-50 dark:bg-gray-800' : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800']"
            @click="isMobileMenuOpen = false"
          >
            首页
          </router-link>
          <router-link 
            to="/projects" 
            class="block px-3 py-2 text-base font-medium transition-colors duration-200"
            :class="[$route.name === 'Projects' ? 'text-brand bg-gray-50 dark:bg-gray-800' : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800']"
            @click="isMobileMenuOpen = false"
          >
            我的项目
          </router-link>
          <router-link 
            to="/about" 
            class="block px-3 py-2 text-base font-medium transition-colors duration-200"
            :class="[$route.name === 'About' ? 'text-brand bg-gray-50 dark:bg-gray-800' : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800']"
            @click="isMobileMenuOpen = false"
          >
            关于我
          </router-link>
          <router-link 
            to="/contact" 
            class="block px-3 py-2 text-base font-medium transition-colors duration-200"
            :class="[$route.name === 'Contact' ? 'text-brand bg-gray-50 dark:bg-gray-800' : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800']"
            @click="isMobileMenuOpen = false"
          >
            联系我
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const isMobileMenuOpen = ref(false)
const route = useRoute()
</script>