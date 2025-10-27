<template>
  <div class="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
    <!-- 使用 Header 组件 -->
    <Header />
    
    <!-- 主要内容区域 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme'
import Header from './components/Header.vue'

const themeStore = useThemeStore()

onMounted(() => {
  console.log('Vue应用已挂载')
  themeStore.initTheme()
})
</script>